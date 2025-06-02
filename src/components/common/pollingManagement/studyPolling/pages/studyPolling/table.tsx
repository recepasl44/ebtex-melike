

import { useMemo, useState, useEffect } from 'react';


import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

interface Row {
    id: number;
    index?: number;
    group_name: string;
    class_name: string;
    student_name: string;
    status: number; // 0=Geldi, 1=Geç Geldi, 2=Gelmedi
}

export default function StudyPollingTable() {


    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [groupId, setGroupId] = useState('');
    const [managerId, setManagerId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [teacher, setTeacher] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        teachers: false,
        users: false,
    });

    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });

    const { usersData: managersData = [] } =
        useUsersTable({ enabled: enabled.users, role_id: 2, pageSize: 999 });

    const {
        attendancesData = [],
        loading,
        error,
        totalPages,
        totalItems,
    } = useAttendancesTable({
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        duty_user_id: +managerId || undefined,
        used_area_id: +areaId || undefined,
        duty_teacher_id: +teacher || undefined,
        enabled: true,
    });

    // --- Statü map'i ---
    const statusMap: Record<number, { txt: string; className: string }> = {
        0: { txt: 'Geldi', className: 'text-success' },
        1: { txt: 'Geç Geldi', className: 'text-warning' },
        2: { txt: 'Gelmedi', className: 'text-danger' },
    };

    // --- Tablo rows (localde güncellenecek) ---
    const baseRows: Row[] = useMemo(() => (
        (attendancesData ?? []).flatMap((a: any) => {
            const grp = a.group?.name || '-';
            const cls = a.classroom?.name || a.level?.name || '-';

            if (!a.students?.length) {
                return [{
                    id: a.id, group_name: grp, class_name: cls,
                    student_name: '-', status: a.status ?? 0,
                }];
            }
            return a.students.map((s: any) => ({
                id: a.id,
                group_name: grp,
                class_name: cls,
                student_name:
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() ||
                    s.name_surname || s.name || '-',
                status: s.status ?? 0,
            }));
        })
    ), [attendancesData]);

    const [rows, setRows] = useState<Row[]>(baseRows);

    useEffect(() => {
        setRows(baseRows);
    }, [baseRows]);

    // Tıklanınca statü değişimi: 0→1→2→0
    function handleStatusClick(idx: number) {
        setRows(r => r.map((row, i) => (
            i === idx
                ? { ...row, status: (row.status + 1) % 3 }
                : row
        )));
        // İstersen PATCH/POST API burada atabilirsin
    }

    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra No',
            style: { width: 70, textAlign: 'center' },
            render: (_r, _m, idx) => idx! + 1,
        },
        { key: 'group_name', label: 'Grup', render: r => r.group_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Öğrenciler', render: r => r.student_name },
        {
            key: 'status', label: 'Durum',
            style: { textAlign: 'center', width: 110 },
            render: (row, _open, idx) => (
                <span
                    className={statusMap[row.status]?.className}
                    style={{ cursor: 'pointer', fontWeight: 500 }}
                    onClick={() => idx !== undefined && handleStatusClick(idx)}
                >
                    {statusMap[row.status]?.txt}
                </span>
            ),
        },
    ], []);

    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'manager_id', label: 'Görevli Yöneticiler', type: 'select',
            value: managerId, onChange: setManagerId,
            onClick: () => setEnabled(e => ({ ...e, users: true })),
            options: managersData.map(m => ({
                value: String(m.id),
                label: m.name_surname || m.name || '-',
            })),
        },
        {
            key: 'area_id', label: 'Etüt Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            key: 'teacher', label: 'Görevli Öğretmenler', type: 'select',
            value: teacher, onChange: setTeacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
    ], [
        dateRange, groupId, managerId, areaId, teacher,
        groupsData, managersData, usedAreasData, teachersData,
    ]);

    return (
        <ReusableTable<Row>
            tableMode="single"
            columns={columns}
            data={rows}
            loading={loading}
            error={error}
            filters={filters}
            showExportButtons
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}
            exportFileName="study_polling_list"
        />
    );
}

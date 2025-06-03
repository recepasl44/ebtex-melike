/* ------------------------------------------------------------------
 *  Etüt / Çalışma Yoklama Listesi – StudyPollingTable
 *  route : /pollingManagement/studyPolling
 * -----------------------------------------------------------------*/
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

/* ───────── Row tipi ───────── */
interface Row {
    id: number;
    index?: number;
    group_name: string;
    class_name: string;
    student_name: string;
    status: number;          // 0=Geldi 1=Geç Geldi 2=Gelmedi
}

export default function StudyPollingTable() {
    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [groupId, setGroupId] = useState('');
    const [managerId, setManagerId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [teacher, setTeacher] = useState('');

    /* —— sayfalama —— */
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(10);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        groups: false, areas: false, teachers: false, users: false,
    });

    /* —— look-ups —— */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { attendanceTeachersData: teachersData = [] }
        = useAttendanceTeachersTable({ enabled: enabled.teachers });
    const { usersData: managersData = [] }
        = useUsersTable({ enabled: enabled.users, role_id: 2, paginate: 999 });

    /* —— ana sorgu —— */
    const { attendancesData = [], loading, error, totalPages, totalItems } =
        useAttendancesTable({
            page, paginate,
            start_date: dateRange.startDate || undefined,
            end_date: dateRange.endDate || undefined,
            group_id: +groupId || undefined,
            duty_user_id: +managerId || undefined,
            used_area_id: +areaId || undefined,
            duty_teacher_id: +teacher || undefined,
            enabled: true,
        });

    /* —— durum map —— */
    const statusMap: Record<number, { txt: string; className: string }> = {
        0: { txt: 'Geldi', className: 'text-success' },
        1: { txt: 'Geç Geldi', className: 'text-warning' },
        2: { txt: 'Gelmedi', className: 'text-danger' },
    };

    /* —— attendances → rows —— */
    const baseRows: Row[] = useMemo(() => (
        attendancesData.flatMap((a: any) => {
            const grp = a.group?.name || '-';
            const cls = a.classroom?.name ?? a.level?.name ?? '-';

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
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim()
                    || s.name_surname || s.name || '-',
                status: s.status ?? 0,
            }));
        })
    ), [attendancesData]);

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);

    const handleStatusClick = (idx: number) =>
        setRows(r => r.map((row, i) =>
            i === idx ? { ...row, status: (row.status + 1) % 3 } : row,
        ));

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra No', style: { width: 70, textAlign: 'center' },
            render: (_r, _m, idx) =>
                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>{idx! + 1}</span>,
        },
        { key: 'group_name', label: 'Grup Adı', render: r => r.group_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Öğrenci Adı', render: r => r.student_name },
        {
            key: 'status', label: 'Durum', style: { width: 110, textAlign: 'center' },
            render: (row, _o, idx) => (
                <span
                    className={statusMap[row.status].className}
                    style={{ cursor: 'pointer', fontWeight: 500 }}
                    onClick={() => idx !== undefined && handleStatusClick(idx)}
                >
                    {statusMap[row.status].txt}
                </span>
            ),
        },
    ], []);

    /* —— filtreler (her biri 1 kolon) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 2,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select', col: 1,
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'manager_id', label: 'Görevli Yönetici', type: 'select', col: 1,
            value: managerId, onChange: setManagerId,
            onClick: () => setEnabled(e => ({ ...e, users: true })),
            options: managersData.map(m => ({
                value: String(m.id),
                label: m.name_surname || m.name || '-',
            })),
        },
        {
            key: 'area_id', label: 'Etüt Alanı', type: 'select', col: 1,
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            key: 'teacher', label: 'Görevli Öğretmen', type: 'select', col: 1,
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

    /* —— render —— */
    return (
        <>
            <FilterGroup
                filters={filters}
                columnsPerRow={4}
                navigate={useNavigate()}
            />

            <ReusableTable<Row>
                tableMode="single"
                columns={columns}
                data={rows}
                loading={loading}
                error={error}
                showExportButtons
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={paginate}
                onPageChange={setPage}
                onPageSizeChange={s => { setPaginate(s); setPage(1); }}
                exportFileName="study_polling_list"
            />
        </>
    );
}

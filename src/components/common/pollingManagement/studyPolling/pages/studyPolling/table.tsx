/* eslint-disable @typescript-eslint/no-misused-promises */
/* table.tsx – Etüt Yoklama › Etüt Yoklama */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* ───────── API hook’ları ───────── */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

/* ───── satır tipi ───── */
interface Row {
    id: number;
    index?: number;   // Sıra No
    group_name: string;
    class_name: string;
    student_name: string;
    status_text: string;
    status_color: string;   // yeşil / kırmızı
}

/* route kökü (modal veya sayfa) */
const ROOT = `${import.meta.env.BASE_URL}pollingManagement/studyPolling`;

export default function StudyPollingTable() {
    const navigate = useNavigate();

    /* ------------ filtre state’leri ------------ */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [groupId, setGroupId] = useState('');
    const [managerId, setManagerId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [teacher, setTeacher] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* lazy flags */
    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        teachers: false,
        users: false,   // 🔸 yöneticiler
    });

    /* ------------ yardımcı listeler ------------ */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });

    /* role_id 2 = Görevli Yönetici */
    const { usersData: managersData = [] } =
        useUsersTable({ enabled: enabled.users, role_id: 2, pageSize: 999 });

    /* ------------ ana liste ------------ */
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
        duty_user_id: +managerId || undefined,   // 🔸
        used_area_id: +areaId || undefined,
        duty_teacher_id: +teacher || undefined,
        enabled: true,
    });

    /* ------------ attendances → rows ------------ */
    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).flatMap((a: any) => {
            const grp = a.group?.name || '-';
            const cls = a.classroom?.name || a.level?.name || '-';

            const statusMap: Record<number, { txt: string; color: string }> = {
                1: { txt: 'Geldi', color: '#18c96e' },
                0: { txt: 'Gelmedi', color: '#ff4d4f' },
            };

            if (!a.students?.length) {
                const s = statusMap[a.status || 0];
                return [{
                    id: a.id, group_name: grp, class_name: cls,
                    student_name: '-', status_text: s.txt, status_color: s.color,
                }];
            }

            return a.students.map((s: any) => ({
                id: a.id,
                group_name: grp,
                class_name: cls,
                student_name:
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() ||
                    s.name_surname || s.name || '-',
                status_text: statusMap[s.status || 0]?.txt || '-',
                status_color: statusMap[s.status || 0]?.color || '#999',
            }));
        })
    ), [attendancesData]);

    /* ------------ kolonlar ------------ */
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
            key: 'status_text', label: 'Durum',
            render: r => <span style={{ color: r.status_color }}>{r.status_text}</span>,
            style: { textAlign: 'center' },
        },

    ], [navigate]);

    /* ------------ filtreler (Figma sırasına göre) ------------ */
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
            onClick: () => setEnabled(e => ({ ...e, users: true })),  // 🔸
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

    /* ------------ render ------------ */
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

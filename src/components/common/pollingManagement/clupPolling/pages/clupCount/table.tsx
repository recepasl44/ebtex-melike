/* table.tsx – Kulüp Yoklama > Yoklama Sayıları
   konum: src/components/common/pollingManagement/clupPolling/pages/clupCount/table.tsx */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* -------- API hook’ları -------- */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

/* -------- Satır tipi -------- */
type Row = {
    id: number;
    club_name: string;     // Kulüp / Grup
    class_name: string;     // Sınıf / Şube
    student_name: string;     // Öğrenci Adı Soyadı
    present_count: number;     // Geldi
    absent_count: number;     // Gelmedi
    late_count: number;     // Geç Geldi
};

/* =================================================================== */
export default function ClubCountTable() {
    const navigate = useNavigate();

    /* ------------ filtre state’leri ------------ */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [clubName, setClubName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [classroom, setClassroom] = useState('');
    const [student, setStudent] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* ------------ lazy-load bayrakları ---------- */
    const [enabled, setEnabled] = useState({
        groups: false,
        classes: false,
        students: false,
    });

    /* ------------ yardımcı listeler ------------- */
    const { groupsData } = useGroupsTable({ enabled: enabled.groups });

    const { classroomData } = useClassroomList({
        enabled: enabled.classes,
        class_level: undefined,
        branchId: 0,
    });

    const { attendanceStudentsData: studentsData } = useAttendanceStudentsTable({
        enabled: enabled.students,
    });

    /* ------------ ana liste (Attendances) ------- */
    const {
        attendancesData,
        loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        classroom_id: +classroom || undefined,
        student_id: +student || undefined,
        club_name: clubName || undefined,
        enabled: true,
    });

    /* ------------ attendances -> Row[] ---------- */
    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).flatMap((a: any) => {
            const cls = a.classroom?.name || a.level?.name || '-';
            const club = a.name || '-';

            /* backend her yoklamadaki toplamları döndürüyorsa kullan,
               yoksa 0 bırakılabilir */
            const presentTotal = a.present_count ?? 0;
            const absentTotal = a.absent_count ?? 0;
            const lateTotal = a.late_count ?? 0;

            if (!a.students?.length) {
                return [{
                    id: a.id, club_name: club, class_name: cls, student_name: '-',
                    present_count: presentTotal, absent_count: absentTotal, late_count: lateTotal,
                }];
            }

            return a.students.map((s: any) => ({
                id: a.id,
                club_name: club,
                class_name: cls,
                student_name:
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() ||
                    s.name_surname || s.name || '-',
                present_count: presentTotal,
                absent_count: absentTotal,
                late_count: lateTotal,
            }));
        })
    ), [attendancesData]);

    /* ------------ kolon tanımları --------------- */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index',
            label: 'Sıra No',
            style: { width: 70, textAlign: 'center' },
            render: (row: Row) => {
                // Find the index of the row in the current rows array
                // This assumes rows is in scope (which it is in this component)
                return rows.findIndex(r => r === row) + 1;
            }
        },

        { key: 'club_name', label: 'Kulüp / Grup', render: r => r.club_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Öğrenci Adı Soyadı', render: r => r.student_name },

        {
            key: 'present_count', label: 'Geldi',
            style: { textAlign: 'center', color: '#18c96e' },
            render: r => r.present_count
        },

        {
            key: 'absent_count', label: 'Gelmedi',
            style: { textAlign: 'center', color: '#ff4d4f' },
            render: r => r.absent_count
        },

        {
            key: 'late_count', label: 'Geç Geldi',
            style: { textAlign: 'center', color: '#ffb300' },
            render: r => r.late_count
        },
    ], [rows]);

    /* ------------ filter tanımları -------------- */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' })
        },

        {
            key: 'club_name', label: 'Kulüp Adı', type: 'text',
            value: clubName, onChange: setClubName
        },

        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: (groupsData ?? []).map(g => ({ value: String(g.id), label: g.name }))
        },

        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select',
            value: classroom, onChange: setClassroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            options: (classroomData ?? []).map(c => ({ value: String(c.id), label: c.name }))
        },

        {
            key: 'student', label: 'Öğrenciler', type: 'select',
            value: student, onChange: setStudent,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            options: (studentsData ?? []).map(s => ({
                value: String(s.id),
                label: s.name_surname || s.name ||
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim(),
            }))
        },
    ], [dateRange, clubName, groupId, classroom, student,
        groupsData, classroomData, studentsData]);

    /* ------------ render ------------------------ */
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
            exportFileName="club_count_list"
        />
    );
}

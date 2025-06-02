/* ------------------------------------------------------------------
 *  Kulüp Yoklaması • Sayı Özeti – ClubCountTable
 * -----------------------------------------------------------------*/
import { useState, useMemo, useEffect } from 'react';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

type Row = {
    id: number;
    club_name: string;
    class_name: string;
    student_name: string;
    present_count: number;
    absent_count: number;
    late_count: number;
};

export default function ClubCountTable() {
    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [clubName, setClubName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [classroom, setClassroom] = useState('');
    const [student, setStudent] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        groups: false, classes: false, students: false,
    });

    /* —— look-ups —— */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes, class_level: undefined, branchId: 0,
    });
    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({ enabled: enabled.students });

    /* —— ana sorgu —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        classroom_id: +classroom || undefined,
        student_id: +student || undefined,
        club_name: clubName || undefined,
        enabled: true,
    });

    /* —— satırlar —— */
    const rows: Row[] = useMemo(() => (
        attendancesData.flatMap((a: any) => {
            const cls = a.classroom?.name || a.level?.name || '-';
            const club = a.name || '-';

            const present = a.present_count ?? 0;
            const absent = a.absent_count ?? 0;
            const late = a.late_count ?? 0;

            if (!a.students?.length) {
                return [{
                    id: a.id, club_name: club, class_name: cls, student_name: '-',
                    present_count: present, absent_count: absent, late_count: late,
                }];
            }
            return a.students.map((s: any) => ({
                id: a.id,
                club_name: club,
                class_name: cls,
                student_name:
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() ||
                    s.name_surname || s.name || '-',
                present_count: present,
                absent_count: absent,
                late_count: late,
            }));
        })
    ), [attendancesData]);

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra No',
            style: { width: 70, textAlign: 'center' },
            render: (_r, _o, idx) => <div className="text-center">{(idx ?? 0) + 1}</div>,
        },
        { key: 'club_name', label: 'Kulüp / Grup', render: r => r.club_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Adı Soyadı', render: r => r.student_name },
        {
            key: 'present_count', label: 'Geldi',
            style: { textAlign: 'center', color: '#18c96e' },
            render: r => r.present_count,
        },
        {
            key: 'absent_count', label: 'Gelmedi',
            style: { textAlign: 'center', color: '#ff4d4f' },
            render: r => r.absent_count,
        },
        {
            key: 'late_count', label: 'Geç Geldi',
            style: { textAlign: 'center', color: '#ffb300' },
            render: r => r.late_count,
        },
    ], []);

    /* —— Kulüp adı seçenekleri —— */
    const clubNameOptions = useMemo(() => {
        const set = new Set<string>();
        attendancesData.forEach((a: any) => { if (a.name) set.add(a.name); });
        return Array.from(set).map(n => ({ value: n, label: n }));
    }, [attendancesData]);

    /* —— filtreler (col:1) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'club_name', label: 'Kulüp Adı', type: 'select', col: 1,
            value: clubName,
            onChange: setClubName,
            options: clubNameOptions,
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select', col: 1,
            value: groupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            onChange: setGroupId,
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select', col: 1,
            value: classroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'student', label: 'Öğrenci', type: 'select', col: 1,
            value: student,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudent,
            options: studentsData.map((s: any) => ({
                value: String(s.student_id),
                label: s.student
                    ? `${s.student.first_name} ${s.student.last_name}` : '-',
            })),
        },
    ], [
        dateRange, clubName, groupId, classroom, student,
        groupsData, classroomData, studentsData, clubNameOptions,
    ]);

    /* —— render —— */
    return (
        <>
            <FilterGroup
                filters={filters}
                columnsPerRow={4}
                navigate={(path: string) => { }}
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
                exportFileName="club_count_list"
            />
        </>
    );
}

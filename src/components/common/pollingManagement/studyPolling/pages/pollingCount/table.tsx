/* ------------------------------------------------------------------
 *  Etüt Yoklama › Yoklama Sayıları – StudyCountTable
 *  route : /pollingManagement/studyCounts
 * -----------------------------------------------------------------*/
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

/* ───────── satır tipi ───────── */
interface Row {
    id: number;
    date_range: string;
    group_name: string;
    class_name: string;
    student_name: string;
    present_txt: string;
    absent_txt: string;
    late_txt: string;
}

/* Düzenle butonu kökü */
const ROOT = `${import.meta.env.BASE_URL}pollingManagement/studyCounts`;

export default function StudyCountTable() {
    const navigate = useNavigate();

    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [groupId, setGroupId] = useState('');
    const [levelId, setLevelId] = useState('');
    const [classId, setClassId] = useState('');
    const [studentId, setStudentId] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        groups: false, levels: false, classes: false, students: false,
    });

    /* —— yardımcı listeler —— */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        class_level: +levelId || undefined,
        branchId: 0,
    });
    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({ enabled: enabled.students });

    /* —— ana liste —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        class_level: +levelId || undefined,
        classroom_id: +classId || undefined,
        student_id: +studentId || undefined,
        enabled: true,
    });

    /* —— attendances → rows —— */
    const rows: Row[] = useMemo(() => (
        attendancesData.flatMap((a: any) => {
            const grp = a.group?.name || a.name || '-';
            const cls = a.classroom?.name || a.level?.name || '-';
            const date = a.start_date && a.end_date
                ? `${dayjs(a.start_date).format('DD.MM.YYYY')} - ${dayjs(a.end_date).format('DD.MM.YYYY')}`
                : '-';

            const pTxt = `${a.present_count ?? 0} Ders`;
            const aTxt = `${a.absent_count ?? 0} Ders`;
            const lTxt = `${a.late_count ?? 0} Ders`;

            if (!a.students?.length) {
                return [{
                    id: a.id, date_range: date, group_name: grp, class_name: cls,
                    student_name: '-', present_txt: pTxt, absent_txt: aTxt, late_txt: lTxt,
                }];
            }
            return a.students.map((s: any) => ({
                id: a.id,
                date_range: date,
                group_name: grp,
                class_name: cls,
                student_name:
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() ||
                    s.name_surname || s.name || '-',
                present_txt: pTxt,
                absent_txt: aTxt,
                late_txt: lTxt,
            }));
        })
    ), [attendancesData]);

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra No', style: { width: 70, textAlign: 'center' },
            render: (_r, _m, idx) => <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>{idx! + 1}</span>
        },
        { key: 'date_range', label: 'Tarih Aralığı', render: r => r.date_range },
        { key: 'group_name', label: 'Grup Adı', render: r => r.group_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Öğrenci Adı Soyadı', render: r => r.student_name },
        { key: 'present_txt', label: 'Geldi', style: { textAlign: 'center', color: '#18c96e' }, render: r => r.present_txt },
        { key: 'absent_txt', label: 'Gelmedi', style: { textAlign: 'center', color: '#ff4d4f' }, render: r => r.absent_txt },
        { key: 'late_txt', label: 'Geç Geldi', style: { textAlign: 'center', color: '#ffb300' }, render: r => r.late_txt },
        {
            key: 'actions', label: 'İşlem', style: { width: 90, textAlign: 'center' },
            render: row => (
                <button
                    className="btn btn-icon btn-sm btn-info-light rounded-pill"
                    onClick={() => navigate(`${ROOT}/${row.id}`)}
                >
                    <i className="ti ti-pencil" />
                </button>
            ),
        },
    ], [navigate]);

    /* —— filtreler (col:1 → 4/satır) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select', col: 1,
            value: groupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            onChange: setGroupId,
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'level_id', label: 'Sınıf Seviyesi', type: 'select', col: 1,
            value: levelId,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setLevelId(v); setClassId(''); },
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'class_id', label: 'Sınıf / Şube', type: 'select', col: 1,
            value: classId,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassId,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'student_id', label: 'Öğrenciler', type: 'select', col: 1,
            value: studentId,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudentId,
            options: studentsData.map(s => ({
                value: String(s.id),
                label: s.name_surname || s.name ||
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim(),
            })),
        },
    ], [
        dateRange, groupId, levelId, classId, studentId,
        groupsData, levelsData, classroomData, studentsData,
    ]);

    /* —— render —— */
    return (
        <>
            {/* Filtreler – 4/satır */}
            <FilterGroup
                filters={filters}
                columnsPerRow={4}
                navigate={navigate}
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
                exportFileName="study_count_list"
            />
        </>
    );
}

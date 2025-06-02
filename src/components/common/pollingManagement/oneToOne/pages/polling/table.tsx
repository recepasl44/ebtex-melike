
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import FilterGroup, { FilterDefinition } from '../../components/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

interface Row {
    id: number;
    date: string;
    hour_range: string;
    area_name: string;
    student_name: string;
    teacher_name: string;
    status: number;
    executive_status: string;
    clicked: boolean;
}

const STATUS_TXT = ['Geldi', 'Geç Geldi', 'Gelmedi'];
const STATUS_CLR = ['text-success', 'text-warning', 'text-danger'];

export default function OneToOnePollingTable() {
    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lesson, setLesson] = useState('');
    const [teacher, setTeacher] = useState('');
    const [student, setStudent] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        levels: false, classes: false, lessons: false, teachers: false, students: false,
    });

    /* —— look-ups —— */
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!classLevel,
        class_level: +classLevel || undefined,
        branchId: 0,
    });
    const { lessonsData = [] } = useLessonList({
        enabled: enabled.lessons && !!classLevel,
        class_level: +classLevel || undefined,
    });
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });
    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({ enabled: enabled.students });

    /* —— ana veri —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        lesson_id: +lesson || undefined,
        teacher_id: +teacher || undefined,
        student_id: +student || undefined,
        enabled: true,
    });

    /* —— saat aralığı yardımcı —— */
    const formatRange = (rec: any) => {
        const s = rec.start_time || rec.start || '';
        const e = rec.end_time || rec.end || '';
        if (s && e) return `${s.slice(0, 5)} - ${e.slice(0, 5)}`;
        if (rec.hour_range) return rec.hour_range;
        return `${rec.total_hours ?? 0} Ders`;
    };

    /* —— satırlar —— */
    const baseRows: Row[] = useMemo(() => (
        attendancesData.map((a: any) => ({
            id: a.id,
            date: dayjs(a.start_date).format('DD.MM.YYYY'),
            hour_range: formatRange(a),
            area_name: a.used_area?.name || a.area_name || '-',
            student_name: a.students?.[0]
                ? `${a.students[0].first_name} ${a.students[0].last_name}` : '-',
            teacher_name: a.teachers?.[0]?.name_surname ?? '-',
            status: a.status ?? 0,
            executive_status: a.executive_status ?? '-',
            clicked: false,
        }))
    ), [attendancesData]);

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);


    const handleStatusChange = (idx: number, value: number) => {
        setRows(r =>
            r.map((row, i) =>
                i === idx && row.executive_status === '-'
                    ? { ...row, status: value, clicked: true }
                    : row,
            ),
        );
    };

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'hour_range', label: 'Saat Aralığı', render: r => r.hour_range },
        { key: 'area_name', label: 'Çalışma Alanı', render: r => r.area_name },
        { key: 'student_name', label: 'Öğrenci Adı', render: r => r.student_name },
        { key: 'teacher_name', label: 'Öğretmen Adı', render: r => r.teacher_name },
        {
            key: 'status',
            label: 'Durum',
            style: { width: 160, textAlign: 'center' },
            render: (_r, _o, idx) => {
                const row = rows[idx!];

                if (row.executive_status !== '-') {
                    return <span className={STATUS_CLR[row.status]}>{STATUS_TXT[row.status]}</span>;
                }
                return (
                    <select
                        className={`form-select p-1 ${row.clicked ? STATUS_CLR[row.status] : ''}`}
                        value={row.clicked ? row.status : ''}
                        style={{ cursor: 'pointer', fontWeight: 500 }}
                        onChange={e => handleStatusChange(idx!, Number(e.target.value))}
                    >
                        <option value="" disabled>Tıklayınız</option>
                        <option value={0} className={STATUS_CLR[0]}>{STATUS_TXT[0]}</option>
                        <option value={1} className={STATUS_CLR[1]}>{STATUS_TXT[1]}</option>
                        <option value={2} className={STATUS_CLR[2]}>{STATUS_TXT[2]}</option>
                    </select>
                );
            },
        },
        {
            key: 'executive_status',
            label: 'Yönetici Durumu',
            render: r => r.executive_status,
        },
    ], [rows]);

    /* —— filtreler —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'class_level', label: 'Sınıf Seviyesi', type: 'select', col: 1,
            value: classLevel,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setClassLevel(v); setClassroom(''); },
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select', col: 1,
            value: classroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'lesson', label: 'Ders', type: 'select', col: 1,
            value: lesson,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: setLesson,
            options: lessonsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'teacher', label: 'Öğretmen', type: 'select', col: 1,
            value: teacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            onChange: setTeacher,
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
        {
            key: 'student', label: 'Öğrenci', type: 'select', col: 1,
            value: student,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudent,
            options: studentsData.map(s => ({
                value: String(s.student_id),
                label: s.student
                    ? `${s.student.first_name} ${s.student.last_name}` : '-',
            })),
        },
    ], [
        dateRange, classLevel, classroom, lesson, teacher, student,
        levelsData, classroomData, lessonsData, teachersData, studentsData,
    ]);


    return (
        <>
            <FilterGroup filters={filters} columnsPerRow={4} navigate={useNavigate()} />

            <ReusableTable<Row>
                // pageTitle="Bire-bir Yoklama"
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
                exportFileName="one_to_one_polling"
            />
        </>
    );
}

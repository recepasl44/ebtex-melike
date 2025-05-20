/* eslint-disable @typescript-eslint/no-misused-promises */
/* table.tsx – Öğretmen Birebir Planı listesi */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

/* — satır tipi — */
interface Row {
    id: number;
    date: string;
    lesson: string;
    class_name: string;
    teacher_name: string;
    student_name: string;
    status: number;          // 0 = Geldi • 1 = Geç Geldi • 2 = Gelmedi
    execute_status: string;  // raporlu | izinli | …
}

export default function ExecutiveStatusTable() {
    const navigate = useNavigate();

    /* — filtre state’leri — */
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lesson, setLesson] = useState('');
    const [teacher, setTeacher] = useState('');
    const [student, setStudent] = useState('');
    const [status, setStatus] = useState('');
    const [execSt, setExecSt] = useState('');
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* lazy-load kontrolleri */
    const [enabled, setEnabled] = useState({
        levels: false,
        classes: false,
        lessons: false,
        teachers: false,
        students: false,
    });

    /* — yardımcı listeler — */
    const { levelsData } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData } = useClassroomList({
        enabled: enabled.classes && !!classLevel,
        class_level: +classLevel || undefined,
        branchId: 0,
    });
    const { lessonsData } = useLessonList({
        enabled: enabled.lessons && !!classLevel,
        class_level: +classLevel || undefined,
    });
    const { attendanceTeachersData: teachersData } = useAttendanceTeachersTable({
        enabled: enabled.teachers,
    });
    const { attendanceStudentsData: studentsData } = useAttendanceStudentsTable({
        enabled: enabled.students,
    });

    /* — ana sorgu — */
    const {
        attendancesData,
        loading,
        error,
        totalPages,
        totalItems,
    } = useAttendancesTable({
        page,
        pageSize,
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        lesson_id: +lesson || undefined,
        teacher_id: +teacher || undefined,
        student_id: +student || undefined,
        status: status || undefined,
        executive_status: execSt || undefined,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        enabled: true,
    });

    /* — API → satırlar — */
    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).map((a: any) => ({
            id: a.id,
            date: dayjs(a.start_date).format('DD.MM.YYYY'),
            lesson: a.lesson_name || a.lesson?.name || a.program?.name || '-',
            class_name: a.classroom_name || a.classroom?.name || a.level?.name || '-',
            teacher_name: a.teachers?.[0]?.name_surname ?? '-',
            student_name: a.students?.[0]
                ? `${a.students[0].first_name} ${a.students[0].last_name}`
                : '-',
            status: a.status,
            execute_status: a.executive_status ?? '-',
        }))
    ), [attendancesData]);

    /* — kolonlar — */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'lesson', label: 'Ders', render: r => r.lesson },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'teacher_name', label: 'Öğretmen', render: r => r.teacher_name },
        { key: 'student_name', label: 'Öğrenci', render: r => r.student_name },
        {
            key: 'status', label: 'Durum',
            render: ({ status }) =>
                status === 0 ? 'Geldi'
                    : status === 1 ? 'Geç Geldi'
                        : 'Gelmedi',
        },
        {
            key: 'execute_status',
            label: 'Yönetici Durum',
            render: r => (
                r.execute_status
                    .replace('ozursuz', 'Özürsüz')
                    .replace('izinli', 'İzinli (Özürlü)')
                    .replace('raporlu', 'Raporlu')
                    .replace('gorevli', 'Görevli')
                    .replace('erken_ayrilma', 'Erken Ayrılma')
                    .replace('tatil', 'Tatil')
                    .replace('katilmama', 'Katılmama')
            ),
        },
    ], []);

    /* — filtreler — */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'class_level', label: 'Sınıf Seviyesi',
            value: classLevel,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setClassLevel(v); setClassroom(''); setLesson(''); },
            options: (levelsData ?? []).map((l: any) => ({ value: l.id, label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube',
            value: classroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: (classroomData ?? []).map((c: any) => ({ value: c.id, label: c.name })),
        },
        {
            key: 'lesson', label: 'Ders',
            value: lesson,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: setLesson,
            options: (lessonsData ?? []).map((d: any) => ({ value: d.id, label: d.name })),
        },
        {
            key: 'teacher', label: 'Öğretmen',
            value: teacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            onChange: setTeacher,
            options: (teachersData ?? []).map((t: any) => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname ?? '-',
            })),
        },
        {
            key: 'student', label: 'Öğrenci',
            value: student,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudent,
            options: (studentsData ?? []).map((s: any) => ({
                value: String(s.student_id),
                label: s.student
                    ? `${s.student.first_name} ${s.student.last_name}` : '-',
            })),
        },
        {
            key: 'status', label: 'Durum', value: status, onChange: setStatus,
            options: [
                { value: '0', label: 'Geldi' },
                { value: '1', label: 'Geç Geldi' },
                { value: '2', label: 'Gelmedi' },
            ],
        },
        {
            key: 'execute_status', label: 'Yönetici Durum',
            value: execSt, onChange: setExecSt,
            options: [
                { value: 'ozursuz', label: 'Özürsüz' },
                { value: 'izinli', label: 'İzinli (Özürlü)' },
                { value: 'raporlu', label: 'Raporlu' },
                { value: 'gorevli', label: 'Görevli' },
                { value: 'erken_ayrilma', label: 'Erken Ayrılma' },
                { value: 'tatil', label: 'Tatil' },
                { value: 'katilmama', label: 'Katılmama' },
            ],
        },
    ], [
        classLevel, classroom, lesson, teacher, student,
        status, execSt, dateRange,
        levelsData, classroomData, lessonsData,
        teachersData, studentsData,
    ]);

    /* — render — */
    return (
        <ReusableTable<Row>
            onAdd={() => navigate('/executiveStatus/crud')}
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
            exportFileName="executive_status_list"
        />
    );
}

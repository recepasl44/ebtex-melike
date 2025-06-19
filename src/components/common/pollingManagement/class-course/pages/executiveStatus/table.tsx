/* table.tsx — Class-Course > Executive Status > Liste
   -------------------------------------------------- */
import { useState, useMemo, useEffect, ChangeEvent, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import FilterGroup, {  } from '../../component/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';


interface Row {
    id: number;
    date_range: string;
    lesson: string;
    class_name: string;
    teacher_name: string;
    student_name: string;
    execute_status: string;
    approval_status: number;   // 0-1-2
    clicked: boolean;          // dropdown açıldı mı?
}

const APPROVAL_TXT: Record<number, string> = {
    0: 'Onay Bekliyor',
    1: 'Onaylandı',
    2: 'Reddedildi',
};

const APPROVAL_CLR: Record<number, string> = {
    0: 'text-warning',
    1: 'text-success',
    2: 'text-danger',
};


export default function ExecutiveStatusTable() {
    const navigate = useNavigate();


    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lesson, setLesson] = useState('');
    const [teacher, setTeacher] = useState('');
    const [students, setStudents] = useState<string[]>([]);
    const [execSt, setExecSt] = useState('');
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);


    const [enabled, setEnabled] = useState({
        levels: false,
        classes: false,
        lessons: false,
        teachers: false,
        students: false,
    });


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

    const {
        attendancesData,
        loading,
        error,
        totalPages,
        totalItems,
    } = useAttendancesTable({
        page,
        paginate,
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        lesson_id: +lesson || undefined,
        teacher_id: +teacher || undefined,
        student_ids: students.length ? students.join(',') : undefined,
        executive_status: execSt || undefined,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        enabled: true,
    });

    const baseRows: Row[] = useMemo(
        () =>
            (attendancesData ?? []).map((a: any) => ({
                id: a.id,
                date_range: `${dayjs(a.start_date).format('DD.MM.YYYY')} – ${dayjs(a.end_date).format('DD.MM.YYYY')}`,
                lesson: a.lesson_name || a.lesson?.name || a.program?.name || '-',
                class_name: a.classroom_name || a.classroom?.name || a.level?.name || '-',
                teacher_name: a.teachers?.[0]?.name_surname ?? '-',
                student_name: a.students?.[0]
                    ? `${a.students[0].first_name} ${a.students[0].last_name}`
                    : '-',
                execute_status: a.executive_status ?? '-',
                approval_status: a.approval_status ?? 0,
                clicked: false,
            })),
        [attendancesData],
    );

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);


    const handleApprovalChange = (idx: number, e: ChangeEvent<HTMLSelectElement>) => {
        const val = Number(e.target.value);
        setRows(r =>
            r.map((row, i) =>
                i === idx ? { ...row, clicked: true, approval_status: val } : row,
            ),
        );
    };

    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date_range', label: 'Tarih Aralığı', render: r => r.date_range },
        { key: 'lesson', label: 'Ders', render: r => r.lesson },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'teacher_name', label: 'Öğretmen', render: r => r.teacher_name },
        { key: 'student_name', label: 'Öğrenci', render: r => r.student_name },
        {
            key: 'execute_status',
            label: 'Yönetici Durum',
            render: r =>
                r.execute_status
                    .replace('ozursuz', 'Özürsüz')
                    .replace('izinli', 'İzinli (Özürlü)')
                    .replace('raporlu', 'Raporlu')
                    .replace('gorevli', 'Görevli')
                    .replace('erken_ayrilma', 'Erken Ayrılma')
                    .replace('tatil', 'Tatil')
                    .replace('katilmama', 'Katılmama'),
        },
        {
            key: 'approval_status',
            label: 'İzin Onayı',
            style: { width: 180, textAlign: 'center' },
            render: (_r, _o, idx) => {
                const row = rows[idx!];
                return (
                    <select
                        className={`form-select p-1 ${row.clicked ? APPROVAL_CLR[row.approval_status] : ''}`}
                        style={{ cursor: 'pointer', fontWeight: 500 }}
                        value={row.clicked ? row.approval_status : ''}
                        onChange={(e) => handleApprovalChange(idx!, e)}
                    >
                        <option value="" disabled>Tıklayınız</option>
                        <option value={0} className={APPROVAL_CLR[0]}>
                            {APPROVAL_TXT[0]}
                        </option>
                        <option value={1} className={APPROVAL_CLR[1]}>
                            {APPROVAL_TXT[1]}
                        </option>
                        <option value={2} className={APPROVAL_CLR[2]}>
                            {APPROVAL_TXT[2]}
                        </option>
                    </select>
                );
            },
        },
    ], [rows]);


    const filters: any[] = useMemo(() => [
            {
                key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 2,
                value: dateRange,
                onChange: (v: any) => setDateRange(v ?? { startDate: '', endDate: '' }),
            },
        {
            key: 'class_level', label: 'Sınıf Seviyesi', col: 1, type: 'select',
            value: classLevel,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: (v: SetStateAction<string>) => { setClassLevel(v); setClassroom(''); setLesson(''); },
            options: (levelsData ?? []).map((l: any) => ({ value: l.id, label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube', col: 1, type: 'select',
            value: classroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: (classroomData ?? []).map((c: any) => ({ value: c.id, label: c.name })),
        },
        {
            key: 'lesson', label: 'Ders', col: 1, type: 'select',
            value: lesson,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: setLesson,
            options: (lessonsData ?? []).map((d: any) => ({ value: d.id, label: d.name })),
        },
        {
            key: 'teacher', label: 'Öğretmen', col: 1, type: 'select',
            value: teacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            onChange: setTeacher,
            options: (teachersData ?? []).map((t: any) => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname ?? '-',
            })),
        },
        {
            key: 'students', label: 'Öğrenci', col: 1, type: 'multiselect',
            value: students,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: (arr: string[]) => {
                if (arr.includes('all')) {
                    const allIds = (studentsData ?? []).map((s: any) => String(s.student_id));
                    setStudents(allIds);
                } else { setStudents(arr); }
            },
            selectProps: { menuPortalTarget: document.body },
            options: [
                { value: 'all', label: 'Tüm Sınıf' },
                ...(studentsData ?? []).map((s: any) => ({
                    value: String(s.student_id),
                    label: s.student
                        ? `${s.student.first_name} ${s.student.last_name}`
                        : '-',
                })),
            ],
        },
        {
            key: 'execute_status', label: 'Yönetici Durum', col: 1, type: 'select',
            value: execSt,
            onChange: setExecSt,
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
        classLevel, classroom, lesson, teacher, students, execSt, dateRange,
        levelsData, classroomData, lessonsData, teachersData, studentsData,
    ]);


    return (
        <>
            <FilterGroup
                filters={filters}
                navigate={navigate}
                columnsPerRow={4}
            />
            <ReusableTable<Row>
                onAdd={() => navigate('/executiveStatus/crud')}
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
                exportFileName="executive_status_list"
            />
        </>
    );
}


import { useMemo, useState } from 'react';
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
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

interface Row {
    id: number;
    date: string;
    class_name: string;
    student_name: string;
    late_lessons: number;
    present_lessons: number;
    absent_lessons: number;
}

export default function PollingListTable() {
    const navigate = useNavigate();

    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lesson, setLesson] = useState('');
    const [student, setStudent] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const [enabled, setEnabled] = useState({
        class_level: false,
        classroom: false,
        lesson: false,
        students: false,
    });


    const { levelsData } = useLevelsTable({ enabled: enabled.class_level });

    const { classroomData } = useClassroomList({
        enabled: enabled.classroom && !!classLevel,
        class_level: +classLevel || undefined,
        branchId: 0,
    });

    const { lessonsData } = useLessonList({
        enabled: enabled.lesson && !!classLevel,
        class_level: +classLevel || undefined,
    });

    const { attendanceStudentsData: studentsData } = useAttendanceStudentsTable({
        enabled: enabled.students,
    });


    const {
        attendancesData,
        loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        lesson_id: +lesson || undefined,
        student_id: +student || undefined,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        page, pageSize,
        enabled: true,
    });


    const tableData: Row[] = useMemo(() => {
        if (!attendancesData) return [];


        type AttendanceStudent = {
            first_name?: string;
            last_name?: string;
            name_surname?: string;
            name?: string;
        };

        return attendancesData.flatMap(att => {
            const dateStr = att.start_date ? dayjs(att.start_date).format('DD.MM.YYYY') : '';
            const className = att.group?.name ?? '';

            if (!att.students?.length) {
                return [{
                    id: att.id, date: dateStr, class_name: className, student_name: '',
                    late_lessons: 0, present_lessons: 0, absent_lessons: 0,
                }];
            }

            return att.students.map((stu: AttendanceStudent) => ({
                id: att.id,
                date: dateStr,
                class_name: className,
                student_name:
                    `${stu.first_name ?? ''} ${stu.last_name ?? ''}`.trim() ||
                    stu.name_surname || stu.name || '-',
                late_lessons: 0,
                present_lessons: 0,
                absent_lessons: 0,
            }));
        });
    }, [attendancesData]);


    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'class_name', label: 'Sınıf', render: r => r.class_name },
        { key: 'student_name', label: 'Öğrenci Adı', render: r => r.student_name },
        {
            key: 'late_lessons', label: 'Geç Geldi', style: { textAlign: 'center' },
            render: r => `${r.late_lessons} Ders`
        },
        {
            key: 'present_lessons', label: 'Geldi', style: { textAlign: 'center' },
            render: r => `${r.present_lessons} Ders`
        },
        {
            key: 'absent_lessons', label: 'Gelmedi', style: { textAlign: 'center' },
            render: r => `${r.absent_lessons} Ders`
        },
        {
            key: 'actions', label: 'İşlem', style: { width: 80, textAlign: 'center' },
            render: row => (
                <button
                    type="button"
                    className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                    onClick={() => navigate(`/pollingManagement/details/${row.id}`)}
                >
                    <i className="ti ti-eye" />
                </button>
            ),
        },
    ], [navigate]);

    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'student', label: 'Öğrenci',
            value: student,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudent,
            options: (studentsData ?? []).map((s: any) => ({
                value: String(s.student_id),
                label: s.student
                    ? `${s.student.first_name} ${s.student.last_name}`
                    : '-',
            })),
        },
        {
            key: 'lesson', label: 'Dersler', type: 'select',
            value: lesson, onChange: setLesson,
            onClick: () => setEnabled(p => ({ ...p, lesson: true })),
            options: (lessonsData || []).map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'class_level', label: 'Sınıf Seviyesi', type: 'select',
            value: classLevel,
            onClick: () => setEnabled(p => ({ ...p, class_level: true })),
            onChange: v => { setClassLevel(v); setClassroom(''); },
            options: (levelsData || []).map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select',
            value: classroom, onChange: setClassroom,
            onClick: () => setEnabled(p => ({ ...p, classroom: true })),
            options: (classroomData || []).map(c => ({ value: String(c.id), label: c.name })),
        },
    ], [
        dateRange, student, lesson, classLevel, classroom,
        studentsData, lessonsData, levelsData, classroomData,
    ]);


    return (
        <ReusableTable<Row>

            tableMode="single"
            columns={columns}
            data={tableData}
            loading={loading}
            error={error}
            filters={filters}
            showExportButtons
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={size => { setPageSize(size); setPage(1); }}
            exportFileName="polling_list"
        />
    );
}

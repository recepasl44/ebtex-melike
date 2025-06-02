/* ------------------------------------------------------------------
 *  Ders Yoklama – Öğretmen Paneli
 *  src/components/common/pollingManagement/teachers/pages/lesson/table.tsx
 * -----------------------------------------------------------------*/
import { useState, useMemo, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../component/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable }
    from '../../../../../hooks/attendanceStudent/useList';

/* ───────── Satır tipi ───────── */
interface Row {
    id: number;
    date: string;
    lesson: string;
    class_name: string;
    time: string;
    teacher_name: string;
    student_name: string;
    status: number;
    admin_status: number;
    execute_status: string;
}

/* ───────── PATCH stub ───────── */
async function updateAttendanceStatus(_: { id: number; status: number }) { }
async function updateAllAttendanceStatus(_: number[], __: number) { }

export default function LessonPollingTable() {
    /* —— Filtre state’leri —— */
    const today = dayjs().format('YYYY-MM-DD');

    const [dateRange, setDateRange] = useState({ startDate: today, endDate: today });
    const [lessonId, setLessonId] = useState('');
    const [levelId, setLevelId] = useState('');
    const [classroom, setClassroom] = useState('');
    const [student, setStudent] = useState('');
    const [statusFlt, setStatusFlt] = useState('');

    /* —— Sayfalama —— */
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    /* —— Lazy enable —— */
    const [enabled, setEnabled] = useState({
        lessons: false, levels: false, classes: false, students: false,
    });

    /* —— Dropdown verileri —— */
    const { lessonsData = [] } = useLessonList({ enabled: enabled.lessons });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        level_id: +levelId || undefined,
        branchId: 0,
    });

    /* —— Öğrenciler (debounce) —— */
    const [studentSearch, setStudentSearch] = useState('');
    const [studentQuery, setStudentQuery] = useState('');
    const deb = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!enabled.students) return;
        if (deb.current) clearTimeout(deb.current);
        deb.current = setTimeout(() => setStudentQuery(studentSearch), 400);
        return () => {
            if (deb.current) clearTimeout(deb.current);
        };
    }, [studentSearch, enabled.students]);

    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({
            enabled: enabled.students && !!studentQuery,
            first_name: studentQuery,
            page: 1,
            pageSize: 1000,
            classroom_ids: classroom ? [+classroom] : [],
        });

    /* —— Yoklama verisi —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        enabled: true,
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        lesson_id: +lessonId || undefined,
        level_id: +levelId || undefined,
        classroom_id: +classroom || undefined,
        student_id: +student || undefined,
        status: statusFlt !== '' ? +statusFlt : undefined,
        teacher_polling: 1,
    });

    const yoklamaAlindi = useMemo(
        () => (attendancesData as any[]).some(a => a.already_taken),
        [attendancesData],
    );

    /* —— Satırlar —— */
    const baseRows: Row[] = useMemo(() => (
        (attendancesData as any[]).map(a => ({
            id: a.id,
            date: a.start_date ? dayjs(a.start_date).format('DD.MM.YYYY') : '-',
            lesson: a.lesson?.name || a.program?.lesson_name || '-',
            class_name: a.classroom?.name || a.level?.name || '-',
            time: a.lesson_time || a.period_time || a.time_range || '-',
            teacher_name: a.lesson?.teacher?.full_name
                || a.program?.teacher_name
                || a.teacher?.name_surname
                || '-',
            student_name: a.student
                ? `${a.student.first_name ?? ''} ${a.student.last_name ?? ''}`.trim() : '-',
            status: a.status ?? 0,
            admin_status: a.admin_status ?? 0,
            execute_status: a.executive_status ?? '',
        }))
    ), [attendancesData]);

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);

    /* —— Yardımcılar —— */
    const isEditable = (r: Row) => r.admin_status === 0;
    const toggleStatus = (idx: number) =>
        setRows(r => r.map((row, i) => i === idx && isEditable(row)
            ? (updateAttendanceStatus({ id: row.id, status: (row.status + 1) % 3 }),
                { ...row, status: (row.status + 1) % 3 })
            : row));

    const setAllCame = async () => {
        const updatable = rows.filter(r => isEditable(r) && r.status !== 0);
        if (!updatable.length) return;
        setRows(r => r.map(row => isEditable(row) ? { ...row, status: 0 } : row));
        await updateAllAttendanceStatus(updatable.map(r => r.id), 0);
    };

    /* —— Kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'lesson', label: 'Ders', render: r => r.lesson },
        { key: 'class_name', label: 'Sınıf', render: r => r.class_name },
        { key: 'time', label: 'Ders Saati', render: r => r.time },
        { key: 'teacher_name', label: 'Ders Öğretmeni', render: r => r.teacher_name },
        { key: 'student_name', label: 'Öğrenci Adı', render: r => r.student_name },
        {
            key: 'status', label: 'Durum', style: { width: 120, textAlign: 'center' },
            render: (r, _o, i) => (
                <span
                    style={{
                        cursor: isEditable(r) ? 'pointer' : 'not-allowed',
                        opacity: isEditable(r) ? 1 : 0.5
                    }}
                    className={r.status === 0 ? 'text-success'
                        : r.status === 1 ? 'text-warning' : 'text-danger'}
                    onClick={() => i !== undefined && isEditable(r) && toggleStatus(i)}
                >
                    {r.status === 0 ? 'Geldi' : r.status === 1 ? 'Geç Geldi' : 'Gelmedi'}
                </span>
            ),
        },
        {
            key: 'execute_status', label: 'Yönetici Durumu',
            render: r => {
                if (!r.execute_status) return '-';
                return r.execute_status
                    .replace('ozursuz', 'Özürsüz')
                    .replace('izinli', 'İzinli (Özürlü)')
                    .replace('raporlu', 'Raporlu')
                    .replace('gorevli', 'Görevli')
                    .replace('erken_ayrilma', 'Erken Ayrılma')
                    .replace('tatil', 'Tatil')
                    .replace('katilmama', 'Katılmama');
            },
        },
    ], []);

    /* —— Filtreler (col:1 → 4'lü düzen) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: today, endDate: today }),
        },
        {
            key: 'lesson_id', label: 'Ders', type: 'select', col: 1,
            value: lessonId,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: setLessonId,
            options: lessonsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'level_id', label: 'Sınıf Seviyesi', type: 'select', col: 1,
            value: levelId,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setLevelId(v); setClassroom(''); },
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
            key: 'student', label: 'Öğrenci', type: 'select', col: 1,
            value: student,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudent,
            options: [
                { value: '', label: 'Tüm Sınıf' },
                ...studentsData.map((s: any) => ({
                    value: String(s.student_id),
                    label: s.student
                        ? `${s.student.first_name} ${s.student.last_name}` : '-',
                })),
            ],
        },
        {
            key: 'status', label: 'Durum', type: 'select', col: 1,
            value: statusFlt,
            onChange: setStatusFlt,
            options: [
                { value: '', label: 'Hepsi' },
                { value: '0', label: 'Geldi' },
                { value: '1', label: 'Geç Geldi' },
                { value: '2', label: 'Gelmedi' },
            ],
        },
    ], [
        dateRange, lessonId, levelId, classroom, student, statusFlt,
        lessonsData, levelsData, classroomData, studentsData,
    ]);

    /* —— Render —— */
    return (
        <div>
            {yoklamaAlindi &&
                <div className="alert alert-warning mb-3">
                    Bu ders için zaten yoklama alınmış.
                </div>
            }

            {/* Filtre çubuğu – 4 filtre / satır */}
            <FilterGroup
                filters={filters}
                columnsPerRow={4} navigate={function (path: string): void {
                    throw new Error('Function not implemented.');
                }} />

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>Ders Yoklama</span>
                <button
                    style={{
                        marginLeft: 'auto', background: '#52c41a', color: '#fff',
                        border: 'none', borderRadius: 6, padding: '6px 16px',
                        cursor: 'pointer', fontWeight: 500,
                    }}
                    onClick={setAllCame}
                    disabled={rows.every(r => !isEditable(r) || r.status === 0)}
                >
                    Sınıf Tam
                </button>
            </div>

            <ReusableTable<Row>
                tableMode="single"
                columns={columns}
                data={rows}
                loading={loading}
                error={error}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={s => { setPageSize(s); setPage(1); }}
                showExportButtons
                exportFileName="lesson_polling"
                pageTitle=""
            />
        </div>
    );
}

/* ------------------------------------------------------------------
 *  Ders Yoklama  - Öğretmen paneli  (4 filtre / satır)
 * -----------------------------------------------------------------*/
import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

/* ───────── Satır modeli ───────── */
interface Row {
    id: number;
    class_name: string;
    fullname: string;
    status: number;       // 0:Geldi 1:Geç Geldi 2:Gelmedi
    admin_status: number; // 0:‒ 1:Raporlu 2:Görevli …
}

/* ───────── API stub – PATCH ───────── */
async function updateAttendanceStatus(_: { id: number; status: number }) {
    return true;
}
async function updateAllAttendanceStatus(_: number[], __: number) {
    return true;
}

export default function LessonPollingTable() {
    const navigate = useNavigate();

    /* —— Varsayılan filtreler —— */
    const today = dayjs().format('YYYY-MM-DD');
    const sevenDaysAgo = dayjs().subtract(7, 'day').format('YYYY-MM-DD');

    const [dateRange, setDateRange] = useState({ startDate: sevenDaysAgo, endDate: today });
    const [levelId, setLevelId] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lessonId, setLessonId] = useState('');
    const [timeId, setTimeId] = useState('');
    const [student, setStudent] = useState('');

    /* —— Sayfalama —— */
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    /* —— Lazy enable —— */
    const [enabled, setEnabled] = useState({
        levels: false, classes: false, lessons: false, students: false,
    });

    /* —— Dropdown verileri —— */
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { lessonsData = [] } = useLessonList({ enabled: enabled.lessons });

    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        level_id: +levelId || undefined,
        branchId: 0,
    });

    /* —— Ders saatleri —— */
    const lessonTimeOptions = useMemo(
        () => (classroomData[0]?.lesson_times ?? [])
            .map((t: string, i: number) => ({ value: String(i), label: t })),
        [classroomData],
    );

    /* —— Öğrenci listesi (debounce) —— */
    const [studentSearch, setStudentSearch] = useState('');
    const [studentQuery, setStudentQuery] = useState('');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!enabled.students) return;
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setStudentQuery(studentSearch), 400);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [studentSearch, enabled.students]);

    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({
            enabled: enabled.students && !!studentQuery,
            first_name: studentQuery,
            page: 1,
            pageSize: 500,
            classroom_ids: classroom ? [+classroom] : [],
        });

    /* —— Yoklama verisi —— */
    const {
        attendancesData = [],
        loading, error, totalItems, totalPages,
    } = useAttendancesTable({
        enabled: true,
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        lesson_id: +lessonId || undefined,
        level_id: +levelId || undefined,
        classroom_id: +classroom || undefined,
        student_id: +student || undefined,
        time_range: timeId || undefined,
        teacher_polling: 1,
    });

    const yoklamaAlindi = useMemo(
        () => (attendancesData ?? []).some((a: any) => a.already_taken),
        [attendancesData],
    );

    /* —— Satırlar —— */
    const baseRows: Row[] = useMemo(() => (
        (attendancesData ?? []).map((a: any) => ({
            id: a.id,
            class_name: a.classroom?.name || '-',
            fullname: `${a.student?.first_name ?? ''} ${a.student?.last_name ?? ''}`.trim(),
            status: a.status ?? 0,
            admin_status: a.admin_status ?? 0,
        }))
    ), [attendancesData]);

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);

    /* —— Yardımcı —— */
    const isEditable = (r: Row) => r.admin_status === 0;
    const handleStatusClick = (idx: number) =>
        setRows(r => r.map((row, i) =>
            i === idx && isEditable(row)
                ? (updateAttendanceStatus({ id: row.id, status: (row.status + 1) % 3 }),
                    { ...row, status: (row.status + 1) % 3 })
                : row));

    const handleSetAllCame = async () => {
        const updatable = rows.filter(r => isEditable(r) && r.status !== 0);
        if (!updatable.length) return;
        setRows(r => r.map(row => isEditable(row) ? { ...row, status: 0 } : row));
        await updateAllAttendanceStatus(updatable.map(r => r.id), 0);
    };

    /* —— Kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra No', style: { width: 70, textAlign: 'center' },
            render: (_r, _o, i) => <>{(i ?? 0) + 1}</>
        },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'fullname', label: 'Adı Soyadı', render: r => r.fullname },
        {
            key: 'status', label: 'Durum', style: { width: 120, textAlign: 'center' },
            render: (row, _o, idx) => (
                <span
                    style={{
                        cursor: isEditable(row) ? 'pointer' : 'not-allowed',
                        opacity: isEditable(row) ? 1 : 0.5
                    }}
                    className={row.status === 0 ? 'text-success'
                        : row.status === 1 ? 'text-warning' : 'text-danger'}
                    onClick={() => idx !== undefined && isEditable(row) && handleStatusClick(idx)}
                >
                    {row.status === 0 ? 'Geldi' : row.status === 1 ? 'Geç Geldi' : 'Gelmedi'}
                </span>
            ),
        },
        {
            key: 'admin_status', label: 'Yönetici Durumu',
            render: ({ admin_status }) => {
                const m = [
                    { t: '-', c: '' }, { t: 'Raporlu', c: 'text-warning' },
                    { t: 'Görevli', c: 'text-info' }, { t: 'İzinli', c: 'text-success' },
                    { t: 'Özürsüz', c: 'text-danger' }, { t: 'Erken Ayrılma', c: 'text-warning' },
                    { t: 'Tatil', c: 'text-muted' }, { t: 'Katılamama', c: 'text-danger' },
                ];
                const { t, c } = m[admin_status] || m[0];
                return <span className={c}>{t}</span>;
            },
        },
    ], []);

    /* —— Filtreler (hepsi col:1; 4'lü düzen) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: sevenDaysAgo, endDate: today }),
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
            key: 'lesson_id', label: 'Ders', type: 'select', col: 1,
            value: lessonId,
            onClick: () => setEnabled(e => ({ ...e, lessons: true })),
            onChange: setLessonId,
            options: lessonsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'time_range', label: 'Ders Saati', type: 'select', col: 1,
            value: timeId,
            onChange: setTimeId,
            options: lessonTimeOptions,
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
    ], [
        dateRange, levelId, classroom, lessonId, timeId, student,
        levelsData, classroomData, lessonsData, studentsData,
    ]);

    /* —— Render —— */
    return (
        <div>
            {yoklamaAlindi && (
                <div className="alert alert-warning mb-3">
                    Bu ders için zaten yoklama alınmış.
                </div>
            )}

            {/* Filtreler – 4 adet / satır */}
            <FilterGroup
                filters={filters}
                navigate={navigate}
                columnsPerRow={4}
            />

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>Ders Yoklama</span>
                <button
                    style={{
                        marginLeft: 'auto', background: '#52c41a', color: '#fff',
                        border: 'none', borderRadius: 6, padding: '6px 16px',
                        cursor: 'pointer', fontWeight: 500,
                    }}
                    onClick={handleSetAllCame}
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
                onAdd={() => navigate('/somePath')}
            />
        </div>
    );
}

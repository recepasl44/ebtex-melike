
import { useState, useMemo, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import FilterGroup, { FilterDefinition } from '../../component/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';


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
    clicked: boolean;
}


async function updateAttendanceStatus(_: { id: number; status: number }) { }
async function updateAllAttendanceStatus(_: number[], __: number) { }


const STATUS_TXT: Record<number, string> = {
    0: 'Geldi',
    1: 'Geç Geldi',
    2: 'Gelmedi',
};
const STATUS_CLR: Record<number, string> = {
    0: 'text-success',
    1: 'text-warning',
    2: 'text-danger',
};

export default function LessonPollingTable() {

    const today = dayjs().format('YYYY-MM-DD');

    const [dateRange, setDateRange] = useState({ startDate: today, endDate: today });
    const [lessonId, setLessonId] = useState('');
    const [levelId, setLevelId] = useState('');
    const [classroom, setClassroom] = useState('');
    const [student, setStudent] = useState('');
    const [statusFlt, setStatusFlt] = useState('');


    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    const [enabled, setEnabled] = useState({
        lessons: false, levels: false, classes: false, students: false,
    });


    const { lessonsData = [] } = useLessonList({ enabled: enabled.lessons });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        level_id: +levelId || undefined,
        branchId: 0,
    });


    const [studentSearch] = useState('');
    const [studentQuery, setStudentQuery] = useState('');
    const deb = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!enabled.students) return;
        if (deb.current) clearTimeout(deb.current);
        deb.current = setTimeout(() => setStudentQuery(studentSearch), 400);
        return () => { if (deb.current) clearTimeout(deb.current); };
    }, [studentSearch, enabled.students]);

    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({
            enabled: enabled.students && !!studentQuery,
            first_name: studentQuery,
            page: 1,
            pageSize: 1000,
            classroom_ids: classroom ? [+classroom] : [],
        });


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
                ? `${a.student.first_name ?? ''} ${a.student.last_name ?? ''}`.trim()
                : '-',
            status: a.status ?? 0,
            admin_status: a.admin_status ?? 0,
            execute_status: a.executive_status ?? '',
            clicked: false,
        }))
    ), [attendancesData]);

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);


    const isEditable = (r: Row) => r.admin_status === 0;

    const handleStatusChange = (idx: number, value: number) => {
        setRows(r =>
            r.map((row, i) => {
                if (i !== idx || !isEditable(row)) return row;
                updateAttendanceStatus({ id: row.id, status: value });
                return { ...row, status: value, clicked: true };
            }),
        );
    };

    const setAllCame = async () => {
        const updatable = rows.filter(r => isEditable(r) && r.status !== 0);
        if (!updatable.length) return;
        setRows(r => r.map(row =>
            isEditable(row) ? { ...row, status: 0, clicked: true } : row,
        ));
        await updateAllAttendanceStatus(updatable.map(r => r.id), 0);
    };


    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'lesson', label: 'Ders', render: r => r.lesson },
        { key: 'class_name', label: 'Sınıf', render: r => r.class_name },
        { key: 'time', label: 'Ders Saati', render: r => r.time },
        { key: 'teacher_name', label: 'Ders Öğretmeni', render: r => r.teacher_name },
        { key: 'student_name', label: 'Öğrenci Adı', render: r => r.student_name },
        {
            key: 'status',
            label: 'Durum',
            style: { width: 160, textAlign: 'center' },
            render: (_r, _o, idx) => {
                const row = rows[idx!];

                if (!isEditable(row)) {
                    return (
                        <span className={STATUS_CLR[row.status]}>
                            {STATUS_TXT[row.status]}
                        </span>
                    );
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
            key: 'execute_status',
            label: 'Yönetici Durumu',
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
    ], [rows]);


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
                { value: '0', label: STATUS_TXT[0] },
                { value: '1', label: STATUS_TXT[1] },
                { value: '2', label: STATUS_TXT[2] },
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

            {/* Filtreler */}
            <FilterGroup columnsPerRow={4} filters={filters}
                navigate={function (): void { /* özel navigate kullanılmıyor */ }} />

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                {/* <span style={{ fontWeight: 600, fontSize: 18 }}>Ders Yoklama</span> */}
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

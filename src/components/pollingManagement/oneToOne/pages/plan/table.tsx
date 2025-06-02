/* ------------------------------------------------------------------
 *  Öğrenci Bire-bir Talepleri – Liste
 *  route : /pollingManagement/oneToOnePlan
 * -----------------------------------------------------------------*/
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';

import eslestir from '../../../../../../assets/images/media/eşleştir.svg';
import eslestirHover from '../../../../../../assets/images/media/eşleştir-hover.svg';
import TeacherMatchModal from './crud';
import { Button } from 'react-bootstrap';

/* ------------ satır tipi ------------ */
interface Row {
    id: number;
    request_date: string;
    student_name: string;
    lesson_name: string;
    status_text: string;
    assigned_teacher: string;
    hour_range: string;
    area_name: string;
}

export default function OneToOnePlanTable() {
    const navigate = useNavigate();

    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [student, setStudent] = useState('');
    const [lesson, setLesson] = useState('');
    const [areaId, setAreaId] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        levels: false, classes: false, lessons: false, students: false, areas: false,
    });

    /* —— look-ups —— */
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!classLevel,
        class_level: +classLevel || undefined, branchId: 0,
    });
    const { lessonsData = [] } = useLessonList({
        enabled: enabled.lessons, class_level: +classLevel || undefined,
    });
    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({ enabled: enabled.students });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });

    /* —— ana veri —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page, pageSize: paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        student_id: +student || undefined,
        lesson_id: +lesson || undefined,
        used_area_id: +areaId || undefined,
        enabled: true,
    });

    /* —— satırlar —— */
    const rows: Row[] = useMemo(() => (
        attendancesData.map((req: any) => {
            const start = req.start_time || req.start || '';
            const end = req.end_time || req.end || '';
            const range = start && end
                ? `${start.slice(0, 5)} - ${end.slice(0, 5)}`
                : req.hour_range || `${req.total_hours ?? 0} Ders`;

            return {
                id: req.id,
                request_date: dayjs(req.request_date ?? req.start_date).format('DD.MM.YYYY'),
                student_name: req.student_name ||
                    req.students?.[0]?.name_surname ||
                    `${req.students?.[0]?.first_name ?? ''} ${req.students?.[0]?.last_name ?? ''}`.trim() ||
                    '-',
                lesson_name: req.lesson?.name || req.lesson_name || '-',
                status_text: req.status_text || req.status || '-',
                assigned_teacher: req.assigned_teacher?.name_surname ||
                    req.teachers?.[0]?.name_surname || '-',
                hour_range: range,
                area_name: req.used_area?.name || req.area_name || '-',
            };
        })
    ), [attendancesData]);

    /* —— eşleştir modal —— */
    const [matchModal, setMatchModal] = useState<{ open: boolean; demandId: number | null }>({
        open: false, demandId: null,
    });

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra', style: { width: 60, textAlign: 'center' },
            render: (_r, _o, i) => i !== undefined ? i + 1 : ''
        },
        { key: 'request_date', label: 'Talep Tarihi', render: r => r.request_date },
        { key: 'student_name', label: 'Öğrenci', render: r => r.student_name },
        { key: 'lesson_name', label: 'Ders', render: r => r.lesson_name },
        { key: 'status_text', label: 'Durum', render: r => r.status_text },
        { key: 'assigned_teacher', label: 'Atanan Öğretmen', render: r => r.assigned_teacher },
        { key: 'hour_range', label: 'Saat Aralığı', render: r => r.hour_range },
        { key: 'area_name', label: 'Çalışma Alanı', render: r => r.area_name },
        {
            key: 'actions', label: 'İşlemler', style: { width: 100, textAlign: 'center' },
            render: row => (
                <Button variant=""
                    onClick={() => setMatchModal({ open: true, demandId: row.id })}>
                    <img
                        src={eslestir}
                        alt="Eşleştir"
                        width={28} height={28}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).src = eslestirHover; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).src = eslestir; }}
                    />
                </Button>
            ),
        },
    ], []);

    /* —— filtreler (col:1 → 4/satır) —— */
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
            options: lessonsData.map(d => ({ value: String(d.id), label: d.name })),
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
        {
            key: 'areaId', label: 'Bire-bir Alanı', type: 'select', col: 1,
            value: areaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            onChange: setAreaId,
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
    ], [
        dateRange, classLevel, classroom, lesson, student, areaId,
        levelsData, classroomData, lessonsData, studentsData, usedAreasData,
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
                pageTitle="Öğrenci Bire-bir Talepleri"
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
                exportFileName="one_to_one_plan"
            />

            {matchModal.open && matchModal.demandId && (
                <TeacherMatchModal
                    demandId={matchModal.demandId}
                    show
                    onClose={() => setMatchModal({ open: false, demandId: null })}
                />
            )}
        </>
    );
}

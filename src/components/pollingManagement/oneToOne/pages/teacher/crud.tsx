/* ------------------------------------------------------------------
 *  Öğretmen Bire-bir Planı – Liste görünümü
 *  route : /onebyonePolling/teacherPlan/crud
 * -----------------------------------------------------------------*/
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* API */
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';

/* ----- satır tipi ----- */
interface SlotRow {
    week_day: string; /* 1–7  */
    start: string;    /* HH:mm */
    end: string;      /* HH:mm */
}

const DAYS = [
    { value: '1', label: 'Pazartesi' },
    { value: '2', label: 'Salı' },
    { value: '3', label: 'Çarşamba' },
    { value: '4', label: 'Perşembe' },
    { value: '5', label: 'Cuma' },
    { value: '6', label: 'Cumartesi' },
    { value: '7', label: 'Pazar' },
];

export default function TeacherOneByOnePlanCrud() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    /* plan detayı */
    const { attendance: fetched, status, error } = useAttendanceDetail({
        attendanceId: Number(id),
        enabled: !!id,
    });

    /* yardımcı listeler */
    const { lessonsData = [] } = useLessonList({ enabled: true });
    const { attendanceTeachersData = [] } = useAttendanceTeachersTable({ enabled: true });

    /* filtre state’leri */
    const [teacherId, setTeacherId] = useState('');
    const [lessonId, setLessonId] = useState('');
    const [weekDays, setWeekDays] = useState<string[]>([]);

    /* kaynak satırlar */
    const sourceRows: SlotRow[] = useMemo(() => {
        if (!fetched || !Array.isArray(fetched.timeTable)) return [];

        return fetched.timeTable.map((t: any) => ({
            week_day: String(t.day_id ?? dayjs(fetched.start_date).day()),
            start: t.start_time?.slice(0, 5) ?? '00:00',
            end: t.end_time?.slice(0, 5) ?? '00:00',
        }));
    }, [fetched]);

    /* filtre uygulanmış satırlar */
    const displayedRows = useMemo(() => (
        sourceRows.filter(r => {
            const teacherOK = !teacherId || teacherId === String(fetched?.teachers?.[0]?.id ?? '');
            const lessonOK = !lessonId || lessonId === String(fetched?.lesson?.id ?? '');
            const dayOK = !weekDays.length || weekDays.includes(r.week_day);
            return teacherOK && lessonOK && dayOK;
        })
    ), [sourceRows, teacherId, lessonId, weekDays, fetched]);

    /* kolonlar */
    const columns: ColumnDefinition<SlotRow>[] = useMemo(() => [
        {
            key: 'week_day',
            label: 'Gün',
            render: r => DAYS.find(d => d.value === r.week_day)?.label ?? '-',
        },
        {
            key: 'lesson',
            label: 'Ders',
            render: () =>
                lessonsData.find(l => String(l.id) === lessonId)?.name ||
                fetched?.lesson?.name ||
                '-',
        },
        {
            key: 'time',
            label: 'Saat Aralığı',
            render: r => `${r.start} - ${r.end}`,
        },
        /* ───── İşlemler sütunu (kalem butonu) ───── */
        {
            key: 'actions',
            label: 'İşlemler',
            style: { width: 70, textAlign: 'center' },
            render: (_row, _open, idx) => (
                <button
                    className="btn btn-icon btn-sm btn-info-light"
                    title="Düzenle"
                    onClick={() => {
                        /* burada ileride slot düzenleme modalı açılabilir  */
                        console.log('edit slot index', idx);
                    }}
                >
                    <i className="ti ti-pencil" />
                </button>
            ),
        },
    ], [lessonsData, lessonId, fetched]);

    /* filtre tanımları */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'teacher',
            label: 'Öğretmen',
            type: 'select',
            value: teacherId,
            onChange: setTeacherId,
            options: attendanceTeachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
        {
            key: 'lesson',
            label: 'Ders',
            type: 'select',
            value: lessonId,
            onChange: setLessonId,
            options: lessonsData.map(l => ({
                value: String(l.id),
                label: l.name,
            })),
        },
        {
            key: 'week_days',
            label: 'Haftanın Günleri',
            type: 'multiselect',
            value: weekDays,
            onChange: (v: string | string[]) =>
                setWeekDays(Array.isArray(v) ? v : v ? [v] : []),
            options: DAYS,
        },
    ], [teacherId, lessonId, weekDays, attendanceTeachersData, lessonsData]);

    /* render */
    return (
        <ReusableTable<SlotRow>
            modalTitle="Öğretmen Birebir Planı"
            showModal
            onCloseModal={() => navigate(-1)}
            tableMode="single"
            columns={columns}
            data={displayedRows}
            filters={filters}
            loading={status === 'LOADING'}
            error={error}
            showExportButtons={false}
        />
    );
}

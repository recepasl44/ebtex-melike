/* ------------------------------------------------------------------
 *  Etüt / Çalışma Programı – StudyProgramTable
 *  route : /pollingManagement/studyProgram
 * -----------------------------------------------------------------*/
import { useState, useMemo } from 'react';
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
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';

import listBtn from '../../../../../../assets/images/media/list-button.svg';
import listHover from '../../../../../../assets/images/media/list-hover.svg';
import { Button } from 'react-bootstrap';

/* ───────── Row tipi ───────── */
interface Row {
    id: number;
    date: string;
    group_name: string;
    days_text: string;
    time_range: string;
    area_name: string;
    duty_teacher: string;
}

const ROOT = `${import.meta.env.BASE_URL}pollingManagement/studyProgram`;

export default function StudyProgramTable() {
    const navigate = useNavigate();

    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [timeRange, setTimeRange] = useState('');
    const [teacher, setTeacher] = useState('');
    const [status, setStatus] = useState('');

    /* —— sayfalama —— */
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(10);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        groups: false, areas: false, teachers: false,
    });

    /* —— look-ups —— */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { attendanceTeachersData: teachersData = [] }
        = useAttendanceTeachersTable({ enabled: enabled.teachers });

    /* —— ana liste —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        used_area_id: +areaId || undefined,
        week_day: +weekDay || undefined,
        time_range: timeRange || undefined,
        duty_teacher_id: +teacher || undefined,
        status,
        enabled: true,
    });

    /* —— rows —— */
    const rows: Row[] = useMemo(() => (
        attendancesData.map((a: any) => ({
            id: a.id,
            date: dayjs(a.start_date).format('DD.MM.YYYY'),
            group_name: a.group?.name || '-',
            days_text: a.week_days_text ||
                a.days?.map((d: any) => d.day_name).join(', ') || '-',
            time_range: a.time_range || '-',
            area_name: a.used_area?.name || '-',
            duty_teacher: a.duty_teacher?.name_surname || '-',
        }))
    ), [attendancesData]);

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'group_name', label: 'Grup Adı', render: r => r.group_name },
        { key: 'days_text', label: 'Günler', render: r => r.days_text },
        { key: 'time_range', label: 'Saat Aralığı', render: r => r.time_range },
        { key: 'area_name', label: 'Etüt Alanı', render: r => r.area_name },
        { key: 'duty_teacher', label: 'Görevli Öğretmen', render: r => r.duty_teacher },
        {
            key: 'actions', label: 'İşlemler', style: { width: 110, textAlign: 'center' },
            render: row => (
                <div className="d-flex gap-1 justify-content-center">
                    <Button variant=""
                        className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                        onClick={() => navigate(`${ROOT}/crud/${row.id}`)}>
                        <i className="ti ti-eye" />
                    </Button>

                    <Button variant=""
                        onClick={() => navigate(`${ROOT}/crud/${row.id}?list=1`)}>
                        <img
                            src={listBtn}
                            alt="Liste"
                            style={{ width: 28, height: 28 }}
                            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).src = listHover; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).src = listBtn; }}
                        />
                    </Button>
                </div>
            ),
        },
    ], [navigate]);

    /* —— filtreler (2 satır * 4 kolon) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 2,
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
            key: 'area_id', label: 'Etüt Alanı', type: 'select', col: 1,
            value: areaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            onChange: setAreaId,
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            key: 'week_day', label: 'Haftanın Günleri', type: 'select', col: 1,
            value: weekDay,
            onChange: setWeekDay,
            options: [
                { value: '1', label: 'Pazartesi' }, { value: '2', label: 'Salı' },
                { value: '3', label: 'Çarşamba' }, { value: '4', label: 'Perşembe' },
                { value: '5', label: 'Cuma' }, { value: '6', label: 'Cumartesi' },
                { value: '7', label: 'Pazar' },
            ],
        },
        {
            key: 'time_range', label: 'Saat Aralığı', type: 'text', col: 1,
            value: timeRange,
            onChange: setTimeRange,
        },
        {
            key: 'teacher', label: 'Görevli Öğretmen', type: 'select', col: 1,
            value: teacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            onChange: setTeacher,
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
        {
            key: 'status', label: 'Durum', type: 'select', col: 1,
            value: status,
            onChange: setStatus,
            options: [
                { value: '0', label: 'Pasif' },
                { value: '1', label: 'Aktif' },
            ],
        },
    ], [
        dateRange, groupId, areaId, weekDay, timeRange,
        teacher, status, groupsData, usedAreasData, teachersData,
    ]);

    /* —— render —— */
    return (
        <>
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
                exportFileName="study_program_list"
            />
        </>
    );
}

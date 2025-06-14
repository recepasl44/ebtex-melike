/* ------------------------------------------------------------------
 *  Bire-bir > “Günlük Yoklama” listesi – DailyPollingTable
 *  route : /onebyonePolling/attendanceDaily
 * -----------------------------------------------------------------*/
import { useMemo, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import FilterGroup, { FilterDefinition } from '../../component/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

import tedbir_al from '../../../../../../assets/images/media/tedbir-al.svg';
import tedbir_al_hover from '../../../../../../assets/images/media/tedbir-al-hover.svg';

/* ---------- ID-↔-NAME / COLOR ---------- */
type StatusId = 0 | 1 | 2 | 3;
const STATUS_NAME: Record<StatusId, string> = {
    0: 'İzinli',
    1: 'Raporlu',
    2: 'Görevli',
    3: 'Özürsüz',
};
const STATUS_CLR: Record<StatusId, string> = {
    0: '#009ef7',
    1: '#ff55c0',
    2: '#18c96e',
    3: '#f1416c',
};

/* ---------- Row tipi ---------- */
interface Row {
    id: number;
    date: string;
    fullname: string;
    duty_type: 'Öğretmen' | 'Personel';
    demand_type: 'İzin' | 'Rapor' | 'Görevli';
    absence: string;
    status_id: StatusId;
    clicked: boolean; /* dropdown ilk kez açıldı mı? */
}

const DailyPollingTable: React.FC = () => {
    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [dutyType, setDutyType] = useState('');
    const [userId, setUserId] = useState('');
    const [demandType, setDemandType] = useState('');
    const [status, setStatus] = useState('');

    /* —— sayfalama —— */
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(10);

    /* —— kullanıcı listesi —— */
    const { usersData = [] } =
        useUsersTable({ enabled: true, role_id: 2, paginate: 999 });

    /* —— yoklama verisi —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        enabled: true,
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        duty_type: dutyType || undefined,
        user_id: +userId || undefined,
        demand_type: demandType || undefined,
        status: status || undefined,
    });

    /* —— API → Row[] —— */
    const apiRows: Row[] = useMemo(() => (
        attendancesData.map((a: any) => ({
            id: a.id,
            date: dayjs(a.date).format('DD.MM.YYYY'),
            fullname: a.user?.name_surname || '-',
            duty_type: a.duty_type ?? '-',
            demand_type: a.demand_type ?? '-',
            absence: `${a.absence_days ?? 1} Gün`,
            status_id: (
                a.status_name === 'İzinli' ? 0 :
                    a.status_name === 'Raporlu' ? 1 :
                        a.status_name === 'Görevli' ? 2 : 3
            ) as StatusId,
            clicked: false,
        }))
    ), [attendancesData]);

    /* —— lokal state —— */
    const [rows, setRows] = useState<Row[]>(apiRows);
    useEffect(() => setRows(apiRows), [apiRows]);

    /* —— durum değişimi —— */
    const handleStatusChange = (idx: number, value: number) =>
        setRows(r => r.map((row, i) =>
            i === idx ? { ...row, status_id: value as StatusId, clicked: true } : row,
        ));

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'fullname', label: 'Adı Soyadı', render: r => r.fullname },
        { key: 'duty_type', label: 'Görevi', render: r => r.duty_type },
        { key: 'demand_type', label: 'Talep Türü', render: r => r.demand_type },
        { key: 'absence', label: 'Devamsızlık', render: r => r.absence },
        {
            key: 'status',
            label: 'Durum',
            style: { width: 180 },
            render: (_r, _o, idx) => {
                const row = rows[idx!];
                return (
                    <select
                        className="form-select p-1"
                        style={{
                            cursor: 'pointer',
                            fontWeight: 500,
                            color: row.clicked ? STATUS_CLR[row.status_id] : undefined,
                        }}
                        value={row.clicked ? row.status_id : ''}
                        onChange={e => handleStatusChange(idx!, Number(e.target.value))}
                    >
                        <option value="" disabled>Tıklayınız</option>
                        <option value={0} style={{ color: STATUS_CLR[0] }}>{STATUS_NAME[0]}</option>
                        <option value={1} style={{ color: STATUS_CLR[1] }}>{STATUS_NAME[1]}</option>
                        <option value={2} style={{ color: STATUS_CLR[2] }}>{STATUS_NAME[2]}</option>
                        <option value={3} style={{ color: STATUS_CLR[3] }}>{STATUS_NAME[3]}</option>
                    </select>
                );
            },
        },
        {
            key: 'actions',
            label: 'İşlem',
            style: { width: 120, textAlign: 'center' },
            render: () => (
                <Button variant="">
                    <img
                        src={tedbir_al}
                        alt="Tedbir"
                        style={{ width: 28, height: 28 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).src = tedbir_al_hover; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).src = tedbir_al; }}
                    />
                </Button>
            ),
        },
    ], [rows]);

    /* —— filtreler —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange, onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'dutyType', label: 'Görev Türü', type: 'select', col: 1,
            value: dutyType, onChange: setDutyType,
            options: [
                { label: 'Öğretmen', value: 'Öğretmen' },
                { label: 'Personel', value: 'Personel' },
            ],
        },
        {
            key: 'userId', label: 'Personel Adı', type: 'select', col: 1,
            value: userId, onChange: setUserId,
            options: usersData.map(u => ({
                value: String(u.id),
                label: u.name_surname || u.name || '-',
            })),
        },
        {
            key: 'demandType', label: 'Talep Türü', type: 'select', col: 1,
            value: demandType, onChange: setDemandType,
            options: [
                { label: 'İzin', value: 'izin' },
                { label: 'Rapor', value: 'rapor' },
                { label: 'Görevli', value: 'görevli' },
            ],
        },
        {
            key: 'status', label: 'Durum', type: 'select', col: 1,
            value: status, onChange: setStatus,
            options: [
                { label: 'İzinli', value: 'İzinli' },
                { label: 'Raporlu', value: 'Raporlu' },
                { label: 'Görevli', value: 'Görevli' },
                { label: 'Özürsüz', value: 'Özürsüz' },
            ],
        },
    ], [dateRange, dutyType, userId, demandType, status, usersData]);

    /* —— render —— */
    const navigate = useNavigate();
    return (
        <>
            <FilterGroup filters={filters} columnsPerRow={4} navigate={navigate} />

            <ReusableTable<Row>
                tableMode="single"
                columns={columns}
                data={rows}
                loading={loading}
                error={error}
                showExportButtons
                exportFileName="daily_staff_polling"
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={paginate}
                onPageChange={setPage}
                onPageSizeChange={s => { setPaginate(s); setPage(1); }}
            />
        </>
    );
};

export default DailyPollingTable;

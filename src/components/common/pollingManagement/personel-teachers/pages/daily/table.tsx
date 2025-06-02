

import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';


interface Row {
    id: number;
    date: string;
    fullname: string;
    duty_type: 'Öğretmen' | 'Personel';
    demand_type: 'İzin' | 'Rapor' | 'Görevli';
    absence: string;                 // “1 Gün” vb.
    status: 'İzinli' | 'Raporlu' | 'İzinsiz';
}

const DailyPollingTable: React.FC = () => {
    /* ------------- filtre state’leri ------------- */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [dutyType, setDutyType] = useState('');   // Öğretmen | Personel
    const [userId, setUserId] = useState('');
    const [demandType, setDemandType] = useState('');   // izin | rapor | görevli
    const [status, setStatus] = useState('');   // izinli | raporlu | izinsiz

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    const { usersData = [] } = useUsersTable({
        enabled: true,
        role_id: 2,
        pageSize: 999,
    });


    const {
        attendancesData = [],
        loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        enabled: true,
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        duty_type: dutyType || undefined,
        user_id: +userId || undefined,
        demand_type: demandType || undefined,
        status: status || undefined,
    });

    /* ------------- attendances → rows ----------- */
    const rows: Row[] = useMemo(() => (
        attendancesData.map((a: any) => ({
            id: a.id,
            date: dayjs(a.date).format('DD.MM.YYYY'),
            fullname: a.user?.name_surname || '-',
            duty_type: a.duty_type ?? '-',
            demand_type: a.demand_type ?? '-',
            absence: `${a.absence_days ?? 0} Gün`,
            status: a.status ?? '-',
        }))
    ), [attendancesData]);

    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'fullname', label: 'Adı Soyadı', render: r => r.fullname },
        { key: 'duty_type', label: 'Görevi', render: r => r.duty_type },
        { key: 'demand_type', label: 'Talep Türü', render: r => r.demand_type },
        { key: 'absence', label: 'Devamsızlık', render: r => r.absence },

        {
            key: 'status', label: 'Durum',
            render: r => {
                const color =
                    r.status === 'İzinli' ? '#009ef7' :   // mavi
                        r.status === 'Raporlu' ? '#ff55c0' :   // pembe
                            '#f1416c';    // kırmızı (İzinsiz)
                return <span style={{ color, fontWeight: 500 }}>{r.status}</span>;
            }
        },

        {
            key: 'actions', label: 'İşlem', style: { width: 120, textAlign: 'center' },
            render: () => (
                <button className="btn btn-sm btn-light rounded-pill">
                    Tedbir Al
                </button>
            )
        },
    ], []);

    /* ------------- filtreler -------------------- */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' })
        },

        {
            key: 'dutyType', label: 'Görev Türü', type: 'select',
            value: dutyType, onChange: setDutyType,
            options: [
                { label: 'Öğretmen', value: 'Öğretmen' },
                { label: 'Personel', value: 'Personel' },
            ]
        },

        {
            key: 'userId', label: 'Personel Adı', type: 'select',
            value: userId, onChange: setUserId,
            options: usersData.map(u => ({
                value: String(u.id),
                label: u.name_surname || u.name || '-',
            }))
        },

        {
            key: 'demandType', label: 'Talep Türü', type: 'select',
            value: demandType, onChange: setDemandType,
            options: [
                { label: 'İzin', value: 'izin' },
                { label: 'Rapor', value: 'rapor' },
                { label: 'Görevli', value: 'görevli' },
            ]
        },

        {
            key: 'status', label: 'Durum', type: 'select',
            value: status, onChange: setStatus,
            options: [
                { label: 'İzinli', value: 'İzinli' },
                { label: 'Raporlu', value: 'Raporlu' },
                { label: 'İzinsiz', value: 'İzinsiz' },
            ]
        },
    ], [dateRange, dutyType, userId, demandType, status, usersData]);

    /* ------------- render ----------------------- */
    return (
        <ReusableTable<Row>
            columns={columns}
            data={rows}
            filters={filters}
            loading={loading}
            error={error}
            tableMode="single"
            showExportButtons
            exportFileName="daily_staff_polling"

            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}
        />
    );
};

export default DailyPollingTable;

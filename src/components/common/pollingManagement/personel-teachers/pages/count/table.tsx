

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
    izin_count: number;
    rapor_count: number;
    gorevli_count: number;
    total: number;
}

const PollingCountTable: React.FC = () => {

    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [dutyType, setDutyType] = useState('');      // Öğretmen | Personel
    const [userId, setUserId] = useState('');

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    const { usersData = [] } = useUsersTable({
        enabled: true,
        role_id: 2,          // öğretmen+personel
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

        stats_only: true,
    });


    const rows: Row[] = useMemo(() => (
        attendancesData.map((a: any) => ({
            id: a.id,
            date: dayjs(a.date).format('DD.MM.YYYY'),
            fullname: a.user?.name_surname || '-',
            duty_type: a.duty_type ?? '-',
            izin_count: a.izin_count ?? 0,
            rapor_count: a.rapor_count ?? 0,
            gorevli_count: a.gorevli_count ?? 0,
            total: (a.izin_count ?? 0) + (a.rapor_count ?? 0) + (a.gorevli_count ?? 0),
        }))
    ), [attendancesData]);


    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date', label: 'Tarih', render: r => r.date },
        { key: 'fullname', label: 'Adı Soyadı', render: r => r.fullname },
        { key: 'duty_type', label: 'Görevi', render: r => r.duty_type },

        { key: 'izin_count', label: 'İzin Sayısı', render: r => r.izin_count },
        { key: 'rapor_count', label: 'Rapor Sayısı', render: r => r.rapor_count },
        { key: 'gorevli_count', label: 'Görevli Sayısı', render: r => r.gorevli_count },
        { key: 'total', label: 'Toplam', render: r => r.total },
    ], []);


    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'dutyType', label: 'Görev Türü', type: 'select',
            value: dutyType, onChange: setDutyType,
            options: [
                { label: 'Öğretmen', value: 'Öğretmen' },
                { label: 'Personel', value: 'Personel' },
            ],
        },
        {
            key: 'userId', label: 'Personel Adı', type: 'select',
            value: userId, onChange: setUserId,
            options: usersData.map(u => ({
                value: String(u.id),
                label: u.name_surname || u.name || '-',
            })),
        },
    ], [dateRange, dutyType, userId, usersData]);


    return (
        <ReusableTable<Row>
            tableMode="single"
            columns={columns}
            data={rows}
            filters={filters}
            loading={loading}
            error={error}
            showExportButtons
            exportFileName="staff_polling_counts"

            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}
        />
    );
};

export default PollingCountTable;

/* -------------------------------------------------------------------------- */
/* table.tsx – Personel / Öğretmen Yoklama › Talep Yönetimi                   */
/* -------------------------------------------------------------------------- */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* ───────── API hook’ları ───────── */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

/* ───── Satır tipi ───── */
interface Row {
    id: number;
    personnel_name: string;
    date_range: string;     // “01.01.2025 – 08.01.2025”
    demand_type: string;    // İzin | Rapor | vb.
    status: string;         // Bekliyor | Onaylandı | Reddedildi
    description: string;    // Açıklama
    reported: boolean;      // Muhasebeye Bildirildi mi?
}

/* Router kökü (edit / detail v.s.) */
const ROOT = `${import.meta.env.BASE_URL}pollingManagement/staffDemands`;

export default function DemandManagementTable() {
    const navigate = useNavigate();

    /* ——— filtre state’leri ——— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [personnel, setPersonnel] = useState('');
    const [demandType, setDemandType] = useState('');
    const [status, setStatus] = useState('');

    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    /* ——— Lazy-load bayrakları ——— */
    const [enabled, setEnabled] = useState({
        users: false,
    });

    /* ——— yardımcı listeler ——— */
    const { usersData = [] } = useUsersTable({
        enabled: enabled.users,
        role_id: 2,          // öğretmen + yönetici
        pageSize: 999,
    });

    /* ——— ana liste ———
       Burada “attendance” API’si; backend’de “demands” verisini dönüyor
       varsayımıyla kullanıldı. Uygulamanızda farklı slice varsa
       yalnızca bu kısmı değiştirmeniz yeter.                               */
    const {
        attendancesData = [],
        loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        enabled: true,
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        user_id: +personnel || undefined,
        demand_type: demandType || undefined,
        status: status || undefined,
    });

    /* ——— attendances → Row[] ——— */
    const rows: Row[] = useMemo(() => (
        attendancesData.map((d: any) => ({
            id: d.id,
            personnel_name: d.user?.name_surname || '-',
            date_range: `${dayjs(d.start_date).format('D.M.YYYY')} – ${dayjs(d.end_date).format('D.M.YYYY')}`,
            demand_type: d.demand_type ?? '-',
            status: d.status ?? '-',
            description: d.description ?? '-',
            reported: !!d.is_reported_accounting,
        }))
    ), [attendancesData]);

    /* ——— kolonlar ——— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'personnel_name', label: 'Personel Adı', render: r => r.personnel_name },
        { key: 'date_range', label: 'Tarih Aralığı', render: r => r.date_range },
        { key: 'demand_type', label: 'Talep Türü', render: r => r.demand_type },
        {
            key: 'status', label: 'Durum',
            render: r => {
                if (r.status === 'Onaylandı') return <span className="text-success">{r.status}</span>;
                if (r.status === 'Bekliyor') return <span className="text-warning">{r.status}</span>;
                if (r.status === 'Reddedildi') return <span className="text-danger">{r.status}</span>;
                return r.status;
            }
        },
        { key: 'description', label: 'Açıklama', render: r => r.description },
        {
            key: 'reported', label: 'Muhasebeye Bildirildi mi?',
            render: r => r.reported ? 'Evet' : 'Hayır'
        },
        {
            key: 'actions', label: 'İşlem', style: { textAlign: 'center', width: 90 },
            render: (row) => (
                <button
                    className="btn btn-icon btn-sm btn-info-light rounded-pill"
                    /* → /pollingManagement/staffDemands/crud/{id} */
                    onClick={() => navigate(`${ROOT}/crud/${row.id}`)}
                >
                    <i className="ti ti-pencil" />
                </button>
            ),
        },
    ], [navigate]);

    /* ——— filtreler ——— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'personnel', label: 'Personel Adı', type: 'select',
            value: personnel, onChange: setPersonnel,
            onClick: () => setEnabled(e => ({ ...e, users: true })),
            options: usersData.map(u => ({
                value: String(u.id),
                label: u.name_surname || u.name || '-',
            })),
        },
        {
            key: 'demandType', label: 'Talep Türü', type: 'select',
            value: demandType, onChange: setDemandType,
            options: [
                { value: 'izin', label: 'İzin' },
                { value: 'rapor', label: 'Rapor' },
            ],
        },
        {
            key: 'status', label: 'Durum', type: 'select',
            value: status, onChange: setStatus,
            options: [
                { value: 'Bekliyor', label: 'Bekliyor' },
                { value: 'Onaylandı', label: 'Onaylandı' },
                { value: 'Reddedildi', label: 'Reddedildi' },
            ],
        },
    ], [dateRange, personnel, demandType, status, usersData]);

    /* ——— render ——— */
    return (
        <ReusableTable<Row>
            columns={columns}
            data={rows}
            loading={loading}
            error={error}
            filters={filters}
            tableMode="single"
            showExportButtons
            exportFileName="staff_demand_list"

            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}
        />
    );
}

/* DemandManagementTable.tsx – revize */

import { useMemo, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

/* —— Row tipi —— */
interface Row {
    id: number;
    personnel_name: string;
    date_range: string;
    demand_type: string;
    status: number;   // 0=Bekliyor • 1=Onaylandı • 2=Reddedildi
    description: string;
    reported: boolean;
}

/* —— Yardımcı eşlemeler —— */
const STATUS_TXT: Record<number, string> = {
    0: 'Onay Bekliyor',
    1: 'Onaylandı',
    2: 'Reddedildi',
};
const STATUS_CLR: Record<number, string> = {
    0: 'text-warning',
    1: 'text-success',
    2: 'text-danger',
};

export default function DemandManagementTable() {
    /* — filtre state’leri — */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [personnel, setPersonnel] = useState('');
    const [demandType, setDemandType] = useState('');
    const [statusFlt, setStatusFlt] = useState('');

    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* — lazy listeler — */
    const [enabled, setEnabled] = useState({ users: false });
    const { usersData = [] } = useUsersTable({ enabled: enabled.users, role_id: 2, paginate: 999 });

    /* — ana sorgu — */
    const { attendancesData = [], loading, error, totalPages, totalItems } =
        useAttendancesTable({
            enabled: true,
            page, paginate,
            start_date: dateRange.startDate || undefined,
            end_date: dateRange.endDate || undefined,
            user_id: +personnel || undefined,
            demand_type: demandType || undefined,
            status: statusFlt || undefined,
        });

    /* — API → Row[] — */
    const baseRows: Row[] = useMemo(() => (
        attendancesData.map((d: any) => ({
            id: d.id,
            personnel_name: d.user?.name_surname || '-',
            date_range: `${dayjs(d.start_date).format('D.M.YYYY')} – ${dayjs(d.end_date).format('D.M.YYYY')}`,
            demand_type: d.demand_type ?? '-',
            status: d.status === 'Onaylandı' ? 1 : d.status === 'Reddedildi' ? 2 : 0,
            description: d.description ?? '-',
            reported: !!d.is_reported_accounting,
        }))
    ), [attendancesData]);

    /* — lokal state — */
    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);

    /* — tıklamalar — */
    const toggleStatus = (idx: number) =>
        setRows(r => r.map((row, i) => i === idx ? { ...row, status: (row.status + 1) % 3 } : row));
    const toggleReported = (idx: number) =>
        setRows(r => r.map((row, i) => i === idx ? { ...row, reported: !row.reported } : row));

    /* — kolonlar — */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'personnel_name', label: 'Personel Adı', render: r => r.personnel_name },
        { key: 'date_range', label: 'Tarih Aralığı', render: r => r.date_range },
        { key: 'demand_type', label: 'Talep Türü', render: r => r.demand_type },
        { key: 'description', label: 'Açıklama', render: r => r.description },
        {
            key: 'reported', label: 'Muhasebeye Bildirildi mi?',
            render: (_r, _o, idx) => (
                <span
                    style={{ cursor: 'pointer', fontWeight: 500 }}
                    className={rows[idx!].reported ? 'text-success' : 'text-danger'}
                    onClick={() => idx !== undefined && toggleReported(idx)}
                >
                    {rows[idx!].reported ? 'Evet' : 'Hayır'}
                </span>
            )
        },
        {
            key: 'status', label: 'Durum',
            render: (_r, _o, idx) => (
                <span
                    style={{ cursor: 'pointer', fontWeight: 500 }}
                    className={STATUS_CLR[rows[idx!].status]}
                    onClick={() => idx !== undefined && toggleStatus(idx)}
                >
                    {STATUS_TXT[rows[idx!].status]}
                </span>
            )
        },
    ], [rows]);

    /* — filtreler — */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange, onChange: v => setDateRange(v ?? { startDate: '', endDate: '' })
        },
        {
            key: 'personnel', label: 'Personel Adı', type: 'select',
            value: personnel, onChange: setPersonnel,
            onClick: () => setEnabled(e => ({ ...e, users: true })),
            options: usersData.map(u => ({ value: String(u.id), label: u.name_surname || u.name || '-' }))
        },
        {
            key: 'demandType', label: 'Talep Türü', type: 'select',
            value: demandType, onChange: setDemandType,
            options: [
                { value: 'izin', label: 'İzin' },
                { value: 'rapor', label: 'Rapor' },
                { value: 'görevli', label: 'Görevli' },
            ]
        },
        {
            key: 'status', label: 'Durum', type: 'select',
            value: statusFlt, onChange: setStatusFlt,
            options: [
                { value: 'Onay Bekliyor', label: 'Onay Bekliyor' },
                { value: 'Onaylandı', label: 'Onaylandı' },
                { value: 'Reddedildi', label: 'Reddedildi' },
            ]
        },
    ], [dateRange, personnel, demandType, statusFlt, usersData]);

    /* — render — */
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
            pageSize={paginate}
            onPageChange={setPage}
            onPageSizeChange={sz => { setPaginate(sz); setPage(1); }}
        />
    );
}

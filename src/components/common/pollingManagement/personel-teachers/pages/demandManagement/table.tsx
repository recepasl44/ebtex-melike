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
    status: number;       // 0=Bekliyor • 1=Onaylandı • 2=Reddedildi
    description: string;
    reported: number;     // 0=Hayır • 1=Evet
    clickedStatus: boolean;
    clickedRep: boolean;
}

/* —— Yardımcı eşlemeler —— */
const STATUS_TXT = ['Onay Bekliyor', 'Onaylandı', 'Reddedildi'];
const STATUS_CLR = ['text-warning', 'text-success', 'text-danger'];
const REPORTED_TXT = ['Hayır', 'Evet'];
const REPORTED_CLR = ['text-danger', 'text-success'];

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
    const { usersData = [] } =
        useUsersTable({ enabled: enabled.users, role_id: 2, paginate: 999 });

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
            reported: d.is_reported_accounting ? 1 : 0,
            clickedStatus: false,
            clickedRep: false,
        }))
    ), [attendancesData]);

    /* — lokal state — */
    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);

    /* — değiştirme handler’ları — */
    const handleStatusChange = (idx: number, value: number) =>
        setRows(r => r.map((row, i) =>
            i === idx ? { ...row, status: value, clickedStatus: true } : row,
        ));

    const handleReportedChange = (idx: number, value: number) =>
        setRows(r => r.map((row, i) =>
            i === idx ? { ...row, reported: value, clickedRep: true } : row,
        ));

    /* — kolonlar — */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'personnel_name', label: 'Personel Adı', render: r => r.personnel_name },
        { key: 'date_range', label: 'Tarih Aralığı', render: r => r.date_range },
        { key: 'demand_type', label: 'Talep Türü', render: r => r.demand_type },
        { key: 'description', label: 'Açıklama', render: r => r.description },
        {
            key: 'reported',
            label: 'Muhasebeye Bildirildi mi?',
            style: { width: 180 },
            render: (_r, _o, idx) => {
                const row = rows[idx!];
                return (
                    <select
                        className={`form-select p-1 ${row.clickedRep ? REPORTED_CLR[row.reported] : ''}`}
                        style={{ cursor: 'pointer', fontWeight: 500 }}
                        value={row.clickedRep ? row.reported : ''}
                        onChange={e => handleReportedChange(idx!, Number(e.target.value))}
                    >
                        <option value="" disabled>Tıklayınız</option>
                        <option value={0} className={REPORTED_CLR[0]}>{REPORTED_TXT[0]}</option>
                        <option value={1} className={REPORTED_CLR[1]}>{REPORTED_TXT[1]}</option>
                    </select>
                );
            },
        },
        {
            key: 'status',
            label: 'Durum',
            style: { width: 170 },
            render: (_r, _o, idx) => {
                const row = rows[idx!];
                return (
                    <select
                        className={`form-select p-1 ${row.clickedStatus ? STATUS_CLR[row.status] : ''}`}
                        style={{ cursor: 'pointer', fontWeight: 500 }}
                        value={row.clickedStatus ? row.status : ''}
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
    ], [rows]);

    /* — filtreler — */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'personnel', label: 'Personel Adı', type: 'select',
            value: personnel,
            onClick: () => setEnabled(e => ({ ...e, users: true })),
            onChange: setPersonnel,
            options: usersData.map(u => ({
                value: String(u.id),
                label: u.name_surname || u.name || '-',
            })),
        },
        {
            key: 'demandType', label: 'Talep Türü', type: 'select',
            value: demandType,
            onChange: setDemandType,
            options: [
                { value: 'izin', label: 'İzin' },
                { value: 'rapor', label: 'Rapor' },
                { value: 'görevli', label: 'Görevli' },
            ],
        },
        {
            key: 'status', label: 'Durum', type: 'select',
            value: statusFlt,
            onChange: setStatusFlt,
            options: [
                { value: 'Onay Bekliyor', label: 'Onay Bekliyor' },
                { value: 'Onaylandı', label: 'Onaylandı' },
                { value: 'Reddedildi', label: 'Reddedildi' },
            ],
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

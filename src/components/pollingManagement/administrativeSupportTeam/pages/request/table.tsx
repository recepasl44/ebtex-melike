/* DemandManagementTable.tsx  –  Personel Talep Listesi (revize)
   ------------------------------------------------------------- */

import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../component/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

/* ---------- Tipler ---------- */
interface Row {
    id: number;
    personnel_name: string;
    date_range: string;
    request_type: string;
    lesson_hours: string;
    description: string;
    document_url: string | null;
    status: number; // 0‒2
}

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

/* ---------- Bileşen ---------- */
export default function DemandManagementTable() {
    const navigate = useNavigate();

    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [personnel, setPersonnel] = useState('');
    const [reqType, setReqType] = useState('');
    const [desc, setDesc] = useState('');
    const [withFile, setWithFile] = useState(''); // '', 'yes', 'no'
    const [statusFlt, setStatusFlt] = useState('');

    /* —— sayfalama —— */
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* —— kullanıcı listesi —— */
    const [enabledUsers, setEnabledUsers] = useState(false);
    const { usersData = [] } =
        useUsersTable({ enabled: enabledUsers, role_id: 2, paginate: 999 });

    /* —— ana sorgu —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        enabled: true,
        page, paginate: pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        user_id: +personnel || undefined,
        request_type: reqType || undefined,
        description: desc || undefined,
        file_exists: withFile || undefined,
        status: statusFlt || undefined,
    });

    /* —— rows —— */
    const baseRows: Row[] = useMemo(() => (
        attendancesData.map((r: any) => ({
            id: r.id,
            personnel_name: r.user?.name_surname || '-',
            date_range: `${dayjs(r.start_date).format('DD.MM.YYYY')} – ${dayjs(r.end_date).format('DD.MM.YYYY')}`,
            request_type: r.request_type ?? '-',
            lesson_hours: (() => {
                if (r.is_full_day) return 'Tam Gün';
                if (!r.lesson_hours) return '-';
                try {
                    const arr = typeof r.lesson_hours === 'string'
                        ? JSON.parse(r.lesson_hours) : r.lesson_hours;
                    return arr.length ? arr.join(', ') : '-';
                } catch { return '-'; }
            })(),
            description: r.description ?? '-',
            document_url: r.document_url ?? null,
            status: r.approval_status ?? 0,
        }))
    ), [attendancesData]);

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);

    const toggleStatus = (idx: number) =>
        setRows(r => r.map((row, i) =>
            i === idx ? { ...row, status: (row.status + 1) % 3 } : row,
        ));

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'personnel_name', label: 'Personel Adı', render: r => r.personnel_name },
        { key: 'date_range', label: 'Tarih Aralığı', render: r => r.date_range },
        { key: 'request_type', label: 'Talep Türü', render: r => r.request_type },
        { key: 'lesson_hours', label: 'Talep Aralığı', render: r => r.lesson_hours },
        { key: 'description', label: 'Açıklama', render: r => r.description },
        {
            key: 'document_url', label: 'Belge', style: { width: 140, textAlign: 'center' },
            render: r => r.document_url
                ? <a href={r.document_url} target="_blank" rel="noopener noreferrer">İndir&nbsp;(PDF)</a>
                : '-',
        },
        {
            key: 'status', label: 'Durum', style: { width: 140, textAlign: 'center' },
            render: (_r, _o, idx) => (
                <span
                    style={{ cursor: 'pointer', fontWeight: 500 }}
                    className={STATUS_CLR[rows[idx!].status]}
                    onClick={() => toggleStatus(idx!)}
                >
                    {STATUS_TXT[rows[idx!].status]}
                </span>
            ),
        },
    ], [rows]);

    /* —— talep türleri —— */
    const REQUEST_TYPES = [
        { value: 'izinli', label: 'İzinli (Özürlü)' },
        { value: 'raporlu', label: 'Raporlu' },
        { value: 'görevli', label: 'Görevli' },
        { value: 'erken_ayrilma', label: 'Erken Ayrılma' },
    ];

    /* —— filtreler (4/satır) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'personnel', label: 'Personel Adı', type: 'select', col: 1,
            value: personnel,
            onClick: () => setEnabledUsers(true),
            onChange: setPersonnel,
            options: usersData.map(u => ({
                value: String(u.id),
                label: u.name_surname || u.name || '-',
            })),
        },
        {
            key: 'request_type', label: 'Talep Türü', type: 'select', col: 1,
            value: reqType,
            onChange: setReqType,
            options: REQUEST_TYPES,
        },
        {
            key: 'description', label: 'Açıklama', type: 'text', col: 1,
            value: desc,
            onChange: setDesc,
            placeholder: 'Metin arayın…',
        },
        {
            key: 'file_exists', label: 'Dosya', type: 'select', col: 1,
            value: withFile,
            onChange: setWithFile,
            options: [
                { value: 'yes', label: 'Yüklü' },
                { value: 'no', label: 'Yüksüz' },
            ],
        },
        {
            key: 'status', label: 'Durum', type: 'select', col: 1,
            value: statusFlt,
            onChange: setStatusFlt,
            options: [
                { value: 'Onay Bekliyor', label: 'Onay Bekliyor' },
                { value: 'Onaylandı', label: 'Onaylandı' },
                { value: 'Reddedildi', label: 'Reddedildi' },
            ],
        },
    ], [
        dateRange, personnel, reqType, desc, withFile, statusFlt, usersData,
    ]);

    /* —— render —— */
    return (
        <>
            {/* Filtreler – 4/satır */}
            <FilterGroup
                filters={filters}
                navigate={navigate}
                columnsPerRow={4}
            />

            <ReusableTable<Row>
                onAdd={() => navigate('/administrativeSupportTeam/request/crud')}
                tableMode="single"
                columns={columns}
                data={rows}
                loading={loading}
                error={error}
                showExportButtons
                exportFileName="administrative_request_entries"
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={s => { setPageSize(s); setPage(1); }}
            />
        </>
    );
}

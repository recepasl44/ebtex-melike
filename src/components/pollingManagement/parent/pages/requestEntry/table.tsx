/* table.tsx — Veli > Talep Girişi listesi */
/* —————————————————————————————————————————— */
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

/* Örnek hook — kendi endpoint’inize göre değiştirin                         */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';

/* —————————————————  Satır tipi  ————————————————— */
interface Row {
    id: number;
    date_range: string;
    request_type: string;
    description: string;
    document_url: string | null;
    status: number; // 0 = Bekliyor • 1 = Onaylandı • 2 = Reddedildi
}

/* —————————————————  Ana bileşen  ————————————————— */
export default function ParentRequestEntryTable() {
    const navigate = useNavigate();

    /* ───── Filtre state’leri ───── */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [reqType, setReqType] = useState('');
    const [desc, setDesc] = useState('');
    const [withFile, setWithFile] = useState(''); // '', 'yes', 'no'

    /* ───── Sayfalama ───── */
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* ───── API çağrısı ───── */
    const {
        attendancesData: requestEntries,
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page,
        paginate: pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        request_type: reqType || undefined,
        description: desc || undefined,
        file_exists: withFile || undefined,
        enabled: true,
    });

    /* ───── Satırlar ───── */
    const baseRows: Row[] = useMemo(() => (
        (requestEntries ?? []).map((r: any) => ({
            id: r.id,
            date_range: `${dayjs(r.start_date).format('DD.MM.YYYY')} – ${dayjs(r.end_date).format('DD.MM.YYYY')}`,
            request_type: r.request_type_name ?? '-',
            description: r.description ?? '-',
            document_url: r.document_url ?? null,
            status: 0, // ilk açılışta “Onay Bekliyor”
        }))
    ), [requestEntries]);

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);

    /* ───── Durum tıklaması ───── */
    const handleStatusClick = (idx: number) =>
        setRows(r => r.map((row, i) =>
            i === idx ? { ...row, status: (row.status + 1) % 3 } : row,
        ));

    /* ───── Kolonlar ───── */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date_range', label: 'Tarih Aralığı', render: r => r.date_range },
        { key: 'request_type', label: 'Talep Türü', render: r => r.request_type },
        { key: 'description', label: 'Açıklama', render: r => r.description },
        {
            key: 'document_url', label: 'Belge', style: { width: 140, textAlign: 'center' },
            render: (r: Row) => r.document_url
                ? <a href={r.document_url} target="_blank" rel="noopener noreferrer">İndir&nbsp;(PDF)</a>
                : '-',
        },
        {
            key: 'status', label: 'Durum', style: { width: 140, textAlign: 'center' },
            render: (_r, _o, idx) => {
                const row = rows[idx!];
                const { status } = row;
                const color = status === 1 ? 'text-success'
                    : status === 0 ? 'text-warning' : 'text-danger';
                const text = status === 1 ? 'Onaylandı'
                    : status === 0 ? 'Onay Bekliyor' : 'Reddedildi';
                return (
                    <span
                        style={{ cursor: 'pointer' }}
                        className={color}
                        onClick={() => handleStatusClick(idx!)}
                    >
                        {text}
                    </span>
                );
            },
        },
    ], [rows]);

    /* ───── Talep türleri (statik) ───── */
    const REQUEST_TYPES = [
        { value: 'izin', label: 'İzin' },
        { value: 'rapor', label: 'Rapor' },
        { value: 'görevli', label: 'Görevli' },
    ];

    /* ───── Filtreler (col:1 → 4/satır) ───── */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
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
            placeholder: 'Metin arayın',
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
    ], [dateRange, reqType, desc, withFile]);

    /* ───── Render ───── */
    return (
        <>
            {/* Filtreler – 1 satırda 4 filtre */}
            <FilterGroup
                filters={filters}
                navigate={navigate}
                columnsPerRow={4}
            />

            <ReusableTable<Row>
                onAdd={() => navigate('/requestEntry/crud')}
                tableMode="single"
                columns={columns}
                data={rows}
                loading={loading}
                error={error}
                showExportButtons
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={s => { setPageSize(s); setPage(1); }}
                exportFileName="parent_request_entries"
            />
        </>
    );
}

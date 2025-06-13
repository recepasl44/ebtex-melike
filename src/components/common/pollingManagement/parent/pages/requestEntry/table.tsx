
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import FilterGroup, { FilterDefinition } from '../../components/organisms/SearchFilters';


import { useAttendancesTable } from '../../../../../hooks/attendance/useList';

interface Row {
    id: number;
    date_range: string;
    request_type: string;
    description: string;
    document_url: string | null;
    status: number;      // 0 = Bekliyor • 1 = Onaylandı • 2 = Reddedildi
    clicked: boolean;
}


const STATUS_TXT: Record<number, string> = {
    0: 'Bekliyor',
    1: 'Onaylandı',
    2: 'Reddedildi',
};
const STATUS_CLR: Record<number, string> = {
    0: 'text-warning',
    1: 'text-success',
    2: 'text-danger',
};

export default function ParentRequestEntryTable() {
    const navigate = useNavigate();


    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [reqType, setReqType] = useState('');
    const [desc, setDesc] = useState('');
    const [withFile, setWithFile] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);


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


    const baseRows: Row[] = useMemo(() => (
        (requestEntries ?? []).map((r: any) => ({
            id: r.id,
            date_range: `${dayjs(r.start_date).format('DD.MM.YYYY')} – ${dayjs(r.end_date).format('DD.MM.YYYY')}`,
            request_type: r.request_type_name ?? '-',
            description: r.description ?? '-',
            document_url: r.document_url ?? null,
            status: 0,
            clicked: false,
        }))
    ), [requestEntries]);

    const [rows, setRows] = useState<Row[]>(baseRows);
    useEffect(() => setRows(baseRows), [baseRows]);


    const handleStatusChange = (idx: number, value: number) => {
        setRows(r =>
            r.map((row, i) =>
                i === idx ? { ...row, status: value, clicked: true } : row,
            ),
        );
    };


    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'date_range', label: 'Tarih Aralığı', render: r => r.date_range },
        { key: 'request_type', label: 'Talep Türü', render: r => r.request_type },
        { key: 'description', label: 'Açıklama', render: r => r.description },
        {
            key: 'document_url',
            label: 'Belge',
            style: { width: 140, textAlign: 'center' },
            render: (r: Row) =>
                r.document_url
                    ? <a href={r.document_url} target="_blank" rel="noopener noreferrer">İndir&nbsp;(PDF)</a>
                    : '-',
        },
        {
            key: 'status',
            label: 'Durum',
            style: { width: 160, textAlign: 'center' },
            render: (_r, _o, idx) => {
                const row = rows[idx!];
                return (
                    <select
                        className={`form-select p-1 ${row.clicked ? STATUS_CLR[row.status] : ''}`}
                        value={row.clicked ? row.status : ''}
                        style={{ cursor: 'pointer', fontWeight: 500 }}
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


    const REQUEST_TYPES = [
        { value: 'izin', label: 'İzin' },
        { value: 'rapor', label: 'Rapor' },
        { value: 'görevli', label: 'Görevli' },
    ];


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


    return (
        <>
            <FilterGroup filters={filters} navigate={navigate} columnsPerRow={4} />

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

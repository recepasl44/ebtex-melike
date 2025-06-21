import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, { ColumnDefinition } from '../../../ReusableTable';
import FilterGroup, { FilterDefinition } from '../../component/organisms/SearchFilters';
import { useBulletinsList } from '../../../../hooks/bulletin/useBulletinsList';
import { useBulletinDelete } from '../../../../hooks/bulletin/useDelete';
import type { data as Bulletin } from '../../../../../types/bulletins/list';

const ROOT = `${import.meta.env.BASE_URL}contact-panel/current-newsletter`;

export default function CurrentNewsletterTable() {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
    const [groupId, setGroupId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(10);

    const { deleteExistingBulletin } = useBulletinDelete();

    const { bulletinsData = [], loading, error, totalPages, totalItems } = useBulletinsList({
        page,
        pageSize: paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        category_id: +categoryId || undefined,
        status: status || undefined,
        enabled: true,
    });

    const groupMap = useMemo(() => {
        const map: Record<number, string> = {};
        bulletinsData.forEach((b) => {
            if (b.group) {
                map[b.group_id] = b.group.name;
            }
        });
        return map;
    }, [bulletinsData]);

    const categoryOptions = [
        { value: '1', label: 'Genel' },
        { value: '2', label: 'Duyuru' },
    ];

    const groupOptions = useMemo(
        () =>
            Object.entries(groupMap).map(([id, name]) => ({
                value: id,
                label: name,
            })),
        [groupMap],
    );

    const columns: ColumnDefinition<Bulletin>[] = useMemo(
        () => [
            { key: 'title', label: 'Başlık', render: (b) => b.title },
            {
                key: 'dateRange',
                label: 'Yayın Tarihleri',
                render: (b) => `${b.start_date} - ${b.end_date}`,
            },
            {
                key: 'category',
                label: 'Kategori',
                render: (b) =>
                    categoryOptions.find((c) => c.value === String(b.category_id))?.label ||
                    String(b.category_id),
            },
            {
                key: 'sender',
                label: 'Gönderen',
                render: (b) => (b as any).createdby?.name_surname || '-',
            },
            {
                key: 'target',
                label: 'Hedef Kitle',
                render: (b) => groupMap[b.group_id] || (b as any).group?.name || (b.group_id ? String(b.group_id) : '-'),
            },
            {
                key: 'status',
                label: 'Durum',
                render: (b) => (b.status === 1 ? 'Yayında' : 'Taslak'),
            },
            {
                key: 'actions',
                label: 'İşlemler',
                render: (row) => (
                    <div className="d-flex gap-2">
                        <button
                            onClick={() => {
                                navigate(`${ROOT}/crud/${row.id}`);
                            }}
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        >
                            <i className="ti ti-pencil" />
                        </button>
                        <button
                            onClick={() => deleteExistingBulletin(row.id)}
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        >
                            <i className="ti ti-trash" />
                        </button>
                    </div>
                ),
            },
        ],
        [navigate, deleteExistingBulletin]
    );

    const filters: FilterDefinition[] = useMemo(
        () => [
            {
                key: 'dateRange',
                label: 'Tarih Aralığı',
                type: 'doubledate',
                value: dateRange,
                onChange: (v) => setDateRange(v ?? { startDate: '', endDate: '' }),
            },
            {
                key: 'group_id',
                label: 'Hedef Kitle',
                type: 'select',
                value: groupId,
                onChange: setGroupId,
                options: groupOptions,
            },
            {
                key: 'category_id',
                label: 'Kategori',
                type: 'select',
                value: categoryId,
                onChange: setCategoryId,
                options: categoryOptions,
            },
            {
                key: 'status',
                label: 'Yayın Durumu',
                type: 'select',
                value: status,
                onChange: setStatus,
                options: [
                    { value: '1', label: 'Yayında' },
                    { value: '0', label: 'Taslak' },
                ],
            },
        ],
        [dateRange, groupId, categoryId, status, groupOptions]
    );

    return (
        <>
            <FilterGroup filters={filters} columnsPerRow={4} navigate={navigate} />
            <ReusableTable<Bulletin>
                tableMode="single"
                columns={columns}
                data={bulletinsData}
                loading={loading}
                error={error}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={paginate}
                onPageChange={setPage}
                onPageSizeChange={(s) => {
                    setPaginate(s);
                    setPage(1);
                }}
                exportFileName="current_newsletter"
                showExportButtons
                onAdd={() => {
                    navigate(`${ROOT}/crud`);
                }}
            />
        </>
    );
}
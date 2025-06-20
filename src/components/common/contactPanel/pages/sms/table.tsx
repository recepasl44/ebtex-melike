import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, { ColumnDefinition } from '../../../ReusableTable';
import FilterGroup, { FilterDefinition } from '../../component/organisms/SearchFilters';
import { useNotificationsList } from '../../../../hooks/notifications/useList';
import { useGroupsTable } from '../../../../hooks/group/useList';
import { useUsersTable } from '../../../../hooks/user/useList';
import { useNotificationDelete } from '../../../../hooks/notifications/useDelete';
import type { NotificationData } from '../../../../../types/notifications/list';

const ROOT = `${import.meta.env.BASE_URL}contact-panel/sms`;

export default function SmsTable() {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
    const [categoryId, setCategoryId] = useState('');
    const [groupIds, setGroupIds] = useState<string[]>([]);
    const [senderId, setSenderId] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [enabled, setEnabled] = useState({ groups: false, users: false });

    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups, pageSize: 999 });
    const { usersData = [] } = useUsersTable({ enabled: enabled.users, pageSize: 999 });
    const { deleteExistingNotification } = useNotificationDelete();

    const { notificationsData = [], loading, error, totalPages, totalItems } = useNotificationsList({
        page,
        pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        category_id: categoryId || undefined,
        group_id: groupIds.join(',') || undefined,
        sender_id: senderId || undefined,
        status: status || undefined,
        enabled: true,
    });

    const categoryOptions = [
        { value: '1', label: 'Ödev' },
        { value: '2', label: 'Sınav' },
        { value: '3', label: 'Sistem' },
        { value: '4', label: 'Duyuru' },
    ];

    const statusOptions = [
        { value: '1', label: 'Gönderildi' },
        { value: '2', label: 'Planlandı' },
        { value: '3', label: 'Hata' },
    ];

    const columns: ColumnDefinition<NotificationData>[] = useMemo(
        () => [
            { key: 'title', label: 'Başlık', render: (n) => n.title || '-' },
            {
                key: 'send_time',
                label: 'Gönderim Tarihi',
                render: (n) => dayjs(n.send_time).format('MM.DD.YYYY - HH:mm'),
            },
            {
                key: 'category',
                label: 'Kategori',
                render: (n) => categoryOptions.find((c) => c.value === String(n.category_id))?.label || '-',
            },
            {
                key: 'group',
                label: 'Hedef Kitle',
                render: (n) => (n.group as any)?.name || '-',
            },
            {
                key: 'sender',
                label: 'Gönderen',
                render: (n) => (n.sender as any)?.name_surname || '-',
            },
            {
                key: 'status',
                label: 'Durum',
                render: (n) => statusOptions.find((s) => s.value === String(n.status))?.label || '-',
            },
            {
                key: 'read_count',
                label: 'Okunan Kişi Sayısı',
                render: () => '-',
            },
            {
                key: 'actions',
                label: 'İşlemler',
                render: (row) => (
                    <div className="d-flex gap-2">
                        <button
                            onClick={() => navigate(`${ROOT}/edit/${row.id}`)}
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        >
                            <i className="ti ti-pencil" />
                        </button>
                        <button
                            onClick={() => deleteExistingNotification(row.id)}
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        >
                            <i className="ti ti-trash" />
                        </button>
                    </div>
                ),
            },
        ],
        [navigate, deleteExistingNotification]
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
                key: 'category_id',
                label: 'Kategori',
                type: 'select',
                value: categoryId,
                onChange: setCategoryId,
                options: categoryOptions,
            },
            {
                key: 'group_id',
                label: 'Hedef Kitle',
                type: 'multiselect',
                value: groupIds,
                onClick: () => setEnabled((e) => ({ ...e, groups: true })),
                onChange: setGroupIds,
                options: groupsData.map((g) => ({ value: String(g.id), label: g.name })),
            },
            {
                key: 'sender_id',
                label: 'Gönderen',
                type: 'select',
                value: senderId,
                onClick: () => setEnabled((e) => ({ ...e, users: true })),
                onChange: setSenderId,
                options: usersData.map((u) => ({ value: String(u.id), label: u.name_surname || `${u.first_name} ${u.last_name}` })),
            },
            {
                key: 'status',
                label: 'Gönderim Durumu',
                type: 'select',
                value: status,
                onChange: setStatus,
                options: statusOptions,
            },
        ],
        [dateRange, categoryId, groupIds, senderId, status, groupsData, usersData]
    );

    return (
        <>
            <FilterGroup filters={filters} navigate={navigate} />
            <ReusableTable<NotificationData>
                tableMode="single"
                columns={columns}
                data={notificationsData}
                loading={loading}
                error={error}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
                exportFileName="sms"
                showExportButtons
                onAdd={() => navigate(`${ROOT}/add`)}
            />
        </>
    );
}
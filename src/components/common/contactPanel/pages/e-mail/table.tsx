import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import ReusableTable, { ColumnDefinition } from '../../../ReusableTable'
import FilterGroup, { FilterDefinition } from '../../component/organisms/SearchFilters'
import { useNotificationsList } from '../../../../hooks/notifications/useList'
import { useGroupsTable } from '../../../../hooks/group/useList'
import { useNotificationDelete } from '../../../../hooks/notifications/useDelete'
import type { NotificationData } from '../../../../../types/notifications/list'

const ROOT = `${import.meta.env.BASE_URL}contact-panel/e-mail`

export default function EmailTable() {
    const navigate = useNavigate()
    const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' })
    const [category, setCategory] = useState('')
    const [groupId, setGroupId] = useState('')
    const [sender, setSender] = useState('')
    const [status, setStatus] = useState('')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const { groupsData = [] } = useGroupsTable({ enabled: true, pageSize: 999 })
    const groupMap = useMemo(() => {
        const map: Record<number, string> = {}
        groupsData.forEach((g) => {
            map[g.id] = g.name
        })
        return map
    }, [groupsData])

    const { deleteExistingNotification } = useNotificationDelete()

    const { notificationsData = [], loading, error, totalPages, totalItems } = useNotificationsList({
        page,
        pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        category_id: category || undefined,
        group_id: +groupId || undefined,
        sender_id: sender || undefined,
        status: status || undefined,
        enabled: true,
    })

    const categoryOptions = [
        { value: '1', label: 'Ödev' },
        { value: '2', label: 'Sınav' },
        { value: '3', label: 'Sistem' },
        { value: '4', label: 'Duyuru' },
    ]

    const senderOptions = [
        { value: '1', label: 'Sistem' },
        { value: '2', label: 'Yönetici' },
        { value: '3', label: 'Öğretmen' },
    ]

    const statusOptions = [
        { value: '1', label: 'Gönderildi' },
        { value: '2', label: 'Planlandı' },
        { value: '3', label: 'Hata' },
    ]

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
                render: (n) => (
                    <div className="d-flex align-items-center gap-2">
                        <span>
                            {groupMap[n.group_id as number] ||
                                (n.group as any)?.name ||
                                (n.group_id ? String(n.group_id) : '-')}
                        </span>

                    </div>
                ),
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
        [navigate, deleteExistingNotification, groupMap]
    )

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
                value: category,
                onChange: setCategory,
                options: categoryOptions,
            },
            {
                key: 'group_id',
                label: 'Hedef Kitle',
                type: 'select',
                value: groupId,
                onChange: setGroupId,
                options: groupsData.map((g) => ({ value: String(g.id), label: g.name })),
            },
            {
                key: 'sender_id',
                label: 'Gönderen',
                type: 'select',
                value: sender,
                onChange: setSender,
                options: senderOptions,
            },
            {
                key: 'status',
                label: 'Durum',
                type: 'select',
                value: status,
                onChange: setStatus,
                options: statusOptions,
            },
        ],
        [dateRange, category, groupId, sender, status, groupsData]
    )

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
                onPageSizeChange={(s) => {
                    setPageSize(s)
                    setPage(1)
                }}
                exportFileName="e-mail"
                showExportButtons
                onAdd={() => navigate(`${ROOT}/add`)}
            />
        </>
    )
}

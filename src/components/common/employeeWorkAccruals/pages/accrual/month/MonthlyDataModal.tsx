import { useState, useMemo, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../../../store'
import { fetchEmployeeEarningsMonthList } from '../../../../../../slices/employeeEarningsMonth/list/thunk'
import { Modal, Button, Form } from 'react-bootstrap'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import { EmployeeEarningsMonthItem } from '../../../../../../types/employeeEarningsMonth/list'
import { saveMonth } from './crud'

interface Props {
    row: any
    onClose: () => void
}

const INCOME_TYPES = [
    { key: 'salary', label: 'Sabit Maaş' },
    { key: 'lesson', label: 'Ders Ücreti' },
    { key: 'question', label: 'Soru Çözüm Ders Ücreti' },
    { key: 'daily', label: 'Gün Bazlı Ücret' },
    { key: 'private', label: 'Özel Ders Ücreti' },
    { key: 'coaching', label: 'Koçluk Ücreti' },
    { key: 'bonus', label: 'Prim' },
    { key: 'other', label: 'Farklı Ücret' },
]

export default function MonthlyDataModal({ row, onClose }: Props) {
    const year = row.period?.split('-')[0] || new Date().getFullYear()
    const dispatch = useDispatch<AppDispatch>()
    const [period, setPeriod] = useState(row.period || '')

    const [items, setItems] = useState<EmployeeEarningsMonthItem[]>(
        INCOME_TYPES.map((t) => {
            const existing = row.items?.find((i: EmployeeEarningsMonthItem) => i.income_type === t.key)
            return {
                id: existing?.id || 0,
                employee_id: row.employee_id,
                period: period,
                income_type: t.key,
                quantity: existing?.quantity || '0',
                unit_price: (row as any)[`${t.key}_rate`] || existing?.unit_price || '0',
                total: existing?.total || '0',
                created_at: '',
                updated_at: '',
                platform_id: null,
            }
        })
    )

    useEffect(() => {
        setItems(prev => prev.map(it => ({ ...it, period })))
    }, [period])

    const columns: ColumnDefinition<EmployeeEarningsMonthItem>[] = [
        { key: 'income_type', label: 'Gelir Türü', render: (r) => INCOME_TYPES.find((t) => t.key === r.income_type)?.label },
        { key: 'unit_price', label: 'Birim Ücret (₺)', render: (r) => r.unit_price },
        {
            key: 'quantity',
            label: 'Sayı',
            render: (r, _open, idx) => (
                <Form.Control
                    type='number'
                    size='sm'
                    disabled={r.income_type === 'salary'}
                    value={r.quantity}
                    onChange={(e) => {
                        const val = e.target.value
                        setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, quantity: val } : it)))
                    }}
                />
            ),
        },
        {
            key: 'total',
            label: 'Tutar',
            render: (r) => (Number(r.quantity) * Number(r.unit_price)).toFixed(2),
        },
    ]

    const total = useMemo(() => items.reduce((sum, i) => sum + Number(i.quantity) * Number(i.unit_price), 0), [items])

    async function handleSave() {
        const payloadItems = items
            .filter(i => +i.quantity > 0)
            .map(i => ({
                ...i,
                period,
                quantity: +i.quantity,
                unit_price: +i.unit_price,
                total: +i.quantity * +i.unit_price,
            }))

        if (payloadItems.length === 0) {
            toast.error('En az bir satır doldurmalısınız')
            return
        }

        await saveMonth({ employee_id: row.employee_id, period, items: payloadItems })
        dispatch(fetchEmployeeEarningsMonthList({ period }))
        toast.success('Kaydedildi')
        onClose()
    }

    return (
        <Modal show centered onHide={onClose}>
            <Modal.Header closeButton className='border-b border-gray-300'>
                <Modal.Title className='w-full font-bold'>
                    <div className='flex items-center gap-8'>
                        <div className='flex items-center gap-2'>
                            <span>Personel Adı:</span>
                            <span>{row.full_name}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span>Dönem:</span>
                            <select
                                className='ml-2 border rounded px-2 py-1'
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                            >
                                {Array.from({ length: 12 }).map((_, i) => {
                                    const m = String(i + 1).padStart(2, '0')
                                    return (
                                        <option key={m} value={`${year}-${m}`}>{`${year}-${m}`}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReusableTable<EmployeeEarningsMonthItem>
                    tableMode='single'
                    columns={columns}
                    data={items}
                    loading={false}
                    error={null}
                    pageSize={items.length}
                    currentPage={1}
                    totalPages={1}
                    totalItems={items.length}
                />
                <div className='text-right mt-4 font-bold'>Genel Toplam ₺ {total.toFixed(2)}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-secondary' onClick={onClose}>İptal</Button>
                <Button variant='primary' onClick={handleSave}>Kaydet</Button>
            </Modal.Footer>
        </Modal>
    )
}

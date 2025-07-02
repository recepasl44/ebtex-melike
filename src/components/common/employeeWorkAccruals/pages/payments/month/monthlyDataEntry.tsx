
import { useState, useMemo } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import dayjs from 'dayjs'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import { useEmployeePaymentAdd } from '../../../../../hooks/employeePayments/useAdd'
import { useEmployeePaymentUpdate } from '../../../../../hooks/employeePayments/useUpdate'
import { useAppDispatch } from '../../../../../../store'
import { fetchEmployeePayments } from '../../../../../../slices/employeePayments/list/thunk'
import type { EmployeePaymentData, EmployeePaymentItem } from '../../../../../../types/employeePayments/list'

interface Props {
    row: EmployeePaymentData
    filter: any
    onClose: () => void
}

interface Item {
    id?: number
    payment_type: string
    payment_date: string
    payment_method: string
    bank_name: string
    amount: string
}

const TYPES = [
    'Nakit Avans-1',
    'Nakit Avans-2',
    'Banka Avans-1',
    'Banka Avans-2',
    'Banka Avans-3',
    'Banka Maaş',
    'Nakit',
]

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

export default function MonthlyDataEntry({ row, filter, onClose }: Props) {
    const dispatch = useAppDispatch()
    const { addNewEmployeePayment } = useEmployeePaymentAdd()
    const { updateExistingEmployeePayment } = useEmployeePaymentUpdate()

    const [period, setPeriod] = useState(row.items[0]?.period || dayjs().format('YYYY-MM'))
    const [items, setItems] = useState<Item[]>(() =>
        TYPES.map(t => {
            const ex = row.items.find((i: EmployeePaymentItem) => i.payment_type === t) || null
            return {
                id: ex?.id,
                payment_type: t,
                payment_date: ex?.payment_date || '',
                payment_method: ex?.payment_method || '',
                bank_name: ex?.bank_name || '',
                amount: ex?.amount || '',
            }
        })
    )
    const [errors, setErrors] = useState<Record<number, Record<string, boolean>>>({})
    const [editing, setEditing] = useState<number[]>([])
    const [editCache, setEditCache] = useState<Record<number, Item>>({})

    function handleAddRow() {
        setItems(p => [...p, { payment_type: '', payment_date: '', payment_method: '', bank_name: '', amount: '' }])
        setEditing(p => [...p, items.length])
    }

    function handleDeleteRow(idx: number) {
        setItems(p => p.filter((_, i) => i !== idx))
        setEditing(p => p.filter(i => i !== idx).map(i => (i > idx ? i - 1 : i)))
        setEditCache(c => {
            const n = { ...c }
            delete n[idx]
            const updated: Record<number, Item> = {}
            Object.entries(n).forEach(([k, v]) => {
                const key = Number(k)
                updated[key > idx ? key - 1 : key] = v
            })
            return updated
        })
    }

    const sumByTypes = (types: string[]) =>
        items.reduce(
            (s, i) => (types.includes(i.payment_type) ? s + (Number(i.amount) || 0) : s),
            0
        )
    const total = useMemo(() => items.reduce((s, i) => s + (Number(i.amount) || 0), 0), [items])
    const totalCashAdvance = useMemo(() => sumByTypes(['Nakit Avans-1', 'Nakit Avans-2']), [items])
    const totalBankAdvance = useMemo(
        () => sumByTypes(['Banka Avans-1', 'Banka Avans-2', 'Banka Avans-3']),
        [items]
    )
    const totalBankSalary = useMemo(() => sumByTypes(['Banka Maaş']), [items])
    const totalCash = useMemo(() => sumByTypes(['Nakit']), [items])

    function validate() {
        const errs: Record<number, Record<string, boolean>> = {}
        let ok = true
        items.forEach((it, idx) => {
            const er: Record<string, boolean> = {}
            if (!it.payment_type) er.payment_type = true
            if (!it.payment_date) er.payment_date = true
            if (!it.payment_method) er.payment_method = true
            if (!it.bank_name) er.bank_name = true
            if (!it.amount) er.amount = true
            if (Object.keys(er).length) {
                errs[idx] = er
                ok = false
            }
        })
        setErrors(errs)
        return ok
    }

    async function handleSave() {
        if (!validate()) return
        for (const it of items) {
            const payload = {
                employee_id: row.employee_id,
                period,
                payment_type: it.payment_type,
                payment_date: dayjs(it.payment_date).format('YYYY-MM-DD'),
                payment_method: it.payment_method,
                bank_name: it.bank_name,
                amount: it.amount,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
            if (it.id) {
                await updateExistingEmployeePayment({ id: it.id, payload })
            } else {
                await addNewEmployeePayment(payload)
            }
        }
        dispatch(fetchEmployeePayments({ page: 1, pageSize: 10, filter }))
        onClose()
    }

    const columns: ColumnDefinition<Item>[] = [
        {
            key: 'payment_type',
            label: 'Ödeme Türü',
            render: (r, _open, idx) => (
                <Form.Select
                    size='sm'
                    value={r.payment_type}
                    disabled={idx !== undefined && idx < TYPES.length}
                    onChange={e =>
                        setItems(p => p.map((it, i) => (i === idx ? { ...it, payment_type: e.target.value } : it)))
                    }
                    style={typeof idx === 'number' && errors[idx]?.payment_type ? { borderColor: 'red' } : {}}
                >
                    <option value=''>Seçiniz</option>
                    {TYPES.map(t => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </Form.Select>
            ),
        },
        {
            key: 'payment_date',
            label: 'Ödeme Tarihi',
            render: (r, _open, idx) => (
                <Form.Control
                    type='date'
                    size='sm'
                    value={r.payment_date}
                    disabled={idx !== undefined && !editing.includes(idx)}
                    onChange={e =>
                        setItems(p => p.map((it, i) => (i === idx ? { ...it, payment_date: e.target.value } : it)))
                    }
                    style={typeof idx === 'number' && errors[idx]?.payment_date ? { borderColor: 'red' } : {}}
                />
            ),
        },
        {
            key: 'payment_method',
            label: 'Ödeme Yöntemi',
            render: (r, _open, idx) => (
                <Form.Select
                    size='sm'
                    value={r.payment_method}
                    disabled={idx !== undefined && !editing.includes(idx)}
                    onChange={e =>
                        setItems(p => p.map((it, i) => (i === idx ? { ...it, payment_method: e.target.value } : it)))
                    }
                    style={typeof idx === 'number' && errors[idx]?.payment_method ? { borderColor: 'red' } : {}}
                >
                    <option value=''>Seçiniz</option>
                    <option value='Nakit'>Nakit</option>
                    <option value='Banka'>Banka</option>
                </Form.Select>
            ),
        },
        {
            key: 'bank_name',
            label: 'Banka/Kurum Adı',
            render: (r, _open, idx) => (
                <Form.Control
                    size='sm'
                    value={r.bank_name}
                    disabled={idx !== undefined && !editing.includes(idx)}
                    onChange={e =>
                        setItems(p => p.map((it, i) => (i === idx ? { ...it, bank_name: e.target.value } : it)))
                    }
                    style={typeof idx === 'number' && errors[idx]?.bank_name ? { borderColor: 'red' } : {}}
                />
            ),
        },
        {
            key: 'amount',
            label: 'Ödenen Tutar (₺)',
            render: (r, _open, idx) => (
                <Form.Control
                    type='number'
                    size='sm'
                    value={r.amount}
                    disabled={idx !== undefined && !editing.includes(idx)}
                    onChange={e =>
                        setItems(p => p.map((it, i) => (i === idx ? { ...it, amount: e.target.value } : it)))
                    }
                    style={typeof idx === 'number' && errors[idx]?.amount ? { borderColor: 'red' } : {}}
                />
            ),
        },
        {
            key: 'actions',
            label: 'İşlemler',
            render: (_r, _open, idx) => {
                if (idx === undefined) return null
                const isEdit = editing.includes(idx)
                return (
                    <div className='d-flex gap-1'>
                        {isEdit ? (
                            <>
                                <Button
                                    variant='success-light'
                                    size='sm'
                                    className='rounded-pill'
                                    onClick={() => {
                                        setEditing(p => p.filter(i => i !== idx))
                                        setEditCache(c => {
                                            const n = { ...c }
                                            delete n[idx]
                                            return n
                                        })
                                    }}
                                >
                                    Kaydet
                                </Button>
                                <Button
                                    variant='secondary-light'
                                    size='sm'
                                    className='rounded-pill'
                                    onClick={() => {
                                        setItems(p => p.map((it, i) => (i === idx ? editCache[idx] : it)))
                                        setEditing(p => p.filter(i => i !== idx))
                                        setEditCache(c => {
                                            const n = { ...c }
                                            delete n[idx]
                                            return n
                                        })
                                    }}
                                >
                                    Vazgeç
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant='primary-light'
                                    size='sm'
                                    className='rounded-pill'
                                    onClick={() => {
                                        setEditCache(c => ({ ...c, [idx]: items[idx] }))
                                        setEditing(p => [...p, idx])
                                    }}
                                >
                                    Düzenle
                                </Button>
                                <Button
                                    variant='danger-light'
                                    size='sm'
                                    className='btn-icon rounded-pill'
                                    onClick={() => handleDeleteRow(idx)}
                                >
                                    <i className='ti ti-trash'></i>
                                </Button>
                            </>
                        )
                    </div>
                )
            },
        },
    ]

    return (
        <Modal show centered onHide={onClose}>
            <Modal.Header closeButton className='border-b border-gray-300'>
                <Modal.Title className='w-full font-bold'>
                    <div className='flex items-center gap-8'>
                        <div className='flex items-center gap-2'>
                            <span>Personel Ad:</span>
                            <span>{row.employee?.full_name}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span>Dönem:</span>
                            <Form.Control
                                type='month'
                                size='sm'
                                value={period}
                                onChange={e => setPeriod(e.target.value)}
                                className='ms-2 w-auto'
                            />
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant='primary-light' size='sm' className='rounded-pill mb-2' onClick={handleAddRow}>
                    Ekle
                </Button>
                <ReusableTable<Item>
                    tableMode='single'
                    columns={columns}
                    data={items}
                    pageSize={items.length}
                    currentPage={1}
                    totalPages={1}
                    totalItems={items.length}
                />
                <div className='mt-4 font-bold text-right'>
                    <div>Nakit Avans {currency.format(totalCashAdvance)}</div>
                    <div>Banka Avans {currency.format(totalBankAdvance)}</div>
                    <div>Banka Maaş {currency.format(totalBankSalary)}</div>
                    <div>Nakit {currency.format(totalCash)}</div>
                    <div className='mt-2'>Toplam Ödenen {currency.format(total)}</div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-secondary' onClick={onClose}>
                    İptal
                </Button>
                <Button variant='primary' onClick={handleSave}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
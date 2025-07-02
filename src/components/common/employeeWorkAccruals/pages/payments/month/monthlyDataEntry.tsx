
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

export default function MonthlyDataEntry({ row, onClose }: Props) {
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

    function handleAddRow() {
        setItems(p => [...p, { payment_type: '', payment_date: '', payment_method: '', bank_name: '', amount: '' }])
    }

    function handleDeleteRow(idx: number) {
        setItems(p => p.filter((_, i) => i !== idx))
    }

    const total = useMemo(() => items.reduce((s, i) => s + (Number(i.amount) || 0), 0), [items])

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
                id: 0, // or undefined/null if allowed, or generate a temporary id if needed
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
        dispatch(fetchEmployeePayments({ page: 1, pageSize: 10 }))
        onClose()
    }

    const columns: ColumnDefinition<Item>[] = [
        {
            key: 'payment_type',
            label: 'Ödeme Türü',
            render: (r, _open, idx) => (
                <Form.Control
                    size='sm'
                    value={r.payment_type}
                    onChange={e =>
                        setItems(p => p.map((it, i) => (i === idx ? { ...it, payment_type: e.target.value } : it)))
                    }
                    style={typeof idx === 'number' && errors[idx]?.payment_type ? { borderColor: 'red' } : {}}
                />
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
            render: (_r, _open, idx) => (
                <Button
                    variant='danger-light'
                    size='sm'
                    className='btn-icon rounded-pill'
                    onClick={() => {
                        if (typeof idx === 'number') handleDeleteRow(idx)
                    }}
                >
                    <i className='ti ti-trash'></i>
                </Button>
            ),
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
                <div className='text-right mt-4 font-bold'>Toplam Ödenen {currency.format(total)}</div>
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
import { useState, useMemo } from 'react'
import { Modal, Table, Button, DatePicker, Select, Input, InputNumber } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
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
  payment_date?: string
  payment_method?: string
  bank_name?: string
  amount?: number
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
        amount: ex?.amount ? Number(ex.amount) : undefined,
      }
    })
  )
  const [errors, setErrors] = useState<Record<number, Record<string, boolean>>>({})

  function handleAddRow() {
    setItems((p) => [
      ...p,
      { payment_type: '', payment_date: '', payment_method: '', bank_name: '', amount: undefined },
    ])
  }

  function handleDeleteRow(idx: number) {
    setItems((p) => p.filter((_, i) => i !== idx))
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
        employee_id: row.employee_id,
        period,
        payment_type: it.payment_type,
        payment_date: dayjs(it.payment_date).format('YYYY-MM-DD'),
        payment_method: it.payment_method,
        bank_name: it.bank_name,
        amount: String(it.amount),
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

  const columns: ColumnsType<Item> = [
    {
      title: 'Ödeme Türü',
      dataIndex: 'payment_type',
      render: (_: unknown, r: Item, idx: number) => (
        <Input
          value={r.payment_type}
          onChange={(e) =>
            setItems((p) => p.map((it, i) => (i === idx ? { ...it, payment_type: e.target.value } : it)))
          }
          style={errors[idx]?.payment_type ? { borderColor: 'red' } : {}}
        />
      ),
    },
    {
      title: 'Ödeme Tarihi',
      dataIndex: 'payment_date',
      render: (_: unknown, r: Item, idx: number) => (
        <DatePicker
          value={r.payment_date ? dayjs(r.payment_date) : undefined}
          onChange={(d) =>
            setItems((p) => p.map((it, i) => (i === idx ? { ...it, payment_date: d ? d.format('YYYY-MM-DD') : '' } : it)))
          }
          style={errors[idx]?.payment_date ? { borderColor: 'red' } : {}}
        />
      ),
    },
    {
      title: 'Ödeme Yöntemi',
      dataIndex: 'payment_method',
      render: (_: unknown, r: Item, idx: number) => (
        <Select
          value={r.payment_method || undefined}
          options={[{ value: 'Nakit', label: 'Nakit' }, { value: 'Banka', label: 'Banka' }]}
          onChange={(v) => setItems((p) => p.map((it, i) => (i === idx ? { ...it, payment_method: v } : it)))}
          style={errors[idx]?.payment_method ? { borderColor: 'red' } : {}}
        />
      ),
    },
    {
      title: 'Banka/Kurum Adı',
      dataIndex: 'bank_name',
      render: (_: unknown, r: Item, idx: number) => (
        <Input
          value={r.bank_name}
          onChange={(e) =>
            setItems((p) => p.map((it, i) => (i === idx ? { ...it, bank_name: e.target.value } : it)))
          }
          style={errors[idx]?.bank_name ? { borderColor: 'red' } : {}}
        />
      ),
    },
    {
      title: 'Ödenen Tutar (₺)',
      dataIndex: 'amount',
      align: 'right' as const,
      render: (_: unknown, r: Item, idx: number) => (
        <InputNumber
          value={r.amount}
          min={0}
          formatter={(val) => currency.format(val ? Number(val) : 0)}
          parser={(val) => Number((val || '').replace(/[₺\s,]/g, ''))}
          onChange={(v) =>
            setItems((p) => p.map((it, i) => (i === idx ? { ...it, amount: v as number } : it)))
          }
          style={errors[idx]?.amount ? { borderColor: 'red' } : {}}
        />
      ),
    },
    {
      title: 'İşlemler',
      render: (_: unknown, __: Item, idx: number) => (
        <Button danger onClick={() => handleDeleteRow(idx)}>
          Sil
        </Button>
      ),
    },
  ]

  return (
    <Modal
      open
      onCancel={onClose}
      title='Personel Ödeme Giriş Formu'
      footer={null}
      getContainer={() => document.body}
    >
      <div className='flex justify-between mb-4'>
        <div>Personel Ad: {row.employee?.full_name}</div>
        <div>
          Dönem:{' '}
          <DatePicker
            picker='month'
            format='YYYY MMM'
            value={dayjs(period)}
            onChange={(d) => setPeriod(d ? d.format('YYYY-MM') : period)}
          />
        </div>
      </div>
      <Button onClick={handleAddRow} style={{ marginBottom: 8 }}>
        Ekle
      </Button>
      <Table columns={columns} dataSource={items} pagination={false} rowKey={(_, i) => String(i)} />
      <div className='text-right font-semibold mt-4'>
        Toplam Ödenen {currency.format(total)}
      </div>
      <div className='text-right mt-6'>
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          İptal
        </Button>
        <Button type='primary' onClick={handleSave}>
          Kaydet
        </Button>
      </div>
    </Modal>
  )
}

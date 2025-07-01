import { useMemo } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import { EmployeeEarningsMonthItem } from '../../../../../types/employeeEarningsMonth/list'

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

export default function MonthlyDetailModal({ row, onClose }: Props) {
  const year = row.period?.split('-')[0] || new Date().getFullYear()
  const period = row.period

  const items: EmployeeEarningsMonthItem[] = INCOME_TYPES.map((t) => {
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

  const columns: ColumnDefinition<EmployeeEarningsMonthItem>[] = [
    { key: 'income_type', label: 'Gelir Türü', render: (r) => INCOME_TYPES.find((t) => t.key === r.income_type)?.label },
    { key: 'unit_price', label: 'Birim Ücret (₺)', render: (r) => r.unit_price },
    {
      key: 'quantity',
      label: 'Sayı',
      render: (r) => <Form.Control type='number' size='sm' disabled value={r.quantity} />,
    },
    {
      key: 'total',
      label: 'Tutar',
      render: (r) => (Number(r.quantity) * Number(r.unit_price)).toFixed(2),
    },
  ]

  const total = useMemo(() => items.reduce((sum, i) => sum + Number(i.quantity) * Number(i.unit_price), 0), [items])

  return (
    <Modal show centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Personel Adı: {row.full_name}&nbsp;&nbsp; Dönem: {period}
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
        <Button variant='outline-secondary' onClick={onClose}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  )
}

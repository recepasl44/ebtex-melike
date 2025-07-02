import { Modal, Button } from 'react-bootstrap'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import dayjs from 'dayjs'
import type { EmployeePaymentData, EmployeePaymentItem } from '../../../../../../types/employeePayments/list'

interface Props {
  row: EmployeePaymentData
  onClose: () => void
}

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

export default function PaymentDetailModal({ row, onClose }: Props) {
  const items: EmployeePaymentItem[] = row.items

  const columns: ColumnDefinition<EmployeePaymentItem>[] = [
    { key: 'payment_type', label: 'Ödeme Türü' },
    {
      key: 'payment_date',
      label: 'Ödeme Tarihi',
      render: r => (r.payment_date ? dayjs(r.payment_date).format('YYYY-MM-DD') : '-')
    },
    { key: 'payment_method', label: 'Ödeme Yöntemi' },
    { key: 'bank_name', label: 'Banka/Kurum Adı' },
    {
      key: 'amount',
      label: 'Ödenen Tutar (₺)',
      render: r => currency.format(Number(r.amount || 0))
    }
  ]

  const total = items.reduce((s, i) => s + Number(i.amount || 0), 0)

  return (
    <Modal show centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Personel Ödeme Detay</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='mb-2 fw-bold'>
          Personel Ad: {row.employee?.full_name}&nbsp;&nbsp; Dönem: {dayjs(row.items[0]?.period).format('YYYY MMM')}
        </div>
        <ReusableTable<EmployeePaymentItem>
          tableMode='single'
          columns={columns}
          data={items}
          pageSize={items.length}
          currentPage={1}
          totalPages={1}
          totalItems={items.length}
        />
        <div className='text-right fw-bold mt-4'>
          Toplam Ödenen {currency.format(total)}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-secondary' onClick={onClose}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  )
}
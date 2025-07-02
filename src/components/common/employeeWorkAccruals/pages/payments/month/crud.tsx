import { Modal, Table, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import type { EmployeePaymentData, EmployeePaymentItem } from '../../../../../../types/employeePayments/list'

interface Props {
  row: EmployeePaymentData
  onClose: () => void
}

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

export default function PaymentDetailModal({ row, onClose }: Props) {
  const items: EmployeePaymentItem[] = row.items
  const columns: ColumnsType<EmployeePaymentItem> = [
    { title: 'Ödeme Türü', dataIndex: 'payment_type' },
    {
      title: 'Ödeme Tarihi',
      dataIndex: 'payment_date',
      render: (v: string) => (v ? dayjs(v).format('YYYY-MM-DD') : '-'),
    },
    { title: 'Ödeme Yöntemi', dataIndex: 'payment_method' },
    { title: 'Banka/Kurum Adı', dataIndex: 'bank_name' },
    {
      title: 'Ödenen Tutar (₺)',
      dataIndex: 'amount',
      align: 'right' as const,
      render: (v: number) => currency.format(Number(v || 0)),
    },
  ]

  const total = items.reduce((s: number, i: EmployeePaymentItem) => s + Number(i.amount || 0), 0)

  return (
    <Modal
      open
      onCancel={onClose}
      title='Personel Ödeme Detay'
      footer={<Button onClick={onClose}>Kapat</Button>}
      getContainer={() => document.body}
    >
      <div className='flex justify-between mb-4'>
        <div>Personel Ad: {row.employee?.full_name}</div>
        <div>Dönem: {dayjs(row.items[0]?.period).format('YYYY MMM')}</div>
      </div>
      <Table columns={columns} dataSource={items} pagination={false} rowKey={(r) => String(r.id)} />
      <div className='text-right font-semibold mt-4'>
        Toplam Ödenen {currency.format(total)}
      </div>
    </Modal>
  )
}

import { Modal, Button, Table } from 'antd'
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
    { title: 'Ödeme Türü', dataIndex: 'payment_type', key: 'payment_type' },
    {
      title: 'Ödeme Tarihi',
      dataIndex: 'payment_date',
      key: 'payment_date',
      render: (v: string) => (v ? dayjs(v).format('YYYY-MM-DD') : '-')
    },
    { title: 'Ödeme Yöntemi', dataIndex: 'payment_method', key: 'payment_method' },
    { title: 'Banka/Kurum Adı', dataIndex: 'bank_name', key: 'bank_name' },
    {
      title: 'Ödenen Tutar (₺)',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as const,
      render: (v: string) => currency.format(Number(v || 0))
    }
  ]

  const total = items.reduce((s, i) => s + Number(i.amount || 0), 0)

  return (
    <Modal
      open
      title='Personel Ödeme Detay'
      onCancel={onClose}
      footer={[<Button key='close' onClick={onClose}>Kapat</Button>]}
      getContainer={() => document.body}
    >
      <div className='mb-4 font-bold'>
        Personel Ad: {row.employee?.full_name}&nbsp;&nbsp; Dönem:{' '}
        {dayjs(row.items[0]?.period).format('YYYY MMM')}
      </div>
      <Table<EmployeePaymentItem>
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey={r => String(r.id)}
      />
      <div style={{ textAlign: 'right', fontWeight: 'bold', marginTop: 16 }}>
        Toplam Ödenen {currency.format(total)}
      </div>
    </Modal>
  )
}

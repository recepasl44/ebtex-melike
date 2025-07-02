import { useMemo, useState } from 'react'
import { Table, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEmployeePaymentList } from '../../../../../hooks/employeePayments/useList'
import type { EmployeePaymentData } from '../../../../../types/employeePayments/list'
import MonthlyDataEntry from './monthlyDataEntry'
import PaymentDetailModal from './crud'

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

function getAmount(row: EmployeePaymentData, type: string) {
  const item = row.items.find(i => i.payment_type === type)
  return item ? Number(item.amount) : 0
}

export default function PersonnelPaymentsMonthTable() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    employeePaymentData = [],
    loading,
    totalItems,
  } = useEmployeePaymentList({ page, pageSize })

  const [entryRow, setEntryRow] = useState<EmployeePaymentData | null>(null)
  const [detailRow, setDetailRow] = useState<EmployeePaymentData | null>(null)

  const columns: ColumnsType<EmployeePaymentData> = [
    {
      title: 'Okul Seviyesi',
      dataIndex: ['employee', 'branch', 'name'],
      render: (v: unknown) => (v as string) || '-',
    },
    {
      title: 'Meslek / Branş',
      dataIndex: ['employee', 'contract_employee', 'profession', 'name'],
      render: (v: unknown) => (v as string) || '-',
    },
    { title: 'Adı Soyadı', dataIndex: ['employee', 'full_name'] },
    {
      title: 'Sözleşme Türü',
      dataIndex: ['employee', 'contract_employee', 'contract_type', 'name'],
      render: (v: unknown) => (v as string) || '-',
    },
    {
      title: 'Toplam Ücret (₺)',
      dataIndex: 'total_amount',
      align: 'right' as const,
      render: (v: number) => currency.format(v || 0),
    },
    {
      title: 'Ödeme Girişi',
      render: (_: unknown, r) => (
        <Button type='primary' onClick={() => setEntryRow(r)}>
          Aylık Giriş
        </Button>
      ),
    },
    {
      title: 'Nakit Avans',
      render: (r) => currency.format(getAmount(r, 'Nakit Avans')),
    },
    {
      title: 'Banka Avans',
      render: (r) => currency.format(getAmount(r, 'Banka Avans')),
    },
    {
      title: 'Banka Maaş',
      render: (r) => currency.format(getAmount(r, 'Banka Maaş')),
    },
    {
      title: 'Nakit',
      render: (r) => currency.format(getAmount(r, 'Nakit')),
    },
    {
      title: 'İşlemler',
      render: (r) => (
        <Button onClick={() => setDetailRow(r)}>Detay</Button>
      ),
    },
  ]

  const total = useMemo(
    () => employeePaymentData.reduce((s, r) => s + Number(r.total_amount || 0), 0),
    [employeePaymentData]
  )

  return (
    <div className='p-4'>
      <Table
        rowKey='employee_id'
        columns={columns}
        dataSource={employeePaymentData}
        loading={loading}
        pagination={{
          current: page,
          pageSize,
          total: totalItems,
          onChange: (p, s) => {
            setPage(p)
            setPageSize(s)
          },
        }}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={4}>
              Toplam
            </Table.Summary.Cell>
            <Table.Summary.Cell index={4} align='right'>
              {currency.format(total)}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5} colSpan={6} />
          </Table.Summary.Row>
        )}
      />
      {entryRow && (
        <MonthlyDataEntry row={entryRow} onClose={() => setEntryRow(null)} />
      )}
      {detailRow && (
        <PaymentDetailModal row={detailRow} onClose={() => setDetailRow(null)} />
      )}
    </div>
  )
}

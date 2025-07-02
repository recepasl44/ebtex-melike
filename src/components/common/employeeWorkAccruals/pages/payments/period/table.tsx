import { useState, useMemo } from 'react'
import { Table, Button, DatePicker, Select } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useEmployeePaymentList } from '../../../../../hooks/employeePayments/useList'
import { useContractEmployeesTable } from '../../../../../hooks/contractEmployees/useList'
import type { EmployeePaymentData } from '../../../../../../types/employeePayments/list'
import PaymentDetailModal from './crud'

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

function getAmount(row: EmployeePaymentData, type: string) {
  const item = row.items.find(i => i.payment_type === type)
  return item ? Number(item.amount) : 0
}

export default function PersonnelPaymentsPeriodTable() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [employeeId, setEmployeeId] = useState<string | undefined>()
  const [period, setPeriod] = useState(dayjs().format('YYYY-MM'))
  const [detailRow, setDetailRow] = useState<EmployeePaymentData | null>(null)

  const {
    employeePaymentData = [],
    loading,
    totalItems
  } = useEmployeePaymentList({
    page,
    pageSize,
    employee_id: employeeId ? Number(employeeId) : undefined,
    period,
    type: 'donem'
  })

  const { contractEmployeesData } = useContractEmployeesTable({ page: 1, pageSize: 9999 })

  const employeeOptions = useMemo(
    () => (contractEmployeesData || []).map(c => ({ value: String((c as any).id), label: (c as any).full_name })),
    [contractEmployeesData]
  )

  const columns: ColumnsType<EmployeePaymentData> = useMemo(
    () => [
      {
        title: 'Okul Seviyesi',
        key: 'branch',
        render: (r: EmployeePaymentData) => r.employee?.branch?.name || '-'
      },
      {
        title: 'Meslek / Branş',
        key: 'profession',
        render: (r: EmployeePaymentData) => r.employee?.contract_employee?.profession_id ?? '-'
      },
      {
        title: 'Adı Soyadı',
        key: 'full_name',
        render: (r: EmployeePaymentData) => r.employee?.full_name || '-'
      },
      {
        title: 'Sözleşme Türü',
        key: 'contract_type',
        render: (r: EmployeePaymentData) => r.employee?.contract_employee?.contract_type?.name || '-'
      },
      {
        title: 'Toplam Ücret (₺)',
        dataIndex: 'total_amount',
        key: 'total',
        align: 'right' as const,
        render: (v: any) => currency.format(Number(v || 0))
      },
      {
        title: 'Nakit Avans',
        key: 'cash_advance',
        align: 'right' as const,
        render: (r: EmployeePaymentData) => currency.format(getAmount(r, 'Nakit Avans'))
      },
      {
        title: 'Banka Avans',
        key: 'bank_advance',
        align: 'right' as const,
        render: (r: EmployeePaymentData) => currency.format(getAmount(r, 'Banka Avans'))
      },
      {
        title: 'Banka Maaş',
        key: 'bank_salary',
        align: 'right' as const,
        render: (r: EmployeePaymentData) => currency.format(getAmount(r, 'Banka Maaş'))
      },
      {
        title: 'Nakit',
        key: 'cash',
        align: 'right' as const,
        render: (r: EmployeePaymentData) => currency.format(getAmount(r, 'Nakit'))
      },
      {
        title: 'İşlemler',
        key: 'actions',
        render: (_: any, r: EmployeePaymentData) => (
          <Button type='link' onClick={() => setDetailRow(r)}>
            Detay
          </Button>
        )
      }
    ],
    []
  )

  const total = useMemo(
    () => employeePaymentData.reduce((s, r) => s + Number(r.total_amount || 0), 0),
    [employeePaymentData]
  )

  return (
    <div className='p-4'>
      <div className='flex gap-4 mb-4'>
        <Select
          placeholder='Personel'
          options={employeeOptions}
          allowClear
          value={employeeId}
          onChange={v => {
            setEmployeeId(v)
            setPage(1)
          }}
          style={{ width: 200 }}
        />
        <DatePicker
          picker='month'
          format='YYYY MMM'
          value={dayjs(period)}
          onChange={d => {
            setPeriod(d ? d.format('YYYY-MM') : dayjs().format('YYYY-MM'))
            setPage(1)
          }}
          allowClear={false}
        />
      </div>
      <Table<EmployeePaymentData>
        rowKey={r => String(r.employee_id)}
        columns={columns}
        dataSource={employeePaymentData}
        loading={loading}
        pagination={{
          current: page,
          pageSize,
          total: totalItems,
          showSizeChanger: true,
          onChange: (p, s) => {
            setPage(p)
            setPageSize(s)
          }
        }}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={4}>
              <div style={{ textAlign: 'right', fontWeight: 'bold' }}>Toplam</div>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={4} align='right' style={{ fontWeight: 'bold' }}>
              {currency.format(total)}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5} colSpan={5} />
          </Table.Summary.Row>
        )}
      />
      {detailRow && <PaymentDetailModal row={detailRow} onClose={() => setDetailRow(null)} />}
    </div>
  )
}

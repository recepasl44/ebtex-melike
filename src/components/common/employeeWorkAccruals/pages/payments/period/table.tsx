import { useState, useMemo } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import FilterGroup, { FilterDefinition } from '../../../component/organisms/SearchFilters'
import { useEmployeePaymentList } from '../../../../../hooks/employeePayments/useList'
import { useContractEmployeesTable } from '../../../../../hooks/contractEmployees/useList'
import type { EmployeePaymentData } from '../../../../../../types/employeePayments/list'
import PaymentDetailModal from './crud'

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

function getAmount(row: EmployeePaymentData, type: string) {
  const item = row.items?.find(i => i.payment_type === type)
  return item ? Number(item.amount) : 0
}

export default function PersonnelPaymentsPeriodTable() {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [employeeId, setEmployeeId] = useState('')
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

  const monthOptions = useMemo(() => {
    const year = new Date().getFullYear()
    return Array.from({ length: 12 }).map((_, i) => {
      const m = String(i + 1).padStart(2, '0')
      return { value: `${year}-${m}`, label: `${year}-${m}` }
    })
  }, [])

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: 'employee_id',
        label: 'Personel',
        type: 'select',
        value: employeeId,
        options: employeeOptions,
        onChange: setEmployeeId
      },
      {
        key: 'period',
        label: 'Dönem',
        type: 'select',
        value: period,
        options: monthOptions,
        onChange: setPeriod
      }
    ],
    [employeeId, period, employeeOptions, monthOptions]
  )

  const columns: ColumnDefinition<EmployeePaymentData>[] = useMemo(
    () => [
      {
        key: 'branch',
        label: 'Okul Seviyesi',
        render: r => r.employee?.branch?.name || '-'
      },
      {
        key: 'profession',
        label: 'Meslek / Branş',
        render: r => r.employee?.contract_employee?.profession_id ?? '-'
      },
      {
        key: 'full_name',
        label: 'Adı Soyadı',
        render: r => r.employee?.full_name || '-'
      },
      {
        key: 'contract_type',
        label: 'Sözleşme Türü',
        render: r => r.employee?.contract_employee?.contract_type?.name || '-'
      },
      {
        key: 'total',
        label: 'Toplam Ücret (₺)',
        render: r => currency.format(r.total_amount || 0)
      },
      {
        key: 'cash_advance',
        label: 'Nakit Avans',
        render: r => currency.format(getAmount(r, 'Nakit Avans'))
      },
      {
        key: 'bank_advance',
        label: 'Banka Avans',
        render: r => currency.format(getAmount(r, 'Banka Avans'))
      },
      {
        key: 'bank_salary',
        label: 'Banka Maaş',
        render: r => currency.format(getAmount(r, 'Banka Maaş'))
      },
      {
        key: 'cash',
        label: 'Nakit',
        render: r => currency.format(getAmount(r, 'Nakit'))
      },
      {
        key: 'actions',
        label: 'İşlemler',
        render: r => (
          <Button
            variant='primary-light'
            size='sm'
            className='btn-icon rounded-pill'
            onClick={() => setDetailRow(r)}
          >
            <i className='ti ti-eye'></i>
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
    <div>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={2} />
      <ReusableTable<EmployeePaymentData>
        tableMode='single'
        columns={columns}
        data={employeePaymentData}
        loading={loading}
        currentPage={page}
        totalPages={Math.ceil(totalItems / pageSize) || 1}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={s => {
          setPageSize(s)
          setPage(1)
        }}
        customFooter={<div className='text-end fw-bold'>Toplam {currency.format(total)}</div>}
      />
      {detailRow && <PaymentDetailModal row={detailRow} onClose={() => setDetailRow(null)} />}
    </div>
  )
}
import { useState, useMemo } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import FilterGroup, { FilterDefinition } from '../../../component/organisms/SearchFilters'
import { useEmployeeEarningsMonthList } from '../../../../../hooks/employeeEarningsMonth/useList'
import { useContractEmployeesTable } from '../../../../../hooks/contractEmployees/useList'
import MonthlyDataModal from './MonthlyDataModal'
import MonthlyDetailModal from './MonthlyDetailModal'

export default function EmployeeEarningsMonthTable() {
  const navigate = useNavigate()
  const currentMonth = new Date().toISOString().slice(0, 7)

  const [period, setPeriod] = useState(currentMonth)
  const [employeeId, setEmployeeId] = useState('')

  const { employeeEarningsMonthData, loading: earningsLoading } =
    useEmployeeEarningsMonthList({
      period,
      employee_id: employeeId ? Number(employeeId) : undefined,
    })
  const { contractEmployeesData, loading: contractLoading } =
    useContractEmployeesTable({ page: 1, pageSize: 9999 })

  const loading = earningsLoading || contractLoading

  const [entryRow, setEntryRow] = useState<any | null>(null)
  const [detailRow, setDetailRow] = useState<any | null>(null)

  const employeeOptions = useMemo(
    () =>
      (contractEmployeesData || []).map((c: any) => ({
        value: String(c.id),
        label: c.full_name,
      })),
    [contractEmployeesData]
  )

  const monthOptions = useMemo(() => {
    const year = new Date().getFullYear()
    return Array.from({ length: 12 }).map((_, i) => {
      const m = String(i + 1).padStart(2, '0')
      return { value: `${year}-${m}`, label: `${year}-${m}` }
    })
  }, [])

  const filteredContracts = useMemo(
    () =>
      (contractEmployeesData || []).filter(
        (c: any) => !employeeId || String(c.id) === employeeId
      ),
    [contractEmployeesData, employeeId]
  )

  const data = useMemo(() => {
    return filteredContracts.map((c) => {
      const e = (employeeEarningsMonthData || []).find(
        (x) => x.employee_id === (c as any).id
      )
      return { ...c, ...e }
    })
  }, [filteredContracts, employeeEarningsMonthData])

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: 'employee_id',
        label: 'Personel',
        type: 'select',
        value: employeeId,
        options: employeeOptions,
        onChange: setEmployeeId,
      },
      {
        key: 'period',
        label: 'Dönem',
        type: 'select',
        value: period,
        options: monthOptions,
        onChange: setPeriod,
      },
    ],
    [employeeId, period, employeeOptions, monthOptions]
  )

  const columns: ColumnDefinition<any>[] = [
    { key: 'branch', label: 'Şube' },
    {
      key: 'profession_id',
      label: 'Meslek/Branş',
      render: (r) => (r as any).profession || String(r.profession_id),
    },
    { key: 'full_name', label: 'Adı Soyadı' },
    {
      key: 'entry',
      label: 'Aylık Veri Girişi',
      render: (r) => (
        <Button
          variant='primary-light'
          size='sm'
          className='rounded-pill px-3'
          onClick={() => setEntryRow(r)}
        >
          Aylık Veri Girişi
        </Button>
      ),
    },
    {
      key: 'contract_type',
      label: 'Sözleşme Türü',
      render: (r) => (r as any).contract_type_text || String(r.contract_type),
    },
    { key: 'weekly_workdays', label: 'Haftalık İş Günü' },
    { key: 'salary', label: 'Maaş' },
    { key: 'lesson_rate', label: 'Ders Ücreti' },
    { key: 'question_rate', label: 'Soru Çözüm Ders Ücreti' },
    {
      key: 'question_qty',
      label: 'Soru Çözüm Ders Sayısı',
      render: (r) => {
        const item = r.items?.find((i: any) => i.income_type === 'question')
        return item ? item.quantity : '-'
      },
    },
    { key: 'daily_rate', label: 'Gün Bazlı Ücret' },
    { key: 'private_lesson_rate', label: 'Özel Ders Ücreti' },
    { key: 'coaching_rate', label: 'Koçluk Ücreti' },
    {
      key: 'bonus',
      label: 'Prim',
      render: (r) => {
        const item = r.items?.find((i: any) => i.income_type === 'bonus')
        return item ? item.total : '-'
      },
    },
    {
      key: 'other',
      label: 'Farklı Ücret',
      render: (r) => {
        const item = r.items?.find((i: any) => i.income_type === 'other')
        return item ? item.total : '-'
      },
    },
    {
      key: 'total',
      label: 'Toplam Ücret',
      render: (r) => (r.items ? r.items.reduce((s: number, i: any) => s + Number(i.total), 0) : 0),
    },
    {
      key: 'actions',
      label: 'İşlemler',
      render: (r) => (
        <Button
          variant='primary-light'
          size='sm'
          className='btn-icon rounded-pill'
          onClick={() => setDetailRow(r)}
        >
          <i className='ti ti-eye'></i>
        </Button>
      ),
    },
  ]

  return (
    <div className='p-4'>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={2} />
      <ReusableTable<any> columns={columns} data={data} loading={loading} error={null} tableMode='single' />
      {entryRow && <MonthlyDataModal row={entryRow} onClose={() => setEntryRow(null)} />}
      {detailRow && <MonthlyDetailModal row={detailRow} onClose={() => setDetailRow(null)} />}
    </div>
  )
}

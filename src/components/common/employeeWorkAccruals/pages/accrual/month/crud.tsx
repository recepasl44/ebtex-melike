import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import FilterGroup from '../../../component/organisms/SearchFilters'
import ReusableModalForm from '../../../../ReusableModalForm'
import { useEmployeeEarningsTable } from '../../../../../hooks/employeeEarnings/useList'

interface Row { [key: string]: any }

function MonthlyDataModal({ show, row, onClose }: { show: boolean; row: Row | null; onClose: () => void }) {
  const fields = [
    {
      name: 'info',
      label: '',
      renderForm: () => (
        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm'>
            <thead>
              <tr>
                <th className='text-left p-2'>Gelir Türü</th>
                <th className='text-left p-2'>Sayı</th>
                <th className='text-left p-2'>Birim Ücret ₺</th>
                <th className='text-left p-2'>Tutar ₺</th>
              </tr>
            </thead>
            <tbody>
              {['base','lesson','question','daily','coaching','private','bonus','other'].map(k => (
                <tr key={k} className='border-t'>
                  <td className='p-2'>{k}</td>
                  <td className='p-2'>{(row as any)[`${k}_qty`]}</td>
                  <td className='p-2'>{(row as any)[`${k}_unit`]}</td>
                  <td className='p-2'>{(row as any)[k]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  ]
  return (
    <ReusableModalForm
      show={show}
      title={row?.full_name || ''}
      fields={fields as any}
      initialValues={{}}
      onSubmit={() => onClose()}
      confirmButtonLabel='Tamam'
      cancelButtonLabel='Kapat'
      onClose={onClose}
      mode='single'
    />
  )
}

export default function EmployeeEarningsPeriodTable() {
  const [employeeId, setEmployeeId] = useState('')
  const [period, setPeriod] = useState('')
  const [modalRow, setModalRow] = useState<Row | null>(null)
  const navigate = useNavigate()

  const { employeeEarningsData, loading, error, page, setPage, pageSize, setPageSize, totalPages, totalItems } = useEmployeeEarningsTable({
    enabled: true,
    employee_id: employeeId ? Number(employeeId) : undefined,
    period: period || undefined
  })

  const employeeOptions = useMemo(() => {
    const map = new Map<number, string>()
    employeeEarningsData.forEach(d => map.set(d.employee_id, (d as any).full_name || String(d.employee_id)))
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
  }, [employeeEarningsData])

  const totals = useMemo(() => {
    const sum = (key: string) => employeeEarningsData.reduce((s, r) => s + Number((r as any)[key] || 0), 0)
    return {
      base: sum('base'),
      lesson: sum('lesson'),
      question: sum('question'),
      daily: sum('daily'),
      private: sum('private'),
      coaching: sum('coaching'),
      bonus: sum('bonus'),
      other: sum('other'),
      total: sum('total')
    }
  }, [employeeEarningsData])

  const footer = (
    <div className='flex justify-end gap-4 font-bold mr-3'>
      <span>Maaş: {totals.base.toLocaleString()} ₺</span>
      <span>Ders: {totals.lesson.toLocaleString()} ₺</span>
      <span>Soru Çözüm: {totals.question.toLocaleString()} ₺</span>
      <span>Gün Bazlı: {totals.daily.toLocaleString()} ₺</span>
      <span>Özel Ders: {totals.private.toLocaleString()} ₺</span>
      <span>Koçluk: {totals.coaching.toLocaleString()} ₺</span>
      <span>Prim: {totals.bonus.toLocaleString()} ₺</span>
      <span>Farklı: {totals.other.toLocaleString()} ₺</span>
      <span>Toplam: {totals.total.toLocaleString()} ₺</span>
    </div>
  )

  const filters: any[] = useMemo(() => [
    { key: 'employee_id', label: 'Personel', type: 'select', value: employeeId, onChange: setEmployeeId, options: employeeOptions },
    { key: 'period', label: 'Dönem (Ay)', type: 'month' as any, value: period, onChange: setPeriod }
  ], [employeeId, period, employeeOptions])

  const columns: ColumnDefinition<Row>[] = useMemo(() => [
    { key: 'branch', label: 'Şube', render: r => (r as any).branch },
    { key: 'profession', label: 'Meslek/Branş', render: r => (r as any).profession },
    { key: 'full_name', label: 'Adı Soyadı' },
    { key: 'contract_type_text', label: 'Sözleşme Türü', render: r => (r as any).contract_type_text },
    { key: 'weekly_workdays', label: 'Haftalık İş Günü' },
    { key: 'base', label: 'Maaş' },
    { key: 'lesson', label: 'Ders Ücreti' },
    { key: 'question', label: 'Soru Çözüm Ders Ücreti' },
    { key: 'daily', label: 'Gün Bazlı Ücret' },
    { key: 'private', label: 'Özel Ders Ücreti' },
    { key: 'coaching', label: 'Koçluk Ücreti' },
    { key: 'bonus', label: 'Prim' },
    { key: 'other', label: 'Farklı Ücret' },
    { key: 'total', label: 'Toplam Ücret' },
    {
      key: 'actions',
      label: 'İşlemler',
      render: row => (
        <button onClick={() => setModalRow(row)} className='text-primary hover:text-blue-600'>
          <i className='bi bi-eye' />
        </button>
      )
    }
  ], [])

  return (
    <>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={3} />
      <ReusableTable<Row>
        columns={columns}
        data={employeeEarningsData}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={s => { setPageSize(s); setPage(1) }}
        exportFileName='employee_earnings_period'
        showExportButtons
        customFooter={footer}
      />
      {modalRow && <MonthlyDataModal show={true} row={modalRow} onClose={() => setModalRow(null)} />}
    </>
  )
}

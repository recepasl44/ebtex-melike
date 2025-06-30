import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import FilterGroup from '../../../component/organisms/SearchFilters'
import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm'
import { useEmployeeEarningsTable } from '../../../../../hooks/employeeEarnings/useList'

interface Row { [key: string]: any }

function MonthlyDataModal({ show, row, onClose, readOnly }: { show: boolean; row: Row | null; onClose: () => void; readOnly?: boolean }) {
  const [period, setPeriod] = useState(row?.period || '')
  const [items, setItems] = useState(() => [
    { key: 'base', label: 'Sabit Maaş', qty: Number(row?.base_qty || 0), unit: Number(row?.base_unit || 0) },
    { key: 'lesson', label: 'Ders Ücreti', qty: Number(row?.lesson_qty || 0), unit: Number(row?.lesson_unit || 0) },
    { key: 'question', label: 'Soru Çözüm Ücreti', qty: Number(row?.question_qty || 0), unit: Number(row?.question_unit || 0) },
    { key: 'daily', label: 'Gün Bazlı Ücret', qty: Number(row?.daily_qty || 0), unit: Number(row?.daily_unit || 0) },
    { key: 'coaching', label: 'Koçluk Ücreti', qty: Number(row?.coaching_qty || 0), unit: Number(row?.coaching_unit || 0) },
    { key: 'private', label: 'Özel Ders Ücreti', qty: Number(row?.private_qty || 0), unit: Number(row?.private_unit || 0) },
    { key: 'bonus', label: 'Prim', qty: Number(row?.bonus_qty || 0), unit: Number(row?.bonus_unit || 0) },
    { key: 'other', label: 'Farklı Ücret', qty: Number(row?.other_qty || 0), unit: Number(row?.other_unit || 0) }
  ])
  const total = useMemo(() => items.reduce((s, i) => s + i.qty * i.unit, 0), [items])
  const fields: FieldDefinition[] = [
    {
      name: 'table',
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
              {items.map((it, idx) => (
                <tr key={it.key} className='border-t'>
                  <td className='p-2'>{it.label}</td>
                  <td className='p-2'>
                    <input
                      type='number'
                      className='border rounded px-2 py-1 w-24'
                      value={it.qty}
                      disabled={readOnly}
                      onChange={e => {
                        const v = Number(e.target.value)
                        setItems(arr => arr.map((r, i) => i === idx ? { ...r, qty: v } : r))
                      }}
                    />
                  </td>
                  <td className='p-2'>{it.unit.toLocaleString()}</td>
                  <td className='p-2'>{(it.qty * it.unit).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className='font-bold border-t'>
                <td className='p-2 text-right' colSpan={3}>Genel Toplam ₺</td>
                <td className='p-2'>{total.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )
    }
  ]
  return (
    <ReusableModalForm
      show={show}
      title={
        <div className='flex items-center gap-2'>
          <span>{row?.full_name || ''}</span>
          <select value={period} onChange={e => setPeriod(e.target.value)} className='border rounded px-2 py-1'>
            {Array.from({ length: 12 }, (_, i) => {
              const m = String(i + 1).padStart(2, '0')
              return <option key={m} value={`${row?.period?.slice(0,4) || ''}-${m}`}>{m}</option>
            })}
          </select>
        </div>
      }
      fields={fields}
      initialValues={{}}
      onSubmit={() => onClose()}
      confirmButtonLabel='Kaydet'
      cancelButtonLabel='Vazgeç'
      onClose={onClose}
      mode='single'
    />
  )
}

export default function EmployeeEarningsMonthTable() {
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
        exportFileName='employee_earnings_month'
        showExportButtons
        customFooter={footer}
      />
      {modalRow && <MonthlyDataModal show={true} row={modalRow} onClose={() => setModalRow(null)} />}
    </>
  )
}

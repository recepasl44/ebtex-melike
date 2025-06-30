import { useMemo } from 'react'
import { Form } from 'react-bootstrap'
import ReusableTable, { ColumnDefinition } from '../../../ReusableTable'
import { useContractEmployeesTable } from '../../../../hooks/contractEmployees/useList'
import { data as ContractEmployee } from '../../../../../types/contractEmployees/list'

const EmployeeWorkAccrualsTable: React.FC = () => {
  const {
    contractEmployeesData,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
    totalPages,
    totalItems
  } = useContractEmployeesTable({ enabled: true })

  const branchOptions = useMemo(() => {
    const map = new Map<number, string>()
    contractEmployeesData.forEach(d => map.set(d.branch_id, d.branch))
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
  }, [contractEmployeesData])

  const contractTypeOptions = useMemo(() => {
    const map = new Map<number, any>()
    contractEmployeesData.forEach(d =>
      map.set(d.contract_type_id, (d as any).contract_type_text || d.contract_type)
    )
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
  }, [contractEmployeesData])

  const professionOptions = useMemo(() => {
    const map = new Map<number, any>()
    contractEmployeesData.forEach(d =>
      map.set(d.profession_id, (d as any).profession || d.profession_id)
    )
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
  }, [contractEmployeesData])

  const columns: ColumnDefinition<ContractEmployee>[] = useMemo(
    () => [
      { key: 'branch', label: 'Şube' },
      {
        key: 'profession_id',
        label: 'Meslek / Branş',
        render: row => (row as any).profession || String(row.profession_id)
      },
      { key: 'full_name', label: 'Adı Soyadı' },
      {
        key: 'contract_type',
        label: 'Sözleşme Türü',
        render: row => (row as any).contract_type_text || String(row.contract_type)
      },
      { key: 'weekly_workdays', label: 'Haftalık İş Günü' },
      { key: 'weekly_lessons_count', label: 'Haftalık Ders Sayısı' },
      { key: 'monthly_count', label: 'Ay Sayısı' },
      { key: 'salary', label: 'Maaş' },
      { key: 'lesson_rate', label: 'Ders Ücreti (₺)' },
      { key: 'question_rate', label: 'Soru Çözüm Ders Ücreti (₺)' },
      { key: 'daily_rate', label: 'Günlük Ücret (₺)' },
      { key: 'private_lesson_rate', label: 'Özel Ders Ücreti (₺)' },
      { key: 'coaching_rate', label: 'Koçluk Ders Ücreti (₺)' }
    ],
    []
  )

  return (
    <div className='container-fluid mt-3'>
      <div className='grid grid-cols-3 lg:grid-cols-6 gap-4 mb-6'>
        <div className='col-span-2'>
          <label className='text-xs font-medium mb-1 block'>Şube</label>
          <Form.Select
            className='w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white'
            value={filter?.branch_id || ''}
            onChange={e => {
              const v = e.target.value
              setFilter(f => {
                const nf = { ...(f || {}), branch_id: v || undefined }
                if (v === '') delete nf.branch_id
                return nf
              })
              setPage(1)
            }}
          >
            <option value=''>Seçiniz</option>
            {branchOptions.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Form.Select>
        </div>
        <div>
          <label className='text-xs font-medium mb-1 block'>Sözleşme Türü</label>
          <Form.Select
            className='w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white'
            value={filter?.contract_type_id || ''}
            onChange={e => {
              const v = e.target.value
              setFilter(f => {
                const nf = { ...(f || {}), contract_type_id: v || undefined }
                if (v === '') delete nf.contract_type_id
                return nf
              })
              setPage(1)
            }}
          >
            <option value=''>Seçiniz</option>
            {contractTypeOptions.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Form.Select>
        </div>
        <div>
          <label className='text-xs font-medium mb-1 block'>Meslek/Branş</label>
          <Form.Select
            className='w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white'
            value={filter?.profession_id || ''}
            onChange={e => {
              const v = e.target.value
              setFilter(f => {
                const nf = { ...(f || {}), profession_id: v || undefined }
                if (v === '') delete nf.profession_id
                return nf
              })
              setPage(1)
            }}
          >
            <option value=''>Seçiniz</option>
            {professionOptions.map(o => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className='col-span-2'>
          <label className='text-xs font-medium mb-1 block'>Ad Soyad</label>
          <Form.Control
            className='w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white'
            placeholder='Ad Soyad'
            value={filter?.full_name || ''}
            onChange={e => {
              const v = e.target.value
              setFilter(f => {
                const nf = { ...(f || {}), full_name: v || undefined }
                if (v === '') delete nf.full_name
                return nf
              })
              setPage(1)
            }}
          />
        </div>
      </div>
      <ReusableTable<ContractEmployee>
        columns={columns}
        data={contractEmployeesData}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={newPage => setPage(newPage)}
        onPageSizeChange={newSize => {
          setPageSize(newSize)
          setPage(1)
        }}
        tableMode='single'
        showExportButtons
        exportFileName='contract-employees'
      />
    </div>
  )
}

export default EmployeeWorkAccrualsTable


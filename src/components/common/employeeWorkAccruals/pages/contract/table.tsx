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

    const handleFilterChange = (key: string, value: string) => {
        const newFilter = { ...(filter || {}), [key]: value || undefined }
        if (value === '') delete newFilter[key]
        setFilter(newFilter)
        setPage(1)
    }

    const branchOptions = useMemo(() => {
        const map = new Map<number, string>()
        contractEmployeesData.forEach(d => map.set(d.branch_id, d.branch))
        return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
    }, [contractEmployeesData])

    const contractTypeOptions = useMemo(() => {
        const map = new Map<number, any>()
        contractEmployeesData.forEach(d => map.set(d.contract_type_id, (d as any).contract_type_text || d.contract_type))
        return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
    }, [contractEmployeesData])

    const professionOptions = useMemo(() => {
        const map = new Map<number, any>()
        contractEmployeesData.forEach(d => map.set(d.profession_id, (d as any).profession || d.profession_id))
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
            <div className='d-flex gap-2 mb-3'>
                <Form.Select
                    className='w-auto'
                    value={filter?.branch_id || ''}
                    onChange={e => handleFilterChange('branch_id', e.target.value)}
                >
                    <option value=''>Şube</option>
                    {branchOptions.map(o => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </Form.Select>
                <Form.Select
                    className='w-auto'
                    value={filter?.contract_type_id || ''}
                    onChange={e => handleFilterChange('contract_type_id', e.target.value)}
                >
                    <option value=''>Sözleşme Türü</option>
                    {contractTypeOptions.map(o => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </Form.Select>
                <Form.Select
                    className='w-auto'
                    value={filter?.profession_id || ''}
                    onChange={e => handleFilterChange('profession_id', e.target.value)}
                >
                    <option value=''>Meslek/Branş</option>
                    {professionOptions.map(o => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control
                    className='w-auto'
                    placeholder='Ad Soyad'
                    value={filter?.full_name || ''}
                    onChange={e => handleFilterChange('full_name', e.target.value)}
                />
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
import { useState, useMemo, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import ReusableTable, { ColumnDefinition } from '../../../ReusableTable'
import FilterGroup from '../../component/organisms/SearchFilters'
import { useContractEmployeesTable } from '../../../../hooks/contractEmployees/useList'
import { data as ContractEmployee } from '../../../../../types/contractEmployees/list'

const EmployeeWorkAccrualsTable: React.FC = () => {
    const navigate = useNavigate()

    const [branchId, setBranchId] = useState('')
    const [contractTypeId, setContractTypeId] = useState('')
    const [professionId, setProfessionId] = useState('')
    const [fullName, setFullName] = useState('')

    const [pageSize, setPageSize] = useState(10)
    const [page, setPage] = useState(1)

    const {
        contractEmployeesData,
        loading,
        error,
        totalPages,
        totalItems
    } = useContractEmployeesTable({
        enabled: true,
        page,
        pageSize,
        branch_id: branchId ? +branchId : undefined,
        contract_type_id: contractTypeId ? +contractTypeId : undefined,
        profession_id: professionId ? +professionId : undefined,
        full_name: fullName || undefined
    })

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

    const filters: any[] = useMemo(() => [
        {
            key: 'branch_id',
            label: 'Şube',
            col: 1,
            type: 'select',
            value: branchId,
            onChange: (v: SetStateAction<string>) => {
                setBranchId(v)
                setPage(1)
            },
            options: branchOptions
        },
        {
            key: 'contract_type_id',
            label: 'Sözleşme Türü',
            col: 1,
            type: 'select',
            value: contractTypeId,
            onChange: (v: SetStateAction<string>) => {
                setContractTypeId(v)
                setPage(1)
            },
            options: contractTypeOptions
        },
        {
            key: 'profession_id',
            label: 'Meslek/Branş',
            col: 1,
            type: 'select',
            value: professionId,
            onChange: (v: SetStateAction<string>) => {
                setProfessionId(v)
                setPage(1)
            },
            options: professionOptions
        },
        {
            key: 'full_name',
            label: 'Ad Soyad',
            col: 1,
            type: 'text',
            value: fullName,
            onChange: (v: string) => {
                setFullName(v)
                setPage(1)
            }
        }
    ], [branchId, contractTypeId, professionId, fullName, branchOptions, contractTypeOptions, professionOptions])

    const columns: ColumnDefinition<ContractEmployee>[] = useMemo(() => [
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
    ], [])

    return (
        <>
            <FilterGroup filters={filters} navigate={navigate} columnsPerRow={3} />
            <ReusableTable<ContractEmployee>
                // onAdd={() => navigate('/employeeWorkAccruals/contract/crud')}
                tableMode='single'
                columns={columns}
                data={contractEmployeesData}
                loading={loading}
                error={error}
                showExportButtons
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={s => {
                    setPageSize(s)
                    setPage(1)
                }}
                exportFileName='contract-employees'
            />
        </>
    )
}

export default EmployeeWorkAccrualsTable

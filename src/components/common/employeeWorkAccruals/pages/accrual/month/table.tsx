import { useState, useMemo, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import FilterGroup from '../../../component/organisms/SearchFilters'
import { useContractEmployeesTable } from '../../../../../hooks/contractEmployees/useList'
import { data as ContractEmployee } from '../../../../../types/contractEmployees/list'
import MonthlyDataModal, { MonthlyDataRow } from './MonthlyDataModal'

export default function EmployeeEarningsMonthTable() {
    const navigate = useNavigate()

    const [branchId, setBranchId] = useState('')
    const [contractTypeId, setContractTypeId] = useState('')
    const [professionId, setProfessionId] = useState('')
    const [fullName, setFullName] = useState('')

    const [modalRow, setModalRow] = useState<ContractEmployee | null>(null)

    const { contractEmployeesData, loading, error } = useContractEmployeesTable({
        enabled: true,
        page: 1,
        pageSize: 9999,
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

    const filters: any[] = useMemo(
        () => [
            {
                key: 'branch_id',
                label: 'Şube',
                col: 1,
                type: 'select',
                value: branchId,
                onChange: (v: SetStateAction<string>) => setBranchId(v),
                options: branchOptions
            },
            {
                key: 'contract_type_id',
                label: 'Sözleşme Türü',
                col: 1,
                type: 'select',
                value: contractTypeId,
                onChange: (v: SetStateAction<string>) => setContractTypeId(v),
                options: contractTypeOptions
            },
            {
                key: 'profession_id',
                label: 'Meslek/Branş',
                col: 1,
                type: 'select',
                value: professionId,
                onChange: (v: SetStateAction<string>) => setProfessionId(v),
                options: professionOptions
            },
            {
                key: 'full_name',
                label: 'Ad Soyad',
                col: 1,
                type: 'text',
                value: fullName,
                onChange: (v: string) => setFullName(v)
            }
        ],
        [branchId, contractTypeId, professionId, fullName, branchOptions, contractTypeOptions, professionOptions]
    )

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
            { key: 'coaching_rate', label: 'Koçluk Ders Ücreti (₺)' },
            {
                key: 'actions',
                label: 'Aylık Veri Girişi',
                render: row => (
                    <button
                        onClick={() => setModalRow(row)}
                        className='text-primary hover:text-blue-600'
                    >
                        <i className='ti ti-eye' />
                    </button>
                )
            }
        ],
        []
    )

    return (
        <>
            <FilterGroup filters={filters} navigate={navigate} columnsPerRow={3} />
            <ReusableTable<ContractEmployee>
                tableMode='single'
                columns={columns}
                data={contractEmployeesData}
                loading={loading}
                error={error}
                showExportButtons
                exportFileName='employee_earnings_month'
            />
            {modalRow && (
                <MonthlyDataModal
                    show
                    row={{ ...modalRow, period: '' } as MonthlyDataRow}
                    onClose={() => setModalRow(null)}
                />
            )}
        </>
    )
}

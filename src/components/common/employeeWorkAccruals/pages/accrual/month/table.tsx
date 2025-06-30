import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import FilterGroup from '../../../component/organisms/SearchFilters'
import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm'
import { useEmployeeEarningsMonthList } from '../../../../../hooks/employeeEarningsMonth/useList'
import { useContractEmployeesTable } from '../../../../../hooks/contractEmployees/useList'

interface Row {
    id: string
    employee_id: number
    period: string
    [key: string]: any
}

function MonthlyDataModal({ show, row, onClose }: { show: boolean; row: Row | null; onClose: () => void }) {
    const [period, setPeriod] = useState(row?.period || '')
    const [items, setItems] = useState(() => {
        const base: any = row?.items || {}
        const keys = ['sabit_maas', 'ders_ucreti', 'soru_cozum_ucreti', 'gun_bazli_ucret', 'kocluk_ucreti', 'ozel_ders_ucreti', 'prim', 'other']
        return keys.map(k => ({ key: k, label: k, qty: Number(base[k]?.qty || 0), unit: Number(base[k]?.unit || 0) }))
    })
    const total = useMemo(() => items.reduce((s, i) => s + i.qty * i.unit, 0), [items])
    const columns: ColumnDefinition<(typeof items)[number]>[] = useMemo(() => [
        { key: 'label', label: 'Gelir Türü', render: r => r.label },
        {
            key: 'qty',
            label: 'Sayı',
            render: (_r, _o, idx) => (
                <input
                    type='number'
                    className='form-control w-24'
                    value={items[idx!].qty}
                    onChange={e => {
                        const v = Number(e.target.value)
                        setItems(arr => arr.map((it, i) => (i === idx ? { ...it, qty: v } : it)))
                    }}
                />
            )
        },
        { key: 'unit', label: 'Birim Ücret ₺', render: r => r.unit.toLocaleString() },
        { key: 'total', label: 'Tutar ₺', render: r => (r.qty * r.unit).toLocaleString() }
    ], [items])
    const tableFooter = <div className='text-end font-bold p-2'>Genel Toplam ₺ {total.toLocaleString()}</div>
    const fields: FieldDefinition[] = [
        {
            name: 'table',
            renderForm: () => (
                <ReusableTable<(typeof items)[number]>
                    tableMode='single'
                    columns={columns}
                    data={items}
                    showExportButtons={false}
                    customFooter={tableFooter}
                />
            )
        }
    ]
    return (
        <ReusableModalForm
            show={show}
            title={
                <div className='flex items-center gap-2'>
                    <span>{row?.full_name || ''}</span>
                    <select value={period} onChange={e => setPeriod(e.target.value)} className='form-select form-select-sm w-auto'>
                        {Array.from({ length: 12 }, (_, i) => {
                            const m = String(i + 1).padStart(2, '0')
                            return (
                                <option key={m} value={`${row?.period?.slice(0, 4) || ''}-${m}`}>{m}</option>
                            )
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
    const navigate = useNavigate()
    const [employeeId, setEmployeeId] = useState('')
    const [period, setPeriod] = useState('')
    const [modalRow, setModalRow] = useState<Row | null>(null)
    const {
        employeeEarningsMonthData,
        loading,
        error,
        page,
        setPage,
        paginate,
        setPaginate,
        totalPages,
        totalItems
    } = useEmployeeEarningsMonthList({
        enabled: true,
        employee_id: employeeId ? Number(employeeId) : undefined,
        period: period || undefined
    })
    const { contractEmployeesData } = useContractEmployeesTable({ enabled: true, page: 1, pageSize: 9999 })
    const rows: Row[] = useMemo(() => {
        const ceMap = new Map<number, any>()
        const profMap = new Map<number, any>()
        contractEmployeesData.forEach(d => {
            const id = (d as any).id ?? (d as any).employee_id
            if (id !== undefined) ceMap.set(id, d)
            profMap.set(d.profession_id, (d as any).profession || d.profession_id)
        })
        const groups = new Map<string, Row>()
        employeeEarningsMonthData.forEach(e => {
            const key = `${e.employee_id}-${e.period}`
            if (!groups.has(key)) {
                const ce = ceMap.get(e.employee_id)
                const base: Row = {
                    id: key,
                    employee_id: e.employee_id,
                    period: e.period,
                    bonus: 0,
                    other: 0,
                    total: 0
                }
                if (ce) {
                    base.branch = ce.branch
                    base.branch_id = ce.branch_id
                    base.profession_id = ce.profession_id
                    base.profession = profMap.get(ce.profession_id) || ce.profession_id
                    base.full_name = ce.full_name
                    base.contract_type_text = (ce as any).contract_type_text
                    base.weekly_workdays = ce.weekly_workdays
                    base.lesson_rate = ce.lesson_rate
                    base.question_rate = ce.question_rate
                    base.daily_rate = ce.daily_rate
                    base.private_lesson_rate = ce.private_lesson_rate
                    base.coaching_rate = ce.coaching_rate
                    base.salary = ce.salary
                }
                base.items = {}
                groups.set(key, base)
            }
            const row = groups.get(key)!
            row.items[e.income_type] = {
                qty: Number(e.quantity),
                unit: Number(e.unit_price),
                total: Number(e.total)
            }
            if (e.income_type === 'prim') row.bonus += Number(e.total)
            const defs = ['sabit_maas', 'ders_ucreti', 'soru_cozum_ucreti', 'gun_bazli_ucret', 'ozel_ders_ucreti', 'kocluk_ucreti', 'prim']
            if (!defs.includes(e.income_type)) row.other += Number(e.total)
            row.total += Number(e.total)
        })
        return Array.from(groups.values())
    }, [employeeEarningsMonthData, contractEmployeesData])
    const employeeOptions = useMemo(() => {
        const map = new Map<number, string>()
        rows.forEach(d => map.set(d.employee_id, d.full_name || `Personel #${d.employee_id}`))
        return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
    }, [rows])
    const totals = useMemo(() => {
        const sum = (key: string) => rows.reduce((s, r) => s + Number((r as any)[key] || 0), 0)
        return {
            salary: sum('salary'),
            lesson_rate: sum('lesson_rate'),
            question_rate: sum('question_rate'),
            daily_rate: sum('daily_rate'),
            private_lesson_rate: sum('private_lesson_rate'),
            coaching_rate: sum('coaching_rate'),
            bonus: sum('bonus'),
            other: sum('other'),
            total: sum('total')
        }
    }, [rows])
    const footer = (
        <div className='flex justify-end gap-4 font-bold mr-3'>
            <span>Maaş: {totals.salary.toLocaleString()} ₺</span>
            <span>Ders: {totals.lesson_rate.toLocaleString()} ₺</span>
            <span>Soru Çözüm: {totals.question_rate.toLocaleString()} ₺</span>
            <span>Gün Bazlı: {totals.daily_rate.toLocaleString()} ₺</span>
            <span>Özel Ders: {totals.private_lesson_rate.toLocaleString()} ₺</span>
            <span>Koçluk: {totals.coaching_rate.toLocaleString()} ₺</span>
            <span>Prim: {totals.bonus.toLocaleString()} ₺</span>
            <span>Farklı: {totals.other.toLocaleString()} ₺</span>
            <span>Toplam: {totals.total.toLocaleString()} ₺</span>
        </div>
    )
    const filters: any[] = useMemo(() => [
        { key: 'employee_id', label: 'Personel', col: 1, type: 'select', value: employeeId, onChange: setEmployeeId, options: employeeOptions },
        { key: 'period', label: 'Dönem (Ay)', col: 1, type: 'month', value: period, onChange: setPeriod }
    ], [employeeId, period, employeeOptions])
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: 'branch', label: 'Şube', render: r => (r as any).branch },
        { key: 'profession', label: 'Meslek/Branş', render: r => (r as any).profession },
        { key: 'full_name', label: 'Adı Soyadı' },
        { key: 'contract_type_text', label: 'Sözleşme Türü', render: r => (r as any).contract_type_text },
        { key: 'weekly_workdays', label: 'Haftalık İş Günü' },
        { key: 'salary', label: 'Maaş' },
        { key: 'lesson_rate', label: 'Ders Ücreti' },
        { key: 'question_rate', label: 'Soru Çözüm Ders Ücreti' },
        { key: 'daily_rate', label: 'Gün Bazlı Ücret' },
        { key: 'private_lesson_rate', label: 'Özel Ders Ücreti' },
        { key: 'coaching_rate', label: 'Koçluk Ücreti' },
        { key: 'bonus', label: 'Prim' },
        { key: 'other', label: 'Farklı Ücret' },
        { key: 'total', label: 'Toplam Ücret' },
        { key: 'actions', label: 'İşlemler', render: row => (<button onClick={() => setModalRow(row)} className='text-primary hover:text-blue-600'><i className='bi bi-eye' /></button>) }
    ], [])
    useEffect(() => {
        if (page > totalPages) setPage(totalPages || 1)
    }, [totalPages, page])
    return (
        <>
            <FilterGroup filters={filters} navigate={navigate} columnsPerRow={3} />
            <ReusableTable<Row>
                tableMode='single'
                columns={columns}
                data={rows}
                loading={loading}
                error={error}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={paginate}
                onPageChange={setPage}
                onPageSizeChange={s => { setPaginate(s); setPage(1) }}
                exportFileName='employee_earnings_month'
                showExportButtons
                customFooter={footer}
            />
            {modalRow && <MonthlyDataModal show row={modalRow} onClose={() => setModalRow(null)} />}
        </>
    )
}

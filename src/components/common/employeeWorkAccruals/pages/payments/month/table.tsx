import { useEffect, useMemo, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axiosInstance from '../../../../../../services/axiosClient'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import { useEmployeePaymentList } from '../../../../../hooks/employeePayments/useList'
import type { EmployeePaymentData } from '../../../../../../types/employeePayments/list'
import MonthlyDataEntry from './monthlyDataEntry'
import PaymentDetailModal from './crud'

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

function getAmounts(row: EmployeePaymentData, types: string[]) {
    return row.items
        .filter(i => types.includes(i.payment_type))
        .reduce((s, i) => s + Number(i.amount), 0)
}

export default function PersonnelPaymentsMonthTable() {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [employeeOptions, setEmployeeOptions] = useState<{ label: string; value: number }[]>([])
    const [selectedEmployee, setSelectedEmployee] = useState<string>('')
    const [period, setPeriod] = useState('')

    const {
        employeePaymentData = [],
        loading,
        totalItems,
        setFilter,
        filter,
    } = useEmployeePaymentList({ page, pageSize })

    const [entryRow, setEntryRow] = useState<EmployeePaymentData | null>(null)
    const [detailRow, setDetailRow] = useState<EmployeePaymentData | null>(null)

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const resp = await axiosInstance.get('/employees', { params: { per_page: 1000 } })
                const opts = (resp.data?.data || []).map((e: any) => ({
                    label: e.full_name,
                    value: e.id,
                }))
                setEmployeeOptions(opts)
            } catch {
                setEmployeeOptions([])
            }
        }
        fetchEmployees()
    }, [])

    const columns: ColumnDefinition<EmployeePaymentData>[] = useMemo(
        () => [
            {
                key: 'branch',
                label: 'Şube',
                render: r => r.employee?.branch?.name ?? '-',
            },
            {
                key: 'profession',
                label: 'Meslek / Branş',
                render: r => r.employee?.contract_employee?.profession?.name ?? '-',
            },
            {
                key: 'full_name',
                label: 'Adı Soyadı',
                render: (r) => r.employee?.full_name || '-',
            },
            {
                key: 'contract_type',
                label: 'Sözleşme Türü',
                render: (r) => r.employee?.contract_employee?.contract_type?.name || '-',
            },
            {
                key: 'total',
                label: 'Toplam Ücret (₺)',
                render: (r) => currency.format(r.total_amount || 0),
            },
            {
                key: 'entry',
                label: 'Ödeme Girişi',
                render: (r) => (
                    <Button
                        variant='primary-light'
                        size='sm'
                        className='rounded-pill px-3'
                        onClick={() => setEntryRow(r)}
                    >
                        Aylık Giriş
                    </Button>
                ),
            },
            {
                key: 'cash_advance',
                label: 'Nakit Avans',
                render: r =>
                    currency.format(
                        getAmounts(r, ['Nakit Avans-1', 'Nakit Avans-2'])
                    ),
            },
            {
                key: 'bank_advance',
                label: 'Banka Avans',
                render: r =>
                    currency.format(
                        getAmounts(r, [
                            'Banka Avans-1',
                            'Banka Avans-2',
                            'Banka Avans-3',
                        ])
                    ),
            },
            {
                key: 'bank_salary',
                label: 'Banka Maaş',
                render: r => currency.format(getAmounts(r, ['Banka Maaş'])),
            },
            {
                key: 'cash',
                label: 'Nakit',
                render: r => currency.format(getAmounts(r, ['Nakit'])),
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
        ],
        []
    )

    const total = useMemo(
        () => employeePaymentData.reduce((s, r) => s + Number(r.total_amount || 0), 0),
        [employeePaymentData]
    )

    return (
        <div className='p-4'>
            <div className='d-flex gap-2 mb-3'>
                <Form.Select
                    size='sm'
                    value={selectedEmployee}
                    onChange={e => setSelectedEmployee(e.target.value)}
                    style={{ maxWidth: 250 }}
                >
                    <option value=''>Personel Seçiniz</option>
                    {employeeOptions.map(o => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control
                    type='month'
                    size='sm'
                    value={period}
                    onChange={e => setPeriod(e.target.value)}
                    style={{ width: 150 }}
                />
                <Button
                    variant='primary'
                    size='sm'
                    onClick={() => {
                        setFilter({
                            employee_id: selectedEmployee || undefined,
                            period: period || undefined,
                        })
                        setPage(1)
                    }}
                >
                    Filtrele
                </Button>
            </div>
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
                onPageSizeChange={(s) => {
                    setPageSize(s)
                    setPage(1)
                }}
                customFooter={
                    <div className='text-end fw-bold'>
                        Toplam {currency.format(total)}
                    </div>
                }
            />
            {entryRow && (
                <MonthlyDataEntry
                    row={entryRow}
                    filter={filter}
                    onClose={() => setEntryRow(null)}
                />
            )}
            {detailRow && (
                <PaymentDetailModal row={detailRow} onClose={() => setDetailRow(null)} />
            )}
        </div>
    )
}
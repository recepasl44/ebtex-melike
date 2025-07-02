import { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import { useEmployeePaymentList } from '../../../../../hooks/employeePayments/useList'
import type { EmployeePaymentData } from '../../../../../../types/employeePayments/list'
import MonthlyDataEntry from './monthlyDataEntry'
import PaymentDetailModal from './crud'

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

function getAmount(row: EmployeePaymentData, type: string) {
    const item = row.items.find(i => i.payment_type === type)
    return item ? Number(item.amount) : 0
}

export default function PersonnelPaymentsMonthTable() {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const {
        employeePaymentData = [],
        loading,
        totalItems,
    } = useEmployeePaymentList({ page, pageSize })

    const [entryRow, setEntryRow] = useState<EmployeePaymentData | null>(null)
    const [detailRow, setDetailRow] = useState<EmployeePaymentData | null>(null)

    const columns: ColumnDefinition<EmployeePaymentData>[] = useMemo(
        () => [
            {
                key: 'branch',
                label: 'Okul Seviyesi',
                render: (r) => r.employee?.branch?.name || '-',
            },
            {
                key: 'profession',
                label: 'Meslek / Branş',
                render: (r) => r.employee?.contract_employee?.profession_id ?? '-',
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
                render: (r) => currency.format(getAmount(r, 'Nakit Avans')),
            },
            {
                key: 'bank_advance',
                label: 'Banka Avans',
                render: (r) => currency.format(getAmount(r, 'Banka Avans')),
            },
            {
                key: 'bank_salary',
                label: 'Banka Maaş',
                render: (r) => currency.format(getAmount(r, 'Banka Maaş')),
            },
            {
                key: 'cash',
                label: 'Nakit',
                render: (r) => currency.format(getAmount(r, 'Nakit')),
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
                <MonthlyDataEntry row={entryRow} onClose={() => setEntryRow(null)} />
            )}
            {detailRow && (
                <PaymentDetailModal row={detailRow} onClose={() => setDetailRow(null)} />
            )}
        </div>
    )
}
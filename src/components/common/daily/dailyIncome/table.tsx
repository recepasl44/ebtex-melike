import { useMemo } from 'react';
import ReusableTable, { ColumnDefinition } from '../../ReusableTable';
import { useOtherIncomeTable } from '../../../hooks/otherIncome/useOtherIncomeList';
import { OtherIncomeData } from '../../../../types/otherIncome/list';

interface DailyIncomeData extends OtherIncomeData {
    branch_name?: string | null;
    received_amount?: string;
    paid_amount?: string;
    remaining_amount?: string;
}

export default function DailyIncomeTable() {
    const {
        otherIncomeData,
        loading,
        error,
        page,
        paginate,
        totalPages,
        totalItems,
        setPage,
        setPaginate,
    } = useOtherIncomeTable({ enabled: true });

    const columns: ColumnDefinition<DailyIncomeData>[] = useMemo(
        () => [
            { key: 'season', label: 'Sezon', render: r => r.season || '-' },
            { key: 'branch_name', label: 'Şube', render: r => r.branch_name || '-' },
            { key: 'date', label: 'Tarih', render: r => r.date || '-' },
            {
                key: 'customer',
                label: 'Müşteri',
                render: r => r.customer?.name || '-',
            },
            { key: 'income_item', label: 'Gelir Kalemi', render: r => r.income_item || '-' },
            {
                key: 'received_amount',
                label: 'Alınan Tutar',
                render: r =>
                    r.received_amount ? `${Number(r.received_amount).toLocaleString()} ₺` : '-',
            },
            {
                key: 'paid_amount',
                label: 'Ödenen Tutar',
                render: r =>
                    r.paid_amount ? `${Number(r.paid_amount).toLocaleString()} ₺` : '-',
            },
            {
                key: 'remaining_amount',
                label: 'Kalan Tutar',
                render: r =>
                    r.remaining_amount ? `${Number(r.remaining_amount).toLocaleString()} ₺` : '-',
            },
            { key: 'payment_method', label: 'Ödeme Şekli', render: r => r.payment_method || '-' },
            { key: 'description', label: 'Açıklama', render: r => r.description || '-' },
            { key: 'id', label: 'Makbuz No', render: r => String(r.id) },
        ],
        []
    );

    return (
        <ReusableTable<DailyIncomeData>
            // pageTitle="Gelirler"
            columns={columns}
            data={otherIncomeData as DailyIncomeData[]}
            loading={loading}
            error={error}
            tableMode="single"
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={paginate}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newSize) => {
                setPaginate(newSize);
                setPage(1);
            }}
            showExportButtons
            exportFileName="daily-income"
        />
    );
}
import { useMemo } from "react";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { useExpencesTable } from "../../../hooks/expences/main/useExpenseList";
import { IExpense } from "../../../../types/expences/main/list";

interface DailyExpenseRow extends IExpense {
    remaining_amount?: number;
}

export default function DailyExpensesTable() {
    const {
        expensesData,
        loading,
        error,
        page,
        pageSize,
        totalPages,
        totalItems,
        setPage,
        setPageSize,
    } = useExpencesTable({ enabled: true });

    const columns: ColumnDefinition<DailyExpenseRow>[] = useMemo(
        () => [
            { key: "seasson_name", label: "Sezon", render: r => r.seasson_name || "-" },
            { key: "branch_name", label: "Şube", render: r => r.branch_name || "-" },
            { key: "invoice_date", label: "Tarih", render: r => r.invoice_date || "-" },
            { key: "category_name", label: "Gider Kalemi", render: r => r.category_name || "-" },
            {
                key: "invoice_amount",
                label: "Ödenecek Tutar",
                render: r =>
                    r.invoice_amount ? `${Number(r.invoice_amount).toLocaleString()} ₺` : "-",
            },
            {
                key: "amount",
                label: "Ödenen Tutar",
                render: r => (r.amount ? `${Number(r.amount).toLocaleString()} ₺` : "-"),
            },
            {
                key: "remaining_amount",
                label: "Kalan Tutar",
                render: r => {
                    if (r.invoice_amount && r.amount) {
                        const remaining = Number(r.invoice_amount) - Number(r.amount);
                        return `${remaining.toLocaleString()} ₺`;
                    }
                    return "-";
                },
            },
            {
                key: "payment_method_id",
                label: "Ödeme Şekli",
                render: r => (r.payment_method_id ? String(r.payment_method_id) : "-"),
            },
            { key: "description", label: "Açıklama", render: r => r.description || "-" },
        ],
        []
    );

    return (
        <ReusableTable<DailyExpenseRow>
            // pageTitle="Giderler"
            columns={columns}
            data={expensesData as DailyExpenseRow[]}
            loading={loading}
            error={error}
            tableMode="single"
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={newPage => setPage(newPage)}
            onPageSizeChange={newSize => {
                setPageSize(newSize);
                setPage(1);
            }}
            showExportButtons
            exportFileName="daily-expenses"
        />
    );
}
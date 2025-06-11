import { useMemo } from "react"
import ReusableTable, { ColumnDefinition } from "../../../ReusableTable"
import { Supplier } from "../../../../../types/suppliers/supplier/list"
import { useSupplierShow } from "../../../../hooks/suppliers/useSuppliersShow"

// 1) Props arayüzü
interface SupplierOverviewTabProps {

  supplierId: number
}

// 2) Bileşeni bu props ile tanımla
export default function SupplierOverviewTab({

}: SupplierOverviewTabProps) {
  const { supplier, error } = useSupplierShow()

  const tableData: Supplier[] = useMemo(() => {
    if (!supplier) return []
    return [
      {
        id: supplier.id,
        name: supplier.name,
        mail: supplier.mail,
        phone: supplier.phone,
        address: supplier.address,
        total_debts: supplier.totalDebts,
        total_payments: supplier.totalPayments,
        remaining_debt: supplier.remainingDebt,
        pay_nakit: supplier.paymentsByMethod?.Nakit || 0,
        pay_kredi: supplier.paymentsByMethod?.["Kredi Kartı"] || 0,
        pay_senet: supplier.paymentsByMethod?.Senet || 0,
        pay_banka: supplier.paymentsByMethod?.["Banka Havale"] || 0,
        pay_diger: supplier.paymentsByMethod?.Diğer || 0,
      } as Supplier,
    ]
  }, [supplier])

  const columns: ColumnDefinition<Supplier>[] = useMemo(
    () => [
      {
        key: "total_debts",
        label: "Borç",
        render: (row) => row.total_debts || 0,
      },
      {
        key: "pay_nakit",
        label: "Nakit",
        render: (row) => row.pay_nakit || 0,
      },
      {
        key: "pay_kredi",
        label: "Kredi Kartı",
        render: (row) => row.pay_kredi || 0,
      },
      {
        key: "pay_senet",
        label: "Senet",
        render: (row) => row.pay_senet || 0,
      },
      {
        key: "pay_banka",
        label: "Banka Havale",
        render: (row) => row.pay_banka || 0,
      },
      {
        key: "pay_diger",
        label: "Diğer",
        render: (row) => row.pay_diger || 0,
      },
      {
        key: "total_payments",
        label: "Toplam Ödeme",
        render: (row) => row.total_payments || 0,
      },
      {
        key: "remaining_debt",
        label: "Kalan",
        render: (row) => row.remaining_debt || 0,
      },
    ],
    []
  )

  return (
    <div className="container mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <ReusableTable<Supplier>
        columns={columns}
        data={tableData}
        error={error}
        tableMode="single"
      />
    </div>
  )
}

import { useMemo } from "react"
import ReusableTable, { ColumnDefinition } from "../../../ReusableTable"
import { Supplier } from "../../../../../types/suppliers/supplier/list"
import { useSupplierShow } from "../../../../hooks/suppliers/useSuppliersShow"

// 1) Props arayüzü
interface SupplierOverviewTabProps {

  supplierId: number
}

// 2) Bileşeni bu props ile tanımla
export default function SupplierOverviewTab({}: SupplierOverviewTabProps) {
  const { supplier, error } = useSupplierShow()

  const tableData: Supplier[] = useMemo(() => {
    if (!supplier) return []

    const userData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") || "{}")
      : {}
    const seasonName = userData.default_season?.name || ""

    const totalDebts = Number(supplier.totalDebts) || 0
    const payNakit = Number(supplier.paymentsByMethod?.Nakit) || 0
    const payKredi = Number(supplier.paymentsByMethod?.["Kredi Kartı"]) || 0
    const payOthers =
      Number(supplier.paymentsByMethod?.Senet || 0) +
      Number(supplier.paymentsByMethod?.["Banka Havale"] || 0) +
      Number(supplier.paymentsByMethod?.Diğer || 0)

    const totalPayments = payNakit + payKredi + payOthers
    const remainingDebt = totalDebts - totalPayments

    return [
      {
        season_name: seasonName,
        total_debts: totalDebts,
        pay_nakit: payNakit,
        pay_kredi: payKredi,
        pay_other: payOthers,
        total_payments: totalPayments,
        remaining_debt: remainingDebt,
      } as Supplier,
    ]
  }, [supplier])

  const columns: ColumnDefinition<Supplier>[] = useMemo(
    () => [
      {
        key: "season_name",
        label: "Sezon",
        render: (row) => row.season_name || "-",
      },
      {
        key: "total_debts",
        label: "Ödenecek Tutar",
        render: (row) => row.total_debts || 0,
      },
      {
        key: "pay_nakit",
        label: "Nakit Ödenen",
        render: (row) => row.pay_nakit || 0,
      },
      {
        key: "pay_kredi",
        label: "KKartı Ödenen",
        render: (row) => row.pay_kredi || 0,
      },
      {
        key: "pay_other",
        label: "Diğer Ödenen",
        render: (row) => row.pay_other || 0,
      },
      {
        key: "total_payments",
        label: "Toplam Ödenen",
        render: (row) => row.total_payments || 0,
      },
      {
        key: "remaining_debt",
        label: "Kalan Ödeme",
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

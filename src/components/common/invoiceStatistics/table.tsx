import { useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import Pageheader from "../../page-header/pageheader";
import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from "../ReusableTable";
import { useInvoiceStatistics, InvoiceStatisticsItem } from "../../hooks/invoice/useInvoiceStatistics";
import { useSeasonsList } from "../../hooks/season/useSeasonsList";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { formatCurrency } from "../../../utils/formatters";
import InvoiceStatisticsCrud from "./crud";

const MONTH_OPTIONS = [
    { value: "1", label: "Ocak" },
    { value: "2", label: "Şubat" },
    { value: "3", label: "Mart" },
    { value: "4", label: "Nisan" },
    { value: "5", label: "Mayıs" },
    { value: "6", label: "Haziran" },
    { value: "7", label: "Temmuz" },
    { value: "8", label: "Ağustos" },
    { value: "9", label: "Eylül" },
    { value: "10", label: "Ekim" },
    { value: "11", label: "Kasım" },
    { value: "12", label: "Aralık" },
];

export default function InvoiceStatisticsTable() {
    const [season, setSeason] = useState("");
    const [branch, setBranch] = useState("");
    const [month, setMonth] = useState("");
    const [detailItem, setDetailItem] = useState<InvoiceStatisticsItem | null>(null);

    const { seasonsData } = useSeasonsList({ enabled: true, page: 1, paginate: 100 });
    const { branchData } = useBranchTable({ enabled: true });

    const { data, loading, error } = useInvoiceStatistics({
        enabled: !!season && !!branch && !!month,
        season_id: season ? Number(season) : undefined,
        branch_id: branch ? Number(branch) : undefined,
        months: month ? [Number(month)] : undefined,
    });

    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: "season",
            label: "Sezon",
            type: "select",
            value: season,
            options: (seasonsData || []).map((s: any) => ({
                value: String(s.id),
                label: s.name,
            })),
            onChange: setSeason,
        },
        {
            key: "branch",
            label: "Şube",
            type: "select",
            value: branch,
            options: (branchData || []).map((b: any) => ({
                value: String(b.id),
                label: b.name,
            })),
            onChange: setBranch,
        },
        {
            key: "month",
            label: "Ay",
            type: "select",
            value: month,
            options: MONTH_OPTIONS,
            onChange: setMonth,
        },
    ], [season, branch, month, seasonsData, branchData]);

    const columns: ColumnDefinition<InvoiceStatisticsItem>[] = useMemo(() => [
        {
            key: "season_name",
            label: "Sezon",
            render: (r) => r.season_name,
        },
        {
            key: "branch_name",
            label: "Şube",
            render: (r) => r.branch_name,
        },
        {
            key: "month",
            label: "Tarih",
            render: (r) => {
                const month = MONTH_OPTIONS.find((m) => m.value === String(r.month));
                return month ? month.label : r.month;
            },
        },
        {
            key: "total_amount",
            label: "Fatura Tutarı",
            render: (r) => formatCurrency(r.total_amount),
        },
        {
            key: "actions",
            label: "İşlemler",
            render: (r) => (
                <Button
                    variant="primary-light"
                    size="sm"
                    className="btn-icon rounded-pill"
                    onClick={() => setDetailItem(r)}
                >
                    <i className="ti ti-eye" />
                </Button>
            ),
        },
    ], []);

    const total = useMemo(
        () => data.reduce((sum, d) => sum + (d.total_amount || 0), 0),
        [data]
    );

    const footer = (
        <div className="d-flex justify-content-end fw-bold me-3">
            Toplam: {formatCurrency(total)}
        </div>
    );

    return (
        <>
            <Pageheader title="Fatura Yönetimi" currentpage="Fatura İstatistiği" />
            <ReusableTable<InvoiceStatisticsItem>
                columns={columns}
                data={data}
                loading={loading}
                error={error}
                filters={filters}
                tableMode="single"
                showExportButtons={true}
                customFooter={footer}
            />
            {detailItem && (
                <InvoiceStatisticsCrud
                    show={true}
                    onHide={() => setDetailItem(null)}
                    item={detailItem}
                />
            )}
        </>
    );
}

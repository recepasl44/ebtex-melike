import { useMemo, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import ReusableTable, { ColumnDefinition, FilterDefinition } from "../ReusableTable";
import { useInvoiceStatistics } from "../../hooks/invoice/useInvoiceStatistics";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useSeasonsList } from "../../hooks/season/useSeasonsList";
import { formatCurrency, formatDate } from "../../../utils/formatters";

const monthOptions = [
    { value: 1, label: "Ocak" },
    { value: 2, label: "Şubat" },
    { value: 3, label: "Mart" },
    { value: 4, label: "Nisan" },
    { value: 5, label: "Mayıs" },
    { value: 6, label: "Haziran" },
    { value: 7, label: "Temmuz" },
    { value: 8, label: "Ağustos" },
    { value: 9, label: "Eylül" },
    { value: 10, label: "Ekim" },
    { value: 11, label: "Kasım" },
    { value: 12, label: "Aralık" },
];

import Pageheader from "../../page-header/pageheader";

export default function InvoiceStatisticsTable() {
    const [branch, setBranch] = useState("");
    const [season, setSeason] = useState("");
    const [months, setMonths] = useState<number[]>([]);

    const { branchData } = useBranchTable({ enabled: true });
    const { seasonsData } = useSeasonsList({ enabled: true });

    const { data, loading, error } = useInvoiceStatistics({
        enabled: true,
        branch_id: branch ? Number(branch) : undefined,
        season_id: season ? Number(season) : undefined,
        months: months.length ? months : undefined,
    });

    const [detailStudents, setDetailStudents] = useState<any[]>([]);
    const [showDetail, setShowDetail] = useState(false);
    const [studentInvoices, setStudentInvoices] = useState<any | null>(null);
    const [showStudent, setShowStudent] = useState(false);

    const summaryTotal = useMemo(
        () => (data || []).reduce((s, r) => s + (r.total_amount || 0), 0),
        [data]
    );

    const summaryFooter = (
        <div className="d-flex justify-content-end fw-bold me-3">
            Toplam: {formatCurrency(summaryTotal)}
        </div>
    );

    const studentTotal = useMemo(
        () => detailStudents.reduce((s, r) => s + (r.total_amount || 0), 0),
        [detailStudents]
    );

    const studentFooter = (
        <div className="d-flex justify-content-end fw-bold me-3">
            Toplam: {formatCurrency(studentTotal)}
        </div>
    );

    const filters: FilterDefinition[] = useMemo(
        () => [
            {
                key: "branch_id",
                label: "Şube",
                type: "select" as const,
                value: branch,
                options: (branchData || []).map((b) => ({ value: String(b.id), label: b.name })),
                onChange: (val: string) => setBranch(val),
            },
            {
                key: "season_id",
                label: "Sezon",
                type: "select" as const,
                value: season,
                options: (seasonsData || []).map((s) => ({ value: String(s.id), label: s.name })),
                onChange: (val: string) => setSeason(val),
            },
            {
                key: "months",
                label: "Ay",
                type: "multiselect" as const,
                value: months,
                options: monthOptions,
                onChange: (vals: number[]) => setMonths(vals),
            },
        ],
        [branch, season, months, branchData, seasonsData]
    );

    const columns: ColumnDefinition<any>[] = useMemo(
        () => [
            { key: "season_name", label: "Sezon", render: (r) => r.season_name },
            { key: "branch_name", label: "Şube", render: (r) => r.branch_name },
            { key: "month", label: "Tarih", render: (r) => r.month },
            {
                key: "total_amount",
                label: "Fatura Tutarı",
                render: (r) => formatCurrency(r.total_amount),
            },
            {
                key: "actions",
                label: "İşlemler",
                render: (row) => (
                    <button
                        className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                        onClick={() => {
                            setDetailStudents(row.students || []);
                            setShowDetail(true);
                        }}
                    >
                        <i className="ti ti-eye" />
                    </button>
                ),
            },
        ],
        []
    );

    const studentColumns: ColumnDefinition<any>[] = useMemo(
        () => [
            { key: "branch_name", label: "Şube", render: (r) => r.branch_name },
            { key: "identification_no", label: "T.C. Kimlik No", render: (r) => r.identification_no },
            { key: "full_name", label: "Adı Soyadı", render: (r) => r.full_name },
            { key: "level_name", label: "Sınıf Seviyesi", render: (r) => r.level_name },
            { key: "class_name", label: "Sınıf/Şube", render: (r) => r.class_name },
            { key: "parent_name", label: "Veli Adı Soyadı", render: (r) => r.parent_name },
            { key: "parent_relation", label: "Veli Yakınlığı", render: (r) => r.parent_relation },
            { key: "parent_phone", label: "Veli Telefon", render: (r) => r.parent_phone },
            { key: "total_amount", label: "Fatura Tutarı", render: (r) => formatCurrency(r.total_amount) },
            {
                key: "actions",
                label: "İşlemler",
                render: (row) => (
                    <button
                        className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                        onClick={() => {
                            setStudentInvoices(row);
                            setShowStudent(true);
                        }}
                    >
                        <i className="ti ti-eye" />
                    </button>
                ),
            },
        ],
        []
    );

    const renderInvoiceTable = (student: any) => {
        const services = Array.from(
            new Set((student.invoices || []).map((inv: any) => inv.service_name))
        ) as string[];
        const totals: Record<string, number> = {};
        services.forEach((s) => {
            totals[s] = 0;
        });
        (student.invoices || []).forEach((inv: any) => {
            totals[inv.service_name] = (totals[inv.service_name] || 0) +
                (inv.amount || 0);
        });
        return (
            <Table bordered size="sm" className="mt-2">
                <thead>
                    <tr>
                        <th>Tarih</th>
                        {services.map((s) => (
                            <th key={s}>{s}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {(student.invoices || []).map((inv: any, idx: number) => (
                        <tr key={idx}>
                            <td>{formatDate(inv.date)}</td>
                            {services.map((s) => (
                                <td key={s}>{s === inv.service_name ? formatCurrency(inv.amount) : ""}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Toplam</td>
                        {services.map((s) => (
                            <td key={s}>{formatCurrency(totals[s] || 0)}</td>
                        ))}
                    </tr>
                </tfoot>
            </Table>
        );
    };

    return (
        <>
            <Pageheader title="Fatura Yönetimi" currentpage="Fatura İstatistiği" />
            <ReusableTable
                columns={columns}
                data={data}
                loading={loading}
                error={error}
                filters={filters}
                tableMode="single"
                showExportButtons
                customFooter={summaryFooter}
            />

            <ReusableTable
                columns={studentColumns}
                data={detailStudents}
                tableMode="single"
                showExportButtons
                showModal={showDetail}
                modalTitle="Fatura Detayı"
                onCloseModal={() => setShowDetail(false)}
                customFooter={studentFooter}
            />

            <Modal
                show={showStudent}
                onHide={() => setShowStudent(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{studentInvoices?.full_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {studentInvoices && renderInvoiceTable(studentInvoices)}
                </Modal.Body>
            </Modal>
        </>
    );
}

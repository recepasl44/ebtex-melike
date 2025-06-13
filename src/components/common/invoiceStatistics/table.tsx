import { useMemo, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ReusableTable, { ColumnDefinition, FilterDefinition } from "../ReusableTable";
import { useInvoiceStatistics } from "../../hooks/invoice/useInvoiceStatistics";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useSeasonsList } from "../../hooks/season/useSeasonsList";
import { formatCurrency, formatDate } from "../../../utils/formatters";

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
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                            setDetailStudents(row.students || []);
                            setShowDetail(true);
                        }}
                    >
                        Detay
                    </Button>
                ),
            },
        ],
        []
    );

    const studentColumns = [
        "Şube",
        "T.C. Kimlik No",
        "Adı Soyadı",
        "Sınıf Seviyesi",
        "Sınıf/Şube",
        "Veli Adı Soyadı",
        "Veli Yakınlığı",
        "Veli Telefon",
        "Fatura Tutarı",
        "İşlemler",
    ];

    const renderStudentRows = () =>
        detailStudents.map((st, idx) => (
            <tr key={idx}>
                <td>{st.branch_name}</td>
                <td>{st.identification_no}</td>
                <td>{st.full_name}</td>
                <td>{st.level_name}</td>
                <td>{st.class_name}</td>
                <td>{st.parent_name}</td>
                <td>{st.parent_relation}</td>
                <td>{st.parent_phone}</td>
                <td>{formatCurrency(st.total_amount)}</td>
                <td>
                    <Button
                        size="sm"
                        variant="info"
                        onClick={() => {
                            setStudentInvoices(st);
                            setShowStudent(true);
                        }}
                    >
                        Detay
                    </Button>
                </td>
            </tr>
        ));

    const renderInvoiceTable = (student: any) => {
        const services = Array.from(
            new Set((student.invoices || []).map((inv: any) => inv.service_name))
        ) as string[];
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
            />

            <Modal show={showDetail} onHide={() => setShowDetail(false)} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Fatura Detayı</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered size="sm">
                        <thead>
                            <tr>
                                {studentColumns.map((c) => (
                                    <th key={c}>{c}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>{renderStudentRows()}</tbody>
                    </Table>
                </Modal.Body>
            </Modal>

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

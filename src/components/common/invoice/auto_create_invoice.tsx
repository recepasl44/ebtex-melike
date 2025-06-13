import { useEffect, useState, useCallback } from "react";
import {
    Modal,
    Row,
    Col,
    Form,
    Table,
    Button,
    Spinner,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useShowStudent } from "../../hooks/student/useShowStudent";
import { useNextSerial } from "../../hooks/invoice/useNextSerial";
import { useInvoiceAdd } from "../../hooks/invoice/useAdd";

interface BatchItem {
    enrollment_id: number;
    service_name: string;
    final_fee: string;
    vat_rate: number;
    selected: boolean;
}

export default function AutoCreateInvoiceModal({
    show,
    onHide,
}: {
    show: boolean;
    onHide: () => void;
}) {
    const { studentId } = useParams<{ studentId: string }>();
    const idNum = Number(studentId);
    const navigate = useNavigate();

    // load student + their enrollments
    const { student, status,  fetchStudent } = useShowStudent();

    // next-serial hook
    const { getNextSerial, serial, isLoading: serialLoading } = useNextSerial();

    // batch-invoice hook
    const { createInvoice, status: batchStatus } = useInvoiceAdd();

    // UI state
    const [items, setItems] = useState<BatchItem[]>([]);
    const [issueDate, setIssueDate] = useState(() =>
        new Date().toISOString().slice(0, 10)
    );
    const [useCustomCount, setUseCustomCount] = useState(false);
    const [invoiceCount, setInvoiceCount] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // fetch student & prefetch serial
    useEffect(() => {
        if (show && idNum) {
            fetchStudent(idNum);
            getNextSerial();
            setInvoiceCount(1);
            setUseCustomCount(false);
        }
    }, [show, idNum, fetchStudent, getNextSerial]);

    // build items list once student arrives
    useEffect(() => {
        if (student?.enrollments) {
            const list: BatchItem[] = student.enrollments.map((enr) => ({
                enrollment_id: enr.id,
                service_name: enr.service.name,
                final_fee: enr.final_fee,
                vat_rate: Number(enr.service.vat_rate),
                selected: false,
            }));
            setItems(list);
        }
    }, [student]);

    const toggleItem = useCallback((id: number, checked: boolean) => {
        setItems((prev) =>
            prev.map((it) =>
                it.enrollment_id === id ? { ...it, selected: checked } : it
            )
        );
    }, []);

    const handleSubmit = async () => {
        if (!idNum) return;
        const selectedIds = items.filter((i) => i.selected).map((i) => i.enrollment_id);
        if (selectedIds.length === 0) return;
        setIsSubmitting(true);
        try {
            await createInvoice({
                student_id: idNum,
                enrollments_id: selectedIds,
                invoice_count_status: useCustomCount,
                invoice_count: invoiceCount,
                issue_date: issueDate,
                invoice_type_code: "Batch Invoice",
                document_currency_code: "TRY",
                details: items
                    .filter((i) => i.selected)
                    .map((i) => ({
                        item_name: i.service_name,
                        unit_price: 0,
                        quantity: 1,
                        line_extension_amount: 0,
                        vat_rate: i.vat_rate,
                    })),
                invoice_number: "",
                serial: "",
                payable_amount: 0
            }).unwrap();
            onHide();
            navigate(-1);
        } catch (e) {
            console.error(e);
            // TODO: toast.error("Batch invoice failed")
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                onHide();
                navigate(-1);
            }}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Otomatik Fatura Kes – {student?.first_name} {student?.last_name}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {status === "LOADING" ? (
                    <div>Yükleniyor…</div>
                ) : (
                    <>
                        <Row className="mb-3 g-3">
                            <Col md={3}>
                                <Form.Label>Fatura Tarihi</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={issueDate}
                                    onChange={(e) => setIssueDate(e.target.value)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label>Fatura Kesme Seçeneği</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        label="Taksit sayısı kadar"
                                        type="radio"
                                        name="batchMode"
                                        checked={!useCustomCount}
                                        onChange={() => setUseCustomCount(false)}
                                    />
                                    <Form.Check
                                        inline
                                        label="Girilen fatura sayısı kadar"
                                        type="radio"
                                        name="batchMode"
                                        checked={useCustomCount}
                                        onChange={() => setUseCustomCount(true)}
                                    />
                                </div>
                            </Col>
                            <Col md={2}>
                                <Form.Label>Fatura Sayısı</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    disabled={!useCustomCount}
                                    value={invoiceCount}
                                    onChange={(e) => setInvoiceCount(Number(e.target.value))}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Label>Fatura Seri No</Form.Label>
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={serialLoading ? "..." : serial || ""}
                                />
                            </Col>
                        </Row>

                        <Table striped hover size="sm">
                            <thead>
                                <tr>
                                    <th>Seç</th>
                                    <th>Hizmet Adı</th>
                                    <th>KDV Oranı</th>
                                    <th>Tutar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((it) => (
                                    <tr key={it.enrollment_id}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                checked={it.selected}
                                                onChange={(e) =>
                                                    toggleItem(it.enrollment_id, e.target.checked)
                                                }
                                            />
                                        </td>
                                        <td>{it.service_name}</td>
                                        <td>{it.vat_rate}%</td>
                                        <td>{it.final_fee}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </Modal.Body>

            <Modal.Footer className="justify-content-end">
                <Button
                    variant="outline-secondary"
                    onClick={() => {
                        onHide();
                        navigate(-1);
                    }}
                >
                    Kapat
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting || batchStatus === "LOADING"}
                >
                    {isSubmitting || batchStatus === "LOADING" ? (
                        <>
                            <Spinner
                                animation="border"
                                size="sm"
                                className="me-2"
                            />
                            Oluşturuluyor…
                        </>
                    ) : (
                        "Fatura Oluştur"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

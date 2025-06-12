import { useEffect, useState, useCallback } from "react";
import {
    Modal,
    Accordion,
    Table,
    Form,
    Button,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useShowStudent } from "../../hooks/student/useShowStudent";
import { useNextSerial } from "../../hooks/invoice/useNextSerial";
import { useInvoiceAdd } from "../../hooks/invoice/useAdd";

interface ManualRow {
    enrollment_id: number;
    installment_id: number;
    vat_rate: number;
    item_name: string;
    payable_amount: number;
}

export default function InvoiceDetailModal({
    show,
    onHide,
}: {
    show: boolean;
    onHide: () => void;
}) {
    const { studentId } = useParams<{ studentId: string }>();
    const idNum = Number(studentId);
    const navigate = useNavigate();

    const { student, status, error, fetchStudent } = useShowStudent();
    const { getNextSerial } = useNextSerial();
    const { createInvoice } = useInvoiceAdd();

    const [selectedRows, setSelectedRows] = useState<ManualRow[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (show && idNum) {
            fetchStudent(idNum);
            setSelectedRows([]);
        }
    }, [show, idNum, fetchStudent]);

    const toggleRow = useCallback(
        (
            enrId: number,
            insId: number,
            vat: number,
            name: string,
            amount: string,
            checked: boolean
        ) => {
            const payable = parseFloat(amount) || 0;
            setSelectedRows((prev) =>
                checked
                    ? [
                        ...prev,
                        { enrollment_id: enrId, installment_id: insId, vat_rate: vat, item_name: name, payable_amount: payable },
                    ]
                    : prev.filter(
                        (r) =>
                            !(r.enrollment_id === enrId && r.installment_id === insId)
                    )
            );
        },
        []
    );

    const updateRow = useCallback(
        (
            enrollmentId: number,
            installmentId: number,
            field: "vat_rate" | "item_name",
            value: string
        ) => {
            setSelectedRows((prev) =>
                prev.map((r) =>
                    r.enrollment_id === enrollmentId && r.installment_id === installmentId
                        ? {
                            ...r,
                            [field]:
                                field === "vat_rate"
                                    ? parseFloat(value) || 0
                                    : value,
                        }
                        : r
                )
            );
        },
        []
    );

    const handleCreateInvoices = async () => {
        if (!idNum || selectedRows.length === 0) return;
        setIsSubmitting(true);
        try {
            for (const row of selectedRows) {
                // 1) get next-serial
                const nextAction = await getNextSerial().unwrap();
                const serialNo = nextAction.serial_no;
                // 2) create invoice
                await createInvoice({
                    student_id: idNum,
                    invoice_number: serialNo,
                    serial: "FTR",
                    issue_date: new Date().toISOString().slice(0, 10),
                    invoice_type_code: "Student Invoice",
                    document_currency_code: "TRY",
                    enrollment_id: row.enrollment_id,
                    installment_id: row.installment_id,
                    payable_amount: row.payable_amount,
                    details: [
                        {
                            item_name: row.item_name,
                            unit_price: row.payable_amount,
                            quantity: 1,
                            line_extension_amount: row.payable_amount,
                            vat_rate: row.vat_rate,
                        },
                    ],
                    enrollments_id: undefined,
                    invoice_count_status: false,
                    invoice_count: undefined
                }).unwrap();
            }
            onHide();
            navigate(-1);
        } catch (e) {
            console.error(e);
            // TODO: toast.error(...)
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
                    {student?.first_name} {student?.last_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {status === "LOADING" ? (
                    <div>Yükleniyor…</div>
                ) : student?.enrollments?.length ? (
                    <Accordion>
                        {student.enrollments.map((enr) => (
                            <Accordion.Item key={enr.id} eventKey={String(enr.id)}>
                                <Accordion.Header>
                                    {enr.service.name} (KDV: {enr.service.vat_rate}%)
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Table striped hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Seç</th>
                                                <th>Vade Tarihi</th>
                                                <th>KDV</th>
                                                <th>Taksit Tutarı</th>
                                                <th>Kalem Adı</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enr.installments.map((ins) => {
                                                const sel = selectedRows.find(
                                                    (r) =>
                                                        r.enrollment_id === enr.id &&
                                                        r.installment_id === ins.id
                                                );
                                                const checked = Boolean(sel);
                                                return (
                                                    <tr key={ins.id}>
                                                        <td>
                                                            <Form.Check
                                                                type="checkbox"
                                                                checked={checked}
                                                                onChange={(e) =>
                                                                    toggleRow(
                                                                        enr.id,
                                                                        ins.id,
                                                                        Number(enr.service.vat_rate),
                                                                        enr.service.name,
                                                                        ins.amount,
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td>{ins.due_date.split(" ")[0]}</td>
                                                        <td>
                                                            {checked ? (
                                                                <Form.Control
                                                                    size="sm"
                                                                    type="number"
                                                                    value={sel!.vat_rate}
                                                                    onChange={(e) =>
                                                                        updateRow(
                                                                            enr.id,
                                                                            ins.id,
                                                                            "vat_rate",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    style={{ width: 80 }}
                                                                />
                                                            ) : (
                                                                enr.service.vat_rate
                                                            )}
                                                        </td>
                                                        <td>{ins.amount}</td>
                                                        <td>
                                                            {checked ? (
                                                                <Form.Control
                                                                    size="sm"
                                                                    type="text"
                                                                    value={sel!.item_name}
                                                                    onChange={(e) =>
                                                                        updateRow(
                                                                            enr.id,
                                                                            ins.id,
                                                                            "item_name",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            ) : (
                                                                "-"
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                ) : (
                    <div>{error || "Kayıt bulunamadı."}</div>
                )}
            </Modal.Body>
            <Modal.Footer className="justify-content-start">
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
                    onClick={handleCreateInvoices}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Oluşturuluyor…" : "Fatura Oluştur"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

import { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { IncomingCheck } from "./table";


interface FormValues extends FormikValues {
    paymentTarget: "student" | "customer";
    branch: string;
    student: string;
    creditor: string;
    type: string;
    date: string;
    bank: string;
    documentNo: string;
    amountDue: number | string;
    amountPaid: number | string;
    remaining: number | string;
    status: string;
    swapCheckType: string;
    swapBuyer: string;
    description: string;
    image: string;
}

interface PaymentRecord {
    id: number;
    date: string;
    amount: number;
    payer: string;
    receiptNo: string;
    user: string;
    description: string;
}

interface Buyer {
    id: number;
    name: string;
    phone: string;
}

export function IncomingCheckFormModal({
    show,
    onClose,
    onSubmit,
    initialValues,
}: {
    show: boolean;
    onClose: () => void;
    onSubmit: (val: IncomingCheck) => void;
    initialValues?: IncomingCheck;
}) {
    const [buyers, setBuyers] = useState<Buyer[]>([
        { id: 1, name: "Tedarikçi 1", phone: "" },
    ]);
    const [showBuyerModal, setShowBuyerModal] = useState(false);

    const defaults: FormValues = {
        paymentTarget: "student",
        branch: "",
        student: "",
        creditor: "",
        type: "Çek",
        date: new Date().toISOString().split("T")[0],
        bank: "",
        documentNo: "",
        amountDue: "",
        amountPaid: "",
        remaining: "",
        status: "",
        swapCheckType: "",
        swapBuyer: "",
        description: "",
        image: "",
        ...(initialValues || {}),
    } as any;

    const getFields = (values: FormValues): FieldDefinition[] => {
        const fields: FieldDefinition[] = [
            {
                name: "paymentTarget",
                label: "Ödeme Tipi",
                renderForm: (formik) => (
                    <div className="d-flex gap-3">
                        <label>
                            <input
                                type="radio"
                                checked={formik.values.paymentTarget === "student"}
                                onChange={() => formik.setFieldValue("paymentTarget", "student")}
                            />{" "}
                            Öğrenci Ödeme
                        </label>
                        <label>
                            <input
                                type="radio"
                                checked={formik.values.paymentTarget === "customer"}
                                onChange={() => formik.setFieldValue("paymentTarget", "customer")}
                            />{" "}
                            Müşteri
                        </label>
                    </div>
                ),
            },
            { name: "branch", label: "Şube", type: "text", required: true },
        ];
        if (values.paymentTarget === "student") {
            fields.push({ name: "student", label: "Öğrenci", type: "text", required: true });
        }
        fields.push(
            { name: "creditor", label: "Verecekli", type: "text", required: true },
            { name: "type", label: "Türü", type: "select", options: [{ value: "Çek", label: "Çek" }, { value: "Senet", label: "Senet" }], required: true },
            { name: "date", label: "Tarih", type: "date", required: true },
            { name: "bank", label: "Alıcı Banka", type: "text" },
            { name: "documentNo", label: "Belge No", type: "text" },
            { name: "amountDue", label: "Ödenecek Tutar", type: "currency", required: true },
            { name: "amountPaid", label: "Ödenen Tutar", type: "currency" },
            { name: "remaining", label: "Kalan Tutar", type: "currency" },
            {
                name: "status",
                label: "Durum",
                type: "select",
                options: [
                    { value: "paid", label: "Ödendi" },
                    { value: "not_paid", label: "Ödenmedi" },
                    { value: "pending", label: "Beklemede" },
                    { value: "cashed", label: "Bozduruldu" },
                    { value: "swapped", label: "Swap Edildi" },
                ],
            }
        );
        if (values.status === "swapped") {
            fields.push(
                { name: "swapCheckType", label: "Çek Türü", type: "text" },
                {
                    name: "swapBuyer",
                    label: "Alıcı",
                    renderForm: (formik) => (
                        <div className="d-flex" style={{ gap: 8 }}>
                            <select
                                className="form-select"
                                value={formik.values.swapBuyer || ""}
                                onChange={(e) => formik.setFieldValue("swapBuyer", e.target.value)}
                            >
                                <option value="">Seçiniz</option>
                                {buyers.map((b) => (
                                    <option key={b.id} value={b.name}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                            <Button
                                variant="outline-secondary"
                                onClick={() => setShowBuyerModal(true)}
                            >
                                <i className="bi bi-plus" />
                            </Button>
                        </div>
                    ),
                },
            );
        }
        fields.push({ name: "description", label: "Açıklama", type: "textarea" });
        fields.push({ name: "image", label: "Görüntü", type: "file" });
        return fields;
    };

    const handleSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
        const val: IncomingCheck = {
            id: initialValues?.id || Date.now(),
            company: values.paymentTarget === "student" ? values.student : values.branch,
            creditor: values.creditor,
            type: values.type,
            date: values.date,
            bank: values.bank,
            amountDue: Number(values.amountDue) || 0,
            amountPaid: Number(values.amountPaid) || 0,
            remaining: Number(values.remaining) || 0,
            description: values.description,
            status: values.status,
        };
        onSubmit(val);
        helpers.setSubmitting(false);
    };

    return (
        <>
            <ReusableModalForm<FormValues>
                show={show}
                title={initialValues ? "Düzenle" : "Ekle"}
                fields={getFields}
                initialValues={defaults}
                onSubmit={handleSubmit}
                onClose={onClose}
                confirmButtonLabel="Kaydet"
            />
            {showBuyerModal && (
                <BuyerFormModal
                    show={showBuyerModal}
                    onClose={() => setShowBuyerModal(false)}
                    onAdd={(b) => setBuyers((prev) => [...prev, b])}
                />
            )}
        </>
    );
}

export function IncomingCheckDetailModal({ show, onClose, check }: { show: boolean; onClose: () => void; check: IncomingCheck; }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Detay</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered size="sm">
                    <tbody>
                        <tr><th>Firma</th><td>{check.company}</td></tr>
                        <tr><th>Verecekli</th><td>{check.creditor}</td></tr>
                        <tr><th>Türü</th><td>{check.type}</td></tr>
                        <tr><th>Tarih</th><td>{check.date}</td></tr>
                        <tr><th>Alıcı Banka</th><td>{check.bank}</td></tr>
                        <tr><th>Ödenecek</th><td>{check.amountDue}</td></tr>
                        <tr><th>Ödenen</th><td>{check.amountPaid}</td></tr>
                        <tr><th>Kalan</th><td>{check.remaining}</td></tr>
                        <tr><th>Açıklama</th><td>{check.description}</td></tr>
                        <tr><th>Durum</th><td>{check.status}</td></tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Kapat</Button>
            </Modal.Footer>
        </Modal>
    );
}

export function IncomingCheckCashModal({ show, onClose }: { show: boolean; onClose: () => void }) {
    const [mode, setMode] = useState<"cash" | "bank">("cash");
    const fields: FieldDefinition[] = mode === "cash" ? [
        { name: "amount", label: "Tutar", type: "currency", required: true },
        { name: "expense", label: "Gider", type: "currency" },
        { name: "transactionNo", label: "İşlem No", type: "text" },
        { name: "safe", label: "Kasa", type: "text" },
        { name: "date", label: "Tarih", type: "date" },
        { name: "description", label: "Açıklama", type: "textarea" },
    ] : [
        { name: "amount", label: "Tutar", type: "currency", required: true },
        { name: "expense", label: "Gider", type: "currency" },
        { name: "transactionNo", label: "İşlem No", type: "text" },
        { name: "bankAccount", label: "Banka Hesabı", type: "text" },
        { name: "date", label: "Tarih", type: "date" },
        { name: "description", label: "Açıklama", type: "textarea" },
    ];

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Bozdur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label className="me-3">
                        <input type="radio" checked={mode === "cash"} onChange={() => setMode("cash")} /> Nakit
                    </label>
                    <label>
                        <input type="radio" checked={mode === "bank"} onChange={() => setMode("bank")} /> Banka Hesabına
                    </label>
                </div>
                <ReusableModalForm<FormikValues>
                    show={true}
                    title=""
                    fields={fields}
                    initialValues={{}}
                    onSubmit={() => { }}
                    onClose={onClose}
                    confirmButtonLabel="Kaydet"
                    hideButtons
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Kapat</Button>
                <Button variant="primary" onClick={onClose}>Kaydet</Button>
            </Modal.Footer>
        </Modal>
    );
}

export function IncomingCheckPaymentModal({ show, onClose }: { show: boolean; onClose: () => void }) {
    const [payments, setPayments] = useState<PaymentRecord[]>([]);
    const [selected, setSelected] = useState<PaymentRecord | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const columns: ColumnDefinition<PaymentRecord>[] = [
        { key: "date", label: "Tarih" },
        { key: "amount", label: "Ödenen Tutar", render: (r) => r.amount.toLocaleString() },
        { key: "payer", label: "Ödeme Yapan" },
        { key: "receiptNo", label: "Makbuz No" },
        { key: "user", label: "Kullanıcı" },
        { key: "description", label: "Açıklama" },
        {
            key: "actions",
            label: "İşlemler",
            render: (row) => (
                <>
                    <Button size="sm" variant="info" onClick={() => { setSelected(row); setShowForm(true); }}>
                        Düzenle
                    </Button>{" "}
                    <Button size="sm" variant="danger" onClick={() => { setSelected(row); setShowDelete(true); }}>
                        Sil
                    </Button>
                </>
            ),
        },
    ];

    const handleSubmit = (vals: PaymentRecord) => {
        if (selected) {
            setPayments((p) => p.map((i) => (i.id === selected.id ? { ...vals, id: selected.id } : i)));
        } else {
            setPayments((p) => [...p, { ...vals, id: Date.now() }]);
        }
        setShowForm(false);
        setSelected(null);
    };

    const handleDelete = () => {
        if (selected) {
            setPayments((p) => p.filter((i) => i.id !== selected.id));
        }
        setShowDelete(false);
        setSelected(null);
    };

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Ödeme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReusableTable<PaymentRecord>
                    columns={columns}
                    data={payments}
                    onAdd={() => { setSelected(null); setShowForm(true); }}
                    addButtonText="Ekle"
                    tableMode="single"
                    showExportButtons={false}
                />
                {showForm && (
                    <PaymentFormModal
                        show={showForm}
                        onClose={() => { setShowForm(false); setSelected(null); }}
                        onSubmit={handleSubmit}
                        initialValues={selected || undefined}
                    />
                )}
                {showDelete && (
                    <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Sil</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Silmek istediğinize emin misiniz?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDelete(false)}>
                                Vazgeç
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Sil
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </Modal.Body>
        </Modal>
    );
}

interface PaymentFormValues extends FormikValues {
    date: string;
    amount: number | string;
    payer: string;
    receiptNo: string;
    user: string;
    description: string;
}

function PaymentFormModal({
    show,
    onClose,
    onSubmit,
    initialValues,
}: {
    show: boolean;
    onClose: () => void;
    onSubmit: (val: PaymentRecord) => void;
    initialValues?: PaymentRecord;
}) {
    const defaults: PaymentFormValues = {
        date: new Date().toISOString().split("T")[0],
        amount: "",
        payer: "",
        receiptNo: "",
        user: "",
        description: "",
        ...(initialValues || {}),
    } as any;

    const fields: FieldDefinition[] = [
        { name: "date", label: "Tarih", type: "date", required: true },
        { name: "amount", label: "Ödenen Tutar", type: "currency", required: true },
        { name: "payer", label: "Ödeme Yapan", type: "text" },
        { name: "receiptNo", label: "Makbuz No", type: "text" },
        { name: "user", label: "Kullanıcı", type: "text" },
        { name: "description", label: "Açıklama", type: "textarea" },
    ];

    const handleSubmit = (vals: PaymentFormValues, helpers: FormikHelpers<PaymentFormValues>) => {
        const val: PaymentRecord = {
            id: initialValues?.id || Date.now(),
            date: vals.date,
            amount: Number(vals.amount) || 0,
            payer: vals.payer,
            receiptNo: vals.receiptNo,
            user: vals.user,
            description: vals.description,
        };
        onSubmit(val);
        helpers.setSubmitting(false);
    };

    return (
        <ReusableModalForm<PaymentFormValues>
            show={show}
            title="Ödeme"
            fields={fields}
            initialValues={defaults}
            onSubmit={handleSubmit}
            onClose={onClose}
            confirmButtonLabel="Kaydet"
        />
    );
}

interface BuyerFormValues extends FormikValues {
    name: string;
    phone: string;
}

function BuyerFormModal({
    show,
    onClose,
    onAdd,
}: {
    show: boolean;
    onClose: () => void;
    onAdd: (b: Buyer) => void;
}) {
    const fields: FieldDefinition[] = [
        { name: "name", label: "Ad Soyad", type: "text", required: true },
        { name: "phone", label: "Telefon", type: "text" },
    ];

    const handleSubmit = (vals: BuyerFormValues) => {
        onAdd({ id: Date.now(), name: vals.name, phone: vals.phone });
        onClose();
    };

    return (


        <ReusableModalForm<BuyerFormValues>

            show={show}
            title="Yeni Alıcı"
            fields={fields}
            initialValues={{ name: "", phone: "" }}
            onSubmit={handleSubmit}
            onClose={onClose}
            confirmButtonLabel="Kaydet"
        />
    );
}

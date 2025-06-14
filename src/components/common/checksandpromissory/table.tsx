import { useMemo, useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ReusableTable, { ColumnDefinition, FilterDefinition } from "../ReusableTable";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import axiosInstance from "../../../services/axiosClient";
import type { Instrument } from "../../../types/instruments/list";

interface OutgoingCheck {
    id: number;
    type: "Şirket Çeki" | "Ciro Edilen";
    owner: string;
    company: string;
    creditor: string; // verecekli
    debtor: string; // alacaklı
    debtorPhone: string;
    instrumentType: "Çek" | "Senet"; // türü
    documentNo: string; // belge no
    date: string;
    bank: string;
    amountDue: number;
    amountPaid: number;
    remaining: number;
    description: string;
    status: "Ödendi" | "Ödenmedi" | "Beklemede";
    image?: string;
}

const dummyData: OutgoingCheck[] = [
    {
        id: 1,
        type: "Şirket Çeki",
        owner: "Ahmet Yılmaz",
        company: "ABC Ltd",
        creditor: "Veli Kaya",
        debtor: "Ali Demir",
        debtorPhone: "05551112233",
        instrumentType: "Çek",
        documentNo: "CHK123",
        date: "2024-01-01",
        bank: "Ziraat",
        amountDue: 1000,
        amountPaid: 200,
        remaining: 800,
        description: "",
        status: "Beklemede",
        image: "",
    },
];

interface PaymentRecord {
    id: number;
    date: string;
    amount: number;
    payer: string;
    receiptNo: string;
    user: string;
    description: string;
}

export default function ChecksAndPromissoryTable() {
    const [data, setData] = useState<OutgoingCheck[]>(dummyData);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<OutgoingCheck | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [filterType, setFilterType] = useState("");
    const [filterOwner, setFilterOwner] = useState("");
    const [filterCompany, setFilterCompany] = useState("");
    const [filterBuyer, setFilterBuyer] = useState("");

    const fetchData = () => {
        setLoading(true);
        const params: any = { paginate: 999 };
        if (filterType) params.document_type = filterType === 'Şirket Çeki' ? 1 : 2;
        if (filterOwner) params.owner_name = filterOwner;
        if (filterCompany) params.document_owner_name = filterCompany;
        if (filterBuyer) params.debtor = filterBuyer;
        axiosInstance
            .get('/instruments', { params })
            .then((resp) => {
                const instruments: Instrument[] = resp.data?.data || [];
                const mapped = instruments.map((i) => ({
                    id: i.id,
                    type: (i.document_type === 1 ? 'Şirket Çeki' : 'Ciro Edilen') as 'Şirket Çeki' | 'Ciro Edilen',
                    owner: i.owner_name,
                    company: i.document_owner_name,
                    creditor: '',
                    debtor: '',
                    debtorPhone: '',
                    instrumentType: (i.document_type === 1 ? 'Çek' : 'Senet') as 'Çek' | 'Senet',
                    documentNo: i.check_no || i.instrument_no,
                    date: i.due_date,
                    bank: i.bank,
                    amountDue: Number(i.amount) || 0,
                    amountPaid: 0,
                    remaining: 0,
                    description: '',
                    status: (i.status as any) || 'Beklemede',
                    image: i.image_path || '',
                }));
                setData(mapped);
            })
            .catch(() => {
                // ignore errors
            })
            .finally(() => setLoading(false));
    };

    const typeOptions = useMemo(
        () => Array.from(new Set(data.map((d) => d.type))).map((v) => ({ value: v, label: v })),
        [data]
    );
    const ownerOptions = useMemo(
        () => Array.from(new Set(data.map((d) => d.owner))).map((v) => ({ value: v, label: v })),
        [data]
    );
    const companyOptions = useMemo(
        () => Array.from(new Set(data.map((d) => d.company))).map((v) => ({ value: v, label: v })),
        [data]
    );
    const buyerOptions = useMemo(
        () => Array.from(new Set(data.map((d) => d.debtor))).map((v) => ({ value: v, label: v })),
        [data]
    );

    useEffect(() => {
        fetchData();
    }, [filterType, filterOwner, filterCompany, filterBuyer]);

    const filteredData = useMemo(() => {
        return data.filter(
            (row) =>
                (!filterType || row.type === filterType) &&
                (!filterOwner || row.owner === filterOwner) &&
                (!filterCompany || row.company === filterCompany) &&
                (!filterBuyer || row.debtor === filterBuyer)
        );
    }, [data, filterType, filterOwner, filterCompany, filterBuyer]);

    const columns: ColumnDefinition<OutgoingCheck>[] = useMemo(
        () => [
            { key: "type", label: "Çek Türü" },
            { key: "owner", label: "Çek Sahibi" },
            { key: "company", label: "Firma" },
            { key: "creditor", label: "Verecekli" },
            { key: "debtor", label: "Alacaklı" },
            { key: "debtorPhone", label: "Alacaklı Tel" },
            { key: "date", label: "Tarih" },
            { key: "bank", label: "Alıcı Banka" },
            { key: "amountDue", label: "Ödenecek", render: (r) => r.amountDue.toLocaleString() },
            { key: "amountPaid", label: "Ödenen", render: (r) => r.amountPaid.toLocaleString() },
            { key: "remaining", label: "Kalan", render: (r) => r.remaining.toLocaleString() },
            { key: "description", label: "Açıklama" },
            { key: "status", label: "Durum" },
            {
                key: "actions",
                label: "İşlemler",
                render: (row) => (
                    <div style={{ display: "flex", flexWrap: "nowrap", gap: "0.25rem" }}>
                        <button
                            onClick={() => {
                                setSelected(row);
                                setShowDetail(true);
                            }}
                            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                            title="Detay"
                        >
                            <i className="ti ti-eye" />
                        </button>
                        <button
                            onClick={() => {
                                setSelected(row);
                                setShowPayment(true);
                            }}
                            className="btn btn-icon btn-sm btn-warning-light rounded-pill"
                            title="Ödeme"
                        >
                            <i className="ti ti-cash" />
                        </button>
                        <button
                            onClick={() => {
                                setSelected(row);
                                setShowForm(true);
                            }}
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                            title="Düzenle"
                        >
                            <i className="ti ti-pencil" />
                        </button>
                        <button
                            onClick={() => {
                                setSelected(row);
                                setShowDelete(true);
                            }}
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                            title="Sil"
                        >
                            <i className="ti ti-trash" />
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const filters: FilterDefinition[] = [
        { key: "type", label: "Çek Türü", type: "select", value: filterType, onChange: setFilterType, options: typeOptions },
        { key: "owner", label: "Çek Sahibi", type: "select", value: filterOwner, onChange: setFilterOwner, options: ownerOptions },
        { key: "company", label: "Firma", type: "select", value: filterCompany, onChange: setFilterCompany, options: companyOptions },
        { key: "buyer", label: "Alıcı", type: "select", value: filterBuyer, onChange: setFilterBuyer, options: buyerOptions },
    ];

    const handleSubmit = (vals: OutgoingCheck) => {
        if (selected) {
            setData((d) => d.map((i) => (i.id === selected.id ? vals : i)));
        } else {
            setData((d) => [...d, { ...vals, id: Date.now() }]);
        }
        setShowForm(false);
        setSelected(null);
    };

    const handleDelete = () => {
        if (selected) {
            setData((d) => d.filter((i) => i.id !== selected.id));
        }
        setShowDelete(false);
        setSelected(null);
    };

    return (
        <>
            <ReusableTable<OutgoingCheck>
                columns={columns}
                data={filteredData}
                loading={loading}
                filters={filters}
                onAdd={() => {
                    setSelected(null);
                    setShowForm(true);
                }}
                addButtonText="Ekle"
                tableMode="single"
            />

            {showForm && (
                <CheckFormModal
                    show={showForm}
                    onClose={() => {
                        setShowForm(false);
                        setSelected(null);
                    }}
                    onSubmit={handleSubmit}
                    initialValues={selected || undefined}
                />
            )}

            {showDetail && selected && (
                <CheckDetailModal
                    show={showDetail}
                    check={selected}
                    onClose={() => setShowDetail(false)}
                />
            )}

            {showPayment && (
                <CheckPaymentModal show={showPayment} onClose={() => setShowPayment(false)} />
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
        </>
    );
}

interface FormValues {
    type: "Şirket Çeki" | "Ciro Edilen";
    owner: string;
    company: string;
    creditor: string;
    debtor: string;
    debtorPhone: string;
    instrumentType: "Çek" | "Senet";
    documentNo: string;
    date: string;
    bank: string;
    amountDue: number | string;
    amountPaid: number | string;
    remaining: number | string;
    description: string;
    status: "Ödendi" | "Ödenmedi" | "Beklemede";
    image?: string;
}

function CheckFormModal({
    show,
    onClose,
    onSubmit,
    initialValues,
}: {
    show: boolean;
    onClose: () => void;
    onSubmit: (val: OutgoingCheck) => void;
    initialValues?: OutgoingCheck;
}) {
    const defaults: FormValues = {
        type: "Şirket Çeki",
        owner: "",
        company: "",
        creditor: "",
        debtor: "",
        debtorPhone: "",
        instrumentType: "Çek",
        documentNo: "",
        date: new Date().toISOString().split("T")[0],
        bank: "",
        amountDue: "",
        amountPaid: "",
        remaining: "",
        description: "",
        status: "Beklemede",
        image: "",
        ...(initialValues || {}),
    } as any;

    const fields: FieldDefinition[] = [
        {
            name: "type",
            label: "Çek Türü",
            type: "select",
            options: [
                { value: "Şirket Çeki", label: "Şirket Çeki" },
                { value: "Ciro Edilen", label: "Ciro Edilen" },
            ],
            required: true,
        },
        { name: "owner", label: "Çek Sahibi", type: "text", required: true },
        { name: "company", label: "Firma", type: "text" },
        { name: "creditor", label: "Verecekli", type: "text" },
        { name: "debtor", label: "Alacaklı", type: "text" },
        { name: "debtorPhone", label: "Alacaklı Tel", type: "text" },
        {
            name: "instrumentType",
            label: "Türü",
            type: "select",
            options: [
                { value: "Çek", label: "Çek" },
                { value: "Senet", label: "Senet" },
            ],
            required: true,
        },
        { name: "documentNo", label: "Belge No", type: "text" },
        { name: "date", label: "Tarih", type: "date", required: true },
        { name: "bank", label: "Alıcı Banka", type: "text" },
        { name: "amountDue", label: "Ödenecek", type: "currency", required: true },
        { name: "amountPaid", label: "Ödenen", type: "currency" },
        { name: "remaining", label: "Kalan", type: "currency" },
        { name: "description", label: "Açıklama", type: "textarea" },
        { name: "image", label: "Görüntü", type: "file" },
        {
            name: "status",
            label: "Durum",
            type: "select",
            options: [
                { value: "Ödendi", label: "Ödendi" },
                { value: "Ödenmedi", label: "Ödenmedi" },
                { value: "Beklemede", label: "Beklemede" },
            ],
        },
    ];

    const handleSubmit = (vals: FormValues) => {
        const val: OutgoingCheck = {
            id: initialValues?.id || Date.now(),
            type: vals.type,
            owner: vals.owner,
            company: vals.company,
            creditor: vals.creditor,
            debtor: vals.debtor,
            debtorPhone: vals.debtorPhone,
            instrumentType: vals.instrumentType,
            documentNo: vals.documentNo,
            date: vals.date,
            bank: vals.bank,
            amountDue: Number(vals.amountDue) || 0,
            amountPaid: Number(vals.amountPaid) || 0,
            remaining: Number(vals.remaining) || 0,
            description: vals.description,
            status: vals.status,
            image: vals.image,
        };
        onSubmit(val);
    };

    return (
        <ReusableModalForm<FormValues>
            show={show}
            title={initialValues ? "Düzenle" : "Ekle"}
            fields={fields}
            initialValues={defaults}
            onSubmit={handleSubmit}
            onClose={onClose}
            confirmButtonLabel="Kaydet"
        />
    );
}

function CheckDetailModal({ show, onClose, check }: { show: boolean; onClose: () => void; check: OutgoingCheck; }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Detay</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered size="sm">
                    <tbody>
                        <tr><th>Çek Türü</th><td>{check.type}</td></tr>
                        <tr><th>Çek Sahibi</th><td>{check.owner}</td></tr>
                        <tr><th>Firma</th><td>{check.company}</td></tr>
                        <tr><th>Verecekli</th><td>{check.creditor}</td></tr>
                        <tr><th>Alacaklı</th><td>{check.debtor}</td></tr>
                        <tr><th>Alacaklı Tel</th><td>{check.debtorPhone}</td></tr>
                        <tr><th>Türü</th><td>{check.instrumentType}</td></tr>
                        <tr><th>Belge No</th><td>{check.documentNo}</td></tr>
                        <tr><th>Tarih</th><td>{check.date}</td></tr>
                        <tr><th>Alıcı Banka</th><td>{check.bank}</td></tr>
                        <tr><th>Ödenecek</th><td>{check.amountDue}</td></tr>
                        <tr><th>Ödenen</th><td>{check.amountPaid}</td></tr>
                        <tr><th>Kalan</th><td>{check.remaining}</td></tr>
                        <tr><th>Açıklama</th><td>{check.description}</td></tr>
                        <tr><th>Durum</th><td>{check.status}</td></tr>
                        {check.image && (
                            <tr><th>Görüntü</th><td><img src={check.image} alt="belge" style={{ maxWidth: '100%' }} /></td></tr>
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Kapat</Button>
            </Modal.Footer>
        </Modal>
    );
}

function CheckPaymentModal({ show, onClose }: { show: boolean; onClose: () => void; }) {
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

interface PaymentFormValues {
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

    const handleSubmit = (vals: PaymentFormValues) => {
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

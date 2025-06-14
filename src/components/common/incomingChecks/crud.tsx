import { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
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
        type: "select",
        options: [
          { value: "student", label: "Öğrenci Ödeme" },
          { value: "customer", label: "Müşteri" },
        ],
      },
      { name: "branch", label: "Şube", type: "text", required: true },
    ];
    if (values.paymentTarget === "student") {
      fields.push({ name: "student", label: "Öğrenci", type: "text", required: true });
    }
    fields.push(
      { name: "creditor", label: "Verecekli", type: "text", required: true },
      { name: "type", label: "Türü", type: "select", options: [ {value: "Çek", label: "Çek"}, {value: "Senet", label: "Senet"} ], required: true },
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
        { name: "swapBuyer", label: "Alıcı", type: "text" },
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
    <ReusableModalForm<FormValues>
      show={show}
      title={initialValues ? "Düzenle" : "Ekle"}
      fields={getFields}
      initialValues={defaults}
      onSubmit={handleSubmit}
      onClose={onClose}
      confirmButtonLabel="Kaydet"
    />
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
            <input type="radio" checked={mode === "cash"} onChange={() => setMode("cash")}/> Nakit
          </label>
          <label>
            <input type="radio" checked={mode === "bank"} onChange={() => setMode("bank")}/> Banka Hesabına
          </label>
        </div>
        <ReusableModalForm<FormikValues>
          show={true}
          title=""
          fields={fields}
          initialValues={{}}
          onSubmit={() => {}}
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
  const [payments, setPayments] = useState<any[]>([]);

  const addPayment = (p: any) => setPayments((prev) => [...prev, p]);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Ödeme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button className="mb-2" onClick={() => addPayment({ id: Date.now(), date: new Date().toISOString().split("T")[0], amount: 0 })}>Ekle</Button>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Ödenen Tutar</th>
              <th>Ödeme Yapan</th>
              <th>Makbuz No</th>
              <th>Kullanıcı</th>
              <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.date}</td>
                <td>{p.amount}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
}

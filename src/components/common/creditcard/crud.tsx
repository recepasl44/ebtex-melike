import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Modal, Row, Col, Card, Button } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { useCreditCardAdd } from "../../hooks/creditCard/useCreditCardAdd";
import { useCreditCardUpdate } from "../../hooks/creditCard/useCreditCardUpdate";
import { useCreditCardShow } from "../../hooks/creditCard/useCreditCardShow";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { CreditCardAddPayload } from "../../../types/creditCard/add";
import { CreditCardUpdatePayload } from "../../../types/creditCard/update";

interface CreditCardModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

interface ICreditCardFormData extends FormikValues {
  branch_id: number | string;
  card_holder_name: string;
  card_name?: string;
  card_number: string;
  expire_month: number;
  expire_year: number;
  cvv: string;
  amount: number;
  description?: string;
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({ show, onClose, onRefresh }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const mode = (location.state as any)?.mode ?? (id ? "update" : "add");

  const [initialValues, setInitialValues] = useState<ICreditCardFormData>({
    branch_id: 0,
    card_holder_name: "",
    card_name: "",
    card_number: "",
    expire_month: 1,
    expire_year: new Date().getFullYear(),
    cvv: "",
    amount: 0,
    description: "",
  });

  useEffect(() => {
    if (mode === "add") {
      const userData = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData") || "{}")
        : {};
      setInitialValues((prev) => ({
        ...prev,
        branch_id: userData.default_branche?.id || 0,
      }));
    }
  }, [mode]);

  const { branchData } = useBranchTable({ enabled: true });
  const branchOptions = useMemo(
    () => branchData.map((b) => ({ value: b.id, label: b.name })),
    [branchData]
  );

  const getFields = (): FieldDefinition[] => [
    {
      name: "branch_id",
      label: "Şube",
      type: "select",
      required: true,
      options: branchOptions,
    },
    { name: "card_holder_name", label: "Kart Sahibi", type: "text", required: true },
    { name: "card_name", label: "Kart Adı", type: "text", required: false },
    { name: "card_number", label: "Kart Numarası", type: "text", required: true },
    { name: "expire_month", label: "Ay", type: "number", required: true },
    { name: "expire_year", label: "Yıl", type: "number", required: true },
    { name: "cvv", label: "CVV", type: "text", required: true },
    { name: "amount", label: "Tutar", type: "currency", required: true },
    { name: "description", label: "Açıklama", type: "textarea" },
  ];

  const { addNewCreditCard, status: addStatus, error: addError } = useCreditCardAdd();
  const { updateExistingCreditCard, status: updateStatus, error: updateError } = useCreditCardUpdate();
  const { creditCard, getCreditCard, status: showStatus, error: showError } = useCreditCardShow();

  useEffect(() => {
    if ((mode === "update" || mode === "detail") && id) {
      getCreditCard(Number(id));
    }
  }, [mode, id, getCreditCard]);

  useEffect(() => {
    if (mode === "update" && creditCard) {
      setInitialValues({
        branch_id: creditCard.branch_id || 0,
        card_holder_name: creditCard.card_holder_name || "",
        card_name: creditCard.description || "",
        card_number: creditCard.card_number || "",
        expire_month: Number(creditCard.expire_month) || 1,
        expire_year: Number(creditCard.expire_year) || new Date().getFullYear(),
        cvv: creditCard.cvv || "",
        amount: Number(creditCard.amount) || 0,
        description: creditCard.description || "",
      });
    }
  }, [mode, creditCard]);

  const loading =
    mode === "add"
      ? addStatus === "LOADING"
      : mode === "detail"
        ? showStatus === "LOADING"
        : updateStatus === "LOADING" || showStatus === "LOADING";

  const error =
    mode === "add"
      ? addError
      : mode === "update"
        ? updateError || showError
        : mode === "detail"
          ? showError
          : null;

  async function handleSubmit(values: ICreditCardFormData, _helpers: FormikHelpers<ICreditCardFormData>) {
    const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}") : {};
    const payloadBase = {
      card_holder_name: values.card_holder_name,
      card_number: values.card_number.replace(/\s/g, ""),
      expire_month: Number(values.expire_month),
      expire_year: Number(values.expire_year),
      cvv: values.cvv,
      amount: String(values.amount),
      branch_id: Number(values.branch_id) || userData.default_branche?.id || 0,
      season_id: userData.default_season?.id || 0,
      description: values.description || "",
    };

    if (mode === "add") {
      await addNewCreditCard(payloadBase as unknown as CreditCardAddPayload);
    } else if (mode === "update" && id) {
      await updateExistingCreditCard({ creditCardId: Number(id), payload: payloadBase } as CreditCardUpdatePayload);
    }
    navigate(-1);
  }
  const [debts, setDebts] = useState<any[]>([
      {
        id: 1,
        borc_tutari: 1000,
        askeri_borc: 200,
        due_date: "2025-06-01",
        odenen: 300,
        kalan: 700,
        kullanici: "Admin",
      },
    ]);
  const [payments, setPayments] = useState<Record<number, any[]>>({
      1: [
        {
          id: 1,
          tip: "Kısmi Ödeme",
          tutar: 300,
          turu: "Nakit",
          banka: "-",
          tarih: "2024-01-01",
          kullanici: "Admin",
        },
      ],
    });
  const [selectedDebtId, setSelectedDebtId] = useState<number | null>(null);

  if (mode === "detail") {
    const selectedPayments =
      (selectedDebtId && payments[selectedDebtId]) || [];

    const debtColumns: ColumnDefinition<any>[] = [
      { key: "borc_tutari", label: "Borç Tutarı" },
      { key: "askeri_borc", label: "Askeri Borç Tutarı" },
      { key: "due_date", label: "Son Ödeme Tarihi" },
      { key: "odenen", label: "Ödenen Tutar" },
      { key: "kalan", label: "Kalan Tutar" },
      { key: "kullanici", label: "Kullanıcı" },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <button
              className="btn btn-icon btn-sm btn-primary-light rounded-pill"
              onClick={() => setSelectedDebtId(row.id)}
            >
              <i className="ti ti-check" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-info-light rounded-pill ms-1"
              onClick={() => alert("edit")}
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill ms-1"
              onClick={() =>
                setDebts((d) => d.filter((item) => item.id !== row.id))
              }
            >
              <i className="ti ti-trash" />
            </button>
          </>
        ),
      },
    ];

    const paymentColumns: ColumnDefinition<any>[] = [
      { key: "tip", label: "Ödeme Tipi" },
      { key: "tutar", label: "Ödenen Tutar" },
      { key: "turu", label: "Ödeme Türü" },
      { key: "banka", label: "Banka Hesabı" },
      { key: "tarih", label: "Tarih" },
      { key: "kullanici", label: "Kullanıcı" },
      {
        key: "actions",
        label: "İşlemler",
        render: () => (
          <button
            className="btn btn-icon btn-sm btn-info-light rounded-pill"
            onClick={() => alert("edit")}
          >
            <i className="ti ti-pencil" />
          </button>
        ),
      },
    ];

    return (
      <Modal show={show} onHide={() => navigate(-1)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Kredi Kartı Detayı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <Card.Title className="mb-0">Kredi Kartı Borçları</Card.Title>
                  <Button size="sm" onClick={() => alert("add")}>Ekle</Button>
                </Card.Header>
                <Card.Body>
                  <ReusableTable
                    tableMode="single"
                    showExportButtons={false}
                    data={debts}
                    columns={debtColumns}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <Card.Title className="mb-0">Ödemeler</Card.Title>
                  <Button size="sm" onClick={() => alert("add")}>Ekle</Button>
                </Card.Header>
                <Card.Body>
                  <ReusableTable
                    tableMode="single"
                    showExportButtons={false}
                    data={selectedPayments}
                    columns={paymentColumns}
                    customFooter={
                      selectedDebtId === null && (
                        <div className="text-center p-2">Borç seçiniz</div>
                      )
                    }
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <ReusableModalForm<ICreditCardFormData>
      show={show}
      title={mode === "add" ? "Kredi Kartı Ekle" : "Kredi Kartı Güncelle"}
      fields={getFields()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={error || undefined}
      autoGoBackOnModalClose={true}
      onClose={onClose}
    />
  );
};

export default CreditCardModal;

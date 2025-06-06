import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { useCreditCardAdd } from "../../hooks/creditCard/useCreditCardAdd";
import { useCreditCardUpdate } from "../../hooks/creditCard/useCreditCardUpdate";
import { useCreditCardShow } from "../../hooks/creditCard/useCreditCardShow";
import { CreditCardAddPayload } from "../../../types/creditCard/add";
import { CreditCardUpdatePayload } from "../../../types/creditCard/update";

interface CreditCardModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

interface ICreditCardFormData extends FormikValues {
  card_holder_name: string;
  card_number: string;
  expire_month: number;
  expire_year: number;
  cvv: string;
  amount: number;
  description?: string;
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({ show, onClose, onRefresh }) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<ICreditCardFormData>({
    card_holder_name: "",
    card_number: "",
    expire_month: 1,
    expire_year: new Date().getFullYear(),
    cvv: "",
    amount: 0,
    description: "",
  });

  const getFields = (): FieldDefinition[] => [
    { name: "card_holder_name", label: "Kart Sahibi", type: "text", required: true },
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
    if (mode === "update" && id) {
      getCreditCard(Number(id));
    }
  }, [mode, id, getCreditCard]);

  useEffect(() => {
    if (mode === "update" && creditCard) {
      setInitialValues({
        card_holder_name: creditCard.card_holder_name || "",
        card_number: creditCard.card_number || "",
        expire_month: Number(creditCard.expire_month) || 1,
        expire_year: Number(creditCard.expire_year) || new Date().getFullYear(),
        cvv: creditCard.cvv || "",
        amount: Number(creditCard.amount) || 0,
        description: creditCard.description || "",
      });
    }
  }, [mode, creditCard]);

  const loading = mode === "add" ? addStatus === "LOADING" : updateStatus === "LOADING" || showStatus === "LOADING";
  const error = mode === "add" ? addError : mode === "update" ? updateError || showError : null;

  async function handleSubmit(values: ICreditCardFormData, _helpers: FormikHelpers<ICreditCardFormData>) {
    const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}") : {};
    const payloadBase = {
      card_holder_name: values.card_holder_name,
      card_number: values.card_number,
      expire_month: Number(values.expire_month),
      expire_year: Number(values.expire_year),
      cvv: values.cvv,
      amount: String(values.amount),
      branch_id: userData.default_branche?.id || 0,
      season_id: userData.default_season?.id || 0,
      description: values.description || "",
    };

    if (mode === "add") {
      await addNewCreditCard(payloadBase as unknown as CreditCardAddPayload);
    } else if (mode === "update" && id) {
      await updateExistingCreditCard({ creditCardId: Number(id), payload: payloadBase } as CreditCardUpdatePayload);
    }
    onRefresh();
    onClose();
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

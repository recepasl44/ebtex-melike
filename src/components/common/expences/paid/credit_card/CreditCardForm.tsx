import React from "react";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../../common/ReusableModalForm";
import { FormikHelpers } from "formik";
import { useCreditCardAdd } from "../../../../hooks/creditCard/useCreditCardAdd";
import { useSeasonsBranches } from "../../../../header/hooks/useSeasonsBranches";

interface ICreditCardFormData {
  card_holder_name: string;
  card_number: string;
  amount: number;
  bank_name: string;
  transaction_date: string;
  expiry_date: string;
  cvv: string;
  installment_count: number;
  description?: string;
}

interface CreditCardFormProps {
  onClose: () => void;
  onPaymentSuccess?: (paymentDetails: any) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  onClose,
  onPaymentSuccess,
}) => {
  const { addNewCreditCard, status, error } = useCreditCardAdd();
  const { selectedSeason, selectedBranch } = useSeasonsBranches();

  // Form için başlangıç değerleri
  const initialValues: ICreditCardFormData = {
    card_holder_name: "",
    card_number: "",
    amount: 0,
    bank_name: "",
    transaction_date: new Date().toISOString().split("T")[0],
    expiry_date: "",
    cvv: "",
    installment_count: 1,
    description: "",
  };

  // Form alanlarını oluştur
  const getFormFields = (): FieldDefinition[] => [
    {
      name: "card_holder_name",
      label: "Kart Sahibinin Adı",
      type: "text",
      required: true,
    },
    {
      name: "card_number",
      label: "Kart Numarası",
      type: "text",
      required: true,
    },
    {
      name: "amount",
      label: "Tutar",
      type: "currency",
      required: true,
    },
    {
      name: "bank_name",
      label: "Banka Adı",
      type: "text",
      required: true,
    },
    {
      name: "transaction_date",
      label: "İşlem Tarihi",
      type: "date",
      required: true,
    },
    {
      name: "expiry_date",
      label: "Son Kullanma Tarihi",
      type: "text",
      required: true,
    },
    {
      name: "cvv",
      label: "CVV",
      type: "text",
      required: true,
    },
    {
      name: "installment_count",
      label: "Taksit Sayısı",
      type: "select",
      required: true,
      options: [
        { label: "Tek Çekim", value: 1 },
        { label: "2 Taksit", value: 2 },
        { label: "3 Taksit", value: 3 },
        { label: "6 Taksit", value: 6 },
        { label: "9 Taksit", value: 9 },
        { label: "12 Taksit", value: 12 },
      ],
    },
    {
      name: "description",
      label: "Açıklama",
      type: "textarea",
      required: false,
    },
  ];

  // Form gönderimi
  const handleSubmit = async (
    values: ICreditCardFormData,
    helpers: FormikHelpers<ICreditCardFormData>
  ) => {
    try {
      // API için veri formatı
      const payload = {
        branch_id: selectedBranch || 0,
        season_id: selectedSeason || 0,
        bank_name: values.bank_name,
        amount: values.amount.toString(),
        card_holder_name: values.card_holder_name,
        card_number: values.card_number.replace(/\s/g, ""),
        transaction_date: values.transaction_date,
        installment_count: values.installment_count,
        description: values.description || "",
        expire_month: (new Date(values.expiry_date).getMonth() + 1).toString(),
        expire_year: new Date(values.expiry_date).getFullYear().toString(),
        cvv: values.cvv,
      };

      // API çağrısı
      const result = await addNewCreditCard(payload);

      if (result) {
        if (onPaymentSuccess) {
          onPaymentSuccess({
            payment_type: "credit_card",
            payment_method_id: 3, // Kredi kartı için payment_method_id: 3
            card_holder_name: values.card_holder_name,
            card_number: values.card_number,
            amount: values.amount,
            bank_name: values.bank_name,
            installment_count: values.installment_count,
            transaction_date: values.transaction_date,
            description: values.description,
            pay_id: result.id || 3,
          });
        }
        onClose();
      }
    } catch (error) {
      console.error("Kredi kartı işlemi sırasında hata:", error);
      helpers.setStatus("Kredi kartı işlemi sırasında bir hata oluştu");
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <ReusableModalForm<ICreditCardFormData>
      show={true}
      title="Kredi Kartı ile Ödeme"
      fields={getFormFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel="Ödemeyi Tamamla"
      cancelButtonLabel="Vazgeç"
      onClose={onClose}
      isLoading={status === "LOADING"}
      error={error}
      mode="single"
    />
  );
};

export default CreditCardForm;

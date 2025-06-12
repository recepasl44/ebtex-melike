import React from "react";
import ReusableModalForm, { FieldDefinition } from "../../../ReusableModalForm";
import { FormikHelpers } from "formik";
import { useBankAdd } from "../../../../hooks/bank/useBankAdd";
import { BankAddPayload } from "../../../../../types/bank/add";

interface IBankTransferFormData {
  bank_name: string;
  iban: string;
  amount: number;
  transfer_date: string;
  description?: string;
}

interface BankTransferFormProps {
  onClose: () => void;
  onPaymentSuccess?: (paymentDetails: any) => void;
}

const BankTransferForm: React.FC<BankTransferFormProps> = ({
  onClose,
  onPaymentSuccess,
}) => {
  const { addNewBank, status, error: apiError } = useBankAdd();

  const initialValues: IBankTransferFormData = {
    bank_name: "",
    iban: "",
    amount: 0,
    transfer_date: new Date().toISOString().split("T")[0],
    description: "",
  };

  const getFormFields = (): FieldDefinition[] => [
    {
      name: "bank_name",
      label: "Banka Adı",
      type: "text",
      required: true,
    },
    {
      name: "iban",
      label: "IBAN",
      type: "iban",
      required: true,
    },
    {
      name: "amount",
      label: "Tutar",
      type: "currency",
      required: true,
    },
    {
      name: "transfer_date",
      label: "Transfer Tarihi",
      type: "date",
      required: true,
    },
    {
      name: "description",
      label: "Açıklama",
      type: "textarea",
      required: false,
    },
  ];

  const handleSubmit = async (
    values: IBankTransferFormData,
    helpers: FormikHelpers<IBankTransferFormData>
  ) => {
    try {
      // LocalStorage'dan kullanıcı bilgilerini al
      const userData = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData") || "{}")
        : {};

      // API çağrısı için payload hazırla
      const bankPayload: BankAddPayload = {
        bank_name: values.bank_name,
        amount: String(values.amount),
        iban: values.iban,
        branch_id: userData.default_branche?.id || 0,
        season_id: userData.default_season?.id || 0,
      };

      // API çağrısını yap
      const response = await addNewBank(bankPayload);

      // Başarılı yanıt durumunda
      if (response) {
        if (onPaymentSuccess) {
          onPaymentSuccess({
            pay_id: response.id || 1,
            payment_method_id: 1, // Banka transferi için payment_method_id: 1
            payment_method_name: "Banka Anlaşması",
            is_processed: true,
            ...values,
          });
        }
        onClose();
      } else {
        throw new Error("Banka transferi işlemi başarısız oldu.");
      }
    } catch (error: any) {
      console.error("Bank transfer error:", error);
      helpers.setStatus(
        error.message || "Banka transferi işleminde bir hata oluştu"
      );
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <ReusableModalForm<IBankTransferFormData>
      show={true}
      title="Banka Transferi"
      fields={getFormFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel="Ödemeyi Tamamla"
      cancelButtonLabel="Vazgeç"
      onClose={onClose}
      hideButtons={false}
      mode="single"
      isLoading={status === "LOADING"}
      error={apiError}
    />
  );
};

export default BankTransferForm;

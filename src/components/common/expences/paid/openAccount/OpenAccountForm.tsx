import React, { useState } from "react";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../../common/ReusableModalForm";
import { FormikHelpers } from "formik";
import { useOpenAccountAdd } from "../../../../hooks/openAccount/useOpenAdd";
import { OpenAccountAddPayload } from "../../../../../types/openAccount/add";

interface IOpenAccountFormData {
  customer_name: string;
  amount: number;
  some_description?: string;
}

interface OpenAccountFormProps {
  onClose: () => void;
  onPaymentSuccess?: (paymentDetails: any) => void;
}

const OpenAccountForm: React.FC<OpenAccountFormProps> = ({
  onClose,
  onPaymentSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNewOpenAccount, error } = useOpenAccountAdd();

  const initialValues: IOpenAccountFormData = {
    customer_name: "",
    amount: 0,
    some_description: "",
  };

  const getFormFields = (): FieldDefinition[] => [
    {
      name: "customer_name",
      label: "Müşteri Adı",
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
      name: "some_description",
      label: "Açıklama",
      type: "textarea",
      required: false,
    },
  ];

  const handleSubmit = async (
    values: IOpenAccountFormData,
    helpers: FormikHelpers<IOpenAccountFormData>
  ) => {
    try {
      setIsLoading(true);

      // API verileri hazırlama
      const payload: OpenAccountAddPayload = {
        customer_name: values.customer_name,
        amount: String(values.amount),
        some_description: values.some_description || "",
        branch_id: 1,
        season_id: 1,
      };

      // API'ye veri gönderme
      const result = await addNewOpenAccount(payload);

      if (result) {
        // Başarılı API yanıtı
        if (onPaymentSuccess) {
          onPaymentSuccess({
            pay_id: result.id || 2, // API yanıtındaki ID veya 2
            customer_name: values.customer_name,
            amount: values.amount,
            description: values.some_description || "",
          });
        }
        helpers.resetForm();
        onClose();
      } else {
        // API hatası
        helpers.setStatus("Açık hesap kaydı yapılamadı");
      }
    } catch (err) {
      console.error("Open account API error:", err);
      helpers.setStatus("Açık hesap kaydında hata oluştu");
    } finally {
      setIsLoading(false);
      helpers.setSubmitting(false);
    }
  };

  return (
    <ReusableModalForm<IOpenAccountFormData>
      show={true}
      title="Açık Hesap"
      fields={getFormFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel="Ödemeyi Tamamla"
      cancelButtonLabel="Vazgeç"
      onClose={onClose}
      hideButtons={false}
      mode="single"
      isLoading={isLoading}
      error={error}
    />
  );
};

export default OpenAccountForm;

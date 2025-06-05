import React, { useState } from "react";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../ReusableModalForm";
import { FormikHelpers } from "formik";
import { useInstrumentsAdd } from "../../../../hooks/instruments/useInstrumentsAdd";
import { useSeasonsBranches } from "../../../../header/hooks/useSeasonsBranches";

// Çek/Senet türleri
export enum CheckType {
  CHECK = "Çek",
  PROMISSORY_NOTE = "Senet",
}

// Çek/Senet form veri arayüzü
interface ICheckFormData {
  check_type: string;
  check_no: string;
  owner_name: string;
  bank_name: string;
  amount: number;
  due_date: string;
  supplier_id?: number;
}

// CheckForm bileşeni props'ları
interface CheckFormProps {
  onClose: () => void;
  onPaymentSuccess?: (paymentDetails: any) => void;
}

const CheckForm: React.FC<CheckFormProps> = ({ onClose, onPaymentSuccess }) => {
  const { addNewInstrument, status, error } = useInstrumentsAdd();
  const { selectedSeason, selectedBranch } = useSeasonsBranches();
  const [checkType, setCheckType] = useState<string>("");

  // Form için başlangıç değerleri
  const initialValues: ICheckFormData = {
    check_type: "",
    check_no: "",
    owner_name: "",
    bank_name: "",
    amount: 0,
    due_date: new Date().toISOString().split("T")[0],
    supplier_id: 0,
  };

  // Form alanlarını oluştur
  const getFormFields = (): FieldDefinition[] => {
    const fields: FieldDefinition[] = [
      {
        name: "check_type",
        label: "Çek & Senet",
        type: "select",
        required: true,
        options: [
          { label: "Seçiniz", value: "" },
          { label: CheckType.CHECK, value: CheckType.CHECK },
          {
            label: CheckType.PROMISSORY_NOTE,
            value: CheckType.PROMISSORY_NOTE,
          },
        ],
        onChange: (value) => setCheckType(value),
      },
    ];

    // Çek/Senet türü seçildiyse diğer alanları göster
    if (checkType) {
      // Tüm türler için ortak alanlar
      fields.push(
        {
          name: "check_no",
          label: checkType === CheckType.CHECK ? "Çek No" : "Senet No",
          type: "text",
          required: true,
          minLength: 3,
          maxLength: 20,
        },
        {
          name: "owner_name",
          label: "Sahibi",
          type: "text",
          required: true,
          minLength: 2,
          maxLength: 50,
        },
        {
          name: "amount",
          label: "Miktar",
          type: "currency",
          required: true,
          min: 0,
        },
        {
          name: "due_date",
          label: "Vade Tarihi",
          type: "date",
          required: true,
        }
      );

      // Sadece Çek için banka adı alanı
      if (checkType === CheckType.CHECK) {
        fields.splice(2, 0, {
          name: "bank_name",
          label: "Banka",
          type: "text",
          required: true,
          minLength: 2,
          maxLength: 50,
        });
      }
    }

    return fields;
  };

  // Form gönderimi
  const handleSubmit = async (
    values: ICheckFormData,
    helpers: FormikHelpers<ICheckFormData>
  ) => {
    try {
      // API için veri formatı
      const isCheck = values.check_type === CheckType.CHECK;

      const payload = {
        branch_id: selectedBranch || 0,
        document_type: isCheck ? 1 : 2, // 1: çek, 2: senet
        supplier_id: values.supplier_id || 0,
        document_owner_name: values.owner_name,
        document_status: "active",
        amount: parseFloat(values.amount.toString()),
        due_date: values.due_date,
        bank: isCheck ? values.bank_name : "",
        check_no: values.check_no,
        transaction_no: "",
        season: selectedSeason?.toString() || "0",
        instrument_no: values.check_no,
        owner_name: values.owner_name,
        receive_document_type: values.check_type,
        receive_document_name: values.check_type,
        guarantors: "",
        school_no: null,
        bozdur_swap: false,
        image_base: "",
      };

      // API çağrısı
      const result = await addNewInstrument(payload);

      if (result) {
        if (onPaymentSuccess) {
          onPaymentSuccess({
            payment_type: "check",
            check_type: values.check_type,
            check_no: values.check_no,
            owner_name: values.owner_name,
            bank_name: isCheck ? values.bank_name : "",
            amount: values.amount,
            due_date: values.due_date,
          });
        }
        onClose();
      }
    } catch (error) {
      console.error("Çek/Senet ödemesi kaydedilirken hata:", error);
      helpers.setStatus("Çek/Senet ödemesi kaydedilirken bir hata oluştu");
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <ReusableModalForm<ICheckFormData>
      show={true}
      title="Ödeme Yap"
      fields={getFormFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel="Kaydet"
      cancelButtonLabel="Vazgeç"
      onClose={onClose}
      isLoading={status === "LOADING"}
      error={error}
      mode="single"
    />
  );
};

export default CheckForm;

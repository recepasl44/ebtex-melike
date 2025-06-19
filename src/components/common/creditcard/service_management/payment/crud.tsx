import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../../../ReusableModalForm";

export interface PaymentFormValues extends FormikValues {
  tip: string;
  tutar: number;
  turu: string;
  banka?: string;
  tarih: string;
}

interface Props {
  show: boolean;
  mode: "add" | "edit";
  initialValues: PaymentFormValues;
  bankOptions: { label: string; value: string }[];
  onSubmit: (
    values: PaymentFormValues,
    helpers: FormikHelpers<PaymentFormValues>
  ) => void;
  onClose: () => void;
}

export default function PaymentCrud({
  show,
  mode,
  initialValues,
  bankOptions,
  onSubmit,
  onClose,
}: Props) {
  const getFields = (values: PaymentFormValues): FieldDefinition[] => [
    {
      name: "tip",
      label: "Ödeme Tipi",
      type: "select",
      required: true,
      options: [
        { value: "askeri", label: "Askeri Borç" },
        { value: "kismi", label: "Kısmi Ödeme" },
        { value: "tamam", label: "Tamamını" },
      ],
    },
    { name: "tutar", label: "Ödenen Tutar", type: "currency", required: true },
    {
      name: "turu",
      label: "Ödeme Türü",
      type: "select",
      required: true,
      options: [
        { value: "nakit", label: "Nakit" },
        { value: "banka", label: "Banka Hesabı" },
      ],
    },
    ...(values.turu === "banka"
      ? [
        {
          name: "banka",
          label: "Banka Hesabı",
          type: "select" as const,
          required: true,
          options: bankOptions,
        },
      ]
      : []),
    { name: "tarih", label: "Tarih", type: "date", required: true },
  ];

  return (
    <ReusableModalForm<PaymentFormValues>
      show={show}
      title={mode === "add" ? "Ödeme Ekle" : "Ödemeyi Düzenle"}
      fields={(values) => getFields(values as PaymentFormValues)}
      initialValues={initialValues}
      onSubmit={onSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      onClose={onClose}
    />
  );
}

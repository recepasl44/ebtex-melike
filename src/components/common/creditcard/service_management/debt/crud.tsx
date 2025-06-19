import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../../../ReusableModalForm";

export interface DebtFormValues extends FormikValues {
  borc_tutari?: number;
  askeri_borc?: number;
  due_date?: string;
  tip?: string;
  tutar?: number;
  turu?: string;
  banka?: string;
  tarih?: string;
}

interface Props {
  show: boolean;
  mode: "add" | "edit";
  initialValues: DebtFormValues;
  bankOptions: { label: string; value: string }[];
  onSubmit: (
    values: DebtFormValues,
    helpers: FormikHelpers<DebtFormValues>
  ) => void;
  onClose: () => void;
}

export default function DebtCrud({
  show,
  mode,
  initialValues,
  bankOptions,
  onSubmit,
  onClose,
}: Props) {
  const addFields: FieldDefinition[] = [
    { name: "borc_tutari", label: "Borç Tutarı", type: "currency", required: true },
    { name: "askeri_borc", label: "Askeri Borç Tutarı", type: "currency", required: true },
    { name: "due_date", label: "Son Ödeme Tarihi", type: "date", required: true },
  ];

  const getEditFields = (values: DebtFormValues): FieldDefinition[] => [
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

  const fields = mode === "add" ? addFields : getEditFields(initialValues);

  return (
    <ReusableModalForm<DebtFormValues>
      show={show}
      title={mode === "add" ? "Borç Ekle" : "Borç Düzenle"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      onClose={onClose}
    />
  );
}

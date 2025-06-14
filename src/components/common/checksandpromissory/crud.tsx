import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { CheckRecord } from "../../../types/checksandpromissory/list";

interface CheckCrudProps {
  show: boolean;
  onClose: () => void;
  onSave: (record: CheckRecord) => void;
  record?: CheckRecord | null;
}

export default function CheckCrud({ show, onClose, onSave, record }: CheckCrudProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const [initialValues, setInitialValues] = useState<CheckRecord>({
    id: 0,
    check_type: "",
    owner: "",
    company: "",
    debtor: "",
    creditor: "",
    creditor_phone: "",
    kind: "",
    date: new Date().toISOString().split("T")[0],
    recipient_bank: "",
    document_no: "",
    payable_amount: 0,
    paid_amount: 0,
    remaining_amount: 0,
    status: "Beklemede",
    description: "",
    image: null,
    payments: [],
  });

  useEffect(() => {
    if (record) {
      setInitialValues(record);
    }
  }, [record]);

  const fields: FieldDefinition[] = [
    { name: "check_type", label: "Çek Türü", type: "text", required: true },
    { name: "owner", label: "Çek Sahibi", type: "text", required: true },
    { name: "company", label: "Firma", type: "text" },
    { name: "debtor", label: "Verecekli", type: "text" },
    { name: "creditor", label: "Alacaklı", type: "text" },
    { name: "creditor_phone", label: "Alacaklı Tel", type: "phone" },
    { name: "kind", label: "Türü", type: "text" },
    { name: "date", label: "Tarih", type: "date", required: true },
    { name: "recipient_bank", label: "Alıcı Banka", type: "text" },
    { name: "document_no", label: "Belge No", type: "text" },
    { name: "payable_amount", label: "Ödenecek Tutar", type: "number" },
    { name: "paid_amount", label: "Ödenen Tutar", type: "number" },
    { name: "remaining_amount", label: "Kalan Tutar", type: "number" },
    {
      name: "status",
      label: "Durum",
      type: "select",
      options: [
        { label: "Ödendi", value: "Ödendi" },
        { label: "Ödenmedi", value: "Ödenmedi" },
        { label: "Beklemede", value: "Beklemede" },
      ],
    },
    { name: "description", label: "Açıklama", type: "textarea" },
    { name: "image", label: "Görüntü", type: "file" },
  ];

  const handleSubmit = (values: CheckRecord) => {
    const newRecord: CheckRecord = {
      ...values,
      id: record ? record.id : Date.now(),
      payments: record ? record.payments : [],
    };
    onSave(newRecord);
    onClose();
    navigate(-1);
  };

  return (
    <ReusableModalForm<CheckRecord>
      show={show}
      title={isEdit ? "Güncelle" : "Ekle"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={isEdit ? "Güncelle" : "Ekle"}
      cancelButtonLabel="Kapat"
      onClose={() => {
        onClose();
        navigate(-1);
      }}
      autoGoBackOnModalClose
      mode="single"
    />
  );
}

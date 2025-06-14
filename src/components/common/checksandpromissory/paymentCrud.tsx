import { useEffect, useState } from "react";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { PaymentRecord } from "../../../types/checksandpromissory/list";

interface PaymentCrudProps {
  show: boolean;
  onClose: () => void;
  onSave: (payment: PaymentRecord) => void;
  payment?: PaymentRecord | null;
}

export default function PaymentCrud({ show, onClose, onSave, payment }: PaymentCrudProps) {
  const [initialValues, setInitialValues] = useState<PaymentRecord>({
    id: 0,
    date: new Date().toISOString().split("T")[0],
    amount_paid: 0,
    payer: "",
    receipt_no: "",
    user: "",
    description: "",
  });

  useEffect(() => {
    if (payment) setInitialValues(payment);
  }, [payment]);

  const fields: FieldDefinition[] = [
    { name: "date", label: "Tarih", type: "date", required: true },
    { name: "amount_paid", label: "Ödenen Tutar", type: "number", required: true },
    { name: "payer", label: "Ödeme Yapan", type: "text" },
    { name: "receipt_no", label: "Makbuz No", type: "text" },
    { name: "user", label: "Kullanıcı", type: "text" },
    { name: "description", label: "Açıklama", type: "textarea" },
  ];

  const handleSubmit = (values: PaymentRecord) => {
    const newPayment: PaymentRecord = {
      ...values,
      id: payment ? payment.id : Date.now(),
    };
    onSave(newPayment);
    onClose();
  };

  return (
    <ReusableModalForm<PaymentRecord>
      show={show}
      title={payment ? "Güncelle" : "Ekle"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={payment ? "Güncelle" : "Ekle"}
      cancelButtonLabel="Kapat"
      onClose={onClose}
      mode="single"
    />
  );
}

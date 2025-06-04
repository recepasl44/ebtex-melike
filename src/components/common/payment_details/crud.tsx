import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { useShowInstallment } from "../../hooks/Installment/useShow";
import { useUpdateInstallment } from "../../hooks/Installment/useUpdate";
import { PaymentMethod } from "../../../enums/Installment/list";

interface InstallmentPaymentFormValues {
  installment_id: number;
  student_id: number;
  enrollment_id: number;
  amount_paid: string;
  payment_date: string;
  payment_method: number | string;
  description?: string;
  image_base64?: string | null;
  due_date?: string;
}

export default function InstallmentCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();

  // URL'den veya state'ten gelen veriler
  const installmentId = id ? Number(id) : location.state?.installmentId;
  const studentId = id;
  const enrollmentId = location.state?.enrollmentId;

  // API Hook'ları
  const {
    installment,
    status: detailStatus,
    error: detailError,
    fetchOneInstallment,
  } = useShowInstallment();
  const {
    status: updateStatus,
    error: updateError,
    editInstallment,
  } = useUpdateInstallment();

  // Form başlangıç değerleri
  const [initialValues, setInitialValues] =
    useState<InstallmentPaymentFormValues>({
      installment_id: installmentId || 0,
      student_id: studentId ? Number(studentId) : 0,
      enrollment_id: enrollmentId || 0,
      amount_paid: "",
      payment_date: new Date().toISOString().split("T")[0],
      payment_method: PaymentMethod.CASH,
      description: "",
      image_base64: null,
    });

  // 1) Taksit detayını yükleme
  useEffect(() => {
    if (installmentId) {
      fetchOneInstallment({ installmentId });
    }
  }, [installmentId, fetchOneInstallment]);

  // 2) Taksit verisi geldiğinde form değerlerini güncelleme
  useEffect(() => {
    if (installment) {
      setInitialValues((prev) => ({
        ...prev,
        student_id: studentId ? Number(studentId) : 0,
        installment_id: installment.id,
        enrollment_id: installment.enrollment_id,
        amount_paid: installment.amount, // amount değerini amount_paid'e atıyoruz
        payment_date: new Date().toISOString().split("T")[0],
      }));
    }
  }, [installment, studentId]);

  // 3) Form alanları
  const fields: FieldDefinition[] = [
    {
      name: "amount_paid",
      label: "Ödeme Tutarı",
      type: "currency",
      required: true,
    },
    {
      name: "due_date",
      label: "Ödeme Tarihi",
      type: "date",
      required: true,
    },
    {
      name: "payment_method",
      label: "Ödeme Yöntemi",
      type: "select",
      required: true,
      options: [
        { label: "Nakit", value: 1 },
        { label: "Kredi Kartı", value: 2 },
        { label: "Havale/EFT", value: 3 },
        { label: "Çek", value: 4 },
      ],
    },
    {
      name: "description",
      label: "Açıklama",
      type: "textarea",
      required: false,
    },
    {
      name: "image_base64",
      label: "Dekont/Makbuz",
      type: "file",
      required: false,
    },
  ];

  // 4) Form gönderimi
  const handleSubmit = async (values: InstallmentPaymentFormValues) => {
    if (!installmentId || !studentId) {
      alert("Taksit ID veya Öğrenci ID bulunamadı");
      return;
    }

    try {
      // Dosya varsa base64'e dönüştürme
      let imageBase64 = null;

      // Taksit güncelleme API'si çağırma
      await editInstallment({
        installmentId: values.installment_id,
        body: {
          student_id: values.student_id,
          enrollment_id: values.enrollment_id,
          amount: values.amount_paid,
          payment_date: values.payment_date,
          due_date: values.due_date,
          payment_method: String(values.payment_method),
          description: values.description,
          image_base64: imageBase64,
          is_paid: 1,
        },
      });

      // Başarılı işlem sonrası
      navigate(-1);
    } catch (err) {
      console.error("Ödeme işlemi başarısız:", err);
    }
  };

  // Loading ve error durumları
  const isLoading = detailStatus === "LOADING" || updateStatus === "LOADING";
  const error = detailError || updateError;

  return (
    <ReusableModalForm<InstallmentPaymentFormValues>
      show={true}
      title="Taksit Ödemesi"
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel="Ödemeyi Tamamla"
      cancelButtonLabel="Vazgeç"
      isLoading={isLoading}
      error={error || null}
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose={true}
      mode="single"
    />
  );
}

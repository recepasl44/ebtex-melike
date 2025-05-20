import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../common/ReusableModalForm";
import { FormikHelpers } from "formik";

// Ödenecek kalemler için storage key
const STORAGE_KEY = "expense_payable_options";

// Ödenecek kalem form verisi için tip
interface IPayableFormData {
  amount: number;
  due_date: string;
  description: string;
}

interface PayableItem {
  label: string;
  value: string;
}

// Ödenecek kalemler için storage service
const PayableStorageService = {
  getItems: () => {
    try {
      // LocalStorage'dan kayıtlı ödenecek kalemleri al
      const storageData = localStorage.getItem(STORAGE_KEY);
      return storageData ? JSON.parse(storageData) : [];
    } catch (error) {
      console.error("Ödenecek kalemler yüklenirken hata:", error);
      return [];
    }
  },

  saveItem: (item: PayableItem) => {
    try {
      // Mevcut öğeleri al
      let items = PayableStorageService.getItems();

      // Yeni öğeyi ekle (zaten varsa güncelle)
      const existing = items.findIndex(
        (i: PayableItem) => i.value === item.value
      );
      if (existing >= 0) {
        items[existing] = item;
      } else {
        items.push(item);
      }

      // LocalStorage'a kaydet
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return items;
    } catch (error) {
      console.error("Ödenecek kalem kaydedilirken hata:", error);
      return PayableStorageService.getItems();
    }
  },

  // JSON'dan PayableData nesnesine dönüştür
  parseData: (jsonString: string) => {
    if (!jsonString) return null;

    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Ödenecek kalem verisi ayrıştırılamadı:", error);
      return null;
    }
  },
};

const PayableForm: React.FC = () => {
  const navigate = useNavigate();
  const { returnUrl } = useParams<{ returnUrl?: string }>();

  // Form başlangıç değerleri
  const initialValues: IPayableFormData = {
    amount: 0,
    due_date: new Date().toISOString().split("T")[0], // Today's date
    description: "",
  };

  // Form alanları
  const getFormFields = (): FieldDefinition[] => [
    {
      name: "amount",
      label: "Tutar",
      type: "currency",
      required: true,
      min: 0,
    },
    {
      name: "due_date",
      label: "Ödeme Tarihi",
      type: "date",
      required: true,
    },
    {
      name: "description",
      label: "Açıklama",
      type: "textarea",
      required: true,
      minLength: 3,
      maxLength: 500,
    },
  ];

  // Form gönderildiğinde
  const handleSubmit = (
    values: IPayableFormData,
    helpers: FormikHelpers<IPayableFormData>
  ) => {
    try {
      // Ödenecek kalem verisi hazırlanıyor
      const payableData = {
        due_date: values.due_date,
        amount: values.amount,
        description: values.description,
      };

      // Ana formda kullanılacak yapı
      const paymentStatus = {
        value: JSON.stringify(payableData),
        label: `Ödeme: ${values.amount} TL - ${values.due_date}`, // Otomatik etiket oluştur
      };

      // LocalStorage'a kaydet
      PayableStorageService.saveItem(paymentStatus);

      // Geri dönüş URL'i
      let decodedReturnUrl = "/expensecrud";

      // URL parametresinden dönüş adresini al
      if (returnUrl) {
        decodedReturnUrl = decodeURIComponent(returnUrl);
      } else {
        // Check if we were on an update page (with ID) and preserve the ID in the URL
        const currentPath = window.location.pathname;
        const match = currentPath.match(/\/expensecrud\/(\d+)/);
        if (match && match[1]) {
          const expenseId = match[1];
          decodedReturnUrl = `/expensecrud/${expenseId}`;
        }
      }

      // State ile birlikte yönlendir ve modalı kapat
      // Get the current URL path
      const currentPath = window.location.pathname;

      // Check if returnUrl was provided (highest priority)
      if (returnUrl) {
        decodedReturnUrl = decodeURIComponent(returnUrl);
      }
      // Check if we're on an update page by looking for ID in path
      else if (currentPath.includes("/expensecrud/")) {
        // Keep the entire current path to return to exactly where we were
        decodedReturnUrl = currentPath;
      }

      // Navigate with state containing the payment status
      navigate(decodedReturnUrl, {
        state: { paymentStatus },
        replace: true, // Replace URL history
      });
      navigate(-1); // Modalı kapatmak için geri git

      // İşlem başarılı olduğunda modalı kapat
      helpers.setStatus({ success: true });
      helpers.setSubmitting(false);
    } catch (error) {
      console.error("Ödenecek kalem kaydedilirken hata:", error);
      helpers.setStatus({ success: false });
      helpers.setSubmitting(false);
      // Hata mesajını status olarak ayarla
      helpers.setStatus("Ödenecek kalem kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <ReusableModalForm<IPayableFormData>
      show={true}
      title="Ödenecek Ekle"
      fields={getFormFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel="Ekle"
      cancelButtonLabel="Vazgeç"
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose
      mode="single" // Tek sütun görünümü
    />
  );
};

export default PayableForm;

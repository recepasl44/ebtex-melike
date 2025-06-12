import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useExpenseAdd } from "../../../hooks/expences/main/useExpenseAdd";
import { useExpenseUpdate } from "../../../hooks/expences/main/useExpenseUpdate";
import { useExpenseShow } from "../../../hooks/expences/main/useExpenseShow";
import ReusableModalForm, {
  FieldDefinition,
} from "../../ReusableModalForm";
import { FormikHelpers, FormikValues } from "formik";
import { useCategoriesList } from "../../../hooks/expences/expenseCategories/useCategoriesList";

import { useSeasonsBranches } from "../../../header/hooks/useSeasonsBranches";
import { Modal } from "react-bootstrap";
import PaymentForm from "../paid/PaymentForm";

// Storage keys
const STORAGE_KEY = "expense_payable_options";
const PAYMENT_OPTIONS_KEY = "expense_payment_options";

// Interfaces
interface PayableItem {
  label: string;
  value: string;
}

interface PaymentItem {
  payment_method_id: number;
  pay_id: number;
}

interface IExpenseFormData extends FormikValues {
  supplier_id: number;
  season: number;
  branch: number;
  branch_id?: number;
  branch_name?: string;
  invoice_serial_no: string;
  due_date: string;
  expense_category_id: number;
  amount: number;
  description: string;
  status: string;
  payment_status?: string;
  pay_id?: number;
  payment_method_id?: number;
}

interface ExpenseModalProps {
  show: boolean;
  token?: string;
  onClose: () => void;
  onRefresh: () => void;
}

// Services
const StorageService = {
  parseData: (jsonString: string) => {
    if (!jsonString) return null;
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Veri ayrıştırılamadı:", error);
      return null;
    }
  },
};

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
  parseData: StorageService.parseData,
};

const PaymentStorageService = {
  getItems: () => {
    try {
      const storageData = localStorage.getItem(PAYMENT_OPTIONS_KEY);
      return storageData ? JSON.parse(storageData) : [];
    } catch (error) {
      console.error("Ödeme seçenekleri yüklenirken hata:", error);
      return [];
    }
  },

  saveItem: (item: PaymentItem) => {
    try {
      let items = PaymentStorageService.getItems();

      // Daha güvenilir bir kimlik kontrolü
      const existingIndex = items.findIndex(
        (i: any) =>
          i.pay_id === item.pay_id &&
          i.payment_method_id === item.payment_method_id
      );

      if (existingIndex >= 0) {
        items[existingIndex] = item;
      } else {
        items.push(item);
      }

      localStorage.setItem(PAYMENT_OPTIONS_KEY, JSON.stringify(items));
      return items;
    } catch (error) {
      console.error("Ödeme kaydedilirken hata:", error);
      return PaymentStorageService.getItems();
    }
  },

  getPaymentOptions: () => {
    try {
      const items = PaymentStorageService.getItems();
      return items.map((item: any) => ({
        label:
          item.label ||
          `Ödeme: ${item.payment_method_id || ""} - ${item.pay_id || ""}`,
        value: item.value || JSON.stringify(item),
        payment_method_id: item.payment_method_id,
        pay_id: item.pay_id,
      }));
    } catch (error) {
      console.error("Ödeme seçenekleri hazırlanırken hata:", error);
      return [];
    }
  },

  parseData: StorageService.parseData,
};

// Helpers
const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  if (dateString.includes("-")) return dateString;
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch (e) {
    console.error("Tarih formatı dönüştürülemedi:", e);
    return dateString;
  }
};

const parseNumericValue = (value: any): number => {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? 0 : parsed;
};

// Main Component
const ExpenseModal: React.FC<ExpenseModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const mode = id ? "update" : "add";
  const { selectedSeason, selectedBranch } = useSeasonsBranches();

  // States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState<any[]>([]);
  const [payableOptions, setPayableOptions] = useState<PayableItem[]>(() =>
    PayableStorageService.getItems()
  );
  const [initialValues, setInitialValues] = useState<IExpenseFormData>({
    supplier_id: 0,
    season: selectedSeason || 0,
    branch: selectedBranch || 0,
    invoice_serial_no: "",
    due_date: new Date().toISOString().split("T")[0],
    expense_category_id: 0,
    amount: 0,
    description: "",
    status: "ödendi",
    payment_status: "",
    pay_id: undefined,
    payment_method_id: undefined,
  });

  // Hooks
  const { addNewExpense, status: addStatus, error: addError } = useExpenseAdd();
  const {
    updateExistingExpense,
    status: updateStatus,
    error: updateError,
  } = useExpenseUpdate();
  const {
    expense,
    status: showStatus,
    error: showError,
    getExpense,
  } = useExpenseShow();
  const { categoriesData, loading: categoriesLoading } = useCategoriesList({
    enabled: true,
    page: 1,
    pageSize: 100,
    searchTerm: "",
  });

  // Process location state for payment and payable status
  useEffect(() => {
    if (location.state?.paymentStatus) {
      const paymentStatus = location.state.paymentStatus;
      const updatedOptions = PayableStorageService.saveItem(paymentStatus);
      setPayableOptions(updatedOptions);

      const payableData = PayableStorageService.parseData(paymentStatus.value);
      if (payableData) {
        setInitialValues((prev) => ({
          ...prev,
          status: "ödenecek",
          payment_status: paymentStatus.value,
          amount: payableData.amount || 0,
          due_date: payableData.due_date || prev.due_date,
          description: payableData.description || "",
        }));
      }
    }

    if (location.state?.paymentMethod) {
      const paymentMethod = location.state.paymentMethod;
      const options = PaymentStorageService.getPaymentOptions();
      setPaymentOptions(options);

      const paymentData = PaymentStorageService.parseData(paymentMethod.value);
      if (paymentData) {
        setInitialValues((prev) => ({
          ...prev,
          status: "ödendi",
          payment_status: paymentMethod.value,
          pay_id: paymentData.pay_id || prev.pay_id,
          payment_method_id:
            paymentData.payment_method_id || prev.payment_method_id,
          amount: paymentData.amount || prev.amount,
          description: paymentData.description || prev.description,
        }));
      }
    }

    // Clear the location state after processing
    window.history.replaceState({}, document.title);
  }, [location.state]);

  // Update form options when payment status changes
  useEffect(() => {
    if (initialValues.status) {
      if (initialValues.status === "ödendi") {
        // Load payment options from localStorage
        const options = PaymentStorageService.getPaymentOptions();
        setPaymentOptions(options);
      } else if (initialValues.status === "ödenecek") {
        // Load payable options from localStorage
        const options = PayableStorageService.getItems();
        setPayableOptions(options);
      }
    }
  }, [initialValues.status]);

  // Load options on component mount to ensure they're available
  useEffect(() => {
    // Pre-load all options when component mounts
    const payableOpts = PayableStorageService.getItems();
    const paymentOpts = PaymentStorageService.getPaymentOptions();
    setPayableOptions(payableOpts);
    setPaymentOptions(paymentOpts);
  }, []);

  // Handle payment success
  const handlePaymentSuccess = (paymentDetails: any) => {
    setInitialValues((prev) => ({
      ...prev,
      status: "ödendi",
      pay_id: paymentDetails.pay_id,
      payment_method_id: paymentDetails.payment_method_id,
      payment_status: JSON.stringify(paymentDetails),
      amount: paymentDetails.amount || prev.amount,
      description: paymentDetails.description || prev.description,
    }));

    const options = PaymentStorageService.getPaymentOptions();
    setPaymentOptions(options);
    setShowPaymentModal(false);
  };

  // Load expense data when in update mode
  useEffect(() => {
    if (mode === "update" && id) {
      getExpense(Number(id));
    }
  }, [mode, id, getExpense]);

  // Set form values when expense data is loaded
  useEffect(() => {
    if (mode === "update" && expense) {
      const userData = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData") || "{}")
        : {};

      setInitialValues({
        supplier_id: parseNumericValue(expense.supplier_id),
        season:
          parseNumericValue(expense.seasson_id) ||
          userData.default_season?.id ||
          0,
        branch:
          parseNumericValue(expense.branch_id) ||
          userData.default_branche?.id ||
          0,
        branch_id:
          parseNumericValue(expense.branch_id) ||
          userData.default_branche?.id ||
          0,
        branch_name:
          expense.branch_name || userData.default_branche?.name || "",
        invoice_serial_no: expense.invoice_serial_no || "",
        due_date:
          formatDate(expense.invoice_date) ||
          new Date().toISOString().split("T")[0],
        expense_category_id: parseNumericValue(expense.expense_category_id),
        amount: parseNumericValue(expense.amount),
        description: expense.description || "",
        status: expense.status || "ödenecek",
        payment_status: expense.payment_status || "",
        pay_id: expense.pay_id,
        payment_method_id: expense.payment_method_id,
      });
    }
  }, [mode, expense]);

  // Form fields definition
  const getFields = useCallback(
    (values: IExpenseFormData): FieldDefinition[] => {
      const basicFields: FieldDefinition[] = [
        {
          name: "supplier_id",
          label: "Tedarikçi",
          type: "number",
          required: true,
          min: 0,
        },
        {
          name: "season",
          label: "Sezon",
          type: "text",
          required: true,
          renderForm: () => {
            const userData = localStorage.getItem("userData")
              ? JSON.parse(localStorage.getItem("userData") || "{}")
              : {};
            const seasonName = userData.default_season?.name || "";
            return (
              <input
                type="text"
                className="form-control"
                value={seasonName}
                readOnly
              />
            );
          },
        },
        {
          name: "branch",
          label: "Şube",
          type: "text",
          required: true,
          renderForm: () => {
            const userData = localStorage.getItem("userData")
              ? JSON.parse(localStorage.getItem("userData") || "{}")
              : {};
            const branchName = userData.default_branche?.name || "";
            return (
              <input
                type="text"
                className="form-control"
                value={branchName}
                readOnly
              />
            );
          },
        },
        {
          name: "invoice_serial_no",
          label: "Fatura Seri No",
          type: "text",
          required: true,
          minLength: 1,
          maxLength: 50,
        },
        {
          name: "due_date",
          label: "Ödeme Tarihi",
          type: "date",
          required: true,
        },
        {
          name: "expense_category_id",
          label: "Gider Kategorisi",
          type: "select",
          required: true,
          plus: "/expensecrud/categories",
          options: categoriesData.map((category) => ({
            label: category.name,
            value: category.id,
          })),
        },
        {
          name: "amount",
          label: "Tutar",
          type: "currency",
          required: true,
          min: 0,
        },
        {
          name: "description",
          label: "Açıklama",
          type: "textarea",
          required: true,
          minLength: 2,
          maxLength: 500,
        },
        {
          name: "status",
          label: "Ödeme Durumu",
          type: "select",
          required: true,
          options: [
            { label: "Ödendi", value: "ödendi" },
            { label: "Ödenecek", value: "ödenecek" },
          ],
          onChange: (value, formik) => {
            formik.setFieldValue("status", value);
            formik.setFieldValue("payment_status", "");
            formik.setFieldValue("pay_id", undefined);
            formik.setFieldValue("payment_method_id", undefined);
            setTimeout(() => {
              formik.validateForm();
            }, 0);
          },
        },
      ];

      const conditionalFields: FieldDefinition[] = [];

      if (values.status === "ödendi") {
        conditionalFields.push({
          name: "payment_status",
          label: "Ödeme Yöntemi",
          type: "select",
          required: true,
          plus: "/expenses/payment",
          options: paymentOptions.length > 0 ? paymentOptions : [],
          onChange: (value, formik) => {
            if (!value) return;

            // Set payment_status field first
            formik.setFieldValue("payment_status", value);

            try {
              const paymentData = PaymentStorageService.parseData(value);
              if (paymentData) {
                // Update pay_id and payment_method_id from the selected option
                if (paymentData.pay_id) {
                  formik.setFieldValue("pay_id", paymentData.pay_id);
                }

                if (paymentData.payment_method_id) {
                  formik.setFieldValue(
                    "payment_method_id",
                    paymentData.payment_method_id
                  );
                }

                // Update amount and description if they haven't been manually changed
                if (
                  paymentData.amount !== undefined &&
                  !formik.touched.amount
                ) {
                  formik.setFieldValue("amount", paymentData.amount);
                }

                if (paymentData.description && !formik.touched.description) {
                  formik.setFieldValue("description", paymentData.description);
                }
              }
            } catch (error) {
              console.error("Ödeme detayları ayrıştırılırken hata:", error);
            }
          },
        });
      } else if (values.status === "ödenecek") {
        conditionalFields.push({
          name: "payment_status",
          label: "Ödenecek",
          type: "select",
          required: true,
          options: payableOptions,
          plus: "/expenses/payable",
          onChange: (value, formik) => {
            if (!value) return;

            // Set payment_status field first
            formik.setFieldValue("payment_status", value);

            try {
              const payableData = PayableStorageService.parseData(value);
              if (payableData) {
                // Update amount, due_date and description if they haven't been manually changed
                if (
                  payableData.amount !== undefined &&
                  !formik.touched.amount
                ) {
                  formik.setFieldValue("amount", payableData.amount);
                }

                if (payableData.due_date && !formik.touched.due_date) {
                  formik.setFieldValue("due_date", payableData.due_date);
                }

                if (payableData.description && !formik.touched.description) {
                  formik.setFieldValue("description", payableData.description);
                }
              }
            } catch (error) {
              console.error(
                "Ödenecek kalem verisi ayrıştırılırken hata:",
                error
              );
            }
          },
        });
      }

      return [...basicFields, ...conditionalFields];
    },
    [categoriesData, payableOptions, paymentOptions]
  );

  // Loading state
  const isLoading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" &&
      (updateStatus === "LOADING" || showStatus === "LOADING")) ||
    categoriesLoading;

  // Error state
  const combinedError = mode === "add" ? addError : updateError || showError;

  // Form submission
  const handleSubmit = async (
    values: IExpenseFormData,
    helpers: FormikHelpers<IExpenseFormData>
  ) => {
    try {
      const finalValues = { ...values };

      // Validate payment inputs
      if (values.status === "ödendi" && !values.payment_method_id) {
        helpers.setStatus("Ödeme yöntemi seçilmedi");
        return;
      } else if (values.status === "ödenecek" && !values.payment_status) {
        helpers.setStatus("Ödenecek kalem seçilmedi");
        return;
      }

      // Process payable data
      if (values.status === "ödenecek" && values.payment_status) {
        try {
          const payableData = PayableStorageService.parseData(
            values.payment_status
          );
          if (payableData) {
            finalValues.amount = payableData.amount || finalValues.amount;
            finalValues.description =
              payableData.description || finalValues.description;
            finalValues.due_date = payableData.due_date || finalValues.due_date;
            delete finalValues.payment_status;
          }
        } catch (e) {
          console.error("Ödenecek kalem verisi işlenirken hata:", e);
          helpers.setStatus("Ödenecek kalem verisi işlenirken bir hata oluştu");
          return;
        }
      }

      // Add user data
      const userData = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData") || "{}")
        : {};

      if (userData.default_season) {
        finalValues.season = userData.default_season.id || 0;
      }

      if (userData.default_branche) {
        finalValues.branch = userData.default_branche.id || 0;
        finalValues.branch_id = userData.default_branche.id || 0;
        finalValues.branch_name = userData.default_branche.name || "";
      }

      if (!finalValues.due_date) {
        finalValues.due_date = new Date().toISOString().split("T")[0];
      }

      // Prepare API payload
      const apiPayload = {
        ...finalValues,
        invoice_date: finalValues.due_date,
      };

      let result = null;

      if (mode === "add") {
        apiPayload.amount = parseNumericValue(apiPayload.amount);
        apiPayload.supplier_id = parseInt(String(apiPayload.supplier_id));
        apiPayload.season = parseInt(String(apiPayload.season));
        apiPayload.expense_category_id = parseInt(
          String(apiPayload.expense_category_id)
        );
        result = await addNewExpense(apiPayload);
      } else if (mode === "update" && id) {
        result = await updateExistingExpense({
          expenseId: Number(id),
          payload: apiPayload,
        });
      }

      if (result) {
        onRefresh();
        onClose();

        // Only navigate to expense list when adding a new expense
        if (mode === "add") {
          navigate("/expenses");
        }
        // For updates, stay on the current page
        // No navigation needed for update mode
      }
    } catch (error) {
      console.error("Gider kaydedilirken hata:", error);
      helpers.setStatus("Gider kaydedilirken bir hata oluştu");
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <>
      <ReusableModalForm<IExpenseFormData>
        show={show}
        title={mode === "add" ? "Gider Ekle" : "Gider Güncelle"}
        fields={(values) => getFields(values)}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
        cancelButtonLabel="Vazgeç"
        isLoading={isLoading}
        onClose={onClose}
        autoGoBackOnModalClose
        mode="single"
        error={combinedError}
        key={`${initialValues.status}-${initialValues.payment_status}`} // Form'u yeniden render etmek için key ekledik
      />

      {/* Ödeme Modalı */}
      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Ödeme Detayları</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentForm
            onClose={() => setShowPaymentModal(false)}
            onPaymentSuccess={handlePaymentSuccess}
            predefinedAmount={initialValues.amount}
            predefinedDescription={initialValues.description}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExpenseModal;

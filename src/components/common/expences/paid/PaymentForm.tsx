import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReusableModalForm, {
  FieldDefinition,
} from "../../ReusableModalForm";
import { FormikHelpers } from "formik";
import BankTransferForm from "./bank/BankForm";
import CreditCardForm from "./credit_card/CreditCardForm";
import OpenAccountForm from "./openAccount/OpenAccountForm";
import CheckForm from "./instruments/CheckForm";

// Payment method types
export enum PaymentType {
  BANK_TRANSFER = 7,
  OPEN_ACCOUNT = 2,
  CREDIT_CARD = 3,
  CHECK = 5,
}

// Payment data interface for the form
export interface IPaymentFormData {
  payment_type: string;
  payment_method_id: number;
}

// Payment details interface
export interface IPaymentDetails {
  pay_id: number;
  payment_method_id: number;
  payment_method_name: string;
  amount: number;
  description: string;
  [key: string]: any;
}

// Props interface for the PaymentForm component
interface PaymentFormProps {
  onClose: () => void;
  onPaymentSuccess?: (paymentDetails: IPaymentDetails) => void;
  show?: boolean;
  pay_id?: number;
  predefinedAmount?: number;
  predefinedDescription?: string;
}

// Format payment details for dropdown
const formatPaymentForDropdown = (paymentDetails: IPaymentDetails) => {
  try {
    const amount = paymentDetails.amount
      ? parseFloat(String(paymentDetails.amount)).toLocaleString("tr-TR") + " ₺"
      : "";
    const description = paymentDetails.description || "";
    const methodName = paymentDetails.payment_method_name || "";

    // Create a label for dropdown
    const label = `${methodName}${amount ? " - " + amount : ""}${description
        ? " - " +
        description.substring(0, 20) +
        (description.length > 20 ? "..." : "")
        : ""
      }`;

    return {
      label,
      value: JSON.stringify(paymentDetails),
      payment_method_id: paymentDetails.payment_method_id,
      pay_id: paymentDetails.pay_id,
    };
  } catch (error) {
    console.error("Ödeme detayı formatlanırken hata:", error);
    return {
      label: paymentDetails.payment_method_name || "Ödeme",
      value: JSON.stringify(paymentDetails),
      payment_method_id: paymentDetails.payment_method_id,
      pay_id: paymentDetails.pay_id,
    };
  }
};

// Main Payment Form Component
const PaymentForm: React.FC<PaymentFormProps> = ({
  onClose,
  onPaymentSuccess,
  show = true,
  pay_id,
  predefinedAmount,
  predefinedDescription,
}) => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState<number | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<
    { id: number; name: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load payment methods from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (
          parsedData?.payment_methods &&
          Array.isArray(parsedData.payment_methods)
        ) {
          setPaymentMethods(parsedData.payment_methods);
        }
      }
    } catch (error) {
      console.error("Ödeme yöntemleri yüklenirken hata:", error);
    }
  }, []);

  // Initial values for the payment type selector form
  const initialValues: IPaymentFormData = {
    payment_type: "",
    payment_method_id: 0,
  };

  // Form fields for payment type selection
  const getFormFields = (): FieldDefinition[] => [
    {
      name: "payment_type",
      label: "Ödeme Yöntemi",
      type: "select",
      required: true,
      options: paymentMethods
        .filter((method) => method?.id)
        .map((method) => ({
          label: method.name,
          value: method.id,
        })),
      onChange: (value) => setPaymentType(Number(value)),
    },
  ];

  // Form submission handler
  const handleSubmit = (
    values: IPaymentFormData,
    helpers: FormikHelpers<IPaymentFormData>
  ) => {
    if (!values.payment_type) {
      helpers.setStatus("Lütfen bir ödeme yöntemi seçin");
      return;
    }

    setIsLoading(true);
    setPaymentType(Number(values.payment_type));
    setIsLoading(false);
    helpers.setSubmitting(false);
  };

  // Handle payment success from child forms
  const handlePaymentSuccess = (details: any) => {
    const selectedPaymentMethod = paymentMethods.find(
      (method) => method.id === paymentType
    );

    const paymentMethodName = selectedPaymentMethod?.name || "";

    const paymentDetails: IPaymentDetails = {
      ...details,
      pay_id: pay_id || details.pay_id || 1,
      payment_method_id: paymentType as number,
      payment_method_name: paymentMethodName,
      amount: details.amount || predefinedAmount || 0,
      description:
        details.description ||
        predefinedDescription ||
        `${paymentMethodName} payment`,
    };

    // Format and save to localStorage for dropdown
    const formattedPayment = formatPaymentForDropdown(paymentDetails);
    savePaymentOptionToLocalStorage(formattedPayment);

    // Handle success callback or navigate
    if (onPaymentSuccess) {
      onPaymentSuccess(paymentDetails);
    } else {
      navigateToReturnUrl(formattedPayment, paymentDetails);
    }

    handleClose();
  };

  // Save payment option to localStorage
  const savePaymentOptionToLocalStorage = (formattedPayment: any) => {
    const dropdownStorageKey = "expense_payment_options";
    try {
      let paymentOptions = JSON.parse(
        localStorage.getItem(dropdownStorageKey) || "[]"
      );

      // Daha güvenilir bir kimlik kontrolü
      const existingIndex = paymentOptions.findIndex(
        (p: any) =>
          p.pay_id === formattedPayment.pay_id &&
          p.payment_method_id === formattedPayment.payment_method_id
      );

      if (existingIndex >= 0) {
        paymentOptions[existingIndex] = formattedPayment;
      } else {
        paymentOptions.push(formattedPayment);
      }

      localStorage.setItem(dropdownStorageKey, JSON.stringify(paymentOptions));

      // Konsola kayıt
    } catch (error) {
      console.error("Ödeme seçenekleri kaydedilirken hata:", error);
    }
  };

  // Navigate to return URL with payment details
  const navigateToReturnUrl = (
    formattedPayment: any,
    paymentDetails: IPaymentDetails
  ) => {
    const location = window.location;
    const urlParams = new URLSearchParams(location.search);
    let returnUrl = urlParams.get("returnUrl") || "/expensecrud";

    // Check if we were on an update page (with ID) and preserve the ID in the URL
    // Example: if we were on /expensecrud/68, return to /expensecrud/68 instead of just /expensecrud
    const currentPath = window.location.pathname;
    const match = currentPath.match(/\/expensecrud\/(\d+)/);
    if (match && match[1]) {
      const expenseId = match[1];
      returnUrl = `/expensecrud/${expenseId}`;
    }

    navigate(returnUrl, {
      state: {
        paymentMethod: {
          label: formattedPayment.label,
          value: JSON.stringify(paymentDetails),
          payment_method_id: paymentType,
          pay_id: pay_id || paymentDetails.pay_id || 1,
        },
        returnToModal: true,
      },
      replace: true,
    });
  };

  // Handle close and navigation
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      const location = window.location;
      const urlParams = new URLSearchParams(location.search);
      let returnUrl = urlParams.get("returnUrl") || "/expensecrud";

      // Check if we were on an update page (with ID) and preserve the ID in the URL
      const currentPath = window.location.pathname;
      const match = currentPath.match(/\/expensecrud\/(\d+)/);
      if (match && match[1]) {
        const expenseId = match[1];
        returnUrl = `/expensecrud/${expenseId}`;
      }

      navigate(returnUrl, {
        state: { returnToModal: true },
        replace: true,
      });
    }
  };

  // Render the selected payment form component
  const renderPaymentForm = () => {
    const commonProps = {
      onClose: handleClose,
      onPaymentSuccess: handlePaymentSuccess,
    };

    switch (paymentType) {
      case PaymentType.BANK_TRANSFER:
        return <BankTransferForm {...commonProps} />;
      case PaymentType.CREDIT_CARD:
        return <CreditCardForm {...commonProps} />;
      case PaymentType.OPEN_ACCOUNT:
        return <OpenAccountForm {...commonProps} />;
      case PaymentType.CHECK:
        return <CheckForm {...commonProps} />;
      default:
        return (
          <ReusableModalForm<IPaymentFormData>
            show={show}
            title="Ödeme Yap"
            fields={getFormFields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel="Devam Et"
            cancelButtonLabel="Vazgeç"
            onClose={handleClose}
            hideButtons={false}
            mode="single"
            isLoading={isLoading}
          />
        );
    }
  };

  return renderPaymentForm();
};

export default PaymentForm;

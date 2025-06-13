import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../ReusableModalForm";
import { DiscountType } from "../../../../../enums/discounts/list";
import { useDiscountAdd } from "../../../../hooks/discounts/useAdd";
import { useDiscountUpdate } from "../../../../hooks/discounts/useUpdate";
import { useDiscountDetail } from "../../../../hooks/discounts/useDetail";

interface DiscountModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
  token?: string;
}

interface IDiscountFormData extends FormikValues {
  name: string;
  type: number; // 0: percentage/ratio discount, 1: fixed amount
  discount_type: number; // 0: non-bulk discount, 1: bulk discount
  service_id: number;
  amount: string;
}

const DiscountModal: React.FC<DiscountModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<IDiscountFormData>({
    name: "",
    type: 0,
    discount_type: 0,
    service_id: 0,
    amount: "",
  });

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Ad",
        type: "text",
        required: true,
      },
      {
        name: "amount",
        label: "Ücret",
        type: "currency",
        required: true,
      },
      {
        name: "type",
        label: "İndirim Türü",
        type: "select",
        options: [
          { value: DiscountType.PERCENTAGE, label: "Yüzde(%)" },
          { value: DiscountType.AMOUNT, label: "Tutar(+)" },
        ],
        required: true,
      },
      {
        name: "discount_type",
        label: "İndirim Türü",
        type: "select",
        options: [
          { value: DiscountType.GENERAL, label: "Genel" },
          { value: DiscountType.PERIODIC, label: "Dönemsel" },
        ],
        required: true,
      },
    ];
  };

  const {
    addNewDiscount,
    status: addStatus,
    error: addError,
  } = useDiscountAdd();

  const {
    updateExistingDiscount,
    status: updateStatus,
    error: updateError,
  } = useDiscountUpdate();

  const {
    discount: fetchDiscount,
    getDiscount,
    status: showStatus,
    error: showError,
  } = useDiscountDetail();

  useEffect(() => {
    if (id && mode === "update") {
      getDiscount(Number(id));
    }
  }, [id, mode, getDiscount]);

  useEffect(() => {
    if (mode === "update" && fetchDiscount) {
      setInitialValues({
        name: fetchDiscount.name,
        type: fetchDiscount.type || 0,
        discount_type: fetchDiscount.discount_type || 0,
        service_id: fetchDiscount.service_id || 0,
        // Sayısal değeri Türkçe formatına çevirerek göster
        amount: fetchDiscount.amount,
      });
    }
  }, [mode, fetchDiscount]);

  // loading and error handling
  const loading =
    mode === "add"
      ? addStatus === "LOADING"
      : updateStatus === "LOADING" || showStatus === "LOADING";
  const error =
    mode === "add"
      ? addError
      : mode === "update"
        ? updateError || showError
        : null;

  async function handleSubmit(
    values: IDiscountFormData,
    _helpers: FormikHelpers<IDiscountFormData>
  ) {
    try {
      const payload = {
        ...values,
        amount: values.amount,
      };

      if (mode === "add") {
        await addNewDiscount(payload);
      } else if (mode === "update") {
        await updateExistingDiscount({
          discountId: Number(id),
          payload,
        });
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <ReusableModalForm
      show={show}
      title={mode === "add" ? "İndirim Ekle" : "İndirimi Güncelle"}
      fields={getFields()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={error || null}
      autoGoBackOnModalClose={true}
      onClose={onClose}
    />
  );
};

export default DiscountModal;

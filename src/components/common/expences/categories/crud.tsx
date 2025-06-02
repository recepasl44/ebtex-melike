import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useExpenseCategoryAdd } from "../../../hooks/expences/expenseCategories/useCategoriesAdd";
import { useExpenseCategoryUpdate } from "../../../hooks/expences/expenseCategories/useCategoriesUpdate";
import { useCategoriesShow } from "../../../hooks/expences/expenseCategories/useCategoriesShow";
import ReusableModalForm, {
  FieldDefinition,
} from "../../ReusableModalForm";
import { FormikHelpers, FormikValues } from "formik";

interface IExpenseCategoryFormData extends FormikValues {
  name: string;
  description?: string;
}

interface ExpenseCategoryModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

const ExpenseCategoryModal: React.FC<ExpenseCategoryModalProps> = ({ }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<IExpenseCategoryFormData>({
    name: "",
    description: "",
  });

  // Field definitions for the form
  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Gider Kalemi Adı",
        type: "text",
        required: true,
      },
      {
        name: "description",
        label: "Açıklama",
        type: "textarea",
      },
    ];
  };

  const {
    addNewExpenseCategory,
    status: addStatus,
    error: addError,
  } = useExpenseCategoryAdd();
  const {
    updateExistingExpenseCategory,
    status: updateStatus,
    error: updateError,
  } = useExpenseCategoryUpdate();
  const {
    expenseCategories: fetchExpenseCategories,
    status: showStatus,
    error: showError,
    getExpenseCategories,
  } = useCategoriesShow();

  useEffect(() => {
    if (mode === "update" && id) {
      getExpenseCategories(Number(id));
    }
  }, [mode, id, getExpenseCategories]);

  useEffect(() => {
    if (mode === "update" && fetchExpenseCategories) {
      setInitialValues({
        name: fetchExpenseCategories.name,
        description: fetchExpenseCategories.description || "",
      });
    }
  }, [mode, fetchExpenseCategories]);

  const isLoading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" &&
      (updateStatus === "LOADING" || showStatus === "LOADING"));
  const combinedError =
    mode === "add"
      ? addError
      : mode === "update"
        ? updateError || showError
        : null;

  async function handleSubmit(
    values: IExpenseCategoryFormData,
    _helpers: FormikHelpers<IExpenseCategoryFormData>
  ) {
    try {
      if (mode === "add") {
        await addNewExpenseCategory(values);
      } else if (mode === "update" && id) {
        await updateExistingExpenseCategory({
          expenseCategoryId: Number(id),
          payload: values,
        });
      }
      // İşlem başarılı olduğunda kategori listesine geri dön
      navigate("/expensecrud/categories");
    } catch (error) {
      console.error("Error saving category:", error);
    }
  }

  return (
    <ReusableModalForm<IExpenseCategoryFormData>
      show={true}
      title={mode === "add" ? "Gider Kalemi Ekle" : "Gider Kalemi Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={isLoading}
      error={combinedError || null}
      onClose={() => navigate("/expensecrud/categories")}
      autoGoBackOnModalClose
    />
  );
};

export default ExpenseCategoryModal;

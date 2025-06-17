import { useParams } from "react-router-dom";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../../ReusableModalForm";
import { useEffect, useState } from "react";
import { useServiceTypeAdd } from "../../../../../hooks/serviceTypes/useAdd";
import { useServiceTypeUpdate } from "../../../../../hooks/serviceTypes/useUpdate";
import { FormikHelpers, FormikValues } from "formik";
import { useServiceTypeDetail } from "../../../../../hooks/serviceTypes/useDetail";

interface ServiceTypeModalProps extends FormikValues {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
  token?: string;
}

interface IServiceTypeFormData {
  servicetypeId?: number;
  name?: string;
}

const ServiceTypeModal: React.FC<ServiceTypeModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<IServiceTypeFormData>({
    servicetypeId: 0,
    name: "",
  });

  // Field definitions for the form
  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Hizmet Adı",
        type: "text",
        placeholder: "Hizmet adı...",
        required: true,
      },
    ];
  };

  const {
    addNewServicetype,
    status: addStatus,
    error: addError,
  } = useServiceTypeAdd();

  const {
    updateExistingServicetype,
    status: updateStatus,
    error: updateError,
  } = useServiceTypeUpdate();

  const {
    getServicetype,
    status: showStatus,
    error: showError,
  } = useServiceTypeDetail();

  useEffect(() => {
    if (mode === "update" && id) {
      getServicetype(parseInt(id)).then((data) => {
        if (data) {
          setInitialValues({
            servicetypeId: parseInt(id),
            name: data.name,
          });
        }
      });
    }
  }, [mode, id, getServicetype]);

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

  // handle form submission
  async function handleSubmit(
    values: IServiceTypeFormData,
    _helpers: FormikHelpers<IServiceTypeFormData>
  ) {
    try {
      if (mode === "add") {
        await addNewServicetype({
          name: values.name,
        });
      } else if (mode === "update") {
        await updateExistingServicetype({
          servicetypeId: Number(id),
          payload: {
            name: values.name,
          },
        });
        onRefresh();
        onClose();
      }
    } catch (error) {
      console.error("Error adding service type:", error);
    }
  }
  return (
    <>
      <ReusableModalForm
        show={show}
        title={mode === "add" ? "Hizmet Türü Ekle" : "Hizmet Türünü Güncelle"}
        fields={getFields()}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
        cancelButtonLabel="Vazgeç"
        isLoading={loading}
        error={error || null}
        autoGoBackOnModalClose={true}
        onClose={onClose}
        modalSize="md"
      />
    </>
  );
};

export default ServiceTypeModal;

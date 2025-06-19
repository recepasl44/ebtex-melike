import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useServiceTypeAdd } from "../../../../../hooks/serviceTypes/useAdd";
import { useServiceTypeUpdate } from "../../../../../hooks/serviceTypes/useUpdate";
import { useServiceTypeDetail } from "../../../../../hooks/serviceTypes/useDetail";
import { FormikHelpers, FormikValues } from "formik";

interface ServiceTypeModalProps extends FormikValues {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
  servicetypeId?: number; // ✅ dışarıdan prop olarak destekledik
}

interface IServiceTypeFormData {
  servicetypeId?: number;
  name?: string;
}

const ServiceTypeModal: React.FC<ServiceTypeModalProps> = ({
  show,
  onClose,
  onRefresh,
  servicetypeId, // dışarıdan gelen props
}) => {
  const routeParams = useParams<{ id?: string }>();

  // ✅ önce props varsa onu al, yoksa route paramı
  const id = servicetypeId ?? (routeParams.id ? parseInt(routeParams.id) : undefined);
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<IServiceTypeFormData>({
    servicetypeId: 0,
    name: "",
  });

  const { addNewServicetype, status: addStatus, error: addError } = useServiceTypeAdd();
  const { updateExistingServicetype, status: updateStatus, error: updateError } = useServiceTypeUpdate();
  const { getServicetype, status: showStatus, error: showError } = useServiceTypeDetail();

  useEffect(() => {
    if (mode === "update" && id) {
      getServicetype(id).then((data) => {
        if (data) {
          setInitialValues({
            servicetypeId: id,
            name: data.name,
          });
        }
      });
    }
  }, [mode, id, getServicetype]);

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

  const getFields = (): FieldDefinition[] => [
    {
      name: "name",
      label: "Hizmet Adı",
      type: "text",
      placeholder: "Hizmet adı...",
      required: true,
    },
  ];

  async function handleSubmit(
    values: IServiceTypeFormData,
    _helpers: FormikHelpers<IServiceTypeFormData>
  ) {
    try {
      if (mode === "add") {
        await addNewServicetype({ name: values.name });
      } else if (mode === "update" && id) {
        await updateExistingServicetype({
          servicetypeId: id,
          payload: { name: values.name },
        });
        onRefresh();
        onClose();
      }
    } catch (error) {
      console.error("Error in ServiceTypeModal:", error);
    }
  }

  return (
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
      modalSize="sm"
    />
  );
};

export default ServiceTypeModal;

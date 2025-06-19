import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReusableModalForm from "../../ReusableModalForm";
import { useUpdateStudent } from "../../../hooks/student/useUpdateStudent";
import { useShowStudent } from "../../../hooks/student/useShowStudent";
import { useAddStudent } from "../../../hooks/student/useAddStudent";
import { getPreRegisterFields } from "./crudField";
import { useRegisterNo } from "../../../hooks/student/useRegisterNo";
import { formatDateForApi } from "../../../../utils/formatters";
interface StudentModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}
interface IStudentForm extends FormikValues {
  first_name?: string;
  last_name?: string;
  identification_no?: string;
  gender_id?: number;
  program_id?: number;
  level_id?: number;
  phone?: string;
  nationality_id?: number;
  email?: string;
  branche_id?: number;
  register_no?: string;
  register_date?: string;
  birthday?: string;
  additional_information_1?: string;
  additional_information_2: string;
  financial_status: string;
  mobile_phone?: string;
  address_id: number;
  address: {
    country_id: number;
    city_id: number;
    county_id: number;
    district_id: number;
    address: string;
  };
  parent_id?: number;
  guardian: {
    is_alive?: boolean;
    is_parent?: boolean;
    kinship_id?: number;
    kinship?: string;
    identification_no?: string;
    full_name?: string;
    phone?: string;
  };
}
const StudentModal: React.FC<StudentModalProps> = ({ onClose, onRefresh }) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  // add / update hook’ları
  const { status: addStatus, error: addError, createStudent } = useAddStudent();

  const {
    editStudent,
    status: updateStatus,
    error: updateError,
  } = useUpdateStudent();
  // show (detay) hook’u
  const {
    status: showStatus,
    error: showError,
    fetchStudent,
    student: fetchedStudentDetails,
  } = useShowStudent();

  const [initialValues, setInitialValues] = useState<IStudentForm>({
    first_name: "",
    last_name: "",
    school_id: 0,
    identification_no: "",
    nationality_id: 0,
    gender_id: 0,
    program_id: 0,
    level_id: 0,
    phone: "",
    email: "",
    branche_id: 0,
    register_no: "",
    register_date: formatDateForApi(new Date()),
    birthday: "",
    additional_information_2: "",
    financial_status: "",
    mobile_phone: "",
    additional_information_1: "",
    address_id: 0,
    //adres bilgileri
    address: {
      country_id: 0,
      city_id: 0,
      county_id: 0,
      district_id: 0,
      address: "",
    },
    parent_id: 0,
    guardian: {
      is_alive: false,
      is_parent: false,
      kinship_id: 0,
      kinship: "",
      identification_no: "",
      full_name: "",
      phone: "",
    },
  });

  const { registerNo } = useRegisterNo();

  useEffect(() => {
    if (registerNo && mode === "add") {
      setInitialValues((prev) => ({
        ...prev,
        register_no: registerNo.register_no || '',
      }));
    }
  }, [registerNo, mode]);

  useEffect(() => {
    if (mode === "update" && id) {
      fetchStudent(Number(id));
    }
  }, [mode, id, fetchStudent]);

  useEffect(() => {
    if (mode === "update" && fetchedStudentDetails) {
      setInitialValues({
        first_name: fetchedStudentDetails.first_name || "",
        last_name: fetchedStudentDetails.last_name || "",
        identification_no: fetchedStudentDetails.identification_no || "",
        gender_id: fetchedStudentDetails.gender_id || 0,
        program_id: fetchedStudentDetails.program_id || 0,
        level_id: fetchedStudentDetails.level_id || 0,
        phone: fetchedStudentDetails.phone || "",
        email: fetchedStudentDetails.email || "",
        nationality_id: fetchedStudentDetails.nationality_id || 0,
        branche_id: fetchedStudentDetails.branche_id || 0,
        register_no: fetchedStudentDetails.register_no || "",
        register_date:
          formatDateForApi(fetchedStudentDetails.register_date) ||
          formatDateForApi(new Date()),
        birthday: fetchedStudentDetails.birthday || "",
        nationality: fetchedStudentDetails.nationality || "",
        additional_information_2:
          fetchedStudentDetails.additional_information_2 || "",
        financial_status: fetchedStudentDetails.financial_status || "",
        mobile_phone: fetchedStudentDetails.mobile_phone || "",
        additional_information_1:
          fetchedStudentDetails.additional_information_1 || "",
        address_id: fetchedStudentDetails.address_id || 0,
        address: {
          country_id: fetchedStudentDetails.address?.country_id || 0,
          city_id: fetchedStudentDetails.address?.city_id || 0,
          county_id: fetchedStudentDetails.address?.county_id || 0,
          district_id: fetchedStudentDetails.address?.district_id || 0,
          address: fetchedStudentDetails.address?.address || "",
        },
        parent_id: fetchedStudentDetails.parent_id || 0,
        guardian: {
          is_alive: fetchedStudentDetails.guardian?.is_alive || false,
          is_parent: fetchedStudentDetails.guardian?.is_parent || false,
          kinship_id: fetchedStudentDetails.guardian?.kinship_id || 0,
          kinship: fetchedStudentDetails.guardian?.kinship || "",
          identification_no:
            fetchedStudentDetails?.guardian?.identification_no
              ? String(fetchedStudentDetails.guardian.identification_no)
              : "",
          full_name: fetchedStudentDetails.guardian?.full_name || "",
          phone: fetchedStudentDetails.guardian?.phone || "",
        },
      });
    }
  }, [mode, fetchedStudentDetails]);

  // Loading & error
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
    values: IStudentForm,
    _helpers: FormikHelpers<IStudentForm>
  ) {
    try {
      if (mode === "add") {
        console.log("Ekle modunda değerler:", values);
        await createStudent(values as unknown as AddStudentPayload);
      } else if (mode === "update" && id) {
        await editStudent({
          studentId: Number(id),
          payload: values,
        });
      }
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Hata detayları:", err);
    }
  }

  return (
    <ReusableModalForm
      show={true}
      title={mode === "add" ? "Kayıt Ekle" : "Kayıt Güncelle"}
      fields={getPreRegisterFields}
      mode={"single"}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={error || null}
      autoGoBackOnModalClose={true}
      onClose={onClose}
    />
  );
};

export default StudentModal;

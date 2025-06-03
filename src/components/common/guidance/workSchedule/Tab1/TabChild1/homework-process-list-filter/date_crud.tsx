import { FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../../../ReusableModalForm";
import { usePeriodAdd } from "../../../../../../hooks/periods/useAdd";
import getUserDataField from "../../../../../../../utils/user_data_field";

interface PeriodDateFormData extends FormikValues {
  start_date: string;
  end_date: string;
  student_id: string;
  teacher_id: number;
}

interface PeriodDateModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const PeriodDateCrud: React.FC<PeriodDateModalProps> = ({ show, onClose }) => {
  const [initialValues, setInitialValues] = useState<PeriodDateFormData>({
    start_date: "",
    end_date: "",
    student_id: "",
    teacher_id: 0,
  });
  const navigate = useNavigate();

  const { me } = getUserDataField();

  useEffect(() => {
    const storedId =
      localStorage.getItem(
        "01100001 01100010 01110101 01111010 01100101 01110010 01101011 01101111 01101101 01110101 01110010 01100011 01110101"
      ) || "";
    setInitialValues((prev) => ({ ...prev, student_id: storedId }));
    console.log(storedId);
  }, []);

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "start_date",
        label: "Başlangıç Tarihi",
        type: "date" as const,
        required: true,
      },
      {
        name: "end_date",
        label: "Bitiş Tarihi",
        type: "date" as const,
        required: true,
      },
    ];
  };

  const { addNewPeriod } = usePeriodAdd();

  const handleSubmit = (values: PeriodDateFormData) => {
    try {
      const payload = {
        start_date: values.start_date || "",
        end_date: values.end_date || "",
        student_id: values.student_id || "",
        teacher_id: me?.value || 0,
      };
      addNewPeriod(payload);
    } catch (error) {
      console.error("Error adding period:", error);
    }
  };

  return (
    <ReusableModalForm<PeriodDateFormData>
      show={show}
      title={"Periyot Ekle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={"Kaydet"}
      cancelButtonLabel="İptal"
      onClose={onClose}
      buttonVoid={() => {
        // Ders ekleme sayfasına yönlendir
        navigate(
          "/guidance/work-schedule/Tab1/TabChild1/homework-process-list-filter/crud"
        );
      }}
      buttonText="Ders Ekle"
      mode="single"
    />
  );
};

export default PeriodDateCrud;

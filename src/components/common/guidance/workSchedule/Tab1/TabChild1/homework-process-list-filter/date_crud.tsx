import { FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
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
    const storedId = localStorage.getItem("selected_student_id") || "";
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
      mode="single"
    >
      <div className="d-flex justify-content-end">
        <Button
          variant="outline-secondary"
          onClick={() =>
            navigate(
              "/guidance/work-schedule/Tab1/TabChild1/homework-process-list-filter/crud"
            )
          }
        >
          Ders Ekle
        </Button>
      </div>
    </ReusableModalForm>
  );
};

export default PeriodDateCrud;

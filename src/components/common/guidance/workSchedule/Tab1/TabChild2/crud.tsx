import { FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../../ReusableModalForm";
import { useGuardianMeetingAdd } from "../../../../../hooks/guardianMeeting/useAdd";
import { useGuardianMeetingUpdate } from "../../../../../hooks/guardianMeeting/useUpdate";
import { useGuardianMeetingDetail } from "../../../../../hooks/guardianMeeting/useDetail";

interface GuardianMeetingFormData extends FormikValues {
  teacher_id: number;
  student_id?: number;
  status?: number; // //Dururm 0:Yapmadı, 1:Yapıldı, 2:Gelmedi, 3:Eksik, 4:Edilmedi
}

interface GuardianMeetingModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const ScheduledMeetingCrud: React.FC<GuardianMeetingModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<GuardianMeetingFormData>({
    teacher_id: 0,
    student_id: 0,
    meeting_type: 0,
    working_time: 0,
    meeting_date: "",
    notes: "",
    status: mode === "add" ? 2 : 0,
  });

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "meeting_date",
        label: "Tarih/Saat",
        type: "date",
      },
      {
        name: "teacher_id",
        label: "Rehber Öğretmen",
        type: "select",
      },
      {
        name: "student_id",
        label: "Öğrenci",
        type: "select",
      },
      {
        name: "meeting_type",
        label: "Görüşme Türü",
        type: "select",
        options: [
          { label: "Yüzyüze", value: 1 },
          { label: "Telefon", value: 2 },
          { label: "Online", value: 3 },
        ],
      },
      {
        name: "working_time", // öğrenilecek
        label: "Görüşme Süresi (dk)",
        type: "number",
        placeholder: "Dakika cinsinden",
      },
      {
        name: "status",
        label: "Durum",
        type: "select",
        options: [
          { label: "Yapıldı", value: 1 },
          { label: "Eksik", value: 2 },
        ],
      },
      {
        name: "notes",
        label: "Görüşme Detayı",
        type: "text",
      },
    ];
  };

  const {
    addNewGuardianMeeting,
    status: addStatus,
    error: addError,
  } = useGuardianMeetingAdd();
  const {
    updateExistingGuardianMeeting,
    status: updateStatus,
    error: updateError,
  } = useGuardianMeetingUpdate();

  const {
    guardianMeeting: fetchGuardianMeeting,
    status: showStatus,
    error: showError,
    getGuardianMeeting,
  } = useGuardianMeetingDetail();

  useEffect(() => {
    if (mode === "update" && id) {
      getGuardianMeeting(Number(id));
    }
  }, [mode, id, getGuardianMeeting]);

  useEffect(() => {
    if (mode === "update" && fetchGuardianMeeting) {
      setInitialValues({
        meeting_date: fetchGuardianMeeting.meeting_date || "",
        teacher_id: fetchGuardianMeeting.teacher_id || 0,
        student_id: fetchGuardianMeeting.student_id || 0,
        meeting_type: fetchGuardianMeeting.meeting_type || 0,
        working_time: fetchGuardianMeeting.working_time || 0,
        notes: fetchGuardianMeeting.notes || "",
        status: fetchGuardianMeeting.status || 0,
      });
    }
  }, [mode, fetchGuardianMeeting]);

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

  const handleSubmit = async (values: GuardianMeetingFormData) => {
    try {
      const payload = {
        teacher_id: Number(values.teacher_id || 0),
        lesson_id: Number(values.lesson_id || 0),
        unit_id: Number(values.unit_id || 0),
        chapter_id: Number(values.chapter_id || 0),
        topic_id: Number(values.topic_id || 0),
        source_id: Number(values.source_id || 0),
        number_of_questions: Number(values.number_of_questions || 0),
        working_time: values.working_time?.toString() || "",
        start_date: values.start_date || "",
        end_date: values.end_date || "",
        description: values.description || "",
        status: Number(values.status || (mode === "add" ? 2 : 0)),
      };

      if (mode === "add") {
        await addNewGuardianMeeting(payload);
      } else if (mode === "update" && id) {
        await updateExistingGuardianMeeting({
          guardianMeetingId: Number(id),
          payload,
        });
      }

      onRefresh();
      onClose();
    } catch (error) {
      console.error("Form gönderme hatası:", error);
    }
  };

  return (
    <ReusableModalForm<GuardianMeetingFormData>
      show={show}
      title={mode === "add" ? "Görüşme Ekle" : "Görüşme Düzenle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      isLoading={isLoading}
      error={combinedError || null}
      onClose={onClose}
      mode="double"
    />
  );
};

export default ScheduledMeetingCrud;

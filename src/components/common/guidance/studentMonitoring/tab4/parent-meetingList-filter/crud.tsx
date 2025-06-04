import { FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../../ReusableModalForm";
import { useListStudents } from "../../../../../hooks/student/useList";
import { useGuardianMeetingDetail } from "../../../../../hooks/guardianMeeting/useDetail";
import { useGuardianMeetingAdd } from "../../../../../hooks/guardianMeeting/useAdd";
import { useGuardianMeetingUpdate } from "../../../../../hooks/guardianMeeting/useUpdate";
import { IStudent } from "../../../../../../types/student/list";
import { useGuardiansTable } from "../../../../../hooks/guardian/useList";

interface GuardianMeetingData extends FormikValues {
  id: number;
  student_id: number;
  student: IStudent | null;
  guardian_id: number | null;
  guardian: any | null;
  teacher_id: number | null;
  teacher: any | null;
  subject: string | null;
  suggestions: string | null;
  guardian_requests: string | null;
  satisfaction_status: string | null;
  meeting_type: number;
  meeting_date: string | null;
  notes: string | null;
  status: number;
  lesson_id?: number;
  lesson?: any;
  title?: string;
  description?: string;
  observation_date?: string;
}

interface ObservationModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const GuardianMeetingCrud: React.FC<ObservationModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  const [guardianId, setGuardianId] = useState<number>();

  const [initialValues, setInitialValues] = useState<GuardianMeetingData>({
    id: 0,
    student_id: 0,
    student: null,
    guardian_id: null,
    guardian: null,
    teacher_id: null,
    teacher: null,
    subject: "",
    suggestions: "",
    guardian_requests: "",
    satisfaction_status: "",
    meeting_type: 0,
    meeting_date: null,
    notes: "",
    status: 0,
    lesson_id: 0,
    lesson: null,
    title: "",
    description: "",
    observation_date: "",
  });

  const { updateExistingGuardianMeeting } = useGuardianMeetingUpdate();
  const { addNewGuardianMeeting } = useGuardianMeetingAdd();

  const { guardiansData } = useGuardiansTable({
    enabled: true,
    page: 1,
    pageSize: 100,
  });

  const { data: studentNameData } = useListStudents({
    enabled: guardianId ? true : false,
    first_name: "",
    guardian_id: guardianId,
    page: 1,
    pageSize: 100,
  });

  const {
    guardianMeeting: fetchedMeeting,
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
    if (mode === "update" && fetchedMeeting) {
      setInitialValues({
        id: fetchedMeeting.id,
        student_id: fetchedMeeting.student_id,
        student: fetchedMeeting.student,
        guardian_id: fetchedMeeting.guardian_id,
        guardian: fetchedMeeting.guardian,
        teacher_id: fetchedMeeting.teacher_id,
        teacher: fetchedMeeting.teacher,
        subject: fetchedMeeting.subject || "",
        suggestions: fetchedMeeting.suggestions || "",
        guardian_requests: fetchedMeeting.guardian_requests || "",
        satisfaction_status: fetchedMeeting.satisfaction_status || "",
        meeting_type: fetchedMeeting.meeting_type,
        meeting_date: fetchedMeeting.meeting_date,
        notes: fetchedMeeting.notes || "",
        status: fetchedMeeting.status,
        title: fetchedMeeting.subject || "",
        description: fetchedMeeting.notes || "",
        observation_date: fetchedMeeting.meeting_date || "",
      });
    }
  }, [mode, fetchedMeeting]);

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "meeting_date",
        label: "Tarih",
        type: "date",
        required: true,
      },
      {
        name: "guardian_id",
        label: "Veli Adı Soyadı",
        type: "select",
        options: guardiansData.map((guardian) => ({
          label: `${guardian.full_name}`,
          value: guardian.id,
        })),
        onClick: (value: number) => {
          setGuardianId(value);
          setInitialValues((prev) => ({
            ...prev,
            student_id: 0,
            student: null,
          }));
        },
      },
      {
        name: "student_id",
        label: "Öğrenci Adı Soyadı",
        type: "select",
        options:
          studentNameData?.map((student) => ({
            label: `${student.first_name} ${student.last_name}`,
            value: student.id,
          })) || [],
        required: true,
      },
      {
        name: "subject",
        label: "İletişim Konu",
        type: "text",
        required: true,
      },
      {
        name: "kinship_id",
        label: "Görüşmeyi Yapan Kişi",
        type: "select",
        required: true,
        options: [
          { label: "Anne", value: 0 },
          { label: "Baba", value: 1 },
          { label: "Diğer", value: 2 },
        ],
      },
      {
        name: "suggestions",
        label: "Öneriler",
        type: "text",
      },
      {
        name: "guardian_requests",
        label: "Veli İstekleri",
        type: "text",
      },
      {
        name: "satisfaction_status",
        label: "Memnuniyet Durumu",
        type: "text",
      },
      {
        name: "meeting_type",
        label: "Görüşme Türü",
        type: "select",
        options: [
          { label: "Yüzyüze", value: 0 },
          { label: "Telefon", value: 1 },
          { label: "Hepsi", value: 2 },
        ],
      },
      {
        name: "notes",
        label: "Notlar",
        type: "text",
      },
    ];
  };

  const handleSubmit = async (values: GuardianMeetingData) => {
    try {
      const payload = {
        student_id: values.student_id,
        guardian_id: values.guardian_id || undefined,
        full_name: values.guardian?.full_name || "",
        teacher_id: values.teacher_id || undefined,
        subject: values.subject || "",
        suggestions: values.suggestions || "",
        guardian_requests: values.guardian_requests || "",
        satisfaction_status: values.satisfaction_status || "",
        meeting_type: values.meeting_type || 0,
        meeting_date: values.meeting_date || undefined,
        notes: values.notes || "",
        status: Number(values.status || (mode === "add" ? 1 : 0)),
      };
      let result;
      if (mode === "add") {
        result = await addNewGuardianMeeting(payload);
      } else if (mode === "update" && id) {
        result = await updateExistingGuardianMeeting({
          guardianMeetingId: Number(id),
          payload,
        });
      }

      if (result) {
        onRefresh();
        onClose();
      } else {
        throw new Error("İşlem başarısız oldu");
      }
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };
  return (
    <ReusableModalForm<GuardianMeetingData>
      show={show}
      title={mode === "add" ? "Gözlem Ekle" : "Gözlem Düzenle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      cancelButtonLabel="İptal"
      isLoading={showStatus === "LOADING"}
      error={showError || null}
      onClose={onClose}
      mode="single"
    />
  );
};

export default GuardianMeetingCrud;

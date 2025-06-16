import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useMeetingAdd } from "../../../hooks/meetings/useAdd";
import { useMeetingUpdate } from "../../../hooks/meetings/useUpdate";
import { useMeetingDetail } from "../../../hooks/meetings/useDetail";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { MeetingListType } from "../../../../enums/meetings/list";
import getUserDataField from "../../../../utils/user_data_field";
import { usePersonnelTable } from "../../../hooks/employee/personel/useList";

interface MeetingModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
  token?: string;
}

interface IMeetingForm extends FormikValues {
  season_id: number;
  branche_id: number;
  student_id: number;
  type_id: number;
  meeting_date: string;
  meeting_note: string;
  created_by: string;
  meeting_price: any;
}

const MeetingModal: React.FC<MeetingModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();

  const mode = id ? "update" : "add";
  const { seasons } = getUserDataField();
  const { branches } = getUserDataField();

  const [filtersEnabled, setFiltersEnabled] = useState({
    authorized_person: false,
  });
  // Görüşme Yetkilisi seçenekleri
  const { personnelData } = usePersonnelTable({
    enabled: filtersEnabled.authorized_person ? true : false,
    pozisyon: ["MÜDÜR,ÖĞRETMEN"],
  });
  const authorized_personOptions = useMemo(
    () =>
      personnelData.map((m) => {
        const name = m.ad || m.pozisyon || "Adı Belirtilmedi";
        return {
          value: name,
          label: name,
        };
      }),
    [personnelData]
  );

  const [initialValues, setInitialValues] = useState<IMeetingForm>({
    season_id: 0,
    branche_id: 0,
    student_id: 0,
    type_id: 0,
    meeting_date: new Date().toISOString().slice(0, 10),
    meeting_note: "",
    created_by: "",
    meeting_price: "",
  });

  // Field definitions for the form
  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "season_id",
        label: "Sezon",
        type: "select",
        options: seasons,
        required: true,
      },
      {
        name: "branche_id",
        label: "Şube",
        type: "select",
        options: branches,
        required: true,
      },
      {
        name: "created_by",
        label: "Görüşme Yetkilisi",
        type: "select",
        onClick: () =>
          setFiltersEnabled((prev) => ({
            ...prev,
            authorized_person: true,
          })),
        options: authorized_personOptions,
        required: true,
      },
      {
        name: "meeting_price",
        label: "Ücret",
        type: "currency",
        required: true,
      },
      {
        name: "type_id",
        label: "Görüşme Türü",
        type: "select",
        options: [
          { value: MeetingListType.FACE_TO_FACE, label: "Yüzyüze" },
          { value: MeetingListType.DISTANCE, label: "Uzaktan" },
          { value: MeetingListType.ALL, label: "Hepsi" },
        ],
        required: true,
      },
      {
        name: "meeting_date",
        label: "Tarih",
        type: "date",
        required: true,
      },
      {
        name: "meeting_note",
        label: "Görüşme Notu",
        type: "textarea",
      },
    ];
  };

  const { addNewMeeting, status: addStatus, error: addError } = useMeetingAdd();
  const {
    updateExistingMeeting,
    status: updateStatus,
    error: updateError,
  } = useMeetingUpdate();
  const {
    meeting: fetcedMeeting,
    status: showStatus,
    error: showError,
    getMeeting,
  } = useMeetingDetail();
  // handle form submission
  useEffect(() => {
    if (mode === "update" && id) {
      getMeeting(parseInt(id));
    }
  }, [mode, id, getMeeting]);

  useEffect(() => {
    if (mode === "update" && fetcedMeeting) {
      setInitialValues({
        season_id: fetcedMeeting.season_id,
        branche_id: fetcedMeeting.branche_id,
        student_id: fetcedMeeting.student_id,
        type_id: fetcedMeeting.type_id,
        meeting_date: fetcedMeeting.meeting_date,
        meeting_note: fetcedMeeting.meeting_note || "",
        created_by: fetcedMeeting.created_by || "",
        meeting_price: fetcedMeeting.meeting_price || "",
      });
    }
  }, [mode, fetcedMeeting]);

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
    values: IMeetingForm,
    _helpers: FormikHelpers<IMeetingForm>
  ) {
    try {
      if (mode === "add") {
        await addNewMeeting(values);
      } else if (mode === "update" && id) {
        await updateExistingMeeting({
          meetingId: Number(id),
          payload: values,
        });
        onRefresh();
        onClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <ReusableModalForm
      show={show}
      title={mode === "add" ? "Görüşme Ekle" : "Görüşmeyi Güncelle"}
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

export default MeetingModal;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";

import { useBranchTable } from "../../../hooks/branch/useBranchList";
import { useSeasonsList } from "../../../hooks/season/useSeasonsList";
import { useLocation } from "react-router-dom";

import { useAppointmentAdd } from "../../../hooks/appointment/addAppointment";
import { useAppointmentUpdate } from "../../../hooks/appointment/useUpdateAppointments";
import { useAppointmentDetail } from "../../../hooks/appointment/useDetailAppointments";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";

import { usePersonnelTable } from "../../../hooks/employee/personel/useList";

interface AppointmentModalProps {
  show: boolean;
  token: string;
  detay?: string;
  onClose: () => void;
  onRefresh: () => void;
}

interface IAppointmentForm extends FormikValues {
  season_id: number;
  branche_id: number;
  student_id: number;
  type_id?: number;
  meeting_date: string;
  meeting_note: string;
  authorized_person: number;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  show,

  onClose,
  onRefresh,
}) => {
  const { student_id } = useParams<{ student_id?: string }>();
  const navigate = useNavigate();
  console.log("", student_id);
  const location = useLocation();

  // determine mode based on location state
  const mode: "add" | "update" = location.state?.detay ? "add" : "update";
  console.log("mode", mode);
  // Randevu detay, ekleme,kaydet
  const { getAppointment, appointment: fetchedAppointment } =
    useAppointmentDetail();
  const {
    addNewAppointment,
    status: addStatus,
    error: addError,
  } = useAppointmentAdd();
  const {
    updateExistingAppointment,
    status: updateStatus,
    error: updateError,
  } = useAppointmentUpdate();

  // Şube, Sezon, Görüşme Yetkilisi (authorized_person) için filtre durumu
  const [filtersEnabled, setFiltersEnabled] = useState({
    branche: false,
    season_id: false,
    authorized_person: false,
  });

  // Şube seçenekleri
  const { branchData } = useBranchTable({ enabled: filtersEnabled.branche });
  const branchOptions = useMemo(
    () =>
      branchData.map((b) => ({
        value: b.id,
        label: b.name,
      })),
    [branchData]
  );

  // Sezon seçenekleri
  const { seasonsData } = useSeasonsList({ enabled: filtersEnabled.season_id });
  const seasonOptions = useMemo(
    () =>
      seasonsData.map((s) => ({
        value: s.id,
        label: s.name,
      })),
    [seasonsData]
  );

  // ↓ 1. dosyadaki gibi personel tablosunu çekiyoruz:
  const { personnelData } = usePersonnelTable({
    enabled: filtersEnabled.authorized_person,
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

  // Güncelleme modunda, randevuyu çekiyoruz
  useEffect(() => {
    if (mode === "update" && student_id) {
      getAppointment(Number(student_id));
    }
  }, [mode, student_id, getAppointment]);

  // Formun başlangıç değerleri
  const [initialValues, setInitialValues] = useState<IAppointmentForm>({
    season_id: 0,
    branche_id: 0,
    student_id: student_id ? Number(student_id) : 0,
    type_id: 0,
    meeting_date: "",
    meeting_note: "",
    authorized_person: 0,
  });

  // fetchedAppointment geldiğinde formu doldur
  useEffect(() => {
    if (
      mode === "update" &&
      fetchedAppointment &&
      !Array.isArray(fetchedAppointment)
    ) {
      setInitialValues({
        season_id: fetchedAppointment.season_id ?? 0,
        branche_id: fetchedAppointment.branche_id ?? 0,
        student_id: student_id ? Number(student_id) : 0,
        type_id: fetchedAppointment.type_id ?? 0,
        meeting_date: fetchedAppointment.meeting_date || "",
        meeting_note: fetchedAppointment.meeting_note || "",
        authorized_person: fetchedAppointment.meeting_by ?? 0,
      });
    }
  }, [mode, fetchedAppointment]);

  // Randevu form alanları
  const getFields = useCallback(
    (_values: IAppointmentForm): FieldDefinition[] => [
      {
        name: "season_id",
        label: "Sezon",
        type: "select",
        required: true,
        onClick: () =>
          setFiltersEnabled((prev) => ({ ...prev, season_id: true })),
        options: seasonOptions,
      },
      {
        name: "branche_id",
        label: "Şube",
        type: "select",
        required: true,
        onClick: () =>
          setFiltersEnabled((prev) => ({ ...prev, branche: true })),
        options: branchOptions,
      },
      {
        name: "authorized_person",
        label: "Görüşme Yetkilisi",
        type: "select",
        required: true,
        onClick: () =>
          setFiltersEnabled((prev) => ({ ...prev, authorized_person: true })),
        options: authorized_personOptions,
      },
      {
        name: "meeting_date",
        label: "Tarih",
        type: "date",
        required: true,
      },
      {
        name: "type_id",
        label: "Randevu Türü",
        type: "select",
        required: true,
        options: [
          { label: "Yüz Yüze", value: "face-to-face" },
          { label: "Online", value: "online" },
          { label: "Hepsi", value: "all" },
        ],
      },
      {
        name: "meeting_note",
        label: "Görüşme Notları",
        type: "textarea",
      },
    ],
    [branchOptions, seasonOptions, authorized_personOptions]
  );

  // Kaydet (Ekle/Güncelle) fonksiyonu
  async function handleSubmit(
    values: IAppointmentForm,
    _helpers: FormikHelpers<IAppointmentForm>
  ) {
    if (mode === "add") {
      await addNewAppointment(values);
    } else if (mode === "update" && student_id) {
      await updateExistingAppointment({
        appoipmentId: Number(student_id),
        payload: {
          season_id: values.season_id,
          branche_id: values.branche_id,
          student_id: values.student_id,
          type_id: Number(values.type_id),
          meeting_date: values.meeting_date,
          meeting_note: values.meeting_note,
          meeting_by: values.authorized_person,
        },
      });
    }
    onRefresh();
    navigate(-1);
  }

  const isLoading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" && updateStatus === "LOADING");
  const combinedError = mode === "add" ? addError : updateError;

  return (
    <ReusableModalForm<IAppointmentForm>
      show={show}
      title={mode === "add" ? "Randevu Ekle" : "Randevu Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={isLoading}
      error={combinedError || null}
      onClose={() => {
        onClose();
        navigate(-1);
      }}
      autoGoBackOnModalClose
      mode="double"
    />
  );
};

export default AppointmentModal;

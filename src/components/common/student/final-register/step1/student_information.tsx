import { useState, useMemo } from "react";
import { FieldDefinition } from "../../../ReusableModalForm";
import { useBranchTable } from "../../../../hooks/branch/useBranchList";
import { useSeasonsList } from "../../../../hooks/season/useSeasonsList";
import { useRegisterNo } from "../../../../hooks/student/useRegisterNo";

export function getStudentFields(): FieldDefinition[] {
  // Şube ve sezon verilerini getirebilmek için “enabled” state
  const [branchEnabled, setBranchEnabled] = useState(false);
  const [seasonEnabled, setSeasonEnabled] = useState(false);

  // Hooks
  const { branchData } = useBranchTable({ enabled: branchEnabled });
  const { seasonsData } = useSeasonsList({ enabled: seasonEnabled });
  const { getRegisterNo } = useRegisterNo();

  // Options
  const branchOptions = useMemo(() => {
    const list =
      branchData?.map((b) => ({
        label: b.name,
        value: b.id,
      })) || [];
    list.unshift({ label: "Seçiniz", value: 0 });
    return list;
  }, [branchData]);

  const seasonOptions = useMemo(() => {
    const list =
      seasonsData?.map((s) => ({
        label: s.name,
        value: s.id,
      })) || [];
    list.unshift({ label: "Seçiniz", value: 0 });
    return list;
  }, [seasonsData]);

  // FieldDefinition
  const fields: FieldDefinition[] = useMemo(() => {
    return [
      {
        name: "branch_id",
        label: "Şube",
        type: "select",
        required: true,
        onClick: () => setBranchEnabled(true),
        options: branchOptions,
        onChange: async (selectedValue, formik) => {
          formik.setFieldValue("branch_id", selectedValue);
          if (!selectedValue) {
            // Şube seçilmezse, register_no sıfırla
            formik.setFieldValue("register_no", "");
            return;
          }
          // Kayıt No’yu al
          const branchId = Number(selectedValue);
          const resp = await getRegisterNo(0, branchId);
          if (resp && resp.data?.register_no) {
            formik.setFieldValue("register_no", resp.data.register_no);
          } else {
            formik.setFieldValue("register_no", "");
          }
        },
      },
      {
        name: "season_id",
        label: "Sezon",
        type: "select",
        required: true,
        onClick: () => setSeasonEnabled(true),
        options: seasonOptions,
      },
      {
        name: "register_no",
        label: "Kayıt No",
        type: "text",
        required: true,
      },
      {
        name: "student_no",
        label: "Öğrenci No.",
        type: "text",
        required: true,
        placeholder: "Öğrenci no giriniz",
      },
      {
        name: "register_date",
        label: "Kayıt Tarihi",
        type: "date",
        required: true,
        defaultValue: new Date().toISOString().split("T")[0],
        placeholder: new Date().toISOString().split("T")[0],
      },
      {
        name: "identification_no",
        label: "T.C. No",
        type: "text",
        required: true,
        placeholder: "T.C. no giriniz",
      },
      {
        name: "first_name",
        label: "Adı",
        type: "text",
        required: true,
        placeholder: "Adınızı giriniz",
      },
      {
        name: "last_name",
        label: "Soyadı",
        type: "text",
        required: true,
        placeholder: "Soyadınızı giriniz",
      },
      {
        name: "birthday",
        label: "Doğum Tarihi",
        type: "date",
        required: true,
        placeholder: "GG/AA/YYYY",
      },
      {
        name: "phone",
        label: "Telefon",
        type: "text",
        required: true,
        placeholder: "Telefon numaranızı giriniz",
      },
      {
        name: "by_register",
        label: "Kayıt Eden",
        type: "select",
        required: true,
        options: [
          { label: "Seçiniz", value: 0 },
          { label: "Personel A", value: 10 },
          { label: "Personel B", value: 20 },
        ],
      },
      {
        name: "mobile_phone",
        label: "Öğr. Cep",
        type: "text",
        required: true,
        placeholder: "Telefon numaranızı giriniz",
      },
      {
        name: "email",
        label: "E-posta",
        type: "text",
        required: false,
        placeholder: "example@example.com",
      },
    ];
  }, [branchOptions, seasonOptions, getRegisterNo]);

  return fields;
}

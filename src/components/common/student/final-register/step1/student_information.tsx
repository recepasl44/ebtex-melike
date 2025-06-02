
import { useState, useMemo } from "react";
import { FieldDefinition } from "../../../ReusableModalForm";
import { useBranchTable } from "../../../../hooks/branch/useBranchList";
import { useSeasonsList } from "../../../../hooks/season/useSeasonsList";
import { useRegisterNo } from "../../../../hooks/student/useRegisterNo";

export function useStudentFields(
  _onBranchChange?: (branchId: number) => void
): FieldDefinition[] {
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
        required: false,
         disabled: true,

      },
      {
        name: "student_no",
        label: "Öğrenci No.",
        type: "text",
        required: true,
      },
      {
        name: "register_date",
        label: "Kayıt Tarihi",
        type: "date",
        required: false,
      },
      {
        name: "identification_no",
        label: "T.C. No",
        type: "text" as const,
        required: true,
        minLength: 11,
        maxLength: 11,
        pattern: /^\d{11}$/,
         onChange: (val, formik) => {
          const sanitized = val.replace(/\D/g, "").slice(0, 11);
          formik.setFieldValue("identification_no", sanitized);
        },
      },
      {
        name: "first_name",
        label: "Adı",
        type: "text",
        required: true,
      },
      {
        name: "last_name",
        label: "Soyadı",
        type: "text",
        required: true,
      },
      {
        name: "birthday",
        label: "Doğum Tarihi",
        type: "date",
        required: true,
      },
      {
        name: "phone",
        label: "Telefon",
        type: "phone",
        required: true,
      },
       {
        name: "gender_id",
        label: "cinsiyet",
        type: "select" as const,
        required: true,
        options: [
        
          { label: "Erkek", value: 1 },
          { label: "Kadın", value: 2 },
        ],
      },
      {
        name: "by_register",
        label: "Kayıt Eden",
        type: "select",
        required: false,
        options: [
          { label: "Seçiniz", value: 0 },
          { label: "Personel A", value: 10 },
          { label: "Personel B", value: 20 },
        ],
        
      },
      {
        name: "mobile_phone",
        label: "Öğr. Cep",
        type: "phone",
        required: true,
      },
      {
        name: "email",
        label: "E-posta",
        type: "text",
        required: false,
      },
    ];
  }, [branchOptions, seasonOptions, getRegisterNo]);

  return fields;
}

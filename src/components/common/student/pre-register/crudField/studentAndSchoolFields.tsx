// src/components/common/student/pre-register/fields/studentAndSchoolFields.ts

import { useMemo, useState } from "react";
import { useBranchTable } from "../../../../hooks/branch/useBranchList";
import { FieldDefinition } from "../../../ReusableModalForm";
import { useLevelsTable } from "../../../../hooks/levels/useList";
import { useProgramsTable } from "../../../../hooks/program/useList";
import { usePersonnelTable } from "../../../../hooks/employee/personel/useList";
import { useListStudents } from "../../../../hooks/student/useList";
import { useSchoolTable } from "../../../../hooks/school/useSchoolList";
import { useRegisterNo } from "../../../../hooks/student/useRegisterNo";

export const getStudentAndSchoolFields = (): FieldDefinition[] => {
  // State’ler
  const [created_by, setCreatedBy] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState({
    branch_id: false,
    program_id: false,
    level_id: false,
    name: false,
    authorized_person: false,
  });
  const [enableSchoolSearch, setEnableSchoolSearch] = useState(false);
  const [schoolSearchTerm, setSchoolSearchTerm] = useState("");
  const [program_id, setProgramId] = useState("");

  // Custom Hooks
  const { getRegisterNo } = useRegisterNo();
  const { branchData } = useBranchTable({
    enabled: filtersEnabled.branch_id,
  });
  const { programsData } = useProgramsTable({
    enabled: filtersEnabled.program_id,
  });
  const { personnelData } = usePersonnelTable({
    enabled: filtersEnabled.authorized_person,
    pozisyon: ["MÜDÜR,ÖĞRETMEN"],
  });
  const { schoolData } = useSchoolTable({
    enabled: enableSchoolSearch && schoolSearchTerm.length >= 2,
    name: schoolSearchTerm,
    page: 1,
    pageSize: 10,
  });

  // Diğer Hook: Sadece filtreleme için kullanılıyor
  useListStudents({
    program_id,
    created_by,
  });

  // Program seviyelerine (level) ulaşmak için parametre
  const levelParams = useMemo(
    () => ({
      enabled: Boolean(program_id),
      program_id,
    }),
    [program_id]
  );
  const { levelsData: programLevelsData } = useLevelsTable(levelParams);

  // Helper
  const handleFilterChange = (key: string, value: any) => {
    setFiltersEnabled((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === "program_id") {
      setProgramId(value);
    }
    if (key === "created_by") {
      setCreatedBy(value);
    }
  };

  // Select options
  const branchOptions = useMemo(() => {
    return (
      branchData?.map((b) => ({
        label: b.name,
        value: b.id,
      })) || []
    );
  }, [branchData]);

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

  const schoolOptions = useMemo(() => {
    return (
      schoolData?.map((school) => ({
        value: school.name,
        label: school.name,
      })) || []
    );
  }, [schoolData]);

  // Alan tanımları
  return [
    {
      name: "created_by",
      label: "Kayıt Eden",
      type: "select",
      onClick: () => {
        setFiltersEnabled((prev) => ({ ...prev, authorized_person: true }));
      },
      onChange: (val: any) => {
        handleFilterChange("created_by", val);
      },
      options: (authorized_personOptions || []).map((item) => ({
        label: item.label,
        value: item.value,
      })),
    },
    {
      name: "register_no",
      label: "Kayıt No",
      type: "text",
      placeholder: "Otomatik atanacak",
      required: false,
      disabled: true,
    },
    {
      name: "register_date",
      label: "Kayıt Tarihi",
      type: "date",
    },
    {
      name: "branch_id",
      label: "Şube",
      type: "select",
      required: true,
      options: branchOptions,
      onClick: () => {
        setFiltersEnabled((prev) => ({ ...prev, branch_id: true }));
      },
      onChange: async (selectedValue, formik) => {
        formik.setFieldValue("branch_id", selectedValue);

        if (!selectedValue) {
          formik.setFieldValue("register_no", "");
          return;
        }

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
      name: "identification_no",
      label: "TC Kimlik No",
      type: "text",
      placeholder: "11 haneli",
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
      label: "Ad",
      type: "text",
      placeholder: "Ör: Abuzer",
      required: true,
    },
    {
      name: "last_name",
      label: "Soyad",
      type: "text",
      placeholder: "Ör: Kömürcü",
      required: true,
    },
    {
      name: "gender_id",
      label: "Cinsiyet",
      type: "select",
      required: true,
      options: [
        { value: 1, label: "Erkek" },
        { value: 2, label: "Kadın" },
      ],
    },
    {
      name: "birthday",
      label: "Doğum Tarihi",
      type: "date",
      required: true,
    },
    {
      name: "email",
      label: "E‑posta",
      type: "email",
      placeholder: "ornek@mail.com",
    },
    {
      name: "phone",
      label: "Telefon",
      type: "phone",
      required: true,
    },
    {
      name: "mobile_phone",
      label: "Öğr. Cep",
      type: "phone",
      required: true,
    },
    {
      name: "program",
      label: "Okul Seviyesi",
      type: "select",
      onClick: () => {
        setFiltersEnabled((prev) => ({ ...prev, program_id: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("program_id", val);
      },
      options: (programsData || []).map((item) => ({
        value: String(item.id),
        label: item.name,
        key: item.id,
      })),
    },
    {
      name: "level",
      label: "Sınıf Seviyesi",
      type: "select",
      options: programLevelsData.map((level) => ({
        value: level.id,
        label: level.name,
      })),
      onChange: (val: string) => {
        handleFilterChange("level_id", val);
      },
    },
    {
      name: "school_name",
      label: "Okul",
      type: "autocomplete",
      required: false,
      onInputChange: (text, _formik) => {
        setSchoolSearchTerm(text);
        setEnableSchoolSearch(text.length >= 2);
      },
      onChange: (val, _formik) => {
        console.log("Seçilen okul ismi:", val);
        // İhtiyaç varsa "school_id" da set edilebilir
      },
      options: schoolOptions,
    },
  ];
};

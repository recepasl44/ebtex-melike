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
    const list =
      branchData?.map((b) => ({
        label: b.name,
        value: b.id,
      })) || [];
    list.unshift({ label: "Seçiniz", value: 0 });
    return list;
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
      name: "branch_id",
      label: "Şube",
      type: "select",
      required: true,
      onClick: () => {
        setFiltersEnabled((prev) => ({ ...prev, branch_id: true }));
      },
      options: branchOptions,
      onChange: async (selectedValue, formik) => {
        formik.setFieldValue("branch_id", selectedValue);

        // Şube seçilmezse register_no sıfırla
        if (!selectedValue) {
          formik.setFieldValue("register_no", "");
          return;
        }

        // Şube seçildiyse register_no’yu getir
        const branchId = Number(selectedValue);
        const resp = await getRegisterNo(0, branchId);

        if (resp && resp.data?.register_no) {
          // API örneği: { "data": { "register_no": 10000 } }
          formik.setFieldValue("register_no", resp.data.register_no);
        } else {
          formik.setFieldValue("register_no", "");
        }
      },
    },
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
      required: false,
    },
    {
      name: "register_date",
      label: "Kayıt Tarihi",
      type: "date",
    },
    {
      name: "branche_id",
      label: "Şube (Tekrar)",
      type: "select",
      options: branchData.map((branch) => ({
        value: branch.id,
        label: branch.name,
      })),
      onClick: () => {
        setFiltersEnabled((prev) => ({ ...prev, branch_id: true }));
      },
    },
    {
      name: "identification_no",
      label: "TC Kimlik No",
      type: "text",
      placeholder: "11 haneli",
    },
    {
      name: "first_name",
      label: "Ad",
      type: "text",
      placeholder: "Ör: Abuzer",
    },
    {
      name: "last_name",
      label: "Soyad",
      type: "text",
      placeholder: "Ör: Kömürcü",
    },
    {
      name: "gender_id",
      label: "Cinsiyet",
      type: "select",
      options: [
        { value: 1, label: "Erkek" },
        { value: 2, label: "Kadın" },
      ],
    },
    {
      name: "birthday",
      label: "Doğum Tarihi",
      type: "date",
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
    },
    {
      name: "mobile_phone",
      label: "Öğr. Cep",
      type: "phone",
    },
    {
      name: "status",
      label: "Durum",
      type: "select",
      options: [
        { value: 0, label: "Pasif" },
        { value: 1, label: "Aktif" },
      ],
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

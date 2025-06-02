import { useState, useMemo } from "react";
import { FieldDefinition } from "../../../ReusableModalForm";

import { useProgramsTable } from "../../../../hooks/program/useList";
import { useLevelsTable } from "../../../../hooks/levels/useList";
import { useSchoolTypesList } from "../../../../hooks/schoolTypes/useSchoolTypesList";
import { useCoursesTable } from "../../../../hooks/course/useList";
import { useClassroomList } from "../../../../hooks/classrooms/useList";
import { useSchoolTable } from "../../../../hooks/school/useSchoolList";
import { usePersonnelTable } from "../../../../hooks/employee/personel/useList";

/**
 * Okul / Seviye / Alan vb. bilgilerini düzenleyen form alanları.
 * Adlandırmaları "final" payload'a uyacak şekilde güncellendi.
 */
export function useSchoolFields(branchId?: number | null): FieldDefinition[] {
  // State'ler
  const [enablePrograms, setEnablePrograms] = useState(false);
  const [enableLevels, setEnableLevels] = useState(false);
  const [enableSchoolTypes, setEnableSchoolTypes] = useState(false);
  const [enableCourses, setEnableCourses] = useState(false);
  const [enableClassrooms, setEnableClassrooms] = useState(false);
  const [enablePersonnel, setEnablePersonnel] = useState(false);

  // Okul arama (autocomplete)
  const [enableSchoolSearch, setEnableSchoolSearch] = useState(false);
  const [schoolSearchTerm, setSchoolSearchTerm] = useState("");

  // Program / Level seçimi
  const [programId, setProgramId] = useState<number | null>(null);
  const [levelId, setLevelId] = useState<number | null>(null);

  // Hook’lar
  const { programsData } = useProgramsTable({
    enabled: enablePrograms,
  });

  const { classroomData } = useClassroomList({
    enabled: enableClassrooms && !!branchId,
    branchId: branchId ?? 0,
    page: 1,
    pageSize: 999,
  });

  const { levelsData } = useLevelsTable({
    enabled: enableLevels && programId ? true : false,
    program_id: programId ?? 0,
    page: 1,
    pageSize: 999,
  });

  const { schoolTypesData } = useSchoolTypesList({
    enabled: enableSchoolTypes,
    page: 1,
    pageSize: 999,
  });

  const { coursesData } = useCoursesTable({
    enabled: enableCourses && levelId ? true : false,
    level_id: levelId ?? 0,
    page: 1,
    branch_id: branchId ?? 0,

    pageSize: 999,
  });

  // Okul (autocomplete)
  const { schoolData } = useSchoolTable({
    enabled: enableSchoolSearch && schoolSearchTerm.length >= 2,
    name: schoolSearchTerm,
    page: 1,
    pageSize: 10,
  });

  const { personnelData } = usePersonnelTable({
    enabled: enablePersonnel,
    pozisyon: ["ÖĞRETMEN", "MÜDÜR"],
    page: 1,
    pageSize: 999,
  });

  const programOptions = useMemo(() => {
    const arr =
      programsData?.map((p) => ({
        label: p.name,
        value: p.id,
      })) || [];
    arr.unshift({ label: "Seçiniz", value: 0 });
    return arr;
  }, [programsData]);

  const levelOptions = useMemo(() => {
    const arr =
      levelsData?.map((lvl) => ({
        label: lvl.name,
        value: lvl.id,
      })) || [];
    arr.unshift({ label: "Seçiniz", value: 0 });
    return arr;
  }, [levelsData]);

  const schoolTypeOptions = useMemo(() => {
    const arr =
      schoolTypesData?.map((st) => ({
        label: st.name,
        value: st.id,
      })) || [];
    arr.unshift({ label: "Seçiniz", value: 0 });
    return arr;
  }, [schoolTypesData]);

  const courseOptions = useMemo(() => {
    const arr =
      coursesData?.map((c) => ({
        label: c.name,
        value: c.id,
      })) || [];
    arr.unshift({ label: "Seçiniz", value: 0 });
    return arr;
  }, [coursesData]);

  const classroomOptions = useMemo(() => {
    const arr =
      classroomData?.map((cl : any) => ({
        label: cl.name,
        value: cl.id,
      })) || [];
    arr.unshift({ label: "Seçiniz", value: 0 });
    return arr;
  }, [classroomData]);

  const teacherOptions = useMemo(() => {
    const arr =
      personnelData?.map((p) => ({
        label: `${p.ad} ${p.soyad}`,
        value: p.id,
      })) || [];
    arr.unshift({ label: "Seçiniz", value: 0 });
    return arr;
  }, [personnelData]);

  // Okullar (autocomplete options)
  const schoolOptions = useMemo(() => {
    return (
      schoolData?.map((school) => ({
        value: school.name,
        label: school.name,
      })) || []
    );
  }, [schoolData]);

  /***********************
   * FieldDefinition dizisi
   ****************************************/
  const fields: FieldDefinition[] = useMemo(() => {
    return [
      // 1) Okul Seviyesi => program_id
      {
        name: "program_id",
        label: "Okul Seviyesi",
        type: "select",
        required: true,
        onClick: () => setEnablePrograms(true),
        options: programOptions,
        onChange: (val, formik) => {
          formik.setFieldValue("program_id", val);
          setProgramId(val ? Number(val) : null);
          setEnableLevels(true);
          formik.setFieldValue("level_id", "");
        },
      },
      // 2) Sınıf Seviyesi => level_id
      {
        name: "level_id",
        label: "Sınıf Seviyesi",
        type: "select",
        required: true,
        onClick: () => setEnableLevels(true),
        options: levelOptions,
        onChange: (val, formik) => {
          formik.setFieldValue("level_id", val);
          setLevelId(val ? Number(val) : null);
          setEnableCourses(true);
          formik.setFieldValue("course_id", "");
        },
      },
      // 3) Okul Türü => schooltype_id
      {
        name: "schooltype_id",
        label: "Okul Türü",
        type: "select",
        required: true,
        onClick: () => setEnableSchoolTypes(true),
        options: schoolTypeOptions,
      },
      // 4) Alan => course_id
      {
        name: "course_id",
        label: "Alan",
        type: "select",
        required: true,
        onClick: () => setEnableCourses(true),
        options: courseOptions,
      },
      // 5) Sınıf => classroom_id (eskiden "class_id")
      {
        name: "classroom_id",
        label: "Sınıf",
        type: "select",
        required: true,
        onClick: () => {
          if (branchId) {
            setEnableClassrooms(true);
          }
        },
        options: classroomOptions,
      },
      // 6) Okul => autocomplete
      {
        name: "school_name",
        label: "Okul",
        type: "autocomplete",
        placeholder: "Okul ara...",
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
      // 7) Rehber Öğr. => advisor_teacher
      {
        name: "advisor_teacher",
        label: "Rehber Öğr.",
        type: "select",
        required: true,
        onClick: () => setEnablePersonnel(true),
        options: teacherOptions,
      },
      // 8) Danışman => consultant_id
      {
        name: "consultant_id",
        label: "Danışman",
        type: "select",
        required: true,
        onClick: () => setEnablePersonnel(true),
        options: teacherOptions,
      },
      // 9) Sınıf Öğr. => class_teacher
      {
        name: "class_teacher",
        label: "Sınıf Öğr.",
        type: "select",
        required: true,
        onClick: () => setEnablePersonnel(true),
        options: teacherOptions,
      },
    ];
  }, [
    branchId,
    programOptions,
    levelOptions,
    schoolTypeOptions,
    courseOptions,
    classroomOptions,
    teacherOptions,
    schoolOptions,
    schoolData,
  ]);

  return fields;
}

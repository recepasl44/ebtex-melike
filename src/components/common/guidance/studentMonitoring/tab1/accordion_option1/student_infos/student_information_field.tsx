import { useMemo } from "react";
import { FieldDefinition } from "../../../../../ReusableModalForm";

export function getStudentFields(): FieldDefinition[] {
  // FieldDefinition
  const fields: FieldDefinition[] = useMemo(() => {
    return [
      {
        name: "first_name",
        label: "Adı",
        type: "text",
        value: "",
        disabled: true,
      },
      {
        name: "last_name",
        label: "Soyadı",
        type: "text",
        value: "",
        disabled: true,
      },

      {
        name: "level",
        label: "Sınıf",
        type: "text",
        value: "",
        disabled: true,
      },
      {
        name: "special_conditions",
        label: "Gelişimini Etkileyen Özel Durumlar",
        type: "text",
        value: "",
      },

      {
        name: "birthday",
        label: "Doğum Tarihi",
        type: "date",
        disabled: true,
      },
      {
        name: "extracurricular_activities",
        label: "Ders Dışı Etkinlikler ve İlgi Alanları",
        type: "text",
      },

      {
        name: "birthplace",
        label: "Doğum Yeri",
        type: "text",
        disabled: true,
      },
      {
        name: "hobbies_and_skills",
        label: "Hobiler ve Beceriler",
        type: "text",
      },

      {
        name: "identification_no",
        label: "T.C. Kimlik Numarası",
        type: "text",
        disabled: true,
      },
      {
        name: "residential_address",
        label: "İkametgah Adresi",
        type: "text",
      },

      {
        name: "school",
        label: "Önceki Okulları",
        type: "text",
        disabled: true,
      },
      {
        name: "transportation_status",
        label: "Ulaşım Durumu",
        type: "text",
      },
      {
        name: "emergency_contact_info",
        label: "Acil Durum İletişim Kişisi ve Bilgileri",
        type: "text",
      },
      {
        name: "medical_support",
        label: "Sürekli Kullandığı İlaçlar/Tıbbi Destek",
        type: "text",
      },
    ];
  }, []);

  return fields;
}

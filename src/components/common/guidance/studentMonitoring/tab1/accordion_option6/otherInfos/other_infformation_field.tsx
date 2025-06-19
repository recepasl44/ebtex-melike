import { useMemo } from "react";
import { FieldDefinition } from "../../../../../ReusableModalForm";

export function getOtherFields(): FieldDefinition[] {
  // FieldDefinition
  const fields: FieldDefinition[] = useMemo(() => {
    return [
      {
        name: "number_of_siblings",
        label: "Kardeş Sayısı",
        type: "text",
        value: "",
        disabled: false,
      },
      {
        name: "birth_order",
        label: "Doğum Sırası",
        type: "text",
        value: "",
        disabled: true,
      },
      {
        name: "chronic_illness",
        label: "Ailede Sürekli Hastalık / Engel Durumu",
        type: "text",
        value: "",
      },
      {
        name: "household_members",
        label: "Evde Birlikte Yaşayanlar",
        type: "text",
        value: "",
      },

      {
        name: "psychological_status",
        label: "Psikolojik ve Duygusal Durum",
        type: "text",
        value: "",
        disabled: false,
      },

      {
        name: "academic_performance",
        label: "Akademik Performans",
        type: "text",
        disabled: true,
      },

      {
        name: "support_educations",
        label: "Destek Eğitimler",
        type: "text",
        value: "",
      },

      {
        name: "additional_notes",
        label: "Ek Notlar ve Öneriler",
        type: "text",
        value: "",
      },
    ];
  }, []);

  return fields;
}

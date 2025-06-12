import { useMemo } from "react";
import { FieldDefinition } from "../../../../../ReusableModalForm";

export function getmotherFields(): FieldDefinition[] {
  // FieldDefinition
  const fields: FieldDefinition[] = useMemo(() => {
    return [
      {
        name: "full_name",
        label: "Anne Adı",
        type: "text",
        value: "",
        disabled: false,
      },

      {
        name: "education",
        label: "Doğum Tarihi",
        type: "date",
        disabled: true,
      },
      {
        name: "birthplace",
        label: "Doğum Yeri",
        type: "text",
      },
      {
        name: "health",
        label: "Sağlık Durumu",
        type: "text",
      },

      {
        name: "education",
        label: "Eğitim Durumu",
        type: "text",
        value: "",
        disabled: true,
      },

      {
        name: "profession",
        label: "Mesleği",
        type: "text",
        value: "",
      },

      {
        name: "phone",
        label: "Telefon",
        type: "text",
        disabled: true,
      },

      {
        name: "email",
        label: "E-posta",
        type: "text",
      },
    ];
  }, []);

  return fields;
}

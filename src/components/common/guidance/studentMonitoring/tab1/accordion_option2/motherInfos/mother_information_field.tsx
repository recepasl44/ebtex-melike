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
        label: "Eğitim Durumu",
        type: "text",
        value: "",
        disabled: true,
      },

      {
        name: "education",
        label: "Doğum Tarihi",
        type: "date",
        disabled: true,
      },
      {
        name: "profession",
        label: "Mesleği",
        type: "text",
        value: "",
      },

      {
        name: "health",
        label: "Sağlık Durumu",
        type: "text",
      },

      {
        name: "phone",
        label: "Telefon Bilgileri",
        type: "text",
        disabled: true,
      },
      {
        name: "birthplace",
        label: "Doğum Yeri",
        type: "text",
      },
      {
        name: "email",
        label: "E-posta Bilgileri",
        type: "text",
      },
    ];
  }, []);

  return fields;
}

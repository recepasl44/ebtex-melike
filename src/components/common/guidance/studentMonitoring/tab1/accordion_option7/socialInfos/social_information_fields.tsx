import { useMemo } from "react";
import { FieldDefinition } from "../../../../../ReusableModalForm";

export function getSocialFields(): FieldDefinition[] {
  // FieldDefinition
  const fields: FieldDefinition[] = useMemo(() => {
    return [
      {
        name: "",
        label: "Psikolojik destek alıyor mu?",
        type: "select",
        value: "",
        disabled: false,
      },
      {
        name: "",
        label: "Duygusal Tepkiler",
        type: "text",
        value: "",
        disabled: false,
      },
      {
        name: "",
        label: "Sosyal etkinliklere katılım durumu",
        type: "text",
        value: "",
        disabled: true,
      },

      {
        name: "",
        label: "İletişim Becerileri",
        type: "text",
        disabled: true,
      },
    ];
  }, []);

  return fields;
}

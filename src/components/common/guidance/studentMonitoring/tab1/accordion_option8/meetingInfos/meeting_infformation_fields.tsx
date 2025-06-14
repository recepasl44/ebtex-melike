import { useMemo } from "react";
import { FieldDefinition } from "../../../../../ReusableModalForm";

export function getMeetingFields(): FieldDefinition[] {
  // FieldDefinition
  const fields: FieldDefinition[] = useMemo(() => {
    return [
      {
        name: "meeting_date",
        label: "Görüşme Tarihi",
        type: "text",
        value: "",
        disabled: false,
      },

      {
        name: "guidance_name",
        label: "Rehberlik Uzman Adı",
        type: "text",
        value: "",
        disabled: true,
      },
      {
        name: "meeting_topic",
        label: "Görüşme Konumu",
        type: "text",
        value: "",
        disabled: false,
      },
      {
        name: "meeting_notes",
        label: "Görüşme Notları",
        type: "text",
        disabled: true,
      },
    ];
  }, []);

  return fields;
}

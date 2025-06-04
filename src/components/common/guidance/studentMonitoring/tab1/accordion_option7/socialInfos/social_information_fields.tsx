import { useMemo } from "react";
import { FieldDefinition } from "../../../../../ReusableModalForm";

export function getSocialFields(): FieldDefinition[] {
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
        name: "psychological_status",
        label: "Psikolojik ve Duygusal Durum",
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
        name: "academic_performance",
        label: "Akademik Performans",
        type: "text",
        disabled: true,
      },
    ];
  }, []);

  return fields;
}

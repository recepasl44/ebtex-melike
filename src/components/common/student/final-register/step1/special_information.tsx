import { FieldDefinition } from "../../../ReusableModalForm";

export function getSpecialFields(): FieldDefinition[] {
  return [
    {
      name: "blood_type", // Eskiden "blood_group"
      label: "Kan Grubu",
      type: "select",
      required: false,
      options: [
        { label: "Seçiniz", value: "" },
        { label: "A+", value: "A+" },
        { label: "A-", value: "A-" },
        { label: "B+", value: "B+" },
        { label: "B-", value: "B-" },
        { label: "AB+", value: "AB+" },
        { label: "AB-", value: "AB-" },
        { label: "0+", value: "0+" },
        { label: "0-", value: "0-" },
      ],
    },
    {
      name: "illness", // Eskiden "illnesses"
      label: "Hastalıklar",
      type: "text",
      placeholder: "Varsa mevcut hastalıkları yazınız",
      required: false,
    },
    {
      name: "financial_status",
      label: "Mali Durum",
      type: "text",
      required: false,
      placeholder: "Mali durumunuzu belirtiniz",
    },
    {
      name: "additional_information_1", // Eskiden "special_info"
      label: "Özel Bilgi",
      type: "text",
      required: false,
      placeholder: "Gerekli özel bilgileri giriniz",
    },
    {
      name: "additional_information_2", // Eskiden "notes"
      label: "Açıklama",
      type: "textarea",
      required: false,
      placeholder: "Açıklamanızı buraya yazınız",
      col: 12,
    },
  ];
}

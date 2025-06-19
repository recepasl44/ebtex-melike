// src/components/common/student/pre-register/fields/guardianFields.ts
import { FieldDefinition } from "../../../ReusableModalForm";

export const getGuardianFields = (): FieldDefinition[] => {
  return [
    {
      name: "",
      label: "Veli Bilgisi",
      type: "heading",
    },
    {
      name: "parent_status",
      label: "",
      type: "checkbox-group",
      options: [
        { label: "Yaşıyor Mu?", value: "isAlive" },
        { label: "Veli Mi?", value: "isParent" },
        { label: "Boşanmış Mı?", value: "isDivorced" },
      ],
    },
    {
      name: "full_name",
      label: "Ad Soyad",
      type: "text",
      required: true,
      placeholder: "Örn. Abuzer Kömürcü",
    },
    {
      name: "kinship",
      label: "Yakınlık",
      type: "text",
      required: true,
      placeholder: "Örn. Anne,Baba",
    },
    {
      name: "guardian.identification_no",
      label: "Veli T.C. Kimlik",
      type: "text",
      required: true,
      placeholder: "11 haneli",
      minLength: 11,
      maxLength: 11,
      pattern: /^\d{11}$/,
      onChange: (val, formik) => {
        const sanitized = val.replace(/\D/g, "").slice(0, 11);
        formik.setFieldValue("guardian.identification_no", sanitized);
      },
    },
    {
      name: "guardian.phone",
      label: "Veli Cep",
      type: "phone",
      required: true,
      placeholder: "Örn. 0532 123 45 67",
    },
    {
      name: "financial_status",
      label: "Mali Durum",
      type: "text",
      placeholder: "İyi, Orta halli",
    },
    {
      name: "additional_information_1",
      label: "Özel Bilgi",
      type: "text",
      placeholder: "Özel Bilgi 1",
    },
    {
      name: "additional_information_2",
      label: "Açıklama",
      type: "textarea",
      placeholder: "Açıklama yazınız",
    },
  ];
};

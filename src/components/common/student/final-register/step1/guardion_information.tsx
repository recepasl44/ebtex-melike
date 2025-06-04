
import { FieldDefinition } from "../../../ReusableModalForm";

/**
 * Veli (guardian) bilgileri
 */
export function getGuardianFields(): FieldDefinition[] {
  return [
    {
      name: "isSeparateGuardian",
      label: "Anne Baba Ayrı",
      type: "checkbox",
      col: 12,
    },
    {
      name: "guardianName",
      label: "Adı Soyadı",
      type: "text",
      placeholder: "Veli adı ve soyadı giriniz",
      required: true,
      col: 12,
    },
    {
      name: "guardianRelation",
      label: "Yakınlığı",
      type: "text",
      placeholder: "Yakınlığı giriniz",
      required: true,
      col: 12,
    },
    {
      name: "guardianTc",
      label: "T.C. Kimlik No",
      type: "text",
      placeholder: "T.C. kimlik numaranızı giriniz",
      required: true,
      col: 12,
      minLength: 11,
      maxLength: 11,
      pattern: /^\d{11}$/,
      onChange: (val, formik) => {
        const sanitized = val.replace(/\D/g, "").slice(0, 11);
        formik.setFieldValue("guardianTc", sanitized);
      },
    },
    {
      name: "guardianMobile",
      label: "Cep Tel",
     type: "phone",
      placeholder: "Cep telefonu numaranızı giriniz",
      required: true,
      col: 12,
    },
    {
      name: "guardianJob",
      label: "Meslek",
      type: "text",
      placeholder: "Mesleğinizi giriniz",
      col: 12,
    },
    {
      name: "guardianHomeTel",
      label: "Ev Tel",
       type: "phone",
      placeholder: "Ev telefonunuzu giriniz",
      col: 12,
    },
    {
      name: "guardianWorkTel",
      label: "İş Tel",
       type: "phone",
      placeholder: "İş telefonunuzu giriniz",
      col: 12,
    },
    {
      name: "guardianAddress",
      label: "Ev Adresi",
      type: "text",
      placeholder: "Ev adresinizi giriniz",
      required: true,
      col: 12,
    },
    {
      name: "guardianWorkAddress",
      label: "İş Adresi",
      type: "text",
      placeholder: "İş adresinizi giriniz",
      col: 12,
    },
    {
      name: "guardianBirthdate",
      label: "Doğum Tarihi",
      type: "date",
      placeholder: "GG/AA/YYYY",
      col: 12,
    },
    {
      name: "guardianWorkplace",
      label: "Çalıştığı Yer",
      type: "text",
      placeholder: "Çalıştığınız yeri giriniz",
      col: 12,
    },
    {
      name: "guardianEmail",
      label: "Veli E-Posta",
      type: "text",
      placeholder: "example@example.com",
      col: 12,
    },
  ];
}

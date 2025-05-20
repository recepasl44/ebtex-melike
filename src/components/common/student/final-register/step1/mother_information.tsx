
import { FieldDefinition } from "../../../ReusableModalForm";

/**
 * Anne Bilgileri (anne sağ, anne veli mi vs.)
 */
export function getMotherFields(): FieldDefinition[] {
  return [
    // Anne Sağ togglebar
    {
      name: "motherAlive",
      label: "Anne Sağ",
      type: "togglebar",
      col: 6,
    },
    // Veli seçimi ve kopyalama
    {
      name: "motherIsGuardian",
      label: "Veli",
      type: "checkbox",
      col: 6,
      onChange: (val, formik) => {
        formik.setFieldValue("motherIsGuardian", val);
        if (val) {
          [
            "motherName",
            "motherTc",
            "motherMobile",
            "motherJob",
            "motherHomeTel",
            "motherWorkTel",
            "motherAddress",
            "motherWorkAddress",
            "motherBirthdate",
            "motherWorkplace",
            "motherEmail",
            "motherMarriage",
          ].forEach((motherKey) => {
            const guardianKey = motherKey.replace(/^mother/, "guardian");
            formik.setFieldValue(guardianKey, formik.values[motherKey]);
          });
        }
      },
    },
    {
      name: "motherName",
      label: "Ad Soyad",
      type: "text",
      placeholder: "Anne adı ve soyadı giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherName", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianName", val);
        }
      },
    },
    {
      name: "motherTc",
      label: "T.C. Kimlik",
      type: "text",
      placeholder: "T.C. kimlik numarası giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherTc", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianTc", val);
        }
      },
    },
    {
      name: "motherMobile",
      label: "Cep Tel",
      type: "text",
      placeholder: "Cep telefonu giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherMobile", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianMobile", val);
        }
      },
    },
    {
      name: "motherJob",
      label: "Meslek",
      type: "text",
      placeholder: "Mesleğinizi giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherJob", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianJob", val);
        }
      },
    },
    {
      name: "motherHomeTel",
      label: "Ev Tel",
      type: "text",
      placeholder: "Ev telefonunuzu giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherHomeTel", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianHomeTel", val);
        }
      },
    },
    {
      name: "motherWorkTel",
      label: "İş Tel",
      type: "text",
      placeholder: "İş telefonunuzu giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherWorkTel", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianWorkTel", val);
        }
      },
    },
    {
      name: "motherAddress",
      label: "Ev Adresi",
      type: "text",
      placeholder: "Ev adresinizi giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherAddress", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianAddress", val);
        }
      },
    },
    {
      name: "motherWorkAddress",
      label: "İş Adresi",
      type: "text",
      placeholder: "İş adresinizi giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherWorkAddress", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianWorkAddress", val);
        }
      },
    },
    {
      name: "motherBirthdate",
      label: "Doğum Tarihi",
      type: "date",
      placeholder: "GG/AA/YYYY",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherBirthdate", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianBirthdate", val);
        }
      },
    },
    {
      name: "motherWorkplace",
      label: "Çalıştığı Yer",
      type: "text",
      placeholder: "Çalıştığınız yeri giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherWorkplace", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianWorkplace", val);
        }
      },
    },
    {
      name: "motherEmail",
      label: "Anne E-Posta",
      type: "text",
      placeholder: "example@example.com",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherEmail", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianEmail", val);
        }
      },
    },
    {
      name: "motherMarriage",
      label: "Evlilik Yıldönümü",
      type: "date",
      placeholder: "GG/AA/YYYY",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("motherMarriage", val);
        if (formik.values.motherIsGuardian) {
          formik.setFieldValue("guardianMarriage", val);
        }
      },
    },
  ];
}

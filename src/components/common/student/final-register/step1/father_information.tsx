
import { FieldDefinition } from "../../../ReusableModalForm";

/**
 * Baba Bilgileri
 */
export function getFatherFields(): FieldDefinition[] {
  return [
    // Baba Sağ togglebar
    {
      name: "fatherAlive",
      label: "Baba Sağ",
      type: "togglebar",
      col: 6,
    },
    // Veli seçimi ve kopyalama
    {
      name: "fatherIsGuardian",
      label: "Veli",
      type: "checkbox",
      col: 6,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherIsGuardian", val);
        if (val) {
          [
            "fatherName",
            "fatherTc",
            "fatherMobile",
            "fatherJob",
            "fatherHomeTel",
            "fatherWorkTel",
            "fatherAddress",
            "fatherWorkAddress",
            "fatherBirthdate",
            "fatherWorkplace",
            "fatherEmail",
            "fatherMarriage",
          ].forEach((fatherKey) => {
            const guardianKey = fatherKey.replace(/^father/, "guardian");
            formik.setFieldValue(guardianKey, formik.values[fatherKey]);
          });
        }
      },
    },
    {
      name: "fatherName",
      label: "Ad Soyad",
      type: "text",
      placeholder: "Baba adı ve soyadı giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherName", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianName", val);
        }
      },
    },
    {
      name: "fatherTc",
      label: "T.C. Kimlik",
      type: "text",
      placeholder: "T.C. kimlik numarası giriniz",
      col: 12,
      onChange: (val, formik) => {
           const sanitized = val.replace(/\D/g, "").slice(0, 11);
        formik.setFieldValue("fatherTc", sanitized);
                if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianTc", sanitized);
        }
      },
    },
    {
      name: "fatherMobile",
      label: "Cep Tel",
       type: "phone",
      placeholder: "Cep telefonu giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherMobile", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianMobile", val);
        }
      },
    },
    {
      name: "fatherJob",
      label: "Meslek",
      type: "text",
      placeholder: "Mesleğinizi giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherJob", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianJob", val);
        }
      },
    },
    {
      name: "fatherHomeTel",
      label: "Ev Tel",
       type: "phone",
      placeholder: "Ev telefonunuzu giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherHomeTel", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianHomeTel", val);
        }
      },
    },
    {
      name: "fatherWorkTel",
      label: "İş Tel",
       type: "phone",  
      placeholder: "İş telefonunuzu giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherWorkTel", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianWorkTel", val);
        }
      },
    },
    {
      name: "fatherAddress",
      label: "Ev Adresi",
      type: "text",
      placeholder: "Ev adresinizi giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherAddress", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianAddress", val);
        }
      },
    },
    {
      name: "fatherWorkAddress",
      label: "İş Adresi",
      type: "text",
      placeholder: "İş adresinizi giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherWorkAddress", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianWorkAddress", val);
        }
      },
    },
    {
      name: "fatherBirthdate",
      label: "Doğum Tarihi",
      type: "date",
      placeholder: "GG/AA/YYYY",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherBirthdate", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianBirthdate", val);
        }
      },
    },
    {
      name: "fatherWorkplace",
      label: "Çalıştığı Yer",
      type: "text",
      placeholder: "Çalıştığınız yeri giriniz",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherWorkplace", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianWorkplace", val);
        }
      },
    },
    {
      name: "fatherEmail",
      label: "Baba E-Posta",
      type: "text",
      placeholder: "example@example.com",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherEmail", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianEmail", val);
        }
      },
    },
    {
      name: "fatherMarriage",
      label: "Evlilik Yıldönümü",
      type: "date",
      placeholder: "GG/AA/YYYY",
      col: 12,
      onChange: (val, formik) => {
        formik.setFieldValue("fatherMarriage", val);
        if (formik.values.fatherIsGuardian) {
          formik.setFieldValue("guardianMarriage", val);
        }
      },
    },
  ];
}

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../ReusableModalForm";
import { FormikHelpers } from "formik";

import { useServiceAdd } from "../../../../hooks/service/useAdd";
import { useServiceUpdate } from "../../../../hooks/service/useUpdate";
import { useServiceShow } from "../../../../hooks/service/useShow";
import { useProgramsTable } from "../../../../hooks/program/useList";
import { useLevelsTable } from "../../../../hooks/levels/useList";
import { useCoursesTable } from "../../../../hooks/course/useList";
import { useServiceTypesList } from "../../../../hooks/serviceTypes/useList";
import { useSchoolCategoriesList } from "../../../../hooks/schoolcategories/useList";
import getUserDataField from "../../../../../utils/user_data_field";

import { IServiceEnum } from "../../../../../enums/service/list";

interface IServiceForm {
  name: string;
  price: string;
  vat_rate: string;
  max_discounts: number;
  accept_discount: number;
  branche_id: number;
  program_id: number;
  level_id: number;
  course_id: number;
  type_id: number;
  school_type_id: number;
  max_installments: number;
  start_installment_date?: string;
  end_installment_date?: string;
}

interface ServiceModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  const isUpdateMode = mode === "update";

  const { branches } = getUserDataField();

  const [filtersEnabled, setFiltersEnabled] = useState({
    program: false,
    level: false,
    course: false,
    serviceType: false,
    schoolType: false,
  });

  const [formValues, setFormValues] = useState<IServiceForm>({
    name: "",
    price: "0",
    vat_rate: "0",
    max_discounts: 0,
    accept_discount: IServiceEnum.CLOSE,
    branche_id: 0,
    program_id: 0,
    level_id: 0,
    course_id: 0,
    type_id: 0,
    school_type_id: 0,
    max_installments: 0,
    start_installment_date: "",
    end_installment_date: "",
  });

  const { programsData } = useProgramsTable({
    enabled: filtersEnabled.program,
    branche_id: Boolean(formValues.branche_id > 0),
  });

  const { levelsData } = useLevelsTable({
    enabled: filtersEnabled.level,
    program_id: formValues.program_id || undefined,
  });

  const { coursesData } = useCoursesTable({
    enabled: filtersEnabled.course,
    level_id: formValues.level_id || undefined,
  });

  const { servicetypesData: serviceTypesData } = useServiceTypesList({
    enabled: filtersEnabled.serviceType,
  });

  const { listData: schoolTypesData } = useSchoolCategoriesList({
    enabled: filtersEnabled.schoolType,
    page: 1,
    pageSize: 100,
  });

  const [initialValues, setInitialValues] = useState<IServiceForm>({
    name: "",
    price: "0",
    vat_rate: "0",
    max_discounts: 0,
    accept_discount: IServiceEnum.CLOSE,
    branche_id: 0,
    program_id: 0,
    level_id: 0,
    course_id: 0,
    type_id: 0,
    school_type_id: 0,
    max_installments: 0,
    start_installment_date: "",
    end_installment_date: "",
  });

  const { addNewService, status: addStatus, error: addError } = useServiceAdd();
  const {
    updateExistingService,
    status: updateStatus,
    error: updateError,
  } = useServiceUpdate();
  const {
    service: fetchedService,
    getService,
    status: showStatus,
    error: showError,
  } = useServiceShow();

  useEffect(() => {
    if (isUpdateMode && id) {
      getService(Number(id));
    }
  }, [isUpdateMode, id, getService]);

  useEffect(() => {
    if (fetchedService && isUpdateMode) {
      const formData = {
        name: fetchedService.name || "",
        price: fetchedService.price || "0",
        vat_rate: fetchedService.vat_rate || "0",
        max_discounts: fetchedService.max_discounts || 0,
        accept_discount: fetchedService.accept_discount || IServiceEnum.CLOSE,
        branche_id: fetchedService.branche_id || 0,
        program_id: fetchedService.program_id || 0,
        level_id: fetchedService.level_id || 0,
        course_id: fetchedService.course_id || 0,
        type_id: fetchedService.type_id || 0,
        school_type_id: fetchedService.school_type_id || 0,
        max_installments: fetchedService.max_installments || 0,
        start_installment_date: fetchedService.start_installment_date || "",
        end_installment_date: fetchedService.end_installment_date || "",
      };

      setInitialValues(formData);
      setFormValues(formData);

      setFiltersEnabled({
        program: formData.branche_id > 0,
        level: formData.program_id > 0,
        course: formData.level_id > 0,
        serviceType: true,
        schoolType: true,
      });
    }
  }, [fetchedService, isUpdateMode]);

  const handleFormValuesChange = (values: IServiceForm) => {
    setFormValues(values);
  };

  const getFields = useCallback((): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Hizmet Adı",
        type: "text",
        required: true,
      },
      {
        name: "price",
        label: "Ücret",
        type: "currency",
        required: true,
      },
      {
        name: "vat_rate",
        label: "KDV Oranı",
        type: "number",
        required: true,
      },
      {
        name: "start_installment_date",
        label: "Tarih Aralığı",
        type: "doubledate",
        required: true,
        onChange: (value, formik) => {
          formik.setFieldValue("start_installment_date", value.startDate);
          formik.setFieldValue("end_installment_date", value.endDate);
        },
      },

      {
        name: "max_discounts",
        label: "Max İndirim",
        type: "number",
        required: true,
      },
      {
        name: "accept_discount",
        label: "İndirim Durumu",
        type: "select",
        required: true,
        options: [
          { value: IServiceEnum.CLOSE, label: "Kapalı" },
          { value: IServiceEnum.OPEN, label: "Açık" },
        ],
      },
      {
        name: "branche_id",
        label: "Şube",
        type: "select",
        required: true,
        options: branches,
        onChange: (value, formik) => {
          formik.setFieldValue("branche_id", Number(value));

          formik.setFieldValue("program_id", 0);
          formik.setFieldValue("level_id", 0);
          formik.setFieldValue("course_id", 0);

          setFiltersEnabled((prev) => ({
            ...prev,
            program: true,
            level: false,
            course: false,
          }));

          handleFormValuesChange({
            ...formik.values,
            branche_id: Number(value),
            program_id: 0,
            level_id: 0,
            course_id: 0,
          });
        },
      },
      {
        name: "program_id",
        label: "Okul Seviyesi",
        type: "select",
        required: true,
        options: (programsData || []).map((p) => ({
          value: p.id,
          label: p.name,
        })),
        dependencyKey: "branche_id",
        onChange: (value, formik) => {
          formik.setFieldValue("program_id", Number(value));
          formik.setFieldValue("level_id", 0);
          formik.setFieldValue("course_id", 0);

          setFiltersEnabled((prev) => ({
            ...prev,
            level: true,
            course: false,
          }));

          handleFormValuesChange({
            ...formik.values,
            program_id: Number(value),
            level_id: 0,
            course_id: 0,
          });
        },
        onFocus: () => {
          setFiltersEnabled((prev) => ({ ...prev, program: true }));
        },
      },
      {
        name: "level_id",
        label: "Sınıf Seviyesi",
        type: "select",
        required: true,
        dependencyKey: "program_id",
        options: (levelsData || []).map((l) => ({
          value: l.id,
          label: l.name,
        })),
        onChange: (value, formik) => {
          formik.setFieldValue("level_id", Number(value));
          formik.setFieldValue("course_id", 0);

          setFiltersEnabled((prev) => ({ ...prev, course: true }));

          handleFormValuesChange({
            ...formik.values,
            level_id: Number(value),
            course_id: 0,
          });
        },
        onFocus: () => {
          if (formValues.program_id > 0) {
            setFiltersEnabled((prev) => ({ ...prev, level: true }));
          }
        },
      },
      {
        name: "course_id",
        label: "Alan",
        type: "select",
        dependencyKey: "level_id",
        options: (coursesData || []).map((c) => ({
          value: c.id,
          label: c.name,
        })),
        onFocus: () => {
          if (formValues.level_id > 0) {
            setFiltersEnabled((prev) => ({ ...prev, course: true }));
          }
        },
      },
      {
        name: "service_type_id",
        label: "Hizmet Türü",
        type: "select",
        onFocus: () => {
          setFiltersEnabled((prev) => ({ ...prev, serviceType: true }));
        },
        options: (serviceTypesData || []).map((st) => ({
          value: st.id,
          label: st.name,
        })),
      },
      {
        name: "school_type_id",
        label: "Okul Türü",
        type: "select",
        onFocus: () => {
          setFiltersEnabled((prev) => ({ ...prev, schoolType: true }));
        },
        options: (schoolTypesData || []).map((st) => ({
          value: st.id,
          label: st.name,
        })),
      },
      {
        name: "max_installments",
        label: "Max Taksit",
        type: "number",
        required: true,
      },
    ];
  }, [
    branches,
    programsData,
    levelsData,
    coursesData,
    schoolTypesData,
    serviceTypesData,
    formValues.program_id,
    formValues.level_id,
  ]);

  const loading =
    addStatus === "LOADING" ||
    updateStatus === "LOADING" ||
    showStatus === "LOADING";
  const mergedError = addError || updateError || showError;

  async function handleSubmit(
    values: IServiceForm,
    _helpers: FormikHelpers<IServiceForm>
  ) {
    try {
      if (mode === "add") {
        await addNewService(values);
      } else if (mode === "update" && id) {
        await updateExistingService({
          service_id: Number(id),
          payload: values,
        });
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      _helpers.setSubmitting(false);
    }
  }

  return (
    <ReusableModalForm
      show={show}
      title={isUpdateMode ? "Hizmet Güncelle" : "Hizmet Ekle"}
      fields={getFields()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={isUpdateMode ? "Güncelle" : "Kaydet"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={mergedError}
      onClose={onClose}
      autoGoBackOnModalClose={true}
    />
  );
};

export default ServiceModal;

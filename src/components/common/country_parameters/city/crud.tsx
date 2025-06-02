import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { addCity } from "../../../../slices/cities/add/thunk";
import { updateCity } from "../../../../slices/cities/update/thunk";
import { showCity } from "../../../../slices/cities/show/thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";

interface FormData extends FormikValues {
  name: string;
}

export default function CityCrud() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { country_id?: number } };
  const dispatch = useDispatch<AppDispatch>();
  const mode = id ? "update" : "add";
  const [initialValues, setInitialValues] = useState<FormData>({ name: "" });

  const getFields = (): FieldDefinition[] => [
    { name: "name", label: "Şehir Adı", type: "text", required: true },
  ];

  useEffect(() => {
    if (mode === "update" && id) {
      dispatch(showCity(Number(id))).then((res: any) => {
        if (showCity.fulfilled.match(res)) {
          setInitialValues({ name: res.payload.cityName });
        }
      });
    }
  }, [mode, id, dispatch]);

  const handleSubmit = async (values: FormData, _helpers: FormikHelpers<FormData>) => {
    if (mode === "add") {
      await dispatch(addCity({ ...values, country_id: location.state?.country_id || 0 }));
    } else if (id) {
      await dispatch(updateCity({ cityId: Number(id), payload: values }));
    }
    navigate("/parameters/country", { state: { country_id: location.state?.country_id } });
  };

  return (
    <ReusableModalForm<FormData>
      show={true}
      title={mode === "add" ? "Şehir Ekle" : "Şehir Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      onClose={() => navigate("/parameters/country")}
      autoGoBackOnModalClose
    />
  );
}

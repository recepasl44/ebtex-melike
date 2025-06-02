import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { addCountry } from "../../../../slices/countries/add/thunk";
import { updateCountry } from "../../../../slices/countries/update/thunk";
import { fetchCountry } from "../../../../slices/countries/show/thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";

interface FormData extends FormikValues {
  name: string;
}

export default function CountryCrud() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<FormData>({ name: "" });

  const getFields = (): FieldDefinition[] => [
    { name: "name", label: "Ülke Adı", type: "text", required: true },
  ];

  useEffect(() => {
    if (mode === "update" && id) {
      dispatch(fetchCountry(Number(id))).then((res: any) => {
        if (fetchCountry.fulfilled.match(res)) {
          setInitialValues({ name: res.payload.name });
        }
      });
    }
  }, [mode, id, dispatch]);

  const handleSubmit = async (values: FormData, _helpers: FormikHelpers<FormData>) => {
    if (mode === "add") {
      await dispatch(addCountry(values));
    } else if (id) {
      await dispatch(updateCountry({ countryId: Number(id), payload: values }));
    }
    navigate("/parameters/country");
  };

  return (
    <ReusableModalForm<FormData>
      show={true}
      title={mode === "add" ? "Ülke Ekle" : "Ülke Güncelle"}
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

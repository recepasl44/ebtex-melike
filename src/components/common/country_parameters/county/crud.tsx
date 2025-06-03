import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { addCounty } from "../../../../slices/counties/add/thunk";
import { updateCounty } from "../../../../slices/counties/update/thunk";
import { showCounty } from "../../../../slices/counties/show/thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { AddCountyPayload } from "../../../../types/counties/add";

interface FormData extends FormikValues, AddCountyPayload {}

export default function CountyCrud() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { city_id?: number } };
  const dispatch = useDispatch<AppDispatch>();
  const mode = id ? "update" : "add";
  const [initialValues, setInitialValues] = useState<FormData>({
    name: "",
    city_id: location.state?.city_id ?? 0,
  });

  const getFields = (): FieldDefinition[] => [
    { name: "name", label: "İlçe Adı", type: "text", required: true },
  ];

  useEffect(() => {
    if (mode === "update" && id) {
      dispatch(showCounty(Number(id))).then((res: any) => {
        if (showCounty.fulfilled.match(res)) {
          setInitialValues({
            name: res.payload.name,
            city_id: res.payload.city_id,
          });
        }
      });
    }
  }, [mode, id, dispatch]);

  const handleSubmit = async (values: FormData, _helpers: FormikHelpers<FormData>) => {
    if (mode === "add") {
      await dispatch(addCounty(values));
    } else if (id) {
      await dispatch(updateCounty({ countyId: Number(id), payload: values }));
    }
    navigate("/parameters/country", { state: { city_id: location.state?.city_id } });
  };

  return (
    <ReusableModalForm<FormData>
      show={true}
      title={mode === "add" ? "İlçe Ekle" : "İlçe Güncelle"}
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

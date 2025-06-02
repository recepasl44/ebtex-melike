import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { addDistrict } from "../../../../slices/districts/add/thunk";
import { updateDistrict } from "../../../../slices/districts/update/thunk";
import { showDistrict } from "../../../../slices/districts/show/thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";

interface FormData extends FormikValues {
  name: string;
}

export default function DistrictCrud() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { county_id?: number } };
  const dispatch = useDispatch<AppDispatch>();
  const mode = id ? "update" : "add";
  const [initialValues, setInitialValues] = useState<FormData>({ name: "" });

  const getFields = (): FieldDefinition[] => [
    { name: "name", label: "Mahalle Adı", type: "text", required: true },
  ];

  useEffect(() => {
    if (mode === "update" && id) {
      dispatch(showDistrict(Number(id))).then((res: any) => {
        if (showDistrict.fulfilled.match(res)) {
          setInitialValues({ name: res.payload.name });
        }
      });
    }
  }, [mode, id, dispatch]);

  const handleSubmit = async (values: FormData, _helpers: FormikHelpers<FormData>) => {
    if (mode === "add") {
      await dispatch(addDistrict({ ...values, county_id: location.state?.county_id || 0 }));
    } else if (id) {
      await dispatch(updateDistrict({ districtId: Number(id), payload: values }));
    }
    navigate("/parameters/country", { state: { county_id: location.state?.county_id } });
  };

  return (
    <ReusableModalForm<FormData>
      show={true}
      title={mode === "add" ? "Mahalle Ekle" : "Mahalle Güncelle"}
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

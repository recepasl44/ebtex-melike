import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { useRentShow } from "../../hooks/rent/useRentShow";
import { useRentAdd, RentAddPayload } from "../../hooks/rent/useRentAdd";
import { useRentUpdate, RentUpdatePayload } from "../../hooks/rent/useRentUpdate";
import { useSeasonsBranches } from "../../header/hooks/useSeasonsBranches";

interface RentFormData extends FormikValues {
  rent_date: string;
  total_rent: number;
}

export default function RentCrud() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<RentFormData>({
    rent_date: "",
    total_rent: 0,
  });

  const { rent, getRent } = useRentShow();
  const { status: addStatus, error: addError, addNewRent } = useRentAdd();
  const { status: updateStatus, error: updateError, updateRent } = useRentUpdate();
  const { selectedSeason, selectedBranch } = useSeasonsBranches();

  useEffect(() => {
    if (mode === "update" && id) {
      getRent(Number(id));
    }
  }, [mode, id, getRent]);

  useEffect(() => {
    if (mode === "update" && rent) {
      setInitialValues({
        rent_date: rent.rent_date,
        total_rent: Number(rent.total_rent),
      });
    }
  }, [mode, rent]);

  const loading = mode === "add" ? addStatus === "LOADING" : updateStatus === "LOADING";
  const error = mode === "add" ? addError : updateError;

  const getFields = (): FieldDefinition[] => [
    { name: "rent_date", label: "Tarih", type: "date", required: true },
    { name: "total_rent", label: "Toplam", type: "currency", required: true },
  ];

  async function handleSubmit(values: RentFormData, _helpers: FormikHelpers<RentFormData>) {
    const payloadBase = {
      rent_date: values.rent_date,
      total_rent: values.total_rent,
      branch_id: selectedBranch || 0,
      season_id: selectedSeason || 0,
    };
    if (mode === "add") {
      await addNewRent(payloadBase as RentAddPayload);
    } else if (mode === "update" && id) {
      await updateRent(Number(id), payloadBase as RentUpdatePayload);
    }
    navigate(-1);
  }

  return (
    <ReusableModalForm<RentFormData>
      show={true}
      title={mode === "add" ? "Kira Ekle" : "Kira Güncelle"}
      fields={getFields()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={error || undefined}
      autoGoBackOnModalClose={true}
      onClose={() => navigate(-1)}
    />
  );
}

// src/components/common/internal/SeasonDetail.tsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { useSeasonAdd } from "../../../components/hooks/season/useSeasonsAdd";
import { useSeasonUpdate } from "../../../components/hooks/season/useSeasonsUpdate";
import { useSeasonDetail } from "../../../components/hooks/season/useSeasonsDetail";

interface ISeasonForm {
    name: string;
}

interface SeasonDetailProps {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

const SeasonDetail: React.FC<SeasonDetailProps> = ({
    show,
    onClose,
    onRefresh,
}) => {
    const { id } = useParams<{ id?: string }>();
    const isEdit = Boolean(id);

    // --- initialValues ve hook’lar ---
    const [initialValues, setInitialValues] = useState<ISeasonForm>({ name: "" });
    const { addNewSeason, status: addStatus, error: addError } = useSeasonAdd();
    const {
        updateExistingSeason,
        status: updateStatus,
        error: updateError,
    } = useSeasonUpdate();
    const {
        season: fetched,
        status: fetchStatus,
        error: fetchError,
        getSeason,
    } = useSeasonDetail();

    // Düzenleme modunda, detayı çek
    useEffect(() => {
        if (isEdit && id) getSeason(Number(id));
    }, [isEdit, id, getSeason]);

    // Fetched geldiğinde formu doldur
    useEffect(() => {
        if (isEdit && fetched && !Array.isArray(fetched)) {
            setInitialValues({ name: fetched.name });
        }
    }, [isEdit, fetched]);

    const isLoading =
        fetchStatus === "LOADING" ||
        addStatus === "LOADING" ||
        updateStatus === "LOADING";
    const error = isEdit ? updateError || fetchError : addError;

    // Form alanları
    const getFields = useCallback(
        (_vals: FormikValues): FieldDefinition[] => [
            {
                name: "name",
                label: "Sezon Adı",
                type: "text",
                required: true,
            },
        ],
        []
    );

    // Submit handler
    const handleSubmit = async (
        values: ISeasonForm,
        _helpers: FormikHelpers<ISeasonForm>
    ) => {
        if (isEdit && id) {
            await updateExistingSeason({
                seasonId: Number(id),
                payload: {
                    name: values.name,
                    program_id: 0,
                    season_number: 0,
                    seasons: null
                },
            });
        } else {
            await addNewSeason({
                name: values.name,
                description: "",
                start_date: "",
                end_date: "",
                status: 0,
                season_id: null,
                seasons: null
            });
        }
        onRefresh();
        onClose();
    };

    return (
        <ReusableModalForm<ISeasonForm>
            show={show}
            title={isEdit ? "Sezon Düzenle" : "Yeni Sezon Ekle"}
            fields={getFields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel={isEdit ? "Güncelle" : "Kaydet"}
            cancelButtonLabel="Kapat"
            isLoading={isLoading}
            error={error || null}
            onClose={onClose}
            autoGoBackOnModalClose
            mode="single"
        />
    );
};

export default SeasonDetail;

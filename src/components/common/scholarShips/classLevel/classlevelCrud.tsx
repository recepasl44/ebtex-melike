
import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import type { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { useQuizLevelsList } from "../../../hooks/quizLevels/useQuizLevelsList";
import { useQuizLevelsDetail } from "../../../hooks/quizLevels/useQuizLevelsDetail";
import { useQuizLevelsAdd } from "../../../hooks/quizLevels/useQuizLevelsAdd";
import { useQuizLevelsUpdate } from "../../../hooks/quizLevels/useQuizLevelsUpdate";

interface IForm extends FormikValues {
    level_id: number;
}

export default function ScholarShipClassLevelModal({
    show,
    onClose,
    onRefresh,
}: {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}) {

    const { quizLevelId: param } = useParams<{ quizLevelId?: string }>();
    const quizLevelId = param ? Number(param) : null;
    const mode = quizLevelId === null ? "add" : "update";

    const {
        quizId,

        typeId,
        timeId,
    } = (useLocation().state as any) || {};


    const {
        quizLevelsData: levels,
        loading: listLoading,
        error: listError,
    } = useQuizLevelsList({
        enabled: true,
        quiz_id: quizId,
        type_id: typeId,
        time_id: timeId,
        paginate: 100,
        page: 1,
        pageSize: 100,
    });

    const {
        quizLevel,
        getQuizLevel,
        status: fetchStatus,
        error: fetchError,
    } = useQuizLevelsDetail();
    const { addNewQuizLevel, status: addStatus, error: addError } = useQuizLevelsAdd();
    const { updateExistingQuizLevel, status: updStatus, error: updError } =
        useQuizLevelsUpdate();

    const [initialValues, setInitialValues] = useState<IForm>({ level_id: 0 });


    useEffect(() => {
        if (mode === "update" && quizLevelId !== null) {
            getQuizLevel(quizLevelId);
        }
    }, [mode, quizLevelId, getQuizLevel]);

    useEffect(() => {
        if (
            mode === "update" &&
            quizLevel &&
            !Array.isArray(quizLevel)
        ) {
            setInitialValues({ level_id: quizLevel.level_id ?? 0 });
        }
    }, [mode, quizLevel]);

    const getFields = useCallback((): FieldDefinition[] => [
        {
            name: "level_id",
            label: "Sınıf Seviyesi",
            type: "select",
            required: true,
            options: levels.map(l => ({ value: l.id, label: l.level?.name || "—" })),
        },
    ], [levels]);

    async function handleSubmit(
        values: IForm,
        _helpers: FormikHelpers<IForm>
    ) {
        const payload = {
            time_id: timeId,
            level_id: values.level_id,
            type_id: typeId,
        };

        if (mode === "add") {
            await addNewQuizLevel(payload);
        } else if (quizLevelId !== null) {
            await updateExistingQuizLevel({ quizLevelId, payload });
        }

        onRefresh();
        onClose();
    }

    const isLoading =
        listLoading ||
        fetchStatus === "LOADING" ||
        (mode === "add" && addStatus === "LOADING") ||
        (mode === "update" && updStatus === "LOADING");

    const error =
        listError || (mode === "add" ? addError : updError) || fetchError || null;

    return (
        <ReusableModalForm<IForm>
            show={show}
            title={mode === "add" ? "Sınıf Seviyesi Ekle" : "Sınıf Seviyesi Güncelle"}
            fields={getFields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={error}
            onClose={onClose}
            autoGoBackOnModalClose={false}
            mode="double"
        />
    );
}

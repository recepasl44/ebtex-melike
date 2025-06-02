
import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";

import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { useQuizTimesDetail } from "../../../hooks/quizTimes/useQuizTimesDetail";
import { useQuizTimesAdd } from "../../../hooks/quizTimes/useQuizTimesAdd";
import { useQuizTimesUpdate } from "../../../hooks/quizTimes/useQuizTimesUpdate";

interface Props {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

interface IQuizTimeForm extends FormikValues {
    time: string;
}

export default function QuizTimeModal({
    show,
    onClose,
    onRefresh,
}: Props) {
    const { id: quizTimeIdParam } = useParams<{ id?: string }>();
    const quizTimeId = quizTimeIdParam ? Number(quizTimeIdParam) : null;
    const mode = quizTimeId ? "update" : "add";


    const {
        session_id: sessionId,

        type_id: typeId,

    } = (useLocation().state as any) || {};

    const {
        quizTime,
        getQuizTime,
        status: fetchStatus,
        error: fetchError,
    } = useQuizTimesDetail();
    const { addNewQuizTime, status: addStatus, error: addError } = useQuizTimesAdd();
    const { updateExistingQuizTime, status: updStatus, error: updError } = useQuizTimesUpdate();

    const [initialValues, setInitialValues] = useState<IQuizTimeForm>({ time: "" });


    useEffect(() => {
        if (mode === "update" && quizTimeId !== null) {
            getQuizTime(quizTimeId);
        }
    }, [mode, quizTimeId, getQuizTime]);

    useEffect(() => {
        if (
            mode === "update" &&
            quizTime &&
            typeof quizTime.session_hour === "number" &&
            typeof quizTime.session_minute === "number"
        ) {
            const hh = String(quizTime.session_hour).padStart(2, "0");
            const mm = String(quizTime.session_minute).padStart(2, "0");
            setInitialValues({ time: `${hh}:${mm}` });
        }
    }, [mode, quizTime]);

    const getFields = useCallback(
        (_: IQuizTimeForm): FieldDefinition[] => [
            {
                name: "time",
                label: "Seans Saati",
                type: "time",
                required: true,
                autoFocus: true,
            },
        ],
        []
    );

    async function handleSubmit(
        values: IQuizTimeForm,
        _helpers: FormikHelpers<IQuizTimeForm>
    ) {
        if (!sessionId || !typeId) {
            throw new Error("Gerekli ID’ler eksik");
        }

        const [hourStr, minuteStr] = values.time.split(":");
        const payload = {
            session_id: sessionId,
            session_hour: parseInt(hourStr, 10),
            session_minute: parseInt(minuteStr, 10),
            session_second: 0,
            type_id: typeId,
        };

        if (mode === "add") {
            await addNewQuizTime(payload);
        } else if (quizTimeId !== null) {
            await updateExistingQuizTime({ quizTimeId, payload });
        }

        onRefresh();
        onClose();
    }

    const isLoading =
        fetchStatus === "LOADING" ||
        (mode === "add" && addStatus === "LOADING") ||
        (mode === "update" && updStatus === "LOADING");
    const error = mode === "add" ? addError : updError || fetchError || null;

    return (
        <ReusableModalForm<IQuizTimeForm>
            show={show}
            title={mode === "add" ? "Seans Ekle" : "Seans Güncelle"}
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

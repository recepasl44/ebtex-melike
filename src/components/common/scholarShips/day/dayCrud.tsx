import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FormikHelpers, FormikValues } from "formik";

import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { useQuizSessionsDetail } from "../../../hooks/quizSessions/useQuizSessionsDetail";
import { useQuizSessionsAdd } from "../../../hooks/quizSessions/useQuizSessionsAdd";
import { useQuizSessionsUpdate } from "../../../hooks/quizSessions/useQuizSessionsUpdate";

interface IQuizSessionForm extends FormikValues {
    session_date: string;
}

export default function QuizSessionModal({
    show,
    onClose,
    onRefresh,
}: {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}) {
    const { id: sessionId } = useParams<{ id?: string }>();
    const { search } = useLocation();
    const qp = new URLSearchParams(search);
    const quizId = qp.get("quiz_id");

    const mode = sessionId ? "update" : "add";

    const {
        quizSession,
        getQuizSession,
        status: fetchStatus,
        error: fetchError,
    } = useQuizSessionsDetail();

    const {
        addNewQuizSession,
        status: addStatus,
        error: addError,
    } = useQuizSessionsAdd();

    const {
        updateExistingQuizSession,
        status: updStatus,
        error: updError,
    } = useQuizSessionsUpdate();

    const [initialValues, setInitialValues] = useState<IQuizSessionForm>({
        session_date: "",
    });

    useEffect(() => {
        if (mode === "update" && sessionId) {
            getQuizSession(Number(sessionId));
        }
    }, [mode, sessionId, getQuizSession]);

    useEffect(() => {
        if (mode === "update" && quizSession && !Array.isArray(quizSession)) {
            setInitialValues({
                session_date: quizSession.session_date ?? "",
            });
        }
    }, [mode, quizSession]);

    const getFields = useCallback((): FieldDefinition[] => [
        {
            name: "session_date",
            label: "Gün",
            type: "date",
            required: true,
        },
    ], []);

    async function handleSubmit(
        values: IQuizSessionForm,
        _helpers: FormikHelpers<IQuizSessionForm>
    ) {
        if (mode === "add") {
            await addNewQuizSession({
                session_date: values.session_date,
                type_id: Number(qp.get("type_id") || 1),
                quiz_id: Number(quizId),
                branche_id: Number(qp.get("branche_id") || 0),
            });
        } else {
            await updateExistingQuizSession({
                quizSessionId: Number(sessionId),
                payload: {
                    session_date: values.session_date,
                    type_id: 0,
                    quiz_id: 0,
                    branche_id: 0
                },
            });
        }
        onRefresh();
        onClose();
    }

    const isLoading =
        fetchStatus === "LOADING" ||
        (mode === "add" && addStatus === "LOADING") ||
        (mode === "update" && updStatus === "LOADING");

    const error = mode === "add" ? addError : updError || fetchError;

    return (
        <ReusableModalForm<IQuizSessionForm>
            show={show}
            title={mode === "add" ? "Gün Ekle" : "Güncelle"}
            fields={getFields()}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={error || null}
            onClose={onClose}
            autoGoBackOnModalClose={false}
            mode="double"
        />
    );
}

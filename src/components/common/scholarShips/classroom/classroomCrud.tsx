
import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import type { FormikHelpers, FormikValues } from "formik";
import { useDispatch } from "react-redux";

import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { useClassroomList } from "../../../hooks/classrooms/useList";
import { useClassroomDetail } from "../../../hooks/classrooms/useDetail";
import { useQuizClassroomAdd } from "../../../hooks/quizClassroom/useQuizClassroomAdd";
import { useQuizClassroomUpdate } from "../../../hooks/quizClassroom/useQuizClassroomUpdate";
import { fetchQuizClassrooms } from "../../../../slices/quizClassroom/list/thunk";
import { AppDispatch } from "../../../../store";

interface Props {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

interface IForm extends FormikValues {
    classroom_id: number;
    available_quota: number;
    quota: number | "";
}

export default function ClassroomCrud({ show, onClose, onRefresh }: Props) {
    const dispatch = useDispatch<AppDispatch>();


    const { id: recordIdParam } = useParams<{ id?: string }>();
    const recordId = recordIdParam ? Number(recordIdParam) : null;
    const mode = recordId ? "update" : "add";

    const {

        quiz_level_id,
        quiz_id,
        type_id,
        branch_id,
    } = (useLocation().state as {
        session_id?: number;
        time_id?: number;
        quiz_level_id?: number;
        quiz_id?: number;
        type_id?: number;
        branch_id?: number;
    }) || {};


    const { classroomData } = useClassroomList({ branchId: branch_id!, page: 1, pageSize: 100 });
    const { getClassroom } = useClassroomDetail();

    const {
        addNewQuizClassroom,
        status: addStatus,
        error: addError,
    } = useQuizClassroomAdd();
    const {
        updateExistingQuizClassroom,
        status: updStatus,
        error: updError,
    } = useQuizClassroomUpdate();


    const [initialValues, setInitialValues] = useState<IForm>({
        classroom_id: 0,
        available_quota: 0,
        quota: "",
    });

    useEffect(() => {
        if (mode === "update" && recordId) {
            (async () => {
                const det: any = await getClassroom(recordId);
                if (det) {
                    setInitialValues({
                        classroom_id: det.classroom_id,
                        available_quota: det.classroom?.quota ?? 0,
                        quota: det.quota ?? "",
                    });
                }
            })();
        }
    }, [mode, recordId, getClassroom]);


    const classroomOptions = useMemo(
        () => classroomData.map(c => ({ value: c.id, label: c.name })),
        [classroomData]
    );


    const getFields = useCallback((): FieldDefinition[] => [
        {
            name: "classroom_id",
            label: "Derslik",
            type: "select",
            required: true,
            options: classroomOptions,
            onChange: async (val, { setFieldValue }) => {
                const cid = Number(val);
                setFieldValue("classroom_id", cid);
                const cls = classroomData.find(c => c.id === cid);
                setFieldValue("available_quota", cls?.quota ?? 0);
                const det: any = await getClassroom(cid);
                if (det?.quota !== undefined) {
                    setFieldValue("available_quota", det.quota);
                }
            },
        },
        {
            name: "available_quota",
            label: "Mevcut Kota",
            type: "text",

        },
        {
            name: "quota",
            label: "Kota",
            type: "number",
            min: 0,
            onChange: (value: any, formik: any) => {
                const v = value?.target?.value ?? value;
                formik.setFieldValue("quota", v === "" ? "" : Number(v));
            },
        },
    ], [classroomOptions, classroomData, getClassroom]);

    async function handleSubmit(values: IForm, _helpers: FormikHelpers<IForm>) {
        const quotaNum = values.quota === "" ? 0 : Number(values.quota);

        if (!quiz_level_id || !type_id || !quiz_id) {
            toast.error("Gerekli bilgiler eksik");
            return;
        }

        const payload = {
            quiz_level_id,
            type_id,
            quiz_id,
            classroom_id: values.classroom_id,
            quota: quotaNum,
        };

        try {
            if (mode === "add") {
                await addNewQuizClassroom(payload);
                toast.success("Derslik eklendi");
            } else {
                await updateExistingQuizClassroom({
                    quizClassroomId: recordId!,
                    payload: {
                        ...payload,
                        scholarship_id: quiz_level_id
                    },
                });
                toast.success("Derslik güncellendi");
            }

            dispatch(fetchQuizClassrooms({
                quiz_level_id,
                branche_id: branch_id!,
                quiz_id,
                paginate: 10,
                page: 1,
            }));

            onRefresh();
            onClose();
        } catch {
            toast.error("İşlem başarısız");
        }
    }

    const isLoading = addStatus === "LOADING" || updStatus === "LOADING";
    const error = addError || updError || null;

    return (
        <ReusableModalForm<IForm>
            show={show}
            title={mode === "add" ? "Derslik Ekle" : "Derslik Güncelle"}
            fields={getFields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={error}
            onClose={onClose}
            autoGoBackOnModalClose={false}
            mode="single"
        />
    );
}

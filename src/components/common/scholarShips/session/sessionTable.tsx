
import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { useQuizTimesList } from "../../../hooks/quizTimes/useQuizTimesList";
import { useQuizTimesDelete } from "../../../hooks/quizTimes/useQuizTimesDelete";
import { fetchQuizLevels } from "../../../../slices/quizLevels/list/thunk";
import { IQuizTime } from "../../../../types/quizTimes/list";
import { AppDispatch } from "../../../../store";

export interface QuizSessionsListPageProps {
    enabled: boolean;
    onSelectTime: (time: IQuizTime | null) => void;
}

export default function QuizSessionsListPage({
    enabled = false,
    onSelectTime,
}: QuizSessionsListPageProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { removeQuizTime } = useQuizTimesDelete();

    const {
        session_id,
        quiz_id,
        type_id,
        branche_id,
    } = (location.state as any) || {};

    const {
        quizTimesData,
        loading,
        error,
        page,
        pageSize,
        totalPages,
        totalItems,
        setPage,
        setPageSize,
    } = useQuizTimesList({
        enabled,
        quiz_id,
        branche_id,
        paginate: 5,
        page: 1,
        pageSize: 10,
    });

    const handleFetchLevels = (s: IQuizTime) => {
        dispatch(
            fetchQuizLevels({
                session_id: s.id,
                quiz_id,
                branche_id,
                paginate: 5,
                page: 1,
            })
        );
        onSelectTime?.(s);
    };

    const columns: ColumnDefinition<IQuizTime>[] = useMemo(
        () => [
            {
                key: "session_time",
                label: "Seans",
                render: (r) =>
                    `${String(r.session_hour).padStart(2, "0")}:${String(r.session_minute).padStart(2, "0")}`,
            },
            {
                key: "actions",
                label: "İşlemler",
                headerStyle: { textAlign: "right" },
                style: { textAlign: "right", width: 180 },
                render: (r) => (
                    <div className="d-flex justify-content-end gap-2">

                        <button
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                            onClick={() =>
                                navigate(`/scholarships/sessions/crud/${r.id}`, {
                                    state: { session_id, quiz_id, type_id, branche_id },
                                })
                            }
                        >
                            <i className="ti ti-pencil" />
                        </button>

                        <button
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                            onClick={() => removeQuizTime(r.id)}
                        >
                            <i className="ti ti-trash" />
                        </button>


                        <button
                            className="btn btn-icon btn-sm btn-success-light rounded-pill"
                            onClick={() => handleFetchLevels(r)}
                        >
                            <i className="ti ti-check" />
                        </button>
                    </div>
                ),
            },
        ],
        [navigate, removeQuizTime, handleFetchLevels, session_id, quiz_id, type_id, branche_id]
    );

    return (
        <div className="container mt-3">
            <ReusableTable<IQuizTime>
                columns={columns}
                data={quizTimesData}
                loading={loading}
                error={error}
                showModal={false}
                showExportButtons={false}

                onAdd={() =>
                    navigate("/scholarships/sessions/crud", {
                        state: { session_id, quiz_id, type_id, branche_id },
                    })
                }

                tableMode="single"
                filters={[]}

                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                }}

                exportFileName="quiz-sessions"
                onDeleteRow={(r) => removeQuizTime(r.id)}
            />
        </div>
    );
}


import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { useQuizSessionsList } from "../../../hooks/quizSessions/useQuizSessionsList";
import { useQuizSessionsDelete } from "../../../hooks/quizSessions/useQuizSessionsDelete";
import { fetchQuizTimes } from "../../../../slices/quizTimes/list/thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { IQuizSession } from "../../../../types/quizSessions/list";

export default function QuizListPage({ onSelectSession }: { onSelectSession?: (s: IQuizSession) => void }) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { id: quizId } = useParams<{ id?: string }>();

    const { removeQuizSession } = useQuizSessionsDelete();
    const {
        quizSessionsData, loading, error,
        page, pageSize, totalPages, totalItems,
        setPage, setPageSize,
    } = useQuizSessionsList({ enabled: true });

    const handleFetchTimes = (s: IQuizSession) => {
        dispatch(fetchQuizTimes({ session_id: s.id, paginate: 5, page: 1 }));
        onSelectSession?.(s);
    };

    const columns: ColumnDefinition<IQuizSession>[] = useMemo(() => [
        {
            key: "session_date",
            label: "Tarih",
            render: r => r.session_date ?? "-",
        },
        {
            key: "actions",
            label: "İşlemler",
            style: { textAlign: "right", width: 180 },
            render: r => (
                <div className="d-flex justify-content-end gap-2">
                    {/* 1. Düzenle (Kalem) */}
                    <button
                        className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        onClick={() =>
                            navigate(
                                `/scholarships/days/crud/${r.id}?quiz_id=${quizId}&type_id=${r.type_id}&branche_id=${r.branche_id}`
                            )
                        }
                    >
                        <i className="ti ti-pencil" />
                    </button>

                    {/* 2. Sil (Çöp) */}
                    <button
                        className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => removeQuizSession(r.id)}
                    >
                        <i className="ti ti-trash" />
                    </button>

                    {/* 3. Seç (✓) */}
                    <button
                        className="btn btn-icon btn-sm btn-success-light rounded-pill"
                        onClick={() => {
                            handleFetchTimes(r);
                            navigate(`/scholarships/index/${quizId}`, {
                                state: {
                                    session_id: r.id,
                                    quiz_id: r.quiz_id,
                                    type_id: r.type_id,
                                    branch_id: r.branche_id,
                                }
                            });
                        }}
                    >
                        <i className="ti ti-check" />
                    </button>
                </div>
            )
        }
    ], [navigate, removeQuizSession, handleFetchTimes, quizId]);

    return (
        <div className="container mt-3">
            <ReusableTable<IQuizSession>
                columns={columns}
                data={quizSessionsData}
                loading={loading}
                error={error}
                showModal={false}
                showExportButtons={false}

                onAdd={() => navigate(`/scholarships/days/crud?quiz_id=${quizId}`)}

                tableMode="single"
                filters={[]}

                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={s => { setPageSize(s); setPage(1); }}

                exportFileName="quiz-days"
                onDeleteRow={r => removeQuizSession(r.id)}
            />
        </div>
    );
}

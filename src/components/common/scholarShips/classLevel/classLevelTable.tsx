
import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { useQuizLevelsList } from "../../../hooks/quizLevels/useQuizLevelsList";
import { useQuizLevelsDelete } from "../../../hooks/quizLevels/useQuizLevelsDelete";
import { fetchQuizClassrooms } from "../../../../slices/quizClassroom/list/thunk";
import { QuizLevel } from "../../../../types/quizLevels/list";
import { AppDispatch } from "../../../../store";
import { IQuizTime } from "../../../../types/quizTimes/list";

export interface ClassLevelListPageProps {
    enabled?: boolean;
    onSelectClassLevel?: (lvl: QuizLevel) => void;
    time?: IQuizTime | null;
    onSelectLevel?: (level: QuizLevel | null) => void;

}

export default function ClassLevelListPage({
    enabled = false,
    onSelectClassLevel,
}: ClassLevelListPageProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { removeQuizLevel } = useQuizLevelsDelete();

    // parent'tan gelen bütün ID'ler:
    const {
        quizId,
        branchId,
        sessionId,
        typeId,
        timeId,
    } = (location.state as any) || {};

    const {
        quizLevelsData,
        loading,
        error,
        page,
        pageSize,
        totalPages,
        totalItems,
        setPage,
        setPageSize,
    } = useQuizLevelsList({
        enabled,
        quiz_id: quizId,
        branche_id: branchId,
        session_id: sessionId,
        paginate: 5,
        page: 1,
        pageSize: 10,
    });

    const handleFetchClassrooms = (lvl: QuizLevel) => {
        dispatch(fetchQuizClassrooms({
            quiz_level_id: lvl.level_id,
            quiz_id: quizId,
            branche_id: branchId,
            session_id: sessionId,
            paginate: 20,
            page: 1,
        }));
        onSelectClassLevel?.(lvl);
    };

    const columns: ColumnDefinition<QuizLevel>[] = useMemo(() => [
        {
            key: "level",
            label: "Sınıf Seviyesi",
            render: r => r.level?.name ?? "-",
        },
        {
            key: "actions",
            label: "İşlemler",
            style: { textAlign: "right", width: 180 },
            render: r => (
                <div className="d-flex justify-content-end gap-2">
                    {/* Düzenle */}
                    <button
                        className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        onClick={() =>
                            navigate(`/scholarships/classlevel/crud/${r.id}`, {
                                state: { quizId, branchId, sessionId, typeId, timeId },
                            })
                        }
                    >
                        <i className="ti ti-pencil" />
                    </button>
                    {/* Sil */}
                    <button
                        className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => removeQuizLevel(r.id)}
                    >
                        <i className="ti ti-trash" />
                    </button>
                    {/* Seç */}
                    <button
                        className="btn btn-icon btn-sm btn-success-light rounded-pill"
                        onClick={() => handleFetchClassrooms(r)}
                    >
                        <i className="ti ti-check" />
                    </button>
                </div>
            ),
        },
    ], [navigate, removeQuizLevel, onSelectClassLevel, quizId, branchId, sessionId, typeId, timeId]);

    return (
        <ReusableTable<QuizLevel>
            columns={columns}
            data={quizLevelsData}
            loading={loading}
            error={error}
            showModal={false}
            showExportButtons={false}

            /* Ekle butonu, mutlaka tüm ID’leri gönderiyor */
            onAdd={() =>
                navigate("/scholarships/classlevel/crud", {
                    state: { quizId, branchId, sessionId, typeId, timeId },
                })
            }

            tableMode="single"
            filters={[]}
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}
            exportFileName="class-levels"
            onDeleteRow={r => removeQuizLevel(r.id)}
        />
    );
}

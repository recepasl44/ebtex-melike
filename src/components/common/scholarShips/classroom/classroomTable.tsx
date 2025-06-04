
import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { useQuizClassroomList } from "../../../hooks/quizClassroom/useQuizClassroomList";
import { useQuizClassroomDelete } from "../../../hooks/quizClassroom/useQuizClassroomDelete";
import { QuizClassroom } from "../../../../types/quizClassroom/list";
import { IQuizSession } from "../../../../types/quizSessions/list";
import { IQuizTime } from "../../../../types/quizTimes/list";
import { QuizLevel } from "../../../../types/quizLevels/list";

export interface ClassroomListPageProps {
    enabled?: boolean;
    onSelectClassroom?: (cls: QuizClassroom) => void;
    session: IQuizSession | null;
    time: IQuizTime | null;
    level?: QuizLevel | null;

}

export default function ClassroomListPage({
    enabled = false,
    onSelectClassroom,
}: ClassroomListPageProps) {
    const navigate = useNavigate();
    const { state } = useLocation() as {
        state?: {
            session_id?: number;
            time_id?: number;
            quiz_level_id?: number;
            quiz_id?: number;
            type_id?: number;
            branch_id?: number;
        };
    };
    const {
        session_id,
        time_id,
        quiz_level_id,
        quiz_id,
        type_id,
        branch_id,
    } = state || {};

    const { removeQuizClassroom } = useQuizClassroomDelete();
    const {
        quizClassroomsData,

        error,
        page,
        pageSize,
        totalPages,
        totalItems,
        setPage,
        setPageSize,
    } = useQuizClassroomList({
        enabled,
        quiz_level_id,

        paginate: 10,
        page: 1,
        pageSize: 10,
    });

    const [rows, setRows] = useState<QuizClassroom[]>([]);
    useEffect(() => {
        const sameLength = rows.length === quizClassroomsData.length;
        const sameIds = sameLength &&
            quizClassroomsData.every((qc, i) => qc.id === rows[i]?.id);
        if (!sameLength || !sameIds) setRows(quizClassroomsData);
    }, [quizClassroomsData, rows]);

    const columns: ColumnDefinition<QuizClassroom>[] = useMemo(
        () => [
            {
                key: "classroom",
                label: "Derslik",
                render: r => r.classroom?.name ?? "-",
            },
            {
                key: "quota",
                label: "Kota",
                render: r => r.quota?.toString() ?? "-",
            },
            {
                key: "actions",
                label: "İşlemler",
                style: { textAlign: "right", width: 120 },
                render: r => (
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            className="btn btn-icon btn-sm btn-success-light rounded-pill"
                            onClick={() => onSelectClassroom?.(r)}
                        >
                            <i className="ti ti-check" />
                        </button>
                        <button
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                            onClick={() =>
                                navigate(`/scholarships/classroom/crud/${r.id}`, {
                                    state: { session_id, time_id, quiz_level_id, quiz_id, type_id, branch_id },
                                })
                            }
                        >
                            <i className="ti ti-pencil" />
                        </button>
                        <button
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                            onClick={() => removeQuizClassroom(r.id)}
                        >
                            <i className="ti ti-trash" />
                        </button>
                    </div>
                ),
            },
        ],
        [navigate, removeQuizClassroom, onSelectClassroom, session_id, time_id, quiz_level_id, quiz_id, type_id, branch_id]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container mt-3">
                <ReusableTable<QuizClassroom>
                    columns={columns}
                    data={rows}

                    error={error}
                    showModal={false}
                    showExportButtons={false}
                    onAdd={() =>
                        navigate("/scholarships/classroom/crud", {
                            state: { session_id, time_id, quiz_level_id, quiz_id, type_id, branch_id },
                        })
                    }
                    tableMode="single"
                    filters={[]}
                    currentPage={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    onPageChange={setPage}
                    onPageSizeChange={size => { setPageSize(size); setPage(1); }}
                    exportFileName="classrooms"
                    onDeleteRow={r => removeQuizClassroom(r.id)}
                />
            </div>
        </DndProvider>
    );
}

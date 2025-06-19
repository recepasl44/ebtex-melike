
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";

import ReusableTable, {
    ColumnDefinition,
} from "../../../ReusableTable";
import FilterGroup, {
    FilterDefinition,
} from "../../components/organisms/SearchFilters";

import { useAssignmentStudentsList } from "../../../../hooks/assignmentStudents/useList";
import { useAssignmentStudentDelete } from "../../../../hooks/assignmentStudents/useDelete";
import { useClassroomList } from "../../../../hooks/classrooms/useList";
import { useLevelsTable } from "../../../../hooks/levels/useList";
import { useLessonList } from "../../../../hooks/lessons/useList";
import { useUnitsTable } from "../../../../hooks/units/useList";
import { useListStudents } from "../../../../hooks/student/useList";
import me from "../../../../../utils/user_data_field";

import { AssignmentStudentData as AssignmentRow } from "../../../../../types/assignmentStudents/list";

export default function DefiningHomeworkPage() {
    const navigate = useNavigate();

    const [levelId, setLevelId] = useState("");
    const [branchId, setBranchId] = useState("");
    const [lessonId, setLessonId] = useState("");
    const [unitId, setUnitId] = useState("");
    const [plannedStatus, setPlannedStatus] = useState("");
    const [assignStatus, setAssignStatus] = useState("");
    const [studentName, setStudent] = useState("");
    const [studentId, setStudentId] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo] = useState("");

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [enabled, setEnabled] = useState({
        level: false,
        branch: false,
        lesson: false,
        unit: false,
        student: false,
    });
    const teacher_id = me().me?.value;

    const { levelsData = [] } = useLevelsTable({ enabled: enabled.level, page: 1, pageSize: 100 });

    const { classroomData: classroomList = [] } = useClassroomList({
        enabled: enabled.branch && !!levelId,
        level_id: +levelId || undefined,
        branchId: 0,
        page: 1,
        pageSize: 100,
    });

    const { lessonsData = [] } = useLessonList({
        enabled: enabled.lesson && !!levelId,
        level_id: +levelId || undefined,
        page: 1,
        pageSize: 100,
    });

    const { unitsData = [] } = useUnitsTable({
        enabled: enabled.unit && !!lessonId,
        lesson_id: +lessonId,
        page: 1,
        pageSize: 100,
    });

    const { data: studentOptions = [] } = useListStudents({
        enabled: enabled.student && !!studentName,
        first_name: studentName,
        page: 1,
        pageSize: 100,
    });


    const listParams = useMemo(() => ({
        enabled: true,
        page,
        pageSize,
        teacher_id: teacher_id || undefined,
        classroom_id: branchId ? +branchId : undefined,
        level_id: levelId ? +levelId : undefined,
        lesson_id: lessonId ? +lessonId : undefined,
        unit_id: unitId ? +unitId : undefined,
        student_id: studentId ? +studentId : undefined,
        planned_status: plannedStatus || undefined,
        status: assignStatus || undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
    }), [
        page, pageSize,

        levelId, branchId, lessonId, unitId,
        studentId, plannedStatus, assignStatus,
        dateFrom, dateTo,
    ]);


    const {
        assignmentStudentsData = [],
        loading, error, totalPages, totalItems,
    } = useAssignmentStudentsList(listParams);

    const { deleteExistingAssignmentStudent } = useAssignmentStudentDelete();


    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: "dateFrom", label: "Tarih Aralığı", type: "doubledate",
            value: dateFrom, onChange: setDateFrom,
        },
        {
            key: "plannedStatus", label: "Kategori", type: "select",
            value: plannedStatus, onChange: setPlannedStatus,
            options: [
                { label: "Planlanan", value: "1" },
                { label: "Planlanmayan", value: "0" },
            ],
        },
        {
            key: "level", label: "Sınıf Seviyesi", type: "select",
            value: levelId,
            onClick: () => setEnabled(p => ({ ...p, level: true })),
            onChange: val => { setLevelId(val); setBranchId(""); setLessonId(""); setUnitId(""); },
            options: levelsData.map(l => ({ label: l.name, value: String(l.id) })),
        },
        {
            key: "branch", label: "Sınıf / Şube", type: "select",
            value: branchId,
            onClick: () => setEnabled(p => ({ ...p, branch: true })),
            onChange: setBranchId,
            options: classroomList.map(c => ({ label: c.name, value: String(c.id) })),
        },
        {
            key: "student", label: "Öğrenci", type: "autocomplete",
            value: studentName,
            onClick: () => setEnabled(p => ({ ...p, student: true })),
            onChange: val => {
                setStudent(val);
                const f = studentOptions.find(o => o.label.toLowerCase() === val.toLowerCase());
                setStudentId(f ? String(f.value) : "");
            },
            options: studentOptions.map(o => ({ label: o.label, value: String(o.value) })),
        },
        {
            key: "lesson", label: "Ders", type: "select",
            value: lessonId,
            onClick: () => setEnabled(p => ({ ...p, lesson: true })),
            onChange: val => { setLessonId(val); setUnitId(""); },
            options: lessonsData.map(l => ({ label: l.name, value: String(l.id) })),
        },
        {
            key: "unit", label: "Ünite / Konu", type: "select",
            value: unitId,
            onClick: () => setEnabled(p => ({ ...p, unit: true })),
            onChange: setUnitId,
            options: unitsData.map(u => ({ label: u.name, value: String(u.id) })),
        },
        {
            key: "assignStatus", label: "Ödev Durumu", type: "select",
            value: assignStatus, onChange: setAssignStatus,
            options: [
                { label: "Yapıldı", value: "0" },
                { label: "Yapılmadı", value: "1" },
                { label: "Eksik", value: "2" },
                { label: "Gelmedi", value: "3" },
            ],
        },
    ], [
        plannedStatus, levelId, branchId, lessonId, unitId,
        assignStatus, dateFrom, studentName,
        levelsData, classroomList, lessonsData, unitsData, studentOptions,
    ]);


    const columns: ColumnDefinition<AssignmentRow>[] = useMemo(() => [
        {
            key: "planned_status", label: "Kategori",
            render: r => (
                <Badge bg={r.planned_status ? "success" : "warning"}>
                    {r.planned_status ? "Planlanan" : "Planlanmayan"}
                </Badge>
            ),
        },
        {
            key: "assignment.class_section", label: "Sınıf / Şube",
            render: r => r.assignment?.class_section ?? "-",
        },
        {
            key: "student.full_name", label: "Öğrenci",
            render: r => `${r.student.first_name} ${r.student.last_name}`,
        },
        {
            key: "assignment.subject", label: "Ders",
            render: r => r.assignment?.subject ?? "-",
        },
        {
            key: "assignment.title", label: "Ödev Başlığı",
            render: r => r.assignment?.title ?? "-",
        },
        {
            key: "assignment.start_date", label: "Başlangıç Tarihi",
            render: r => new Date(r.assignment?.start_date).toLocaleDateString("tr"),
        },
        {
            key: "assignment.end_date", label: "Bitiş Tarihi",
            render: r =>
                r.assignment?.end_date === "0000-00-00 00:00:00"
                    ? "-" : new Date(r.assignment!.end_date).toLocaleDateString("tr"),
        },
        {
            key: "status", label: "Ödev Durumu",
            render: r => {
                const map: Record<number, { text: string; variant: string }> = {
                    0: { text: "Yapıldı", variant: "success" },
                    1: { text: "Yapılmadı", variant: "secondary" },
                    2: { text: "Eksik", variant: "warning" },
                    3: { text: "Gelmedi", variant: "danger" },
                };
                const i = map[r.status as number] ?? { text: "-", variant: "light" };
                return <Badge bg={i.variant}>{i.text}</Badge>;
            },
        },
        {
            key: "actions", label: "İşlemler",
            render: row => (
                <>
                    <button className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        onClick={() => navigate(`/assignmentstudentscrud/${row.id}`)}>
                        <i className="ti ti-pencil" />
                    </button>
                    <button className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => deleteExistingAssignmentStudent(row.id)}>
                        <i className="ti ti-trash" />
                    </button>
                </>
            ),
        },
    ], [navigate, deleteExistingAssignmentStudent]);


    return (
        <>
            <FilterGroup
                filters={filters}
                navigate={navigate}
                columnsPerRow={4}
            />
            <ReusableTable<AssignmentRow>
                columns={columns}
                data={assignmentStudentsData}
                loading={loading}
                error={error}
                showModal={false}
                showExportButtons
                tableMode="single"
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={size => { setPageSize(size); setPage(1); }}
                exportFileName="defining-homework"
                onAdd={() => navigate('/homework/definingHomework/crud')}
            />
        </>
    );
}

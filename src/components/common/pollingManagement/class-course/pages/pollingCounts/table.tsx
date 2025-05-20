
import { useMemo, useState } from "react";
import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from "../../../../ReusableTable";

import { useAttendancesTable } from "../../../../../hooks/attendance/useList";
import { useLevelsTable } from "../../../../../hooks/levels/useList";
import { useClassroomList } from "../../../../../hooks/classrooms/useList";
import { useAttendanceStudentsTable } from "../../../../../hooks/attendanceStudent/useList";


interface Row {
    id: number;
    class_name: string;
    student_name: string;
    present_count: number;
    absent_count: number;
    late_count: number;
}

export default function PollingCountsTable() {

    const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
    const [classLevel, setClassLevel] = useState("");
    const [classroom, setClassroom] = useState("");
    const [student, setStudent] = useState("");

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);


    const [enabledFilters, setEnabledFilters] = useState({
        class_level: false,
        classroom: false,
        student: false,
    });


    const { levelsData } = useLevelsTable({
        enabled: enabledFilters.class_level,
    });

    const { classroomData } = useClassroomList({
        enabled: enabledFilters.classroom && !!classLevel,
        class_level: +classLevel || undefined,
        branchId: 0,
    });

    const { attendanceStudentsData: studentsData } = useAttendanceStudentsTable({
        enabled: enabledFilters.student,
    });


    const {
        attendancesData,
        loading,
        error,
        totalPages,
        totalItems,
    } = useAttendancesTable({
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        student_id: +student || undefined,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        page,
        pageSize,
        enabled: true,
    });


    const rows: Row[] = useMemo(() => {
        if (!attendancesData) return [];

        type Student = {
            first_name: string;
            last_name: string;
            [key: string]: any;
        };

        return attendancesData.flatMap((att) => {
            const cls = att.group?.name ?? "";

            const present = att.present_count ?? 0;
            const absent = att.absent_count ?? 0;
            const late = att.late_count ?? 0;

            if (!att.students?.length) {
                return [
                    {
                        id: att.id,
                        class_name: cls,
                        student_name: "",
                        present_count: present,
                        absent_count: absent,
                        late_count: late,
                    },
                ];
            }

            return att.students.map((stu: Student) => ({
                id: att.id,
                class_name: cls,
                student_name: `${stu.first_name} ${stu.last_name}`,
                present_count: present,
                absent_count: absent,
                late_count: late,
            }));
        });
    }, [attendancesData]);

    /* ---------------- kolonlar ------------------------- */
    const columns: ColumnDefinition<Row>[] = useMemo(
        () => [
            { key: "class_name", label: "Sınıf", render: (r) => r.class_name },
            { key: "student_name", label: "Öğrenci Adı", render: (r) => r.student_name },
            {
                key: "present_count",
                label: "Geldi",
                style: { textAlign: "center", color: "#18c96e" },
                render: (r) => r.present_count,
            },
            {
                key: "absent_count",
                label: "Gelmedi",
                style: { textAlign: "center", color: "#ff4d4f" },
                render: (r) => r.absent_count,
            },
            {
                key: "late_count",
                label: "Geç Geldi",
                style: { textAlign: "center", color: "#ffb300" },
                render: (r) => r.late_count,
            },
        ],
        []
    );


    const filters: FilterDefinition[] = useMemo(
        () => [
            {
                key: "dateRange",
                label: "Tarih Aralığı",
                type: "doubledate",
                value: dateRange,
                onChange: (v) => setDateRange(v ?? { startDate: "", endDate: "" }),
            },
            {
                key: "class_level",
                label: "Sınıf Seviyesi",
                type: "select",
                value: classLevel,
                onClick: () =>
                    setEnabledFilters((p) => ({ ...p, class_level: true })),
                onChange: (v) => {
                    setClassLevel(v);
                    setClassroom("");
                },
                options: (levelsData || []).map((l) => ({
                    value: l.id,
                    label: l.name,
                })),
            },
            {
                key: "classroom",
                label: "Sınıf / Şube",
                type: "select",
                value: classroom,
                onClick: () =>
                    setEnabledFilters((p) => ({ ...p, classroom: true })),
                onChange: setClassroom,
                options: (classroomData || []).map((c) => ({
                    value: c.id,
                    label: c.name,
                })),
            },
            {
                key: "student",
                label: "Öğrenciler",
                type: "select",
                value: student,
                onClick: () =>
                    setEnabledFilters((p) => ({ ...p, student: true })),
                onChange: setStudent,
                options: (studentsData || []).map((s) => ({
                    value: s.id,
                    label: s.name,
                })),
            },
        ],
        [
            dateRange,
            classLevel,
            classroom,
            student,
            levelsData,
            classroomData,
            studentsData,
        ]
    );


    return (
        <ReusableTable<Row>
            pageTitle="Yoklama Sayıları"
            tableMode="single"
            columns={columns}
            data={rows}
            loading={loading}
            error={error}
            filters={filters}
            showExportButtons
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(s) => {
                setPageSize(s);
                setPage(1);
            }}
            exportFileName="polling_counts"
        />
    );
}

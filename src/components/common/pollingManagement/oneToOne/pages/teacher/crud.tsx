import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { useAttendanceDetail } from "../../../../../hooks/attendance/useDetail";
import AttendanceListStatus from "../../../../../../enums/attendance/list";

interface Row {
    time_range: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    [key: string]: string;
}

const DAY_KEYS = [
    "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
];
const DAY_LABELS = [
    "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"
];

const TeacherOneByOnePlanCrud = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const {
        attendance: fetched,
        status,
        error
    } = useAttendanceDetail({ attendanceId: Number(id), enabled: !!id });
    const loading = status === AttendanceListStatus.LOADING;

    // Tablo satırlarını hazırla
    const rows: Row[] = useMemo(() => {
        if (!fetched) return [];
        if (fetched.timeTable) {
            return fetched.timeTable.map((slot: any) => ({
                time_range: `${slot.start_time} - ${slot.end_time}`,
                monday: slot.monday || "",
                tuesday: slot.tuesday || "",
                wednesday: slot.wednesday || "",
                thursday: slot.thursday || "",
                friday: slot.friday || "",
                saturday: slot.saturday || "",
                sunday: slot.sunday || ""
            }));
        }
        // Dummy fallback
        return [
            {
                time_range: "9:00 - 9:20",
                monday: "Çalışma Salonu",
                tuesday: "Kütüphane",
                wednesday: "Kütüphane",
                thursday: "Derslik 1",
                friday: "11/A",
                saturday: "Derslik 12",
                sunday: "Derslik 4"
            },
            {
                time_range: "9:20 - 9:40",
                monday: "Çalışma Salonu",
                tuesday: "Kütüphane",
                wednesday: "Kütüphane",
                thursday: "Derslik 2",
                friday: "11/A",
                saturday: "Derslik 13",
                sunday: "Derslik 5"
            }
        ];
    }, [fetched]);

    // Kolonlar
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        { key: "time_range", label: "Saat Aralıkları", render: r => r.time_range },
        ...DAY_KEYS.map((day, i) => ({
            key: day,
            label: DAY_LABELS[i],
            render: (r: Row) => r[day]
        }))
    ], []);

    // Header alanı
    const teacherName = fetched?.teachers?.[0]?.name_surname || "-";
    const lessonName = fetched?.lesson?.name || "-";

    return (
        <ReusableTable<Row>
            modalTitle="Öğretmen Detay / Düzenle"
            showModal={true}
            columns={columns}
            data={rows}
            tableMode="single"
            loading={loading}
            error={error}
            showExportButtons={false}
            customHeader={(
                <div style={{ marginBottom: 16 }}>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: "bold", width: 120 }}>Adı Soyadı</td>
                                <td>{teacherName}</td>
                                <td style={{ fontWeight: "bold", width: 120 }}>Ders Adı</td>
                                <td>{lessonName}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            onCloseModal={() => navigate(-1)}
        />
    );
};

export default TeacherOneByOnePlanCrud;

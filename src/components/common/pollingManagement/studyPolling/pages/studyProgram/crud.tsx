import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";

// Yönetici
import { useUsersTable } from "../../../../../hooks/user/useList";
// Etüt alanı
import { useUsedAreasList } from "../../../../../hooks/usedareas/useList";
// Öğretmen
import { useAttendanceTeachersTable } from "../../../../../hooks/attendanceTeacher/useList";

/* ÖĞRENCİ LİSTESİ – ÖRNEK VERİ */
const fakeStudentList = [
    { name: "Ali Kılıç", status: "Gelmedi" },
    { name: "Özgür Han", status: "Gelmedi" },
    { name: "Ezgi Toprak", status: "Gelmedi" },
    { name: "Ayşe Kısacık", status: "Geldi" },
    { name: "Zeynep Dağ", status: "Geldi" },
    { name: "Atakan Yol", status: "Geldi" },
];

interface FormValues {
    date_range: string;
    group_name: string;
    week_days: string[];
    time_range: string;
    area_id: string;
    manager_ids: string[];
    teacher_ids: string[];
    student_count: number;     // Yeni alan: Öğrenci Sayısı
    participation_count: number; // Yeni alan: Katılım Sayısı
    student_attendance: string;  // Yeni alan: Öğrenci Yoklama
}

interface StudentRow {
    name: string;
    status: string; // "Geldi" | "Geç Geldi" | "Gelmedi"
}

export default function StudyProgramCrud() {
    useParams<{ id?: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    // URL'de ?list=1 varsa sadece öğrenci listesi modu
    const isStudentListMode = new URLSearchParams(location.search).get("list") === "1";

    // Yöneticiler, öğretmenler, alanlar
    const { usersData: managersData = [] } = useUsersTable({
        enabled: true,
        role_id: 2,
        pageSize: 100,
    });
    const { attendanceTeachersData: teachersData = [] } = useAttendanceTeachersTable({ enabled: true });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: true });

    // Başlangıç değerleri (form)
    const [initial] = useState<FormValues>({
        date_range: "",
        group_name: "",
        week_days: [],
        time_range: "",
        area_id: "",
        manager_ids: [],
        teacher_ids: [],
        student_count: 0,
        participation_count: 0,
        student_attendance: "",
    });

    // Öğrenci listesi ve durumları
    const [students, setStudents] = useState<StudentRow[]>(fakeStudentList);

    // Durum sıralaması tıklama fonksiyonu
    const handleStatusClick = useCallback((index: number) => {
        setStudents(prev =>
            prev.map((s, i) => {
                if (i !== index) return s;
                const next =
                    s.status === "Geldi" ? "Geç Geldi" : s.status === "Geç Geldi" ? "Gelmedi" : "Geldi";
                return { ...s, status: next };
            })
        );
    }, []);

    // Form alanları (modalda gösterilecek)
    const fields: FieldDefinition[] = useMemo(() => [
        { name: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', required: true },
        {
            name: "group_name",
            label: "Grup Adı",
            type: "text",
            required: true,
            placeholder: "örn. Grup A",
        },
        {
            name: "week_days",
            label: "Haftanın Günleri",
            type: "multiselect",
            options: [
                { value: "1", label: "Pazartesi" },
                { value: "2", label: "Salı" },
                { value: "3", label: "Çarşamba" },
                { value: "4", label: "Perşembe" },
                { value: "5", label: "Cuma" },
                { value: "6", label: "Cumartesi" },
                { value: "7", label: "Pazar" },
            ],
        },
        {
            name: "time_range",
            label: "Saat Aralığı",
            type: "text",
            required: true,
            placeholder: "örn. 09:00 - 10:00",
        },
        {
            name: "area_id",
            label: "Etüt Alanı",
            type: "select",
            required: true,
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            name: "manager_ids",
            label: "Görevli Yöneticiler",
            type: "multiselect",
            options: managersData.map(m => ({
                value: String(m.id),
                label: m.name_surname || m.name || "-",
            })),
        },
        {
            name: "teacher_ids",
            label: "Görevli Öğretmenler",
            type: "multiselect",
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || "-",
            })),
        },
        {
            name: "student_count",
            label: "Öğrenci Sayısı",
            type: "number",
            required: false,
            placeholder: "Öğrenci sayısını giriniz",
        },
        {
            name: "participation_count",
            label: "Katılım Sayısı",
            type: "number",
            required: false,
            placeholder: "Katılım sayısını giriniz",
        },
        {
            name: "student_attendance",
            label: "Öğrenci Yoklama",
            type: "select",
            options: [
                { value: "Geldi", label: "Geldi" },
                { value: "Geç Geldi", label: "Geç Geldi" },
                { value: "Gelmedi", label: "Gelmedi" },
            ],
            placeholder: "Durumu seçiniz",
        },
    ], [usedAreasData, managersData, teachersData]);

    // Öğrenci tablosu kolonları
    const studentColumns: ColumnDefinition<StudentRow>[] = useMemo(() => [
        { key: "name", label: "Adı Soyadı", render: r => r.name },
        {
            key: "status",
            label: "Durumu",
            render: (row, _open, idx) => (
                <span
                    onClick={() => idx !== undefined && handleStatusClick(idx)}
                    style={{
                        cursor: "pointer",
                        color: row.status === "Geldi" ? "green" : row.status === "Geç Geldi" ? "orange" : "red",
                        fontWeight: 500,
                    }}
                >
                    {row.status}
                </span>
            ),
        },
    ], [handleStatusClick]);

    // Form submit
    async function handleSubmit(values: FormValues, helpers: any) {
        // Burada kayıt veya güncelleme işlemleri yapılabilir
        console.log("Form değerleri:", values);
        helpers.setSubmitting(false);
        navigate(-1);
    }

    // Öğrenci listesi modunda modal
    if (isStudentListMode) {
        return (
            <ReusableTable<StudentRow>
                pageTitle="Öğrenci Listesi"
                showModal={true}
                columns={studentColumns}
                data={students}
                tableMode="single"
                onCloseModal={() => navigate(-1)}
                showExportButtons={false}
            />
        );
    }

    // Normal form modalı
    return (
        <ReusableModalForm<FormValues>
            show={true}
            onClose={() => navigate(-1)}
            title="Etüt Detay"
            fields={fields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel="Kaydet"
            cancelButtonLabel="İptal"
            autoGoBackOnModalClose
        />
    );
}

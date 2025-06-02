import { useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
// Yönetici
import { useUsersTable } from "../../../../../hooks/user/useList";
// Etüt alanı
import { useUsedAreasList } from "../../../../../hooks/usedareas/useList";
// Öğretmen
import { useAttendanceTeachersTable } from "../../../../../hooks/attendanceTeacher/useList";

// Öğrenci Listesi için örnek
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
}

interface StudentRow {
    name: string;
    status: string;
}

export default function StudyProgramCrud() {
    useParams<{ id?: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    // URL'den ?list=1 parametresi varsa listeleme modundayız
    const isStudentListMode = new URLSearchParams(location.search).get("list") === "1";

    // Yönetici, öğretmen, etüt alanı dataları
    const { usersData: managersData = [] } = useUsersTable({ enabled: true, role_id: 2, pageSize: 100 });
    const { attendanceTeachersData: teachersData = [] } = useAttendanceTeachersTable({ enabled: true });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: true });

    // İlk form state (manuel giriş için boş bırakıldı)
    const [initial] = useState<FormValues>({
        date_range: "",
        group_name: "",
        week_days: [],
        time_range: "",
        area_id: "",
        manager_ids: [],
        teacher_ids: [],
    });

    // Alanlar
    const fields: FieldDefinition[] = useMemo(() => [
        { name: "date_range", label: "Tarih Aralığı", type: "text", required: true, placeholder: "örn. 01.06.2024 - 05.06.2024" },
        { name: "group_name", label: "Grup Adı", type: "text", required: true, placeholder: "örn. Grup A" },
        {
            name: "week_days", label: "Haftanın Günleri", type: "multiselect",
            options: [
                { value: "1", label: "Pazartesi" }, { value: "2", label: "Salı" },
                { value: "3", label: "Çarşamba" }, { value: "4", label: "Perşembe" },
                { value: "5", label: "Cuma" }, { value: "6", label: "Cumartesi" },
                { value: "7", label: "Pazar" }
            ]
        },
        { name: "time_range", label: "Saat Aralığı", type: "text", required: true, placeholder: "örn. 09:00 - 10:00" },
        {
            name: "area_id", label: "Etüt Alanı", type: "select", required: true,
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            name: "manager_ids", label: "Görevli Yöneticiler", type: "multiselect",
            options: managersData.map(m => ({
                value: String(m.id),
                label: m.name_surname || m.name || "-"
            }))
        },
        {
            name: "teacher_ids", label: "Görevli Öğretmenler", type: "multiselect",
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || "-"
            }))
        },
    ], [usedAreasData, managersData, teachersData]);

    // Öğrenci Listesi tablosu (dummy)
    const studentColumns: ColumnDefinition<StudentRow>[] = useMemo(() => [
        { key: "name", label: "Adı Soyadı", render: r => r.name },
        {
            key: "status", label: "Durumu",
            render: r => (
                <span style={{
                    color: r.status === "Geldi" ? "green" : "red",
                    fontWeight: 500
                }}>
                    {r.status}
                </span>
            )
        }
    ], []);

    // Save işlemi
    async function handleSubmit(_values: FormValues, helpers: any) {
        // ...güncelle veya ekle işlemi buraya
        helpers.setSubmitting(false);
        navigate(-1);
    }

    // Listeleme ikonu ile açınca sadece öğrenci listesi gelsin, düzenle ikonu ile açınca sadece form gelsin!
    if (isStudentListMode) {
        return (
            <ReusableTable<StudentRow>
                modalTitle="Öğrenci Listesi"
                showModal={true}
                columns={studentColumns}
                data={fakeStudentList}
                tableMode="single"
                onCloseModal={() => navigate(-1)}
                showExportButtons={false}
            />
        );
    }

    // Düzenle/Ekle ikonu ile açılınca form modalı!
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

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from "../ReusableTable";
import { useDiscountStudentTable } from "../../hooks/discountStudent/useList";
import { DiscountStudentData } from "../../../types/discountStudent/list";

export default function DiscountStudentTable() {
    const navigate = useNavigate();

    const {
        discountStudentData,
        loading,
        error,
        page,
        pageSize,
        totalPages,
        totalItems,
        setPage,
        setPageSize,
    } = useDiscountStudentTable();

    const columns: ColumnDefinition<DiscountStudentData>[] = useMemo(
        () => [
            { key: "sube", label: "Şube" },
            { key: "sozlesme_no", label: "Sözleşme No" },
            { key: "okul_no", label: "Okul No" },
            { key: "ad_soyad", label: "Adı Soyadı", render: (r) => `${r.ad} ${r.soyad}` },
            { key: "program", label: "Okul Seviyesi" },
            { key: "devre", label: "Sınıf Seviyesi" },
            { key: "sinif", label: "Sınıf/Şube" },
            { key: "indirim_adi", label: "İndirim Adı" },
            { key: "kullanici", label: "Kullanıcı", render: () => "-" },
            { key: "enrollment_indirim", label: "İndirim Tutarı" },
            {
                key: "toplam",
                label: "Kayıt Ücreti",
                render: (row) => `₺${row.toplam.toLocaleString()}`,
            },
            {
                key: "actions",
                label: "İşlemler",
                render: (row) => (
                    <button
                        onClick={() => navigate(`/discount-students/${row.sozlesme_no}`)}
                        className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                    >
                        <i className="ti ti-eye" />
                    </button>
                ),
            },
        ],
        [navigate]
    );

    const [filtersState, setFiltersState] = useState({
        okulSeviyesi: "",
        sinifSeviyesi: "",
        sinifSube: "",
        adSoyad: "",
    });

    const filters: FilterDefinition[] = useMemo(
        () => [
            {
                key: "okulSeviyesi",
                label: "Okul Seviyesi",
                type: "select",
                options: Array.from(new Set(discountStudentData.map((d) => d.program))).map((o) => ({ value: o, label: o })),
                value: filtersState.okulSeviyesi,
                onChange: (val: string) => setFiltersState((p) => ({ ...p, okulSeviyesi: val })),
            },
            {
                key: "sinifSeviyesi",
                label: "Sınıf Seviyesi",
                type: "select",
                options: Array.from(new Set(discountStudentData.map((d) => d.devre))).map((o) => ({ value: o, label: o })),
                value: filtersState.sinifSeviyesi,
                onChange: (val: string) => setFiltersState((p) => ({ ...p, sinifSeviyesi: val })),
            },
            {
                key: "sinifSube",
                label: "Sınıf/Şube",
                type: "select",
                options: Array.from(new Set(discountStudentData.map((d) => d.sinif))).map((o) => ({ value: o, label: o })),
                value: filtersState.sinifSube,
                onChange: (val: string) => setFiltersState((p) => ({ ...p, sinifSube: val })),
            },
            {
                key: "adSoyad",
                label: "Adı Soyadı",
                type: "text",
                value: filtersState.adSoyad,
                onChange: (val: string) => setFiltersState((p) => ({ ...p, adSoyad: val })),
            },
        ],
        [filtersState, discountStudentData]
    );

    const filteredData = useMemo(() => {
        return discountStudentData.filter((d) => {
            const name = `${d.ad} ${d.soyad}`.toLowerCase();
            return (
                (!filtersState.okulSeviyesi || d.program === filtersState.okulSeviyesi) &&
                (!filtersState.sinifSeviyesi || d.devre === filtersState.sinifSeviyesi) &&
                (!filtersState.sinifSube || d.sinif === filtersState.sinifSube) &&
                (!filtersState.adSoyad || name.includes(filtersState.adSoyad.toLowerCase()))
            );
        });
    }, [filtersState, discountStudentData]);

    return (
        <div className="container-fluid mt-3">
            <ReusableTable<DiscountStudentData>
                // pageTitle="İndirimli Öğrenciler"
                onAdd={() => navigate("/discount-students/create")}
                columns={columns}
                data={filteredData}
                loading={loading}
                tableMode="single"
                error={error}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPage(1);
                }}
                filters={filters}
                exportFileName="discount-students-report"
            />
        </div>
    );
}

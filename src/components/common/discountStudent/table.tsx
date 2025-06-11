import { useMemo, useState } from "react";
import { Modal, Button } from "react-bootstrap";
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
        schoolLevel,
        setSchoolLevel,
        classLevel,
        setClassLevel,
        classBranch,
        setClassBranch,
        fullName,
        setFullName,
    } = useDiscountStudentTable();
  const [selectedStudent, setSelectedStudent] = useState<DiscountStudentData | null>(null);
    const handleCloseDetails = () => setSelectedStudent(null);

    const columns: ColumnDefinition<DiscountStudentData>[] = useMemo(
        () => [
            { key: "sube", label: "Şube" },
            { key: "sozlesme_no", label: "Sözleşme No" },
            { key: "okul_no", label: "Okul No" },
            {
                key: "full_name",
                label: "Adı Soyadı",
                render: (row) => `${row.ad} ${row.soyad}`,
            },
            { key: "program", label: "Okul Seviyesi" },
            { key: "devre", label: "Sınıf Seviyesi" },
            { key: "sinif", label: "Sınıf/Şube" },
            { key: "indirim_adi", label: "İndirim Adı" },
            { key: "kullanici", label: "Kullanıcı", render: (row) => row.kullanici ?? "" },
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

    const filters: FilterDefinition[] = useMemo(
        () => [
            {
                key: "school_level",
                label: "Okul Seviyesi",
                type: "text",
                value: schoolLevel,
                onChange: (val: string) => {
                    setSchoolLevel(val);
                    setPage(1);
                },
            },
            {
                key: "class_level",
                label: "Sınıf Seviyesi",
                type: "text",
                value: classLevel,
                onChange: (val: string) => {
                    setClassLevel(val);
                    setPage(1);
                },
            },
            {
                key: "class_branch",
                label: "Sınıf/Şube",
                type: "text",
                value: classBranch,
                onChange: (val: string) => {
                    setClassBranch(val);
                    setPage(1);
                },
            },
            {
                key: "full_name",
                label: "Adı Soyadı",
                type: "text",
                value: fullName,
                onChange: (val: string) => {
                    setFullName(val);
                    setPage(1);
                },
            },
        ],
        [schoolLevel, classLevel, classBranch, fullName, setPage]
    );

    return (
        <div className="container-fluid mt-3">
            <ReusableTable<DiscountStudentData>
                pageTitle="İndirimli Öğrenciler"
                onAdd={() => navigate("/discount-students/create")}
                columns={columns}
                data={discountStudentData}
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
              {selectedStudent && (
                <Modal show onHide={handleCloseDetails} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Detaylar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Fiyat: ₺{selectedStudent.toplam.toLocaleString()}</p>
                        <p>Genel/Dönemsel İndirimler: {selectedStudent.indirim_adi}</p>
                        <p>Toplam İndirim: {selectedStudent.enrollment_indirim}</p>
                        <p>İndirim Yüzde: {selectedStudent.enrollment_indirim}</p>
                        <p>Kayıt Fiyat: ₺{selectedStudent.toplam.toLocaleString()}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDetails}>
                            Kapat
                        </Button>
                        <Button variant="primary" onClick={() => window.print()}>
                            Yazdır
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

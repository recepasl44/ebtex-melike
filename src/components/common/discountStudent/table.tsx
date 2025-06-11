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
        searchTerm,
        setSearchTerm,
    } = useDiscountStudentTable();
    const [selectedStudent, setSelectedStudent] = useState<DiscountStudentData | null>(null);
    const handleCloseDetails = () => setSelectedStudent(null);

    const columns: ColumnDefinition<DiscountStudentData>[] = useMemo(
        () => [
            { key: "sozlesme_no", label: "Sözleşme No" },
            { key: "okul_no", label: "Okul No" },
            { key: "ad", label: "Ad" },
            { key: "soyad", label: "Soyad" },
            { key: "program", label: "Program" },
            { key: "devre", label: "Devre" },
            { key: "sinif", label: "Sınıf" },
            { key: "indirim_adi", label: "İndirim Adı" },
            { key: "enrollment_indirim", label: "Enrol. İndirim" },
            {
                key: "toplam",
                label: "Toplam",
                render: (row) => `₺${row.toplam.toLocaleString()}`,
            },
            {
                key: "actions",
                label: "Actions",
                render: (row) => (
                    <>
                        <button
                            onClick={() => navigate(`/discount-students/${row.sozlesme_no}`)}
                            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                        >
                            <i className="ti ti-eye" />
                        </button>
                        <button
                            onClick={() => setSelectedStudent(row)}
                            className="btn btn-icon btn-sm btn-secondary-light rounded-pill"
                        >
                            <i className="ti ti-info-circle" />
                        </button>
                        <button
                            onClick={() =>
                                navigate(`/discount-students/edit/${row.sozlesme_no}`)
                            }
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        >
                            <i className="ti ti-pencil" />
                        </button>
                        <button
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                            onClick={() => {
                                /* delete action */
                            }}
                        >
                            <i className="ti ti-trash" />
                        </button>
                    </>
                ),
            },
        ],
        [navigate]
    );

    const filters: FilterDefinition[] = useMemo(
        () => [
            {
                key: "search",
                label: "Search",
                type: "text",
                value: searchTerm,
                onChange: (val: string) => {
                    setSearchTerm(val);
                    setPage(1);
                },
            },
        ],
        [searchTerm, setPage, setSearchTerm]
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

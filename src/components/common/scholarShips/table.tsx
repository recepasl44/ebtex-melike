
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useScholarShipsList } from "../../hooks/scholarShips/useScholarShipsList";
import { useScholarShipsDelete } from "../../hooks/scholarShips/useScholarShipsDelete";
import { useScholarShipsUpdate } from "../../hooks/scholarShips/useScholarShipsUpdate";
import { IScholarShip } from "../../../types/scholarShips/list";

export default function ScholarShipsListPage() {
    const navigate = useNavigate();

    const { removeScholarship } = useScholarShipsDelete();

    const {
        updateExistingScholarship,
        error: _updateError,
        status: _updateStatus,
    } = useScholarShipsUpdate();

    const {
        scholarshipsData,
        loading,
        error,
        page,
        pageSize,
        totalPages,
        totalItems,
        setPage,
        setPageSize,
        refetch,
    } = useScholarShipsList({ enabled: true });

    async function handleToggleActive(s: IScholarShip) {
        const yeniStatus = s.status === 1 ? 0 : 1;

        await updateExistingScholarship({
            scholarShipId: s.id,
            payload: {
                short_name: s.short_name,
                name: s.name,
                branche_id: s.branche_id,
                season_id: s.season_id,
                duration: s.duration,
                status: yeniStatus,
            }
        });

        refetch();
    }

    const columns: ColumnDefinition<IScholarShip>[] = [
        {
            key: "kısa ad",
            label: "Kısa Ad",
            render: (row) => row.short_name ?? "-",
        },
        {
            key: "sınav adı",
            label: "Sınav Adı",
            render: (row) => row.name ?? "-",
        },
        {
            key: "aktif",
            label: "Durum",
            render: (row) => (
                <div
                    className={`toggle toggle-sm ${row.status === 1 ? "on" : ""} mb-0`}
                    onClick={() => handleToggleActive(row)}
                    style={{ cursor: "pointer" }}
                >
                    <span />
                </div>
            ),
        },
        {
            key: "oluşturan",
            label: "Oluşturan",
            render: (row) => row.created_by ?? "-",
        },
        {
            key: "actions",
            label: "İşlemler",
            style: { textAlign: "right", width: 150 },
            render: (row) => (
                <div className="d-flex justify-content-end gap-2">
                    <button
                        onClick={() => navigate(`/scholarships/index/${row.id}`)}
                        className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                    >
                        <i className="ti ti-eye" />
                    </button>
                    <button
                        className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => removeScholarship(row.id)}
                    >
                        <i className="ti ti-trash" />
                    </button>
                    <button
                        onClick={() => navigate(`/scholarships/crud/${row.id}`)}
                        className="btn btn-icon btn-sm btn-info-light rounded-pill"
                    >
                        <i className="ti ti-pencil" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Bursluluk Yönetimi</h4>
                <Button
                    variant="success"
                    onClick={() => navigate("/scholarships/crud")}
                >
                    Ekle
                </Button>
            </div>
            <ReusableTable<IScholarShip>
                columns={columns}
                data={scholarshipsData}
                loading={loading}
                showModal={false}
                showExportButtons
                tableMode="single"
                error={error}
                filters={[]}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPage(1);
                }}
                exportFileName="scholarships"
                onDeleteRow={(row) => removeScholarship(row.id)}
            />
        </div>
    );
}

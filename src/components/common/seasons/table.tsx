
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import ReusableTable, { ColumnDefinition } from "../../common/ReusableTable";
import { useSeasonsList } from "../../../components/hooks/season/useSeasonsList";
import { useSeasonDelete } from "../../../components/hooks/season/useSeasonsDelete";
import { Season } from "../../../types/seasons/list";

export default function SeasonsListPage() {
    const navigate = useNavigate();
    const { deleteExistingSeason } = useSeasonDelete();
    const {
        seasonsData,
        loading,
        error,
        page,
        paginate,
        totalPages,
        totalItems,
        setPage,
        setPaginate,
    } = useSeasonsList({ enabled: true });

    const columns: ColumnDefinition<Season>[] = useMemo(
        () => [
            {
                key: "name",
                label: "Sezon Tipi Adı",
                render: (row) => row.name ?? "-",
            },
            {
                key: "actions",
                label: "İşlemler",
                style: { textAlign: "right", width: 120 },
                render: (row, openDeleteModal) => (
                    <div className="d-flex justify-content-end gap-2">

                        <button
                            type="button"
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                            aria-label="Güncelle"
                            onClick={() => navigate(`/seasons/crud/${row.id}`)}
                        >
                            <i className="ti ti-pencil" />
                        </button>


                        <button
                            type="button"
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                            aria-label="Sil"
                            onClick={() => openDeleteModal?.(row)}
                        >
                            <i className="ti ti-trash" />
                        </button>
                    </div>
                ),
            }

        ],
        [navigate]
    );

    return (


        <ReusableTable<Season>
            pageTitle="Sezon Tipleri"
            columns={columns}
            data={seasonsData}
            loading={loading}
            showModal={false}
            showExportButtons
            tableMode="single"
            error={error}
            filters={[]}
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            onAdd={() => navigate("/seasons/crud")}
            pageSize={paginate}
            onPageChange={setPage}
            onPageSizeChange={(newSize) => {
                setPaginate(newSize);
                setPage(1);
            }}
            exportFileName="seasons"
            onDeleteRow={(row) => deleteExistingSeason(row.id)}
        />

    );
}



import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import ReusableTable, { ColumnDefinition } from "../../common/ReusableTable";
import Pageheader from "../../../components/page-header/pageheader";
import { useSchoolTypesList } from "../../../components/hooks/schoolTypes/useSchoolTypesList";
import { useSchoolTypeDelete } from "../../../components/hooks/schoolTypes/useSchoolTypesDelete";
import { ISchoolType } from "../../../types/schoolTypes/list";

export default function SchoolTypeListPage() {
    const navigate = useNavigate();
    const { removeSchoolType } = useSchoolTypeDelete();
    const {
        schoolTypesData,
        loading,
        error,
        page,
        paginate,
        totalPages,
        totalItems,
        setPage,
        setPaginate,
    } = useSchoolTypesList({ enabled: true });

    const columns: ColumnDefinition<ISchoolType>[] = useMemo(
        () => [
            {
                key: "name",
                label: "Okul Tipi Adı",
                render: (row) => row.name ?? "-",
            },
            {
                key: "actions",
                label: "İşlemler",
                style: { textAlign: "right", width: 120 },
                render: (row, openDeleteModal) => (
                    <div className="d-flex justify-content-end gap-2">
                        {/* Güncelle → kalem ikonu */}
                        <button
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                            onClick={() => navigate(`/school-type/crud/${row.id}`)}
                        >
                            <i className="ti ti-pencil" />
                        </button>

                        {/* Sil → çöp ikonu */}
                        <button
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                            onClick={() => openDeleteModal?.(row)}
                        >
                            <i className="ti ti-trash" />
                        </button>
                    </div>
                ),
            },

        ],
        [navigate]
    );

    return (
        <>
        <Pageheader title="Tanımlar" currentpage="Okul Tipleri" activepage="Okul Tipleri" />

        <ReusableTable<ISchoolType>
            pageTitle="Okul Tipleri"

            columns={columns}
            data={schoolTypesData}
            loading={loading}
            showModal={false}
            showExportButtons
            tableMode="single"
            error={error}
            filters={[]}
            onAdd={() => navigate("/school-type/crud")}
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={paginate}
            onPageChange={setPage}
            onPageSizeChange={(newSize) => {
                setPaginate(newSize);
                setPage(1);
            }}
            exportFileName="school-types"
            onDeleteRow={(row) => removeSchoolType(row.id)}
        />

        </>

    );
}



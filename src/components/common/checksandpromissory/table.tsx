import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition, FilterDefinition } from "../ReusableTable";
import { useInstrumentsList } from "../../hooks/instruments/useInstrumentsList";
import { Instrument } from "../../../types/instruments/list";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import CashInstrumentModal from "./cash";

export default function ChecksAndPromissoryTable() {
    const navigate = useNavigate();
    const [branch, setBranch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [cashId, setCashId] = useState<number | null>(null);

    const { branchData } = useBranchTable({ enabled: true });

    const {
        instrumentData,
        loading,
        error,
        page,
        pageSize,
        totalPages,
        totalItems,
        setPage,
        setPageSize,
    } = useInstrumentsList({
        branch_id: branch ? Number(branch) : undefined,
        min_price: minPrice ? Number(minPrice) : undefined,
        max_price: maxPrice ? Number(maxPrice) : undefined,
    });

    const columns: ColumnDefinition<Instrument>[] = useMemo(
        () => [
            {
                key: "document_owner_name",
                label: "Belge Sahibi",
                render: (row) => row.document_owner_name || "-",
            },
            {
                key: "document_type",
                label: "Tür",
                render: (row) => (row.document_type === 1 ? "Çek" : "Senet"),
            },
            { key: "bank", label: "Banka", render: (row) => row.bank || "-" },
            {
                key: "amount",
                label: "Tutar",
                render: (row) => `₺${Number(row.amount).toLocaleString()}`,
            },
            { key: "due_date", label: "Vade", render: (row) => row.due_date },
            { key: "check_no", label: "No", render: (row) => row.check_no },
            {
                key: "actions",
                label: "İşlemler",
                render: (row) => (
                    <>
                        <button
                            onClick={() => navigate(`/checks-promissory/${row.id}`)}
                            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                        >
                            <i className="ti ti-eye" />
                        </button>
                        <button
                            onClick={() => navigate(`/checks-promissory/edit/${row.id}`)}
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        >
                            <i className="ti ti-pencil" />
                        </button>
                        <button
                            className="btn btn-icon btn-sm btn-success-light rounded-pill"
                            onClick={() => setCashId(row.id)}
                            title="Bozdur"
                        >
                            <i className="ti ti-currency-dollar" />
                        </button>
                        <button
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                            onClick={() => { }}
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
                key: "branch_id",
                label: "Şube",
                type: "select" as const,
                value: branch,
                options: (branchData || []).map((b) => ({ value: String(b.id), label: b.name })),
                onChange: (val: string) => {
                    setBranch(val);
                    setPage(1);
                },
            },
            {
                key: "min_price",
                label: "Min Tutar",
                type: "number" as const,
                value: minPrice,
                onChange: (val: string) => {
                    setMinPrice(val);
                    setPage(1);
                },
            },
            {
                key: "max_price",
                label: "Max Tutar",
                type: "number" as const,
                value: maxPrice,
                onChange: (val: string) => {
                    setMaxPrice(val);
                    setPage(1);
                },
            },
        ],
        [branchData, branch, minPrice, maxPrice, setPage]
    );

    return (
        <div className="container-fluid mt-3">

            <ReusableTable<Instrument>
                pageTitle="Çek & Senetler"
                tableMode="single"
                onAdd={() => navigate("/checks-promissory/create")}
                columns={columns}
                data={instrumentData}
                loading={loading}
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
                exportFileName="checks_and_promissory"
            />
            <CashInstrumentModal instrumentId={cashId} onClose={() => setCashId(null)} />
        </div>
    );
}
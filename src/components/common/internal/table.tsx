import { useState,  useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from "../ReusableTable";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useProgramsTable } from "../../hooks/program/useList";
import { useInternalSummary } from "../../hooks/internal/useInternalSummary";
import InternalListStatus from "../../../enums/internal/list";
import { IInternalSummary } from "../../../types/internal/list";

export default function InternalsTable() {
    const navigate = useNavigate();

    // --- Şube filtresi ---
    const [branchId, setBranchId] = useState("");
    const [branchEnabled, setBranchEnabled] = useState(false);
    const { branchData } = useBranchTable({ enabled: branchEnabled });

    // --- Okul Seviyesi filtresi ---
    const [programId, setProgramId] = useState("");
    const [programEnabled, setProgramEnabled] = useState(false);
    const { programsData } = useProgramsTable({ enabled: programEnabled });

    // --- summary fetch için enabled bayrağı ---
    const internalEnabled = Boolean(branchId) || Boolean(programId);
    const {
        summaryData,

        error,
    } = useInternalSummary({
        enabled: internalEnabled,
        branche_id: branchId || undefined,
        program_id: programId || undefined,
    });
    const loading = status === InternalListStatus.LOADING;


    // --- filtre tanımları ---
    const filters = useMemo<FilterDefinition[]>(() => [
        {
            key: "branch",
            label: "Şube",
            type: "select",
            value: branchId,
            onClick: () => setBranchEnabled(true),
            onChange: (val: string) => {
                setBranchEnabled(true);
                setBranchId(val);
            },
            options: branchData.map((b) => ({
                key: b.id,
                value: String(b.id),
                label: b.name,
            })),
        },
        {
            key: "program",
            label: "Okul Seviyesi",
            type: "select",
            value: programId,
            onClick: () => setProgramEnabled(true),
            onChange: (val: string) => {
                setProgramEnabled(true);
                setProgramId(val);
            },
            options: programsData.map((p) => ({
                value: String(p.id),
                label: p.name,
            })),
        },
    ], [branchId, branchData, programId, programsData]);

    // --- kolon tanımları ---
    const columns = useMemo<ColumnDefinition<IInternalSummary>[]>(() => [
        {
            key: "all_registered",
            label: "Toplam",
            render: (r) => r.all_registered,
        },
        {
            key: "registered",
            label: "Kayıt",
            render: (r) => r.registered,
        },
        {
            key: "next_season_registered",
            label: "Kalan",
            render: (r) => r.next_season_registered,
        },
        {
            key: "both_season_registered",
            label: "Her İki Sezon",
            render: (r) => r.both_season_registered,
        },
        {
            key: "success",
            label: "Başarı",
            render: (r) => r.success,
        },
        {
            key: "actions",
            label: "İşlem",
            style: { width: 80, textAlign: "center" },
            render: (row) => (
                <button
                    type="button"
                    className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                    onClick={() => navigate(`/internals/detail/${row.id}`)}
                >
                    <i className="ti ti-eye" />
                </button>
            ),
        },
    ], [navigate]);

    // summaryData her zaman tek bir özet dönüyor, diziye sarıyoruz
    const rows: IInternalSummary[] = summaryData ? [summaryData] : [];

    return (
        <div className="container mt-4">
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <ReusableTable<IInternalSummary>
                    columns={columns}
                    data={rows}
                    loading={false}
                    tableMode="single"
                    filters={filters}
                    currentPage={1}
                    totalPages={1}
                    totalItems={rows.length}
                    pageSize={rows.length}
                    onPageChange={() => { }}
                    onPageSizeChange={() => { }}
                    showExportButtons={false}
                    exportFileName="internals"
                    onDeleteRow={() => { }}
                />
            )}
        </div>
    );
}

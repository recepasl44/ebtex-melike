import { useState, useEffect, useMemo } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from "../ReusableTable";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useSchoolTable } from "../../hooks/school/useSchoolList";
import { useInternalSummary } from "../../hooks/internal/useInternalSummary";
import InternalListStatus from "../../../enums/internal/list";
import { IInternalSummary } from "../../../types/internal/list";

export default function InternalsTable() {
    const navigate = useNavigate();

    // --- Şube filtresi ---
    const [branchId, setBranchId] = useState("");
    const [branchEnabled, setBranchEnabled] = useState(false);
    const { branchData } = useBranchTable({ enabled: branchEnabled });

    // --- Okul arama filtresi ---
    const [schoolTerm, setSchoolTerm] = useState("");
    const [schoolEnabled, setSchoolEnabled] = useState(false);
    const { schoolData, setFilter: setSchoolFilter } = useSchoolTable({
        enabled: schoolEnabled,
    });
    const [schoolId, setSchoolId] = useState("");

    // --- summary fetch için enabled bayrağı ---
    const internalEnabled = Boolean(branchId) || Boolean(schoolId);
    const {
        summaryData,

        error,
    } = useInternalSummary({
        enabled: internalEnabled,
        branche_id: branchId || undefined,
        school_id: schoolId || undefined,
    });
    const loading = status === InternalListStatus.LOADING;

    // Okul arama input’una her yazıldığında aktif et + filter uygula
    useEffect(() => {
        if (schoolTerm.length > 0) {
            setSchoolEnabled(true);
            setSchoolFilter(schoolTerm);
            setSchoolId("");
        }
    }, [schoolTerm, setSchoolFilter]);

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
            key: "school",
            label: "Okul Ara…",
            type: "autocomplete",
            value: schoolTerm,
            onClick: () => setSchoolEnabled(true),
            onChange: (val: string) => setSchoolTerm(val),
            onSelect: (val: string) => {
                setSchoolId(val);
                const sel = schoolData.find((s) => String(s.id) === val);
                if (sel) setSchoolTerm(sel.name);
            },
            options: schoolData.map((s) => ({
                value: String(s.id),
                label: s.name,
            })),
        },
    ], [branchId, branchData, schoolTerm, schoolData]);

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

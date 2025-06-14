import { useState, useMemo, useEffect } from "react";

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from "../ReusableTable";
import {
    IncomingCheckFormModal,
    IncomingCheckDetailModal,
    IncomingCheckCashModal,
    IncomingCheckPaymentModal,
} from "./crud";

import axiosInstance from '../../../services/axiosClient';
import type { Instrument } from '../../../types/instruments/list';

export interface IncomingCheck {
    id: number;
    company: string;
    creditor: string;
    type: string;
    date: string;
    bank: string;
    amountDue: number;
    amountPaid: number;
    remaining: number;
    description: string;
    status: string;
}

const dummyData: IncomingCheck[] = [
    {
        id: 1,
        company: "ABC Ltd",
        creditor: "John Doe",
        type: "Çek",
        date: "2024-01-01",
        bank: "Ziraat",
        amountDue: 1000,
        amountPaid: 300,
        remaining: 700,
        description: "",
        status: "Beklemede",
    },
];

export default function IncomingChecksTable() {
    const [data, setData] = useState<IncomingCheck[]>(dummyData);
    const [selected, setSelected] = useState<IncomingCheck | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showCash, setShowCash] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    const [filterCompany, setFilterCompany] = useState("");
    const [filterCreditor, setFilterCreditor] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterBank, setFilterBank] = useState("");

    const [companyOptions, setCompanyOptions] = useState<{ label: string; value: string }[]>([]);
    const [creditorOptions, setCreditorOptions] = useState<{ label: string; value: string }[]>([]);
    const [typeOptions, setTypeOptions] = useState<{ label: string; value: string }[]>([]);
    const [bankOptions, setBankOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        axiosInstance.get("/instruments", { params: { paginate: 999 } })
            .then((resp) => {
                const instruments: Instrument[] = resp.data?.data || [];
                const companies = new Set<string>();
                const creditors = new Set<string>();
                const types = new Set<string>();
                const banks = new Set<string>();
                instruments.forEach((i) => {
                    if (i.document_owner_name) companies.add(i.document_owner_name);
                    if (i.owner_name) creditors.add(i.owner_name);
                    if (i.document_type !== undefined && i.document_type !== null) {
                        types.add(i.document_type === 1 ? "Çek" : "Senet");
                    }
                    if (i.bank) banks.add(i.bank);
                });
                setCompanyOptions(Array.from(companies).map((v) => ({ value: v, label: v })));
                setCreditorOptions(Array.from(creditors).map((v) => ({ value: v, label: v })));
                setTypeOptions(Array.from(types).map((v) => ({ value: v, label: v })));
                setBankOptions(Array.from(banks).map((v) => ({ value: v, label: v })));
            })
            .catch(() => {
                // ignore errors
            });
    }, []);

    const filteredData = useMemo(() => {
        return data.filter(
            (row) =>
                (!filterCompany || row.company === filterCompany) &&
                (!filterCreditor || row.creditor === filterCreditor) &&
                (!filterType || row.type === filterType) &&
                (!filterBank || row.bank === filterBank)
        );
    }, [data, filterCompany, filterCreditor, filterType, filterBank]);

    const columns: ColumnDefinition<IncomingCheck>[] = useMemo(
        () => [
            { key: "company", label: "Firma" },
            { key: "creditor", label: "Verecekli" },
            { key: "type", label: "Türü" },
            { key: "date", label: "Tarih" },
            { key: "bank", label: "Alıcı Banka" },
            {
                key: "amountDue",
                label: "Ödenecek",
                render: (row) => row.amountDue.toLocaleString(),
            },
            {
                key: "amountPaid",
                label: "Ödenen",
                render: (row) => row.amountPaid.toLocaleString(),
            },
            {
                key: "remaining",
                label: "Kalan",
                render: (row) => row.remaining.toLocaleString(),
            },
            { key: "description", label: "Açıklama" },
            { key: "status", label: "Durum" },
            {
                key: "actions",
                label: "İşlemler",
                render: (row) => (
                    <div style={{ display: "flex", flexWrap: "nowrap", gap: "0.25rem" }}>
                        <button
                            onClick={() => {
                                setSelected(row);
                                setShowDetail(true);
                            }}
                            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                            title="Detay"
                        >
                            <i className="ti ti-eye" />
                        </button>
                        <button
                            onClick={() => {
                                setSelected(row);
                                setShowCash(true);
                            }}
                            className="btn btn-icon btn-sm btn-success-light rounded-pill"
                            title="Bozdur"
                        >
                            <i className="ti ti-currency-dollar" />
                        </button>
                        <button
                            onClick={() => {
                                setSelected(row);
                                setShowPayment(true);
                            }}
                            className="btn btn-icon btn-sm btn-warning-light rounded-pill"
                            title="Ödeme"
                        >
                            <i className="ti ti-cash" />
                        </button>
                        <button
                            onClick={() => {
                                setSelected(row);
                                setShowForm(true);
                            }}
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                            title="Düzenle"
                        >
                            <i className="ti ti-pencil" />
                        </button>
                        <button
                            onClick={() => setData((d) => d.filter((x) => x.id !== row.id))}
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                            title="Sil"
                        >
                            <i className="ti ti-trash" />
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const filters: FilterDefinition[] = [
        {
            key: "company",
            label: "Firma",
            type: "select",
            value: filterCompany,
            onChange: setFilterCompany,
            options: companyOptions,
        },
        {
            key: "creditor",
            label: "Verecekli",
            type: "select",
            value: filterCreditor,
            onChange: setFilterCreditor,
            options: creditorOptions,
        },
        {
            key: "type",
            label: "Türü",
            type: "select",
            value: filterType,
            onChange: setFilterType,
            options: typeOptions,
        },
        {
            key: "bank",
            label: "Alıcı Banka",
            type: "select",
            value: filterBank,
            onChange: setFilterBank,
            options: bankOptions,
        },
    ];

    return (
        <div className="container-fluid mt-3">
            <ReusableTable<IncomingCheck>
                columns={columns}
                data={filteredData}
                filters={filters}
                onAdd={() => {
                    setSelected(null);
                    setShowForm(true);
                }}
                addButtonText="Ekle"
                tableMode="single"
            />

            {showForm && (
                <IncomingCheckFormModal
                    show={showForm}
                    onClose={() => setShowForm(false)}
                    initialValues={selected || undefined}
                    onSubmit={(val) => {
                        if (selected) {
                            setData((prev) =>
                                prev.map((d) => (d.id === selected.id ? { ...val, id: selected.id } : d))
                            );
                        } else {
                            setData((prev) => [...prev, { ...val, id: Date.now() }]);
                        }
                        setShowForm(false);
                    }}
                />
            )}

            {showDetail && selected && (
                <IncomingCheckDetailModal
                    check={selected}
                    show={showDetail}
                    onClose={() => setShowDetail(false)}
                />
            )}

            {showCash && selected && (
                <IncomingCheckCashModal
                    show={showCash}
                    onClose={() => setShowCash(false)}
                />
            )}

            {showPayment && selected && (
                <IncomingCheckPaymentModal
                    show={showPayment}
                    onClose={() => setShowPayment(false)}
                />
            )}
        </div>
    );
}
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import Pageheader from "../../page-header/pageheader";
import SearchFilters, { FilterDefinition } from "./SearchFilters";

interface FinanceNote {
    id: number;
    name: string;
    type: string;
    status: string;
    date: string;
}

export default function FinanceNotesTable() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");

    const filters: FilterDefinition[] = useMemo(
        () => [
            { key: "name", label: "Not Adı", type: "text", value: name, onChange: setName },
            {
                key: "type",
                label: "Tip",
                type: "select",
                value: type,
                options: [
                    { value: "income", label: "Gelir" },
                    { value: "expense", label: "Gider" },
                ],
                onChange: setType,
            },
            {
                key: "status",
                label: "Durum",
                type: "select",
                value: status,
                options: [
                    { value: "pending", label: "Beklemede" },
                    { value: "done", label: "Tamamlandı" },
                ],
                onChange: setStatus,
            },
            { key: "date", label: "Tarih", type: "date", value: date, onChange: setDate },
        ],
        [name, type, status, date]
    );

    const data: FinanceNote[] = [
        { id: 1, name: "Not 1", type: "income", status: "pending", date: "2024-01-01" },
        { id: 2, name: "Not 2", type: "expense", status: "done", date: "2024-01-02" },
    ];

    const columns: ColumnDefinition<FinanceNote>[] = useMemo(
        () => [
            { key: "id", label: "ID" },
            { key: "name", label: "Not Adı" },
            { key: "type", label: "Tip" },
            { key: "status", label: "Durum" },
            { key: "date", label: "Tarih" },
        ],
        []
    );

    return (
        <div className="container mt-3">
            <Pageheader title="Finans" currentpage="Notlar" activepage="Finans Notları" />
            <SearchFilters filters={filters} navigate={navigate} columnsPerRow={4} />
            <ReusableTable<FinanceNote> columns={columns} data={data} />
        </div>
    );
}

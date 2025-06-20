import React from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import SpkFlatpickr from "../../../../../@spk-reusable-components/reusable-plugins/spk-flatpicker";

export interface FilterDefinition {
    key: string;
    label: string;
    type:
    | "text"
    | "number"
    | "date"
    | "doubledate"
    | "checkbox"
    | "select"
    | "currency"
    | "togglebar"
    | "email"
    | "phone"
    | "textarea"
    | "iban"
    | "multiselect"
    | "autocomplete";
    value?: string | { startDate: string; endDate: string };
    options?: { value: string; label: string }[];
    plus?: boolean | string;
    dependencyKey?: string;
    onChange?: (value: any) => void;
    onClick?: (value: string) => void;
    onFocus?: () => void;
}

interface FilterGroupProps {
    filters: FilterDefinition[];
    navigate: (path: string) => void;
    columnsPerRow?: number;
}

function InputWithPlus({
    children,
    fieldDef,
    navigate,
}: {
    children: React.ReactNode;
    fieldDef: FilterDefinition;
    navigate: (path: string) => void;
}) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ flex: 1 }}>{children}</div>
            {typeof fieldDef.plus === "string" && (
                <Button
                    variant="outline-secondary"
                    onClick={() => navigate(fieldDef.plus as string)}
                >
                    <i className="bi bi-plus" />
                </Button>
            )}
        </div>
    );
}

const FilterGroup: React.FC<FilterGroupProps> = ({
    filters,
    navigate,
    columnsPerRow = 4,
}) => {
    if (!filters || filters.length === 0) return null;

    const groups: FilterDefinition[][] = [];

    if (filters.length <= 6) {
        groups.push(filters);
    } else {
        for (let i = 0; i < filters.length; i += columnsPerRow) {
            groups.push(filters.slice(i, i + columnsPerRow));
        }
    }

    const formatLocalDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <Card>
            <div className="mb-1 bg-white rounded-3">
                {groups.map((group, idx) => {
                    const width = `${100 / (filters.length <= 6 ? group.length : columnsPerRow)}%`;
                    return (
                        <Row key={`filter-row-${idx}`} className="mb-2">
                            {group.map((filter) => (
                                <Col
                                    key={filter.key}
                                    style={{ flex: '0 0 ' + width, maxWidth: width }}
                                >
                                    <Form.Group>
                                        <Form.Label>{filter.label}</Form.Label>
                                        {filter.type === "autocomplete" ? (
                                            <InputWithPlus fieldDef={filter} navigate={navigate}>
                                                <Typeahead
                                                    id={`typeahead-${filter.key}`}
                                                    labelKey="label"
                                                    options={filter.options || []}
                                                    placeholder="Aramak için yazın..."
                                                    onChange={(selected) => {
                                                        if (selected && selected.length > 0 && filter.onChange) {
                                                            filter.onChange((selected[0] as any).value);
                                                        }
                                                    }}
                                                    onFocus={filter.onFocus}
                                                    onInputChange={(text) => {
                                                        if (filter.onChange) filter.onChange(text);
                                                    }}
                                                    disabled={
                                                        filter.dependencyKey
                                                            ? !filters.find(f => f.key === filter.dependencyKey)?.value
                                                            : false
                                                    }
                                                />
                                            </InputWithPlus>
                                        ) : filter.type === "date" ? (
                                            <InputWithPlus fieldDef={filter} navigate={navigate}>
                                                <SpkFlatpickr
                                                    value={
                                                        filter.value
                                                            ? new Date(filter.value as string)
                                                            : undefined
                                                    }
                                                    onfunChange={(dates: Date[]) => {
                                                        if (!dates?.length) {
                                                            filter.onChange?.(null);
                                                            return;
                                                        }
                                                        const iso = dates[0].toISOString().split("T")[0];
                                                        filter.onChange?.(iso);
                                                    }}
                                                    options={{
                                                        dateFormat: "Y-m-d",
                                                        allowInput: false,
                                                    }}
                                                    inputClass="form-control"
                                                    placeholder="Tarih seçiniz"
                                                />
                                            </InputWithPlus>
                                        ) : filter.type === "doubledate" ? (
                                            <InputWithPlus fieldDef={filter} navigate={navigate}>
                                                <SpkFlatpickr
                                                    value={
                                                        filter.value
                                                            ? `${(filter.value as any).startDate} to ${(filter.value as any).endDate}`
                                                            : undefined
                                                    }
                                                    onfunChange={(dates: Date[]) => {
                                                        if (!dates || dates.length < 2) {
                                                            filter.onChange?.(null);
                                                            return;
                                                        }
                                                        const startDate = formatLocalDate(dates[0]);
                                                        const endDate = formatLocalDate(dates[1]);
                                                        filter.onChange?.({ startDate, endDate });
                                                    }}
                                                    options={{
                                                        dateFormat: "Y-m-d",
                                                        mode: "range",
                                                        allowInput: false,
                                                    }}
                                                    inputClass="form-control"
                                                    placeholder="Tarih aralığı seçiniz"
                                                />
                                            </InputWithPlus>
                                        ) : filter.options ? (
                                            <InputWithPlus fieldDef={filter} navigate={navigate}>
                                                <Form.Select
                                                    value={
                                                        typeof filter.value === "string"
                                                            ? filter.value
                                                            : undefined
                                                    }
                                                    onChange={(e) => filter.onChange?.(e.target.value)}
                                                    onClick={(e) =>
                                                        filter.onClick?.(
                                                            (e.target as HTMLSelectElement).value
                                                        )
                                                    }
                                                    onFocus={filter.onFocus}
                                                    disabled={
                                                        filter.dependencyKey
                                                            ? !filters.find(f => f.key === filter.dependencyKey)?.value
                                                            : false
                                                    }
                                                >
                                                    <option value="">Seçiniz</option>
                                                    {filter.options.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </InputWithPlus>
                                        ) : (
                                            <InputWithPlus fieldDef={filter} navigate={navigate}>
                                                <Form.Control
                                                    type={filter.type || "text"}
                                                    value={filter.value as string}
                                                    onChange={(e) => filter.onChange?.(e.target.value)}
                                                    onClick={(e) =>
                                                        filter.onClick?.(
                                                            (e.target as HTMLInputElement).value
                                                        )
                                                    }
                                                    onFocus={filter.onFocus}
                                                    disabled={
                                                        filter.dependencyKey
                                                            ? !filters.find(f => f.key === filter.dependencyKey)?.value
                                                            : false
                                                    }
                                                />
                                            </InputWithPlus>
                                        )}
                                    </Form.Group>
                                </Col>
                            ))}
                        </Row>
                    );
                })}
            </div>
        </Card>
    );
};

export default FilterGroup;

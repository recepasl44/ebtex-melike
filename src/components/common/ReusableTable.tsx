import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  Table,
  Spinner,
  Alert,
  Modal,
  InputGroup,
} from "react-bootstrap";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import SpkFlatpickr from "../../@spk-reusable-components/reusable-plugins/spk-flatpicker";
import darkcontrol from "../../utils/darkmodecontroller";

// ColumnDefinition.render openDeleteModal fonksiyonunun yanında
// satır index bilgisini de opsiyonel olarak alabilir.
export interface ColumnDefinition<T> {
  key: string;
  label: string;
  style?: React.CSSProperties;
  render?: (
    row: T,
    openDeleteModal?: (row: T) => void,
    rowIndex?: number
  ) => React.ReactNode;
}

export interface FilterDefinition {
  key?: string;
  label?: string;
  placeholder?: string;
  type?:
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
  | "autocomplete"
  | "multiselect";

  // Yeni tip eklendi
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  options?: { label: string; value: any }[];
  dependencyKey?: string;
  renderForm?: (formik: any) => JSX.Element;
  onChange?: (value: any, formik?: any) => void;
  onAdd?: () => void;
  onClick?: (value: any, formik?: any) => void; // onClick özelliği eklendi
  onFocus?: () => void; // onFocus özelliği eklendi
  plus?: string;
  value?: any; // Filtre değeri; ihtiyaç duyulursa any tipi kullanılabilir
}

interface ReusableTableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[] | null;
  loading?: boolean;
  error?: string | null;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (newPage: number) => void;
  exportFileName?: string;
  showExportButtons?: boolean;
  filters?: FilterDefinition[];
  // Yeni özellikler:
  tableMode?: "single" | "multi";
  modalTitle?: string;
  pageSize?: number;
  onPageSizeChange?: (newSize: number) => void;
  onAdd?: () => void;
  /** Add butonunun üzerindeki yazı */
  addButtonText?: string;
  button?: () => void; // Buton özelliği eklendi
  buttonText?: string; // Buton metni özelliği eklendi
  // Ek: Satır silme işlemi için callback (silme onayı verildiğinde çağrılır)
  onDeleteRow?: (row: T) => void;
  // Modal desteği
  showModal?: boolean;
  onCloseModal?: () => void;
  pageTitle?: string; // Sayfa başlığı; ihtiyaç duyulursa tipi kullanılabilir
  customHeader?: React.ReactNode;
  /** Tablonun altında görüntülenecek özel içerik */
  customFooter?: React.ReactNode;
  period_paginate?: boolean;
  period_field?: boolean;
  period_date?: boolean;
  /** CSV export verisini özelleştirmek için kullanılır */
  customCsvData?: (string | number | boolean | null)[][];

  /** Silme onay mesajını özelleştirmek için kullanılır */
  deleteMessage?: (row: T) => string;
  /** Silme onay modalındaki Vazgeç butonu yazısı */
  deleteCancelButtonLabel?: string;
  /** Silme onay modalındaki Sil butonu yazısı */
  deleteConfirmButtonLabel?: string;

}
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
function ReusableTable<T extends { [key: string]: any }>({
  columns,
  data,
  loading = false,
  error = null,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  exportFileName = "data",
  showExportButtons = false,
  filters,
  tableMode = "multi",
  pageSize,
  onPageSizeChange,
  onAdd,
  addButtonText = "Ekle",
  modalTitle,
  button,
  buttonText,
  onDeleteRow,
  showModal = false,
  onCloseModal,
  pageTitle,
  customHeader,
  customFooter,
  period_paginate,
  period_field,
  period_date,

  customCsvData,

  deleteMessage,
  deleteCancelButtonLabel = "Hayır",
  deleteConfirmButtonLabel = "Evet",

}: ReusableTableProps<T>) {
  const navigate = useNavigate(); // useNavigate hook'u eklendi


  const handleExportPDF = () => {
    const doc = new jsPDF("p", "pt", "a4", 1);
    const tableColumn = columns.map((col) => col.label);
    const tableRows = (data ?? []).map((row) =>
      columns.map((col) =>
        row[col.key] !== undefined ? String(row[col.key]) : ""
      )
    );
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.save(`${exportFileName}.pdf`);
  };
  const handleExportExcel = () => {
    const worksheetData = (data ?? []).map((row) => {
      const newObj: Record<string, any> = {};
      columns.forEach((col) => {
        newObj[col.label] = row[col.key];
      });
      return newObj;
    });
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${exportFileName}.xlsx`);
  };

  // Delete modal state ve ilgili fonksiyonlar
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<T | null>(null);

  const openDeleteModal = (row: T) => {
    setRowToDelete(row);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (onDeleteRow && rowToDelete) {
      onDeleteRow(rowToDelete);
    }
    setShowDeleteModal(false);
    setRowToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setRowToDelete(null);
  };

  const renderRows = () => {
    return (data ?? []).map((row, rowIndex) => (
      <tr key={`row-${rowIndex}`}>
        {columns.map((col) => (
          <td key={col.key}>
            {col.render
              ? col.render(row, openDeleteModal, rowIndex)
              : row[col.key]}
          </td>
        ))}
      </tr>
    ));
  };

  const hasPagination =
    onPageChange &&
    typeof currentPage === "number" &&
    typeof totalPages === "number" &&
    typeof totalItems === "number";
  let canGoPrev = false,
    canGoNext = false;
  if (hasPagination) {
    canGoPrev = currentPage! > 1;
    canGoNext = currentPage! < totalPages!;
  }

  // --- SINGLE MODE: Filtreler için dinamik grup oluşturma ---
  const groupFilters = (filters: FilterDefinition[]): FilterDefinition[][] => {
    const groups: FilterDefinition[][] = [];
    // Maksimum 6 filtre bir satıra
    let temp: FilterDefinition[] = [];
    filters.forEach((filter) => {
      temp.push(filter);
      if (temp.length === 6) {
        groups.push(temp);
        temp = [];
      }
    });
    if (temp.length > 0) groups.push(temp);
    return groups;
  };

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
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          {children} {/* ref ve clone olmadan doğrudan children kullan */}
        </div>
        {fieldDef.plus && (
          <div style={{ marginLeft: "5px" }}>
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(fieldDef.plus!);
              }}
            >
              <i className="bi bi-plus" />
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Tarih aralığını string olarak formatla (SpkFlatpickr için)
  const formatDateRange = (startDate?: string, endDate?: string): string => {
    if (!startDate) return "";
    if (!endDate) return startDate;

    return `${startDate} to ${endDate}`;
  };

  // Yerel tarih formatında string olarak döndürür (YYYY-MM-DD)
  const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const renderFiltersSingle = () => {
    if (!filters || filters.length === 0) return null;
    const groups = groupFilters(filters);
    return (
      <div>
        <Card className="mb-4">
          <Card.Body>
            {groups.map((group, idx) => {
              // Satırdaki filtre sayısına göre md boyutunu ayarlayın.
              const colSize = Math.floor(12 / group.length);
              return (
                <Row key={`filter-group-${idx}`} className="mb-3">
                  {group.map((filter) => {
                    if (filter.type === "date") {
                      return (
                        <Col key={filter.key} md={colSize}>
                          <Form.Group>
                            <Form.Label>{filter.label}</Form.Label>
                            {filter.plus ? (
                              <InputWithPlus
                                fieldDef={filter}
                                navigate={navigate}
                              >
                                <SpkFlatpickr
                                  value={
                                    filter.value
                                      ? new Date(filter.value)
                                      : undefined
                                  }
                                  onfunChange={(dates: Date[]) => {
                                    if (!dates || !dates.length) {
                                      if (filter.onChange)
                                        filter.onChange(null);
                                      return;
                                    }
                                    const iso = formatLocalDate(dates[0]);
                                    if (filter.onChange) filter.onChange(iso);
                                  }}
                                  options={{
                                    dateFormat: "Y-m-d",
                                    allowInput: false,
                                  }}
                                  inputClass="form-control"
                                  placeholder="Tarih seçiniz"
                                />
                              </InputWithPlus>
                            ) : (
                              <SpkFlatpickr
                                value={
                                  filter.value
                                    ? new Date(filter.value)
                                    : undefined
                                }
                                onfunChange={(dates: Date[]) => {
                                  if (!dates || !dates.length) {
                                    if (filter.onChange) filter.onChange(null);
                                    return;
                                  }
                                  const iso = formatLocalDate(dates[0]);
                                  if (filter.onChange) filter.onChange(iso);
                                }}
                                options={{
                                  dateFormat: "Y-m-d",
                                  allowInput: false,
                                }}
                                inputClass="form-control"
                                placeholder="Tarih seçiniz"
                              />
                            )}
                          </Form.Group>
                        </Col>
                      );
                    } else if (filter.type === "doubledate") {
                      // Güvenli şekilde Date nesnesine dönüştür - İlk tarihi alalım
                      const dateRangeStr = formatDateRange(
                        filter.value?.startDate,
                        filter.value?.endDate
                      );

                      return (
                        <Col key={filter.key} md={colSize}>
                          <Form.Group>
                            <Form.Label>{filter.label}</Form.Label>
                            {filter.plus ? (
                              <InputWithPlus
                                fieldDef={filter}
                                navigate={navigate}
                              >
                                <SpkFlatpickr
                                  value={dateRangeStr}
                                  placeholder={"Tarih aralığı seçiniz"}
                                  onfunChange={(dates: Date[]) => {
                                    if (!dates || dates.length < 2) {
                                      if (filter.onChange)
                                        filter.onChange(null);
                                      return;
                                    }

                                    const startDate = formatLocalDate(dates[0]);
                                    const endDate = formatLocalDate(dates[1]);

                                    if (filter.onChange)
                                      filter.onChange({ startDate, endDate });
                                  }}
                                  options={{
                                    dateFormat: "Y-m-d",
                                    mode: "range",
                                    allowInput: false,
                                  }}
                                  inputClass="form-control"
                                />
                              </InputWithPlus>
                            ) : (
                              <SpkFlatpickr
                                value={dateRangeStr}
                                placeholder={"Tarih aralığı seçiniz"}
                                onfunChange={(dates: Date[]) => {
                                  if (!dates || dates.length < 2) {
                                    if (filter.onChange) filter.onChange(null);
                                    return;
                                  }

                                  const startDate = formatLocalDate(dates[0]);
                                  const endDate = formatLocalDate(dates[1]);

                                  if (filter.onChange)
                                    filter.onChange({ startDate, endDate });
                                }}
                                options={{
                                  dateFormat: "Y-m-d",
                                  mode: "range",
                                  allowInput: false,
                                }}
                                inputClass="form-control"
                              />
                            )}
                          </Form.Group>
                        </Col>
                      );
                    } else if (filter.type === "multiselect") {
                      return (
                        <Col key={filter.key} md={colSize}>
                          <Form.Group>
                            <Form.Label>{filter.label}</Form.Label>
                            <Form.Select
                              multiple
                              value={Array.isArray(filter.value) ? filter.value : []}
                              onChange={(e) => {
                                const selected = Array.from(
                                  e.target.selectedOptions,
                                  (opt) => opt.value
                                );
                                if (filter.onChange) filter.onChange(selected);
                              }}
                            >
                              {filter.options?.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      );
                    } // renderFiltersSingle fonksiyonu içindeki if-else bloklarına eklenecek

                    return (
                      <Col key={filter.key} md={colSize}>
                        <Form.Group>
                          <Form.Label>{filter.label}</Form.Label>
                          {filter.type === "autocomplete" ? (
                            // Autocomplete tipi için Typeahead bileşeni
                            filter.plus ? (
                              <InputWithPlus
                                fieldDef={filter}
                                navigate={navigate}
                              >
                                <Typeahead
                                  id={`typeahead-${filter.key}`}
                                  labelKey="label"
                                  options={filter.options || []}
                                  placeholder="Aramak için yazın..."
                                  onChange={(selected) => {
                                    if (
                                      selected &&
                                      selected.length > 0 &&
                                      filter.onChange
                                    ) {
                                      // Seçilen öğenin değerini gönderin
                                      filter.onChange(
                                        (selected[0] as any).value
                                      );
                                    }
                                  }}
                                  onFocus={filter.onFocus}
                                  onInputChange={(text) => {
                                    // Kullanıcı yazdıkça, metni onChange ile iletebiliriz
                                    if (filter.onChange) filter.onChange(text);
                                  }}
                                  disabled={
                                    filter.dependencyKey
                                      ? !filters.find(
                                        (f) => f.key === filter.dependencyKey
                                      )?.value
                                      : false
                                  }
                                />
                              </InputWithPlus>
                            ) : (
                              <Typeahead
                                id={`typeahead-${filter.key}`}
                                labelKey="label"
                                options={filter.options || []}
                                placeholder="Aramak için yazın..."
                                onChange={(selected) => {
                                  if (
                                    selected &&
                                    selected.length > 0 &&
                                    filter.onChange
                                  ) {
                                    // Seçilen öğenin değerini gönderin
                                    filter.onChange((selected[0] as any).value);
                                  }
                                }}
                                onFocus={filter.onFocus}
                                onInputChange={(text) => {
                                  // Kullanıcı yazdıkça, metni onChange ile iletebiliriz
                                  if (filter.onChange) filter.onChange(text);
                                }}
                                disabled={
                                  filter.dependencyKey
                                    ? !filters.find(
                                      (f) => f.key === filter.dependencyKey
                                    )?.value
                                    : false
                                }
                              />
                            )
                          ) : filter.options ? (
                            filter.plus ? (
                              <InputGroup>
                                <div style={{ flexGrow: 1 }}>
                                  <Form.Select
                                    value={filter.value}
                                    onChange={(e) =>
                                      filter.onChange &&
                                      filter.onChange(e.target.value)
                                    }
                                    onFocus={() => {
                                      // onFocus olayını kullan, bu native select davranışını etkilemeyecek
                                      if (filter.onClick) {
                                        filter.onClick("");
                                      }
                                      if (filter.onFocus) {
                                        filter.onFocus();
                                      }
                                    }}
                                    disabled={
                                      filter.dependencyKey
                                        ? !filters.find(
                                          (f) =>
                                            f.key === filter.dependencyKey
                                        )?.value
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
                                </div>
                                <div style={{ marginLeft: ".50rem" }}>
                                  <Button
                                    variant="outline-secondary"
                                    onClick={() => navigate(filter.plus!)}
                                  >
                                    <i className="bi bi-plus" />
                                  </Button>
                                </div>
                              </InputGroup>
                            ) : (
                              <Form.Select
                                value={filter.value}
                                onClick={(e) => {
                                  if (filter.onClick)
                                    filter.onClick(
                                      (e.target as HTMLSelectElement).value
                                    );
                                }}
                                onFocus={filter.onFocus}
                                onChange={(e) => {
                                  if (filter.onChange)
                                    filter.onChange(e.target.value);
                                }}
                                disabled={
                                  filter.dependencyKey
                                    ? !filters.find(
                                      (f) => f.key === filter.dependencyKey
                                    )?.value
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
                            )
                          ) : filter.plus ? (
                            <InputWithPlus
                              fieldDef={filter}
                              navigate={navigate}
                            >
                              <Form.Control
                                type={filter.type || "text"}
                                value={filter.value}
                                onClick={(e) => {
                                  if (filter.onClick)
                                    filter.onClick(
                                      (e.target as HTMLInputElement).value
                                    );
                                }}
                                onFocus={filter.onFocus}
                                onChange={(e) => {
                                  if (filter.onChange)
                                    filter.onChange(e.target.value);
                                }}
                                disabled={
                                  filter.dependencyKey
                                    ? !filters.find(
                                      (f) => f.key === filter.dependencyKey
                                    )?.value
                                    : false
                                }
                              />
                            </InputWithPlus>
                          ) : (
                            <Form.Control
                              type={filter.type || "text"}
                              value={filter.value}
                              onClick={(e) => {
                                if (filter.onClick)
                                  filter.onClick(
                                    (e.target as HTMLInputElement).value
                                  );
                              }}
                              onFocus={filter.onFocus}
                              onChange={(e) => {
                                if (filter.onChange)
                                  filter.onChange(e.target.value);
                              }}
                              disabled={
                                filter.dependencyKey
                                  ? !filters.find(
                                    (f) => f.key === filter.dependencyKey
                                  )?.value
                                  : false
                              }
                            />
                          )}
                        </Form.Group>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </Card.Body>
        </Card>
      </div>
    );
  };

  // --- MULTI MODE: Eski düzen (2 filtre/row) ---
  const renderFiltersMulti = () => {
    if (!filters || filters.length === 0) return null;
    const groups: FilterDefinition[][] = [];
    for (let i = 0; i < filters.length; i += 2) {
      groups.push(filters.slice(i, i + 2));
    }
    return (
      <div className="mb-3">
        {groups.map((group, idx) => (
          <Row key={`filter-row-${idx}`} className="mb-2">
            {group.map((filter) => {
              if (filter.type === "date") {
                return (
                  <Col key={filter.key} md={6}>
                    <Form.Group>
                      <Form.Label>{filter.label}</Form.Label>
                      {filter.plus ? (
                        <InputWithPlus fieldDef={filter} navigate={navigate}>
                          <SpkFlatpickr
                            value={
                              filter.value ? new Date(filter.value) : undefined
                            }
                            onfunChange={(dates: Date[]) => {
                              if (!dates || !dates.length) {
                                if (filter.onChange) filter.onChange(null);
                                return;
                              }
                              const iso = formatLocalDate(dates[0]);
                              if (filter.onChange) filter.onChange(iso);
                            }}
                            options={{
                              dateFormat: "Y-m-d",
                              allowInput: false,
                            }}
                            disable
                            inputClass="form-control"
                            placeholder="Tarih seçiniz"
                          />
                        </InputWithPlus>
                      ) : (
                        <SpkFlatpickr
                          value={
                            filter.value ? new Date(filter.value) : undefined
                          }
                          onfunChange={(dates: Date[]) => {
                            if (!dates || !dates.length) {
                              if (filter.onChange) filter.onChange(null);
                              return;
                            }
                            const iso = formatLocalDate(dates[0]);
                            if (filter.onChange) filter.onChange(iso);
                          }}
                          options={{
                            dateFormat: "Y-m-d",
                            allowInput: false,
                          }}
                          inputClass="form-control"
                          placeholder="Tarih seçiniz"
                          disable
                        />
                      )}
                    </Form.Group>
                  </Col>
                );
              } else if (filter.type === "doubledate") {
                // Tarih aralığını string formatında hazırla
                const dateRangeStr = formatDateRange(
                  filter.value?.startDate,
                  filter.value?.endDate
                );

                return (
                  <Col key={filter.key} md={6}>
                    <Form.Group>
                      <Form.Label>{filter.label}</Form.Label>
                      {filter.plus ? (
                        <InputWithPlus fieldDef={filter} navigate={navigate}>
                          <SpkFlatpickr
                            value={dateRangeStr}
                            placeholder={"Tarih aralığı seçiniz"}
                            onfunChange={(dates: Date[]) => {
                              if (!dates || dates.length < 2) {
                                if (filter.onChange) filter.onChange(null);
                                return;
                              }

                              const startDate = formatLocalDate(dates[0]);
                              const endDate = formatLocalDate(dates[1]);

                              if (filter.onChange)
                                filter.onChange({ startDate, endDate });
                            }}
                            options={{
                              dateFormat: "Y-m-d",
                              mode: "range",
                              allowInput: false,
                            }}
                            inputClass="form-control"
                          />
                        </InputWithPlus>
                      ) : (
                        <SpkFlatpickr
                          value={dateRangeStr}
                          placeholder={"Tarih aralığı seçiniz"}
                          onfunChange={(dates: Date[]) => {
                            if (!dates || dates.length < 2) {
                              if (filter.onChange) filter.onChange(null);
                              return;
                            }

                            const startDate = formatLocalDate(dates[0]);
                            const endDate = formatLocalDate(dates[1]);

                            if (filter.onChange)
                              filter.onChange({ startDate, endDate });
                          }}
                          options={{
                            dateFormat: "Y-m-d",
                            mode: "range",
                            allowInput: false,
                          }}
                          inputClass="form-control"
                        />
                      )}
                    </Form.Group>
                  </Col>
                );
              } else if (filter.type === "multiselect") {
                return (
                  <Col key={filter.key} md={6}>
                    <Form.Group>
                      <Form.Label>{filter.label}</Form.Label>
                      <Form.Select
                        multiple
                        value={Array.isArray(filter.value) ? filter.value : []}
                        onChange={(e) => {
                          const selected = Array.from(
                            e.target.selectedOptions,
                            (opt) => opt.value
                          );
                          if (filter.onChange) filter.onChange(selected);
                        }}
                      >
                        {filter.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                );
              } // renderFiltersMulti fonksiyonu içindeki if-else bloklarına eklenecek

              return (
                <Col key={filter.key} md={6}>
                  <Form.Group>
                    <Form.Label>{filter.label}</Form.Label>
                    {filter.type === "autocomplete" ? (
                      // Autocomplete tipi için Typeahead bileşeni
                      filter.plus ? (
                        <InputWithPlus fieldDef={filter} navigate={navigate}>
                          <Typeahead
                            id={`typeahead-${filter.key}`}
                            labelKey="label"
                            options={filter.options || []}
                            placeholder="Aramak için yazın..."
                            onChange={(selected) => {
                              if (
                                selected &&
                                selected.length > 0 &&
                                filter.onChange
                              ) {
                                // Seçilen öğenin değerini gönderin
                                filter.onChange((selected[0] as any).value);
                              }
                            }}
                            onFocus={filter.onFocus}
                            onInputChange={(text) => {
                              // Kullanıcı yazdıkça, metni onChange ile iletebiliriz
                              if (filter.onChange) filter.onChange(text);
                            }}
                            disabled={
                              filter.dependencyKey
                                ? !filters.find(
                                  (f) => f.key === filter.dependencyKey
                                )?.value
                                : false
                            }
                          />
                        </InputWithPlus>
                      ) : (
                        <Typeahead
                          id={`typeahead-${filter.key}`}
                          labelKey="label"
                          options={filter.options || []}
                          placeholder="Aramak için yazın..."
                          onChange={(selected) => {
                            if (
                              selected &&
                              selected.length > 0 &&
                              filter.onChange
                            ) {
                              // Seçilen öğenin değerini gönderin
                              filter.onChange((selected[0] as any).value);
                            }
                          }}
                          onFocus={filter.onFocus}
                          onInputChange={(text) => {
                            // Kullanıcı yazdıkça, metni onChange ile iletebiliriz
                            if (filter.onChange) filter.onChange(text);
                          }}
                          disabled={
                            filter.dependencyKey
                              ? !filters.find(
                                (f) => f.key === filter.dependencyKey
                              )?.value
                              : false
                          }
                        />
                      )
                    ) : filter.options ? (
                      filter.plus ? (
                        <InputGroup>
                          <div style={{ flexGrow: 1 }}>
                            <Form.Select
                              value={filter.value}
                              onChange={(e) =>
                                filter.onChange &&
                                filter.onChange(e.target.value)
                              }
                              onFocus={() => {
                                if (filter.onClick) {
                                  filter.onClick("");
                                }
                                if (filter.onFocus) {
                                  filter.onFocus();
                                }
                              }}
                              disabled={
                                filter.dependencyKey
                                  ? !filters.find(
                                    (f) => f.key === filter.dependencyKey
                                  )?.value
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
                          </div>
                          <div style={{ marginLeft: ".50rem" }}>
                            <Button
                              variant="outline-secondary"
                              onClick={() => navigate(filter.plus!)}
                            >
                              <i className="bi bi-plus" />
                            </Button>
                          </div>
                        </InputGroup>
                      ) : (
                        <Form.Select
                          value={filter.value}
                          onClick={(e) => {
                            if (filter.onClick)
                              filter.onClick(
                                (e.target as HTMLSelectElement).value
                              );
                          }}
                          onFocus={filter.onFocus}
                          onChange={(e) => {
                            if (filter.onChange)
                              filter.onChange(e.target.value);
                          }}
                          disabled={
                            filter.dependencyKey
                              ? !filters.find(
                                (f) => f.key === filter.dependencyKey
                              )?.value
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
                      )
                    ) : filter.plus ? (
                      <InputWithPlus fieldDef={filter} navigate={navigate}>
                        <Form.Control
                          type={filter.type || "text"}
                          value={filter.value}
                          onChange={(e) =>
                            filter.onChange && filter.onChange(e.target.value)
                          }
                          onClick={(e) => {
                            if (filter.onClick)
                              filter.onClick(
                                (e.target as HTMLInputElement).value
                              );
                          }}
                          onFocus={filter.onFocus}
                          disabled={
                            filter.dependencyKey
                              ? !filters.find(
                                (f) => f.key === filter.dependencyKey
                              )?.value
                              : false
                          }
                        />
                      </InputWithPlus>
                    ) : (
                      <Form.Control
                        type={filter.type || "text"}
                        placeholder={filter.placeholder}
                        value={filter.value}
                        onChange={(e) =>
                          filter.onChange && filter.onChange(e.target.value)
                        }
                        onClick={(e) => {
                          if (filter.onClick)
                            filter.onClick(
                              (e.target as HTMLInputElement).value
                            );
                        }}
                        onFocus={filter.onFocus}
                        disabled={
                          filter.dependencyKey
                            ? !filters.find(
                              (f) => f.key === filter.dependencyKey
                            )?.value
                            : false
                        }
                      />
                    )}
                  </Form.Group>
                </Col>
              );
            })}
          </Row>
        ))}
      </div>
    );
  };

  // --- SINGLE MODE LAYOUT ---
  if (tableMode === "single") {
    const content = (
      <>
        <div style={{ marginBottom: "20px" }}>
          <h5>{pageTitle}</h5>
        </div>
        {renderFiltersSingle()}
        {customHeader}
        <Card className="mb-4">
          <Card.Body className="active-tab">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex gap-2">
                {showExportButtons && (
                  <>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={handleExportPDF}
                    >
                      PDF
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={handleExportExcel}
                    >
                      Excel
                    </Button>
                  </>
                )}
              </div>
              <div className="d-flex gap-2">
                {button && (
                  <Button variant="outline-secondary" onClick={button}>
                    {buttonText}
                  </Button>
                )}
                {onAdd && (
                  <Button variant="outline-secondary" onClick={onAdd}>
                    {addButtonText}
                  </Button>
                )}
              </div>
            </div>
            {pageSize !== undefined && onPageSizeChange && (
              <div className="d-flex align-items-center mb-3 gap-2">
                {darkcontrol.dataThemeMode === "dark" ? (
                  <div style={{ color: "white" }}>Sayfa Boyutu:</div>
                ) : (
                  <div className="light-rgb">Sayfa Boyutu:</div>
                )}

                <Form.Select
                  aria-label="Page Size"
                  style={{ width: "4rem" }}
                  value={pageSize}
                  onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
                  size="sm"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Form.Select>
              </div>
            )}
            {period_date && (data?.length ?? 0) > 0 ? (
              <div className="d-flex align-items-center mb-3 gap-2">
                <span style={{ color: "#A76CF8" }}>
                  {currentPage}. Periyot{" "}
                  {data && data.length > 0
                    ? new Date(data[0].period?.start_date).toLocaleDateString(
                      "tr-TR"
                    )
                    : "-"}{" "}
                  -{" "}
                  {data && data.length > 0
                    ? new Date(data[0].period?.end_date).toLocaleDateString(
                      "tr-TR"
                    )
                    : "-"}
                </span>
              </div>
            ) : null}
            <div className="table-responsive">
              <Table striped bordered hover size="sm" className="mb-3 w-100">
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key}>{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data?.length ?? 0) > 0 ? (
                    renderRows()
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="text-center">
                        {loading ? "Yükleniyor..." : "Kayıt bulunamadı"}
                      </td>
                    </tr>
                  )}

                </tbody>
              </Table>
              {customFooter}
            </div>
          </Card.Body>
          {period_paginate
            ? hasPagination && (
              <Card.Footer>
                <div className="d-flex align-items-end">
                  {period_field && (data?.length || 0) >= 1 ? (
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ minWidth: "115px" }}>
                          Planlanan Soru
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            data && data.length > 0
                              ? data[0].stats.planned_questions
                              : ""
                          }
                          readOnly
                        />
                        <span style={{ minWidth: "115px" }}>
                          Gerçekleşen Soru
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            data && data.length > 0
                              ? data[0].stats.happened_questions
                              : ""
                          }
                          readOnly
                        />
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ minWidth: "115px" }}>
                          Planlanan Süre
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            data && data.length > 0
                              ? data[0].stats.planned_time
                              : ""
                          }
                          readOnly
                        />
                        <span style={{ minWidth: "115px" }}>
                          Gerçekleşen Süre
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            data && data.length > 0
                              ? data[0].stats.happened_time
                              : ""
                          }
                          readOnly
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="ms-auto">
                    <nav
                      aria-label="Page navigation"
                      className="pagination-style-3 justify-content-end"
                    >
                      {" "}
                      <Pagination className="mb-0 flex-wrap ">
                        <div>
                          <Pagination.Item
                            disabled={!canGoPrev}
                            onClick={() => onPageChange!(currentPage! - 1)}
                          >
                            <i
                              className="bi bi-chevron-left fw-100"
                              style={{ marginRight: "3px" }}
                            />
                            Önceki Periyot
                          </Pagination.Item>
                        </div>
                        <div className="ms-auto">
                          <Pagination.Item
                            disabled={
                              !canGoNext || !data || data.length === 0
                            }
                            onClick={() => onPageChange!(currentPage! + 1)}
                          >
                            <span>Sonraki Periyot</span>
                            <i
                              className="bi bi-chevron-right fw-100"
                              style={{ marginLeft: "3px" }}
                            />
                          </Pagination.Item>
                        </div>
                      </Pagination>
                    </nav>
                  </div>
                </div>
              </Card.Footer>
            )
            : hasPagination && (
              <Card.Footer>
                <div className="d-flex align-items-center">
                  <div>
                    Toplam <b>{totalItems}</b> kayıt
                  </div>
                  <div className="ms-auto">
                    <nav
                      aria-label="Page navigation"
                      className="pagination-style-4"
                    >
                      <Pagination className="mb-0 flex-wrap">
                        <Pagination.Item
                          disabled={!canGoPrev}
                          onClick={() => onPageChange!(currentPage! - 1)}
                        >
                          Önceki
                        </Pagination.Item>
                        {currentPage && currentPage > 1 && (
                          <Pagination.Item
                            onClick={() => onPageChange!(currentPage! - 1)}
                          >
                            {currentPage! - 1}
                          </Pagination.Item>
                        )}
                        <Pagination.Item active>
                          {currentPage}
                        </Pagination.Item>
                        {currentPage && currentPage < totalPages! && (
                          <Pagination.Item
                            onClick={() => onPageChange!(currentPage! + 1)}
                          >
                            {currentPage! + 1}
                          </Pagination.Item>
                        )}
                        <Pagination.Item
                          disabled={!canGoNext}
                          onClick={() => onPageChange!(currentPage! + 1)}
                        >
                          Sonraki
                        </Pagination.Item>
                      </Pagination>
                    </nav>
                  </div>
                </div>
              </Card.Footer>
            )}

        </Card>

        {/* Delete onay modalı - Silme modalını buraya taşıyoruz */}
        <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>Onay</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {deleteMessage && rowToDelete
              ? deleteMessage(rowToDelete)
              : "Silmek istediğinizden emin misiniz?"}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleDeleteCancel}>
              {deleteCancelButtonLabel}
            </Button>
            <Button variant="outline-secondary" onClick={handleDeleteConfirm}>
              {deleteConfirmButtonLabel}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
    return showModal ? (
      <Modal show={true} onHide={onCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle ?? exportFileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
      </Modal>
    ) : (
      content
    );
  }
  // --- MULTI MODE LAYOUT (Varsayılan) ---
  else {
    // Filtreler, başlık ve tablo içeriklerinin multi mode düzeni
    const headerContent = (
      <div className="d-flex align-items-center mb-1">
        {showExportButtons && (
          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleExportPDF}
            >
              PDF
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleExportExcel}
            >
              Excel
            </Button>
          </div>
        )}
        {/* İsteğe bağlı başlık vs. ekleyebilirsiniz. */}
        {button && (
          <div className="d-flex align-items-center mb-1 gap-2">
            <Button variant="outline-secondary" onClick={button}>
              {buttonText}
            </Button>
          </div>
        )}
        {onAdd && (
          <div className="d-flex align-items-center mb-1 gap-2 ms-auto">
            <Button variant="outline-secondary" onClick={onAdd}>
              {addButtonText}
            </Button>
          </div>
        )}
      </div>
    );

    const content = (
      <>
        <div className="p-2 border rounded">
          {loading && (
            <div className="my-2 text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          {renderFiltersMulti()}
          {customHeader}
          {headerContent}
          <div className="table-responsive">
            <Table striped bordered hover size="cm" className="mb-3 w-100">
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <tr>
                  {columns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(data?.length ?? 0) > 0 ? (
                  renderRows()
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center">
                      {loading ? "Yükleniyor..." : "Kayıt bulunamadı"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {customFooter}
          </div>
          {hasPagination && (
            <div className="d-flex align-items-center mt-2">
              <div className="ms-3">
                <small
                  style={{
                    color:
                      darkcontrol.dataThemeMode === "dark"
                        ? "#e9ecef"
                        : "rgb(var(--text-color-rgb))",
                  }}
                >
                  Toplam <b>{totalItems}</b> kayıt
                </small>
              </div>
              <Pagination size="sm" className="ms-auto mb-0">
                <Pagination.Prev
                  disabled={!canGoPrev}
                  onClick={() => onPageChange!(currentPage! - 1)}
                />

                <Pagination.Next
                  disabled={!canGoNext}
                  onClick={() => onPageChange!(currentPage! + 1)}
                />
              </Pagination>
            </div>
          )}
        </div>

        {/* Multi-mode için de silme modalını ekliyoruz */}
        <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>Onay</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {deleteMessage && rowToDelete
              ? deleteMessage(rowToDelete)
              : "Silmek istediğinizden emin misiniz?"}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteCancel}>
              {deleteCancelButtonLabel}
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              {deleteConfirmButtonLabel}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
    return showModal ? (
      <Modal show={true} onHide={onCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle ?? exportFileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
      </Modal>
    ) : (
      content
    );
  }
}

export default ReusableTable;

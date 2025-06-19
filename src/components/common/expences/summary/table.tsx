import { useMemo } from "react";
import ReusableTable, {
  ColumnDefinition,
} from "../../ReusableTable";
import { useExpenseSummaryTable } from "../../../hooks/expences/summary/useExpencesSummary";
import { ExpenseSummary } from "../../../../types/expences/summary/getExpenseSummary";
import SpkFlatpickr from "@spk-reusable-components/reusable-plugins/spk-flatpicker";
import { InputGroup } from "react-bootstrap";

export default function ExpenseSummaryTable() {
  const { expenseData, loading, error, handleDateRangeChange } =
    useExpenseSummaryTable();

  const columnSalary: ColumnDefinition<ExpenseSummary>[] = useMemo(
    () => [
      {
        key: "id",
        label: "Maaş",
      },
      {
        key: "salary",
        label: "Verecek",
        render: (row) => (row.salary?.verecek ? row.salary?.verecek : "-"),
      },
      {
        key: "salary",
        label: "Ödenen",
        render: (row) => (row.salary?.odenen ? row.salary?.odenen : "-"),
      },
      {
        key: "salary",
        label: "Kalan",
        render: (row) => (row.salary?.kalan ? row.salary?.kalan : "-"),
      },
    ],
    []
  );

  const columnPrim: ColumnDefinition<ExpenseSummary>[] = useMemo(
    () => [
      {
        key: "id",
        label: "Prim",
      },
      {
        key: "prim",
        label: "Verecek",
        render: (row) => (row.prim?.verecek ? row.prim?.verecek : "-"),
      },
      {
        key: "prim",
        label: "Ödenen",
        render: (row) => (row.prim?.odenen ? row.prim?.odenen : "-"),
      },
      {
        key: "prim",
        label: "Kalan",
        render: (row) => (row.prim?.kalan ? row.prim?.kalan : "-"),
      },
    ],
    []
  );

  const columnTazminat: ColumnDefinition<ExpenseSummary>[] = useMemo(
    () => [
      {
        key: "id",
        label: "Tazminat",
      },
      {
        key: "tazminat",
        label: "Verecek",
        render: (row) => (row.tazminat?.verecek ? row.tazminat?.verecek : "-"),
      },
      {
        key: "tazminat",
        label: "Ödenen",
        render: (row) => (row.tazminat?.odenen ? row.tazminat?.odenen : "-"),
      },
      {
        key: "tazminat",
        label: "Kalan",
        render: (row) => (row.tazminat?.kalan ? row.tazminat?.kalan : "-"),
      },
    ],
    []
  );

  // Helper function to prepare data for tables
  const prepareTableData = (
    data: any,
    type: "salary" | "prim" | "tazminat"
  ): ExpenseSummary[] => {
    if (!data) return [];

    const items = Array.isArray(data) ? data : [data];

    return items.map((item) => {
      const result: ExpenseSummary = {
        salary: { verecek: "", odenen: "", kalan: "" },
        prim: { verecek: "", odenen: "", kalan: "" },
        tazminat: { verecek: "", odenen: "", kalan: "" },
      };

      result[type] = item;
      return result;
    });
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Gider Özet</h4>
      </div>
      <div className="mb-3 d-flex align-items-center gap-2">
        <label htmlFor="dateRange" className="form-label mb-0">
          Tarih Aralığı:
        </label>
        <div className="form-group" style={{ width: "300px" }}>
          <InputGroup className="datepicker-inputwraper">
            <SpkFlatpickr
              inputClass="form-control"
              options={{
                mode: "range",
                dateFormat: "Y-m-d",
                static: true,
              }}
              onfunChange={handleDateRangeChange}
              placeholder="Tarih aralığı seçin"
            />
            <InputGroup.Text className="input-group-text text-muted">
              <i className="ri-calendar-line"></i>
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>
      <ReusableTable<ExpenseSummary>
        columns={columnSalary}
        data={prepareTableData(expenseData?.salary, "salary")}
        loading={loading}
        error={error}
      />
      <ReusableTable<ExpenseSummary>
        columns={columnPrim}
        data={prepareTableData(expenseData?.prim, "prim")}
        loading={loading}
        error={error}
      />
      <ReusableTable<ExpenseSummary>
        columns={columnTazminat}
        data={prepareTableData(expenseData?.tazminat, "tazminat")}
        loading={loading}
        error={error}
      />
    </div>
  );
}

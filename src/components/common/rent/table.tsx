import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useRentList, RentItem } from "../../hooks/rent/useRentList";
import { useRentShow } from "../../hooks/rent/useRentShow";
import RentDetailModal from "./RentDetailModal";

export default function RentTable() {
  const navigate = useNavigate();

  const {
    rentData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
  } = useRentList({ enabled: true });
  const { getRent } = useRentShow();

  const [showDetail, setShowDetail] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [rowDetails, setRowDetails] = useState<Record<number, { paid: number; remaining: number }>>({});
  const [totals, setTotals] = useState({ rent: 0, paid: 0, remaining: 0 });

  useEffect(() => {
    async function calcDetails() {
      let totalRent = 0;
      let totalPaid = 0;
      const details: Record<number, { paid: number; remaining: number }> = {};

      for (const r of rentData) {
        totalRent += Number(r.total_rent);
        const detail = await getRent(r.id);
        let paid = 0;
        if (detail) {
          paid = detail.installments.reduce(
            (sum, inst) => sum + (Number(inst.amount) - Number(inst.remaining_amount)),
            0
          );
        }
        totalPaid += paid;
        details[r.id] = { paid, remaining: Number(r.total_rent) - paid };
      }

      setRowDetails(details);
      setTotals({ rent: totalRent, paid: totalPaid, remaining: totalRent - totalPaid });
    }

    if (rentData.length) calcDetails();
  }, [rentData, getRent]);

  const columns: ColumnDefinition<RentItem>[] = useMemo(
    () => [
      {
        key: "rowNo",
        label: "Sıra No",
        render: (_row, _open, rowIndex) => rowIndex + 1,
      },
      { key: "rent_date", label: "Kiranın Adı" },
      {
        key: "total_rent",
        label: "Ödenecek Tutar",
        render: (row) => Number(row.total_rent).toLocaleString(),
      },
      {
        key: "paid_amount",
        label: "Ödenen Tutar",
        render: (row) => rowDetails[row.id]?.paid?.toLocaleString() ?? "-",
      },
      {
        key: "remaining_amount",
        label: "Kalan Tutar",
        render: (row) => rowDetails[row.id]?.remaining?.toLocaleString() ?? "-",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <button
              onClick={() => {
                setSelectedId(row.id);
                setShowDetail(true);
              }}
              className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            >
              <i className="ti ti-eye" />
            </button>
            <button
              onClick={() => navigate(`/rentcrud/${row.id}`)}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
          </>
        ),
      },
    ],
    [navigate, rowDetails]
  );

  return (
    <div className="container mt-3">
      <div className="row mb-4">
        <div className="col-md-4">
          <Card>
            <Card.Body>
              <h6>Kira Toplamı</h6>
              <span>{totals.rent.toLocaleString()}</span>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card>
            <Card.Body>
              <h6>Ödenen</h6>
              <span>{totals.paid.toLocaleString()}</span>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card>
            <Card.Body>
              <h6>Kalan</h6>
              <span>{totals.remaining.toLocaleString()}</span>
            </Card.Body>
          </Card>
        </div>
      </div>
      <ReusableTable<RentItem>
        pageTitle="Kira Listesi"
        onAdd={() => navigate("/rentcrud")}
        columns={columns}
        data={rentData}
        loading={loading}
        error={error}
        tableMode="single"
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
        exportFileName="rents"
      />
      <RentDetailModal
        show={showDetail}
        rentId={selectedId}
        onClose={() => setShowDetail(false)}
      />
    </div>
  );
}

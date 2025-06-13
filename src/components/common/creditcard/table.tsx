import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Table as BTable, Button } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useCreditCardTable } from "../../hooks/creditCard/useCreditCardList";
import { useCreditCardDelete } from "../../hooks/creditCard/useCreditCardDelete";
import { ICreditCard } from "../../../types/creditCard/list";
import Pageheader from "../../page-header/pageheader";

export default function CreditCardTable() {
  const navigate = useNavigate();
  const { removeCreditCard } = useCreditCardDelete();
  const [detailRow, setDetailRow] = useState<CreditCardRow | null>(null);

  interface CreditCardRow extends ICreditCard {
    branch_name?: string;
    military_debt?: string;
    due_date?: string;
    paid_amount?: string;
    remaining_amount?: string;
  }

  const {
    creditCardData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
  } = useCreditCardTable({ enabled: true });

  const columns: ColumnDefinition<CreditCardRow>[] = useMemo(
    () => [
      { key: "branch_name", label: "Şube", render: (r) => r.branch_name || r.branch_id || "-" },
      { key: "card_name", label: "Kart Adı", render: (r) => r.description || "-" },
      { key: "card_number", label: "Kart No" },
      { key: "card_holder_name", label: "Kart Sahibi" },
      { key: "amount", label: "Borç Tutarı" },
      { key: "military_debt", label: "Askeri Borç Tutarı", render: r => r.military_debt || "-" },
      { key: "due_date", label: "Son Ödeme Tarihi", render: r => r.due_date || "-" },
      { key: "paid_amount", label: "Ödenen Tutar", render: r => r.paid_amount || "-" },
      { key: "remaining_amount", label: "Kalan Tutar", render: r => r.remaining_amount || "-" },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <button
              onClick={() => setDetailRow(row)}
              className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            >
              <i className="ti ti-eye" />
            </button>
            <button
              onClick={() => navigate(`/creditcardcrud/${row.id}`)}
              className="btn btn-icon btn-sm btn-info-light rounded-pill ms-1"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill ms-1"
              onClick={() => openDeleteModal && openDeleteModal(row)}
            >
              <i className="ti ti-trash" />
            </button>
          </>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="container mt-3">
      <Pageheader title="Finans ve Muhasebe" currentpage="Kart Yönetimi" />
      <ReusableTable<CreditCardRow>
        // pageTitle="Kredi Kartları"
        onAdd={() => navigate("/creditcardcrud")}
        columns={columns}
        data={creditCardData as CreditCardRow[]}
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
        tableMode="single"
        showExportButtons
        exportFileName="creditcards"
        onDeleteRow={(row) => removeCreditCard(Number(row.id))}
      />

      {detailRow && (
        <Modal show={true} onHide={() => setDetailRow(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Kredi Kartı Detayı</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BTable bordered size="sm">
              <thead>
                <tr>
                  <th>Şube</th>
                  <th>Kart Sahibi</th>
                  <th>Kart Adı</th>
                  <th>Kart No</th>
                  <th>Son Kullanma</th>
                  <th>Tutar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{(detailRow as any).branch_name || detailRow.branch_id}</td>
                  <td>{detailRow.card_holder_name}</td>
                  <td>{detailRow.description || '-'}</td>
                  <td>{detailRow.card_number}</td>
                  <td>
                    {detailRow.expire_month}/{detailRow.expire_year}
                  </td>
                  <td>{detailRow.amount}</td>
                </tr>
              </tbody>
            </BTable>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDetailRow(null)}>
              Kapat
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

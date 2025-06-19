import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Table as BTable, Button } from "react-bootstrap";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../ReusableTable";
import Pageheader from "../../page-header/pageheader";
import { useTransfersTable } from "../../hooks/transfers/useList";
import { useTransferDelete } from "../../hooks/transfers/useDelete";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useBankTable } from "../../hooks/bank/useBankList";
import { TransferType } from "../../../enums/transfers/list";
import { TransferData } from "../../../types/transfers/list";

export default function TransfersTable() {
  const navigate = useNavigate();

  const [branch, setBranch] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [detailRow, setDetailRow] = useState<TransferData | null>(null);


  const {
    transfersData,
    loading,
    error,
    page,
    paginate,
    totalPages,
    totalItems,
    setPage,
    setPaginate,
    setFilter,
  } = useTransfersTable({ enabled: true });

  const { branchData } = useBranchTable({ enabled: true, paginate: 100 });
  const { bankData } = useBankTable({ enabled: true, paginate: 100 });
  const { deleteExistingTransfer } = useTransferDelete();


  const columns: ColumnDefinition<TransferData>[] = useMemo(
    () => [
      {
        key: "branch_name",
        label: "Şube",
        render: (row: {
          bank_account: any; sender_branch_id: any;
        }) => (row as any).branch_name || row.sender_branch_id || "-",
      },
      { key: "transaction_type", label: "İşlem Türü" },
      {
        key: "received_amount",
        label: "Alınan",
        render: (row) =>
          (row as any).received_amount
            ? `₺${Number((row as any).received_amount).toLocaleString()}`
            : "-",
      },
      {
        key: "given_amount",
        label: "Verilen",
        render: (row) =>
          (row as any).given_amount
            ? `₺${Number((row as any).given_amount).toLocaleString()}`
            : "-",
      },
      {
        key: "bank_name",
        label: "Banka Hesap Adı",
        render: (row) => (row as any).bank_name || row.bank_account || "-",
      },
      {
        key: "created_at",
        label: "Tarih",
        render: (row) => new Date(row.created_at).toLocaleDateString(),
      },
      {
        key: "description",
        label: "Açıklama",
        style: { wordBreak: "break-word" },
      },
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
              onClick={() => navigate(`/transfers/crud/${row.id}`)}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
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


  const transactionOptions = [
    { label: "Şube İçi Bankadan Nakite", value: TransferType.SubeI_BankadanNakite },
    { label: "Şube İçi Nakitkasadan Bankaya", value: TransferType.SubeI_NakitsasadanBankaya },
    { label: "Şube İçi Kredi Kartından Bankaya", value: TransferType.SubeI_KredikartindanBankaya },
    { label: "Şube İçi Bankadan Bankaya", value: TransferType.SubeI_BankadanBankaya },
    { label: "Şubeler Arası Nakit", value: TransferType.SubelerArasi_Nakit },
    { label: "Şubeler Arası Bankadan Bankaya", value: TransferType.SubelerArasi_BankadanBankaya },
    { label: "Şubeler Arası Nakitkasadan Bankaya", value: TransferType.SubelerArasi_NakitsasadanBankaya },
    { label: "Şubeler Arası Bankadan Nakitkasaya", value: TransferType.SubelerArasi_BankadanNakitkasaya },
    { label: "Şubeler Arası Çek", value: TransferType.SubelerArasi_Cek },
    { label: "Şubeler Arası Senet", value: TransferType.SubelerArasi_Senet },
  ];

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "branch",
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
        key: "transaction_type",
        label: "İşlem Türü",
        type: "select" as const,
        value: transactionType,
        options: transactionOptions,
        onChange: (val: string) => {
          setTransactionType(val);
          setPage(1);
        },
      },
      {
        key: "bank_account",
        label: "Banka Hesabı",
        type: "select" as const,
        value: bankAccount,
        options: (bankData || []).map((b) => ({ value: String(b.id), label: b.bank_name })),
        onChange: (val: string) => {
          setBankAccount(val);
          setPage(1);
        },
      },
      {
        key: "date_range",
        label: "Tarih Aralığı",
        type: "doubledate" as const,
        value: { startDate: dateRange.startDate, endDate: dateRange.endDate },
        onChange: (val: any) => {
          setDateRange({ startDate: val?.startDate || "", endDate: val?.endDate || "" });
          setPage(1);
        },
      },
    ],
    [branch, transactionType, bankAccount, dateRange, branchData, bankData, setPage]
  );

  useEffect(() => {
    setFilter({
      branch_id: branch || undefined,
      transaction_type: transactionType || undefined,
      bank_account: bankAccount || undefined,
      start_date: dateRange.startDate || undefined,
      end_date: dateRange.endDate || undefined,
    });
  }, [branch, transactionType, bankAccount, dateRange, setFilter]);

  return (
    <div className="container mt-3">
      <Pageheader title="Finans ve Muhasebe" currentpage="Transferler" />
      <ReusableTable<TransferData>
        // pageTitle="Transfer Listesi"
        onAdd={() => navigate("/transfers/crud")}
        columns={columns}
        data={transfersData}
        loading={loading}
        error={error}
        tableMode="single"
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={paginate}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => {
          setPaginate(newSize);
          setPage(1);
        }}
        filters={filters}
        onDeleteRow={async (row) => {
          await deleteExistingTransfer(Number(row.id));
          setFilter((f: any) => ({ ...f }));
        }}
        exportFileName="transfers"
      />

      {detailRow && (
        <Modal show={true} onHide={() => setDetailRow(null)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Transfer Detayı</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BTable bordered size="sm">
              <thead>
                <tr>
                  <th>Şube</th>
                  <th>İşlem Türü</th>
                  <th>Alınan</th>
                  <th>Verilen</th>
                  <th>Banka Hesap Adı</th>
                  <th>Tarih</th>
                  <th>Açıklama</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{(detailRow as any).branch_name || detailRow.sender_branch_id || '-'}</td>
                  <td>{detailRow.transaction_type}</td>
                  <td>
                    {(detailRow as any).received_amount
                      ? `₺${Number((detailRow as any).received_amount).toLocaleString()}`
                      : '-'}
                  </td>
                  <td>
                    {(detailRow as any).given_amount
                      ? `₺${Number((detailRow as any).given_amount).toLocaleString()}`
                      : '-'}
                  </td>
                  <td>{(detailRow as any).bank_name || detailRow.bank_account}</td>
                  <td>{new Date(detailRow.created_at).toLocaleDateString()}</td>
                  <td className="text-break">{detailRow.description}</td>
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

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition, FilterDefinition } from "../ReusableTable";
import { Personel } from "../../../types/employee/personel/list";
import { usePersonnelTable } from "../../hooks/employee/personel/main_list";
import { usePersonelDelete } from "../../hooks/employee/personel/useDelete";
import { usePersonelUpdate } from "../../hooks/employee/personel/useUpdate";

export default function PersonelListPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState(10);


  const {
    personnelData,
    loading,
    error,
    setSearchTerm,
  } = usePersonnelTable({
    enabled: true,
    page,
    paginate,
    search,
  });


  const {
    deleteExistingPersonel,
    error: deleteError,
  } = usePersonelDelete();


  const {
    updateExistingPersonel,
    error: updateError,
    status: updateStatus,
  } = usePersonelUpdate();

  async function handleToggleActive(p: Personel) {
    const yeniAktif = p.aktif === 1 ? 0 : 1;
    await updateExistingPersonel({
      personelId: p.id,
      payload: { aktif: yeniAktif },
    });

    setSearchTerm((prev) => prev);
  }

  const filters = useMemo<FilterDefinition[]>(() => [
    {
      key: "search",
      label: "Arama",
      value: search,
      onChange: (val: string) => {
        setSearch(val);
        setSearchTerm(val);
        setPage(1);
      },

    },
  ], [search, setSearch, setSearchTerm, setPage]);


  const columns: ColumnDefinition<Personel>[] = useMemo(() => [
    {
      key: "tc_kimlik_no",
      label: "T.C.",
      render: (row) => row.tc_kimlik_no ?? "-",
    },
    {
      key: "aktif",
      label: "Aktif",
      render: (row) => (
        <div
          className={`toggle toggle-sm ${row.aktif === 1 ? "on" : ""} mb-0`}
          onClick={() => handleToggleActive(row)}
          style={{ cursor: "pointer" }}
        >
          <span />
        </div>
      ),
    },
    {
      key: "ad_soyad",
      label: "Ad Soyad",
      render: (row) => `${row.ad} ${row.soyad}`,
    },
    {
      key: "telefon",
      label: "Telefon",
      render: (row) => row.telefon ?? "-",
    },
    {
      key: "email",
      label: "E-Posta",
      render: (row) => row.email ?? "-",
    },
    {
      key: "adres",
      label: "Adres",
      render: (row) => row.adres ?? "-",
    },
    {
      key: "dogum_tarihi",
      label: "Doğum Tarihi",
      render: (row) =>
        row.dogum_tarihi ? row.dogum_tarihi.split("T")[0] : "-",
    },
    {
      key: "actions",
      label: "İşlemler",
      render: (row, openDeleteModal) => (
        <div className="d-flex justify-content-end gap-2">
          <button
            onClick={() => navigate(`/personeldetail/${row.id}`)}
            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
          >
            <i className="ti ti-eye" />
          </button>
          <button
            onClick={() => navigate(`/personelcrud/${row.id}`)}
            className="btn btn-icon btn-sm btn-info-light rounded-pill"
          >
            <i className="ti ti-pencil" />
          </button>
          <button
            onClick={() => openDeleteModal && openDeleteModal(row)}
            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
          >
            <i className="ti ti-trash" />
          </button>
        </div>
      ),
    },
  ], [navigate, handleToggleActive]);


  const handleDeleteRow = (row: Personel) => {
    if (row.id) deleteExistingPersonel(row.id);
  };

  return (
    <div className="container-fluid mt-3">

      {deleteError && <div className="alert alert-danger">{deleteError}</div>}
      {updateError && <div className="alert alert-danger">{updateError}</div>}

      <ReusableTable<Personel>
        pageTitle="Personel Listesi"
        onAdd={() => navigate("/personelcrud")}
        filters={filters}
        columns={columns}
        data={personnelData ?? []}
        loading={loading || updateStatus === "LOADING"}
        error={error}
        tableMode="single"
        exportFileName="personeller"
        showModal={false}
        currentPage={page}
        totalPages={1}
        totalItems={personnelData?.length ?? 0}
        pageSize={paginate}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(size) => {
          setPaginate(size);
          setPage(1);
        }}
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../ReusableTable";
import { useCategoriesList } from "../../../hooks/expences/expenseCategories/useCategoriesList";
import { IExpenseCategories } from "../../../../types/expences/expenseCategories/list";
import { Button } from "react-bootstrap";
import ReusableModalForm, {
  FieldDefinition,
} from "../../ReusableModalForm";
import { FormikHelpers } from "formik";
import { useExpenseCategoryAdd } from "../../../hooks/expences/expenseCategories/useCategoriesAdd";
import { useExpenseCategoryDelete } from "../../../hooks/expences/expenseCategories/useCategoriesDelete";

export default function ExpencesCategories() {
  const navigate = useNavigate();
  const { deleteExpenseCategory } = useExpenseCategoryDelete();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  // State for the add modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const filters = useMemo(() => {
    const basicFilters: FilterDefinition[] = [
      {
        key: "search",
        label: "Arama",
        value: searchTerm,
        onChange: setSearchTerm,
      },
    ];
    return basicFilters;
  }, [searchTerm]);

  const expenseCategoriesParams = useMemo(() => {
    return {
      enabled: true,
      page,
      pageSize,
      searchTerm,
    };
  }, [pageSize, page, searchTerm]);

  const {
    categoriesData,
    loading,
    error,
    totalPages,
    totalItems,

    setPage: updatePage,
    setPageSize: updatePageSize,
  } = useCategoriesList(expenseCategoriesParams);

  // Add functionality
  const {
    addNewExpenseCategory,
    status: addStatus,
    error: addError,
  } = useExpenseCategoryAdd();

  const columns: ColumnDefinition<IExpenseCategories>[] = useMemo(
    () => [
      {
        key: "name",
        label: "Gider Kalemi Adı",
      },
      {
        key: "description",
        label: "Açıklama",
        render: (row) => row.description || "-",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <Button
              variant="primary"
              size="sm"
              className="me-1"
              onClick={() => navigate(`/expensecrud/categories/${row.id}`)}
            >
              Düzenle
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                openDeleteModal && openDeleteModal(row);
              }}
            >
              Sil
            </Button>
          </>
        ),
      },
    ],
    [navigate]
  );

  // Handle page change correctly by passing the new page number
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updatePage(newPage);
  };

  // Handle page size change correctly
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1); // Reset to first page when changing page size
    updatePageSize(newSize);
  };

  // Initial values for add form
  const initialAddValues = {
    name: "",
    description: "",
  };

  // Form fields for add modal
  const addFields: FieldDefinition[] = [
    {
      name: "name",
      label: "Gider Kalemi Adı",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Açıklama",
      type: "textarea",
    },
  ];

  // Handle add form submission
  const handleAddSubmit = async (
    values: { name: string; description: string },
    helpers: FormikHelpers<{ name: string; description: string }>
  ) => {
    try {
      await addNewExpenseCategory(values);
      setShowAddModal(false);
      // Refresh the data by refetching the current page
      updatePage(page);
    } catch (error) {
      console.error("Error adding expense category:", error);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Gider Kalemleri Listesi</h4>
        <div>
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            Gider Kalemi Ekle
          </Button>
        </div>
      </div>

      <ReusableTable<IExpenseCategories>
        columns={columns}
        data={categoriesData}
        showModal={true}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        exportFileName="gider_kalemleri"
        tableMode="single"
        filters={filters}
        onAdd={() => setShowAddModal(true)}
        onCloseModal={() => navigate(-1)}
        showExportButtons={true}
        onDeleteRow={(row) => {
          deleteExpenseCategory(Number(row.id));
        }}
      />

      {/* Add Modal */}
      <ReusableModalForm
        show={showAddModal}
        title="Gider Kalemi Ekle"
        fields={addFields}
        initialValues={initialAddValues}
        onSubmit={handleAddSubmit}
        onClose={() => setShowAddModal(false)}
        isLoading={addStatus === "LOADING"}
        error={addError}
        confirmButtonLabel="Kaydet"
      />
    </div>
  );
}

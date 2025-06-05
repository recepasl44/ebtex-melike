import { useNavigate, useLocation } from "react-router-dom";
import { useScheduledAssignmentsTable } from "../../../../../hooks/scheduledAssignments/useList";
import ReusableTable from "../../../../ReusableTable";
import statusNumbersTable from "./detail_table";

const StatusNumbersIndex = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const student_id = params.get("student_id") || ""; // URL'den student_id'yi al

  const {
    scheduledAssignmentsData,
    paginate,
    page,
    setPage,
    totalPages,
    totalItems,
    loading,
  } = useScheduledAssignmentsTable({
    enabled: true,
    student_id,
  });

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <ReusableTable
      modalTitle="Durum Sayıları Detay"
      showModal={true}
      columns={statusNumbersTable()}
      data={scheduledAssignmentsData}
      loading={loading}
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={paginate}
      tableMode="single"
      onCloseModal={() => {
        navigate(-1);
      }}
      error={null}
      onPageChange={onPageChange}
    />
  );
};

export default StatusNumbersIndex;

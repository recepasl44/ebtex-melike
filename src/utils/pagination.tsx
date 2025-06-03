
import { Pagination } from 'react-bootstrap';

interface IMeta {
  current_page: number;
  last_page: number;
  total: number;
}

interface PaginationProps {
  meta: IMeta | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (sz: number) => void;
}

export function CustomPagination({
  meta,
 
  onPageChange,
  pageSize,
  onPageSizeChange,
}: PaginationProps) {
  if (!meta) return null;

  const { current_page, last_page, total } = meta;

  const handlePageClick = (newPage: number) => {
    if (newPage < 1 || newPage > last_page) return;
    onPageChange(newPage);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div>Kayıt Sayısı: {total}</div>
      <div className="d-flex align-items-center gap-3">
        <span>Sayfa Boyutu: </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{ width: 70 }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <Pagination className="mb-0 ms-auto">
          <Pagination.Prev
            disabled={current_page <= 1}
            onClick={() => handlePageClick(current_page - 1)}
          />
          <Pagination.Item active>{current_page}</Pagination.Item>
          <Pagination.Next
            disabled={current_page >= last_page}
            onClick={() => handlePageClick(current_page + 1)}
          />
        </Pagination>
      </div>
    </div>
  );
}

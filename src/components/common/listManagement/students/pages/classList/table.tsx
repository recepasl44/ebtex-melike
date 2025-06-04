/* ------------------------------------------------------------------
 *  Sınıf Listeleri – ClassListTable
 *  route : /listManagement/students/classList
 * -----------------------------------------------------------------*/
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';

/* ───────── Row tipi ───────── */
interface Row {
  id: number;
  program_id: number;
  level_id: number;
  program_name: string;
  level_name: string;
  classroom_name: string;
}

const ROOT = `${import.meta.env.BASE_URL}listManagement/students/classList`;

export default function ClassListTable() {
  const navigate = useNavigate();

  /* —— sayfalama —— */
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState(10);

  /* —— ana liste —— */
  const {
    classroomData = [],
    loading,
    error,
    totalPages,
    totalItems,
  } = useClassroomList({
    enabled: true,
    page,
    pageSize: paginate,
  });

  /* —— rows —— */
  const rows: Row[] = useMemo(
    () =>
      classroomData.map((c: any) => ({
        id: c.id,
        program_id: c.level?.program?.id ?? 0,
        level_id: c.level?.id ?? 0,
        program_name: c.level?.program?.name ?? '-',
        level_name: c.level?.name ?? '-',
        classroom_name: c.name ?? '-',
      })),
    [classroomData],
  );

  /* —— kolonlar —— */
  const columns: ColumnDefinition<Row>[] = useMemo(
    () => [
      { key: 'program_name', label: 'Okul Seviyesi', render: r => r.program_name },
      { key: 'level_name', label: 'Sınıf Seviyesi', render: r => r.level_name },
      { key: 'classroom_name', label: 'Sınıf / Şube', render: r => r.classroom_name },
      {
        key: 'actions',
        label: 'İşlemler',
        style: { width: 90, textAlign: 'center' },
        render: row => (
          <Button
            variant=""
            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
            /* Program & seviye bilgilerini query string’le aktarıyoruz */
            onClick={() =>
              navigate(
                `${ROOT}/crud/${row.id}?program=${row.program_id}&level=${row.level_id}` +
                `&programName=${encodeURIComponent(row.program_name)}` +
                `&levelName=${encodeURIComponent(row.level_name)}` +
                `&className=${encodeURIComponent(row.classroom_name)}`
              )
            }
          >
            <i className="ti ti-eye" />
          </Button>
        ),
      },
    ],
    [navigate],
  );

  /* —— render —— */
  return (
    <ReusableTable<Row>
      tableMode="single"
      columns={columns}
      data={rows}
      loading={loading}
      error={error}
      showExportButtons
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={paginate}
      onPageChange={setPage}
      onPageSizeChange={s => {
        setPaginate(s);
        setPage(1);
      }}
      exportFileName="class_list"
    />
  );
}

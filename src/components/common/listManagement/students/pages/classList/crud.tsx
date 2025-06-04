/* ------------------------------------------------------------------
 *  Sınıf Listesi – CRUD (görüntüleme / dışa aktarım)
 *  route : /listManagement/students/classList/crud/:id
 * -----------------------------------------------------------------*/
import { useMemo, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import { useListStudents } from '../../../../../hooks/student/useList';

interface Row {
  id: number;
  student_no: string;
  gender: string;
  full_name: string;
}

export default function StudentListCrud() {
  /* —— URL param / query’leri —— */
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { search } = useLocation();
  const qs = new URLSearchParams(search);

  const classroomId = Number(id);
  const programId = Number(qs.get('program'));
  const levelId = Number(qs.get('level'));

  const headerTitle = 'Sınıf Listesi';

  /* —— resimli liste anahtarı —— */
  const [withImages, setWithImages] = useState(false);

  /* —— sayfalama —— */
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState(50);

  /* —— öğrenci listesi —— */
  const {
    data = [],
    loading,
    error,
    totalPages,
    totalItems,
  } = useListStudents({
    enabled: true,
    program_id: programId || undefined,
    level_id: levelId || undefined,
    classroom_id: classroomId,
    page,
    paginate,
  });

  /* —— rows —— */
  const rows: Row[] = useMemo(
    () =>
      data.map((s: any) => ({
        id: s.id,
        student_no: s.student_no ?? '-',
        gender: s.gender_id === 1 ? 'Kadın' : 'Erkek',
        full_name: `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim(),
      })),
    [data],
  );

  /* —— kolonlar —— */
  const columns: ColumnDefinition<Row>[] = [
    { key: 'index', label: 'Sıra No', render: (_r, _o, idx) => idx! + 1 },
    { key: 'student_no', label: 'Okul No', render: r => r.student_no },
    { key: 'gender', label: 'Cinsiyet', render: r => r.gender },
    { key: 'full_name', label: 'Adı Soyadı', render: r => r.full_name },
  ];

  /* —— Excel dışa aktarımı —— */
  const handleExportExcel = () => {
    const header = [
      ['T.C'],
      [headerTitle],
      [],
      ['Sıra No', 'Okul No', 'Cinsiyet', 'Adı Soyadı'],
    ];
    const body = rows.map((r, idx) => [
      String(idx + 1),
      r.student_no,
      r.gender,
      r.full_name,
    ]);
    const csv = [...header, ...body].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'class_list.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  /* —— özel header node —— */
  const headerNode = (
    <div className="d-flex align-items-center gap-3 mb-2">
      <Form.Check
        type="switch"
        id="with-images"
        label="Resimli Liste"
        checked={withImages}
        onChange={e => setWithImages(e.currentTarget.checked)}
      />
      {withImages && <Form.Control type="file" multiple size="sm" />}
      <Button variant="outline-secondary" size="sm" onClick={handleExportExcel}>
        Excel
      </Button>
    </div>
  );

  /* —— render —— */
  return (
    <ReusableTable<Row>
      tableMode="single"
      modalTitle="sınıf listesi düzenle"
      pageTitle={headerTitle}
      columns={columns}
      data={rows}
      loading={loading}
      error={error}
      showExportButtons={false}
      customHeader={headerNode}
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={paginate}
      onPageChange={setPage}
      onPageSizeChange={s => {
        setPaginate(s);
        setPage(1);
      }}
      showModal={true}
      onCloseModal={() => navigate(-1)}
    />
  );
}

/* ------------------------------------------------------------------
 *  Sınıf Listesi – CRUD (görüntüleme / dışa aktarım)
 *  route : /listManagement/students/classList/crud/:id
 * -----------------------------------------------------------------*/
import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import ReusableTable, {
  ColumnDefinition,
  useDebounce,
} from '../../../../ReusableTable';

import { useListStudents } from '../../../../../hooks/student/useList';
import { useUpdateQueryParamsFromFilters } from '../../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters';

/* ---------- Veri tipleri ---------- */
interface Row {
  id: number;
  student_no: string;
  gender: string;
  full_name: string;
  image_url?: string | null;
}

type QueryParams = {
  program_id?: string;
  level_id?: string;
  student_id?: string;
};

/* ---------- Bileşen ---------- */
export default function StudentListCrud() {
  const { id: classroomId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  /* --- filtre state’leri --- */
  const [programId, setProgramId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [studentId, setStudentId] = useState('');

  /* --- sayfalama --- */
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState(50);

  /* --- resimli liste anahtarı --- */
  const [withImages, setWithImages] = useState(false);

  /* --- debounce --- */
  const debouncedStudent = useDebounce<string>(studentId, 400);

  /* --- URL paramlarını oku --- */
  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    if (qs.get('program_id')) setProgramId(qs.get('program_id')!);
    if (qs.get('level_id')) setLevelId(qs.get('level_id')!);
    if (qs.get('student_id')) setStudentId(qs.get('student_id')!);
  }, [location.search]);

  /* --- API çağrısı --- */
  const {
    data = [],
    loading,
    error,
    totalPages = 1,
    totalItems = 0,
  } = useListStudents({
    enabled: !!classroomId,
    classroom_id: classroomId,
    program_id: programId || undefined,
    level_id: levelId || undefined,
    student_id: debouncedStudent || undefined,
    page,
    paginate,
  });

  /* --- rows --- */
  const rows: Row[] = useMemo(
    () =>
      data.map((s: any) => ({
        id: s.id,
        student_no: s.student_no ?? '-',
        gender: s.gender_id === 1 ? 'Kadın' : 'Erkek',
        full_name: `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim(),
        image_url: s.image_url ?? null,            // API’de varsa
      })),
    [data],
  );

  /* --- dinamik kolonlar --- */
  const baseColumns: ColumnDefinition<Row>[] = [
    { key: 'index', label: 'Sıra No', render: (_r, _o, idx) => idx! + 1 },
    { key: 'student_no', label: 'Okul No', render: r => r.student_no },
    { key: 'gender', label: 'Cinsiyet', render: r => r.gender },
  ];

  const imageColumn: ColumnDefinition<Row> = {
    key: 'image',
    label: 'Öğrencinin Resmi',
    render: r =>
      r.image_url ? (
        <img
          src={r.image_url}
          alt="Öğrenci"
          style={{ width: 42, height: 42, objectFit: 'cover', borderRadius: 4 }}
        />
      ) : (
        '—'
      ),
  };

  const tailColumn: ColumnDefinition<Row> = {
    key: 'full_name',
    label: 'Adı Soyadı',
    render: r => r.full_name,
  };

  const columns: ColumnDefinition<Row>[] = withImages
    ? [...baseColumns, imageColumn, tailColumn] // resim cinsiyetten sonra
    : [...baseColumns, tailColumn];

  /* --- URL param senkronu --- */
  const filterState = useMemo<QueryParams>(
    () => ({
      program_id: programId,
      level_id: levelId,
      student_id: debouncedStudent,
    }),
    [programId, levelId, debouncedStudent],
  );

  useUpdateQueryParamsFromFilters(filterState, params => {
    const q = new URLSearchParams();
    if (params.program_id) q.set('program_id', params.program_id);
    if (params.level_id) q.set('level_id', params.level_id);
    if (params.student_id) q.set('student_id', params.student_id);
    navigate(`?${q.toString()}`, { replace: true });
  });

  /* --- header --- */
  const headerNode = (
    <div className="d-flex align-items-center gap-3 mb-2">
      <Form.Check
        type="switch"
        id="with-images"
        label="Resimli Liste"
        checked={withImages}
        onChange={e => setWithImages(e.currentTarget.checked)}
      />
    </div>
  );

  /* --- render --- */
  return (
    <ReusableTable<Row>
      tableMode="single"
      modalTitle="Sınıf Listesi"
      pageTitle="Sınıf Listesi"
      columns={columns}
      data={rows}
      loading={loading}
      error={error}
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={paginate}
      onPageChange={setPage}
      onPageSizeChange={size => {
        setPaginate(size);
        setPage(1);
      }}
      customHeader={headerNode}
      showExportButtons
      exportFileName="class_list"
      showModal
      onCloseModal={() => navigate(-1)}
    />
  );
}

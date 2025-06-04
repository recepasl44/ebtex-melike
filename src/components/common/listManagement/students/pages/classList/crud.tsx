
import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import ReusableTable, {
  ColumnDefinition,
  useDebounce,
} from '../../../../ReusableTable';

import { useListStudents } from '../../../../../hooks/student/useList';
import { useUpdateQueryParamsFromFilters } from '../../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters';


interface Row {
  id: number;
  student_no: string;
  gender: string;
  full_name: string;

  profile_picture?: string | null;
}

type QueryParams = {
  program_id?: string;
  level_id?: string;
  student_id?: string;
};


export default function StudentListCrud() {
  const { id: classroomId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();


  const [programId, setProgramId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [studentId, setStudentId] = useState('');


  const [paginate, setPaginate] = useState(10);
  const [page, setPage] = useState(1);


  const [withImages, setWithImages] = useState(false);


  const debouncedStudent = useDebounce<string>(studentId, 400);

  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    if (qs.get('program_id')) setProgramId(qs.get('program_id')!);
    if (qs.get('level_id')) setLevelId(qs.get('level_id')!);
    if (qs.get('student_id')) setStudentId(qs.get('student_id')!);
  }, [location.search]);


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


  const rows: Row[] = useMemo(
    () =>
      data.map((s: any) => ({
        id: s.id,
        student_no: s.student_no ?? '-',
        gender: s.gender_id === 1 ? 'Kadın' : 'Erkek',
        full_name: `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim(),
        profile_picture: s.profile_picture ?? null, // "Vesikalık" fotoğraf
      })),
    [data],
  );

  const baseColumns: ColumnDefinition<Row>[] = [
    { key: 'index', label: 'Sıra No', render: (_r, _o, idx) => idx! + 1 },
    { key: 'student_no', label: 'Okul No', render: r => r.student_no },
    { key: 'gender', label: 'Cinsiyet', render: r => r.gender },
  ];

  const imageColumn: ColumnDefinition<Row> = {
    key: 'image',
    label: 'Öğrencinin Resmi',
    render: r =>
      r.profile_picture ? (
        <img
          src={r.profile_picture}
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
    ? [...baseColumns, imageColumn, tailColumn]
    : [...baseColumns, tailColumn];


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

  const seasonName = useMemo(() => {
    try {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) return '';
      const userData = JSON.parse(userDataString);
      return userData.default_season?.name ?? '';
    } catch {
      return '';
    }
  }, []);

  const exportCsvData = useMemo(() => {
    const headerRows = [
      ['T.C'],
      [seasonName],
      ['Sınıf Listesi'],
      columns.map(c => c.label),
    ];
    const tableRows = rows.map(r =>
      columns.map(col => {
        if (col.key === 'image') return r.profile_picture ?? '';
        return (r as any)[col.key] ?? '';
      }),
    );
    return [...headerRows, ...tableRows];
  }, [seasonName, columns, rows]);


  return (
    <ReusableTable<Row>
      tableMode="single"
      modalTitle="Sınıf Listesi"

      columns={columns}
      data={rows}
      loading={loading}
      error={error}
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={paginate}
      onPageChange={setPage}
      onPageSizeChange={s => { setPaginate(s); setPage(1); }}
      customHeader={headerNode}
      showExportButtons
      exportFileName="class_list"
      customCsvData={exportCsvData}
      showModal
      onCloseModal={() => navigate(-1)}
    />
  );
}

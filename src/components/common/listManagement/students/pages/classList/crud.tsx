import { useMemo, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import { useListStudents } from '../../../../../hooks/student/useList';

interface Row {
  id: number;
  student_no: string;
  gender: string;
  full_name: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
  programId: number;
  levelId: number;
  classroomId: number;
  headerTitle: string;
}

export default function StudentListModal({
  show,
  onClose,
  programId,
  levelId,
  classroomId,
  headerTitle,
}: Props) {
  const [withImages, setWithImages] = useState(false);

  const { data = [], loading, error } = useListStudents({
    enabled: show,
    program_id: programId,
    level_id: levelId,
    classroom_id: classroomId,
    page: 1,
    paginate: 50,
  });

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

  const columns: ColumnDefinition<Row>[] = [
    { key: 'index', label: 'Sıra No', render: (_r, _o, idx) => idx! + 1 },
    { key: 'student_no', label: 'Okul No', render: r => r.student_no },
    { key: 'gender', label: 'Cinsiyet', render: r => r.gender },
    { key: 'full_name', label: 'Adı Soyadı', render: r => r.full_name },
  ];

  const handleExportExcel = () => {
    const header = [
      ['T.C'],
      [headerTitle],
      ['Sıra No', 'Okul No', 'Cinsiyet', 'Adı Soyadı'],
    ];
    const body = rows.map((r, idx) => [String(idx + 1), r.student_no, r.gender, r.full_name]);
    const csv = [...header, ...body].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'class_list.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

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

  return (
    <ReusableTable<Row>
      showModal={show}
      onCloseModal={onClose}
      tableMode="single"
      pageTitle={headerTitle}
      columns={columns}
      data={rows}
      loading={loading}
      error={error}
      showExportButtons={false}
      customHeader={headerNode}
    />
  );
}

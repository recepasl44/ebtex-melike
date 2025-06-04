import { useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import StudentListModal from './crud';

interface Row {
  id: number;
  program_id: number;
  level_id: number;
  program_name: string;
  level_name: string;
  classroom_name: string;
}

export default function ClassListTable() {
  const { classroomData = [], loading, error } = useClassroomList({
    enabled: true,
    branchId: 0,
  });

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

  const [selected, setSelected] = useState<Row | null>(null);

  const columns: ColumnDefinition<Row>[] = useMemo(
    () => [
      { key: 'program_name', label: 'Okul Seviyesi', render: r => r.program_name },
      { key: 'level_name', label: 'Sınıf Seviyesi', render: r => r.level_name },
      { key: 'classroom_name', label: 'Sınıf / Şube', render: r => r.classroom_name },
      {
        key: 'actions',
        label: 'İşlemler',
        render: r => (
          <Button variant="primary" size="sm" onClick={() => setSelected(r)}>
            <i className="ti ti-eye" />
          </Button>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <ReusableTable<Row>
        // pageTitle="Sınıf Listeleri"
        tableMode="single"
        columns={columns}
        data={rows}
        loading={loading}
        error={error}
        showExportButtons={false}
      />
      {selected && (
        <StudentListModal
          show
          onClose={() => setSelected(null)}
          programId={selected.program_id}
          levelId={selected.level_id}
          classroomId={selected.id}
          headerTitle={`${selected.program_name} ${selected.level_name} ${selected.classroom_name} SINIF LİSTESİ`}
        />
      )}
    </>
  );
}

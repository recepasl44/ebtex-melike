import { useMemo, useState, useEffect } from 'react';
import ReusableTable, { ColumnDefinition, FilterDefinition } from '../ReusableTable';
import { useFinanceNotes } from '../../hooks/financeNotes/useFinanceNotes';
import { FinanceNote } from '../../../types/financeNotes/list';
import { useSeasonsList } from '../../hooks/season/useSeasonsList';
import { useBranchTable } from '../../hooks/branch/useBranchList';
import { useProgramsTable } from '../../hooks/program/useList';
import { useLevelsTable } from '../../hooks/levels/useList';
import { useClassroomList } from '../../hooks/classrooms/useList';

export default function FinanceNotesTable() {
  const [season, setSeason] = useState('');
  const [branch, setBranch] = useState('');
  const [programId, setProgramId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [classId, setClassId] = useState('');
  const [student, setStudent] = useState('');

  const { seasonsData } = useSeasonsList({ enabled: true, page: 1, paginate: 100 });
  const { branchData } = useBranchTable({ enabled: true });
  const { programsData } = useProgramsTable({ enabled: !!branch, branch_id: branch ? Number(branch) : undefined });
  const { levelsData } = useLevelsTable({ enabled: !!programId, program_id: programId ? Number(programId) : undefined });
  const { classroomData } = useClassroomList({
    enabled: !!levelId,
    branchId: branch ? Number(branch) : undefined,
    program_id: programId ? Number(programId) : undefined,
    level_id: levelId ? Number(levelId) : undefined,
    page: 1,
    pageSize: 100,
  });

  const {
    data,
    error,
    current_page,
    total,
    per_page,
    setPage,
    setPaginate,
    setQuery,
  } = useFinanceNotes();

  useEffect(() => {
    setQuery({
      season_id: season,
      branch_id: branch,
      program_id: programId,
      level_id: levelId,
      classroom_id: classId,
      search: student,
    });
  }, [season, branch, programId, levelId, classId, student, setQuery]);

  const totalPages = Math.ceil(total / per_page);

  const columns: ColumnDefinition<FinanceNote>[] = useMemo(
    () => [
      { key: 'sube', label: 'Şube', render: (r) => r.sube },
      { key: 'okul_no', label: 'Okul No', render: (r) => r.okul_no || '-' },
      { key: 'tc_kimlik_no', label: 'T.C. Kimlik No', render: (r) => r.tc_kimlik_no || '-' },
      { key: 'adi_soyadi', label: 'Adı Soyadı', render: (r) => `${r.adi} ${r.soyadi}`.trim() },
      { key: 'sinif_seviyesi', label: 'Sınıf Seviyesi', render: (r) => r.sinif_seviyesi || '-' },
      { key: 'sinif_sube', label: 'Sınıf/Şube', render: (r) => r.sinif_sube || '-' },
      { key: 'tarih', label: 'Tarih', render: (r) => r.tarih },
      { key: 'note', label: 'Not', render: (r) => r.note },
      { key: 'soz_verme_tarihi', label: 'Söz Verme Tarihi', render: (r) => r.soz_verme_tarihi || '-' },
      { key: 'kullanici', label: 'Kullanıcı', render: (r) => r.kullanici },
    ],
    []
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: 'season',
        label: 'Sezon',
        type: 'select',
        value: season,
        options: (seasonsData || []).map((s: any) => ({ value: String(s.id), label: s.name })),
        onChange: (val: string) => {
          setSeason(val);
          setPage(1);
        },
      },
      {
        key: 'branch',
        label: 'Şube',
        type: 'select',
        value: branch,
        options: (branchData || []).map((b: any) => ({ value: String(b.id), label: b.name })),
        onChange: (val: string) => {
          setBranch(val);
          setPage(1);
        },
      },
      {
        key: 'program_id',
        label: 'Okul Seviyesi',
        type: 'select',
        value: programId,
        options: (programsData || []).map((p: any) => ({ value: String(p.id), label: p.name })),
        onChange: (val: string) => {
          setProgramId(val);
          setPage(1);
        },
      },
      {
        key: 'level_id',
        label: 'Sınıf Seviyesi',
        type: 'select',
        value: levelId,
        options: (levelsData || []).map((l: any) => ({ value: String(l.id), label: l.name })),
        onChange: (val: string) => {
          setLevelId(val);
          setPage(1);
        },
      },
      {
        key: 'classroom_id',
        label: 'Sınıf/Şube',
        type: 'select',
        value: classId,
        options: (classroomData || []).map((c: any) => ({ value: String(c.id), label: c.name })),
        onChange: (val: string) => {
          setClassId(val);
          setPage(1);
        },
      },
      {
        key: 'search',
        label: 'Öğrenci',
        type: 'text',
        value: student,
        onChange: (val: string) => {
          setStudent(val);
          setPage(1);
        },
      },
    ],
    [season, branch, programId, levelId, classId, student, seasonsData, branchData, programsData, levelsData, classroomData, setPage]
  );

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<FinanceNote>
        tableMode="single"
        showExportButtons={true}
        columns={columns}
        data={data}
        error={error}
        currentPage={current_page}
        totalPages={totalPages}
        totalItems={total}
        pageSize={per_page}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(size) => {
          setPaginate(size);
          setPage(1);
        }}
        filters={filters}
        exportFileName="finance_notes"
      />
    </div>
  );
}

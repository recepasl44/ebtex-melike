import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../ReusableTable';

import { useAssignmentStudentsList } from '../../../../hooks/assignmentStudents/useList';
import { useAssignmentStudentDelete } from '../../../../hooks/assignmentStudents/useDelete';
import { AssignmentStudentData as AssignmentRow } from '../../../../../types/assignmentStudents/list';

import { useLevelsTable } from '../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../hooks/lessons/useList';

export default function AssignmentsListTable() {
    const navigate = useNavigate();

    /* ------------------------ STATE / filtre değişkenleri ----------------------- */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [plannedStatus, setPlannedStatus] = useState(''); // planlanan / planlanmayan
    const [levelId, setLevelId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [lessonId, setLessonId] = useState('');
    const [assignStatus, setAssignStatus] = useState('');
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    const [enabled, setEnabled] = useState({
        level: false,
        branch: false,
        lesson: false,
    });

    /* ----------------------------- VERİ ÇEKME HOOK'LARI ----------------------------- */
    const { levelsData = [] } = useLevelsTable({
        enabled: enabled.level,
        page: 1,
        pageSize: 100,
    });

    const { classroomData: classroomList = [] } = useClassroomList({
        enabled: enabled.branch && !!levelId,
        level_id: Number(levelId) || undefined,
        page: 1,
        pageSize: 100,
        branchId: 0,
    });

    const { lessonsData = [] } = useLessonList({
        enabled: enabled.lesson && !!levelId,
        level_id: Number(levelId) || undefined,
        page: 1,
        pageSize: 100,
    });

    /* ------------------------------ SORGU PARAMETRELERİ ----------------------------- */
    const listParams = useMemo(
        () => ({
            enabled: true,
            page,
            pageSize,
            level_id: levelId ? Number(levelId) : undefined,
            classroom_id: branchId ? Number(branchId) : undefined,
            lesson_id: lessonId ? Number(lessonId) : undefined,
            status: assignStatus || undefined,
            planned_status: plannedStatus || undefined,
            start_date: dateRange.startDate || undefined,
            end_date: dateRange.endDate || undefined,
        }),
        [
            page,
            pageSize,
            levelId,
            branchId,
            lessonId,
            assignStatus,
            dateRange,
            plannedStatus,
        ],
    );

    const {
        assignmentStudentsData = [],
        loading,
        error,
        totalPages,
        totalItems,
    } = useAssignmentStudentsList(listParams);

    const { deleteExistingAssignmentStudent } = useAssignmentStudentDelete();

    /* -------------------------------- FİLTRE ALANLARI -------------------------------- */
    const filters: FilterDefinition[] = useMemo(
        () => [
            {
                key: 'dateRange',
                label: 'Tarih Aralığı',
                type: 'doubledate',
                value: dateRange,
                onClick: () => setEnabled((p) => ({ ...p, dateRange: true })),
                onChange: (val: any) => {
                    if (val && typeof val === 'object' && 'startDate' in val && 'endDate' in val) {
                        setDateRange(val);
                    } else {
                        setDateRange({ startDate: '', endDate: '' });
                    }
                },
                render: (v: any) =>
                    !v?.startDate || !v?.endDate ? '-' : `${v.startDate} - ${v.endDate}`,
            },
            {
                key: 'plannedStatus',
                label: 'Kategori',
                type: 'select',
                value: plannedStatus,
                onChange: setPlannedStatus,
                options: [
                    { label: 'Planlanan', value: '1' },
                    { label: 'Planlanmayan', value: '0' },
                ],
            },
            {
                key: 'level',
                label: 'Sınıf Seviyesi',
                type: 'select',
                value: levelId,
                onClick: () => setEnabled((p) => ({ ...p, level: true })),
                onChange: (val) => {
                    setLevelId(val);
                    setBranchId('');
                    setLessonId('');
                },
                options: levelsData.map((l) => ({ label: l.name, value: String(l.id) })),
            },
            {
                key: 'branch',
                label: 'Sınıf / Şube',
                type: 'select',
                value: branchId,
                onClick: () => setEnabled((p) => ({ ...p, branch: true })),
                onChange: setBranchId,
                options: classroomList.map((c) => ({
                    label: c.name,
                    value: String(c.id),
                })),
            },
            {
                key: 'lesson',
                label: 'Dersler',
                type: 'select',
                value: lessonId,
                onClick: () => setEnabled((p) => ({ ...p, lesson: true })),
                onChange: setLessonId,
                options: lessonsData.map((l) => ({ label: l.name, value: String(l.id) })),
            },
            {
                key: 'assignStatus',
                label: 'Ödev Durumu',
                type: 'select',
                value: assignStatus,
                onChange: setAssignStatus,
                options: [
                    { label: 'Yapıldı', value: '0' },
                    { label: 'Yapılmadı', value: '1' },
                    { label: 'Eksik', value: '2' },
                    { label: 'Gelmedi', value: '3' },
                ],
            },
        ],
        [
            dateRange,
            plannedStatus,
            levelId,
            branchId,
            lessonId,
            assignStatus,
            levelsData,
            classroomList,
            lessonsData,
            enabled,
        ],
    );

    /* -------------------------------- TABLO KOLONLARI -------------------------------- */
    const columns: ColumnDefinition<AssignmentRow>[] = useMemo(
        () => [
            {
                key: 'planned_status',
                label: 'Kategori',
                render: (row) => (row.planned_status === 1 ? 'Planlanan' : 'Planlanmayan'),
            },
            {
                key: 'class_section',
                label: 'Sınıf / Şube',
                render: (r) => r.assignment?.class_section ?? '-',
            },
            {
                key: 'lessons',
                label: 'Dersler',
                render: (r) => r.assignment.lessons,
            },
            {
                key: 'homework_title',
                label: 'Ödev Başlığı',
                render: (r) => r.assignment.title ?? '',
            },
            {
                key: 'start_date',
                label: 'Başlangıç Tarihi',
                render: (r) => new Date(r.assignment.start_date).toLocaleDateString('tr'),
            },
            {
                key: 'end_date',
                label: 'Bitiş Tarihi',
                render: (r) =>
                    r.assignment.end_date === '0000-00-00 00:00:00'
                        ? '-'
                        : new Date(r.assignment.end_date).toLocaleDateString('tr'),
            },
            {
                key: 'assignment_status',
                label: 'Durum',
                render: (row) => {
                    if (row.status === 0) return 'Eksik';
                    if (row.status === 1) return 'Aktif';
                    if (row.status === 2) return 'Verildi';
                    return '-';
                },
            },
            {
                key: 'actions',
                label: 'İşlemler',
                render: (row) => (
                    <>
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => navigate(`/assignmentsList/crud/${row.id}`)}
                        >
                            <i className="bi bi-pencil" />
                        </Button>{' '}
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => deleteExistingAssignmentStudent(row.id)}
                        >
                            <i className="bi bi-trash" />
                        </Button>
                    </>
                ),
            },
        ],
        [navigate],
    );

    /* ----------------------------------- UI ----------------------------------- */
    return (
        <ReusableTable<AssignmentRow>

            columns={columns}
            data={assignmentStudentsData}
            loading={loading}
            showModal={false}
            showExportButtons
            tableMode="single"
            error={error}
            filters={filters}
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
            }}
            exportFileName="student_assignment_list"
        />
    );
}

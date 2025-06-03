import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable, {
    ColumnDefinition,
} from '../../../ReusableTable';
import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

import { useAssignmentsList } from '../../../../hooks/assignments/useList';
import { useAssignmentDelete } from '../../../../hooks/assignments/useDelete';

import { useLevelsTable } from '../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../hooks/lessons/useList';
import { useUnitsTable } from '../../../../hooks/units/useList';

import { useUpdateQueryParamsFromFilters } from '../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters';
import { AssignmentData } from '../../../../../types/assignments/list';

type QueryParams = {
    class_level?: number;
    classroom_id?: number;
    lesson?: string;
    unit?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    page: number;
    pageSize: number;
};

export default function PlannedAssignmentsTable() {
    const navigate = useNavigate();
    const { deleteExistingAssignment } = useAssignmentDelete();

    /* ---------------- filters & pagination state ---------------- */
    const [class_level, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [lesson, setLesson] = useState('');
    const [unit, setUnit] = useState('');
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [assignStatus, setAssignStatus] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const [filtersEnabled, setFiltersEnabled] = useState({
        class_level: false,
        classroom: false,
        lesson: true,
        unit: false,
    });

    /* ---------------- helper lists ---------------- */
    const { levelsData } = useLevelsTable({ enabled: filtersEnabled.class_level });
    const { classroomData } = useClassroomList({
        enabled: filtersEnabled.classroom && !!class_level,
        class_level: Number(class_level) || undefined,
        branchId: 0,
    });
    const { lessonsData } = useLessonList({
        enabled: filtersEnabled.lesson && !!class_level,
        class_level: Number(class_level) || undefined,
    });
    const { unitsData } = useUnitsTable({
        enabled: filtersEnabled.unit && !!lesson,
        lesson: Number(lesson),
    });

    /* ---------------- query params ---------------- */
    const filtersState = useMemo(
        () => ({
            class_level: Number(class_level) || undefined,
            classroom_id: Number(classroom) || undefined,
            status: assignStatus || undefined,
            start_date: dateRange.startDate || undefined,
            end_date: dateRange.endDate || undefined,
            page,
            pageSize,
            enabled: true,
        }),
        [
            class_level,
            classroom,
            lesson,
            unit,
            assignStatus,
            dateRange,
            page,
            pageSize,
        ]
    );

    /* ---------------- data ---------------- */
    const {
        assignmentsData,
        loading,
        error,
        totalPages,
        totalItems,
    } = useAssignmentsList(filtersState);

    /* ---------------- filter components ---------------- */
    const filters: FilterDefinition[] = useMemo(
        () => [
            {
                key: 'class_level',
                label: 'Sınıf Seviyesi',
                value: class_level,
                onClick: () => setFiltersEnabled((p) => ({ ...p, class_level: true })),
                onChange: (v: string) => {
                    setClassLevel(v);
                    setClassroom('');
                    setLesson('');
                    setUnit('');
                },
                options: (levelsData || []).map((l: any) => ({
                    value: String(l.id),
                    label: l.name,
                })),
            },
            {
                key: 'classroom',
                label: 'Sınıf / Şube',
                value: classroom,
                onClick: () => setFiltersEnabled((p) => ({ ...p, classroom: true })),
                onChange: setClassroom,
                options: (classroomData || []).map((c: any) => ({
                    value: String(c.id),
                    label: c.name,
                })),
            },
            {
                key: 'lesson',
                label: 'Ders',
                value: lesson,
                onChange: (v: string) => {
                    setLesson(v);
                    setUnit('');
                },
                options: (lessonsData || []).map((d: any) => ({
                    value: String(d.id),
                    label: d.name,
                })),
            },
            {
                key: 'unit',
                label: 'Ünite / Konu',
                value: unit,
                onClick: () => setFiltersEnabled((p) => ({ ...p, unit: true })),
                onChange: setUnit,
                options: (unitsData || []).map((u: any) => ({
                    value: String(u.id),
                    label: u.name,
                })),
            },
            {
                key: 'dateRange',
                label: 'Tarih Aralığı',
                type: 'doubledate' as const,
                value: dateRange,
                onChange: (val: any) => {
                    if (val?.startDate && val?.endDate) {
                        setDateRange(val);
                    } else {
                        setDateRange({ startDate: '', endDate: '' });
                    }
                },
            },
            {
                key: 'status',
                label: 'Durum',
                value: assignStatus,
                onChange: setAssignStatus,
                options: [
                    { value: '0', label: 'Yapıldı' },
                    { value: '1', label: 'Yapılmadı' },
                    { value: '2', label: 'Eksik' },
                    { value: '3', label: 'Gelmedi' },
                ],
            },
        ],
        [
            class_level,
            classroom,
            lesson,
            unit,
            dateRange,
            assignStatus,
            levelsData,
            classroomData,
            lessonsData,
            unitsData,
        ]
    );

    /* ---------------- sync filters to URL ---------------- */
    useUpdateQueryParamsFromFilters<QueryParams>(filtersState, (p) => {
        const q = new URLSearchParams();
        q.set('page', String(p.page));
        q.set('class_level', String(p.class_level || ''));
        q.set('classroom_id', String(p.classroom_id || ''));
        q.set('lesson', p.lesson || '');
        q.set('unit', p.unit || '');
        q.set('status', p.status || '');
        q.set('start_date', p.start_date || '');
        q.set('end_date', p.end_date || '');
        navigate(`?${q.toString()}`);
    });

    /* ---------------- table columns ---------------- */
    const columns: ColumnDefinition<AssignmentData>[] = useMemo(
        () => [
            {
                key: 'start_date',
                label: 'Başlangıç',
                render: (r) => r.assignment?.start_date ?? r.start_date ?? '-',
            },
            {
                key: 'end_date',
                label: 'Bitiş',
                render: (r) => r.assignment?.end_date ?? r.end_date ?? '-',
            },
            {
                key: 'unit',
                label: 'Ünite / Konu',
                render: (r) => r.assignment?.unit_topic ?? r.unit_topic ?? '-',
            },
            {
                key: 'homework_title',
                label: 'Ödev Başlığı',
                render: (r) => r.assignment?.title ?? r.title ?? '-',
            },
            {
                key: 'sources',
                label: 'Kaynaklar',
                render: (r) =>
                    r.assignment?.source_id?.toString() ??
                    r.source_id?.toString() ??
                    '-',
            },
            {
                key: 'status',
                label: 'Durum',
                render: (r) => {
                    if (r.status === 0) return 'Yapıldı';
                    if (r.status === 1) return 'Yapılmadı';
                    if (r.status === 2) return 'Eksik';
                    if (r.status === 3) return 'Gelmedi';
                    return '-';
                },
            },
            {
                key: 'actions',
                label: 'İşlemler',
                render: (row) => (
                    <div className="d-flex justify-content-end gap-2">
                        {/* PLANLANAN ÖDEVİ ÖDEV TANIMLAMA FORMUNA AKTAR */}
                        <button
                            onClick={() =>
                                navigate('/assignmentdefinition/crud', {
                                    state: { assignment_id: row.id }, // 🡒 formu dolduracak ID
                                })
                            }
                            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                            title="Tanımla"
                        >
                            <i className="ti ti-plus" />
                        </button>

                        {/* Düzenle */}
                        <button
                            onClick={() =>
                                navigate(
                                    `${import.meta.env.BASE_URL}plannedhomework/crud/${row.id}`
                                )
                            }
                            className="btn btn-icon btn-sm btn-info-light rounded-pill"
                            title="Düzenle"
                        >
                            <i className="ti ti-pencil" />
                        </button>

                        {/* Sil */}
                        <button
                            onClick={() => deleteExistingAssignment(row.id)}
                            className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                            title="Sil"
                        >
                            <i className="ti ti-trash" />
                        </button>
                    </div>
                ),
            },
        ],
        [navigate, deleteExistingAssignment]
    );

    /* ---------------- render ---------------- */
    return (
        <>
            <FilterGroup
                filters={filters}
                navigate={navigate}
                columnsPerRow={4}
            />
            <ReusableTable<AssignmentData>
                onAdd={() => navigate('/plannedhomework/crud')}
                tableMode="single"
                columns={columns}
                data={assignmentsData}
                loading={loading}
                error={error}
                showModal={false}
                showExportButtons
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(s) => {
                    setPageSize(s);
                    setPage(1);
                }}
                exportFileName="student_assignment_list"
            />
        </>
    );
}

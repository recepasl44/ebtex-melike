import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable';
import FilterGroup, { FilterDefinition } from '../../../components/organisms/SearchFilters';
import { useAssignmentStudentsList } from '../../../../../hooks/assignmentStudents/useList';
import { AssignmentStudentData as AssignmentRow } from '../../../../../../types/assignmentStudents/list';

import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../../hooks/lessons/useList';
import { useUnitsTable } from '../../../../../hooks/units/useList';


export default function GivenHomeworkCount() {

    const navigate = useNavigate();

    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: "",
    });
    const [levelId, setLevelId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [lessonId, setLessonId] = useState('');
    const [unitId, setUnitId] = useState("");
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    const [enabled, setEnabled] = useState({// sayfa ilk yüklendiğinde tüm filtreler pasf olcak.)
        level: false,
        branch: false,
        lesson: false,
        unit: false
    });


    // #region Kullanıcı seçim yaptığında Apiden veriler çekilip değişkenlere aktarılıyor.
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
        branchId: 0
    });

    const { lessonsData = [] } = useLessonList({
        enabled: enabled.lesson && !!levelId,
        level_id: Number(levelId) || undefined,
        page: 1,
        pageSize: 100,
    });
    const { unitsData } = useUnitsTable({
        enabled: enabled.unit && !!lessonId,
        lesson: Number(lessonId),
    });


    const listParams = useMemo(
        () => ({
            enabled: true,
            page,
            pageSize,
            level_id: levelId ? Number(levelId) : undefined,
            classroom_id: branchId ? Number(branchId) : undefined,
            lesson_id: lessonId ? Number(lessonId) : undefined,
            start_date: dateRange.startDate || undefined,
            end_date: dateRange.endDate || undefined,
        }), [page, pageSize, levelId, branchId, lessonId, dateRange],
    );
    //#endregion

    const {
        assignmentStudentsData = [],
        loading,
        error,
        totalPages,
        totalItems,
    } = useAssignmentStudentsList(listParams);


    const filters: FilterDefinition[] = useMemo(
        () => [
            {
                key: "dateRange",
                label: "Tarih Aralığı",
                value: dateRange,
                onClick: () => setEnabled((prev) => ({ ...prev, dateRange: true })),
                onChange: (val: any) => {
                    if (val && typeof val === 'object' && 'startDate' in val && 'endDate' in val) {
                        setDateRange(val);
                    } else {
                        setDateRange({ startDate: "", endDate: "" });
                    }
                },
                render: (value: any) => {
                    if (!value || !value.startDate || !value.endDate) return '-';
                    return `${value.startDate} - ${value.endDate}`;
                },
                type: "doubledate"
            },

            {
                key: 'level',
                label: 'Sınıf Seviyesi',
                type: 'select',
                value: levelId,
                onClick: () => setEnabled(prev => ({ ...prev, level: true })),
                onChange: val => {
                    setLevelId(val);
                    setBranchId(''); setLessonId('');
                },
                options: levelsData.map(l => ({ label: l.name, value: String(l.id) })),
            },
            {
                key: 'branch',
                label: 'Sınıf / Şube',
                type: 'select',
                value: branchId,
                onClick: () => setEnabled(prev => ({ ...prev, branch: true })),
                onChange: setBranchId,
                options: classroomList.map(c => ({ label: c.name, value: String(c.id) })),
            },
            {
                key: 'lesson',
                label: 'Ders',
                type: 'select',
                value: lessonId,
                onClick: () => setEnabled(prev => ({ ...prev, lesson: true })),
                onChange: val => { setLessonId(val); },
                options: lessonsData.map(l => ({ label: l.name, value: String(l.id) })),
            }, {
                key: "unit",
                label: "Ünite",
                type: "select",          // ← eklendi
                value: unitId,
                onClick: () => setEnabled(prev => ({ ...prev, unit: true })),
                onChange: setUnitId,
                options: unitsData.map(u => ({
                    value: String(u.id),
                    label: u.name,
                    key: u.id,
                })),
            },

        ], [levelId, branchId, lessonId, dateRange,
        levelsData, classroomList, lessonsData, enabled,
    ],
    );


    const columns: ColumnDefinition<AssignmentRow>[] = useMemo(() => [
        {
            key: 'assignment.class_section',
            label: 'Sınıf/Şube',
            render: r => r.assignment?.class_section ?? '-',
        },
        {
            key: 'lessons',
            label: 'Ders',
            render: (row) => row.assignment.lessons,

        },
        {
            key: 'unit',
            label: 'Ünite',
            render: (row) => row.assignment.unit_topic ?? '',
        },
        {
            key: 'assigned',
            label: 'Verilen',

        },
        {
            key: 'controlled',
            label: 'Kontrol Edilen',

        },
        {
            key: 'uncontrolled',
            label: 'Kontrol Edilmeyen',

        },
        {
            key: 'active',
            label: 'Aktif',

        },

    ], [navigate]);


    return (
        <div>
            <FilterGroup
                filters={filters}
                navigate={navigate}
                columnsPerRow={4}
            />
            <ReusableTable<AssignmentRow>
                columns={columns}
                data={assignmentStudentsData}
                loading={loading}
                showModal={false}
                showExportButtons={true}
                tableMode="single"
                error={error}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPage(1);
                }}
                exportFileName="student_assignment_list"
            />
        </div>

    )
}
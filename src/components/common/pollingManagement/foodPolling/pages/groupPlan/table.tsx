
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useAttendanceDelete } from '../../../../../hooks/attendance/useDelete';

/* ───────── Satır tipi ───────── */
interface Row {
    id: number;
    meal_name: string;
    area_name: string;
    class_name: string;
    student_name: string;
}

const MODAL_BASE = `${import.meta.env.BASE_URL}pollingManagement/FoodPlanModal`;

export default function FoodGroupPlanTable() {
    const navigate = useNavigate();
    const { deleteExistingAttendance, error: deleteError } = useAttendanceDelete();

    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [mealName, setMealName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [student, setStudent] = useState('');
    const [teacher, setTeacher] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        groups: false, areas: false, levels: false,
        classes: false, students: false, teachers: false,
    });

    /* —— look-ups —— */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!classLevel,
        class_level: +classLevel || undefined,
        branchId: 0,
    });
    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({ enabled: enabled.students });
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });

    /* —— ana sorgu —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        enabled: true,
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        name: mealName || undefined,
        group_id: +groupId || undefined,
        used_area_id: +areaId || undefined,
        class_level: +classLevel || undefined,
        classroom_id: +classroom || undefined,
        student_id: +student || undefined,
        teacher_id: +teacher || undefined,
    });

    /* —— satırlar —— */
    const rows: Row[] = useMemo(() => (
        attendancesData.flatMap((a: any) => {
            const cls = a.classroom?.name || a.level?.name || '-';
            const area = a.used_area?.name || '-';
            const meal = a.name || '-';

            if (!a.students?.length) {
                return [{
                    id: a.id, meal_name: meal, area_name: area,
                    class_name: cls, student_name: '-',
                }];
            }
            return a.students.map((s: any) => ({
                id: a.id,
                meal_name: meal,
                area_name: area,
                class_name: cls,
                student_name:
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() ||
                    s.name_surname || s.name || '-',
            }));
        })
    ), [attendancesData]);

    /* —— kolonlar —— */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra No',
            style: { width: 70, textAlign: 'center' },
            render: (_r, _o, idx) =>
                <div className="text-center">{idx !== undefined ? idx + 1 : ''}</div>,
        },
        { key: 'meal_name', label: 'Öğün / Grup', render: r => r.meal_name },
        { key: 'area_name', label: 'Yemek Alanı', render: r => r.area_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Adı Soyadı', render: r => r.student_name },
        {
            key: 'actions', label: 'İşlemler',
            style: { width: 110, textAlign: 'center' },
            render: (row, openDeleteModal) => (
                <div className="d-flex justify-content-center gap-2">
                    <button
                        type="button"
                        className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        onClick={() => navigate(`${MODAL_BASE}/${row.id}`)}
                    >
                        <i className="ti ti-pencil" />
                    </button>
                    <button
                        type="button"
                        className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => openDeleteModal && openDeleteModal(row)}
                    >
                        <i className="ti ti-trash" />
                    </button>
                </div>
            ),
        },
    ], [navigate]);

    /* —— sabit öğün seçenekleri —— */
    const mealOptions = [
        { value: 'kahvaltı', label: 'Kahvaltı' },
        { value: 'öğle yemeği', label: 'Öğle Yemeği' },
        { value: 'akşam yemeği', label: 'Akşam Yemeği' },
    ];

    /* —— filtreler (col:1) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'meal_name', label: 'Öğün', type: 'select', col: 1,
            value: mealName,
            onChange: setMealName,
            options: mealOptions,
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select', col: 1,
            value: groupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            onChange: setGroupId,
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'area_id', label: 'Yemek Alanı', type: 'select', col: 1,
            value: areaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            onChange: setAreaId,
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            key: 'class_level', label: 'Sınıf Seviyesi', type: 'select', col: 1,
            value: classLevel,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setClassLevel(v); setClassroom(''); },
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select', col: 1,
            value: classroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroom,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'student', label: 'Öğrenci', type: 'select', col: 1,
            value: student,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudent,
            options: studentsData.map(s => ({
                value: String(s.id),
                label: s.name_surname || s.name ||
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim(),
            })),
        },
        {
            key: 'teacher', label: 'Öğretmen / Personel', type: 'select', col: 1,
            value: teacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            onChange: setTeacher,
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
    ], [
        dateRange, mealName, groupId, areaId, classLevel, classroom, student, teacher,
        groupsData, usedAreasData, levelsData, classroomData, studentsData, teachersData,
    ]);

    const handleDeleteRow = (row: Row) =>
        row.id && deleteExistingAttendance(row.id);

    /* —— render —— */
    return (
        <>
            <FilterGroup
                filters={filters}
                columnsPerRow={4}
                navigate={navigate}
            />

            <ReusableTable<Row>
                tableMode="single"
                columns={columns}
                data={rows}
                loading={loading}
                error={error || deleteError}
                onDeleteRow={handleDeleteRow}
                showExportButtons
                onAdd={() => navigate(MODAL_BASE)}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={paginate}
                onPageChange={setPage}
                onPageSizeChange={s => { setPaginate(s); setPage(1); }}
                exportFileName="food_group_plan"
            />
        </>
    );
}

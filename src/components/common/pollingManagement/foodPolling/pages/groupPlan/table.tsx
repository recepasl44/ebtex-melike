

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';


import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';


interface Row {
    id: number;
    meal_name: string;    // Öğün / Grup
    area_name: string;    // Yemek Alanı
    class_name: string;   // Sınıf / Şube
    student_name: string; // Ad Soyad
}

const MODAL_BASE = `${import.meta.env.BASE_URL}pollingManagement/FoodPlanModal`;

export default function FoodGroupPlanTable() {
    const navigate = useNavigate();

    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [mealName, setMealName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [classroom, setClassroom] = useState('');
    const [student, setStudent] = useState('');
    const [teacher, setTeacher] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);


    const [enabled, setEnabled] = useState({
        groups: false, areas: false, levels: false,
        classes: false, students: false, teachers: false,
    });


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

    const {
        attendancesData, loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        enabled: true,
        page, pageSize,
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


    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).flatMap((a: any) => {
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


    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra No',
            style: { width: 70, textAlign: 'center' },
            render: (_r, _o, idx) => idx! + 1,
        },
        { key: 'meal_name', label: 'Öğün / Grup', render: r => r.meal_name },
        { key: 'area_name', label: 'Yemek Alanı', render: r => r.area_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Adı Soyadı', render: r => r.student_name },
        {
            key: 'actions', label: 'İşlemler',
            style: { width: 110, textAlign: 'center' },
            render: row => (
                <div className="d-flex justify-content-center gap-2">
                    {/* Düzenle */}
                    <button
                        type="button"
                        className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        onClick={() => navigate(`${MODAL_BASE}/${row.id}`)}
                    >
                        <i className="ti ti-pencil" />
                    </button>
                    {/* Sil */}
                    <button
                        type="button"
                        className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => { }}
                    >
                        <i className="ti ti-trash" />
                    </button>
                </div>
            ),
        },
    ], [navigate]);

    const mealOptions = [

        { value: 'kahvaltı', label: 'Kahvaltı' },
        { value: 'öğle yemeği', label: 'Öğle Yemeği' },
        { value: 'akşam yemeği', label: 'Akşam Yemeği' },
    ];


    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange, onChange: v => setDateRange(v ?? { startDate: '', endDate: '' })
        },

        {
            key: 'meal_name', label: 'Öğün', type: 'select',   // 🔸 text → select
            value: mealName, onChange: setMealName,
            options: mealOptions,
        },

        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: groupsData.map(g => ({ value: String(g.id), label: g.name }))
        },

        {
            key: 'area_id', label: 'Yemek Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name }))
        },

        {
            key: 'class_level', label: 'Sınıf Seviyesi', type: 'select',
            value: classLevel,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setClassLevel(v); setClassroom(''); },
            options: levelsData.map(l => ({ value: String(l.id), label: l.name }))
        },

        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select',
            value: classroom, onChange: setClassroom,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            options: classroomData.map(c => ({ value: String(c.id), label: c.name }))
        },

        {
            key: 'student', label: 'Öğrenciler', type: 'select',
            value: student, onChange: setStudent,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            options: studentsData.map(s => ({
                value: String(s.id),
                label: s.name_surname || s.name ||
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim(),
            }))
        },

        {
            key: 'teacher', label: 'Öğretmen / Personel', type: 'select',
            value: teacher, onChange: setTeacher,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            }))
        },
    ], [
        dateRange, mealName, groupId, areaId, classLevel, classroom, student, teacher,
        groupsData, usedAreasData, levelsData, classroomData, studentsData, teachersData,
    ]);

    return (
        <ReusableTable<Row>
            tableMode="single"
            columns={columns}
            data={rows}
            loading={loading}
            error={error}

            filters={filters}
            showExportButtons

            onAdd={() => navigate(MODAL_BASE)}

            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}

            exportFileName="food_group_plan"
        />
    );
}

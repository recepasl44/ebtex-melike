/* ------------------------------------------------------------------
 *  Etüt Yoklama › Etüt Planı – StudyPlanTable
 *  route : /pollingManagement/studyPlan
 * -----------------------------------------------------------------*/
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ReusableTable, {
    ColumnDefinition,
} from '../../../../ReusableTable';

import FilterGroup, {
    FilterDefinition,
} from '../../components/organisms/SearchFilters';

import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';
import { useAttendanceDelete } from '../../../../../hooks/attendance/useDelete';

/* ───────── Row tipi ───────── */
interface Row {
    id: number;
    group_name: string;
    area_name: string;
    class_name: string;
    student_name: string;
}

/* Modal kökü */
const ROOT = `${import.meta.env.BASE_URL}pollingManagement/studyPlan`;

export default function StudyPlanTable() {
    const navigate = useNavigate();
    const { deleteExistingAttendance, error: deleteError } = useAttendanceDelete();

    /* —— filtre state’leri —— */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [levelId, setLevelId] = useState('');
    const [classroomId, setClassroomId] = useState('');
    const [studentId, setStudentId] = useState('');

    /* —— sayfalama —— */
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);

    /* —— lazy flags —— */
    const [enabled, setEnabled] = useState({
        groups: false, areas: false, levels: false, classes: false, students: false,
    });

    /* —— yardımcı listeler —— */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        level_id: +levelId || undefined,
        branchId: 0,
    });
    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({ enabled: enabled.students });

    /* —— ana liste —— */
    const {
        attendancesData = [],
        loading, error, totalPages, totalItems,
    } = useAttendancesTable({
        page, paginate,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        used_area_id: +areaId || undefined,
        class_level: +levelId || undefined,
        classroom_id: +classroomId || undefined,
        student_id: +studentId || undefined,
        enabled: true,
    });

    /* —— attendances → rows —— */
    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).flatMap((a: any) => {
            const cls = a.classroom?.name || a.level?.name || '-';
            const area = a.used_area?.name || '-';
            const group = a.group?.name || '-';

            if (!a.students?.length) {
                return [{ id: a.id, group_name: group, area_name: area, class_name: cls, student_name: '-' }];
            }
            return a.students.map((s: any) => ({
                id: a.id,
                group_name: group,
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
            key: 'index', label: 'Sıra No', style: { width: 70, textAlign: 'center' },
            render: (_r, _o, idx) => <div className="text-center">{idx! + 1}</div>
        },
        { key: 'group_name', label: 'Grup Adı', render: r => r.group_name },
        { key: 'area_name', label: 'Etüt Alanı', render: r => r.area_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Öğrenciler', render: r => r.student_name },
        {
            key: 'actions', label: 'İşlemler', style: { width: 110, textAlign: 'center' },
            render: (row, openDeleteModal) => (
                <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        onClick={() => navigate(`${ROOT}/crud/${row.id}`)}>
                        <i className="ti ti-pencil" />
                    </button>
                    <button className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => openDeleteModal && openDeleteModal(row)}>
                        <i className="ti ti-trash" />
                    </button>
                </div>
            ),
        },
    ], [navigate]);

    /* —— filtreler (col:1) —— */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', col: 1,
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select', col: 1,
            value: groupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            onChange: setGroupId,
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'area_id', label: 'Etüt Alanı', type: 'select', col: 1,
            value: areaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            onChange: setAreaId,
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            key: 'level_id', label: 'Sınıf Seviyesi', type: 'select', col: 1,
            value: levelId,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: v => { setLevelId(v); setClassroomId(''); },
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select', col: 1,
            value: classroomId,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: setClassroomId,
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'student', label: 'Öğrenciler', type: 'select', col: 1,
            value: studentId,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            onChange: setStudentId,
            options: studentsData.map(s => ({
                value: String(s.id),
                label: s.name_surname || s.name ||
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim(),
            })),
        },
    ], [
        dateRange, groupId, areaId, levelId, classroomId, studentId,
        groupsData, usedAreasData, levelsData, classroomData, studentsData,
    ]);

    /* —— silme —— */
    const handleDeleteRow = (row: Row) => { if (row.id) deleteExistingAttendance(row.id); };

    /* —— render —— */
    return (
        <>
            {/* Filtreler – satır başına 4 */}
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
                showExportButtons
                onAdd={() => navigate(`${ROOT}/crud`)}
                onDeleteRow={handleDeleteRow}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={paginate}
                onPageChange={setPage}
                onPageSizeChange={s => { setPaginate(s); setPage(1); }}
                exportFileName="study_plan_list"
            />
        </>
    );
}

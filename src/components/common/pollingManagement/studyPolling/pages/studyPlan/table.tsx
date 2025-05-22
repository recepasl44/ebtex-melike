/* -------------------------------------------------------------------------- */
/* table.tsx – Etüt Yoklama › Etüt Planla (Liste)                             */
/* -------------------------------------------------------------------------- */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* ───────── API hook’ları ───────── */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

/* ───── satır tipi ───── */
interface Row {
    id: number;
    group_name: string;   // Grup Adı
    area_name: string;   // Etüt Alanı
    class_name: string;   // Sınıf / Şube
    student_name: string;   // Öğrenciler
}

/* Router’da tanımlı kök (liste ↔︎ modal) */
const ROOT = `${import.meta.env.BASE_URL}pollingManagement/studyPlan`;
//  Liste    :  …/studyPlan
//  Modal    :  …/studyPlan/crud/:id?

/* ======================================================================= */
export default function StudyPlanTable() {
    const navigate = useNavigate();

    /* ------------ filtre state’leri ------------ */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [groupId, setGroupId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [levelId, setLevelId] = useState('');
    const [classroomId, setClassroomId] = useState('');
    const [studentId, setStudentId] = useState('');

    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    /* ------------ lazy-load bayrakları ---------- */
    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        levels: false,
        classes: false,
        students: false,
    });

    /* ------------ yardımcı listeler ------------- */
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

    /* ------------ ana liste (Attendances) ------- */
    const {
        attendancesData,
        loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        group_id: +groupId || undefined,
        used_area_id: +areaId || undefined,
        class_level: +levelId || undefined,
        classroom_id: +classroomId || undefined,
        student_id: +studentId || undefined,
        enabled: true,
    });

    /* ------------ attendances → rows ------------ */
    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).flatMap((a: any) => {
            const cls = a.classroom?.name || a.level?.name || '-';
            const area = a.used_area?.name || '-';
            const group = a.group?.name || '-';

            if (!a.students?.length) {
                return [{
                    id: a.id, group_name: group, area_name: area,
                    class_name: cls, student_name: '-',
                }];
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

    /* ------------ kolon tanımları --------------- */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index', label: 'Sıra No',
            style: { width: 70, textAlign: 'center' },
            render: (_r, _od, idx) => idx! + 1,
        },
        { key: 'group_name', label: 'Grup Adı', render: r => r.group_name },
        { key: 'area_name', label: 'Etüt Alanı', render: r => r.area_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_name', label: 'Öğrenciler', render: r => r.student_name },
        {
            key: 'actions', label: 'İşlemler',
            style: { width: 110, textAlign: 'center' },
            render: row => (
                <div className="d-flex justify-content-center gap-2">
                    {/* Düzenle */}
                    <button
                        type="button"
                        className="btn btn-icon btn-sm btn-info-light rounded-pill"
                        onClick={() => navigate(`${ROOT}/crud/${row.id}`)}
                    >
                        <i className="ti ti-pencil" />
                    </button>
                    {/* Sil */}
                    <button
                        type="button"
                        className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                        onClick={() => {/* openDeleteModal(row) */ }}
                    >
                        <i className="ti ti-trash" />
                    </button>
                </div>
            ),
        },
    ], [navigate]);

    /* ------------ filtre tanımları -------------- */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'area_id', label: 'Etüt Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            key: 'level_id', label: 'Sınıf Seviyesi', type: 'select',
            value: levelId, onChange: v => { setLevelId(v); setClassroomId(''); },
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom', label: 'Sınıf / Şube', type: 'select',
            value: classroomId, onChange: setClassroomId,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'student', label: 'Öğrenciler', type: 'select',
            value: studentId, onChange: setStudentId,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
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

    /* ------------ render ------------------------ */
    return (
        <ReusableTable<Row>
            tableMode="single"
            columns={columns}
            data={rows}
            loading={loading}
            error={error}
            filters={filters}
            showExportButtons
            onAdd={() => navigate(`${ROOT}/crud`)}
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}
            exportFileName="study_plan_list"
        />
    );
}

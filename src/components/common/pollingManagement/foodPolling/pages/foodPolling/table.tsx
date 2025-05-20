/* eslint-disable @typescript-eslint/no-misused-promises */
/* table.tsx – Yemek Yoklama › Yemek Yoklama sekmesi */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import ReusableTable, {
    ColumnDefinition,
    FilterDefinition,
} from '../../../../ReusableTable';

/* ───────── API hook’ları ─────────── */
import { useAttendancesTable } from '../../../../../hooks/attendance/useList';
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

/* ───────── tablo satır tipi ───────── */
interface Row {
    id: number;
    meal_name: string;
    class_name: string;
    student_no: string;
    student_name: string;
    status: number;   // 0=Geldi • 1=Geç • 2=Gelmedi
}

/* router kökü (ekle/detay yok) */
const ROOT = '/pollingManagement/foodAttendance';

export default function FoodAttendanceTable() {
    const nav = useNavigate();

    /* ------------ filtre state’leri ------------- */
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [mealName, setMealName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [programId, setProgramId] = useState('');           // okul seviyesi
    const [levelId, setLevelId] = useState('');           // sınıf seviyesi
    const [classroomId, setClassroomId] = useState('');
    const [managerId, setManagerId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [areaId, setAreaId] = useState('');

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    /* lazy-load bayrakları */
    const [enabled, setEnabled] = useState({
        groups: false, areas: false, levels: false, classes: false,
        students: false, teachers: false, managers: false,
    });

    /* ------------ yardımcı listeler ------------- */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups, pageSize: 999 });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        class_level: +levelId || undefined,
        branchId: 0,
    });
    const { usersData: managersData = [] } = useUsersTable({
        enabled: enabled.managers,
        role_id: 2,               // şimdilik sadece role_id 2
        pageSize: 999,
    });
    const { attendanceTeachersData: teachersData = [] }
        = useAttendanceTeachersTable({ enabled: enabled.teachers });

    /* öğrenciler “tablo satırına” zaten API dönüyor; ayrıca çekmeye gerek yok */

    /* ---------------- ana sorgu ----------------- */
    const {
        attendancesData,
        loading, error,
        totalPages, totalItems,
    } = useAttendancesTable({
        page, pageSize,
        start_date: dateRange.startDate || undefined,
        end_date: dateRange.endDate || undefined,
        name: mealName || undefined,
        group_id: +groupId || undefined,
        program_id: +programId || undefined,
        class_level: +levelId || undefined,
        classroom_id: +classroomId || undefined,
        manager_id: +managerId || undefined,
        teacher_id: +teacherId || undefined,
        used_area_id: +areaId || undefined,
        enabled: true,
    });

    /* ------------- attendances → rows ----------- */
    const rows: Row[] = useMemo(() => (
        (attendancesData ?? []).flatMap((a: any) => {
            const meal = a.name || '-';
            const cls = a.classroom?.name || a.level?.name || '-';

            /* hiç öğrenci yoksa satır yine de gösterilsin */
            if (!a.students?.length) {
                return [{
                    id: a.id, meal_name: meal, class_name: cls,
                    student_no: '-', student_name: '-', status: a.status ?? 0,
                }];
            }
            return a.students.map((s: any) => ({
                id: a.id,
                meal_name: meal,
                class_name: cls,
                student_no: s.student_no ?? s.register_no ?? '-',
                student_name:
                    `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() ||
                    s.name_surname || '-',
                status: a.status ?? 0,
            }));
        })
    ), [attendancesData]);

    /* ---------------- kolonlar ----------------- */
    const columns: ColumnDefinition<Row>[] = useMemo(() => [
        {
            key: 'index',
            label: 'Sıra No',
            style: { width: 70, textAlign: 'center' },
            render: (_r, _o, idx) => idx! + 1,
        },
        { key: 'meal_name', label: 'Öğün / Grup', render: r => r.meal_name },
        { key: 'class_name', label: 'Sınıf / Şube', render: r => r.class_name },
        { key: 'student_no', label: 'Numarası', render: r => r.student_no },
        { key: 'student_name', label: 'Adı Soyadı', render: r => r.student_name },
        {
            key: 'status',
            label: 'Durum',
            render: ({ status }) =>
                status === 0 ? <span className="text-success">Geldi</span>
                    : status === 1 ? <span className="text-warning">Geç Geldi</span>
                        : <span className="text-danger">Gelmedi</span>,
        },
    ], []);

    /* ---------------- filtreler ---------------- */
    const filters: FilterDefinition[] = useMemo(() => [
        {
            key: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate',
            value: dateRange,
            onChange: v => setDateRange(v ?? { startDate: '', endDate: '' }),
        },
        {
            key: 'meal_name', label: 'Öğün Adı', type: 'text',
            value: mealName, onChange: setMealName,
        },
        {
            key: 'group_id', label: 'Grup Adı', type: 'select',
            value: groupId, onChange: setGroupId,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: groupsData.map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            key: 'program_id', label: 'Okul Seviyesi', type: 'select',
            value: programId, onChange: setProgramId,
            /* program listesi varsa ekleyin; şimdilik boş bırakıyoruz */
        },
        {
            key: 'level_id', label: 'Sınıf Seviyesi', type: 'select',
            value: levelId, onChange: setLevelId,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            options: levelsData.map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            key: 'classroom_id', label: 'Sınıf / Şube', type: 'select',
            value: classroomId, onChange: setClassroomId,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            options: classroomData.map(c => ({ value: String(c.id), label: c.name })),
        },
        {
            key: 'manager_id', label: 'Görevli Yöneticiler', type: 'select',
            value: managerId, onChange: setManagerId,
            onClick: () => setEnabled(e => ({ ...e, managers: true })),
            options: managersData.map(m => ({
                value: String(m.id),
                label: m.name_surname ?? m.username ?? '-',
            })),
        },
        {
            key: 'teacher_id', label: 'Görevli Öğretmenler', type: 'select',
            value: teacherId, onChange: setTeacherId,
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-',
            })),
        },
        {
            key: 'area_id', label: 'Yemek Alanı', type: 'select',
            value: areaId, onChange: setAreaId,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name })),
        },
    ], [
        dateRange, mealName, groupId, programId, levelId, classroomId,
        managerId, teacherId, areaId,
        groupsData, usedAreasData, levelsData, classroomData,
        teachersData, managersData,
    ]);

    /* ---------------- render ------------------- */
    return (
        <ReusableTable<Row>
            pageTitle="Yemek Yoklama"
            exportFileName="meal_attendance"
            tableMode="single"
            columns={columns}
            data={rows}
            loading={loading}
            error={error}
            filters={filters}
            showExportButtons
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={s => { setPageSize(s); setPage(1); }}
            /* bu sekmede “ekle”/“detay” yok; buton gerekmez                */
            onAdd={undefined}
            onDeleteRow={undefined}
        />
    );
}

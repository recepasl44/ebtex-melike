/* -------------------------------------------------------------------------- */
/* crud.tsx – Etüt Yoklama › Etüt Programı – Ekle / Güncelle (Tek Sayfa)      */
/* -------------------------------------------------------------------------- */

import { FormikHelpers, FormikValues } from 'formik';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ReusableModalForm, {
    FieldDefinition,
} from '../../../../ReusableModalForm';

/* ───────── API hook’ları ─────────────────────────────────────────────── */
import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';
import { useAttendanceUpdate } from '../../../../../hooks/attendance/useUpdate';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';

import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

/* ───────── Tipler ────────────────────────────────────────────────────── */
interface IForm extends FormikValues {
    /* tarih aralığı */
    date_range: { startDate: string; endDate: string };

    group_id: number;
    week_days: number[];
    time_range: string;
    used_area_id: number;

    manager_ids: number[]; // role 2
    teacher_ids: number[];

    level_id: number;
    classroom_id: number;
}

interface CrudProps {
    show?: boolean;          // route içinde hep true
}

/* ====================================================================== */
const StudyProgramCrud: React.FC<CrudProps> = () => {
    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';
    const nav = useNavigate();

    /* ───────── CRUD hook’ları ──────────────────────────────────────────── */
    const { addNewAttendance, status: addSt, error: addErr } = useAttendanceAdd();
    const { updateExistingAttendance, status: updSt, error: updErr } = useAttendanceUpdate();
    const { attendance: fetched, status: detSt, error: detErr,
        getAttendance } = useAttendanceDetail({ attendanceId: Number(id ?? 0), enabled: !!id });

    /* ───────── Lazy flags ──────────────────────────────────────────────── */
    const [levelId, setLevelId] = useState<number | null>(null);
    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        levels: false,
        classes: false,
        teachers: false,
        users: false,
    });

    /* ───────── Listeler ───────────────────────────────────────────────── */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups, pageSize: 999 });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        level_id: levelId ?? undefined,
        branchId: 0,
    });
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });
    const { usersData: managersData = [] } =
        useUsersTable({ enabled: enabled.users, role_id: 2, pageSize: 999 });

    /* ───────── Başlangıç değerleri ─────────────────────────────────────── */
    const [initial, setInitial] = useState<IForm>({
        date_range: { startDate: '', endDate: '' },
        group_id: 0,
        week_days: [],
        time_range: '',
        used_area_id: 0,
        manager_ids: [],
        teacher_ids: [],
        level_id: 0,
        classroom_id: 0,
    });

    /* ───────── Update modunda veriyi çek ───────────────────────────────── */
    useEffect(() => { if (mode === 'update' && id) getAttendance(+id); }, [mode, id]);

    useEffect(() => {
        if (mode === 'update' && fetched) {
            setInitial({
                date_range: {
                    startDate: fetched.start_date ?? '',
                    endDate: fetched.end_date ?? '',
                },
                group_id: fetched.group_id ?? 0,
                week_days: fetched.week_days?.length
                    ? fetched.week_days
                    : fetched.days?.map((d: any) => d.day_id) ?? [],
                time_range: fetched.time_range ?? '',
                used_area_id: fetched.used_area_id ?? 0,
                manager_ids: Array.isArray(fetched.manager_ids)
                    ? fetched.manager_ids as number[]
                    : [],
                teacher_ids: fetched.teachers?.map((t: any) => t.id) ?? [],
                level_id: fetched.level_id ?? 0,
                classroom_id: fetched.classroom_id ?? 0,
            });

            setEnabled({
                groups: true,
                areas: true,
                levels: true,
                classes: true,
                teachers: true,
                users: true,
            });
            setLevelId(fetched.level_id ?? null);
        }
    }, [mode, fetched]);

    /* ───────── Option helper’ları ──────────────────────────────────────── */
    const groupOpts = useMemo(() => groupsData.map(g => ({ value: g.id, label: g.name })), [groupsData]);
    const areaOpts = useMemo(() => usedAreasData.map(a => ({ value: a.id, label: a.name })), [usedAreasData]);
    const levelOpts = useMemo(() => levelsData.map(l => ({ value: l.id, label: l.name })), [levelsData]);
    const classOpts = useMemo(() => classroomData.map(c => ({ value: c.id, label: c.name })), [classroomData]);
    const teacherOpts = useMemo(() => teachersData.map(t => ({
        value: t.teacher_id, label: t.teacher?.name_surname || '-'
    })), [teachersData]);
    const managerOpts = useMemo(() => managersData.map(u => ({
        value: u.id, label: u.name_surname || u.name || '-'
    })), [managersData]);

    /* ───────── Dinamik alanlar ─────────────────────────────────────────── */
    const getFields = useCallback(
        (_v: IForm): FieldDefinition[] => [
            {
                name: 'date_range',
                label: 'Tarih Aralığı',
                type: 'doubledate',            // start & end aynı alanda
                required: true,
            },
            {
                name: 'group_id',
                label: 'Grup Adı',
                type: 'select',
                required: true,
                options: groupOpts,
                onClick: () => setEnabled(e => ({ ...e, groups: true })),
            },
            {
                name: 'week_days',
                label: 'Haftanın Günleri',
                type: 'multiselect',
                options: [
                    { value: 1, label: 'Pazartesi' }, { value: 2, label: 'Salı' },
                    { value: 3, label: 'Çarşamba' }, { value: 4, label: 'Perşembe' },
                    { value: 5, label: 'Cuma' }, { value: 6, label: 'Cumartesi' },
                    { value: 7, label: 'Pazar' },
                ],
            },
            {
                name: 'time_range',
                label: 'Saat Aralığı',
                type: 'text',
                placeholder: '12:00 - 13:00',
                required: true,
            },
            {
                name: 'used_area_id',
                label: 'Etüt Alanı',
                type: 'select',
                required: true,
                options: areaOpts,
                onClick: () => setEnabled(e => ({ ...e, areas: true })),
            },
            {
                name: 'manager_ids',
                label: 'Görevli Yöneticiler',
                type: 'multiselect',
                options: managerOpts,
                onClick: () => setEnabled(e => ({ ...e, users: true })),
            },
            {
                name: 'teacher_ids',
                label: 'Görevli Öğretmenler',
                type: 'multiselect',
                options: teacherOpts,
                onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            },
            {
                name: 'level_id',
                label: 'Sınıf Seviyesi',
                type: 'select',
                required: true,
                options: levelOpts,
                onClick: () => setEnabled(e => ({ ...e, levels: true })),
                onChange: (val, formik) => {
                    const lvl = Number(val) || 0;
                    setLevelId(lvl || null);
                    setEnabled(e => ({ ...e, classes: true }));
                    formik.setFieldValue('classroom_id', 0);
                },
            },
            {
                name: 'classroom_id',
                label: 'Sınıf / Şube',
                type: 'select',
                dependencyKey: 'level_id',
                options: classOpts,
                onClick: () => setEnabled(e => ({ ...e, classes: true })),
            },
        ],
        [groupOpts, areaOpts, levelOpts, classOpts, managerOpts, teacherOpts],
    );

    /* ───────── Submit handler ──────────────────────────────────────────── */
    async function handleSubmit(values: IForm, _h: FormikHelpers<IForm>) {
        /* API’ye uygun payload: date_range → start_date & end_date */
        const payload = {
            ...values,
            start_date: values.date_range.startDate,
            end_date: values.date_range.endDate,
        };

        if (mode === 'add') {
            await addNewAttendance(payload);
        } else if (mode === 'update' && id) {
            await updateExistingAttendance({ attendanceId: Number(id), payload });
        }
        nav(-1);          // listeye geri dön
        onRefresh?.();    // tabloyu tazele
    }

    /* ───────── UI durumları ────────────────────────────────────────────── */
    const loading =
        mode === 'add'
            ? addSt === 'LOADING'
            : updSt === 'LOADING' || detSt === 'LOADING';

    const error =
        mode === 'add'
            ? addErr
            : updErr || detErr;

    /* ───────── Render ─────────────────────────────────────────────────── */
    return (
        <ReusableModalForm<IForm>
            show={true}                /* route içinde daima açık */
            title={mode === 'add' ? 'Etüt Planı Ekle' : 'Etüt Planı Güncelle'}
            mode="single"
            fields={getFields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Kaydet' : 'Güncelle'}
            cancelButtonLabel="İptal"
            isLoading={loading}
            error={error || null}
            autoGoBackOnModalClose
            onClose={() => nav(-1)}
        />
    );
};

export default StudyProgramCrud;

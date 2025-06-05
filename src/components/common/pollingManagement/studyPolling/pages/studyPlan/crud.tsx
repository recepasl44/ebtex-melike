/* ------------------------------------------------------------------
 *  Etüt / Çalışma Planı – CRUD Modal
 *  route : pollingManagement/studyPlan/crud
 * -----------------------------------------------------------------*/
import React, { useMemo, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikHelpers, FormikValues } from 'formik';

/* UI */
import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm';

/* CRUD hooks */
import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';
import { useAttendanceUpdate } from '../../../../../hooks/attendance/useUpdate';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';

/* Look-up hooks */
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

/* ---------- tipler ---------- */
interface IForm extends FormikValues {
    name: string;
    group_id: number;
    used_area_id: number;
    level_id: number;
    classroom_id: number;
    week_days: number[];
    time_range: string;
    manager_ids: number[];
    teacher_ids: number[];
    student_ids: number[];
    date_range: { startDate: string; endDate: string };
}
interface ModalProps {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

const DAYS = [
    { value: 1, label: 'Pazartesi' },
    { value: 2, label: 'Salı' },
    { value: 3, label: 'Çarşamba' },
    { value: 4, label: 'Perşembe' },
    { value: 5, label: 'Cuma' },
    { value: 6, label: 'Cumartesi' },
    { value: 7, label: 'Pazar' },
];

/* =================================================================== */
export default function StudyPlanModal({ show, onClose, onRefresh }: ModalProps) {
    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';
    const nav = useNavigate();

    /* ---------------- flags ---------------- */
    const [levelId, setLevelId] = useState<number | null>(null);
    const [classId, setClassId] = useState<number | null>(null);

    /*  teachers & users başlangıçta true → listeler hemen yüklenir  */
    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        levels: false,
        classes: false,
        teachers: true,
        users: true,
        students: false,
    });

    /* ---------------- look-ups ------------ */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups, pageSize: 999 });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });

    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        level_id: levelId ?? undefined,
        branchId: 0,
    });

    /* -- öğretmen listesi tümünü çeker -- */
    const { attendanceTeachersData: teachersData = [] } = useAttendanceTeachersTable({
        enabled: enabled.teachers,
    });

    const { usersData: managersData = [] } = useUsersTable({
        enabled: enabled.users,
        role_id: 2,
        pageSize: 999,
    });

    const { attendanceStudentsData: studentsData = [] } = useAttendanceStudentsTable({
        enabled: enabled.students && (!!levelId || !!classId),
        level_id: levelId ?? undefined,
        classroom_id: classId ?? undefined,
        pageSize: 999,
    });

    /* ---------------- CRUD hooks ---------- */
    const { addNewAttendance: addPlan, status: addSt, error: addErr } = useAttendanceAdd();
    const { updateExistingAttendance: updPlan, status: updSt, error: updErr } = useAttendanceUpdate();
    const {
        attendance: fetched,
        status: detSt,
        error: detErr,
        getAttendance,
    } = useAttendanceDetail({ attendanceId: Number(id ?? 0), enabled: !!id });

    /* ---------------- initial form -------- */
    const [initial, setInitial] = useState<IForm>({
        date_range: { startDate: '', endDate: '' },
        name: '',
        group_id: 0,
        used_area_id: 0,
        level_id: 0,
        classroom_id: 0,
        week_days: [],
        time_range: '',
        manager_ids: [],
        teacher_ids: [],
        student_ids: [],
    });

    /* detail fetch */
    React.useEffect(() => {
        if (mode === 'update' && id) getAttendance(+id);
    }, [id]);

    React.useEffect(() => {
        if (mode === 'update' && fetched) {
            setInitial({
                date_range: {
                    startDate: fetched.start_date ?? '',
                    endDate: fetched.end_date ?? '',
                },
                name: fetched.name ?? '',
                group_id: fetched.group_id ?? 0,
                used_area_id: fetched.used_area_id ?? 0,
                level_id: fetched.level_id ?? 0,
                classroom_id: fetched.classroom_id ?? 0,
                week_days:
                    fetched.week_days?.length
                        ? fetched.week_days
                        : fetched.days?.map((d: any) => d.day_id) ?? [],
                time_range: fetched.time_range ?? '',
                manager_ids: fetched.manager_ids ?? [],
                teacher_ids: fetched.teachers?.map((t: any) => t.id) ?? [],
                student_ids: fetched.students?.map((s: any) => s.id) ?? [],
            });
            setLevelId(fetched.level_id ?? null);
            setClassId(fetched.classroom_id ?? null);
            setEnabled((e) => ({ ...e, groups: true, areas: true, levels: true, classes: true, students: true }));
        }
    }, [fetched, mode]);

    /* ---------------- option helpers ------ */
    const groupOpts = useMemo(
        () => groupsData.map((g) => ({ value: g.id, label: g.name })),
        [groupsData],
    );
    const areaOpts = useMemo(
        () => usedAreasData.map((a) => ({ value: a.id, label: a.name })),
        [usedAreasData],
    );
    const levelOpts = useMemo(
        () => levelsData.map((l) => ({ value: l.id, label: l.name })),
        [levelsData],
    );
    const classOpts = useMemo(
        () => classroomData.map((c: { id: any; name: any; }) => ({ value: c.id, label: c.name })),
        [classroomData],
    );

    const teacherOpts = useMemo(
        () =>
            teachersData.length
                ? teachersData.map((t) => ({
                    value: t.teacher_id ?? t.id,
                    label: t.teacher?.name_surname || t.name_surname || '-',
                }))
                : [{ value: 0, label: '-' }],
        [teachersData],
    );

    const userOpts = useMemo(
        () =>
            managersData.length
                ? managersData.map((u) => ({
                    value: u.id,
                    label: u.name_surname || u.name || '-',
                }))
                : [{ value: 0, label: '-' }],
        [managersData],
    );

    const studentOpts = useMemo(
        () =>
            studentsData.length
                ? studentsData.map((s) => ({
                    value: s.student_id ?? s.id,
                    label: s.student
                        ? `${s.student.first_name} ${s.student.last_name}`
                        : s.name_surname || '-',
                }))
                : [{ value: 0, label: '-' }],
        [studentsData],
    );

    /* ---------------- field list ---------- */
    const getFields = useCallback(
        (_v: IForm): FieldDefinition[] => [
            /* sol kolon */
            {
                name: 'date_range',
                label: 'Tarih Aralığı',
                type: 'doubledate',
                required: true,
            },
            { name: 'name', label: 'Plan Adı', type: 'text', required: true },
            {
                name: 'group_id',
                label: 'Grup Adı',
                type: 'select',
                required: true,
                options: groupOpts,
                onClick: () => setEnabled((e) => ({ ...e, groups: true })),
            },
            {
                name: 'used_area_id',
                label: 'Etüt Alanı',
                type: 'select',
                required: true,
                options: areaOpts,
                onClick: () => setEnabled((e) => ({ ...e, areas: true })),
            },
            { name: 'time_range', label: 'Saat Aralığı', type: 'text', placeholder: '12:00 - 13:00', required: true },
            { name: 'week_days', label: 'Haftanın Günleri', type: 'multiselect', options: DAYS },

            /* sağ kolon */
            {
                name: 'level_id',
                label: 'Sınıf Seviyesi',
                type: 'select',
                required: true,
                options: levelOpts,
                onClick: () => setEnabled((e) => ({ ...e, levels: true })),
                onChange: (val, formik) => {
                    const n = Number(val) || 0;
                    setLevelId(n || null);
                    setClassId(null);
                    formik.setFieldValue('classroom_id', 0);
                    setEnabled((e) => ({ ...e, classes: true, students: false }));
                },
            },
            {
                name: 'classroom_id',
                label: 'Sınıf / Şube',
                type: 'select',
                dependencyKey: 'level_id',
                options: classOpts,
                onClick: () => setEnabled((e) => ({ ...e, classes: true })),
                onChange: (val, _fk) => {
                    const n = Number(val) || 0;
                    setClassId(n || null);
                    setEnabled((e) => ({ ...e, students: true }));
                },
            },
            {
                name: 'manager_ids',
                label: 'Görevli Yöneticiler',
                type: 'multiselect',
                options: userOpts,
                onClick: () => setEnabled((e) => ({ ...e, users: true })),
            },
            {
                name: 'teacher_ids',
                label: 'Görevli Öğretmenler',
                type: 'multiselect',
                options: teacherOpts,
                onClick: () => setEnabled((e) => ({ ...e, teachers: true })),
            },
            {
                name: 'student_ids',
                label: 'Öğrenciler',
                type: 'multiselect',
                dependencyKey: 'classroom_id',
                options: studentOpts,
                onClick: () => setEnabled((e) => ({ ...e, students: true })),
            },
        ],
        [groupOpts, areaOpts, levelOpts, classOpts, userOpts, teacherOpts, studentOpts],
    );

    /* ---------------- submit ------------- */
    const handleSubmit = async (vals: IForm, helpers:
        FormikHelpers<IForm>) => {
        const { date_range, ...rest } = vals;
        const payload = {
            ...rest,
            start_date: date_range.startDate,
            end_date: date_range.endDate,
        } as any;
        try {
            if (mode === 'add') await addPlan(payload);
            else if (id) await updPlan({ attendanceId: +id, payload });
            helpers.setSubmitting(false);
            onRefresh();
            onClose();
        } catch (err) {
            console.error(err);
            helpers.setSubmitting(false);
        }
    };

    /* ---------------- render ------------- */
    const isLoading =
        mode === 'add' ? addSt === 'LOADING' : updSt === 'LOADING' || detSt === 'LOADING';

    return (
        <ReusableModalForm<IForm>
            show={show}
            mode="double"
            title={mode === 'add' ? 'Çalışma Planı Ekle' : 'Çalışma Planı Güncelle'}
            fields={getFields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Ekle' : 'Güncelle'}
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={addErr || updErr || detErr || null}
            autoGoBackOnModalClose
            onClose={() => {
                onClose();
                nav(-1);
            }}
        />
    );
}

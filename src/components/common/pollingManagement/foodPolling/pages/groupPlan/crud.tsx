
import { useEffect, useMemo, useState, useCallback } from 'react';
import { FormikHelpers } from 'formik';
import { useParams } from 'react-router-dom';

import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm';

import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';
import { useAttendanceUpdate } from '../../../../../hooks/attendance/useUpdate';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';

import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

/* ---------- tipler ---------- */
interface IForm {
    date_range: { startDate: string; endDate: string };
    name: string;
    group_id: number;
    used_area_id: number;
    level_id: number;
    classroom_id: number;
    week_days: number[];
    time_range: string;
    responsible_id?: number;
    manager_ids: number[];
    teacher_ids: number[];
    student_ids: number[];
}
interface ModalProps {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

const MEAL_OPTIONS = [
    { value: 'kahvaltı', label: 'Kahvaltı' },
    { value: 'öğle yemeği', label: 'Öğle Yemeği' },
    { value: 'akşam yemeği', label: 'Akşam Yemeği' },
];

export default function FoodPlanModal({ show, onClose, onRefresh }: ModalProps) {
    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';


    const [enabled, setEnabled] = useState({
        groups: false, areas: false, levels: false, classes: false,
        students: false, teachers: false, users: false,
    });
    const [levelId, setLevelId] = useState<number | null>(null);
    const [classId, setClassId] = useState<number | null>(null);


    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        level_id: levelId ?? undefined,
        branchId: 0,
    });
    const { attendanceStudentsData: studentsData = [] } = useAttendanceStudentsTable({
        enabled: enabled.students && (!!levelId || !!classId),
        level_id: levelId ?? undefined,
        classroom_id: classId ?? undefined,
        page: 1, pageSize: 1000,
    });
    const { attendanceTeachersData: teachersData = [] } = useAttendanceTeachersTable({
        enabled: enabled.teachers && (!!levelId || !!classId),
        level_id: levelId ?? undefined,
        page: 1, paginate: 999,
    });
    const { usersData: personnelData = [] } = useUsersTable({
        enabled: enabled.users,
        role_id: 2,
        pageSize: 999,
    });

    const { addNewAttendance, status: addSt, error: addErr } = useAttendanceAdd();
    const { updateExistingAttendance, status: updSt, error: updErr } = useAttendanceUpdate();
    const { attendance: fetched, status: detSt, error: detErr,
        getAttendance } = useAttendanceDetail({ attendanceId: Number(id ?? 0), enabled: !!id });


    const [initial, setInitial] = useState<IForm>({
        date_range: { startDate: '', endDate: '' },
        name: '', group_id: 0, used_area_id: 0,
        level_id: 0, classroom_id: 0,
        week_days: [], time_range: '',
        responsible_id: undefined,
        manager_ids: [], teacher_ids: [], student_ids: [],
    });

    useEffect(() => { if (mode === 'update' && id) getAttendance(+id); }, [id]);

    useEffect(() => {
        if (mode === 'update' && fetched) {
            setInitial({
                date_range: { startDate: fetched.start_date ?? '', endDate: fetched.end_date ?? '' },
                name: fetched.name ?? '',
                group_id: fetched.group_id ?? 0,
                used_area_id: fetched.used_area_id ?? 0,
                level_id: fetched.level_id ?? 0,
                classroom_id: fetched.classroom_id ?? 0,
                week_days: fetched.week_days?.length
                    ? fetched.week_days
                    : fetched.days?.map((d: any) => d.day_id) ?? [],
                time_range: fetched.time_range ?? '',
                responsible_id: fetched.responsible_id ?? undefined,
                manager_ids: fetched.manager_ids ?? [],
                teacher_ids: fetched.teachers?.map((t: any) => t.id) ?? [],
                student_ids: fetched.students?.map((s: any) => s.id) ?? [],
            });
            setEnabled({
                groups: true, areas: true, levels: true, classes: true,
                students: true, teachers: true, users: true,
            });
            setLevelId(fetched.level_id ?? null);
            setClassId(fetched.classroom_id ?? null);
        }
    }, [fetched, mode]);


    const groupOpts = useMemo(() => groupsData.map(g => ({ value: g.id, label: g.name })), [groupsData]);
    const areaOpts = useMemo(() => usedAreasData.map(a => ({ value: a.id, label: a.name })), [usedAreasData]);
    const levelOpts = useMemo(() => levelsData.map(l => ({ value: l.id, label: l.name })), [levelsData]);
    const classOpts = useMemo(() => classroomData.map(c => ({ value: c.id, label: c.name })), [classroomData]);
    const teacherOpts = useMemo(() => teachersData.map(t => ({ value: t.teacher_id, label: t.teacher?.name_surname || '-' })), [teachersData]);
    const personnelOpts = useMemo(() => personnelData.map(p => ({ value: p.id, label: p.name_surname || p.name || '-' })), [personnelData]);
    const studentOpts = useMemo(() => studentsData.map(s => ({ value: s.student_id, label: s.student ? `${s.student.first_name} ${s.student.last_name}` : '-' })), [studentsData]);


    const getFields = useCallback((_v: IForm): FieldDefinition[] => [
        { name: 'date_range', label: 'Tarih Aralığı', type: 'doubledate', required: true },

        { name: 'name', label: 'Öğün', type: 'select', required: true, options: MEAL_OPTIONS },

        {
            name: 'group_id', label: 'Grup Adı', type: 'select', required: true,
            options: groupOpts,
            onClick: () => setEnabled(e => ({ ...e, groups: true }))
        },

        {
            name: 'used_area_id', label: 'Yemek Alanı', type: 'select',
            options: areaOpts,
            onClick: () => setEnabled(e => ({ ...e, areas: true }))
        },

        {
            name: 'level_id', label: 'Sınıf Seviyesi', type: 'select', required: true,
            options: levelOpts,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: (val, formik) => {
                const n = Number(val) || 0;
                setLevelId(n || null); setClassId(null);
                formik.setFieldValue('level_id', n);
                formik.setFieldValue('classroom_id', 0);
                setEnabled(e => ({ ...e, classes: true, students: false, teachers: false }));
            }
        },

        {
            name: 'classroom_id', label: 'Sınıf / Şube', type: 'select',
            dependencyKey: 'level_id',
            options: classOpts,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: (val, formik) => {
                const n = Number(val) || 0;
                setClassId(n || null);
                formik.setFieldValue('classroom_id', n);
                setEnabled(e => ({ ...e, students: true, teachers: true }));
            }
        },

        {
            name: 'week_days', label: 'Haftanın Günleri', type: 'multiselect',
            options: [
                { value: 1, label: 'Pzt' }, { value: 2, label: 'Sal' }, { value: 3, label: 'Çar' },
                { value: 4, label: 'Per' }, { value: 5, label: 'Cum' }, { value: 6, label: 'Cmt' },
                { value: 7, label: 'Paz' },
            ]
        },

        {
            name: 'time_range', label: 'Saat Aralığı', type: 'text',
            placeholder: '07:00 - 09:00', required: true
        },

        {
            name: 'responsible_id', label: 'Yemekhane Sorumlusu', type: 'select',
            options: personnelOpts,
            onClick: () => setEnabled(e => ({ ...e, users: true }))
        },

        {
            name: 'manager_ids', label: 'Görevli Yöneticiler', type: 'multiselect',
            options: personnelOpts,
            onClick: () => setEnabled(e => ({ ...e, users: true })),
            onChange: (val: number[], formik) => {
                /* 5 seçim sınırı */
                if (Array.isArray(val) && val.length <= 5) formik.setFieldValue('manager_ids', val);
            }
        },

        {
            name: 'teacher_ids', label: 'Görevli Öğretmenler', type: 'multiselect',
            options: teacherOpts,
            onClick: () => setEnabled(e => ({ ...e, teachers: true }))
        },

        {
            name: 'student_ids', label: 'Öğrenciler', type: 'multiselect',
            dependencyKey: 'classroom_id',
            options: studentOpts,
            onClick: () => setEnabled(e => ({ ...e, students: true }))
        },

    ], [
        groupOpts, areaOpts, levelOpts, classOpts,
        personnelOpts, teacherOpts, studentOpts,
    ]);

    /* ---------- submit ---------------------------- */
    const handleSubmit = async (vals: IForm, helpers: FormikHelpers<IForm>) => {
        const payload = {
            name: vals.name,
            group_id: vals.group_id || null,
            used_area_id: vals.used_area_id || null,
            level_id: vals.level_id || null,
            classroom_id: vals.classroom_id || null,
            start_date: vals.date_range.startDate,
            end_date: vals.date_range.endDate,
            week_days: vals.week_days,
            time_range: vals.time_range,
            responsible_id: vals.responsible_id || null,
            manager_ids: vals.manager_ids,
            teacher_ids: vals.teacher_ids,
            student_ids: vals.student_ids,
        };
        try {
            if (mode === 'add') await addNewAttendance(payload as any);
            else if (id) await updateExistingAttendance({ attendanceId: +id, payload } as any);

            helpers.setSubmitting(false);
            onRefresh();
            onClose();
        } catch (e) {
            console.error(e);
            helpers.setSubmitting(false);
        }
    };

    /* ---------- render ---------------------------- */
    const isLoading = mode === 'add'
        ? addSt === 'LOADING'
        : updSt === 'LOADING' || detSt === 'LOADING';

    return (
        <ReusableModalForm<IForm>
            show={show}
            title={mode === 'add' ? 'Plan Ekle' : 'Plan Güncelle'}
            mode="single"
            fields={getFields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Kaydet' : 'Güncelle'}
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={(addErr || updErr || detErr) || null}
            autoGoBackOnModalClose
            onClose={onClose}
        />
    );
}

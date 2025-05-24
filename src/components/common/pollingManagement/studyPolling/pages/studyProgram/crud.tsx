/* -------------------------------------------------------------------------- */
/* StudyProgramCrud.tsx – Etüt Yoklama › Etüt Programı – Ekle / Güncelle      */
/* -------------------------------------------------------------------------- */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormikHelpers, FormikValues } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import ReusableModalForm, {
    FieldDefinition,
} from '../../../../ReusableModalForm';

/* ────── CRUD & detay hook’ları ─────────────────────────────────────────── */
import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';
import { useAttendanceUpdate } from '../../../../../hooks/attendance/useUpdate';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';

/* ────── Yardımcı listeler ─────────────────────────────────────────────── */
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

/* ────── Form tipi ─────────────────────────────────────────────────────── */
interface IForm extends FormikValues {
    date_range: { startDate: string; endDate: string };
    group_id: number;
    week_days: number[];
    time_range: string;
    used_area_id: number;
    manager_ids: number[];
    teacher_ids: number[];
    level_id: number;
    classroom_id: number;
}

/* ======================================================================= */
interface StudyProgramCrudProps {
    show?: boolean;
    onClose?: () => void;
    onRefresh?: () => void;
}

const StudyProgramCrud: React.FC<StudyProgramCrudProps> = ({ onRefresh }) => {

    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';
    const navigate = useNavigate();


    const [levelId, setLevelId] = useState<number | null>(null);
    const [enabled, setEnabled] = useState({
        groups: true,
        areas: true,
        levels: true,
        classes: false,
        teachers: false,
        users: false,
    });


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


    const { addNewAttendance, status: addSt, error: addErr } = useAttendanceAdd();
    const { updateExistingAttendance, status: updSt, error: updErr } = useAttendanceUpdate();
    const { attendance: fetched, status: detSt, error: detErr,
        getAttendance } =
        useAttendanceDetail({ attendanceId: Number(id ?? 0), enabled: !!id });

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


    useEffect(() => {
        if (mode === 'update' && id) getAttendance(+id);
        // eslint-disable-next-line react-hooks/
    }, [id]);


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

            setLevelId(fetched.level_id ?? null);
            setEnabled({
                groups: true, areas: true, levels: true,
                classes: true, teachers: true, users: true,
            });
        }
    }, [fetched, mode]);

    const groupOpts = useMemo(() => groupsData.map(g => ({ value: g.id, label: g.name })), [groupsData]);
    const areaOpts = useMemo(() => usedAreasData.map(a => ({ value: a.id, label: a.name })), [usedAreasData]);
    const levelOpts = useMemo(() => levelsData.map(l => ({ value: l.id, label: l.name })), [levelsData]);
    const classOpts = useMemo(() => classroomData.map(c => ({ value: c.id, label: c.name })), [classroomData]);
    const teacherOpts = useMemo(() => teachersData.map(t => ({ value: t.teacher_id, label: t.teacher?.name_surname || '-' })), [teachersData]);
    const managerOpts = useMemo(() => managersData.map(u => ({ value: u.id, label: u.name_surname || u.name || '-' })), [managersData]);

    const getFields = useCallback(
        (_: IForm): FieldDefinition[] => [
            { name: 'date_range', label: 'Tarih Aralığı', type: 'doubledate', required: true },

            {
                name: 'group_id', label: 'Grup Adı', type: 'select',
                required: true, options: groupOpts,
                onClick: () => setEnabled(e => ({ ...e, groups: true }))
            },

            {
                name: 'week_days', label: 'Haftanın Günleri', type: 'multiselect',
                options: [
                    { value: 1, label: 'Pazartesi' }, { value: 2, label: 'Salı' },
                    { value: 3, label: 'Çarşamba' }, { value: 4, label: 'Perşembe' },
                    { value: 5, label: 'Cuma' }, { value: 6, label: 'Cumartesi' },
                    { value: 7, label: 'Pazar' },
                ]
            },

            {
                name: 'time_range', label: 'Saat Aralığı', type: 'text',
                placeholder: '12:00 - 13:00', required: true
            },

            {
                name: 'used_area_id', label: 'Etüt Alanı', type: 'select',
                required: true, options: areaOpts,
                onClick: () => setEnabled(e => ({ ...e, areas: true }))
            },

            {
                name: 'manager_ids', label: 'Görevli Yöneticiler', type: 'multiselect',
                options: managerOpts,
                onClick: () => setEnabled(e => ({ ...e, users: true }))
            },

            {
                name: 'teacher_ids', label: 'Görevli Öğretmenler', type: 'multiselect',
                options: teacherOpts,
                onClick: () => setEnabled(e => ({ ...e, teachers: true }))
            },

            {
                name: 'level_id', label: 'Sınıf Seviyesi', type: 'select',
                required: true, options: levelOpts,
                onClick: () => setEnabled(e => ({ ...e, levels: true })),
                onChange: (val, formik) => {
                    const lvl = Number(val) || 0;
                    setLevelId(lvl || null);
                    setEnabled(e => ({ ...e, classes: true }));
                    formik.setFieldValue('classroom_id', 0);
                }
            },

            {
                name: 'classroom_id', label: 'Sınıf / Şube', type: 'select',
                dependencyKey: 'level_id',
                options: classOpts,
                onClick: () => setEnabled(e => ({ ...e, classes: true }))
            },
        ],
        [groupOpts, areaOpts, levelOpts, classOpts, managerOpts, teacherOpts],
    );


    const handleSubmit = async (vals: IForm, _h: FormikHelpers<IForm>) => {
        const payload = {
            ...vals,
            start_date: vals.date_range.startDate,
            end_date: vals.date_range.endDate,
        };

        if (mode === 'add')
            await addNewAttendance(payload);
        else if (id)
            await updateExistingAttendance({ attendanceId: +id, payload });

        onRefresh?.();
        navigate(-1);
    };


    const isLoading = mode === 'add'
        ? addSt === 'LOADING'
        : updSt === 'LOADING' || detSt === 'LOADING';

    const combinedError = mode === 'add' ? addErr : (updErr || detErr);


    return (
        <ReusableModalForm<IForm>
            show={true}
            mode="single"
            title={mode === 'add' ? 'Etüt Planı Ekle' : 'Etüt Planı Güncelle'}
            fields={getFields}
            initialValues={initial}

            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Kaydet' : 'Güncelle'}
            cancelButtonLabel="İptal"
            isLoading={isLoading}
            error={combinedError || null}
            autoGoBackOnModalClose
            onClose={() => navigate(-1)}
        />
    );
};

export default StudyProgramCrud;

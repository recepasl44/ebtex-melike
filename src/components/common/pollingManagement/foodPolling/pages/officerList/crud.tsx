/* -------------------------------------------------------------------------- */
/*  FoodOfficerModal.tsx                                                      */
/*  Yemek Yoklama › Görevli Listesi — Ekle / Düzenle (Mod-al)                  */
/* -------------------------------------------------------------------------- */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { FormikHelpers, FormikValues } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReusableModalForm, {
    FieldDefinition,
} from '../../../../ReusableModalForm';

/* ───────── CRUD hook’ları ───────── */
import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';
import { useAttendanceUpdate } from '../../../../../hooks/attendance/useUpdate';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';

/* ───────── Yardımcı listeler ─────── */
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';          // role_id = 2
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';

/* ----------------------------------------------------------------------- */
/*  Form tipi                                                              */
/* ----------------------------------------------------------------------- */
interface IForm extends FormikValues {
    name: string;     // öğün adı
    group_id: number;
    used_area_id: number;
    level_id: number;
    classroom_id: number;
    week_days: number[];   // [1-7]
    time_range: string;     // “07:00 - 09:00”
    responsible_id: number;     // Yemekhane sorumlusu  (user)
    manager_ids: number[];   // Görevli yöneticiler  (user[])
    teacher_ids: number[];   // Görevli öğretmenler (teacher[])
}

/* ----------------------------------------------------------------------- */
interface ModalProps {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}
/* ======================================================================= */
const FoodOfficerModal: React.FC<ModalProps> = ({ show, onClose, onRefresh }) => {
    /* -------- mode / id -------- */
    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';
    const nav = useNavigate();

    /* -------- seçimlere bağlı lazy-load -------- */
    const [levelId, setLevelId] = useState<number | null>(null);
    const [enabled, setEnabled] = useState({
        groups: true,
        areas: true,
        levels: true,
        classes: false,
        teachers: false,
        users: false,
    });

    /* -------- yardımcı listeler -------- */
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups, pageSize: 999 });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });

    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!levelId,
        level_id: levelId ?? undefined,
        branchId: 0,
    });

    const { usersData: managerList = [] } = useUsersTable({
        enabled: enabled.users,
        role_id: 2,          // şimdilik hem sorumlu hem yönetici
        pageSize: 999,
    });

    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });

    /* -------- CRUD hook’ları -------- */
    const { addNewAttendance,
        status: addSt, error: addErr } = useAttendanceAdd();

    const { updateExistingAttendance,
        status: updSt, error: updErr } = useAttendanceUpdate();

    const { attendance: fetched,
        status: detSt, error: detErr,
        getAttendance } =
        useAttendanceDetail({ attendanceId: Number(id ?? 0), enabled: !!id });

    /* -------- initial form -------- */
    const [initial, setInitial] = useState<IForm>({
        name: '',
        group_id: 0,
        used_area_id: 0,
        level_id: 0,
        classroom_id: 0,
        week_days: [],
        time_range: '',
        responsible_id: 0,
        manager_ids: [],
        teacher_ids: [],
    });

    /* update modunda veriyi çek */
    useEffect(() => { if (mode === 'update' && id) getAttendance(+id); }, [mode, id]);

    useEffect(() => {
        if (mode === 'update' && fetched) {
            setInitial({
                name: fetched.name ?? '',
                group_id: fetched.group_id ?? 0,
                used_area_id: fetched.used_area_id ?? 0,
                level_id: fetched.level_id ?? 0,
                classroom_id: fetched.classroom_id ?? 0,
                week_days: fetched.week_days?.length
                    ? fetched.week_days
                    : fetched.days?.map((d: any) => d.day_id) ?? [],
                time_range: fetched.time_range ?? '',
                responsible_id: fetched.responsible_id ?? 0,
                manager_ids: Array.isArray(fetched.manager_ids)
                    ? fetched.manager_ids : [],
                teacher_ids: fetched.teachers?.map((t: any) => t.id) ?? [],
            });

            setLevelId(fetched.level_id ?? null);
            setEnabled({
                groups: true, areas: true, levels: true,
                classes: true, teachers: true, users: true,
            });
        }
    }, [fetched, mode]);

    /* -------- select options -------- */
    const groupOpts = useMemo(() => groupsData.map(g => ({ value: g.id, label: g.name })), [groupsData]);
    const areaOpts = useMemo(() => usedAreasData.map(a => ({ value: a.id, label: a.name })), [usedAreasData]);
    const levelOpts = useMemo(() => levelsData.map(l => ({ value: l.id, label: l.name })), [levelsData]);
    const classOpts = useMemo(() => classroomData.map(c => ({ value: c.id, label: c.name })), [classroomData]);
    const userOpts = useMemo(() => managerList.map(u => ({ value: u.id, label: u.name_surname || u.name || '-' })), [managerList]);
    const teacherOpts = useMemo(() => teachersData.map(t => ({
        value: t.teacher_id, label: t.teacher?.name_surname || '-'
    })), [teachersData]);

    /* -------- dynamic fields -------- */
    const getFields = useCallback(
        (_: IForm): FieldDefinition[] => [
            { name: 'name', label: 'Öğün Adı', type: 'text', required: true },

            {
                name: 'group_id', label: 'Grup Adı', type: 'select', required: true,
                options: groupOpts
            },

            {
                name: 'used_area_id', label: 'Yemek Alanı', type: 'select',
                options: areaOpts
            },

            {
                name: 'level_id', label: 'Sınıf Seviyesi', type: 'select', required: true,
                options: levelOpts,
                onChange: (val, f) => {
                    const id = Number(val) || 0;
                    setLevelId(id || null);
                    setEnabled(e => ({ ...e, classes: true }));
                    f.setFieldValue('classroom_id', 0);
                }
            },

            {
                name: 'classroom_id', label: 'Sınıf / Şube', type: 'select',
                dependencyKey: 'level_id',
                options: classOpts,
                onClick: () => setEnabled(e => ({ ...e, classes: true }))
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
                placeholder: '07:00 - 09:00', required: true
            },

            {
                name: 'responsible_id', label: 'Yemekhane Sorumlusu', type: 'select',
                options: userOpts,
                onClick: () => setEnabled(e => ({ ...e, users: true }))
            },

            {
                name: 'manager_ids', label: 'Görevli Yöneticiler', type: 'multiselect',
                options: userOpts,
                onClick: () => setEnabled(e => ({ ...e, users: true }))
            },

            {
                name: 'teacher_ids', label: 'Görevli Öğretmenler', type: 'multiselect',
                options: teacherOpts,
                onClick: () => setEnabled(e => ({ ...e, teachers: true }))
            },
        ],
        [groupOpts, areaOpts, levelOpts, classOpts, userOpts, teacherOpts],
    );

    /* -------- submit -------- */
    const handleSubmit = async (vals: IForm, _h: FormikHelpers<IForm>) => {
        if (mode === 'add')
            await addNewAttendance(vals);
        else if (id)
            await updateExistingAttendance({ attendanceId: +id, payload: vals });

        onRefresh();
        onClose();
    };

    const isLoading = mode === 'add'
        ? addSt === 'LOADING'
        : updSt === 'LOADING' || detSt === 'LOADING';

    const combinedError = mode === 'add' ? addErr : (updErr || detErr);

    /* -------- render -------- */
    return (
        <ReusableModalForm<IForm>
            show={show}
            mode="single"
            title={mode === 'add' ? 'Kişi Ekle' : 'Kişi Düzenle'}
            fields={getFields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Kaydet' : 'Güncelle'}
            cancelButtonLabel="İptal"
            isLoading={isLoading}
            error={combinedError || null}
            autoGoBackOnModalClose
            onClose={() => { onClose(); nav(-1); }}
        />
    );
};

export default FoodOfficerModal;

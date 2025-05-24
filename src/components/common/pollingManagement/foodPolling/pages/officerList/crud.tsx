

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormikHelpers, FormikValues } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm';


import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';
import { useAttendanceUpdate } from '../../../../../hooks/attendance/useUpdate';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';

import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';

interface IForm extends FormikValues {
    name: string;
    group_id: number;
    used_area_id: number;
    level_id: number;
    classroom_id: number;
    week_days: number[];
    time_range: string;
    responsible_id: string;
    manager_ids: string[];
    teacher_ids: string[];
}

interface ModalProps {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}


const FoodOfficerModal: React.FC<ModalProps> = ({ show, onClose, onRefresh }) => {

    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';
    const nav = useNavigate();


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


    const { usersData: dutyUsers = [] } = useUsersTable({
        enabled: enabled.users,
        role_id: 2,
        pageSize: 999,
    });

    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });

    const { addNewAttendance, status: addSt, error: addErr } = useAttendanceAdd();
    const { updateExistingAttendance, status: updSt, error: updErr } = useAttendanceUpdate();
    const { attendance: fetched, status: detSt, error: detErr,
        getAttendance } =
        useAttendanceDetail({ attendanceId: Number(id ?? 0), enabled: !!id });


    const [initial, setInitial] = useState<IForm>({
        name: '',
        group_id: 0,
        used_area_id: 0,
        level_id: 0,
        classroom_id: 0,
        week_days: [],
        time_range: '',
        responsible_id: '',
        manager_ids: [],
        teacher_ids: [],
    });


    useEffect(() => { if (mode === 'update' && id) getAttendance(+id); }, [id]);

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
                responsible_id: fetched.responsible_id ? String(fetched.responsible_id) : '',
                manager_ids: Array.isArray(fetched.manager_ids)
                    ? fetched.manager_ids.map(String) : [],
                teacher_ids: fetched.teachers?.map((t: any) => String(t.id)) ?? [],
            });

            setLevelId(fetched.level_id ?? null);
            setEnabled({
                groups: true, areas: true, levels: true,
                classes: true, teachers: true, users: true
            });
        }
    }, [fetched, mode]);


    const groupOpts = useMemo(() => groupsData.map(g => ({ value: g.id, label: g.name })), [groupsData]);
    const areaOpts = useMemo(() => usedAreasData.map(a => ({ value: a.id, label: a.name })), [usedAreasData]);
    const levelOpts = useMemo(() => levelsData.map(l => ({ value: l.id, label: l.name })), [levelsData]);
    const classOpts = useMemo(() => classroomData.map(c => ({ value: c.id, label: c.name })), [classroomData]);
    const userOpts = useMemo(() => dutyUsers.map(u => ({ value: String(u.id), label: u.name_surname || u.name || '-' })), [dutyUsers]);
    const teacherOpts = useMemo(() => teachersData.map(t => ({ value: String(t.teacher_id), label: t.teacher?.name_surname || '-' })), [teachersData]);

    const getFields = useCallback(
        (_: IForm): FieldDefinition[] => [
            { name: 'name', label: 'Öğün Adı', type: 'text', required: true },

            { name: 'group_id', label: 'Grup Adı', type: 'select', options: groupOpts, required: true },
            { name: 'used_area_id', label: 'Yemek Alanı', type: 'select', options: areaOpts },

            {
                name: 'level_id', label: 'Sınıf Seviyesi', type: 'select', options: levelOpts, required: true,
                onChange: (val, formik) => {
                    const n = Number(val) || 0;
                    setLevelId(n || null);
                    setEnabled(e => ({ ...e, classes: true }));
                    formik.setFieldValue('classroom_id', 0);
                }
            },
            {
                name: 'classroom_id', label: 'Sınıf / Şube', type: 'select',
                dependencyKey: 'level_id', options: classOpts,
                onClick: () => setEnabled(e => ({ ...e, classes: true }))
            },

            {
                name: 'week_days', label: 'Haftanın Günleri', type: 'multiselect',
                options: [
                    { value: 1, label: 'Pazartesi' }, { value: 2, label: 'Salı' }, { value: 3, label: 'Çarşamba' },
                    { value: 4, label: 'Perşembe' }, { value: 5, label: 'Cuma' }, { value: 6, label: 'Cumartesi' },
                    { value: 7, label: 'Pazar' },
                ]
            },

            { name: 'time_range', label: 'Saat Aralığı', type: 'text', placeholder: '07:00 - 09:00', required: true },


            {
                name: 'responsible_id', label: 'Yemekhane Sorumlusu',
                type: 'select', options: userOpts,
                onClick: () => setEnabled(e => ({ ...e, users: true }))
            },
            {
                name: 'manager_ids', label: 'Görevli Yöneticiler',
                type: 'multiselect', options: userOpts,
                onClick: () => setEnabled(e => ({ ...e, users: true }))
            },
            {
                name: 'teacher_ids', label: 'Görevli Öğretmenler',
                type: 'multiselect', options: teacherOpts,
                onClick: () => setEnabled(e => ({ ...e, teachers: true }))
            },
        ],
        [groupOpts, areaOpts, levelOpts, classOpts, userOpts, teacherOpts]
    );


    const handleSubmit = async (vals: IForm, _h: FormikHelpers<IForm>) => {

        const payload = {
            ...vals,
            responsible_id: vals.responsible_id ? Number(vals.responsible_id) : 0,
            manager_ids: vals.manager_ids.map(Number),
            teacher_ids: vals.teacher_ids.map(Number),
        };

        if (mode === 'add') await addNewAttendance(payload as any);
        else if (id) await updateExistingAttendance({ attendanceId: +id, payload });

        onRefresh(); onClose();
    };


    const isLoading = mode === 'add'
        ? addSt === 'LOADING'
        : updSt === 'LOADING' || detSt === 'LOADING';
    const combinedErr = mode === 'add' ? addErr : (updErr || detErr);


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
            error={combinedErr || null}
            autoGoBackOnModalClose
            onClose={() => { onClose(); nav(-1); }}
        />
    );
};

export default FoodOfficerModal;

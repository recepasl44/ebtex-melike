

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';

import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm';

import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';
import { useAttendanceUpdate } from '../../../../../hooks/attendance/useUpdate';

import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';

interface FormValues {
    dateRange: { startDate: string; endDate: string };
    club_name: string;
    group_id: string;
    area_id: string;
    class_level: string;
    classroom_id: string;
    week_days: string[];
    time_range: string;
    manager_ids: string[];
    teacher_ids: string[];
}


export default function ClubPlanModal({
    show, onClose, onRefresh,
}: {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}) {
    const { id } = useParams<{ id?: string }>();
    const mode = id ? 'update' : 'add';


    const { addNewAttendance, status: addSt, error: addErr } = useAttendanceAdd();
    const { updateExistingAttendance, status: updSt, error: updErr } = useAttendanceUpdate();
    const { attendance: fetched, getAttendance,
        status: detSt, error: detErr } =
        useAttendanceDetail({ attendanceId: Number(id), enabled: !!id });

    const [enabled, setEnabled] = useState({
        groups: false, areas: false, levels: false, classes: false,
        users: false, teachers: false,
    });


    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classes && !!fetched?.level_id,
        class_level: Number(fetched?.level_id) || undefined,
        branchId: 0,
    });

    const { usersData: managersData = [] } =
        useUsersTable({ enabled: enabled.users, role_id: 2, pageSize: 999 });
    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({ enabled: enabled.teachers });


    const [initial, setInitial] = useState<FormValues>({
        dateRange: { startDate: '', endDate: '' },
        club_name: '',
        group_id: '',
        area_id: '',
        class_level: '',
        classroom_id: '',
        week_days: [],
        time_range: '',
        manager_ids: [],
        teacher_ids: [],
    });


    useEffect(() => { if (mode === 'update' && id) getAttendance(+id); },
        [mode, id]);

    useEffect(() => {
        if (mode === 'update' && fetched) {
            setInitial({
                dateRange: { startDate: fetched.start_date, endDate: fetched.end_date },
                club_name: fetched.club_name ?? '',
                group_id: String(fetched.group_id) ?? '',
                area_id: String(fetched.area_id) ?? '',
                class_level: String(fetched.level_id) ?? '',
                classroom_id: String(fetched.classroom_id) ?? '',
                week_days: fetched.week_days ?? [],
                time_range: fetched.time_range ?? '',
                manager_ids: (fetched.manager_ids ?? []).map(String),        // ⭐
                teacher_ids: (fetched.teachers ?? []).map((t: any) => String(t.id)), // ⭐
            });
            setEnabled(e => ({
                ...e,
                groups: true, areas: true, levels: true, classes: true,
                users: true, teachers: true,
            }));
        }
    }, [mode, fetched]);


    const fields: FieldDefinition[] = useMemo(() => [
        { name: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', required: true },
        { name: 'club_name', label: 'Kulüp Adı', type: 'text', required: true },

        {
            name: 'group_id', label: 'Grup Adı', type: 'select', required: true,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: groupsData.map(g => ({ value: String(g.id), label: g.name }))
        },

        {
            name: 'area_id', label: 'Kulüp Alanı', type: 'select', required: true,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: usedAreasData.map(a => ({ value: String(a.id), label: a.name }))
        },

        {
            name: 'class_level', label: 'Sınıf Seviyesi', type: 'select',
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: () => setEnabled(e => ({ ...e, classes: true })),
            options: levelsData.map(l => ({ value: String(l.id), label: l.name }))
        },

        {
            name: 'classroom_id', label: 'Sınıf / Şube', type: 'select',
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            options: classroomData.map(c => ({ value: String(c.id), label: c.name }))
        },

        {
            name: 'week_days', label: 'Haftanın Günleri', type: 'multiselect',
            options: [
                { value: '1', label: 'Pazartesi' }, { value: '2', label: 'Salı' }, { value: '3', label: 'Çarşamba' },
                { value: '4', label: 'Perşembe' }, { value: '5', label: 'Cuma' }, { value: '6', label: 'Cumartesi' },
                { value: '7', label: 'Pazar' },
            ]
        },

        { name: 'time_range', label: 'Saat Aralığı', type: 'text', placeholder: '09:00 - 10:00' },


        {
            name: 'manager_ids', label: 'Görevli Yöneticiler', type: 'select',
            options: managersData.map(u => ({ value: String(u.id), label: u.name_surname || u.name || '-' })),
            onClick: () => setEnabled(e => ({ ...e, users: true }))
        },

        {
            name: 'teacher_ids', label: 'Görevli Öğretmenler', type: 'select',
            options: teachersData.map(t => ({
                value: String(t.teacher_id),
                label: t.teacher?.name_surname || '-'
            })),
            onClick: () => setEnabled(e => ({ ...e, teachers: true }))
        },
    ], [groupsData, usedAreasData, levelsData, classroomData, managersData, teachersData]);


    async function handleSubmit(values: FormValues, helpers: FormikHelpers<FormValues>) {
        if (mode === 'add') await addNewAttendance(values as any);
        else if (id) await updateExistingAttendance({ attendanceId: +id, payload: values } as any);

        onRefresh(); onClose(); helpers.setSubmitting(false);
    }

    const loading = mode === 'add'
        ? addSt === 'LOADING'
        : updSt === 'LOADING' || detSt === 'LOADING';
    const error = addErr || updErr || detErr || null;

    return (
        <ReusableModalForm<FormValues>
            show={show}
            onClose={onClose}
            title={mode === 'add' ? 'Kişi Ekle' : 'Kulüp Detay / Düzenle'}
            fields={fields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel="Kaydet"
            cancelButtonLabel="İptal"
            isLoading={loading}
            error={error}
            autoGoBackOnModalClose
        />
    );
}

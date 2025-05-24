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
import { useAttendanceTeachersTable } from '../../../../../hooks/attendanceTeacher/useList';
import { useUsersTable } from '../../../../../hooks/user/useList';

interface IForm extends FormikValues {
    group_id: number;
    used_area_id: number;
    time_range: string;
    manager_ids: number[];
    teacher_ids: number[];
    level_id: number;
    classroom_id: number;
}

interface ModalProps {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

const StudyPlanModal: React.FC<ModalProps> = ({ show, onClose, onRefresh }) => {
    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';
    const navigate = useNavigate();

    const [levelId, setLevelId] = useState<number | null>(null);
    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        levels: false,
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
    const { attendanceTeachersData: teachersData = [] } = useAttendanceTeachersTable({ enabled: enabled.teachers });
    const { usersData: managersData = [] } = useUsersTable({ enabled: enabled.users, role_id: 2, pageSize: 999 });

    const { addNewAttendance: createStudyPlan, status: addSt, error: addErr } = useAttendanceAdd();
    const { updateExistingAttendance: editStudyPlan, status: updSt, error: updErr } = useAttendanceUpdate();
    const {
        attendance: fetchedPlan,
        status: detSt,
        error: detErr,
        getAttendance: fetchStudyPlan,
    } = useAttendanceDetail({ attendanceId: Number(id ?? 0), enabled: !!id });

    const [initial, setInitial] = useState<IForm>({
        group_id: 0,
        used_area_id: 0,
        time_range: '',
        manager_ids: [],
        teacher_ids: [],
        level_id: 0,
        classroom_id: 0,
    });

    useEffect(() => {
        if (mode === 'update' && id) fetchStudyPlan(+id);
    }, [id]);

    useEffect(() => {
        if (mode === 'update' && fetchedPlan) {
            setInitial({
                group_id: fetchedPlan.group_id ?? 0,
                used_area_id: fetchedPlan.used_area_id ?? 0,
                time_range: fetchedPlan.time_range ?? '',
                manager_ids: Array.isArray(fetchedPlan.manager_ids) ? fetchedPlan.manager_ids : [],
                teacher_ids: fetchedPlan.teachers?.map((t: any) => t.id) ?? [],
                level_id: fetchedPlan.level_id ?? 0,
                classroom_id: fetchedPlan.classroom_id ?? 0,
            });

            setLevelId(fetchedPlan.level_id ?? null);
            setEnabled({
                groups: true,
                areas: true,
                levels: true,
                classes: true,
                teachers: true,
                users: true,
            });
        }
    }, [fetchedPlan, mode]);

    const groupOpts = useMemo(() => groupsData.map(g => ({ value: g.id, label: g.name })), [groupsData]);
    const areaOpts = useMemo(() => usedAreasData.map(a => ({ value: a.id, label: a.name })), [usedAreasData]);
    const levelOpts = useMemo(() => levelsData.map(l => ({ value: l.id, label: l.name })), [levelsData]);
    const classOpts = useMemo(() => classroomData.map(c => ({ value: c.id, label: c.name })), [classroomData]);
    const teacherOpts = useMemo(() => teachersData.map(t => ({
        value: t.teacher_id,
        label: t.teacher?.name_surname || '-',
    })), [teachersData]);
    const userOpts = useMemo(() => managersData.map(u => ({
        value: u.id,
        label: u.name_surname || u.name || '-',
    })), [managersData]);

    const getFields = useCallback(
        (_: IForm): FieldDefinition[] => [
            {
                name: 'group_id', label: 'Grup Adı', type: 'select',
                required: true, options: groupOpts,
                onClick: () => setEnabled(e => ({ ...e, groups: true })),
            },
            {
                name: 'used_area_id', label: 'Etüt Alanı', type: 'select',
                required: true, options: areaOpts,
                onClick: () => setEnabled(e => ({ ...e, areas: true })),
            },
            {
                name: 'time_range', label: 'Saat Aralığı', type: 'text',
                placeholder: '12:00 - 13:00', required: true,
            },
            {
                name: 'manager_ids', label: 'Görevli Yöneticiler', type: 'select',
                options: userOpts,
                onClick: () => setEnabled(e => ({ ...e, users: true })),
            },
            {
                name: 'teacher_ids', label: 'Görevli Öğretmenler', type: 'select',
                options: teacherOpts,
                onClick: () => setEnabled(e => ({ ...e, teachers: true })),
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
                },
            },
            {
                name: 'classroom_id', label: 'Sınıf / Şube', type: 'select',
                dependencyKey: 'level_id',
                options: classOpts,
                onClick: () => setEnabled(e => ({ ...e, classes: true })),
            },
        ],
        [groupOpts, areaOpts, levelOpts, classOpts, userOpts, teacherOpts],
    );

    const handleSubmit = async (vals: IForm, _h: FormikHelpers<IForm>) => {
        if (mode === 'add') await createStudyPlan(vals);
        else if (id) await editStudyPlan({ attendanceId: +id, payload: vals });

        onRefresh();
        onClose();
    };

    const isLoading = mode === 'add'
        ? addSt === 'LOADING'
        : updSt === 'LOADING' || detSt === 'LOADING';

    const combinedError = mode === 'add' ? addErr : (updErr || detErr);

    return (
        <ReusableModalForm<IForm>
            show={show}
            mode="single"
            title={mode === 'add' ? 'Plan Ekle' : 'Plan Güncelle'}
            fields={getFields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Kaydet' : 'Güncelle'}
            cancelButtonLabel="İptal"
            isLoading={isLoading}
            error={combinedError || null}
            autoGoBackOnModalClose
            onClose={() => { onClose(); navigate(-1); }}
        />
    );
};

export default StudyPlanModal;

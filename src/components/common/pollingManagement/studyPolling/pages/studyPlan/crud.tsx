/* -------------------------------------------------------------------------- */
/* StudyPlanModal.tsx – Etüt Yoklama › Etüt Planla – Ekle / Düzenle (Modal)   */
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
interface IStudyPlanForm extends FormikValues {
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

/* ====================================================================== */
const StudyPlanModal: React.FC<ModalProps> = ({ show, onClose, onRefresh }) => {
    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';
    const nav = useNavigate();

    /* ───────── add / update / show hook’ları ───────────────────────────── */
    const {
        addNewAttendance: createStudyPlan,
        status: addStatus,
        error: addError,
    } = useAttendanceAdd();

    const {
        updateExistingAttendance: editStudyPlan,
        status: updateStatus,
        error: updateError,
    } = useAttendanceUpdate();

    const {
        attendance: fetchedPlan,
        status: showStatus,
        error: showError,
        getAttendance: fetchStudyPlan,
    } = useAttendanceDetail({ attendanceId: Number(id ?? 0), enabled: !!id });

    /* ───────── Lazy-load bayrakları ────────────────────────────────────── */
    const [levelId, setLevelId] = useState<number | null>(null);
    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        levels: false,
        classes: false,
        teachers: false,
        users: false,
    });

    /* ───────── Yardımcı listeler ───────────────────────────────────────── */
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
    const [initialValues, setInitialValues] = useState<IStudyPlanForm>({
        group_id: 0,
        used_area_id: 0,
        time_range: '',
        manager_ids: [],
        teacher_ids: [],
        level_id: 0,
        classroom_id: 0,
    });

    /* ───────── Plan detayını çek (update modu) ─────────────────────────── */
    useEffect(() => {
        if (mode === 'update' && id) {
            fetchStudyPlan(Number(id));
        }
    }, [mode, id, fetchStudyPlan]);

    /* ───────── Detay geldiğinde formu doldur ───────────────────────────── */
    useEffect(() => {
        if (mode === 'update' && fetchedPlan) {
            setInitialValues({
                group_id: fetchedPlan.group_id ?? 0,
                used_area_id: fetchedPlan.used_area_id ?? 0,
                time_range: fetchedPlan.time_range ?? '',
                manager_ids: Array.isArray(fetchedPlan.manager_ids)
                    ? fetchedPlan.manager_ids as number[]
                    : [],
                teacher_ids: fetchedPlan.teachers?.map((t: any) => t.id) ?? [],
                level_id: fetchedPlan.level_id ?? 0,
                classroom_id: fetchedPlan.classroom_id ?? 0,
            });

            /* Gerekli lookup listelerini aktifleştir */
            setEnabled({
                groups: true,
                areas: true,
                levels: true,
                classes: true,
                teachers: true,
                users: true,
            });
            setLevelId(fetchedPlan.level_id ?? null);
        }
    }, [mode, fetchedPlan]);

    /* ───────── Select option helper’ları ───────────────────────────────── */
    const groupOpts = useMemo(() => groupsData.map(g => ({ value: g.id, label: g.name })), [groupsData]);
    const areaOpts = useMemo(() => usedAreasData.map(a => ({ value: a.id, label: a.name })), [usedAreasData]);
    const levelOpts = useMemo(() => levelsData.map(l => ({ value: l.id, label: l.name })), [levelsData]);
    const classOpts = useMemo(() => classroomData.map(c => ({ value: c.id, label: c.name })), [classroomData]);
    const teacherOpts = useMemo(() => teachersData.map(t => ({
        value: t.teacher_id, label: t.teacher?.name_surname || '-'
    })), [teachersData]);
    const userOpts = useMemo(() => managersData.map(u => ({
        value: u.id, label: u.name_surname || u.name || '-'
    })), [managersData]);

    /* ───────── Dinamik alan tanımı ─────────────────────────────────────── */
    const getFields = useCallback(
        (_v: IStudyPlanForm): FieldDefinition[] => [
            {
                name: 'group_id',
                label: 'Grup Adı',
                type: 'select',
                required: true,
                options: groupOpts,
                onClick: () => setEnabled(e => ({ ...e, groups: true })),
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
                name: 'time_range',
                label: 'Saat Aralığı',
                type: 'text',
                placeholder: '12:00 - 13:00',
                required: true,
            },
            {
                name: 'manager_ids',
                label: 'Görevli Yöneticiler',
                type: 'multiselect',
                options: userOpts,
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
        [groupOpts, areaOpts, levelOpts, classOpts, userOpts, teacherOpts],
    );

    /* ───────── Submit handler ──────────────────────────────────────────── */
    async function handleSubmit(
        values: IStudyPlanForm,
        _helpers: FormikHelpers<IStudyPlanForm>,
    ) {
        if (mode === 'add') {
            await createStudyPlan(values);
        } else if (mode === 'update' && id) {
            await editStudyPlan({ attendanceId: Number(id), payload: values });
        }
        onRefresh();
        onClose();
    }

    /* ───────── UI durumları ────────────────────────────────────────────── */
    const loading =
        mode === 'add'
            ? addStatus === 'LOADING'
            : updateStatus === 'LOADING' || showStatus === 'LOADING';

    const error =
        mode === 'add'
            ? addError
            : updateError || showError;

    /* ───────── Render ─────────────────────────────────────────────────── */
    return (
        <ReusableModalForm<IStudyPlanForm>
            show={show}
            title={mode === 'add' ? 'Plan Ekle' : 'Plan Güncelle'}
            fields={getFields}
            mode="single"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Ekle' : 'Güncelle'}
            cancelButtonLabel="Vazgeç"
            isLoading={loading}
            error={error || null}
            autoGoBackOnModalClose
            onClose={() => { onClose(); nav(-1); }}
        />
    );
};

export default StudyPlanModal;
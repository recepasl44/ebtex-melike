/* ClubPlanModal.tsx --------------------------------------------------------*/
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';

import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm';

/* ---------- Attendance CRUD ---------- */
import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';
import { useAttendanceDetail } from '../../../../../hooks/attendance/useDetail';
import { useAttendanceUpdate } from '../../../../../hooks/attendance/useUpdate';

/* ---------- yardımcı listeler ---------- */
import { useGroupsTable } from '../../../../../hooks/group/useList';
import { useUsedAreasList } from '../../../../../hooks/usedareas/useList';
import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';


/* ---------------- Form tipi ---------------- */
interface FormValues {
    dateRange: { startDate: string; endDate: string };
    club_name: string;
    group_id: string;
    area_id: string;
    class_level: string;
    classroom_id: string;
    week_days: string[];
    time_range: string;

}

/* ======================================================================= */
export default function ClubPlanModal({
    show, onClose, onRefresh,
}: {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}) {
    const { id } = useParams<{ id?: string }>();
    const mode = id ? 'update' : 'add';

    /* ---------------- CRUD hook'ları ---------------- */
    const { addNewAttendance, status: addSt, error: addErr } = useAttendanceAdd();
    const { updateExistingAttendance, status: updSt, error: updErr } = useAttendanceUpdate();
    const { attendance: fetched, getAttendance,
        status: detSt, error: detErr } = useAttendanceDetail({ attendanceId: Number(id), enabled: !!id });

    /* ---------------- Lazy-load bayrakları ---------------- */
    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        levels: false,
        classes: false,


    });

    /* ---------------- Yardımcı listeler ---------------- */
    const { groupsData } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData } = useLevelsTable({ enabled: enabled.levels });

    const { classroomData } = useClassroomList({
        enabled: enabled.classes && !!fetched?.level_id,
        class_level: Number(fetched?.level_id) || undefined,
        branchId: 0,
    });




    /* ---------------- Formik initial ---------------- */
    const [initial, setInitial] = useState<FormValues>({
        dateRange: { startDate: '', endDate: '' },
        club_name: '',
        group_id: '',
        area_id: '',
        class_level: '',
        classroom_id: '',
        week_days: [],
        time_range: '',

    });

    /* ---------------- Detay çek ---------------- */
    useEffect(() => { if (mode === 'update' && id) getAttendance(Number(id)); },
        [mode, id, getAttendance]);

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


            });
        }
    }, [mode, fetched]);

    /* ---------------- Field tanımları ---------------- */
    const fields: FieldDefinition[] = useMemo(() => [
        { name: 'dateRange', label: 'Tarih Aralığı', type: 'doubledate', required: true },
        { name: 'club_name', label: 'Kulüp Adı', type: 'text', required: true },

        {
            name: 'group_id', label: 'Grup Adı', type: 'select', required: true,
            onClick: () => setEnabled(e => ({ ...e, groups: true })),
            options: (groupsData ?? []).map(g => ({ value: String(g.id), label: g.name })),
        },
        {
            name: 'area_id', label: 'Kulüp Alanı', type: 'select', required: true,
            onClick: () => setEnabled(e => ({ ...e, areas: true })),
            options: (usedAreasData ?? []).map(a => ({ value: String(a.id), label: a.name })),
        },
        {
            name: 'class_level', label: 'Sınıf Seviyesi', type: 'select',
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: () => setEnabled(e => ({ ...e, classes: true })),
            options: (levelsData ?? []).map(l => ({ value: String(l.id), label: l.name })),
        },
        {
            name: 'classroom_id', label: 'Sınıf / Şube', type: 'select',
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            options: (classroomData ?? []).map(c => ({ value: String(c.id), label: c.name })),
        },

        {
            name: 'week_days', label: 'Haftanın Günleri', type: 'multiselect',
            options: [
                { value: '1', label: 'Pzt' }, { value: '2', label: 'Sal' }, { value: '3', label: 'Çar' },
                { value: '4', label: 'Per' }, { value: '5', label: 'Cum' }, { value: '6', label: 'Cmt' },
                { value: '7', label: 'Paz' },
            ],
        },

        { name: 'time_range', label: 'Saat Aralığı', type: 'text' },



    ], [groupsData, usedAreasData, levelsData, classroomData

    ]);

    /* ---------------- submit ---------------- */
    async function handleSubmit(
        values: FormValues,
        helpers: FormikHelpers<FormValues>,
    ) {
        if (mode === 'add') {
            await addNewAttendance(values as any);
        } else if (mode === 'update' && id) {
            await updateExistingAttendance({
                attendanceId: Number(id),
                payload: values,
            } as any);
        }
        onRefresh();
        onClose();
        helpers.setSubmitting(false);
    }

    const loading = mode === 'add'
        ? addSt === 'LOADING'
        : updSt === 'LOADING' || detSt === 'LOADING';
    const error = addErr || updErr || detErr || null;

    /* ---------------- render ---------------- */
    return (
        <ReusableModalForm
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

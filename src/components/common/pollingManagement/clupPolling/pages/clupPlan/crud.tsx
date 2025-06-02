
import { useEffect, useMemo, useState } from 'react';
import { FormikHelpers } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

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
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';

/* ─────────────── types ─────────────── */
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
    student_ids: string[];
}


export default function ClubPlanModal({
    show, onClose, onRefresh,
}: { show: boolean; onClose: () => void; onRefresh: () => void }) {


    const { id } = useParams<{ id?: string }>();
    const mode = id ? 'update' : 'add';
    const navigate = useNavigate();


    const [levelId, setLevelId] = useState<number | null>(null);
    const [classId, setClassId] = useState<number | null>(null);


    const [enabled, setEnabled] = useState({
        groups: false,
        areas: false,
        levels: false,
        managers: false,
        teachers: false,
        students: false,
    });


    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups });
    const { usedAreasData = [] } = useUsedAreasList({ enabled: enabled.areas });
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });

    const { classroomData = [] } = useClassroomList({
        enabled: enabled.levels && !!levelId,
        class_level: levelId ?? undefined,
        branchId: 0,
    });

    const { usersData: managersData = [] } = useUsersTable({
        enabled: enabled.managers,
        role_id: 2,
        pageSize: 999,
    });

    const { attendanceTeachersData: teachersData = [] } =
        useAttendanceTeachersTable({
            enabled: enabled.teachers && !!levelId,
            level_id: levelId ?? undefined,
            page: 1, paginate: 999,
        });

    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({
            enabled: enabled.students && (!!levelId || !!classId),
            level_id: levelId ?? undefined,
            classroom_id: classId ?? undefined,
            page: 1, pageSize: 1000,
        });


    const { addNewAttendance, status: addSt, error: addErr } = useAttendanceAdd();
    const { updateExistingAttendance, status: updSt, error: updErr } = useAttendanceUpdate();
    const { attendance: fetched, getAttendance,
        status: detSt, error: detErr } = useAttendanceDetail({
            attendanceId: Number(id), enabled: !!id,
        });


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
        student_ids: [],
    });


    useEffect(() => { if (mode === 'update' && id) getAttendance(+id); }, [id]);
    useEffect(() => {
        if (mode === 'update' && fetched) {
            setInitial({
                dateRange: { startDate: fetched.start_date, endDate: fetched.end_date },
                club_name: fetched.club_name ?? '',
                group_id: String(fetched.group_id ?? ''),
                area_id: String(fetched.area_id ?? ''),
                class_level: String(fetched.level_id ?? ''),
                classroom_id: String(fetched.classroom_id ?? ''),
                week_days: (fetched.week_days ?? []).map(String),
                time_range: fetched.time_range ?? '',
                manager_ids: (fetched.manager_ids ?? []).map(String),
                teacher_ids: (fetched.teachers ?? []).map((t: any) => String(t.id)),
                student_ids: (fetched.students ?? []).map((s: any) => String(s.id)),
            });
            const lvl = Number(fetched.level_id); if (!isNaN(lvl)) setLevelId(lvl);
            const cls = Number(fetched.classroom_id); if (!isNaN(cls)) setClassId(cls);

            setEnabled({
                groups: true, areas: true, levels: true,
                managers: true, teachers: true, students: true
            });
        }
    }, [fetched, mode]);


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
            name: 'class_level', label: 'Sınıf Seviyesi', type: 'select', required: true,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: (val, formik) => {
                formik.setFieldValue('class_level', val);
                formik.setFieldValue('classroom_id', '');
                formik.setFieldValue('student_ids', []);
                const n = Number(val); if (!isNaN(n)) { setLevelId(n); setClassId(null); }
            },
            options: levelsData.map(l => ({ value: String(l.id), label: l.name }))
        },

        {
            name: 'classroom_id', label: 'Sınıf / Şube', type: 'select',
            dependencyKey: 'class_level',
            onClick: () => setEnabled(e => ({ ...e, levels: true })), /* classroom da seviyeye bağlı */
            onChange: (val, formik) => {
                formik.setFieldValue('classroom_id', val);
                formik.setFieldValue('student_ids', []);
                const n = Number(val); if (!isNaN(n)) setClassId(n);
                setEnabled(e => ({ ...e, students: true }));
            },
            options: classroomData.map(c => ({ value: String(c.id), label: c.name }))
        },

        {
            name: 'week_days', label: 'Haftanın Günleri', type: 'multiselect',
            options: [
                { value: '1', label: 'Pazartesi' }, { value: '2', label: 'Salı' },
                { value: '3', label: 'Çarşamba' }, { value: '4', label: 'Perşembe' },
                { value: '5', label: 'Cuma' }, { value: '6', label: 'Cumartesi' },
                { value: '7', label: 'Pazar' },
            ]
        },

        { name: 'time_range', label: 'Saat Aralığı', type: 'text', placeholder: '09:00 - 10:00' },

        {
            name: 'manager_ids', label: 'Görevli Yöneticiler', type: 'multiselect',
            onClick: () => setEnabled(e => ({ ...e, managers: true })),
            options: managersData.map(u => ({ value: String(u.id), label: u.name_surname || u.name || '-' })),
            selectProps: (formik: any) => ({
                isMulti: true, closeMenuOnSelect: false,
                isOptionDisabled: () => formik.values.manager_ids.length >= 5
            })
        },

        {
            name: 'teacher_ids', label: 'Görevli Öğretmenler', type: 'multiselect',
            onClick: () => setEnabled(e => ({ ...e, teachers: true })),
            options: teachersData.map(t => ({
                value: String(t.teacher_id), label: t.teacher?.name_surname || '-'
            })),
            selectProps: { isMulti: true, closeMenuOnSelect: false }
        },

        {
            name: 'student_ids', label: 'Öğrenciler', type: 'multiselect',
            dependencyKey: 'classroom_id',
            onClick: () => setEnabled(e => ({ ...e, students: true })),
            options: studentsData.map((s: any) => ({
                value: String(s.student_id),
                label: s.student ? `${s.student.first_name} ${s.student.last_name}` : '-',
            })),
            selectProps: { isMulti: true, closeMenuOnSelect: false }
        },

    ], [groupsData, usedAreasData, levelsData, classroomData,
        managersData, teachersData, studentsData]);

    /* —— submit —— */
    async function handleSubmit(vals: FormValues, helpers: FormikHelpers<FormValues>) {
        const payload = {
            name: vals.club_name,
            group_id: +vals.group_id || null,
            area_id: +vals.area_id || null,
            level_id: +vals.class_level || null,
            classroom_id: +vals.classroom_id || null,
            start_date: vals.dateRange.startDate,
            end_date: vals.dateRange.endDate,
            week_days: vals.week_days.map(Number),
            time_range: vals.time_range,
            manager_ids: vals.manager_ids.map(Number),
            teacher_ids: vals.teacher_ids.map(Number),
            student_ids: vals.student_ids.map(Number),
        };

        try {
            if (mode === 'add') await addNewAttendance(payload as any);
            else if (id) await updateExistingAttendance({ attendanceId: +id, payload } as any);

            helpers.setSubmitting(false);
            onRefresh(); onClose(); navigate(-1);
        } catch (e) { console.error(e); helpers.setSubmitting(false); }
    }

    const isLoading = mode === 'add'
        ? addSt === 'LOADING'
        : updSt === 'LOADING' || detSt === 'LOADING';

    return (
        <ReusableModalForm<FormValues>
            show={show}
            mode="single"
            title={mode === 'add' ? 'Kulüp Ekle' : 'Kulüp Düzenle'}
            fields={fields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Ekle' : 'Güncelle'}
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={addErr || updErr || detErr || null}
            autoGoBackOnModalClose
            onClose={() => { onClose(); navigate(-1); }}
        />
    );
}

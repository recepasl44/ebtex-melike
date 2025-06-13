/* -------------------------------------------------------------------------- */
/*  AssignmentCrudModal.tsx                                                   */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { FormikHelpers, FormikValues } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';

import { useAssignmentAdd } from '../../../../hooks/assignments/useAdd';
import { useAssignmentUpdate } from '../../../../hooks/assignments/useUpdate';
import { useAssignmentDetail } from '../../../../hooks/assignments/useDetail';
import type { AssignmentsAddPayload } from '../../../../../types/assignments/add';

import { useLevelsTable } from '../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../hooks/classrooms/useList';
import { useLessonList } from '../../../../hooks/lessons/useList';
import { useUnitsTable } from '../../../../hooks/units/useList';
import { useSourcesList } from '../../../../hooks/sources/useList';


interface Props {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

interface IForm extends FormikValues {
    program_id: number;
    level_id: number;
    classroom_id: number;
    lesson_id: number;
    unit_id: number;
    source_id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
}

const AssignmentCrudModal: React.FC<Props> = ({ onClose, onRefresh }) => {
    const { id } = useParams<{ id?: string }>();
    const mode = id ? 'update' : 'add';
    const navigate = useNavigate();

    /* --------------------------- form state -------------------------------- */
    const [initial, setInitial] = useState<IForm>({
        program_id: 0,
        level_id: 0,
        classroom_id: 0,
        lesson_id: 0,
        unit_id: 0,
        source_id: 0,
        title: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    /* dinamik metinler */
    const [classSection, setClassSection] = useState('');
    const [subject, setSubject] = useState('');
    const [unitTopic, setUnitTopic] = useState('');

    /* enable bayrakları */
    const [enable, setEnable] = useState({
        level_id: true,
        classroom_id: false,
        lesson_id: false,
        unit_id: false,
        source_id: false,
    });

    const [levelId, setLevelId] = useState<number | null>(null);
    const [lessonId, setLessonId] = useState<number | null>(null);

    /* --------------------------- look-ups ---------------------------------- */
    const { levelsData = [] } = useLevelsTable({ enabled: enable.level_id });
    const { classroomData = [] } = useClassroomList({ enabled: enable.classroom_id && !!levelId, level_id: levelId ?? 0, branchId: 0 });
    const { lessonsData = [] } = useLessonList({ enabled: enable.lesson_id && !!levelId, level_id: levelId ?? 0 });
    const { unitsData = [] } = useUnitsTable({ enabled: enable.unit_id && !!lessonId, filter: { lesson_id: lessonId } });
    const { sourcesData = [] } = useSourcesList({ enabled: enable.source_id });

    /* --------------------------- options ----------------------------------- */
    const levelOpts = useMemo(() => levelsData.map(l => ({ value: l.id, label: l.name, program_id: l.program_id })), [levelsData]);
    const classOpts = useMemo(() => classroomData.map(c => ({ value: c.id, label: c.name })), [classroomData]);
    const lessonOpts = useMemo(() => lessonsData.map(l => ({ value: l.id, label: l.name })), [lessonsData]);
    const unitOpts = useMemo(() => unitsData.map(u => ({ value: u.id, label: u.name })), [unitsData]);
    const sourceOpts = useMemo(() => sourcesData.map(s => ({ value: s.id, label: s.name })), [sourcesData]);

    /* ------------------------------ CRUD hooks ----------------------------- */
    const { getAssignment, assignment: fetched } = useAssignmentDetail();
    const { addNewAssignment, status: addSt, error: addErr } = useAssignmentAdd();
    const { updateExistingAssignment, status: updSt, error: updErr } = useAssignmentUpdate();

    /* --------------------------- effects ----------------------------------- */
    useEffect(() => { if (mode === 'update' && id) getAssignment(+id); }, [mode, id]);

    useEffect(() => {
        if (mode === 'update' && fetched && !Array.isArray(fetched)) {
            setInitial({
                program_id: fetched.program_id ?? 0,
                level_id: fetched.level_id ?? 0,
                classroom_id: fetched.classroom_id ?? 0,
                lesson_id: fetched.lesson_id ?? 0,
                unit_id: fetched.unit_id ?? 0,
                source_id: Number(fetched.source_id) || 0,
                title: fetched.title ?? '',
                description: fetched.description ?? '',
                start_date: fetched.start_date ?? '',
                end_date: fetched.end_date ?? '',
            });
            setClassSection(fetched.class_section ?? '');
            setSubject(fetched.subject ?? '');
            setUnitTopic(fetched.unit_topic ?? '');
            setLevelId(fetched.level_id ?? null);
            setLessonId(fetched.lesson_id ?? null);
            setEnable({ level_id: true, classroom_id: true, lesson_id: true, unit_id: true, source_id: true });
        }
    }, [fetched, mode]);

    /* ------------------------- field list ---------------------------------- */
    const getFields = useCallback((): FieldDefinition[] => [
        {
            name: 'level_id', label: 'Sınıf Seviyesi', type: 'select', required: true,
            options: levelOpts,
            onClick: () => setEnable(e => ({ ...e, level_id: true })),
            onChange: (v, fm) => {
                const lvl = Number(v) || 0;
                const prg = levelOpts.find(o => o.value === lvl)?.program_id ?? 0;
                setLevelId(lvl || null);
                setLessonId(null);
                setEnable(e => ({ ...e, classroom_id: false, lesson_id: false, unit_id: false }));
                fm.setValues({ ...fm.values, program_id: prg, level_id: lvl, classroom_id: 0, lesson_id: 0, unit_id: 0 });
            },
        },
        {
            name: 'classroom_id', label: 'Sınıf / Şube', type: 'select', required: true,
            options: classOpts,
            onClick: () => setEnable(e => ({ ...e, classroom_id: true })),
            onChange: (v, fm) => {
                const id = Number(v) || 0;
                const label = classOpts.find(o => o.value === id)?.label ?? '';
                setClassSection(label);
                fm.setFieldValue('classroom_id', id);
            },
        },
        {
            name: 'lesson_id', label: 'Ders', type: 'select', required: true,
            options: lessonOpts,
            onClick: () => setEnable(e => ({ ...e, lesson_id: true })),
            onChange: (v, fm) => {
                const id = Number(v) || 0;
                const label = lessonOpts.find(o => o.value === id)?.label ?? '';
                setLessonId(id || null);
                setSubject(label);
                fm.setFieldValue('lesson_id', id);
                fm.setFieldValue('unit_id', 0);
            },
        },
        {
            name: 'unit_id', label: 'Ünite / Konu', type: 'select', required: true,
            options: unitOpts,
            onClick: () => setEnable(e => ({ ...e, unit_id: true })),
            onChange: (v, fm) => {
                const id = Number(v) || 0;
                const label = unitOpts.find(o => o.value === id)?.label ?? '';
                setUnitTopic(label);
                fm.setFieldValue('unit_id', id);
            },
        },
        {
            name: 'source_id', label: 'Kaynak', type: 'select',
            options: sourceOpts,
            onClick: () => setEnable(e => ({ ...e, source_id: true })),
        },
        { name: 'title', label: 'Ödev Başlığı', type: 'text', required: true },
        { name: 'start_date', label: 'Başlangıç Tarihi', type: 'date', required: true },
        { name: 'end_date', label: 'Bitiş Tarihi', type: 'date', required: true },
        { name: 'description', label: 'Açıklama', type: 'textarea' },
    ], [levelOpts, classOpts, lessonOpts, unitOpts, sourceOpts]);

    /* ----------------------------- submit ---------------------------------- */
    const handleSubmit = async (vals: IForm, _h: FormikHelpers<IForm>) => {
        const loggedInTeacherId = 1;      // <-- gerçek projede oturumdan okunacak

        const payload: AssignmentsAddPayload = {
            ...vals,
            teacher_id: loggedInTeacherId,          // öğretmen id’si otomatik
            schooltype_id: 1,
            course_id: 1,
            class_section: classSection,
            subject: subject,
            unit_topic: unitTopic,
            teacher_file: 1,
            planned_status: 1,
        };

        if (mode === 'add')
            await addNewAssignment(payload);
        else if (id)
            await updateExistingAssignment({ assignmentId: +id, payload });

        onRefresh();
        navigate(-1);
    };

    /* --------------------------- render ------------------------------------ */
    return (
        <ReusableModalForm<IForm>
            show={true}
            title={mode === 'add' ? 'Ödev Bilgileri' : 'Ödev Düzenle'}
            fields={getFields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Ekle' : 'Kaydet'}
            cancelButtonLabel="Vazgeç"
            isLoading={mode === 'add' ? addSt === 'LOADING' : updSt === 'LOADING'}
            error={(mode === 'add' ? addErr : updErr) || null}
            onClose={() => { onClose(); navigate(-1); }}
            autoGoBackOnModalClose
            mode="double"
        />
    );
};

export default AssignmentCrudModal;

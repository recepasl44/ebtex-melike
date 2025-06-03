import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikHelpers, FormikValues } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';

import { useAssignmentStudentAdd } from '../../../../hooks/assignmentStudents/useAdd';
import { useAssignmentStudentUpdate } from '../../../../hooks/assignmentStudents/useUpdate';
import { useAssignmentStudentDetail } from '../../../../hooks/assignmentStudents/useDetail';

import { useClassroomList } from '../../../../hooks/classrooms/useList';
import { useLevelsTable } from '../../../../hooks/levels/useList';
import { useLessonList } from '../../../../hooks/lessons/useList';
import { useUnitsTable } from '../../../../hooks/units/useList';
import { useListStudents } from '../../../../hooks/student/useList';
import { useSourcesList } from '../../../../hooks/sources/useList';


interface Props {
    show: boolean;
    token: string;
    onClose: () => void;
    onRefresh: () => void;
}

interface IForm extends FormikValues {
    classroom_id: number;
    level_id: number;
    lesson_id: number;
    unit_id: number;
    student_id: number;
    source_id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    question_count: number;
    student_file: File | null;
    delivery_format: 'online' | 'face-to-face';
    planned_status: number;
    completion_rate: number;
    delay_day: number;
}

const statusOptions = [
    { value: 0, label: 'Eksik' },
    { value: 1, label: 'Aktif' },
    { value: 2, label: 'Verildi' },
];

const deliveryOpts = [
    { value: 'online', label: 'Online' },
    { value: 'face-to-face', label: 'Yüz Yüze' },
];
const AssignmentsCheckCrudModal: React.FC<Props> = ({
    show,
    onClose,
    onRefresh,
}) => {
    const { id } = useParams<{ id?: string }>();
    const mode = id ? 'update' : 'add';
    const nav = useNavigate();

    const { getAssignmentStudent, assignmentStudent } =
        useAssignmentStudentDetail();
    const { addNewAssignmentStudent, status: addSt, error: addErr } =
        useAssignmentStudentAdd();
    const { updateExistingAssignmentStudent, status: updSt, error: updErr } =
        useAssignmentStudentUpdate();


    const [levelId, setLevelId] = useState<number | null>(null);
    const [lessonId, setLessonId] = useState<number | null>(null);

    const [enabled, setEnabled] = useState({
        level: false,
        classroom: false,
        lesson: false,
        unit: false,
        student: false,
        source: false,
    });

    const { levelsData = [] } = useLevelsTable({ enabled: enabled.level });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classroom && !!levelId,
        level_id: levelId ?? undefined,
        branchId: 0,
    });
    const { lessonsData = [] } = useLessonList({
        enabled: enabled.lesson && !!levelId,
        level_id: levelId ?? undefined,
    });
    const { unitsData = [] } = useUnitsTable({
        enabled: enabled.unit && !!lessonId,
        lesson_id: lessonId ?? undefined,
    });
    const { data: studentList = [] } = useListStudents({ enabled: enabled.student });
    const { sourcesData = [] } = useSourcesList({ enabled: enabled.source });

    const levelOpts = useMemo(
        () => levelsData.map((l) => ({ value: l.id, label: l.name })),
        [levelsData],
    );
    const classroomOpts = useMemo(
        () => classroomData.map((c: { id: any; name: any; }) => ({ value: c.id, label: c.name })),
        [classroomData],
    );
    const lessonOpts = useMemo(
        () => lessonsData.map((l) => ({ value: l.id, label: l.name })),
        [lessonsData],
    );
    const unitOpts = useMemo(
        () => unitsData.map((u) => ({ value: u.id, label: u.name })),
        [unitsData],
    );
    const studentOpts = useMemo(
        () => studentList.map((s) => ({ value: s.id, label: s.name })),
        [studentList],
    );
    const sourceOpts = useMemo(
        () => sourcesData.map((s) => ({ value: s.id, label: s.name })),
        [sourcesData],
    );

    const [initial, setInitial] = useState<IForm>({
        classroom_id: 0,
        level_id: 0,
        lesson_id: 0,
        unit_id: 0,
        student_id: 0,
        planned_status: 0,
        source_id: 0,
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        question_count: 0,
        completion_rate: 0,
        delay_day: 0,
        student_file: null,
        delivery_format: 'online',
    });

    useEffect(() => {
        if (mode === 'update' && id) getAssignmentStudent(+id);
    }, [mode, id]);

    useEffect(() => {
        if (mode === 'update' && assignmentStudent && !Array.isArray(assignmentStudent)) {
            setInitial({
                classroom_id: assignmentStudent.classroom_id ?? 0,
                level_id: assignmentStudent.level_id ?? 0,
                lesson_id: assignmentStudent.lesson_id ?? 0,
                unit_id: assignmentStudent.unit_id ?? 0,
                student_id: assignmentStudent.student_id ?? 0,
                planned_status: assignmentStudent.planned_status ?? 0,
                source_id: Number(assignmentStudent.source_id) || 0,
                title: assignmentStudent.title || '',
                description: assignmentStudent.description || '',
                start_date: assignmentStudent.start_date || '',
                end_date: assignmentStudent.end_date || '',
                question_count: assignmentStudent.question_count ?? 0,
                completion_rate: assignmentStudent.completion_rate ?? 0,
                delay_day: assignmentStudent.delay_days ?? 0,
                student_file: null,
                delivery_format: (assignmentStudent.delivery_format === 'online' || assignmentStudent.delivery_format === 'face-to-face')
                    ? assignmentStudent.delivery_format
                    : 'online',
            });

            setLevelId(assignmentStudent.level_id ?? null);
            setLessonId(assignmentStudent.lesson_id ?? null);
            setEnabled({
                level: true,
                classroom: true,
                lesson: true,
                unit: true,
                student: true,
                source: true,
            });
        }
    }, [assignmentStudent, mode]);

    const getFields = useCallback(
        (_v: IForm): FieldDefinition[] => [
            {
                name: 'level_id',
                label: 'Sınıf Seviyesi',
                type: 'select',
                required: true,
                options: levelOpts,
                onChange: (val: string, formik) => {
                    const id = Number(val) || 0;
                    setLevelId(id || null);
                    setLessonId(null);
                    setEnabled((e) => ({
                        ...e,
                        classroom: false,
                        lesson: false,
                        unit: false,
                    }));
                    formik.setValues({
                        ...formik.values,
                        level_id: id,
                        classroom_id: 0,
                        lesson_id: 0,
                        unit_id: 0,
                    });
                },
            },
            { name: 'end_date', label: 'Bitiş Tarihi', type: 'date', required: true },
            {
                name: 'classroom_id',
                label: 'Sınıf / Şube',
                type: 'select',
                required: true,
                options: classroomOpts,
                dependencyKey: 'level_id',
                onClick: () => setEnabled((e) => ({ ...e, classroom: true })),
            },
            { name: 'delay_day', label: 'Gecikme Gün', type: 'number', min: 0 },
            {
                name: 'student_id',
                label: 'Öğrenci',
                type: 'select',
                required: true,
                options: studentOpts,
                onClick: () => setEnabled((e) => ({ ...e, student: true })),
            },
            {
                name: 'question_count',
                label: 'Soru Sayısı',
                type: 'number',
                min: 0,
            },
            {
                name: 'lesson_id',
                label: 'Ders',
                type: 'select',
                required: true,
                options: lessonOpts,
                dependencyKey: 'level_id',
                onClick: () => setEnabled((e) => ({ ...e, lesson: true })),
                onChange: (val: string, formik) => {
                    const id = Number(val) || 0;
                    setLessonId(id || null);
                    setEnabled((e) => ({ ...e, unit: false }));
                    formik.setFieldValue('unit_id', 0);
                },
            },
            {
                name: 'completion_rate',
                label: 'Tamamlama Oranı',
                type: 'number',
                min: 0,
            },
            {
                name: 'unit_id',
                label: 'Ünite / Konu',
                type: 'select',
                required: true,
                options: unitOpts,
                dependencyKey: 'lesson_id',
                onClick: () => setEnabled((e) => ({ ...e, unit: true })),
            },
            { name: 'student_file', label: 'Dosya Yükleme', type: 'file' },
            { name: 'title', label: 'Ödev Başlığı', type: 'text', required: true },
            {
                name: 'delivery_format',
                label: 'Teslim Formatı',
                type: 'select',
                required: true,
                options: deliveryOpts,
            },
            {
                name: 'source_id',
                label: 'Kaynaklar',
                type: 'select',
                options: sourceOpts,
                onClick: () => setEnabled((e) => ({ ...e, source: true })),
            },
            { name: 'description', label: 'Açıklama', type: 'textarea' },
            {
                name: 'start_date',
                label: 'Başlangıç Tarihi',
                type: 'date',
                required: true,
            },
            {
                name: 'planned_status',
                label: 'Durum',
                type: 'select',
                required: true,
                options: statusOptions,
            },
        ],
        [levelOpts, classroomOpts, studentOpts, lessonOpts, unitOpts, sourceOpts],
    );

    const handleSubmit = async (vals: IForm, _h: FormikHelpers<IForm>) => {
        if (mode === 'add') await addNewAssignmentStudent({
            ...vals,
            id: 0,
            assigment_id: 0,
        });
        else if (id)
            await updateExistingAssignmentStudent({
                assignmentStudentId: +id,
                payload: vals,
            });
        onRefresh();
        nav(-1);
    };

    const isLoading = (mode === 'add' ? addSt : updSt) === 'LOADING';
    const combinedError = (mode === 'add' ? addErr : updErr) || null;


    return (
        <ReusableModalForm<IForm>
            show={show}
            title={mode === 'add' ? 'Yeni Ödev Tanımla' : 'Ödev Tanımlama Düzenle'}
            fields={getFields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Ekle' : 'Kaydet'}
            cancelButtonLabel="İptal"
            isLoading={isLoading}
            error={combinedError}
            onClose={() => {
                onClose();
                nav(-1);
            }}
            autoGoBackOnModalClose
            mode="double"

        />
    );
};

export default AssignmentsCheckCrudModal;

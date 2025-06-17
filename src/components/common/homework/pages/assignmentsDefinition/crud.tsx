import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { FormikHelpers, FormikValues } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';

import { useAssignmentStudentAdd } from '../../../../hooks/assignmentStudents/useAdd';
import { useAssignmentStudentUpdate } from '../../../../hooks/assignmentStudents/useUpdate';
import { useAssignmentStudentDetail } from '../../../../hooks/assignmentStudents/useDetail';

import { useAssignmentsList } from '../../../../hooks/assignments/useList';
import { useAssignmentDetail } from '../../../../hooks/assignments/useDetail';

import { useClassroomList } from '../../../../hooks/classrooms/useList';
import { useLevelsTable } from '../../../../hooks/levels/useList';
import { useLessonList } from '../../../../hooks/lessons/useList';
import { useUnitsTable } from '../../../../hooks/units/useList';
import { useListStudents } from '../../../../hooks/student/useList';
import { useSourcesList } from '../../../../hooks/sources/useList';
import { AssignmentData } from '../../../../../types/assignments/list';


interface Props {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}
export type DeliveryFmt = 'online' | 'face-to-face';

export interface IForm extends FormikValues {
    assignment_id: number;
    classroom_id: number;
    level_id: number;
    lesson_id: number;
    unit_id: number;
    student_id: number;
    planned_status: number;
    source_id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    question_count: number;
    student_file: File | null;
    delivery_format: DeliveryFmt;
}

const plannedOpts = [
    { value: 1, label: 'Planlandı' },
    { value: 0, label: 'Planlanmadı' },
];
const deliveryOpts = [
    { value: 'online', label: 'Online' },
    { value: 'face-to-face', label: 'Yüz Yüze' },
];

const AssignmentStudentCrudModal: React.FC<Props> = ({
    show,
    onClose,
    onRefresh,
}) => {
    const { id } = useParams<{ id?: string }>();
    const mode = id ? 'update' : 'add';
    const nav = useNavigate();

    const { state } = useLocation() as { state?: { assignment_id?: number } };
    const assignmentIdParam = state?.assignment_id ?? 0;


    const [initial, setInitial] = useState<IForm>({
        assignment_id: assignmentIdParam,
        classroom_id: 0,
        level_id: 0,
        lesson_id: 0,
        unit_id: 0,
        student_id: 0,
        planned_status: assignmentIdParam ? 1 : 0,
        source_id: 0,
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        question_count: 0,
        student_file: null,
        delivery_format: 'online',
    });

    const [enabled, setEnabled] = useState({
        level_id: false,
        classroom_id: false,
        lesson_id: false,
        unit_id: false,
        student_id: false,
        source_id: true,
    });

    const [levelId, setLevelId] = useState<number | null>(null);
    const [lessonId, setLessonId] = useState<number | null>(null);
    const [unitId, setUnitId] = useState<number | null>(null);


    const { levelsData = [] } = useLevelsTable({ enabled: enabled.level_id });
    const { classroomData = [] } = useClassroomList({
        enabled: enabled.classroom_id && !!levelId,
        level_id: levelId ?? undefined,
        branchId: 0,
    });
    const { lessonsData = [] } = useLessonList({
        enabled: enabled.lesson_id && !!levelId,
        level_id: levelId ?? undefined,
    });
    const { unitsData = [] } = useUnitsTable({
        enabled: enabled.unit_id && !!lessonId,
        lesson_id: lessonId ?? undefined,
    });
    const { data: studentsData = [] } = useListStudents({
        enabled: enabled.student_id,
        page: 1,
        pageSize: 100,
    });
    const { sourcesData = [] } = useSourcesList({ enabled: enabled.source_id });

    /* planlanmış ödev havuzu (otomatik doldurma için) */
    const {
        assignmentsData: plannedCandidates,
        refetch: fetchPlanned,
    } = useAssignmentsList({
        enabled: false,
        planned_only: 1,
        level_id: levelId ?? undefined,
        lesson_id: lessonId ?? undefined,
        unit_id: unitId ?? undefined,
        page: 1,
        pageSize: 1,
    });


    const { getAssignment, assignment: assignmentDetail } = useAssignmentDetail();
    useEffect(() => {
        if (assignmentIdParam && mode === 'add') getAssignment(assignmentIdParam);
    }, [assignmentIdParam, mode]);


    useEffect(() => {
        if (assignmentDetail && mode === 'add') {
            setInitial((p) => ({
                ...p,
                assignment_id: assignmentDetail.id,
                title: assignmentDetail.title ?? '',
                description: assignmentDetail.description ?? '',
                level_id: assignmentDetail.level_id ?? 0,
                lesson_id: assignmentDetail.lesson_id ?? 0,
                unit_id: assignmentDetail.unit_id ?? 0,
                source_id: Number(assignmentDetail.source_id) || 0,
                start_date: assignmentDetail.start_date ?? '',
                end_date: assignmentDetail.end_date ?? '',
                question_count: assignmentDetail.question_count ?? 0,
                planned_status: 1,
            }));
            setLevelId(assignmentDetail.level_id ?? null);
            setLessonId(assignmentDetail.lesson_id ?? null);
            setUnitId(assignmentDetail.unit_id ?? null);
            setEnabled((e) => ({
                ...e,
                level_id: true,
                classroom_id: true,
                lesson_id: true,
                unit_id: true,
                student_id: true,
            }));
        }
    }, [assignmentDetail, mode]);

    const { getAssignmentStudent, assignmentStudent: fetched } =
        useAssignmentStudentDetail();
    const { addNewAssignmentStudent, status: addSt, error: addErr } =
        useAssignmentStudentAdd();
    const { updateExistingAssignmentStudent, status: updSt, error: updErr } =
        useAssignmentStudentUpdate();

    useEffect(() => {
        if (mode === 'update' && id) getAssignmentStudent(+id);
    }, [mode, id]);

    useEffect(() => {
        if (mode === 'update' && fetched && !Array.isArray(fetched)) {
            setInitial({
                assignment_id: fetched.assignment_id,
                classroom_id: fetched.classroom_id ?? 0,
                level_id: fetched.level_id ?? 0,
                lesson_id: fetched.lesson_id ?? 0,
                unit_id: fetched.unit_id ?? 0,
                student_id: fetched.student_id ?? 0,
                planned_status: fetched.planned_status ?? 0,
                source_id: Number(fetched.source_id) || 0,
                title: fetched.title || '',
                description: fetched.description || '',
                start_date: fetched.start_date || '',
                end_date: fetched.end_date || '',
                question_count: fetched.question_count ?? 0,
                student_file: null,
                delivery_format:
                    fetched.delivery_format === 'face-to-face' ? 'face-to-face' : 'online',
            });
            setLevelId(fetched.level_id ?? null);
            setLessonId(fetched.lesson_id ?? null);
            setUnitId(fetched.unit_id ?? null);
            setEnabled({
                level_id: true,
                classroom_id: true,
                lesson_id: true,
                unit_id: true,
                student_id: true,
                source_id: true,
            });
        }
    }, [fetched, mode]);

    const levelOpts = useMemo(() => levelsData.map(l => ({ value: l.id, label: l.name })), [levelsData]);
    const classOpts = useMemo(() => classroomData.map(c => ({ value: c.id, label: c.name })), [classroomData]);
    const lessonOpts = useMemo(() => lessonsData.map(l => ({ value: l.id, label: l.name })), [lessonsData]);
    const unitOpts = useMemo(() => unitsData.map(u => ({ value: u.id, label: u.name })), [unitsData]);
    const studentOpts = useMemo(
        () => studentsData.map(s => ({ value: s.id, label: `${s.first_name} ${s.last_name}` })),
        [studentsData],
    );
    const sourceOpts = useMemo(() => sourcesData.map(s => ({ value: s.id, label: s.name })), [sourcesData]);


    const getFields = useCallback(
        (): FieldDefinition[] => [
            {
                name: 'planned_status',
                label: 'Kategori',
                type: 'select',
                required: true,
                options: plannedOpts,
                onChange: async (v, f) => {
                    const val = Number(v);
                    f.setFieldValue('planned_status', val);

                    if (val === 1 && levelId && lessonId && unitId) {
                        await fetchPlanned();
                        const list: AssignmentData[] = plannedCandidates || [];
                        const hit = list[0];
                        if (hit) {
                            f.setValues({
                                ...f.values,
                                assignment_id: hit.id,
                                title: hit.title ?? '',
                                description: hit.description ?? '',
                                start_date: hit.start_date ?? '',
                                end_date: hit.end_date ?? '',
                                question_count: hit.question_count ?? 0,
                                source_id: Number(hit.source_id) || 0,
                                planned_status: 1,
                            });
                        }
                    } else if (val === 0) {
                        f.setFieldValue('assignment_id', 0);
                        f.setFieldValue('title', '');
                    }
                },

            },
            {
                name: 'level_id',
                label: 'Sınıf Seviyesi',
                type: 'select',
                required: true,
                options: levelOpts,
                onClick: () => setEnabled(e => ({ ...e, level_id: true })),
                onChange: (v, f) => {
                    const n = Number(v) || 0;
                    setLevelId(n || null);
                    setLessonId(null);
                    setUnitId(null);
                    setEnabled(e => ({ ...e, classroom_id: false, lesson_id: false, unit_id: false }));
                    f.setValues({ ...f.values, level_id: n, classroom_id: 0, lesson_id: 0, unit_id: 0 });
                },
            },
            {
                name: 'classroom_id',
                label: 'Sınıf / Şube',
                type: 'select',
                required: true,
                options: classOpts,
                onClick: () => setEnabled(e => ({ ...e, classroom_id: true })),
            },
            {
                name: 'student_id',
                label: 'Öğrenci',
                type: 'select',
                required: true,
                options: studentOpts,
                onClick: () => setEnabled(e => ({ ...e, student_id: true })),
            },
            {
                name: 'lesson_id',
                label: 'Ders',
                type: 'select',
                required: true,
                options: lessonOpts,
                onClick: () => setEnabled(e => ({ ...e, lesson_id: true })),
                onChange: (v, f) => {
                    const n = Number(v) || 0;
                    setLessonId(n || null);
                    setUnitId(null);
                    setEnabled(e => ({ ...e, unit_id: false }));
                    f.setFieldValue('lesson_id', n);
                    f.setFieldValue('unit_id', 0);
                },
            },
            {
                name: 'unit_id',
                label: 'Ünite / Konu',
                type: 'select',
                required: true,
                options: unitOpts,
                onClick: () => setEnabled(e => ({ ...e, unit_id: true })),
                onChange: (v, f) => {
                    const n = Number(v) || 0;
                    setUnitId(n || null);
                    f.setFieldValue('unit_id', n);
                },
            },
            {
                name: 'title', label: 'Ödev Başlığı', type: 'text', required: true },
            {
                name: 'source_id',
                label: 'Kaynak',
                type: 'select',
                options: sourceOpts,
                onClick: () => setEnabled(e => ({ ...e, source_id: true })),
            },
            { name: 'question_count', label: 'Soru Sayısı', type: 'number', min: 0 },
            { name: 'student_file', label: 'Dosya Yükle', type: 'file' },
            { name: 'start_date', label: 'Başlangıç Tarihi', type: 'date', required: true },
            { name: 'end_date', label: 'Bitiş Tarihi', type: 'date', required: true },
            {
                name: 'delivery_format',
                label: 'Teslim Formatı',
                type: 'select',
                required: true,
                options: deliveryOpts,
            },
            { name: 'description', label: 'Açıklama', type: 'textarea' },
        ],
        [
            levelOpts,
            classOpts,
            lessonOpts,
            unitOpts,
            studentOpts,
            sourceOpts,
            levelId,
            lessonId,
            unitId,
            fetchPlanned,
            plannedCandidates,
        ],
    );

    const handleSubmit = async (vals: IForm, _h: FormikHelpers<IForm>) => {
        if (mode === 'add') {
            await addNewAssignmentStudent({ id: 0, ...vals, assigment_id: 0 });
        } else if (id) {
            await updateExistingAssignmentStudent({ assignmentStudentId: +id, payload: vals });
        }
        onRefresh();
        nav('/homework/definingHomework');
    };

    const isLoading = mode === 'add' ? addSt === 'LOADING' : updSt === 'LOADING';
    const errorMsg = mode === 'add' ? addErr : updErr;

    return (
        <ReusableModalForm<IForm>
            key={initial.assignment_id || 'new'}
            show={show}
            title={mode === 'add' ? 'Yeni Ödev Ekle' : 'Ödev Tanımlama Düzenle'}
            fields={getFields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel="Kaydet"
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={errorMsg || null}
            onClose={() => {
                onClose();
                nav('/homework/definingHomework');
            }}
            autoGoBackOnModalClose
            mode="double"
        />
    );
};

export default AssignmentStudentCrudModal;

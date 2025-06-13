
import { useState, useMemo } from 'react';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm';

import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';
import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';


interface IForm {
    name: string;
    date_range: { startDate: string; endDate: string };
    level_id: number;
    classroom_id: number;
    student_id: number;
    request_type: string;
    lesson_hours: string[];
    description: string;
    document_file: File | null;
    approval_status: number;
}

export default function ExecutiveStatusAdd() {
    const navigate = useNavigate();


    const [fetchFlags, setFetchFlags] = useState({
        levels: false,
        classes: false,
        students: false,
    });


    const { levelsData = [] } = useLevelsTable({ enabled: fetchFlags.levels });
    const { classroomData = [] } = useClassroomList({
        enabled: fetchFlags.classes,
        branchId: 0,
    });
    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({ enabled: fetchFlags.students });


    const {
        addNewAttendance,
        status: addStatus,
        error: addError,
    } = useAttendanceAdd();


    const [initialValues] = useState<IForm>({
        name: '',
        date_range: { startDate: '', endDate: '' },
        level_id: 0,
        classroom_id: 0,
        student_id: 0,
        request_type: '',
        lesson_hours: [],
        description: '',
        document_file: null,
        approval_status: 0,
    });


    const levelOptions = useMemo(
        () => levelsData.map((l: any) => ({ value: l.id, label: l.name })),
        [levelsData],
    );
    const classroomOptions = useMemo(
        () => classroomData.map((c: any) => ({ value: c.id, label: c.name })),
        [classroomData],
    );
    const studentOptions = useMemo(
        () => studentsData.map((s: any) => ({
            value: s.student_id,
            label:
                `${s.student?.first_name ?? ''} ${s.student?.last_name ?? ''}`.trim() ||
                '-',
        })),
        [studentsData],
    );

    const REQUEST_OPTIONS = [
        { value: 'izinli', label: 'İzinli (Özürlü)' },
        { value: 'raporlu', label: 'Raporlu' },
        { value: 'gorevli', label: 'Görevli' },
        { value: 'erken_ayrilma', label: 'Erken Ayrılma' },
    ];

    const APPROVAL_OPTIONS = [
        { value: 0, label: 'Onay Bekliyor' },
        { value: 1, label: 'Onaylandı' },
        { value: 2, label: 'Reddedildi' },
    ];

    const HOUR_OPTIONS = [
        { value: 'all', label: 'Tam Gün' },
        { value: '1', label: '1. Saat' }, { value: '2', label: '2. Saat' },
        { value: '3', label: '3. Saat' }, { value: '4', label: '4. Saat' },
        { value: '5', label: '5. Saat' }, { value: '6', label: '6. Saat' },
        { value: '7', label: '7. Saat' }, { value: '8', label: '8. Saat' },
    ];


    const fields: FieldDefinition[] = [
        {
            name: 'date_range',
            label: 'Tarih Aralığı',
            type: 'doubledate',
            required: true,
        },
        {
            name: 'level_id',
            label: 'Sınıf Seviyesi',
            type: 'select',
            required: true,
            options: levelOptions,
            onClick: () => setFetchFlags(f => ({ ...f, levels: true })),
            onChange: (val, formik) => {
                formik.setFieldValue('level_id', val);
                formik.setFieldValue('classroom_id', 0);
                formik.setFieldValue('student_id', 0);
                setFetchFlags(f => ({ ...f, classes: true, students: false }));
            },
        },
        {
            name: 'classroom_id',
            label: 'Sınıf / Şube',
            type: 'select',
            dependencyKey: 'level_id',
            options: classroomOptions,
            onClick: () => setFetchFlags(f => ({ ...f, classes: true })),
            onChange: (val, formik) => {
                formik.setFieldValue('classroom_id', val);
                formik.setFieldValue('student_id', 0);
                setFetchFlags(f => ({ ...f, students: true }));
            },
        },
        {
            name: 'student_id',
            label: 'Öğrenci',
            type: 'select',
            dependencyKey: 'classroom_id',
            options: studentOptions,
            onClick: () => setFetchFlags(f => ({ ...f, students: true })),
        },
        {
            name: 'request_type',
            label: 'Talep Türü',
            type: 'select',
            required: true,
            options: REQUEST_OPTIONS,
            onChange: (val, formik) => {
                formik.setFieldValue('request_type', val);
                formik.setFieldValue('name', val);
            },
        },
        {
            name: 'lesson_hours',
            label: 'Talep Aralığı (Ders Saatleri)',
            type: 'multiselect',
            options: HOUR_OPTIONS,
            onChange: (values: string[], formik) => {
                if (values.includes('all')) {
                    formik.setFieldValue('lesson_hours', ['all']);
                } else {
                    formik.setFieldValue('lesson_hours', values.filter(v => v !== 'all'));
                }
            },
        },
        { name: 'description', label: 'Açıklama', type: 'textarea' },
        { name: 'document_file', label: 'Belge Yükle', type: 'file' },
        {
            name: 'approval_status',
            label: 'İzin Onayı',
            type: 'select',
            required: true,
            options: APPROVAL_OPTIONS,
        },
    ];

    const handleSubmit = async (
        values: IForm,
        helpers: FormikHelpers<IForm>,
    ) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name || values.request_type);
            formData.append('start_date', values.date_range.startDate);
            formData.append('end_date', values.date_range.endDate);
            formData.append('level_id', String(values.level_id));
            formData.append('classroom_id', String(values.classroom_id));
            formData.append('student_id', String(values.student_id));
            formData.append('request_type', values.request_type);
            formData.append('lesson_hours', JSON.stringify(values.lesson_hours));
            formData.append('description', values.description);
            formData.append('approval_status', String(values.approval_status));
            if (values.document_file) formData.append('document', values.document_file);

            await addNewAttendance(formData);
            helpers.setSubmitting(false);
            navigate(-1);
        } catch (err) {
            helpers.setSubmitting(false);
            console.error(err);
        }
    };


    return (
        <ReusableModalForm<IForm>
            show
            mode="single"
            title="İzin / Rapor Kaydı"
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel="Kaydet"
            cancelButtonLabel="Vazgeç"
            isLoading={addStatus === 'LOADING'}
            error={addError || null}
            autoGoBackOnModalClose
            onClose={() => navigate(-1)}
        />
    );
}

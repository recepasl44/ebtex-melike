/* crud.tsx — Class-Course > Executive Status > Ekle
   ------------------------------------------------- */
import { useState, useMemo } from 'react';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm';

import { useLevelsTable } from '../../../../../hooks/levels/useList';
import { useClassroomList } from '../../../../../hooks/classrooms/useList';
import { useAttendanceStudentsTable } from '../../../../../hooks/attendanceStudent/useList';
import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';

/* ------------------------------------------------------------------ */
/* types */
interface IForm {
    /*  ⬇ backend zorunlu alan */
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

/* ------------------------------------------------------------------ */
export default function ExecutiveStatusAdd() {
    const navigate = useNavigate();

    /* enable flags … (değişmedi) */
    const [enabled, setEnabled] = useState({ levels: false, classes: false, students: false });

    /* look-ups … (değişmedi) */
    const { levelsData = [] } = useLevelsTable({ enabled: enabled.levels });
    const { classroomData = [] } = useClassroomList({ enabled: enabled.classes, branchId: 0 });
    const { attendanceStudentsData: studentsData = [] } =
        useAttendanceStudentsTable({ enabled: enabled.students });

    /* add hook */
    const { addNewAttendance, status: addSt, error: addErr } = useAttendanceAdd();

    /* initial */
    const [initial] = useState<IForm>({
        name: '',                     // <-- eklendi
        date_range: { startDate: '', endDate: '' },
        level_id: 0, classroom_id: 0, student_id: 0,
        request_type: '', lesson_hours: [],
        description: '', document_file: null,
        approval_status: 0,
    });

    /* select options … (değişmedi) */
    const levelOpts = useMemo(() => levelsData.map((l: any) => ({ value: l.id, label: l.name })), [levelsData]);
    const classOpts = useMemo(() => classroomData.map((c: any) => ({ value: c.id, label: c.name })), [classroomData]);
    const studentOpts = useMemo(() => studentsData.map((s: any) => ({
        value: s.student_id,
        label: `${s.student?.first_name ?? ''} ${s.student?.last_name ?? ''}`.trim() || '-',
    })), [studentsData]);

    const REQUEST_TYPES = [
        { value: 'izinli', label: 'İzinli (Özürlü)' },
        { value: 'raporlu', label: 'Raporlu' },
        { value: 'gorevli', label: 'Görevli' },
        { value: 'erken_ayrilma', label: 'Erken Ayrılma' },
    ];
    const APPROVAL_TYPES = [
        { value: 0, label: 'Onay Bekliyor' },
        { value: 1, label: 'Onaylandı' },
        { value: 2, label: 'Reddedildi' },
    ];

    /* fields */
    const fields: FieldDefinition[] = [
        {
            name: 'date_range', label: 'Tarih Aralığı',
            type: 'doubledate', required: true,
        },
        {
            name: 'level_id', label: 'Sınıf Seviyesi',
            type: 'select', required: true, options: levelOpts,
            onClick: () => setEnabled(e => ({ ...e, levels: true })),
            onChange: (val, f) => {
                f.setFieldValue('level_id', val);
                f.setFieldValue('classroom_id', 0);
                f.setFieldValue('student_id', 0);
                setEnabled(e => ({ ...e, classes: true, students: false }));
            },
        },
        {
            name: 'classroom_id', label: 'Sınıf / Şube',
            type: 'select', dependencyKey: 'level_id', options: classOpts,
            onClick: () => setEnabled(e => ({ ...e, classes: true })),
            onChange: (val, f) => {
                f.setFieldValue('classroom_id', val);
                f.setFieldValue('student_id', 0);
                setEnabled(e => ({ ...e, students: true }));
            },
        },
        {
            name: 'student_id', label: 'Öğrenci',
            type: 'select', dependencyKey: 'classroom_id', options: studentOpts,
            onClick: () => setEnabled(e => ({ ...e, students: true })),
        },
        {
            name: 'request_type', label: 'Talep Türü',
            type: 'select', required: true, options: REQUEST_TYPES,
            /* name alanını otomatik doldur */
            onChange: (val, f) => {
                f.setFieldValue('request_type', val);
                f.setFieldValue('name', val);
            },
        },
        {
            name: 'lesson_hours', label: 'Talep Aralığı (Ders Saatleri)',
            type: 'multiselect',
            options: [
                { value: 'all', label: 'Tam Gün' },
                { value: '1', label: '1. Saat' }, { value: '2', label: '2. Saat' },
                { value: '3', label: '3. Saat' }, { value: '4', label: '4. Saat' },
                { value: '5', label: '5. Saat' }, { value: '6', label: '6. Saat' },
                { value: '7', label: '7. Saat' }, { value: '8', label: '8. Saat' },
            ],
            onChange: (vals: string[], f) => {
                vals.includes('all')
                    ? f.setFieldValue('lesson_hours', ['all'])
                    : f.setFieldValue('lesson_hours', vals.filter(v => v !== 'all'));
            },
        },
        { name: 'description', label: 'Açıklama', type: 'textarea' },
        { name: 'document_file', label: 'Belge Yükle', type: 'file' },
        {
            name: 'approval_status', label: 'İzin Onayı', type: 'select',
            required: true, options: APPROVAL_TYPES
        },
    ];

    /* submit */
    const handleSubmit = async (vals: IForm, helpers: FormikHelpers<IForm>) => {
        try {
            const fd = new FormData();
            fd.append('name', vals.name || vals.request_type);  // <-- EKLENDİ
            fd.append('start_date', vals.date_range.startDate);
            fd.append('end_date', vals.date_range.endDate);
            fd.append('level_id', String(vals.level_id));
            fd.append('classroom_id', String(vals.classroom_id));
            fd.append('student_id', String(vals.student_id));
            fd.append('request_type', vals.request_type);
            fd.append('lesson_hours', JSON.stringify(vals.lesson_hours));
            fd.append('description', vals.description);
            fd.append('approval_status', String(vals.approval_status));
            if (vals.document_file) fd.append('document', vals.document_file);

            await addNewAttendance(fd);
            helpers.setSubmitting(false);
            navigate(-1);
        } catch (err) {
            helpers.setSubmitting(false);
            console.error(err);
        }
    };

    /* render */
    return (
        <ReusableModalForm<IForm>
            show
            mode="single"
            title="İzin / Rapor Kaydı"
            fields={fields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel="Kaydet"
            cancelButtonLabel="Vazgeç"
            isLoading={addSt === 'LOADING'}
            error={addErr || null}
            autoGoBackOnModalClose
            onClose={() => navigate(-1)}
        />
    );
}

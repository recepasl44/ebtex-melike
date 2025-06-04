import { useState, useMemo } from 'react';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm';
import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';

interface IForm {
    name: string;
    date_range: { startDate: string; endDate: string };
    request_type: string;
    lesson_hours: string[];
    description: string;
    document_file: File | null;
}

export default function AdministrativeRequestAdd() {
    const navigate = useNavigate();
    const { addNewAttendance, status: addSt, error: addErr } = useAttendanceAdd();

    const [initial] = useState<IForm>({
        name: '',
        date_range: { startDate: '', endDate: '' },
        request_type: '',
        lesson_hours: [],
        description: '',
        document_file: null,
    });


    const REQUEST_OPTIONS = [
        { value: 'izinli', label: 'İzinli (Özürlü)' },
        { value: 'raporlu', label: 'Raporlu' },
        { value: 'gorevli', label: 'Görevli' },
        { value: 'erken_ayrilma', label: 'Erken Ayrılma' },
    ];

    const HOURS_OPTIONS = [
        { value: 'all', label: 'Tam Gün' },
        { value: '1', label: '1. Saat' },
        { value: '2', label: '2. Saat' },
        { value: '3', label: '3. Saat' },
        { value: '4', label: '4. Saat' },
        { value: '5', label: '5. Saat' },
        { value: '6', label: '6. Saat' },
        { value: '7', label: '7. Saat' },
        { value: '8', label: '8. Saat' },
    ];

    const fields: FieldDefinition[] = useMemo(() => [
        {
            name: 'name',
            label: 'Talep Başlığı',
            type: 'text',
            required: true,
            minLength: 2,
            placeholder: 'Örn. Rapor Talebi',
        },
        {
            name: 'date_range',
            label: 'Tarih Aralığı',
            type: 'doubledate',
            required: true,
        },
        {
            name: 'request_type',
            label: 'Talep Türü',
            type: 'select',
            required: true,
            options: REQUEST_OPTIONS,
            onChange: (v, f) => {
                f.setFieldValue('request_type', v);
                if (!f.values.name) f.setFieldValue('name', v);
            },
        },
        {
            name: 'lesson_hours',
            label: 'Talep Aralığı (Ders Saatleri)',
            type: 'multiselect',
            options: HOURS_OPTIONS,
            onChange: (vals: string[], formik) => {
                if (vals.includes('all')) {

                    formik.setFieldValue('lesson_hours', ['all']);
                } else {

                    formik.setFieldValue('lesson_hours', vals.filter(v => v !== 'all'));
                }
            },
        },
        {
            name: 'description',
            label: 'Açıklama',
            type: 'textarea',
            required: true,
            minLength: 3,
            placeholder: 'Talep nedeni…',
        },
        {
            name: 'document_file',
            label: 'Belge Yükle',
            type: 'file',
        },
    ], []);


    const handleSubmit = async (
        vals: IForm,
        helpers: FormikHelpers<IForm>,
    ) => {
        try {
            const fd = new FormData();
            fd.append('name', vals.name);
            fd.append('start_date', vals.date_range.startDate);
            fd.append('end_date', vals.date_range.endDate);
            fd.append('request_type', vals.request_type);
            fd.append('lesson_hours', JSON.stringify(vals.lesson_hours));
            fd.append('description', vals.description);
            if (vals.document_file) fd.append('document', vals.document_file);

            await addNewAttendance(fd);
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
            title="Talep Ekle"
            fields={fields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel="Gönder"
            cancelButtonLabel="İptal"
            isLoading={addSt === 'LOADING'}
            error={addErr || null}
            autoGoBackOnModalClose
            onClose={() => navigate(-1)}
        />
    );
}

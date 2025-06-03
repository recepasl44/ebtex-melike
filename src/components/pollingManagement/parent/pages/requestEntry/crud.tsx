/* crud.tsx — Veli > Talep Ekle
/* ——————————————————————————————————— */
import { useState, useMemo } from 'react';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

import ReusableModalForm, {
    FieldDefinition,
} from '../../../../ReusableModalForm';

import { useAttendanceAdd } from '../../../../../hooks/attendance/useAdd';

/* —— Form tipi —— */
interface IForm {
    /* BACKEND’İN İSTEDİĞİ FIELD (kullanıcı görmez) */
    name: string;

    date_range: { startDate: string; endDate: string };
    request_type: string;
    description: string;
    document_file: File | null;
}

/* —— Bileşen —— */
export default function ParentRequestEntryAdd() {
    const navigate = useNavigate();
    const { addNewAttendance, status: addSt, error: addErr } = useAttendanceAdd();

    /* Başlangıç değerleri */
    const [initial] = useState<IForm>({
        name: '',                                     // <— eklendi
        date_range: { startDate: '', endDate: '' },
        request_type: '',
        description: '',
        document_file: null,
    });

    const REQUEST_TYPE_OPTIONS = [
        { value: 'izin', label: 'İzin' },
        { value: 'rapor', label: 'Rapor' },
        { value: 'görevli', label: 'Görevli' },
    ];

    /* UI’da gösterilecek alanlar */
    const fields: FieldDefinition[] = useMemo(() => [
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
            options: REQUEST_TYPE_OPTIONS,
            /* Seçildiğinde name alanını da doldur */
            onChange: (val, formik) => {
                formik.setFieldValue('request_type', val);
                formik.setFieldValue('name', val);       // otomatik eşitle
            },
        },
        {
            name: 'description',
            label: 'Açıklama',
            type: 'textarea',
            placeholder: 'Talep nedeni...',
            required: true,
            minLength: 3,
        },
        {
            name: 'document_file',
            label: 'Belge Yükle',
            type: 'file',
        },
    ], []);

    /* Submit */
    const handleSubmit = async (vals: IForm, helpers: FormikHelpers<IForm>) => {
        try {
            const fd = new FormData();
            fd.append('name', vals.name || vals.request_type);       // ← yeni
            fd.append('start_date', vals.date_range.startDate);
            fd.append('end_date', vals.date_range.endDate);
            fd.append('request_type', vals.request_type);
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

    const isLoading = addSt === 'LOADING';

    /* Render */
    return (
        <ReusableModalForm<IForm>
            show={true}
            mode="single"
            title="Talep Ekle"
            fields={fields}
            initialValues={initial}
            onSubmit={handleSubmit}
            confirmButtonLabel="Gönder"
            cancelButtonLabel="İptal"
            isLoading={isLoading}
            error={addErr || null}
            autoGoBackOnModalClose
            onClose={() => navigate(-1)}
        />
    );
}

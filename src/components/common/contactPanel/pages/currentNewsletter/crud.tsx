import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikValues } from 'formik';

import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';
import { useBulletinAdd } from '../../../../hooks/bulletin/useAdd';
import { useBulletinUpdate } from '../../../../hooks/bulletin/useUpdate';
import { useBulletinShow } from '../../../../hooks/bulletin/useDetail';

interface FormData extends FormikValues {
    title: string;
    content: string;
    category_id: string;
    start_date: string;
    end_date: string;
    group_id: string;
    status: string;
}

export default function CurrentNewsletterCrud() {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';

    const { bulletin, status: showStatus, error: showError, getBulletin } =
        useBulletinShow();
    const { addNewBulletin, status: addStatus, error: addError } = useBulletinAdd();
    const { updateExistingBulletin, status: updStatus, error: updError } =
        useBulletinUpdate();

    const [initialValues, setInitialValues] = useState<FormData>({
        title: '',
        content: '',
        category_id: '',
        start_date: '',
        end_date: '',
        group_id: '',
        status: '1',
    });

    useEffect(() => {
        if (mode === 'update' && id) {
            getBulletin(Number(id));
        }
    }, [mode, id, getBulletin]);

    useEffect(() => {
        if (mode === 'update' && bulletin) {
            setInitialValues({
                title: bulletin.title ?? '',
                content: bulletin.content ?? '',
                category_id: String(bulletin.category_id ?? ''),
                start_date: bulletin.start_date ?? '',
                end_date: bulletin.end_date ?? '',
                group_id: String(bulletin.group_id ?? ''),
                status: String(bulletin.status ?? '1'),
            });
        }
    }, [bulletin, mode]);

    const fields: FieldDefinition[] = [
        { name: 'title', label: 'Başlık', type: 'text', required: true },
        { name: 'content', label: 'İçerik', type: 'textarea', required: true },
        {
            name: 'category_id',
            label: 'Kategori',
            type: 'select',
            options: [
                { value: '1', label: 'Genel' },
                { value: '2', label: 'Duyuru' },
            ],
        },
        { name: 'start_date', label: 'Başlangıç Tarihi', type: 'date', required: true },
        { name: 'end_date', label: 'Bitiş Tarihi', type: 'date', required: true },
        { name: 'group_id', label: 'Hedef Kitle', type: 'text' },
        {
            name: 'status',
            label: 'Yayın Durumu',
            type: 'select',
            options: [
                { value: '1', label: 'Yayında' },
                { value: '0', label: 'Taslak' },
            ],
        },
    ];

    const isLoading =
        (mode === 'add' && addStatus === 'LOADING') ||
        (mode === 'update' && (updStatus === 'LOADING' || showStatus === 'LOADING'));
    const combinedError =
        mode === 'add'
            ? addError
            : mode === 'update'
                ? updError || showError
                : null;

    const handleSubmit = async (values: FormData) => {
        if (mode === 'add') {
            await addNewBulletin({ ...(values as any) });
        } else if (mode === 'update' && id) {
            await updateExistingBulletin({
                bulletinId: Number(id),
                payload: { ...(values as any) },
            });
        }
        navigate(`${import.meta.env.BASE_URL}contact-panel/current-newsletter`);
    };

    return (
        <ReusableModalForm<FormData>
            show
            title={mode === 'add' ? 'Bülten Ekle' : 'Bülten Güncelle'}
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Ekle' : 'Güncelle'}
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={combinedError || undefined}
            onClose={() => navigate(`${import.meta.env.BASE_URL}contact-panel/current-newsletter`)}
            autoGoBackOnModalClose
        />
    );
}
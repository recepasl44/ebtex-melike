import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FormikValues, Field } from 'formik';
import TargetAudienceModal, { AudienceItem } from './TargetAudienceModal';

import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';
import { useBulletinAdd } from '../../../../hooks/bulletin/useAdd';
import { useBulletinUpdate } from '../../../../hooks/bulletin/useUpdate';
import { useBulletinShow } from '../../../../hooks/bulletin/useDetail';
import { useBulletinsList } from '../../../../hooks/bulletin/useBulletinsList';
import { Button } from 'react-bootstrap';

interface FormData extends FormikValues {
    title: string;
    content: string;
    category_id: string;
    source: string;
    start_date: string;
    end_date: string;
    send_time: string;
    created_by: string;
    group_id: string;
    status: string;
    send_sms_email?: boolean;
}

export default function CurrentNewsletterCrud() {
    const navigate = useNavigate();
    const location = useLocation();
    const tab = new URLSearchParams(location.search).get('tab') || '1';


    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';

    const { bulletin, status: showStatus, error: showError, getBulletin } =
        useBulletinShow();
    const { addNewBulletin, status: addStatus, error: addError } = useBulletinAdd();
    const { updateExistingBulletin, status: updStatus, error: updError } =
        useBulletinUpdate();

    const [enabled, setEnabled] = useState({ bulletins: false });
    const { bulletinsData = [] } = useBulletinsList({ enabled: enabled.bulletins, pageSize: 999 });

    const [initialValues, setInitialValues] = useState<FormData>({
        title: '',
        content: '',
        category_id: '',
        source: '',
        start_date: '',
        end_date: '',
        send_time: '',
        created_by: '',
        group_id: '',
        status: '1',
        send_sms_email: false,
    });
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [selectedAudience, setSelectedAudience] = useState<AudienceItem[]>([]);

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
                source: (bulletin as any).source ?? '',
                start_date: bulletin.start_date ?? '',
                end_date: bulletin.end_date ?? '',
                send_time: (bulletin as any).send_time ?? '',
                created_by: String((bulletin as any).created_by ?? ''),
                group_id: String(bulletin.group_id ?? ''),
                status: String(bulletin.status ?? '1'),
                send_sms_email: Boolean((bulletin as any).send_sms_email ?? false),
            });
        }
    }, [bulletin, mode]);

    const categoryOptionsAdd = [
        { value: '1', label: 'Genel Duyuru' },
        { value: '2', label: 'Sınav' },
        { value: '3', label: 'Etkinlik' },
    ];
    const categoryOptionsUpdate = [
        { value: '1', label: 'Grup' },
        { value: '2', label: 'Topluluk' },
    ];

    const userOptions = bulletinsData
        .map((b) => ({ value: String(b.created_by), label: (b as any).createdby?.name_surname || '-' }))
        .filter((opt, idx, arr) => arr.findIndex((o) => o.value === opt.value) === idx);

    const getFields = (): FieldDefinition[] => {
        if (mode === 'add') {
            return [
                { name: 'title', label: 'Başlık', type: 'text', required: true },
                { name: 'content', label: 'İçerik', type: 'textarea', required: true },
                {
                    name: 'category_id',
                    label: 'Kategori',
                    type: 'select',
                    options: categoryOptionsAdd,
                },

                {
                    name: 'created_by',
                    label: 'Gönderen',
                    type: 'select',
                    options: userOptions,
                    onClick: () => setEnabled((e) => ({ ...e, bulletins: true })),
                },
                { name: 'start_date', label: 'Yayın Tarihi', type: 'date', required: true },
                { name: 'send_time', label: 'Gönderim Saati', type: 'time', required: true },
                {
                    name: 'send_sms_email',
                    label: 'SMS ve E-Posta ile Gönderilsin mi?',
                    type: 'checkbox',
                },
                {
                    name: 'group_id',
                    label: 'Hedef Kitle',
                    renderForm: () => (
                        <Button
                            variant="primary-light"
                            size="sm"
                            className="btn-icon rounded-pill"
                            onClick={() => setShowGroupModal(true)}
                        >
                            <i className="ti ti-eye"></i>
                        </Button>
                    ),
                },
            ];
        }
        return [
            { name: 'title', label: 'Başlık', type: 'text', required: true },
            { name: 'content', label: 'İçerik', type: 'textarea', required: true },
            {
                name: 'category_id',
                label: 'Kategori',
                type: 'select',
                options: categoryOptionsUpdate,
            },
            {
                name: 'created_by',
                label: 'Gönderen',
                type: 'select',
                options: userOptions,
                onClick: () => setEnabled((e) => ({ ...e, bulletins: true })),
            },
            { name: 'start_date', label: 'Yayın Tarihi', type: 'date', required: true },
            { name: 'send_time', label: 'Gönderim Saati', type: 'time', required: true },
            {
                name: 'send_sms_email',
                label: 'SMS ve E-Posta ile Gönderilsin mi?',
                type: 'checkbox',
            },
            {
                name: 'group_id',
                label: 'Hedef Kitle',
                renderForm: () => (
                    <Button
                        variant="primary-light"
                        size="sm"
                        className="btn-icon rounded-pill"
                        onClick={() => setShowGroupModal(true)}
                    >
                        <i className="ti ti-eye"></i>
                    </Button>
                ),
            },
        ];
    };

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
        const payload = {
            ...(values as any),
            end_date: values.end_date || values.start_date,
        };
        if (mode === 'add') {
            await addNewBulletin(payload);
        } else if (mode === 'update' && id) {
            await updateExistingBulletin({
                bulletinId: Number(id),
                payload,
            });
        }
        navigate(`${import.meta.env.BASE_URL}contact/messages?tab=${tab}`, {
            replace: true,
        });

    };

    return (
        <>
            <ReusableModalForm<FormData>
                show
                title={mode === 'add' ? 'Bildirim Ekle' : 'Bülten Detay / Düzenle'}
                fields={getFields}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                confirmButtonLabel="Gönder"
                cancelButtonLabel="Vazgeç"
                isLoading={isLoading}
                error={combinedError || undefined}
                onClose={() => {
                    navigate(
                        `${import.meta.env.BASE_URL}contact/messages?tab=${tab}`,
                        {
                            replace: true,
                        }
                    );

                }}
                autoGoBackOnModalClose
                mode="double"
            />
            <TargetAudienceModal
                show={showGroupModal}
                onClose={() => setShowGroupModal(false)}
                onSave={(items) => {
                    setSelectedAudience(items);
                    setShowGroupModal(false);
                }}
            />
        </>
    );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikValues } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';
import { useNotificationAdd } from '../../../../hooks/notifications/useAdd';
import { useNotificationsList } from '../../../../hooks/notifications/useList';
import { Button } from 'react-bootstrap';
import TargetAudienceModal, { AudienceItem } from './TargetAudienceModal';

interface FormData extends FormikValues {
    title: string;
    message: string;
    category_id: string;
    source_id: string;
    sender_id: string;
    send_date: string;
    send_time: string;
    send_sms_email?: boolean;
    group_ids: string[];
}

export default function NotificationAdd() {
    const navigate = useNavigate();
    const { addNewNotification, status, error } = useNotificationAdd();
    const [enabled, setEnabled] = useState({ notifications: false });
    const { notificationsData = [] } = useNotificationsList({
        enabled: enabled.notifications,
        pageSize: 999,
    });
    const [showAudienceModal, setShowAudienceModal] = useState(false);
    const [selectedAudience, setSelectedAudience] = useState<AudienceItem[]>([]);

    const initialValues: FormData = {
        title: '',
        message: '',
        category_id: '',
        source_id: '',
        sender_id: '',
        send_date: '',
        send_time: '',
        send_sms_email: false,
        group_ids: [],
    };

    const categoryOptions = [
        { value: '1', label: 'Ödev' },
        { value: '2', label: 'Sınav' },
        { value: '3', label: 'Sistem' },
        { value: '4', label: 'Duyuru' },
    ];

    const sourceOptions = [
        { value: '1', label: 'Otomatik' },
        { value: '2', label: 'Manuel' },
    ];

    const senderOptions = notificationsData
        .map((n) => ({ value: String(n.sender_id), label: (n as any).sender?.name_surname || '-' }))
        .filter((opt, idx, arr) => arr.findIndex((o) => o.value === opt.value) === idx);

    const fields: FieldDefinition[] = [
        { name: 'title', label: 'Başlık', type: 'text', required: true },
        { name: 'message', label: 'İçerik', type: 'textarea', required: true },
        { name: 'category_id', label: 'Kategori', type: 'select', options: categoryOptions },
        { name: 'source_id', label: 'Kaynak', type: 'select', options: sourceOptions },
        {
            name: 'sender_id',
            label: 'Gönderen',
            type: 'select',
            options: senderOptions,
            onClick: () => setEnabled((e) => ({ ...e, notifications: true })),
        },
        { name: 'send_date', label: 'Gönderim Tarihi', type: 'date', required: true },
        { name: 'send_time', label: 'Gönderim Saati', type: 'time', required: true },
        { name: 'send_sms_email', label: 'SMS/E-posta ile gönderilsin mi?', type: 'checkbox' },
        {
            name: 'group_ids',
            label: 'Hedef Kitle',
            renderForm: () => (
                <Button
                    variant="primary-light"
                    size="sm"
                    className="btn-icon rounded-pill"
                    onClick={() => setShowAudienceModal(true)}
                >
                    <i className="ti ti-eye"></i>
                </Button>
            ),
        },
    ];

    const handleSubmit = async (values: FormData) => {
        await addNewNotification({
            ...(values as any),
            send_time: `${values.send_date} ${values.send_time}`,
            group_ids: selectedAudience.map((a) => a.id),
        });
        navigate(`${import.meta.env.BASE_URL}contact-panel/notifications`);
    };

    const isLoading = status === 'LOADING';



    return (
        <>
            <ReusableModalForm<FormData>
                show
                title="Bildirim Ekle"
                fields={fields}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                confirmButtonLabel="Gönder"
                cancelButtonLabel="Vazgeç"
                isLoading={isLoading}
                error={error || undefined}
                onClose={() => navigate(`${import.meta.env.BASE_URL}contact-panel/notifications`)}
                autoGoBackOnModalClose
                mode="double"
            />
            <TargetAudienceModal
                show={showAudienceModal}
                onClose={() => setShowAudienceModal(false)}
                onSave={(items) => {
                    setSelectedAudience(items);
                    setShowAudienceModal(false);
                }}
            />
        </>
    );
}

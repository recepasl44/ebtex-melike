import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FormikValues } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';
import { useNotificationUpdate } from '../../../../hooks/notifications/useUpdate';
import { useNotificationDetail } from '../../../../hooks/notifications/useDetail';
import { useNotificationsList } from '../../../../hooks/notifications/useList';
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
    status: string;
    group_ids: string[];
    info?: string;
}

export default function NotificationEdit() {
    const navigate = useNavigate();

    const { id } = useParams<{ id?: string }>();
    const { notification, getNotification, status: detailStatus, error: detailError } = useNotificationDetail();
    const { updateExistingNotification, status: updStatus, error: updError } = useNotificationUpdate();
    const [enabled, setEnabled] = useState({ notifications: false });
    const { notificationsData = [] } = useNotificationsList({
        enabled: enabled.notifications,
        pageSize: 999,
    });
    const [showAudienceModal, setShowAudienceModal] = useState(false);
    const [selectedAudience, setSelectedAudience] = useState<AudienceItem[]>([]);

    const [initialValues, setInitialValues] = useState<FormData>({
        title: '',
        message: '',
        category_id: '',
        source_id: '',
        sender_id: '',
        send_date: '',
        send_time: '',
        send_sms_email: false,
        status: '1',
        group_ids: [],
        info: '',
    });

    useEffect(() => {
        if (id) {
            getNotification(Number(id));
        }
    }, [id, getNotification]);

    useEffect(() => {
        if (notification) {
            const [d, t] = (notification.send_time || '').split(' ');
            setInitialValues({
                title: notification.title ?? '',
                message: notification.message ?? '',
                category_id: String(notification.category_id ?? ''),
                source_id: String(notification.source_id ?? ''),
                sender_id: String(notification.sender_id ?? ''),
                send_date: d ?? '',
                send_time: t ?? '',
                send_sms_email: false,
                status: String(notification.status ?? '1'),
                group_ids: [],
                info: '',
            });
        }
    }, [notification]);

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

    const statusOptions = [
        { value: '1', label: 'Gönderildi' },
        { value: '2', label: 'Planlandı' },
        { value: '3', label: 'Hata' },
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
        { name: 'status', label: 'Durum', type: 'select', options: statusOptions },
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
        { name: 'info', label: 'Gönderilen Kişi Sayısı', type: 'number' },
    ];

    const handleSubmit = async (values: FormData) => {
        if (id) {
            await updateExistingNotification({
                notificationId: Number(id),
                payload: {
                    ...(values as any),
                    send_time: `${values.send_date} ${values.send_time}`,
                },
            });
        }
        navigate(`${import.meta.env.BASE_URL}contact-panel`, { replace: true });
    };

    const isLoading = updStatus === 'LOADING' || detailStatus === 'LOADING';
    const combinedError = updError || detailError;
    return (
        <>
            <ReusableModalForm<FormData>
                show
                title="Bildirim Detay / Düzenle"
                fields={fields}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                confirmButtonLabel="Tekrar Gönder"
                cancelButtonLabel="Vazgeç"
                isLoading={isLoading}
                error={combinedError || undefined}
                onClose={() => {
                    navigate(`${import.meta.env.BASE_URL}contact-panel`, {
                        replace: true,
                    });

                }}
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
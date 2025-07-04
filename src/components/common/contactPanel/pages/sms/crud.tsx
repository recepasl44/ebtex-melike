import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FormikValues } from 'formik';
import TargetAudienceModal, { AudienceItem } from './TargetAudienceModal';

import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';
import { useNotificationAdd } from '../../../../hooks/notifications/useAdd';
import { useNotificationUpdate } from '../../../../hooks/notifications/useUpdate';
import { useNotificationDetail } from '../../../../hooks/notifications/useDetail';
import { useNotificationsList } from '../../../../hooks/notifications/useList';
import { Button } from 'react-bootstrap';

interface FormData extends FormikValues {
    title: string;
    message: string;
    category_id: string;
    sender_id: string;
    send_option: 'now' | 'schedule';
    send_date: string;
    send_time: string;
    status: string;
    sent_count: string;
    group_id: string;
}

export default function SmsCrud() {
    const navigate = useNavigate();
    const location = useLocation();
    const tab = new URLSearchParams(location.search).get('tab') || '3';

    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'edit' = id ? 'edit' : 'add';

    const { addNewNotification, status: addStatus, error: addError } = useNotificationAdd();
    const { updateExistingNotification, status: updStatus, error: updError } = useNotificationUpdate();
    const { notification, status: detailStatus, error: detailError, getNotification } = useNotificationDetail();
    const [enabled, setEnabled] = useState({ notifications: false });
    const { notificationsData = [] } = useNotificationsList({ enabled: enabled.notifications, pageSize: 999 });

    const [initialValues, setInitialValues] = useState<FormData>({
        title: '',
        message: '',
        category_id: '',
        sender_id: '',
        send_option: 'now',
        send_date: '',
        send_time: '',
        status: '1',
        sent_count: '0',
        group_id: '',
    });
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [selectedAudience, setSelectedAudience] = useState<AudienceItem[]>([]);

    useEffect(() => {
        if (mode === 'edit' && id) {
            getNotification(Number(id));
        }
    }, [mode, id, getNotification]);

    useEffect(() => {
        if (mode === 'edit' && notification) {
            setInitialValues({
                title: notification.title ?? '',
                message: notification.message ?? '',
                category_id: String(notification.category_id ?? ''),
                sender_id: String(notification.sender_id ?? ''),
                send_option: 'schedule',
                send_date: notification.send_time?.split(' ')[0] ?? '',
                send_time: notification.send_time?.split(' ')[1] ?? '',
                status: String(notification.status ?? '1'),
                sent_count: '0',
                group_id: String(notification.group_id ?? ''),
            });
        }
    }, [notification, mode]);

    const categoryOptions = [
        { value: '1', label: 'Ödev' },
        { value: '2', label: 'Sınav' },
        { value: '3', label: 'Sistem' },
        { value: '4', label: 'Duyuru' },
    ];

    const statusOptions = [
        { value: '1', label: 'Gönderildi' },
        { value: '2', label: 'Planlandı' },
        { value: '3', label: 'Hata' },
    ];

    const senderOptions = notificationsData
        .map((n) => ({ value: String(n.sender_id), label: (n as any).sender?.name_surname || '-' }))
        .filter((opt, idx, arr) => arr.findIndex((o) => o.value === opt.value) === idx);

    const getFields = (values: FormData): FieldDefinition[] => {
        return [
            { name: 'title', label: 'Başlık', type: 'text', required: true },
            { name: 'message', label: 'İçerik', type: 'textarea', required: true },
            { name: 'category_id', label: 'Kategori', type: 'select', options: categoryOptions, required: true },
            {
                name: 'sender_id',
                label: 'Gönderen',
                type: 'select',
                options: senderOptions,
                onClick: () => setEnabled((e) => ({ ...e, notifications: true })),
                required: true,
            },
            {
                name: 'send_option',
                label: 'Gönderim Tarihi',
                renderForm: (formik) => (
                    <div className="d-flex gap-3">
                        <label className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                checked={formik.values.send_option === 'now'}
                                onChange={() => formik.setFieldValue('send_option', 'now')}
                            />
                            <span className="form-check-label">Hemen Gönder</span>
                        </label>
                        <label className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                checked={formik.values.send_option === 'schedule'}
                                onChange={() => formik.setFieldValue('send_option', 'schedule')}
                            />
                            <span className="form-check-label">Planla</span>
                        </label>
                    </div>
                ),
            },
            ...(values.send_option === 'schedule'
                ? [
                    { name: 'send_date', label: 'Tarih', type: 'date' as const, required: true },
                    { name: 'send_time', label: 'Saat', type: 'time' as const, required: true },
                ]
                : []),
            { name: 'status', label: 'Durum', type: 'select', options: statusOptions },
            // {
            //     name: 'sent_count',
            //     label: 'Gönderilen Kişi Sayısı',
            //     renderForm: () => <span>{values.sent_count}</span>,
            // },
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

    const handleSubmit = async (values: FormData) => {
        const payload: any = { ...(values as any) };
        if (values.send_option === 'schedule') {
            payload.send_time = `${values.send_date} ${values.send_time}`;
        } else {
            delete payload.send_time;
            delete payload.send_date;
        }
        if (mode === 'add') {
            await addNewNotification(payload as any);
        } else if (mode === 'edit' && id) {
            await updateExistingNotification({ notificationId: Number(id), payload: payload as any });
        }
        navigate(`/contact/messages?tab=${tab}`, {
            replace: true,
        });
    };

    const isLoading =
        (mode === 'add' && addStatus === 'LOADING') ||
        (mode === 'edit' && (updStatus === 'LOADING' || detailStatus === 'LOADING'));
    const combinedError = mode === 'add' ? addError : updError || detailError;

    return (
        <>
            <ReusableModalForm<FormData>
                show
                title={mode === 'add' ? 'SMS Ekle' : 'SMS Düzenle'}
                fields={(values) => getFields(values as FormData)}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                confirmButtonLabel={mode === 'add' ? 'Gönder' : 'Güncelle'}
                cancelButtonLabel="Vazgeç"
                isLoading={isLoading}
                error={combinedError || undefined}
                onClose={() => {
                    navigate(`/contact/messages?tab=${tab}`, {
                        replace: true,
                    });

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

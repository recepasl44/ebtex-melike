import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FormikValues } from 'formik';
import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';
import { useNotificationUpdate } from '../../../../hooks/notifications/useUpdate';
import { useNotificationDetail } from '../../../../hooks/notifications/useDetail';
import { useUsersTable } from '../../../../hooks/user/useList';
import { useGroupsTable } from '../../../../hooks/group/useList';

interface FormData extends FormikValues {
    title: string;
    message: string;
    category_id: string;
    source_id: string;
    sender_id: string;
    send_time: string;
    send_sms_email?: boolean;
    status: string;
    group_ids: string[];
}

export default function NotificationEdit() {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const { notification, getNotification, status: detailStatus, error: detailError } = useNotificationDetail();
    const { updateExistingNotification, status: updStatus, error: updError } = useNotificationUpdate();
    const [enabled, setEnabled] = useState({ users: false, groups: false });
    const { usersData = [] } = useUsersTable({ enabled: enabled.users, pageSize: 999 });
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups, pageSize: 999 });

    const [initialValues, setInitialValues] = useState<FormData>({
        title: '',
        message: '',
        category_id: '',
        source_id: '',
        sender_id: '',
        send_time: '',
        send_sms_email: false,
        status: '1',
        group_ids: [],
    });

    useEffect(() => {
        if (id) {
            getNotification(Number(id));
        }
    }, [id, getNotification]);

    useEffect(() => {
        if (notification) {
            setInitialValues({
                title: notification.title ?? '',
                message: notification.message ?? '',
                category_id: String(notification.category_id ?? ''),
                source_id: String(notification.source_id ?? ''),
                sender_id: String(notification.sender_id ?? ''),
                send_time: notification.send_time ?? '',
                send_sms_email: false,
                status: String(notification.status ?? '1'),
                group_ids: [],
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

    const userOptions = usersData.map((u) => ({ value: String(u.id), label: u.name_surname || `${u.first_name} ${u.last_name}` }));

    const fields: FieldDefinition[] = [
        { name: 'title', label: 'Başlık', type: 'text', required: true },
        { name: 'message', label: 'İçerik', type: 'textarea', required: true },
        { name: 'category_id', label: 'Kategori', type: 'select', options: categoryOptions },
        { name: 'source_id', label: 'Kaynak', type: 'select', options: sourceOptions },
        {
            name: 'sender_id',
            label: 'Gönderen',
            type: 'select',
            options: userOptions,
            onClick: () => setEnabled((e) => ({ ...e, users: true })),
        },
        { name: 'send_time', label: 'Gönderim Zamanı', type: 'date', required: true },
        { name: 'send_sms_email', label: 'SMS/E-posta ile gönderilsin mi?', type: 'checkbox' },
        { name: 'status', label: 'Durum', type: 'select', options: statusOptions },
        {
            name: 'group_ids',
            label: 'Hedef Kitle',
            renderForm: () => (
                <Button variant="outline-secondary" onClick={() => setEnabled((e) => ({ ...e, groups: true }))}>
                    <i className="ti ti-eye" />
                </Button>
            ),
        },
        {
            name: 'info',
            label: 'Gönderilen Kişi Sayısı',
            renderForm: () => (
                <div className="d-flex align-items-center gap-2">
                    <span>0/0</span>
                    <Button size="sm" variant="outline-secondary">Tekrar Gönder</Button>
                </div>
            ),
        },
    ];

    const handleSubmit = async (values: FormData) => {
        if (id) {
            await updateExistingNotification({ notificationId: Number(id), payload: { ...(values as any) } });
        }
        navigate(`${import.meta.env.BASE_URL}contact-panel/notifications`);
    };

    const isLoading = updStatus === 'LOADING' || detailStatus === 'LOADING';
    const combinedError = updError || detailError;

    return (
        <ReusableModalForm<FormData>
            show
            title="Bildirim Detay / Düzenle"
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel="Güncelle"
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={combinedError || undefined}
            onClose={() => navigate(`${import.meta.env.BASE_URL}contact-panel/notifications`)}
            autoGoBackOnModalClose
            mode="double"
        />
    );
}

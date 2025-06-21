import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormikValues } from 'formik'

import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm'
import { useNotificationAdd } from '../../../../hooks/notifications/useAdd'
import { useNotificationUpdate } from '../../../../hooks/notifications/useUpdate'
import { useNotificationDetail as useNotificationShow } from '../../../../hooks/notifications/useDetail'

interface FormData extends FormikValues {
    title: string
    message: string
    category_id: string
    sender_id: string
    send_date: string
    send_time: string
    files: File | null
    status: string
    sent_count: string
    group_id: string
}

export default function EmailCrud() {
    const navigate = useNavigate()
    const { id } = useParams<{ id?: string }>()
    const mode: 'add' | 'update' = id ? 'update' : 'add'

    const { addNewNotification, status: addStatus, error: addError } = useNotificationAdd()
    const { updateExistingNotification, status: updStatus, error: updError } = useNotificationUpdate()
    const { notification, status: detailStatus, error: detailError, getNotification } = useNotificationShow()

    const [initialValues, setInitialValues] = useState<FormData>({
        title: '',
        message: '',
        category_id: '',
        sender_id: '',
        send_date: '',
        send_time: '',
        files: null,
        status: '1',
        sent_count: '0',
        group_id: '',
    })
    const [showGroupModal, setShowGroupModal] = useState(false)

    useEffect(() => {
        if (mode === 'update' && id) {
            getNotification(Number(id))
        }
    }, [mode, id, getNotification])

    useEffect(() => {
        if (mode === 'update' && notification) {
            const [d, t] = (notification.send_time || '').split(' ')
            setInitialValues({
                title: notification.title ?? '',
                message: notification.message ?? '',
                category_id: String(notification.category_id ?? ''),
                sender_id: String(notification.sender_id ?? ''),
                send_date: d ?? '',
                send_time: t ?? '',
                files: null,
                status: String(notification.status ?? '1'),
                sent_count: '0',
                group_id: String(notification.group_id ?? ''),
            })
        }
    }, [notification, mode])

    const categoryOptions = [
        { value: '1', label: 'Ödev' },
        { value: '2', label: 'Sınav' },
        { value: '3', label: 'Sistem' },
        { value: '4', label: 'Duyuru' },
    ]

    const senderOptions = [
        { value: '1', label: 'Sistem' },
        { value: '2', label: 'Yönetici' },
        { value: '3', label: 'Öğretmen' },
    ]

    const statusOptions = [
        { value: '1', label: 'Gönderildi' },
        { value: '2', label: 'Planlandı' },
        { value: '3', label: 'Hata' },
    ]

    const getFields = (values: FormData): FieldDefinition[] => {
        const base: FieldDefinition[] = [
            { name: 'title', label: 'Başlık', type: 'text', required: true },
            { name: 'message', label: 'İçerik', type: 'textarea', required: true },
            { name: 'category_id', label: 'Kategori', type: 'select', options: categoryOptions, required: true },
            { name: 'sender_id', label: 'Gönderen', type: 'select', options: senderOptions },
            { name: 'send_date', label: 'Gönderim Tarihi', type: 'date', required: true },
            { name: 'send_time', label: 'Gönderim Saati', type: 'time', required: true },
            { name: 'files', label: 'Ek Dosyalar', type: 'file' },
        ]
        if (mode === 'update') {
            base.push({ name: 'status', label: 'Durum', type: 'select', options: statusOptions })
            base.push({ name: 'sent_count', label: 'Gönderilen Kişi Sayısı', renderForm: () => <span>{values.sent_count}</span> })
        }
        base.push({
            name: 'group_id',
            label: 'Hedef Kitle',
            renderForm: () => (
                <button
                    type="button"
                    className="btn btn-icon btn-sm btn-info-light rounded-pill"
                    onClick={() => setShowGroupModal(true)}
                >
                    <i className="ti ti-eye" />
                </button>
            ),
        })
        return base
    }

    const handleSubmit = async (values: FormData) => {
        const payload: any = {
            title: values.title,
            message: values.message,
            category_id: values.category_id ? Number(values.category_id) : undefined,
            sender_id: values.sender_id ? Number(values.sender_id) : undefined,
            send_time: `${values.send_date} ${values.send_time}`,
            group_id: values.group_id ? Number(values.group_id) : undefined,
            status: mode === 'update' ? Number(values.status) : undefined,
        }
        if (mode === 'add') {
            await addNewNotification(payload)
        } else if (mode === 'update' && id) {
            await updateExistingNotification({ notificationId: Number(id), payload })
        }
        navigate(`${import.meta.env.BASE_URL}contact-panel/e-mail`)
    }

    const isLoading =
        (mode === 'add' && addStatus === 'LOADING') ||
        (mode === 'update' && (updStatus === 'LOADING' || detailStatus === 'LOADING'))
    const combinedError = mode === 'add' ? addError : updError || detailError

    return (
        <ReusableModalForm<FormData>
            show
            title={mode === 'add' ? 'E-posta Ekle' : 'E-posta Düzenle'}
            fields={(values) => getFields(values as FormData)}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel={mode === 'add' ? 'Gönder' : 'Tekrar Gönder'}
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={combinedError || undefined}
            onClose={() => navigate(`${import.meta.env.BASE_URL}contact-panel/e-mail`)}
            autoGoBackOnModalClose
            mode="double"
        />
    )
}

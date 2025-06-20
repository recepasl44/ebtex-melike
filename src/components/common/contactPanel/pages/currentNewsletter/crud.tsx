import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikValues, Field } from 'formik';
import { Modal, Button } from 'react-bootstrap';

import ReusableModalForm, { FieldDefinition } from '../../../ReusableModalForm';
import { useBulletinAdd } from '../../../../hooks/bulletin/useAdd';
import { useBulletinUpdate } from '../../../../hooks/bulletin/useUpdate';
import { useBulletinShow } from '../../../../hooks/bulletin/useDetail';
import { useGroupsTable } from '../../../../hooks/group/useList';
import { useUsersTable } from '../../../../hooks/user/useList';

interface FormData extends FormikValues {
    title: string;
    content: string;
    category_id: string;
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
    const { id } = useParams<{ id?: string }>();
    const mode: 'add' | 'update' = id ? 'update' : 'add';

    const { bulletin, status: showStatus, error: showError, getBulletin } =
        useBulletinShow();
    const { addNewBulletin, status: addStatus, error: addError } = useBulletinAdd();
    const { updateExistingBulletin, status: updStatus, error: updError } =
        useBulletinUpdate();

    const [enabled, setEnabled] = useState({ groups: false, users: false });
    const { groupsData = [] } = useGroupsTable({ enabled: enabled.groups, pageSize: 999 });
    const { usersData = [] } = useUsersTable({ enabled: enabled.users, pageSize: 999 });

    const [initialValues, setInitialValues] = useState<FormData>({
        title: '',
        content: '',
        category_id: '',
        start_date: '',
        end_date: '',
        send_time: '',
        created_by: '',
        group_id: '',
        status: '1',
        send_sms_email: false,
    });
    const [showGroupModal, setShowGroupModal] = useState(false);

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

    const groupOptions = groupsData.map((g) => ({ value: String(g.id), label: g.name }));
    const userOptions = usersData.map((u) => ({ value: String(u.id), label: u.name_surname || `${u.first_name} ${u.last_name}` }));

    const getFields = (): FieldDefinition[] => [
        { name: 'title', label: 'Başlık', type: 'text', required: true },
        { name: 'content', label: 'İçerik', type: 'textarea', required: true },
        {
            name: 'category_id',
            label: 'Kategori',
            type: 'select',
            options: mode === 'add' ? categoryOptionsAdd : categoryOptionsUpdate,
        },
        {
            name: 'created_by',
            label: 'Gönderen',
            type: 'select',
            options: userOptions,
            onClick: () => setEnabled((e) => ({ ...e, users: true })),
        },
        { name: 'start_date', label: mode === 'add' ? 'Yayın Tarihi' : 'Yayın Başlangıç Tarihi', type: 'date', required: true },
        ...(mode === 'update'
            ? [{ name: 'end_date', label: 'Yayın Bitiş Tarihi', type: 'date', required: true }]
            : []),
        { name: 'send_time', label: 'Gönderim Saati', type: 'time', required: true },
        {
            name: 'send_sms_email',
            label: 'SMS ve E-Posta ile Gönderilsin mi?',
            type: 'checkbox',
        },
        {
            name: 'group_id',
            label: 'Hedef Kitle',
            renderForm: (formik) => (
                <div className="d-flex" style={{ gap: 8 }}>
                    <select
                        className="form-select"
                        value={formik.values.group_id || ''}
                        onChange={(e) => formik.setFieldValue('group_id', e.target.value)}
                        onClick={() => setEnabled((e) => ({ ...e, groups: true }))}
                    >
                        <option value="">Seçiniz</option>
                        {groupOptions.map((g) => (
                            <option key={g.value} value={g.value}>
                                {g.label}
                            </option>
                        ))}
                    </select>
                    <Button variant="outline-secondary" onClick={() => setShowGroupModal(true)}>
                        <i className="ti ti-eye" />
                    </Button>
                </div>
            ),
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
        <>
        <ReusableModalForm<FormData>
            show
            title="Bülten Detay / Düzenle"
            fields={getFields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            confirmButtonLabel="Gönder"
            cancelButtonLabel="Vazgeç"
            isLoading={isLoading}
            error={combinedError || undefined}
            onClose={() => navigate(`${import.meta.env.BASE_URL}contact-panel/current-newsletter`)}
            autoGoBackOnModalClose
            mode="single"
        />
        <Modal show={showGroupModal} onHide={() => setShowGroupModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Hedef Kitle</Modal.Title>
            </Modal.Header>
            <Modal.Body>İçerik daha sonra eklenecek.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowGroupModal(false)}>
                    Kapat
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
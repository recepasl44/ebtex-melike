import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ReusableTable, { ColumnDefinition } from '../ReusableTable';
import { useOtherIncomeShow } from '../../hooks/otherIncome/useOtherIncomeShow';
import { useOtherIncomeDelete } from '../../hooks/otherIncome/useOtherIncomeDelete';

interface DetailModalProps {
    show: boolean;
    onClose: () => void;
}

export default function OtherIncomeDetail({ show, onClose }: DetailModalProps) {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const { detail } = useOtherIncomeShow(Number(id));
    const { remove } = useOtherIncomeDelete();

    const columns: ColumnDefinition<any>[] = [
        { key: 'date', label: 'Tarih', render: r => r.date || '-' },
        {
            key: 'amount',
            label: 'Alınan Ödeme',
            render: r => (r.amount ? `${Number(r.amount).toLocaleString()} ₺` : '-')
        },
        {
            key: 'payment_method',
            label: 'Ödeme Şekli',
            render: r => r.payment_method || '-'
        },
        { key: 'income_item', label: 'Gelir Kalemi', render: r => r.income_item || '-' },
        { key: 'description', label: 'Açıklama', render: r => r.description || '-' },
        { key: 'id', label: 'Makbuz No', render: r => String(r.id) },
        {
            key: 'actions',
            label: 'İşlemler',
            render: r => (
                <>
                    <Button
                        variant="primary-light"
                        className="btn btn-icon btn-sm rounded-pill me-1"
                        onClick={() => navigate(`/other-income/crud/${r.id}`)}
                        title="Düzenle"
                    >
                        <i className="ti ti-pencil" />
                    </Button>
                    <Button
                        variant="danger-light"
                        className="btn btn-icon btn-sm rounded-pill me-1"
                        onClick={() => remove(Number(r.id))}
                        title="Sil"
                    >
                        <i className="ti ti-trash" />
                    </Button>
                    <Button
                        variant="primary-light"
                        className="btn btn-icon btn-sm rounded-pill"
                        onClick={() => navigate(`/revenuesReceipt/${r.id}`)}
                        title="Makbuz"
                    >
                        <i className="ti ti-printer" />
                    </Button>
                </>
            )
        }
    ];

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Gelir Detayı</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReusableTable
                    tableMode="single"
                    columns={columns}
                    data={detail ? [detail] : []}
                    showExportButtons={false}
                />
            </Modal.Body>
        </Modal>
    );
}
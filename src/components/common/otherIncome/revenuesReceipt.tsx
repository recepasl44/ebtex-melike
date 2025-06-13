import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useOtherIncomeShow } from '../../hooks/otherIncome/useOtherIncomeShow';

export default function RevenuesReceipt() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const { detail } = useOtherIncomeShow(Number(id));

    return (
        <Modal show centered onHide={() => navigate(-1)}>
            <Modal.Header closeButton>
                <Modal.Title>Gelir Makbuzu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {detail ? (
                    <>
                        <p><strong>Makbuz No:</strong> {detail.id}</p>
                        <p><strong>Tarih:</strong> {detail.date}</p>
                        <p><strong>Ödeme Şekli:</strong> {detail.payment_method}</p>
                        <p><strong>Gelir Kalemi:</strong> {detail.income_item}</p>
                        <p>
                            <strong>Alınan Ödeme:</strong>{' '}
                            {Number(detail.amount).toLocaleString('tr-TR')} ₺
                        </p>
                        {detail.description && (
                            <p><strong>Açıklama:</strong> {detail.description}</p>
                        )}
                    </>
                ) : (
                    <p>Yükleniyor...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => window.print()}>
                    Yazdır
                </Button>
                <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                    Kapat
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
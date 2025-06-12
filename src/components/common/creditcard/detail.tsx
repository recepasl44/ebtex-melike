import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Table } from "react-bootstrap";
import { useCreditCardShow } from "../../hooks/creditCard/useCreditCardShow";

export default function CreditCardDetail() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { creditCard, getCreditCard } = useCreditCardShow();

  useEffect(() => {
    if (id) {
      getCreditCard(Number(id));
    }
  }, [id, getCreditCard]);

  return (
    <Modal show={true} onHide={() => navigate(-1)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Kredi Kartı Detayı</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {creditCard ? (
          <Table bordered>
            <tbody>
              <tr>
                <th>Şube ID</th>
                <td>{creditCard.branch_id}</td>
              </tr>
              <tr>
                <th>Kart Sahibi</th>
                <td>{creditCard.card_holder_name}</td>
              </tr>
              <tr>
                <th>Kart Adı</th>
                <td>{creditCard.description}</td>
              </tr>
              <tr>
                <th>Kart No</th>
                <td>{creditCard.card_number}</td>
              </tr>
              <tr>
                <th>Son Kullanma</th>
                <td>
                  {creditCard.expire_month}/{creditCard.expire_year}
                </td>
              </tr>
              <tr>
                <th>Tutar</th>
                <td>{creditCard.amount}</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <div>Yükleniyor...</div>
        )}
      </Modal.Body>
    </Modal>
  );
}

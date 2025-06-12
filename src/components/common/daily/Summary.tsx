import { Row, Col, Card } from 'react-bootstrap';
import { useDailySummary } from '../../hooks/accounting/useDailySummary';

const Summary = () => {
  const { data } = useDailySummary();

  return (
    <div className="container mt-3">
      <h5 className="mb-3">Ödemeler</h5>
      <Row className="g-3 mb-4">
        {data?.payments.map((p, idx) => (
          <Col key={idx} xs={12} md={6} xl={3} className="d-flex">
            <Card className="custom-card flex-fill text-center" style={{ minHeight: 140 }}>
              <Card.Body className="p-3">
                <h6 className="fw-semibold mb-3">{p.category}</h6>
                <div className="d-flex justify-content-around">
                  <div>
                    <small className="text-muted d-block">Nakit</small>
                    <span>{p.cash || '-'}</span>
                  </div>
                  <div>
                    <small className="text-muted d-block">Kredi Kartı</small>
                    <span>{p.creditCard || '-'}</span>
                  </div>
                  <div>
                    <small className="text-muted d-block">Diğer</small>
                    <span>{p.other || '-'}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <small className="text-muted d-block">Toplam</small>
                  <span>{p.total}</span>
                </div>
                {p.description && (
                  <p className="small text-muted mt-2 mb-0">{p.description}</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h5 className="mb-3">Transfer</h5>
      <Row className="g-3">
        {data?.transfers.map((t, idx) => (
          <Col key={idx} xs={12} md={6} xl={3} className="d-flex">
            <Card className="custom-card flex-fill text-center" style={{ minHeight: 140 }}>
              <Card.Body className="p-3">
                <h6 className="fw-semibold mb-3">{t.type}</h6>
                <div className="d-flex justify-content-around">
                  <div>
                    <small className="text-muted d-block">Nakit</small>
                    <span>{t.cash || '-'}</span>
                  </div>
                  <div>
                    <small className="text-muted d-block">Banka</small>
                    <span>{t.bank || '-'}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <small className="text-muted d-block">Toplam</small>
                  <span>{t.total}</span>
                </div>
                {t.description && (
                  <p className="small text-muted mt-2 mb-0">{t.description}</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Summary;
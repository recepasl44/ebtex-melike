// src/pages/discountsOrServices/index.tsx
import { useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import ServiceTable from "./service/table"; // 1. adımda oluşturduğumuz service table
import DiscountTable from "./discount/table"; // 2. adımda oluşturduğumuz discount table

export default function CombinedPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<number>();
  const [selectedServiceName, setSelectedServiceName] = useState<string>("");
  const [enabled, setEnabled] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const [discountSearch, setDiscountSearch] = useState("");

  return (
    <div>
      <Row>
        <Col md={6}>
          <Card>
            <h5>Hizmet Yönetimi</h5>
            <Form.Control
              className="mb-2"
              placeholder="Hizmet ara..."
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
            />
            <ServiceTable
              searchValue={serviceSearch}
              showNameFilter={false}
              onSelectService={(service) => {
                setSelectedServiceId(service.id);
                setSelectedServiceName(service.name);
                setEnabled(true);
              }}
            />
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <h5>
              Hizmetine Bağlı İndirimler
              {selectedServiceName && ` - ${selectedServiceName}`}
            </h5>
            <Form.Control
              className="mb-2"
              placeholder="İndirim ara..."
              value={discountSearch}
              onChange={(e) => setDiscountSearch(e.target.value)}
            />
            <DiscountTable
              serviceId={selectedServiceId}
              enabled={enabled}
              searchValue={discountSearch}
              showNameFilter={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

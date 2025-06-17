// src/pages/discountsOrServices/index.tsx
import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import ServiceTable from "./service/table"; // 1. adımda oluşturduğumuz service table
import DiscountTable from "./discount/table"; // 2. adımda oluşturduğumuz discount table

export default function CombinedPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<number>();
  const [selectedServiceName, setSelectedServiceName] = useState<string>("");
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <Row>
        <Col md={6}>
          <Card>
            <h5>Hizmet Yönetimi</h5>
            <ServiceTable
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
            <DiscountTable serviceId={selectedServiceId} enabled={enabled} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

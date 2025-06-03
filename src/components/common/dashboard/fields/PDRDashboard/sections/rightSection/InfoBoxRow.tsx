import React from "react";
import { Col, Card } from "react-bootstrap";

interface InfoBoxRowProps {
  isDark: boolean;
}

const InfoBoxRow: React.FC<InfoBoxRowProps> = ({ isDark }) => {
  return (
    <Col xl={9} xxl={12}>
      <Card
        className="custom-card overflow-hidden"
        style={{
          borderRadius: "10px",
          background: isDark ? "#19191c" : "#FFF",
          boxShadow: isDark
            ? "0px 0px 10px rgba(255, 255, 255, 0.1)"
            : "0px 0px 10px rgba(0, 0, 0, 0.1)",
          border: isDark ? "1px solid #19191c" : "1px solid #E0E0E0",
          marginBottom: "20px",
        }}
      >
        <Card.Body
          style={{
            display: "flex",
            width: "100%",
            height: "239px",
            justifyContent: "center",
            alignItems: "center",
            background: isDark ? "#19191c" : "#FFF",
          }}
        >
          <span className="d-flex align-items-center justify-content-center fw-medium">
            BİLGİ KÖŞESİ
          </span>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default InfoBoxRow;

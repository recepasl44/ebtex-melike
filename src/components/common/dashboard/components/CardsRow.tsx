import React from "react";
import { Col } from "react-bootstrap";
import Spkcardscomponent from "../../../../@spk-reusable-components/reusable-dashboards/spk-cards.tsx";


interface CardsRowProps {
  cardsData: any;
}

const CardsRow: React.FC<CardsRowProps> = ({ cardsData }) => {
  return (
    <>
      {cardsData.map((Data: any) => (
        <Col xxl={3} xl={6} key={Data.id || Math.random()}>
          <Spkcardscomponent
            textbefore={false}
            textafter={true}
            cardClass="overflow-hidden main-content-card"
            headingClass="d-block mb-1"
            mainClass="d-flex align-items-start justify-content-between mb-2"
            Icon={true}
            card={Data}
            badgeClass="md rounded-pill"
            dataClass="mb-0"
          />
        </Col>
      ))}
    </>
  );
};

export default CardsRow;

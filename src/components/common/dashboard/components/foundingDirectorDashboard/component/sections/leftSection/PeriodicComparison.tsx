import { Col, Card, Nav, Tab } from "react-bootstrap";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";
import { PeriodicComparison } from "../../../../../type";
interface PeriodicComparisonProps {
  periodicComprassion: PeriodicComparison;
}

const PeriodicComparisonTable: React.FC<PeriodicComparisonProps> = ({
  periodicComprassion,
}) => {
  const renderTableData = (data: any[]) => {
    const tableData = [...data];

    const percentageRow = {
      seasson: "Değişim Yüzdeleri",
      number: periodicComprassion.totalChange.numberChange,
      endorsement: periodicComprassion.totalChange.endorsementChange,
      avarage: periodicComprassion.totalChange.avarageChange,
      isPercentageRow: true,
    };

    tableData.push(percentageRow);

    return tableData.map((item, index) => (
      <tr key={`periodic-${index}`}>
        <td>{item.seasson}</td>
        <td
          className={
            item.isPercentageRow
              ? Number(item.number) < 0
                ? "text-danger"
                : "text-success"
              : ""
          }
        >
          {item.isPercentageRow ? `${item.number}%` : item.number}
        </td>
        <td className={item.isPercentageRow ? "text-success" : ""}>
          {item.isPercentageRow
            ? `${item.endorsement}%`
            : `₺${item.endorsement}`}
        </td>
        <td className={item.isPercentageRow ? "text-success" : ""}>
          {item.isPercentageRow ? `${item.avarage}%` : `₺${item.avarage}`}
        </td>
      </tr>
    ));
  };
  return (
      <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Dönemsel Karşılaştırma</Card.Title>
        </Card.Header>
        <Card.Body>
          <Tab.Container defaultActiveKey="total">
              <Nav className="nav-tabs mb-3 border-0 d-flex flex-nowrap overflow-auto" role="tablist">
              <Nav.Item>
                <Nav.Link eventKey="total" className="text-nowrap">Toplamlar</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="okul" className="text-nowrap">Okul Türü</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="anaokulu" className="text-nowrap">Ana Okulu</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ilkokul" className="text-nowrap">İlkokul</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ortaokul" className="text-nowrap">Ortaokul</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="anadolu" className="text-nowrap">Anadolu Lisesi</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fen" className="text-nowrap">Fen Lisesi</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="total">
                <div className="table-responsive">
                  <SpkTablescomponent
                    tableClass="text-wrap"
                    tBodyClass="table-group-divider"
                    header={[
                      { title: "Dönem / Değişim" },
                      { title: "Sayı" },
                      { title: "Ciro" },
                      { title: "Ortalama" },
                    ]}
                  >
                    {renderTableData(periodicComprassion.total)}
                  </SpkTablescomponent>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="okul">
                <div className="table-responsive">
                  <SpkTablescomponent
                    tableClass="text-wrap"
                    tBodyClass="table-group-divider"
                    header={[
                      { title: "Dönem / Değişim" },
                      { title: "Sayı" },
                      { title: "Ciro" },
                      { title: "Ortalama" },
                    ]}
                  >
                    {renderTableData(periodicComprassion.total)}
                  </SpkTablescomponent>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="anaokulu">
                <div className="table-responsive">
                  <SpkTablescomponent
                    tableClass="text-wrap"
                    tBodyClass="table-group-divider"
                    header={[
                      { title: "Dönem / Değişim" },
                      { title: "Sayı" },
                      { title: "Ciro" },
                      { title: "Ortalama" },
                    ]}
                  >
                    {renderTableData(periodicComprassion.Anaokulu)}
                  </SpkTablescomponent>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="ilkokul">
                <div className="table-responsive">
                  <SpkTablescomponent
                    tableClass="text-wrap"
                    tBodyClass="table-group-divider"
                    header={[
                      { title: "Dönem / Değişim" },
                      { title: "Sayı" },
                      { title: "Ciro" },
                      { title: "Ortalama" },
                    ]}
                  >
                    {renderTableData(periodicComprassion.ilkokul)}
                  </SpkTablescomponent>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="ortaokul">
                <div className="table-responsive">
                  <SpkTablescomponent
                    tableClass="text-wrap"
                    tBodyClass="table-group-divider"
                    header={[
                      { title: "Dönem / Değişim" },
                      { title: "Sayı" },
                      { title: "Ciro" },
                      { title: "Ortalama" },
                    ]}
                  >
                    {renderTableData(periodicComprassion.ortaokul)}
                  </SpkTablescomponent>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="anadolu">
                <div className="table-responsive">
                  <SpkTablescomponent
                    tableClass="text-wrap"
                    tBodyClass="table-group-divider"
                    header={[
                      { title: "Dönem / Değişim" },
                      { title: "Sayı" },
                      { title: "Ciro" },
                      { title: "Ortalama" },
                    ]}
                  >
                    {renderTableData(periodicComprassion.anadolu_lisesi)}
                  </SpkTablescomponent>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="fen">
                <div className="table-responsive">
                  <SpkTablescomponent
                    tableClass="text-wrap"
                    tBodyClass="table-group-divider"
                    header={[
                      { title: "Dönem / Değişim" },
                      { title: "Sayı" },
                      { title: "Ciro" },
                      { title: "Ortalama" },
                    ]}
                  >
                    {renderTableData(periodicComprassion.fen_lisesi)}
                  </SpkTablescomponent>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PeriodicComparisonTable;

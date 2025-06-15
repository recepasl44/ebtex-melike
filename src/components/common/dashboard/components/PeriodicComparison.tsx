import { Col, Card, Nav, Tab } from "react-bootstrap";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
import { PeriodicComparison } from "../type.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface PeriodicComparisonProps {
  periodicComprassion: PeriodicComparison | any;
}

const PeriodicComparisonTable: React.FC<PeriodicComparisonProps> = ({
  periodicComprassion,
}) => {
  const isDark = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );

  console.log("isDark", isDark);

  const renderTableData = (data: any[] = []) => {
    const tableData = [...data];

    if (periodicComprassion?.totalChange) {
      const percentageRow = {
        seasson: "Değişim",
        number: periodicComprassion.totalChange.numberChange,
        endorsement: periodicComprassion.totalChange.endorsementChange,
        avarage: periodicComprassion.totalChange.avarageChange,
        isPercentageRow: true,
      };

      tableData.push(percentageRow);
    }

    // If less than 5 rows, add empty rows to maintain height
    if (tableData.length < 5) {
      const emptyRowsNeeded = 5 - tableData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        tableData.push({
          seasson: "",
          number: "",
          endorsement: "",
          avarage: "",
          isEmpty: true,
        });
      }
    }

    return tableData.map((item, index) => (
      <tr
        key={`periodic-${index}`}
        style={item.isEmpty ? { height: "48px" } : {}}
      >
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
            : item.endorsement
            ? `₺${item.endorsement}`
            : ""}
        </td>
        <td className={item.isPercentageRow ? "text-success" : ""}>
          {item.isPercentageRow
            ? `${item.avarage}%`
            : item.avarage
            ? `₺${item.avarage}`
            : ""}
        </td>
      </tr>
    ));
  };

  // Fixed height table container style
  const tableContainerStyle = {
    height: "300px", // Fixed height for 5 rows + header
    maxHeight: "300px", // Ensure it doesn't expand
    overflow: "hidden", // Hide overflow initially
    display: "flex",
    flexDirection: "column" as const,
  };

  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: "auto" as const, // Enable vertical scrolling
    flex: 1, // Take up all available space
    height: "100%", // Fill the container
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Dönemsel Karşılaştırma</Card.Title>
        </Card.Header>
        <Card.Body>
          <Tab.Container defaultActiveKey="total">
            <Nav
              className="nav-tabs mb-3 border-0 d-flex flex-nowrap overflow-auto"
              role="tablist"
            >
              <Nav.Item>
                <Nav.Link eventKey="total" className="text-nowrap">
                  Toplamlar
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="anaokulu" className="text-nowrap">
                  Ana Okulu
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ilkokul" className="text-nowrap">
                  İlkokul
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ortaokul" className="text-nowrap">
                  Ortaokul
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="anadolu" className="text-nowrap">
                  Anadolu Lisesi
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fen" className="text-nowrap">
                  Fen Lisesi
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="total">
                <div className="table-responsive" style={tableContainerStyle}>
                  <div style={scrollContainerStyle}>
                    <SpkTablescomponent
                      tableClass="text-wrap table-fixed"
                      tBodyClass="table-group-divider"
                      header={[
                        { title: "Dönem / Değişim" },
                        { title: "Sayı" },
                        { title: "Ciro" },
                        { title: "Ortalama" },
                      ]}
                    >
                      {renderTableData(periodicComprassion?.total || [])}
                    </SpkTablescomponent>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="anaokulu">
                <div className="table-responsive" style={tableContainerStyle}>
                  <div style={scrollContainerStyle}>
                    <SpkTablescomponent
                      tableClass="text-wrap table-fixed"
                      tBodyClass="table-group-divider"
                      header={[
                        { title: "Dönem / Değişim" },
                        { title: "Sayı" },
                        { title: "Ciro" },
                        { title: "Ortalama" },
                      ]}
                    >
                      {renderTableData(periodicComprassion?.Anaokulu || [])}
                    </SpkTablescomponent>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="ilkokul">
                <div className="table-responsive" style={tableContainerStyle}>
                  <div style={scrollContainerStyle}>
                    <SpkTablescomponent
                      tableClass="text-wrap table-fixed"
                      tBodyClass="table-group-divider"
                      header={[
                        { title: "Dönem / Değişim" },
                        { title: "Sayı" },
                        { title: "Ciro" },
                        { title: "Ortalama" },
                      ]}
                    >
                      {renderTableData(periodicComprassion?.ilkokul || [])}
                    </SpkTablescomponent>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="ortaokul">
                <div className="table-responsive" style={tableContainerStyle}>
                  <div style={scrollContainerStyle}>
                    <SpkTablescomponent
                      tableClass="text-wrap table-fixed"
                      tBodyClass="table-group-divider"
                      header={[
                        { title: "Dönem / Değişim" },
                        { title: "Sayı" },
                        { title: "Ciro" },
                        { title: "Ortalama" },
                      ]}
                    >
                      {renderTableData(periodicComprassion?.ortaokul || [])}
                    </SpkTablescomponent>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="anadolu">
                <div className="table-responsive" style={tableContainerStyle}>
                  <div style={scrollContainerStyle}>
                    <SpkTablescomponent
                      tableClass="text-wrap table-fixed"
                      tBodyClass="table-group-divider"
                      header={[
                        { title: "Dönem / Değişim" },
                        { title: "Sayı" },
                        { title: "Ciro" },
                        { title: "Ortalama" },
                      ]}
                    >
                      {renderTableData(periodicComprassion?.anadolu_lisesi || [])}
                    </SpkTablescomponent>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="fen">
                <div className="table-responsive" style={tableContainerStyle}>
                  <div style={scrollContainerStyle}>
                    <SpkTablescomponent
                      tableClass="text-wrap table-fixed"
                      tBodyClass="table-group-divider"
                      header={[
                        { title: "Dönem / Değişim" },
                        { title: "Sayı" },
                        { title: "Ciro" },
                        { title: "Ortalama" },
                      ]}
                    >
                      {renderTableData(periodicComprassion?.fen_lisesi || [])}
                    </SpkTablescomponent>
                  </div>
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

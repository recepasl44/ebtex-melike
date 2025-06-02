import React from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";

interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface VerticalTabsCardProps {
  title?: string;
  tabs: TabItem[];
  defaultActiveKey?: string;
  tabClassName?: string;
  contentClassName?: string;
  leftColumnWidth?: number;
  rightColumnWidth?: number;
}

const VerticalTabsCard: React.FC<VerticalTabsCardProps> = ({
  title = "Vertical alignment with lists",
  tabs,
  defaultActiveKey,
  tabClassName = "nav-tabs flex-column nav-style-4",
  contentClassName = "mt-2 mt-xl-0",
  leftColumnWidth = 3,
  rightColumnWidth = 9,
}) => {
  // If no defaultActiveKey is provided, use the first tab's id
  const activeKey = defaultActiveKey || (tabs.length > 0 ? tabs[0].id : "");

  return (
    <Card className="custom-card">
      {title && (
        <Card.Header>
          <div className="card-title">{title}</div>
        </Card.Header>
      )}
      <Tab.Container defaultActiveKey={activeKey}>
        <Card.Body className="">
          <Row>
            <Col xl={leftColumnWidth}>
              <Nav className={tabClassName} role="tablist">
                {tabs.map((tab) => (
                  <Nav.Item key={tab.id}>
                    <Nav.Link
                      eventKey={tab.id}
                      className=""
                      data-bs-toggle="tab"
                      role="tab"
                      aria-current="page"
                      href={`#${tab.id}`}
                      aria-selected="true"
                    >
                      {tab.title}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col xl={rightColumnWidth}>
              <Tab.Content className={contentClassName}>
                {tabs.map((tab) => (
                  <Tab.Pane
                    key={tab.id}
                    eventKey={tab.id}
                    className="text-muted"
                    id={tab.id}
                    role="tabpanel"
                  >
                    {tab.content}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Card.Body>
      </Tab.Container>
    </Card>
  );
};

export default VerticalTabsCard;
import React from "react";
import { Col } from "react-bootstrap";
import VerticalTabsCard from "./VerticalTabsCard.tsx";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface WeeklyFoodMenuRowProps {
  weeklyFoodsMenu: any;
}

const WeeklyFoodMenuRow: React.FC<WeeklyFoodMenuRowProps> = ({
  weeklyFoodsMenu,
}) => {
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

  // Helper function to ensure consistent row count (minimum 5 rows)
  const ensureMinimumRows = (dayData: any, day: string) => {
    const breakfast = [...(dayData?.breakfast ?? [])];
    const lunch = [...(dayData?.lunch ?? [])];

    console.log(`Processing ${day} menu:`, { breakfast, lunch });

    // Find the max length between breakfast and lunch
    const maxLength = Math.max(breakfast.length, lunch.length);

    // If we have fewer than 5 items, pad to 5
    if (maxLength < 5) {
      const emptyRowsNeeded = 5 - maxLength;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        breakfast.push("");
        lunch.push("");
      }
    }

    return { breakfast, lunch };
  };

  // Render a day's menu with consistent row count
  const renderDayMenu = (dayData: any, day: string) => {
    const { breakfast, lunch } = ensureMinimumRows(dayData || {}, day);

    return breakfast.map((breakfastItem: string, index: number) => (
      <tr
        key={`${day}-${index}`}
        className="text-nowrap"
        style={!breakfastItem && !lunch[index] ? { height: "48px" } : {}}
      >
        <td>{breakfastItem || "-"}</td>
        <td>{lunch[index] || "-"}</td>
      </tr>
    ));
  };

  return (
    <Col xxl={12} xl={12} className="mt-4">
      <VerticalTabsCard
        title="Haftalık Yemek Menüsü"
        tabs={[
          {
            id: "vertical1",
            title: "Pazartesi",
            content: (
              <div className="table-responsive" style={tableContainerStyle}>
                <div style={scrollContainerStyle}>
                  <SpkTablescomponent
                    tableClass="text-wrap table-fixed"
                    tBodyClass="table-group-divider"
                    header={[{ title: "Kahvaltı" }, { title: "Öğle Yemeği" }]}
                  >
                    {renderDayMenu(weeklyFoodsMenu?.monday, "monday")}
                  </SpkTablescomponent>
                </div>
              </div>
            ),
          },
          {
            id: "vertical2",
            title: "Salı",
            content: (
              <div className="table-responsive" style={tableContainerStyle}>
                <div style={scrollContainerStyle}>
                  <SpkTablescomponent
                    tableClass="text-wrap table-fixed"
                    tBodyClass="table-group-divider"
                    header={[{ title: "Kahvaltı" }, { title: "Öğle Yemeği" }]}
                  >
                    {renderDayMenu(weeklyFoodsMenu?.tuesday, "tuesday")}
                  </SpkTablescomponent>
                </div>
              </div>
            ),
          },
          {
            id: "vertical3",
            title: "Çarşamba",
            content: (
              <div className="table-responsive" style={tableContainerStyle}>
                <div style={scrollContainerStyle}>
                  <SpkTablescomponent
                    tableClass="text-wrap table-fixed"
                    tBodyClass="table-group-divider"
                    header={[{ title: "Kahvaltı" }, { title: "Öğle Yemeği" }]}
                  >
                    {renderDayMenu(weeklyFoodsMenu?.wednesday, "wednesday")}
                  </SpkTablescomponent>
                </div>
              </div>
            ),
          },
          {
            id: "vertical4",
            title: "Perşembe",
            content: (
              <div className="table-responsive" style={tableContainerStyle}>
                <div style={scrollContainerStyle}>
                  <SpkTablescomponent
                    tableClass="text-wrap table-fixed"
                    tBodyClass="table-group-divider"
                    header={[{ title: "Kahvaltı" }, { title: "Öğle Yemeği" }]}
                  >
                    {renderDayMenu(weeklyFoodsMenu?.Thursday, "thursday")}
                  </SpkTablescomponent>
                </div>
              </div>
            ),
          },
          {
            id: "vertical5",
            title: "Cuma",
            content: (
              <div className="table-responsive" style={tableContainerStyle}>
                <div style={scrollContainerStyle}>
                  <SpkTablescomponent
                    tableClass="text-wrap table-fixed"
                    tBodyClass="table-group-divider"
                    header={[{ title: "Kahvaltı" }, { title: "Öğle Yemeği" }]}
                  >
                    {renderDayMenu(weeklyFoodsMenu?.Friday, "friday")}
                  </SpkTablescomponent>
                </div>
              </div>
            ),
          },
          {
            id: "vertical6",
            title: "Cumartesi",
            content: (
              <div className="table-responsive" style={tableContainerStyle}>
                <div style={scrollContainerStyle}>
                  <SpkTablescomponent
                    tableClass="text-wrap table-fixed"
                    tBodyClass="table-group-divider"
                    header={[{ title: "Kahvaltı" }, { title: "Öğle Yemeği" }]}
                  >
                    {renderDayMenu(weeklyFoodsMenu?.Saturday, "saturday")}
                  </SpkTablescomponent>
                </div>
              </div>
            ),
          },
          {
            id: "vertical7",
            title: "Pazar",
            content: (
              <div className="table-responsive" style={tableContainerStyle}>
                <div style={scrollContainerStyle}>
                  <SpkTablescomponent
                    tableClass="text-wrap table-fixed"
                    tBodyClass="table-group-divider"
                    header={[{ title: "Kahvaltı" }, { title: "Öğle Yemeği" }]}
                  >
                    {renderDayMenu(weeklyFoodsMenu?.sunday, "sunday")}
                  </SpkTablescomponent>
                </div>
              </div>
            ),
          },
        ]}
      />
    </Col>
  );
};

export default WeeklyFoodMenuRow;

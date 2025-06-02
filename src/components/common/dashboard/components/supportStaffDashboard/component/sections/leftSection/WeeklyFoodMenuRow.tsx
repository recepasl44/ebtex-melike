import React from "react";
import { Col } from "react-bootstrap";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";
import VerticalTabsCard from "../../../../foundingDirectorDashboard/component/VerticalTabsCard";
import { WeeklyFoodsMenu } from "../../../../../type";


interface WeeklyFoodMenuRowProps {
  weeklyFoodsMenu: WeeklyFoodsMenu;
}

const WeeklyFoodMenuRow: React.FC<WeeklyFoodMenuRowProps> = ({
  weeklyFoodsMenu,
}) => {
  return (
    <Col xxl={12} xl={12}>
      <VerticalTabsCard
        title="Haftalık Yemek Menüsü"
        tabs={[
          {
            id: "vertical1",
            title: "Pazartesi",
            content: (
              <div className="table-responsive">
                <SpkTablescomponent
                  tableClass="text-nowrap table-md"
                  tBodyClass="table-group-divider"
                  header={[
                    { title: "Kahvaltı" },
                    { title: "Öğle Yemeği" },
                  ]}
                >
                  {weeklyFoodsMenu.monday.breakfast.map(
                    (breakfastItem: string, breakfastIndex: number) => (
                      <tr
                        key={`breakfast-mon-${breakfastIndex}`}
                        className="text-nowrap"
                      >
                        <td className="text-nowrap">{breakfastItem}</td>
                        <td className="text-nowrap">
                          {weeklyFoodsMenu.monday.lunch[breakfastIndex] ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )}
                </SpkTablescomponent>
              </div>
            ),
          },
          {
            id: "vertical2",
            title: "Salı",
            content: (
              <div className="table-responsive">
                <SpkTablescomponent
                  tableClass="text-wrap table-md"
                  tBodyClass="table-group-divider"
                  header={[
                    { title: "Kahvaltı" },
                    { title: "Öğle Yemeği" },
                  ]}
                >
                  {weeklyFoodsMenu.tuesday.breakfast.map(
                    (breakfastItem: string, breakfastIndex: number) => (
                      <tr
                        key={`breakfast-tue-${breakfastIndex}`}
                        className="text-nowrap"
                      >
                        <td>{breakfastItem}</td>
                        <td>
                          {weeklyFoodsMenu.tuesday.lunch[breakfastIndex] ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )}
                </SpkTablescomponent>
              </div>
            ),
          },
          {
            id: "vertical3",
            title: "Çarşamba",
            content: (
              <div className="table-responsive">
                <SpkTablescomponent
                  tableClass="text-wrap table-md"
                  tBodyClass="table-group-divider"
                  header={[
                    { title: "Kahvaltı" },
                    { title: "Öğle Yemeği" },
                  ]}
                >
                  {weeklyFoodsMenu.wednesday.breakfast.map(
                    (breakfastItem: string, breakfastIndex: number) => (
                      <tr
                        key={`breakfast-wed-${breakfastIndex}`}
                        className="text-nowrap"
                      >
                        <td>{breakfastItem}</td>
                        <td>
                          {weeklyFoodsMenu.wednesday.lunch[breakfastIndex] ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )}
                </SpkTablescomponent>
              </div>
            ),
          },
          {
            id: "vertical4",
            title: "Perşembe",
            content: (
              <div className="table-responsive">
                <SpkTablescomponent
                  tableClass="text-wrap table-md"
                  tBodyClass="table-group-divider"
                  header={[
                    { title: "Kahvaltı" },
                    { title: "Öğle Yemeği" },
                  ]}
                >
                  {weeklyFoodsMenu.Thursday.breakfast.map(
                    (breakfastItem: string, breakfastIndex: number) => (
                      <tr
                        key={`breakfast-thu-${breakfastIndex}`}
                        className="text-nowrap"
                      >
                        <td>{breakfastItem}</td>
                        <td>
                          {weeklyFoodsMenu.Thursday.lunch[breakfastIndex] ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )}
                </SpkTablescomponent>
              </div>
            ),
          },
          {
            id: "vertical5",
            title: "Cuma",
            content: (
              <div className="table-responsive">
                <SpkTablescomponent
                  tableClass="text-wrap table-md"
                  tBodyClass="table-group-divider"
                  header={[
                    { title: "Kahvaltı" },
                    { title: "Öğle Yemeği" },
                  ]}
                >
                  {weeklyFoodsMenu.Friday.breakfast.map(
                    (breakfastItem: string, breakfastIndex: number) => (
                      <tr
                        key={`breakfast-fri-${breakfastIndex}`}
                        className="text-nowrap"
                      >
                        <td>{breakfastItem}</td>
                        <td>
                          {weeklyFoodsMenu.Friday.lunch[breakfastIndex] ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )}
                </SpkTablescomponent>
              </div>
            ),
          },
          {
            id: "vertical6",
            title: "Cumartesi",
            content: (
              <div className="table-responsive">
                <SpkTablescomponent
                  tableClass="text-wrap table-md"
                  tBodyClass="table-group-divider"
                  header={[
                    { title: "Kahvaltı" },
                    { title: "Öğle Yemeği" },
                  ]}
                >
                  {weeklyFoodsMenu.Saturday.breakfast.map(
                    (breakfastItem: string, breakfastIndex: number) => (
                      <tr
                        key={`breakfast-sat-${breakfastIndex}`}
                        className="text-nowrap"
                      >
                        <td>{breakfastItem}</td>
                        <td>
                          {weeklyFoodsMenu.Saturday.lunch[breakfastIndex] ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )}
                </SpkTablescomponent>
              </div>
            ),
          },
          {
            id: "vertical7",
            title: "Pazar",
            content: (
              <div className="table-responsive">
                <SpkTablescomponent
                  tableClass="text-wrap table-md"
                  tBodyClass="table-group-divider"
                  header={[
                    { title: "Kahvaltı" },
                    { title: "Öğle Yemeği" },
                  ]}
                >
                  {weeklyFoodsMenu.sunday.breakfast.map(
                    (breakfastItem: string, breakfastIndex: number) => (
                      <tr
                        key={`breakfast-sun-${breakfastIndex}`}
                        className="text-nowrap"
                      >
                        <td>{breakfastItem}</td>
                        <td>
                          {weeklyFoodsMenu.sunday.lunch[breakfastIndex] ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )}
                </SpkTablescomponent>
              </div>
            ),
          },
        ]}
      />
    </Col>
  );
};

export default WeeklyFoodMenuRow;

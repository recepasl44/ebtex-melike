import { Card, Col } from "react-bootstrap"
import Spkapexcharts from "../../../../../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts"

interface WageStatusChartProps {
  wageStatus: any[]
}

const WageStatusChart : React.FC<WageStatusChartProps> = ({ wageStatus }) => {
	console.log("wageStatus", wageStatus)
  const Basicpieoptions = {
	chart: {
		height: 300,
		type: "pie",
		events: {
			mounted: (chart: { windowResizeHandler: () => void; }) => {
				chart.windowResizeHandler();
			}
		},
	},
	colors: ["#5c67f7", "#e354d4", "#ff8e6f"],
	labels: ["Team A", "Team B", "Team C"],
	legend: {
		position: "bottom"
	},
	dataLabels: {
		dropShadow: {
			enabled: false
		}
	},
}
const Basicpieseries = [44, 55, 13]
  return (
        <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Basic Pie Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="pie-basic">
                                <Spkapexcharts chartOptions={Basicpieoptions} chartSeries={Basicpieseries} type="pie" width={"100%"} height={300} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
  )
}

export default WageStatusChart

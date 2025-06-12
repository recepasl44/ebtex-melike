import { Card, Col } from 'react-bootstrap'
import Spkapexcharts from '../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts.tsx'
import { ApexOptions } from 'apexcharts';

interface MonthlyInstallmentStatusTableProps {
   chartOptions: ApexOptions;
  chartSeries: ApexAxisChartSeries;
}

const MonthlyInstallmentStatusTable : React.FC<MonthlyInstallmentStatusTableProps> = ({
  chartOptions,
  chartSeries,
}) => {
  return (
  <Col xxl={12} xl={12}>
        {/* Aylık Taksit Durumu (Bar Chart) */}
        <Card className="custom-card">
          <Card.Header className="justify-content-between">
            <Card.Title>Aylık Taksit Durumu</Card.Title>
          </Card.Header>
          <Card.Body>
            <div id="sales-overview">
              <Spkapexcharts
                chartOptions={chartOptions}
                chartSeries={chartSeries}
                type="bar"
                width={"100%"}
                height={315}
              />
            </div>
          </Card.Body>
        </Card>
        </Col>
  )
}

export default MonthlyInstallmentStatusTable

import  { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Pageheader from "../../../../components/page-header/pageheader";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts";
import { Areaoptions, Areaseries, Monooptions, Monoseries } from "../../../../components/common/data/charts/apexcharts/polarareadata";

const PolarareaChart = () => {
    return (
        <Fragment>
            {/* <!-- Page Header --> */}

            <Pageheader title="Charts" subtitle="Apex Charts" currentpage="Apex Polar Area Charts" activepage="Apex Polar Area Charts" />

            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <Row>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Basic Polar Area Chart</Card.Title>
                        </Card.Header>
                        <Card.Body className=" mx-auto">
                            <div id="polararea-basic">
                                <Spkapexcharts chartOptions={Areaoptions} chartSeries={Areaseries} type="polarArea" width={"100%"} height={320} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Polar Area Monochrome Chart</Card.Title>
                        </Card.Header>
                        <Card.Body className="">
                            <div id="polararea-monochrome">
                                <Spkapexcharts chartOptions={Monooptions} chartSeries={Monoseries} type="polarArea" width={"100%"} height={320} />

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* <!--End::row-1 --> */}
        </Fragment>
    )
};

export default PolarareaChart;
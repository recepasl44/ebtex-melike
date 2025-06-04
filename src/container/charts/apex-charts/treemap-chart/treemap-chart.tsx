import  { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Pageheader from "../../../../components/page-header/pageheader";
import Spkapexcharts from "../../../../@spk-reusable-components/reusable-plugins/spk-apexcharts";
import {  Treebasicoptions, Treebasicseries, Treecoloroptions, Treecolorseries, Treedisoptions, Treedisseries, Treemultioptions, Treemultiseries } from "../../../../components/common/data/charts/apexcharts/treemapdata";

const TreemapChart = () => {
    return (
        <Fragment>
            {/* <!-- Page Header --> */}


            <Pageheader title="Charts" subtitle="Apex Charts" currentpage="Apex Treemap Charts" activepage="Apex Treemap Charts" />

            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <Row>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Basic Treemap Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="treemap-basic">
                                <Spkapexcharts chartOptions={Treebasicoptions} chartSeries={Treebasicseries} type="treemap" width={"100%"} height={350} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Multi Dimensional Treemap Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="treemap-multi">
                                <Spkapexcharts chartOptions={Treemultioptions} chartSeries={Treemultiseries} type="treemap" width={"100%"} height={350} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Distributed Treemap Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="treemap-distributed">
                                <Spkapexcharts chartOptions={Treedisoptions} chartSeries={Treedisseries} type="treemap" width={"100%"} height={350} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Treemap with color ranges</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div id="treemap-colorranges">
                                <Spkapexcharts chartOptions={Treecoloroptions} chartSeries={Treecolorseries} type="treemap" width={"100%"} height={350} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* <!--End::row-1 --> */}
        </Fragment>
    )
};

export default TreemapChart;
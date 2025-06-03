import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Pageheader from "../../../components/page-header/pageheader";
import SpkTablescomponent from "../../../@spk-reusable-components/reusable-tables/tables-component";

const CssGrid = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}

            <Pageheader title="Utilities" currentpage="Css Grid" activepage="Css Grid" />

            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <Row>
                <Col xxl={6}>
                    <Row>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        Auto columns
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className=" bd-example-cssgrid">
                                    <p>When there are no classes on the grid items (the immediate children of a
                                        <span className="text-danger">.grid</span>),
                                        each grid item will automatically be sized to one column.
                                    </p>
                                    <div className="grid mb-3 text-center grid-autocol-responsive">
                                        <div className="g-col-6">.g-col-6</div>
                                        <div className="g-col-6">.g-col-6</div>

                                        <div className="g-col-6">.g-col-6</div>
                                        <div className="g-col-6">.g-col-6</div>
                                    </div>
                                    <p>This behavior can be mixed with grid column classes.</p>
                                    <div className="grid text-center grid-col-mixed-responsive">
                                        <div className="g-col-6">.g-col-6</div>
                                        <div>1</div>
                                        <div>1</div>
                                        <div>1</div>
                                        <div>1</div>
                                        <div>1</div>
                                        <div>1</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        Columns and gaps
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className=" bd-example-cssgrid text-center">
                                    <div className="grid mb-3"
                                        style={{ "--bs-columns": " 4", "--bs-gap": "5rem" } as React.CSSProperties}

                                    >
                                        <div className="g-col-2">.g-col-2</div>
                                        <div className="g-col-2">.g-col-2</div>
                                    </div>
                                    <div className="grid"

                                        style={{ "--bs-columns": "10", "--bs-gap": "1rem" } as React.CSSProperties}

                                    >
                                        <div className="g-col-6">.g-col-6</div>
                                        <div className="g-col-4">.g-col-4</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        starts
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className=" bd-example-cssgrid text-center">
                                    <div className="grid">
                                        <div className="g-col-3 g-start-2">.g-col-3 .g-start-2</div>
                                        <div className="g-col-4 g-start-6">.g-col-4 .g-start-6</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        Responsive
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className=" bd-example-cssgrid text-center">
                                    <div className="grid mb-3 gap-2 sm:gap-6">
                                        <div className="g-col-md-4">.g-col-md-4</div>
                                        <div className="g-col-md-4">.g-col-md-4</div>
                                        <div className="g-col-md-4">.g-col-md-4</div>
                                    </div>
                                    <p>Compare that to this two column layout at all viewports.</p>
                                    <div className="grid gap-2 sm:gap-6">
                                        <div className="g-col-6">.g-col-6</div>
                                        <div className="g-col-6">.g-col-6</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        Gaps
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className=" bd-example-cssgrid text-center">
                                    <p>Change the vertical gaps only by modifying the <span
                                        className="text-danger">rowGap</span>. Note that we use gap on
                                        <span className="text-danger">.grid</span>s, but rowGap and <span
                                            className="text-danger">column-gap</span>can be modified as needed.
                                    </p>
                                    <div className="grid mb-3 sm:gap-6 gap-1"

                                        style={{ "rowGap": "0" } as React.CSSProperties}
                                    >
                                        <div className="g-col-6">.g-col-6</div>
                                        <div className="g-col-6">.g-col-6</div>

                                        <div className="g-col-6">.g-col-6</div>
                                        <div className="g-col-6">.g-col-6</div>
                                    </div>
                                    <p>Because of that, you can have different vertical and horizontal gaps, which
                                        can
                                        take a single value (all sides) or a pair of values (vertical and
                                        horizontal).
                                        This can be applied with an inline style for <span
                                            className="text-danger">gap</span>, or with our <span
                                                className="text-danger">--bs-gap</span> CSS
                                        variable.</p>
                                    <div className="grid gap-2 sm:gap-6"
                                        style={{ "--bs-gap": ".25rem 1rem" } as React.CSSProperties}
                                    >
                                        <div className="g-col-6">.g-col-6</div>
                                        <div className="g-col-6">.g-col-6</div>

                                        <div className="g-col-6">.g-col-6</div>
                                        <div className="g-col-6">.g-col-6</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xxl={6}>
                    <Row>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        No grid classes
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className=" bd-example-cssgrid text-center">
                                    <div className="grid"
                                        style={{ "--bs-columns": "3" } as React.CSSProperties}
                                    >
                                        <div>Auto-column</div>
                                        <div>Auto-column</div>
                                        <div>Auto-column</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        Three columns
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className=" bd-example-cssgrid text-center">
                                    <div className="grid gap-2 sm:gap-6">
                                        <div className="g-col-4">.g-col-4</div>
                                        <div className="g-col-4">.g-col-4</div>
                                        <div className="g-col-4">.g-col-4</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        Nesting
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className=" bd-example-cssgrid text-center nesting-grid-reponsive">
                                    <div className="grid"
                                        style={{ "--bs-columns": "3" } as React.CSSProperties}
                                    >
                                        <div>
                                            First auto-column
                                            <div className="grid">
                                                <div>Auto-column</div>
                                                <div>Auto-column</div>
                                            </div>
                                        </div>
                                        <div>
                                            Second auto-column
                                            <div className="grid"
                                                style={{ "--bs-columns": "12" } as React.CSSProperties}
                                            >
                                                <div className="g-col-6">6 of 12</div>
                                                <div className="g-col-4">4 of 12</div>
                                                <div className="g-col-2">2 of 12</div>
                                            </div>
                                        </div>
                                        <div>Third auto-column</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        Customizing
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className="">
                                    <div className="table-responsive">
                                        <SpkTablescomponent header={[{ title: 'Variable' }, { title: 'Fallback value' }, { title: 'Description' }]}>
                                            <tr>
                                                <td><code>--bs-rows</code></td>
                                                <td><code>1</code></td>
                                                <td>The number of rows in your grid template</td>
                                            </tr>
                                            <tr>
                                                <td><code>--bs-columns</code></td>
                                                <td><code>12</code></td>
                                                <td>The number of columns in your grid template</td>
                                            </tr>
                                            <tr>
                                                <td><code>--bs-gap</code></td>
                                                <td><code>1.5rem</code></td>
                                                <td>The size of the gap between columns (vertical and
                                                    horizontal)
                                                </td>
                                            </tr>
                                        </SpkTablescomponent>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        Wrapping
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className=" bd-example-cssgrid text-center">
                                    <div className="grid gap-2 sm:gap-6">
                                        <div className="g-col-6">.g-col-6</div>
                                        <div className="g-col-6">.g-col-6</div>

                                        <div className="g-col-6">.g-col-6</div>
                                        <div className="g-col-6">.g-col-6</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header>
                                    <Card.Title>
                                        Adding rows
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body className=" bd-example-cssgrid text-center">
                                    <div className="grid"
                                        style={{ "--bs-rows": "3", "--bs-columns": "3" } as React.CSSProperties}
                                    >
                                        <div>Auto-column</div>
                                        <div className="g-start-2"
                                            style={{ "gridRow": "2" } as React.CSSProperties}
                                        >Auto-column</div>
                                        <div className="g-start-3"
                                            style={{ "gridRow": "3" } as React.CSSProperties}
                                        >Auto-column</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* <!-- End:: row-1 --> */}
        </Fragment>
    )
};

export default CssGrid;
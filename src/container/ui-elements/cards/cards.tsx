import  { Fragment, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Pageheader from "../../../components/page-header/pageheader";
import BasicCard from "../../../@spk-reusable-components/reusable-uielements/cards/basic-card";
import { Link } from "react-router-dom";
import SpkSocialiconcard from "../../../@spk-reusable-components/reusable-uielements/cards/spksocialiconcard";
import Spktitlecards from "../../../@spk-reusable-components/reusable-uielements/cards/spktitlecards";
import SpkDropdowncard from "../../../@spk-reusable-components/reusable-uielements/cards/spkdropdowncard";
import Spkratingcard from "../../../@spk-reusable-components/reusable-uielements/cards/spkratingcard";
import SpkCollapsecard from "../../../@spk-reusable-components/reusable-uielements/cards/spkcollapsecard";
import SpkButton from "../../../@spk-reusable-components/reusable-uielements/spk-button";
import SpkListgroupcards from "../../../@spk-reusable-components/reusable-uielements/cards/spklistgroupcards";
import Spknavigationcards from "../../../@spk-reusable-components/reusable-uielements/cards/spknavigationcards";
import Spkimagecapcards from "../../../@spk-reusable-components/reusable-uielements/cards/spkimagecapcards";
import Spkimageoverlaycard from "../../../@spk-reusable-components/reusable-uielements/cards/spkimageoverlaycard";
import Spkhorizontalcards from "../../../@spk-reusable-components/reusable-uielements/cards/spkhorizontalcards";
import Spkbgcards from "../../../@spk-reusable-components/reusable-uielements/cards/spkbgcards";
import { Bordercarddata } from "../../../components/common/data/ui-elements/cardsdata";
import Spkborderedcards from "../../../@spk-reusable-components/reusable-uielements/cards/spkborderedcards";
import SpkProfilecard from "../../../@spk-reusable-components/reusable-uielements/cards/spkprofilecard";
import media22 from "../../../assets/images/media/media-22.jpg"
import media23 from "../../../assets/images/media/media-23.jpg"
import media24 from "../../../assets/images/media/media-24.jpg"
import media33 from "../../../assets/images/media/media-33.jpg"
import media34 from "../../../assets/images/media/media-34.jpg"
import media35 from "../../../assets/images/media/media-35.jpg"
import media36 from "../../../assets/images/media/media-36.jpg"
import media37 from "../../../assets/images/media/media-37.jpg"
import media38 from "../../../assets/images/media/media-38.jpg"
import media39 from "../../../assets/images/media/media-39.jpg"
import media4 from "../../../assets/images/media/media-4.jpg"
import media26 from "../../../assets/images/media/media-26.jpg"
import media27 from "../../../assets/images/media/media-27.jpg"
import media28 from "../../../assets/images/media/media-28.jpg"
import media29 from "../../../assets/images/media/media-29.jpg"
import media30 from "../../../assets/images/media/media-30.jpg"
import media31 from "../../../assets/images/media/media-31.jpg"
import media32 from "../../../assets/images/media/media-32.jpg"
import media9 from "../../../assets/images/media/media-9.jpg"
import media15 from "../../../assets/images/media/media-15.jpg"
import media40 from "../../../assets/images/media/media-40.jpg"
import media41 from "../../../assets/images/media/media-41.jpg"
import media42 from "../../../assets/images/media/media-42.jpg"
import media43 from "../../../assets/images/media/media-43.jpg"
import media44 from "../../../assets/images/media/media-44.jpg"
import media45 from "../../../assets/images/media/media-45.jpg"
import media46 from "../../../assets/images/media/media-46.jpg"
import media47 from "../../../assets/images/media/media-47.jpg"
import face11 from "../../../assets/images/faces/11.jpg"
import face1 from "../../../assets/images/faces/1.jpg"
import face5 from "../../../assets/images/faces/5.jpg"
import face16 from "../../../assets/images/faces/16.jpg"
import face13 from "../../../assets/images/faces/13.jpg"
import face14 from "../../../assets/images/faces/14.jpg"
import face12 from "../../../assets/images/faces/12.jpg"
import face3 from "../../../assets/images/faces/3.jpg"
import face15 from "../../../assets/images/faces/15.jpg"
import face8 from "../../../assets/images/faces/8.jpg"

const Cards = () => {

    const [BasicExpanded, setBasicExpanded] = useState(true);

    const BasicHandleExpandClick = () => {
        setBasicExpanded(!BasicExpanded);
    };

    //Card With Close Button
    const [Basicshow, setBasicshow] = useState(true);

    //Fullscreen
    const [fullScreen, setFullscreen] = useState("true");
    const [fullscreenshow, setfullscreenShow] = useState(false);

    const fullscreenmodalClose = () => setfullscreenShow(false);

    function handleShow(breakpoint: any) {
        setFullscreen(breakpoint);
        setfullscreenShow(true);
    }

    return (
        <Fragment>
            {/* <!-- Page Header --> */}

            <Pageheader title="Ui Elements" currentpage="Cards" activepage="Cards" />

            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <Row>
                <Col xxl={3} xl={6} lg={6} md={6} sm={12} className="">
                    <BasicCard titleClass="fw-medium" imgClass="card-img-top" footer="<span class='card-text'>Last updated 3 mins ago</span>"
                        imgSrc={media22} title="Card title" bodyText={(
                            <>
                                <p className="card-text text-muted">
                                    As the wind whistled through the dense foliage, scattering leaves like whispered secrets, a lone sapling stood resilient, its roots anchored deep in the earth.
                                </p>
                                <Link to="#!" className="btn btn-primary">Read More</Link>
                            </>
                        )}
                    />
                </Col>
                <Col xxl={3} xl={6} lg={6} md={6} sm={12} className="">
                    <BasicCard titleClass="fw-medium" imgClass="card-img-top" imgSrc={media24} title="Card title" bodyText={(
                        <>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <ul className="list-group list-group-flush"
                            > <li className="list-group-item">An item</li>
                                <li className="list-group-item">A second item</li>
                            </ul>
                            <div className="card-body">
                                <a href="#!" className="card-link text-primary">Card link</a>
                                <a href="#!" className="card-link text-secondary d-inline-block">Another link</a>
                            </div>
                        </>
                    )} />

                </Col>
                <Col xxl={3} xl={6} lg={6} md={6} sm={12} className="">
                    <BasicCard header="Featured" title="Special title treatment"
                        bodyText={(
                            <>
                                <p className="card-text">Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage</p>
                                <Link to="#!" className="btn btn-primary">Read More</Link>
                            </>
                        )}
                    />
                    <BasicCard title="Card title" subTitle="Card subtitle"  footer={(
                    <>
                    <a href="#" className="card-link text-danger m-1">Buy Now</a> 
                    <a href="#" className="card-link text-success m-1"><u>Review</u> </a> 
                    </>
                      )} bodyText={(
                        <>
                            <p className="card-text">Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage</p>
                        </>
                    )}
                    />
                </Col>
                <Col xxl={3} xl={6} lg={6} md={6} sm={12} className="">
                    
                    <BasicCard imgClass="card-img-top" imgSrc={media23} bodyText={(
                        <>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </>
                    )}
                    />
                    <h6 className="mb-3">Only Card Body:</h6>
                    <BasicCard bodyText={(
                        <>
                            <p className="">It is a long established fact that a reader will be distracted by the readable content.</p>
                            <p className="">It is a long established fact that a reader will be distracted by the readable content.</p>
                            <Link to="#!" className="btn btn-primary1 me-1">Read More</Link>
                            <Link to="#!" className="btn btn-primary2 me-1">Get Details</Link>
                        </>
                    )}
                    />
                </Col>
            </Row>
            {/* <!-- End::row-1 --> */}

            {/* <!-- Start::row-3--> */}
            <h6 className="mb-3">Card Header & Footer:</h6>
            <Row>
                <Col xl={3}>
                    <SpkSocialiconcard Name="Iliana Lilly" Role="Web Developer" Imgsrc={face1} />
                </Col>
                <Col xl={3}>
                    <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Cardfooter={true} Cardheader={false} Customclass="custom-card border border-primary" Footertext=" Lorem Ipsum is therefore always free from repetition, injected humour.">
                        <svg className="footer-card-icon my-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#C6CDD1" d="M19 21H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2z" /><path fill="#C6CDD1" d="M11 1H3a2 2 0 0 0-2 2v8h10V1z" /><path fill="#A1ABB2" d="M21 11V3a2 2 0 0 0-2-2h-8v10h10z" /><path fill="#878A8F" d="M1 11v8a2 2 0 0 0 2 2h8V11H1z" /><path fill="#797D82" d="M11 11v10h8a2 2 0 0 0 2-2v-8H11z" /><path fill="#FFF" d="M14 6h5v1h-5z" /><path d="M19 20.75H3a2 2 0 0 1-2-2V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-.25a2 2 0 0 1-2 2z" opacity=".1" /><circle cx="16" cy="16" r="7" fill="#136ad0" /><path d="M16 22.75c-3.08 0-5.704-1.97-6.696-4.713C10.18 20.907 12.85 23 16 23s5.82-2.094 6.696-4.963C21.704 20.781 19.08 22.75 16 22.75z" opacity=".1" /><path fill="#FFF" d="M16 9.25c3.08 0 5.704 1.97 6.696 4.713C21.82 11.093 19.15 9 16 9s-5.82 2.094-6.696 4.963C10.296 11.219 12.92 9.25 16 9.25z" opacity=".2" /><path fill="#FFF" d="M4 6h5v1H4z" /><path fill="#FFF" d="M6 4h1v5H6zM13 14h6v1h-6zM13 17h6v1h-6zM4.379 15.086l.707-.707 3.535 3.535-.707.707z" /><path fill="#FFF" d="m4.379 17.914 3.535-3.535.707.707-3.535 3.535z" /><path fill="#FFF" d="M19 1H3a2 2 0 0 0-2 2v.25a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2V3a2 2 0 0 0-2-2z" opacity=".2" /><linearGradient id="a" x1="14.367" x2="19.862" y1="14.367" y2="19.862" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3E2723" stopOpacity=".2" /><stop offset="1" stopColor="#3E2723" stopOpacity=".02" /></linearGradient><path fill="url(#a)" d="M19 14v1h-6l2 2h4v1h-6l4.766 4.766a7.014 7.014 0 0 0 5-5L19 14z" /><linearGradient id="b" x1="-.448" x2="23.366" y1="5.662" y2="16.766" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFF" stopOpacity=".2" /><stop offset="1" stopColor="#FFF" stopOpacity="0" /></linearGradient><path fill="url(#b)" d="M21 11.11V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8.11A6.974 6.974 0 0 0 16 23c3.86 0 7-3.14 7-7a6.974 6.974 0 0 0-2-4.89z" /></svg>
                        <p className="mb-0 mt-3 fs-20 fw-medium lh-1">
                            Calculations
                        </p>
                    </Spktitlecards>
                </Col>
                <Col xl={3}>
                    <SpkDropdowncard Navigate="#!" Imgsrc={face11} Title="Gatin Leo" Gender="28 Years, Male" Date="28,Mar 2024" Role="Assistant Professor"
                        Text="If you are going to use, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators." />
                </Col>
                <Col xl={3}>
                    <Spkratingcard Timevalue="1 year ago" Text="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour"
                        Name="Corey Anderson" Imgsrc={face12} Title="Very Great!" />
                </Col>
                <Col xl={4}>
                    <SpkCollapsecard Navigate="#!" OnClickFunc={BasicHandleExpandClick} Expand={BasicExpanded} Timeout={3000} footertext="Read More" Title="Card With Collapse Button">
                        <h6 className="card-text fw-medium">Collapsible Card</h6>
                        <p className="card-text mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words</p>
                    </SpkCollapsecard>
                </Col>
                <Col xl={4}>
                    {Basicshow ?
                        <Spktitlecards AnchortagNavigate="#!" Navigate="#!" ButtonTag={true} Cardfooter={true} Customclass="custom-card" Cardheader={true} Title="Card With Close Button" Linktag={true} Icontag={true} Icon="ri-close-line fs-18" CustomHeaderclass="justify-content-between" OnclickFunc={() => setBasicshow(false)}>
                            <h6 className="card-text fw-medium">Closed Card</h6>
                            <p className="card-text mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words</p>
                        </Spktitlecards>
                        : null}
                </Col>
                <Col xl={4}>
                    <Modal show={fullscreenshow} fullscreen={fullScreen} onHide={() => setfullscreenShow(false)}>
                        <Modal.Header>
                            <Modal.Title className="fs-15">CARD WITH FULLSCREEN BUTTON</Modal.Title>
                            <span className="d-flex ms-auto" onClick={fullscreenmodalClose}><i className='fe fe-x ms-auto' ></i></span>
                        </Modal.Header>
                        <Modal.Body>
                            <h6 className='card-text fw-medium'> FullScreen Card</h6>

                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Modal.Body>
                        <Modal.Footer>
                            <SpkButton Buttonvariant="secondary" onClickfunc={fullscreenmodalClose}>
                                Close
                            </SpkButton>
                            <SpkButton Buttonvariant="primary">
                                Save Changes
                            </SpkButton>
                        </Modal.Footer>
                    </Modal>
                    <Spktitlecards AnchortagNavigate="#!" Navigate="#!" ButtonTag={true} Cardfooter={true} Cardheader={true} Title="Card With Fullscreen Button" Customclass="custom-card" Icontag={true} Linktag={true} Icon="ri-fullscreen-line"
                        CustomHeaderclass="justify-content-between" OnclickFunc={() => handleShow(true)}>
                        <h6 className="card-text fw-medium">FullScreen Card</h6>
                        <p className="card-text mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words</p>
                    </Spktitlecards>
                </Col>
            </Row>
            {/* <!-- End::row-3--> */}

            {/* <!-- Start::row-2 --> */}
            <Row>
                <Col xl={2}>
                    <BasicCard bodyText={(
                        <>
                            <img src={media4} className="card-img mb-3" alt="..." />
                            <h6 className="card-title fw-medium mb-3">Mountains<span className="badge bg-primary float-end fs-10">New</span></h6>
                            <p className="card-text">With supporting text below as a natural lead-in.</p>
                        </>
                    )}
                    />
                </Col>
                <Col xl={2}>
                    <BasicCard bodyText={(
                        <>
                            <img src={media9} className="card-img mb-3" alt="..." />
                            <h6 className="card-title fw-medium mb-3">Hills<span className="badge bg-secondary float-end fs-10">Hot</span></h6>
                            <p className="card-text">With supporting text below as a natural lead-in.</p>
                        </>
                    )}
                    />
                </Col>
                <Col xl={2}>
                    <BasicCard bodyText={(
                        <>
                            <img src={media15} className="card-img mb-3" alt="..." />
                            <h6 className="card-title fw-medium mb-3">Nature<span className="badge bg-light text-dark float-end fs-10">offer</span></h6>
                            <p className="card-text">With supporting text below as a natural lead-in.</p>
                        </>
                    )}
                    />
                </Col>
                <Col xl={3}>
                    <BasicCard header="Featured" titleClass="fw-medium mb-2" cardClass="text-center" footer={(<span className="text-muted">11.32pm</span>)} bodyText={(
                        <>
                            <h6 className="card-title fw-medium mb-2">Breaking News !</h6>
                            <p className="card-text mb-4">With supporting text below as a natural lead-in to
                                additional content.</p>
                            <Link to="#!" className="btn btn-primary mt-2 me-1">Read More</Link>
                            <Link to="#!" className="btn btn-outline-secondary mt-2 me-1">Close</Link>
                        </>
                    )}
                    />
                </Col>
                <Col xl={3}>
                    <SpkProfilecard Imgsrc={face12} Posts="25" Followers="1253" Following="367" Name="Angelina Caprio" Role="Angular Developer" Personalinformation="Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions " />
                </Col>
                <Col xxl={6} xl={6} lg={12} className="">
                    <Row>
                        <h6 className="mb-3">Quote:</h6>
                        <Col xl={12}>
                            <BasicCard bodyText={(
                                <>
                                    <blockquote className="blockquote mb-0 text-center"> <h6>Goodness isn't about avoiding falls, but about the courage to rise, stronger and kinder, with every stumble.</h6> <footer className="blockquote-footer mt-2 fs-14">Someone famous in <cite title="Source Title">Source Title</cite></footer> </blockquote>
                                </>
                            )}
                            />
                            <BasicCard cardClass="bg-primary3" bodyClass="text-fixed-white" bodyText={(
                                <>
                                    <blockquote className="blockquote mb-0 text-center"> <h6 className="text-fixed-white">Goodness isn't about avoiding falls, but about the courage to rise, stronger and kinder, with every stumble.</h6> <footer className="blockquote-footer mt-2 fs-14 text-fixed-white op-7">Someone famous in <cite title="Source Title">Source Title</cite></footer> </blockquote>
                                </>
                            )}
                            />
                        </Col>
                        <Col xl={12}>
                            <h6 className="mb-3">List Group:</h6>
                            <Row>
                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <SpkListgroupcards Listvariant="flush" >
                                        <li className="list-group-item">An item</li>
                                        <li className="list-group-item">A second item</li>
                                        <li className="list-group-item">A third item</li>
                                        <li className="list-group-item">A fourth item</li>
                                    </SpkListgroupcards>
                                </div>
                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <SpkListgroupcards Listvariant="flush" CardHeader={true} Headertext="Featured">
                                        <li className="list-group-item">An item</li>
                                        <li className="list-group-item">A second item</li>
                                        <li className="list-group-item">A third item</li>
                                    </SpkListgroupcards>
                                </div>
                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
                                    <SpkListgroupcards Listvariant="flush" CardFooter={true} Headertext="Featured" Footertext="Card footer" Customfooterclass="border-top-0">
                                        <li className="list-group-item">An item</li>
                                        <li className="list-group-item">A second item</li>
                                        <li className="list-group-item">A third item</li>
                                    </SpkListgroupcards>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xxl={6} xl={6} lg={12} className="">
                    <h6 className="mb-3">Using Grid Markups:</h6>
                    <div className="row row-cols-12">
                        <div className="col">
                            <BasicCard bodyText={(
                                <>
                                    <img src={media26} className="card-img mb-3" alt="..." />
                                    <h6 className="card-title fw-medium">Product B </h6>
                                    <p className="card-text">With supporting text below as a natural   lead-in to additional content.</p>
                                    <Link className="btn btn-secondary" to="#!">Purchase</Link>
                                </>
                            )}
                            />
                        </div>
                        <div className="col">
                            <BasicCard bodyText={(
                                <>
                                    <img src={media27} className="card-img mb-3" alt="..." />
                                    <h6 className="card-title fw-medium">Product C </h6>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <Link className="btn btn-light" to="#!">Purchase</Link>
                                </>
                            )}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            {/* <!-- End::row-2 --> */}

            {/* <!-- Start::row-4 --> */}
            <Row>
                <Col xl={3}>
                    <Row>
                        <h6 className="mb-3">Mixins utilities:</h6>
                        <Col xl={12}>
                            <BasicCard useDivHeader={true} cardHeader="bg-transparent border-bottom border-success" header="Header" bodyClass="text-success" cardFooter="bg-transparent border-top border-success" footer="Footer" cardClass="border border-success mb-3" bodyText={(
                                <>
                                    <h6 className="card-title fw-medium">Looking For Success?</h6>
                                    <p className="card-text">If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.</p>
                                </>
                            )}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xl={9}>
                    <h6 className="mb-3">Text Alignment:</h6>
                    <Row>
                        <Col xl={4}>
                            <BasicCard bodyText={(
                                <>
                                    <div className="mb-2">
                                        <span className="avatar avatar-md">
                                            <img src={face15} alt="img" />
                                        </span>
                                    </div>
                                    <h6 className="card-title fw-medium">Where it come from</h6>
                                    <p className="card-text">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.</p>
                                    <Link to="#!" className="btn btn-primary">Go somewhere</Link>
                                </>
                            )}
                            />
                        </Col>
                        <Col xl={4}>
                            <BasicCard cardClass="text-end" bodyText={(
                                <>
                                    <div className="mb-2">
                                        <span className="avatar avatar-md">
                                            <img src={face11} alt="img" />
                                        </span>
                                    </div>
                                    <h6 className="card-title fw-medium">What is special?</h6>
                                    <p className="card-text">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.</p>
                                    <Link to="#!" className="btn btn-primary">Go somewhere</Link>
                                </>
                            )}
                            />
                        </Col>
                        <Col xl={4}>
                            <BasicCard cardClass="text-center" bodyText={(
                                <>
                                    <div className="mb-2">
                                        <span className="avatar avatar-md">
                                            <img src={face3} alt="img" />
                                        </span>
                                    </div>
                                    <h6 className="card-title fw-medium">Why do we use it?</h6>
                                    <p className="card-text">Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.</p>
                                    <Link to="#!" className="btn btn-primary">Go somewhere</Link>
                                </>
                            )}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* <!-- End::row-4 --> */}

            {/* <!-- Start::row-5 --> */}
            <Row>
                <Col xxl={6} xl={12}>
                    <h6 className="mb-3">Using Utilities:</h6>
                    <Row>
                        <Col xl={6}>
                            <BasicCard header="Using Width 75%" footer="<a href='#!' class='btn btn-primary d-grid'>Button</a>" cardClass="w-75"
                                bodyText={(
                                    <>
                                        <div className="card-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nostrum omnis excepturi consequatur molestiae </div>
                                    </>
                                )}
                            />
                        </Col>
                        <Col xl={6}>
                            <BasicCard header="Using Width 50%" footer="<a href='#!' class='btn btn-primary d-grid'>Button</a>" cardClass="w-50"
                                bodyText={(
                                    <>
                                        <div className="card-text">  Lorem ipsum dolor sit amet consectetur adipisicing elit  </div>
                                    </>
                                )}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xxl={6} xl={12}>
                    <h6 className="mb-3">Navigation:</h6>
                    <Row>
                        <Col xl={6}>
                            <Spknavigationcards LinkNavigate="#!" Navigationclass="tabs" Customheaderclass=" p-4 pt-3 ps-2" />
                        </Col>
                        <Col xl={6}>
                            <Spknavigationcards LinkNavigate="#!" Navigationclass="pills" />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* <!-- End::row-5 --> */}

            {/* <!-- Start::row-6 --> */}
            <h6 className="mb-3">Image Caps:</h6>
            <Row>
                <Col xl={4}>
                    <BasicCard imgSrc={media29} imgClass="card-img-top" bodyText={(
                        <>
                            <h6 className="card-title fw-medium">Image caps are widely used in Blog's</h6>
                            <p className="card-text mb-3 text-muted">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.</p>
                            <p className="card-text mb-0"><small>Last updated 3 mins ago</small></p>
                        </>
                    )}
                    />
                </Col>
                <Col xl={4}>
                    <BasicCard imgSrcB={media28} imgClassB="card-img-bottom" bodyText={(
                        <>
                            <h6 className="card-title fw-medium">Image caps are widely used in Blog's</h6>
                            <p className="card-text mb-3 text-muted">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.</p>
                            <p className="card-text mb-0"><small>Last updated 3 mins ago</small></p>
                        </>
                    )}
                    />
                </Col>
                <Col xl={4}>

                    <BasicCard imgSrcB={media31} imgClassB="card-img rounded-0" header="Image caps are widely used in Blog's" footer="<p class='card-text mb-0'><small>Last updated 3 mins ago</small></p>" bodyText={(
                        <>
                            <p className="card-text mb-1 text-muted">This is a wider card with supporting text below
                                as
                                a natural lead-in to additional content. This content is a
                                little
                                bit longer.</p>
                        </>
                    )}
                    />
                </Col>
                <Col xl={4}>
                    <BasicCard imgSrcA={media32} imgClassA="card-img-top" header="Image caps are widely used in Blog's" footer="<p class='card-text mb-0'><small>Last updated 3 mins ago</small></p>" bodyText={(
                        <>
                            <p className="card-text mb-1 text-muted">This is a wider card with supporting text below
                                as
                                a natural lead-in to additional content. This content is a
                                little
                                bit longer.</p>
                        </>
                    )}
                    />
                </Col>
                <Col xl={4}>

                    <BasicCard imgSrcB={media30} imgClassB="card-img rounded-0" footer="<p class='card-text mb-0'><small>Last updated 3 mins ago</small></p>"
                        bodyText={(
                            <>
                                <h6 className="card-title fw-medium mb-1">Image caps are widely used in Blog's</h6>
                                <p className="card-text mb-1 text-muted">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </>
                        )}
                    />
                </Col>
                <Col xl={4}>
                    <Spkimagecapcards Imgsrc={media33} Imgafterfooter={true} Customimgclass="card-img-bottom" CardFooter={true} Cardheader={true}
                        Title="Image caps are widely used in Blog's" Footertext="Last updated 3 mins ago">
                        <p className="card-text mb-1 text-muted">This is a wider card with supporting text below
                            as
                            a natural lead-in to additional content. This content is a
                            little
                            bit longer.</p>
                    </Spkimagecapcards>
                </Col>
            </Row>
            {/* <!-- End::row-6 --> */}

            {/* <!-- Start::row-7 --> */}
            <h6 className="mb-3">Image Overlays:</h6>
            <Row>
                <Col xl={4}>
                    <Spkimageoverlaycard CustomClass="overlay-card" Title="Image Overlays Are Awesome!" Imgsrc={media35} CardHeader={true}
                        CardFooter={false} Customimgclass="card-img" Custombodyclass="text-fixed-white" CustomTitleclass="text-fixed-white">
                        <div className="card-text mb-2">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even.</div>
                        <div className="card-text">Last updated 3 mins ago</div>
                    </Spkimageoverlaycard>

                </Col>
                <Col xl={4}>
                    <Spkimageoverlaycard CustomClass="overlay-card" CardHeader={false} Imgsrc={media36} Overlayclass="over-content-bottom"
                        CardFooter={true} Footertext="Last updated 3 mins ago" Customimgclass="card-img" Custombodyclass="text-fixed-white" Customfooterclass="text-fixed-white" >
                        <div className="card-text text-fixed-white">
                            Image Overlays Are Awesome!
                        </div>
                        <div className="card-text mb-2">There are many variaxtions of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even.</div>
                        <div className="card-text">Last updated 3 mins ago</div>
                    </Spkimageoverlaycard>
                </Col>
                <Col xl={4}>
                    <Spkimageoverlaycard CustomClass="overlay-card" Title="Image Overlays Are Awesome!" Imgsrc={media34} CardHeader={true}
                        CardFooter={true} Footertext="Last updated 3 mins ago" Customimgclass="card-img" Custombodyclass="text-fixed-white sm:p-4 p-2" CustomTitleclass="text-fixed-white" Customfooterclass="text-fixed-white sm:p-4 p-2"  >
                        <div className="card-text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even.</div>
                    </Spkimageoverlaycard>
                </Col>
            </Row>
            {/* <!-- End::row-7 --> */}

            {/* <!-- Start::row-8 --> */}
            <h6 className="mb-3">Horizontal Cards:</h6>
            <Row>
                <Col xl={4}>
                    <Spkhorizontalcards Navigate="#!" Imgposition="before" CardHeader={true} CardFooter={true} Imagesrc={media37} Imgclass="img-fluid rounded-start h-100 w-100" Footertext="Last updated 3 mins ago" Title="Horizontal Cards" >
                        <h6 className="card-title fw-medium">Horizontal cards are awesome!</h6>
                        <p className="card-text">This is a wider card with supporting text below as a natural .</p>
                    </Spkhorizontalcards>
                </Col>
                <Col xl={4}>
                    <Spkhorizontalcards Navigate="#!" Imgposition="after" CardHeader={true} CardFooter={false} Imagesrc={media38} Imgclass="img-fluid rounded-end h-100 w-100"
                        Title="Horizontal Cards" >
                        <h6 className="card-title fw-medium">Horizontal cards are awesome!</h6>
                        <p className="card-text mb-3">This is a wider card with suppo    rting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </Spkhorizontalcards>
                </Col>
                <Col xl={4}>
                    <Spkhorizontalcards Navigate="#!" Imgposition="after" CardHeader={false} CardFooter={true} Imagesrc={media39} Imgclass="img-fluid rounded-end h-100 w-100"
                        Footertext="Last updated 3 mins ago">
                        <h6 className="card-title fw-medium mb-2">Horizontal Cards</h6>
                        <div className="card-title mb-3">Horizontal cards are awesome!</div>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </Spkhorizontalcards>
                </Col>
            </Row>
            {/* <!-- End::row-8 --> */}

            {/* <!-- Start::row-9 --> */}
            <h6 className="mb-3">Background Colored Cards:</h6>
            <Row>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="primary" Imgsrc={face11} Title="Gatin Leo" Value="Finished by today" Textclass="fixed-white" Class="fixed-white" />
                </Col>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="primary1" Imgsrc={face11} Title="Gatin Leo" Value="Finished by today" Textclass="fixed-white" Class="fixed-white" />
                </Col>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="primary2" Imgsrc={face11} Title="Gatin Leo" Value="Finished by today" Textclass="fixed-white" Class="fixed-white" />
                </Col>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="primary3" Imgsrc={face11} Title="Gatin Leo" Value="Finished by today" Textclass="fixed-white" Class="fixed-white" />
                </Col>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="secondary" Imgsrc={face12} Title="Elisha Corner" Value="Completed 24 days back" Textclass="fixed-white" Class="fixed-white" />
                </Col>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="warning" Imgsrc={face1} Title="Sarah Alina" Value="Completed today" Textclass="fixed-white" Class="fixed-white" />
                </Col>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="info" Imgsrc={face1} Title="Monica Karen" Value="Pending from 4 days" Textclass="fixed-white" Class="fixed-white" />
                </Col>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="success" Imgsrc={face5} Title="Samantha sid" Value="In leave for 1 month" Textclass="fixed-white" Class="fixed-white" />
                </Col>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="danger" Imgsrc={face14} Title="Sebastien steyn" Value="Completed by Tomorrow" Textclass="fixed-white" Class="fixed-white" />
                </Col>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="light" Imgsrc={face13} Title="Jacob Smith" Value="Finished by 24,Nov" Textclass="muted" Class="default" />
                </Col>
                <Col xl={3}>
                    <Spkbgcards Navigate="#!" color="dark" Imgsrc={face16} Title="Pope Adam" Value="Completed on 24,may" Textclass="white" Class="white" />
                </Col>
            </Row>
            {/* <!-- End::row-9 --> */}

            {/* <!-- Start::row-10 --> */}
            <h6 className="mb-3">Colored Border Cards:</h6>
            <Row>
                {Bordercarddata.map((idx) => (
                    <Col xl={3} key={Math.random()}>
                        <Spkborderedcards Navigate="#!" Title={idx.title} badges={idx.badges} images={idx.images} Class={idx.Class} Color={idx.Color} />
                    </Col>
                ))}
            </Row>
            {/* <!-- End::row-10 --> */}

            {/* <!-- Start::row-11 --> */}
            <h6 className="mb-3">Card Groups With Footer:</h6>
            <Row>
                <Col xl={12}>
                    <div className="card-group">
                        <BasicCard imgSrcA={media40} imgClassA="card-img-top" footer="<small class='text-muted'>Last updated 3 mins ago</small>"
                            bodyText={(
                                <>
                                    <h6 className="card-title fw-medium">Writing is an art.</h6> <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                                </>
                            )}
                        />
                        <BasicCard imgSrcA={media41} imgClassA="card-img-top" footer="<small class='text-muted'>Last updated 3 mins ago</small>"
                            bodyText={(
                                <>
                                    <h6 className="card-title fw-medium">Delecious food is a blessing!</h6> <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </>
                            )}
                        />
                        <BasicCard imgSrcA={media42} imgClassA="card-img-top" footer="<small class='text-muted'>Last updated 3 mins ago</small>"
                            bodyText={(
                                <>
                                    <h6 className="card-title fw-medium">Is office the best place to earn knowledge?</h6> <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                                </>
                            )}
                        />
                    </div>
                </Col>
            </Row>
            {/* <!-- End::row-11 --> */}

            {/* <!-- Start::row-12 --> */}
            <h6 className="mb-3">Grid Cards:</h6>
            <Row>
                <Col xl={12}>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        <div className="col">
                            <BasicCard imgSrcA={media43} imgClassA="card-img-top" bodyText={(
                                <>
                                    <h6 className="card-title fw-medium">Research improves ability &amp; agility !</h6>
                                    <p className="card-text"> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                                </>
                            )}
                            />
                        </div>
                        <div className="col">
                            <BasicCard imgSrcA={media44} imgClassA="card-img-top" bodyText={(
                                <>
                                    <h6 className="card-title fw-medium">Morphology of a typical fruit.</h6>
                                    <p className="card-text"> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                                </>
                            )}
                            />
                        </div>
                        <div className="col">
                            <BasicCard imgSrcA={media45} imgClassA="card-img-top" bodyText={(
                                <>
                                    <h6 className="card-title fw-medium">Most tropical areas are suitable</h6>
                                    <p className="card-text"> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                                </>
                            )}
                            />
                        </div>
                        <div className="col">
                            <BasicCard imgSrcA={media46} imgClassA="card-img-top" bodyText={(
                                <>
                                    <h6 className="card-title fw-medium">Are They seasonal fruits ?</h6>
                                    <p className="card-text"> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                                </>
                            )}
                            />

                        </div>
                    </div>
                </Col>
            </Row>
            {/* <!-- End::row-12 --> */}

            {/* <!-- Start::row-13 --> */}
            <h6 className="mb-3">Cards With Link:</h6>
            <Row>
                <div className="col-xxl-3 col-xl-12">
                    <BasicCard imgSrcA={media23} imgClassA="card-img-top" linkTag={true} titleClass="fw-medium mb-0" title="Forests are Awesome." />
                </div>
                <div className="col-xxl-6 col-xl-6">
                    <Row>
                        <div className="col-xxl-12 col-xl-12">
                            <BasicCard cardClass="card-bg-primary" linkTag={true} bodyText={(
                                <>
                                    <blockquote className="blockquote mb-0 text-center">
                                        <h6 className="text-fixed-white">The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart..</h6>
                                        <footer className="blockquote-footer mt-3 fs-14 text-fixed-white op-7">Someone famous as <cite title="Source Title">-Helen Keller</cite></footer>
                                    </blockquote>
                                </>
                            )}
                            />
                        </div>
                        <div className="col-xxl-5 col-xl-12">
                            <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Customclass="custom-card" Anchortagbefore={true}  >
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <span className="avatar avatar-md">
                                            <img src={face15} alt="img" />
                                        </span>
                                    </div>
                                    <div>
                                        <p className="card-text mb-0 fs-14 fw-medium">Atharva Simon.</p>
                                        <div className="card-title text-muted fs-12 mb-0">Correspondent Professor</div>
                                    </div>
                                </div>
                            </Spktitlecards>
                            <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Customclass="custom-card border border-info" Anchortagbefore={true}  >
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <span className="avatar avatar-xl">
                                            <img src={face8} alt="img" />
                                        </span>
                                    </div>
                                    <div>
                                        <p className="card-text text-info mb-1 fs-14 fw-medium">Alicia Keys.</p>
                                        <div className="card-title fs-12 mb-1">Department Of Commerce</div>
                                        <div className="card-title text-muted fs-11 mb-0">24 Years, Female</div>
                                    </div>
                                </div>
                            </Spktitlecards>
                        </div>
                        <div className="col-xxl-7 col-xl-12">
                            <Spkhorizontalcards Navigate="#!" Imgposition="after" Linktag={true} CardHeader={false} CardFooter={true} Imagesrc={media39} Imgclass="img-fluid rounded-end h-100 w-100"
                                Footertext="Last updated 3 mins ago">
                                <h6 className="card-title mb-2 fw-medium">Fox is Beautiful ?</h6>
                                <p className="card-text mb-0">This is a wild animal with supporting tactics and are very efficient at kill,they are very Dangerous.</p>
                                <p className="mb-0 card-text">
                                    Fox lives mainly in forests and are well known for their hunting skills.
                                </p>
                            </Spkhorizontalcards>
                        </div>
                    </Row>
                </div>
                <div className="col-xxl-3 col-xl-6">
                    <BasicCard linkTag={true} imgSrcA={media47} imgClassA="card-img-top" bodyText={(
                        <>
                            <h6 className="card-title fw-medium">Most tropical areas are suitable</h6>
                            <p className="card-text"> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                        </>
                    )}
                    />
                </div>
            </Row>
            {/* <!-- End::row-13 --> */}
        </Fragment>
    )
};

export default Cards;
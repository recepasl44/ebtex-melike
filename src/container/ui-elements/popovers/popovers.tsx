import  { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Pageheader from "../../../components/page-header/pageheader";
import ShowCode from "../../../components/showcode/showcode";
import { Colorheaderalerts, Colredalerts, Defaultalerts, Dismissiblealerts } from "../../../components/common/data/ui-elements/popoverdata";
import SpkPopovers from "../../../@spk-reusable-components/reusable-uielements/spk-popovers";
import SpkButton from "../../../@spk-reusable-components/reusable-uielements/spk-button";
import { datapopover1, datapopover2, datapopover3, popovers1, popovers2, popovers3, popovers4, popovers5, popovers6, popovers7, reusablepopover1, reusablepopover2, reusablepopover3, reusablepopover4, reusablepopover5, reusablepopover6, reusablepopover7 } from "../../../components/common/data/prism/ui-elements-prism";
import { Link } from "react-router-dom";

const Popovers = () => {
	return (
		<Fragment>
			{/* <!-- Page Header --> */}

			<Pageheader title="Ui Elements" currentpage="Popovers" activepage="Popovers" />

			{/* <!-- Page Header Close --> */}

			{/* <!-- Start:: row-1 --> */}
			<Row>
				<Col xl={12}>
					<ShowCode title="Default Popovers" customCardClass="custom-card" customCardBodyClass="" dataCode={datapopover1} reactCode={popovers1} reusableCode={reusablepopover1}>
						<div className="btn-list">
							{Defaultalerts.map((idx: any) => (
								<SpkPopovers trigger="click" placement={idx.class} key={Math.random()} title={`Popover ${idx.text}`} content={`And here's some amazing content. It's very engaging. ${idx.text}?`}>
									<Button variant='outline-primary'>Popover {idx.text}</Button>
								</SpkPopovers>
							))}
						</div>
					</ShowCode>
				</Col>
			</Row>
			{/* <!-- End:: row-1 --> */}

			{/* <!-- Start:: row-2 --> */}
			<Row>
				<Col xl={12}>
					<ShowCode title="Colored Headers" customCardClass="custom-card" customCardBodyClass="" dataCode={datapopover2} reactCode={popovers2} reusableCode={reusablepopover2}>
						<div className="btn-list">
							{Colorheaderalerts.map((idx: any) => (
								<SpkPopovers trigger="click" placement={idx.class} key={Math.random()} popoverClass={`header-${idx.color1} ${idx.color2}`} title="Color Header" content={`Popover with ${idx.color1} header.`} data-bs-custom-classname={`header-${idx.color1}`}>
									<Button variant={idx.color}>Header {idx.text}</Button>
								</SpkPopovers>
							))}
						</div>
					</ShowCode>
				</Col>
				<Col xl={12}>
					<ShowCode title="Colored Popovers" customCardClass="custom-card" customCardBodyClass="" dataCode={datapopover3} reactCode={popovers3} reusableCode={reusablepopover3}>
						<div className="btn-list">
							{Colredalerts.map((idx: any) => (
								<SpkPopovers trigger="click" placement={idx.class} key={Math.random()} popoverClass={`popover-${idx.color1}`} title="Color Background" content={`Popover with ${idx.text} background.`}>
									<Button variant={idx.color1}>{idx.text} </Button>
								</SpkPopovers>
							))}
						</div>
					</ShowCode>
				</Col>
			</Row>
			{/* <!-- End:: row-2 --> */}

			{/* <!-- Start:: row-3 --> */}
			<Row>
				<Col xl={12}>
					<ShowCode title="Light Popovers" customCardClass="custom-card" customCardBodyClass="" dataCode={datapopover3} reactCode={popovers4} reusableCode={reusablepopover4}>
						<div className="btn-list">
							{Colredalerts.map((idx: any) => (
								<SpkPopovers trigger="click" placement={idx.class} key={Math.random()} popoverClass={`popover-${idx.color1}-light`} title="Light Background" content={`Popover with light ${idx.text} background.`}>
									<Button variant='' className={`btn btn-${idx.color1}-light btn-wave`}>{idx.text} </Button>
								</SpkPopovers>
							))}
						</div>
					</ShowCode>
				</Col>
			</Row>
			{/* <!-- End:: row-3 --> */}

			{/* <!-- Start:: row-4 --> */}
			<Row>
				<Col xl={6}>
					<ShowCode title="Disabled Popover" customCardClass="custom-card" customCardBodyClass="" reactCode={popovers5} reusableCode={reusablepopover5}>
						<SpkPopovers placement="right" content="Disabled Popover!">
							<span className="d-inline-block mb-3 mb-sm-1 me-2">
								<SpkButton Buttonvariant="primary" Disabled={true}>
									Disabled button
								</SpkButton>
							</span>
						</SpkPopovers>
					</ShowCode>
				</Col>
				<Col xl={6}>
					<ShowCode title="Icon Popovers" customCardClass="custom-card" customCardBodyClass="" reactCode={popovers6} reusableCode={reusablepopover6}>
						<SpkPopovers trigger="click" placement="top" popoverClass="popover-primary only-body" content="This popover is used to provide details about this icon." >
							<Link className="me-4 svg-primary" to="#!">
								<svg xmlns="http://www.w3.org/2000/svg" className="svg-primary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
									<path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" /></svg>
							</Link>
						</SpkPopovers>
						<SpkPopovers trigger="click" placement="left" popoverClass="popover-secondary only-body" content="This popover is used to provide details about this icon." >
							<Link className="me-4 svg-secondary" to="#!" >
								<svg xmlns="http://www.w3.org/2000/svg" className="svg-secondary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
							</Link>
						</SpkPopovers>
					</ShowCode>
				</Col>
				<Col xl={12}>
					<ShowCode title="Dismissible Popovers" customCardClass="custom-card mb-5" customCardBodyClass="d-sm-flex justify-content-lg-between gap-2 flex-wrap card-body" reactCode={popovers7} reusableCode={reusablepopover7} >
						{Dismissiblealerts.map((idx: any) => (
							<SpkPopovers trigger="click" rootClose={true} placement={idx.class} key={Math.random()} title="Dismissible Popover" content={`And here's some amazing content. It's very engaging. ${idx.class}?`}>
								<Button variant={idx.color} className="m-1">Popover Dismiss</Button>
							</SpkPopovers>
						))}
					</ShowCode>
				</Col>
			</Row>
			{/* <!-- End:: row-4 --> */}
		</Fragment>
	)
};

export default Popovers;
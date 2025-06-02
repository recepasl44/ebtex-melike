import  { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { placeholder1, placeholder2, placeholder3, placeholder4 } from "../../../components/common/data/prism/advanced-ui-prism";
import Pageheader from "../../../components/page-header/pageheader";
import ShowCode from "../../../components/showcode/showcode";
import { Link } from "react-router-dom";
import media60 from "../../../assets/images/media/media-60.jpg"
import media61 from "../../../assets/images/media/media-61.jpg"

const Placeholders = () => {

	return (
		<Fragment>
			{/* <!-- Page Header --> */}

			<Pageheader title="Advanced Ui" currentpage="Placeholders" activepage="Placeholders" />

			{/* <!-- Page Header Close --> */}

			{/* <!-- Start:: row-1 --> */}
			<Row>
				<Col xl={12}>
					<Row>
						<Col xl={6}>
							<ShowCode title="Sizing" customCardClass="custom-card" customCardBodyClass="" reactCode={placeholder1}>
								<span className="placeholder col-12 placeholder-xl mb-1"></span>
								<span className="placeholder col-12 placeholder-lg"></span>
								<span className="placeholder col-12"></span>
								<span className="placeholder col-12 placeholder-sm"></span>
								<span className="placeholder col-12 placeholder-xs"></span>
							</ShowCode>
							<ShowCode title="Animation" customCardClass="custom-card" customCardBodyClass="" reactCode={placeholder2}>
								<p className="placeholder-glow mb-0">
									<span className="placeholder col-12"></span>
								</p>
								<p className="placeholder-wave mb-0">
									<span className="placeholder col-12"></span>
								</p>
							</ShowCode>
						</Col>
						<Col xl={6}>
							<ShowCode title="Colors" customCardClass="custom-card" customCardBodyClass="" reactCode={placeholder3}>
								<span className="placeholder col-12"></span>
								<span className="placeholder col-12 bg-primary"></span>
								<span className="placeholder col-12 bg-primary1"></span>
								<span className="placeholder col-12 bg-primary2"></span>
								<span className="placeholder col-12 bg-primary3"></span>
								<span className="placeholder col-12 bg-secondary"></span>
								<span className="placeholder col-12 bg-success"></span>
								<span className="placeholder col-12 bg-danger"></span>
								<span className="placeholder col-12 bg-warning"></span>
								<span className="placeholder col-12 bg-info"></span>
								<span className="placeholder col-12 bg-light"></span>
								<span className="placeholder col-12 bg-dark"></span>
							</ShowCode>
						</Col>
					</Row>
				</Col>
			</Row>
			{/* <!-- End:: row-1 --> */}

			{/* <!-- Start:: row-2 --> */}
			<Row>
				<Col xl={12}>
					<ShowCode title="Width" customCardClass="custom-card" customCardBodyClass="" reactCode={placeholder4}>
						<span className="placeholder bg-primary col-6"></span>
						<span className="placeholder bg-primary w-75"></span>
						<div>
							<span className="placeholder bg-primary" style={{ width: "25%" }}></span>
						</div>
					</ShowCode>
				</Col>
				<Col xl={4} lg={6} md={6} sm={12} className="">
					<Card className="custom-card">
						<img className="card-img-top" src={media60} alt="" />
						<Card.Body>
							<Card.Title>Card title</Card.Title>
							<p className="card-text">Some quick example text to build on the card title and make
								up
								the bulk of the card's content.</p>
							<Link to="#!"  className="btn btn-primary">Go somewhere</Link>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={4} lg={6} md={6} sm={12} className="">
					<Card className="" aria-hidden="true">
						<img className="card-img-top" src={media61} alt="" />
						<div className="card-body">
							<div className="h5 card-title placeholder-glow">
								<span className="placeholder col-6"></span>
							</div>
							<p className="card-text placeholder-glow">
								<span className="placeholder col-7"></span>
								<span className="placeholder col-4 ms-1"></span>
								<span className="placeholder col-4"></span>
								<span className="placeholder col-6 ms-1"></span>
							</p>
							<Link  to="#!" tabIndex={-1} className="btn btn-primary disabled placeholder col-6"></Link>
						</div>
					</Card>
				</Col>
			</Row>
			{/* <!-- Start:: row-2 --> */}
		</Fragment>
	)
};

export default Placeholders;
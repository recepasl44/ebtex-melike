import  { Fragment } from "react";
import { Col } from "react-bootstrap";
import Pageheader from "../../../components/page-header/pageheader";
import {  image1, image2, image3, image4, image5, image6, image7, image8, image9  } from "../../../components/common/data/prism/ui-elements-prism";
import ShowCode from "../../../components/showcode/showcode";
import media55 from "../../../assets/images/media/media-55.jpg"
import media54 from "../../../assets/images/media/media-54.jpg"
import media53 from "../../../assets/images/media/media-53.jpg"
import media52 from "../../../assets/images/media/media-52.jpg"
import media50 from "../../../assets/images/media/media-50.jpg"
import media51 from "../../../assets/images/media/media-51.jpg"
import media56 from "../../../assets/images/media/media-56.jpg"
import media57 from "../../../assets/images/media/media-57.jpg"
import media48 from "../../../assets/images/media/media-48.jpg"
import media49 from "../../../assets/images/media/media-49.jpg"

const ImagesFigures = () => {
	return (
		<Fragment>
			{/* <!-- Page Header --> */}

			<Pageheader title="Ui Elements" currentpage="Images & Figures" activepage="Images & Figures" />

			{/* <!-- Page Header Close --> */}

			{/* <!-- Start:: row-1 --> */}
			<div className="row">
				<Col xl={6}>
					<ShowCode title="Image Center Align" customCardClass="custom-card" customCardBodyClass="" reactCode={image1}>
						<img className="rounded mx-auto d-block" src={media55} alt="..." />
					</ShowCode>
				</Col>
				<Col xl={6}>
					<ShowCode title="Image Right Align" customCardClass="custom-card" customCardBodyClass="" reactCode={image2}>
						<img className="rounded float-end" src={media54} alt="..." />
					</ShowCode>
				</Col>
				<Col xl={6}>
					<ShowCode title="Image Left Align" customCardClass="custom-card" customCardBodyClass="" reactCode={image3}>
						<p className="card-title mb-3">Use <code>.float-start</code> class to <code>img</code> tag to get left align image.</p>
						<img className="rounded float-start" src={media53} alt="..." />
					</ShowCode>
				</Col>
				<Col xl={6}>
					<ShowCode title="Image With Radius" customCardClass="custom-card" customCardBodyClass="" reactCode={image4}>
						<p className="card-title mb-3">Use <code>.rounded</code> class along with <code>.img-fluid</code> to get border radius.</p>
						<div className="text-center">
							<img src={media49} className="img-fluid rounded" alt="..." />
						</div>
					</ShowCode>
				</Col>
				<Col xl={6}>
					<ShowCode title="Responsive image" customCardClass="custom-card" customCardBodyClass="" reactCode={image5}>
						<p className="card-title mb-3">Use <code> .img-fluid </code>class to the img tag to get responsive image.</p>
						<div className="text-center">
							<img src={media48} className="img-fluid" alt="..." />
						</div>
					</ShowCode>
				</Col>
				<Col xl={6}>
					<ShowCode title="Rounded Image" customCardClass="custom-card" customCardBodyClass="" reactCode={image6}>
						<p className="card-title mb-3">Use <code>.rounded-pill</code> class to <code>img</code> tag to get rounded image.</p>
						<div className="text-center">
							<img src={media50} className="img-fluid rounded-pill" alt="..." />
						</div>
					</ShowCode>
				</Col>
				<Col xl={3}>
					<ShowCode title="Image Thumbnail" customCardClass="custom-card" customCardBodyClass="" reactCode={image7}>
						<p className="card-title mb-3">Use <code> .img-thumbnail </code>to give an image a rounded 1px border.</p>
						<div className="text-center">
							<img src={media51} className="img-thumbnail" alt="..." />
						</div>
					</ShowCode>
				</Col>
				<Col xl={3}>
					<ShowCode title="Rounded Thumbnail" customCardClass="custom-card" customCardBodyClass="" reactCode={image8}>
						<p className="card-title mb-3">Use <code> .rounded-pill </code>along with <code> .img-thummbnail </code> to get radius.</p>
						<div className="text-center">
							<img src={media52} className="img-thumbnail rounded-pill" alt="..." />
						</div>
					</ShowCode>
				</Col>
				<Col xl={6}>
					<ShowCode title="Figures" reactCode={image9} customCardClass="custom-card" customCardBodyClass="d-flex justify-content-between gap-2">
						<figure className="figure">
							<img className="bd-placeholder-img figure-img img-fluid rounded card-img" src={media56} alt="..." />
							<figcaption className="figure-caption mt-2">A caption for the above image.
							</figcaption>
						</figure>
						<figure className="figure float-end">
							<img className="bd-placeholder-img figure-img img-fluid rounded card-img" src={media57} alt="..." />
							<figcaption className="figure-caption text-end mt-2">A caption for the above image.
							</figcaption>
						</figure>
					</ShowCode>
				</Col>
			</div>
			{/* <!-- End:: row-1 --> */}
		</Fragment>
	)
};

export default ImagesFigures;
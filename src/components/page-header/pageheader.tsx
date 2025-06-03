import { Fragment } from "react";
import SpkBreadcrumb from "../../@spk-reusable-components/reusable-uielements/spk-breadcrumb";
import { Link } from "react-router-dom";

const Pageheader = (props: any) => {
  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between page-header-breadcrumb flex-wrap gap-2">
        <div style={{ paddingLeft: "11px" }}>
          <SpkBreadcrumb>
            <li className="breadcrumb-item fs-18">
              <Link to="#!">{props.title}</Link>
            </li>
            {props.subtitle && (
              <li className="breadcrumb-item">
                <Link to="#!">{props.subtitle}</Link>
              </li>
            )}
            <li className="breadcrumb-item active fs-18" aria-current="page">
              {props.currentpage}
            </li>
          </SpkBreadcrumb>
        </div>
      </div>
    </Fragment>
  );
};

export default Pageheader;

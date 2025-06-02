import { Col, Form, Card, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SpkButton from '../../@spk-reusable-components/reusable-uielements/spk-button';
import SpkAlert from '../../@spk-reusable-components/reusable-uielements/spk-alert';
import { useLogin } from '../../components/hooks/auth/login/useLogin';

// Örnek görseller
import desktopwhite from '../../assets/images/brand-logos/desktop-white.png';
import google from '../../assets/images/media/apps/google.png';
import firebase from '../../assets/images/brand-logos/firbase.png';
import react from '../../assets/images/brand-logos/react.png';

export default function LoginForm() {
  const {
    loginData,
    errorMessage,
    passwordShow,
    handleChange,
    doLogin,
    togglePassword,
  } = useLogin();

  return (
    <div className="row justify-content-center align-items-center authentication authentication-basic h-100 pt-3">
      <Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
        <div className="mb-3 d-flex justify-content-center">
          <Link to="#">
            <img src={desktopwhite} alt="logo" className="desktop-logo" />
          </Link>
        </div>
        <Card className="custom-card my-4">
          <Tab.Container defaultActiveKey="react">
            <Nav variant="pills" className="justify-content-center authentication-tabs">
              <Nav.Item>
                <Nav.Link eventKey="react">
                  <img src={react} alt="react logo" className="avatar avatar-sm" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="firebase">
                  <img src={firebase} alt="firebase logo" className="avatar avatar-sm" />
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {/** REACT REAL API LOGIN **/}
              <Tab.Pane eventKey="react">
                <Card.Body>
                  <p className="h5 mb-2 text-center">Sign In</p>
                  <p className="mb-4 text-muted op-7 fw-normal text-center">
                    Welcome back Henry !
                  </p>

                  <div className="d-flex mb-3 justify-content-between gap-2 flex-wrap flex-lg-nowrap">
                    <SpkButton
                      Buttonvariant=""
                      Size="lg"
                      Customclass="btn-light-ghost border d-flex align-items-center justify-content-center flex-fill bg-light"
                      Buttontype="button"
                    >
                      <span className="avatar avatar-xs flex-shrink-0">
                        <img src={google} alt="google" />
                      </span>
                      <span className="lh-1 ms-2 fs-13 text-default">
                        Signup with Google
                      </span>
                    </SpkButton>
                  </div>

                  <div className="text-center my-3 authentication-barrier">
                    <span>OR</span>
                  </div>

                  {errorMessage && <SpkAlert variant="danger">{errorMessage}</SpkAlert>}

                  <div className="row gy-3">
                    <Col xl={12}>
                      <Form.Label htmlFor="signin-username" className="text-default">
                        User Name
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        id="signin-username"
                        placeholder="user name"
                        value={loginData.email}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col xl={12} className="mb-2">
                      <Form.Label
                        htmlFor="signin-password"
                        className="text-default d-block"
                      >
                        Password
                        <Link
                          to="/authentication/reset-password/reset-basic"
                          className="float-end text-danger"
                        >
                          Forget password ?
                        </Link>
                      </Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          name="password"
                          type={passwordShow ? 'text' : 'password'}
                          value={loginData.password}
                          onChange={handleChange}
                          className="create-password-input"
                          id="signin-password"
                          placeholder="password"
                        />
                        <Link
                          to="#!"
                          className="show-password-button text-muted"
                          id="button-addon2"
                          onClick={(e) => {
                            e.preventDefault();
                            togglePassword();
                          }}
                        >
                          <i
                            className={`${
                              passwordShow ? 'ri-eye-line' : 'ri-eye-off-line'
                            } align-middle`}
                          ></i>
                        </Link>
                      </div>
                      <div className="mt-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                          />
                          <label
                            className="form-check-label text-muted fw-normal"
                            htmlFor="defaultCheck1"
                          >
                            Remember password ?
                          </label>
                        </div>
                      </div>
                    </Col>
                  </div>

                  <div className="d-grid mt-4">
                    <Link
                      to="#!"
                      className="btn btn-primary"
                      onClick={doLogin}
                    >
                      Sign In
                    </Link>
                  </div>

                  <div className="text-center">
                    <p className="text-muted mt-3 mb-0">
                      Dont have an account?{' '}
                      <Link to="/authentication/sign-up/sign-up-basic" className="text-primary">
                        Sign Up
                      </Link>
                    </p>
                  </div>

                  <div className="btn-list text-center mt-3">
                    <SpkButton
                      Buttonvariant="primary-light"
                      Customclass="btn-icon"
                      Buttontype="button"
                    >
                      <i className="ri-facebook-line lh-1 align-center fs-17"></i>
                    </SpkButton>
                    <SpkButton
                      Buttonvariant="primary1-light"
                      Customclass="btn-icon"
                      Buttontype="button"
                    >
                      <i className="ri-twitter-x-line lh-1 align-center fs-17"></i>
                    </SpkButton>
                    <SpkButton
                      Buttonvariant="primary2-light"
                      Customclass="btn-icon"
                      Buttontype="button"
                    >
                      <i className="ri-instagram-line lh-1 align-center fs-17"></i>
                    </SpkButton>
                  </div>
                </Card.Body>
              </Tab.Pane>

              {/** İsterseniz firebase tabını silebilirsiniz */}
              <Tab.Pane eventKey="firebase">
                <Card.Body>
                  <p className="h5 mb-2 text-center">Firebase Tab (opsiyonel)</p>
                  {/* ... */}
                </Card.Body>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card>
      </Col>
    </div>
  );
}

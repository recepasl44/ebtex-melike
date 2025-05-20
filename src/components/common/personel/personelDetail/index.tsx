import { useEffect, useState } from "react";
import { Modal, Card, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { usePersonelShow } from "../../../hooks/employee/personel/useDetail";
import { useNavigate } from "react-router-dom";

/* ------- TAB BİLEŞENLERİ ------- */
import PersonelUcretTab from "./tabs/ucret/table";
import PersonelTazminatTab from "./tabs/tazminat/table";
import PersonelHaftaTab from "./tabs/haftalik-calisma/table";
import PersonelMaasBorcTab from "./tabs/maas-borc/table";
import PersonelMaasOdemeTab from "./tabs/maas-odeme/table";
import PersonelPrimTab from "./tabs/prim/table";
import PersonelKesintiTab from "./tabs/kesinti/table";
import PersonelIadeTab from "./tabs/iade/table";
import PersonelDailyTab from "./tabs/daily/table";
import PersonelDersUcretTab from "./tabs/ders-ucreti/table";
import PersonelKuponTab from "./tabs/kupon/table";
import PersonelOzelDersTab from "./tabs/ozel-ders/table";
import PersonelKoclukTab from "./tabs/kocluk/table";
/* -------------------------------- */

interface PersonelDetailModalProps {
  show: boolean;
  onClose: () => void;
}

export default function PersonelDetailModal({ show }: PersonelDetailModalProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const pId = id ? Number(id) : 0;
  const { personel, getPersonel } = usePersonelShow();
  const [activeKey, setActiveKey] = useState("about");

  /* personeli çek */
  useEffect(() => {
    if (show && pId) getPersonel(pId);
  }, [show, pId, getPersonel]);

  if (!show) return null;
  if (!personel)
    return (
      <Modal show centered>
        <Modal.Body className="p-5 text-center">Yükleniyor…</Modal.Body>
      </Modal>
    );

  /* ------- PROFİL VERİLERİ ------- */
  const avatar =
    personel.profil_foto ||
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";

  const fullName = `${personel.ad} ${personel.soyad}`;
  const kurum = personel.works_for || "-";
  const brans = personel.pozisyon || "-";
  const tc = personel.tc_kimlik_no || "-";
  const tel = personel.telefon || "-";
  const email = personel.email || "-";
  const adres = personel.adres || "-";
  /* -------------------------------- */
  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page

  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title><b>{fullName}</b></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Card className="custom-card profile-card mb-4">
          <div className="profile-banner-img">
            <img
              src="https://react.spruko.com/xintra-ts/preview/assets/media-3-CjQ1lvod.jpg"
              className="card-img-top"
              alt="banner"
            />
          </div>

          <Card.Body className="pb-0 position-relative">
            <Row className="profile-content">
              {/* -------- SOL PROFİL -------- */}
              <Col xl={3}>
                <Card className="custom-card overflow-hidden border">
                  <Card.Body className="border-bottom">
                    <div className="text-center">
                      <span className="avatar avatar-xxl avatar-rounded mb-3">
                        <img src={avatar} alt={fullName} />
                      </span>
                      <h5 className="fw-semibold mb-1">{fullName}</h5>
                      <span className="d-block fw-medium text-muted mb-2">
                        {brans}
                      </span>
                      <p className="fs-12 mb-0 text-muted">
                        <span className="me-3">
                          <i className="ri-building-line me-1 align-middle" />
                          {kurum}
                        </span>
                        <span>
                          <i className="ri-map-pin-line me-1 align-middle" />
                          {adres}
                        </span>
                      </p>
                    </div>
                  </Card.Body>

                  {/* Temel Bilgiler */}
                  <div className="p-3 d-flex flex-wrap justify-content-between">
                    <div className="fw-medium fs-15 text-primary1">Temel Bilgiler</div>
                  </div>

                  <Card.Body className="p-0">
                    <ul className="list-group list-group-flush">
                      {[
                        ["Kurum", kurum],
                        ["Branş", brans],
                        ["T.C.", tc],
                        ["Telefon", tel],
                        ["Email", email],
                      ].map(([label, val]) => (
                        <li key={label} className="list-group-item pt-2 border-0">
                          <div>
                            <span className="fw-medium me-2">{label}:</span>
                            <span className="text-muted">{val}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>

              {/* -------- SEKME BLOĞU -------- */}
              <Col xl={9}>
                <Card className="custom-card overflow-hidden border">
                  <Card.Body>
                    <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k!)}>
                      <Nav className="nav-tabs tab-style-6 mb-3">
                        {/* sekme başlıkları */}
                        {[
                          ["about", "About"],
                          ["ucret", "Ücret Bilgileri"],
                          ["tazminat", "Tazminat"],
                          ["hafta", "Haftalık Ders Sayısı"],
                          ["maasBorc", "Maaş Borç"],
                          ["maasOdeme", "Maaş Ödeme"],
                          ["prim", "Prim"],
                          ["kesinti", "Kesinti"],
                          ["iade", "İade"],
                          ["daily", "Günlük Ders/Soru"],
                          ["ders", "Ders Ücreti"],
                          ["kupon", "Kupon Ücreti"],
                          ["ozel", "Özel Ders"],
                          ["kocluk", "Koçluk"],
                        ].map(([key, title]) => (
                          <Nav.Item key={key}>
                            <Nav.Link eventKey={key} className="w-100 text-start">
                              {title}
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>

                      <Tab.Content>
                        {/* About */}
                        <Tab.Pane eventKey="about" className="p-0 border-0">
                          <ul className="list-group list-group-flush border rounded-3">
                            <li className="list-group-item p-3">
                              <span className="fw-medium fs-15 d-block mb-3">Personel Hakkında</span>
                              <p className="text-muted mb-0">
                                Mesleki giriş tarihi:&nbsp;
                                <b>{personel.ise_giris_tarihi || "-"}</b>
                              </p>
                            </li>
                            <li className="list-group-item p-3">
                              <span className="fw-medium fs-15 d-block mb-3">İkametgah</span>
                              <p className="text-muted mb-0">{adres}</p>
                            </li>
                          </ul>
                        </Tab.Pane>

                        {/* Diğer içerik sekmeleri */}
                        <Tab.Pane eventKey="ucret" className="p-0 border-0">
                          <PersonelUcretTab personelId={pId} enabled={activeKey === "ucret"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="tazminat" className="p-0 border-0">
                          <PersonelTazminatTab personelId={pId} enabled={activeKey === "tazminat"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="hafta" className="p-0 border-0">
                          <PersonelHaftaTab personelId={pId} enabled={activeKey === "hafta"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="maasBorc" className="p-0 border-0">
                          <PersonelMaasBorcTab personelId={pId} enabled={activeKey === "maasBorc"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="maasOdeme" className="p-0 border-0">
                          <PersonelMaasOdemeTab personelId={pId} enabled={activeKey === "maasOdeme"} />
                        </Tab.Pane>

                        <Tab.Pane eventKey="prim" className="p-0 border-0">
                          <PersonelPrimTab personelId={pId} enabled={activeKey === "prim"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="kesinti" className="p-0 border-0">
                          <PersonelKesintiTab personelId={pId} enabled={activeKey === "kesinti"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="iade" className="p-0 border-0">
                          <PersonelIadeTab personelId={pId} enabled={activeKey === "iade"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="daily" className="p-0 border-0">
                          <PersonelDailyTab personelId={pId} enabled={activeKey === "daily"} />
                        </Tab.Pane>

                        <Tab.Pane eventKey="ders" className="p-0 border-0">
                          <PersonelDersUcretTab personelId={pId} enabled={activeKey === "ders"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="kupon" className="p-0 border-0">
                          <PersonelKuponTab personelId={pId} enabled={activeKey === "kupon"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="ozel" className="p-0 border-0">
                          <PersonelOzelDersTab personelId={pId} enabled={activeKey === "ozel"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="kocluk" className="p-0 border-0">
                          <PersonelKoclukTab personelId={pId} enabled={activeKey === "kocluk"} />
                        </Tab.Pane>


                      </Tab.Content>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="outline-secondary" onClick={handleClose}>
            Kapat
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

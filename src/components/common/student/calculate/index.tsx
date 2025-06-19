import { useMemo, useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Accordion,
  Modal,
  Button,
} from "react-bootstrap";
import SpkFlatpickr from "../../../../@spk-reusable-components/reusable-plugins/spk-flatpicker";

// Hooks
import { useBranchTable } from "../../../hooks/branch/useBranchList";
import { useProgramsTable } from "../../../hooks/program/useList";
import { useLevelsTable } from "../../../hooks/levels/useList";
import { useCoursesTable } from "../../../hooks/course/useList";
import { useSchoolTypesList } from "../../../hooks/schoolTypes/useSchoolTypesList";
import { useServicesTable } from "../../../hooks/service/useList";
import { useDiscountsTable } from "../../../hooks/discounts/useList";


// Types
interface Branch {
  id?: number;
  name: string;
}
interface Program {
  id: number;
  name: string;
}
interface Level {
  id: number;
  name: string;
}
interface Course {
  id: number;
  name: string;
}
interface SchoolType {
  id: number;
  name: string;
}
interface ServiceData {
  id: number;
  name: string;
  price: number | string;
  max_installments?: number;
  max_discount?: number;
  accept_discount?: number;
  start_installment_date?: string; // not displayed
  end_installment_date?: string; // not displayed
}
interface DiscountData {
  id: number;
  name: string;
  discount_type: 0 | 1; // 0 => percentage, 1 => fixed
  amount: number | string;
  is_seasonal?: number;
  service_id?: number;
}
interface PaymentMethod {
  id: number;
  name: string;
}

// “Selected service”
interface SelectedService {
  serviceId: number;
  discountIds: number[];
  downPayment: number;
  chosenInstallments: number;
  maxInstallments: number;
  paymentMethod?: number;
  serviceDate?: string;
}

interface CalculatePageProps {
  studentId?: number | null;
}

export default function CalculatePage({ studentId }: CalculatePageProps = {}) {
  // 1) Filter States
  const [branchId, setBranchId] = useState<number | "">("");
  const [programId, setProgramId] = useState<number | "">("");
  const [levelId, setLevelId] = useState<number | "">("");
  const [courseId, setCourseId] = useState<number | "">("");
  const [schoolTypeId, setSchoolTypeId] = useState<number | "">("");
  const today = new Date().toISOString().split("T")[0];
  const [_installmentStart, setInstallmentStart] = useState<string>(today);
  const [_installmentEnd, setInstallmentEnd] = useState<string>(today);
  // Filtreleme durumunu takip eden state
  const [filtersApplied, setFiltersApplied] = useState(false);
  useEffect(() => {
    if (branchId && programId && levelId && courseId && schoolTypeId) {
      setFiltersApplied(true);
    } else {
      setFiltersApplied(false);
    }
  }, [branchId, programId, levelId, courseId, schoolTypeId]);

  // 2) We start with `enabled = false`. Only when user changes something do we enable.
  const [filtersEnabled, setFiltersEnabled] = useState(false);


  // 3) Hooks with dynamic `enabled`
  const { data: branchData } = useBranchTable({ enabled: filtersEnabled });
  const { programsData } = useProgramsTable({ enabled: filtersEnabled });
  const { levelsData } = useLevelsTable({
    enabled: filtersEnabled && !!programId,
    program_id: Number(programId) || 0,
  });
  const { coursesData } = useCoursesTable({
    enabled: filtersEnabled && !!levelId,
    level_id: Number(levelId) || 0,
  });
  const { schoolTypesData } = useSchoolTypesList({ enabled: filtersEnabled });

  const { data: servicesData, loading: servicesLoading } = useServicesTable({
    enabled:
      filtersEnabled &&
      !!branchId &&
      !!programId &&
      !!levelId &&
      !!courseId &&
      !!schoolTypeId,
    branch_id: Number(branchId) || 0,
    program_id: Number(programId) || 0,
    level_id: Number(levelId) || 0,
    course_id: Number(courseId) || 0,
    school_type: Number(schoolTypeId) || 0,
    page: 1,
    pageSize: 9999,
  });

  const { data: discountList } = useDiscountsTable({
    enabled: filtersEnabled,
    page: 1,
    pageSize: 9999,
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  useEffect(() => {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (
          parsedData?.payment_methods &&
          Array.isArray(parsedData.payment_methods)
        ) {
          setPaymentMethods(parsedData.payment_methods);
        }
      }
    } catch (error) {
      console.error("Ödeme yöntemleri yüklenirken hata:", error);
    }
  }, []);

  // 4) Convert data or fallback
  const branches: Branch[] = branchData || [];
  const programs: Program[] = programsData || [];
  const levels: Level[] = levelsData || [];
  const courses: Course[] = coursesData || [];
  const schoolTypes: SchoolType[] = schoolTypesData || [];

  // convert service price => number
  const services: ServiceData[] = (servicesData || []).map((s) => ({
    ...s,
    price: Number(s.price),
  }));

  // convert discount amounts => number
  const discounts: DiscountData[] = (discountList || []).map((d) => ({
    ...d,
    amount: Number(d.amount),
    discount_type: d.discount_type === 1 ? 1 : 0,
    is_seasonal: d.is_seasonal ?? undefined,
    service_id: d.service_id ?? undefined,
  }));



  // 5) “Selected services”
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    []
  );

  // 6) “Hizmet Yok” modal
  const [showNoServiceModal, setShowNoServiceModal] = useState(false);

  // If no services come back, but user has chosen filters
  useEffect(() => {
    if (
      filtersEnabled &&
      !servicesLoading &&
      services.length === 0 &&
      branchId &&
      programId &&
      levelId &&
      courseId &&
      schoolTypeId
    ) {
      setShowNoServiceModal(true);
      setFiltersApplied(true);
    } else {
      setShowNoServiceModal(false);
      setFiltersApplied(false);
    }
  }, [
    filtersEnabled,
    servicesLoading,
    services,
    branchId,
    programId,
    levelId,
    courseId,
    schoolTypeId,
  ]);

  // studentId varsa, filtreleri otomatik olarak etkinleştir
  useEffect(() => {
    if (studentId) {
      setFiltersEnabled(true);
      // İsteğe bağlı: Burada öğrenci bilgisine göre filtreleri otomatik doldurabilirsiniz
      // Örneğin öğrencinin şubesi, programı vb. bilgileri
    }
  }, [studentId]);

  // 7) On user change => we setFiltersEnabled(true)
  function handleBranchChange(value: string) {
    setBranchId(value ? Number(value) : "");
    setFiltersEnabled(true); // enable fetch
    setFiltersApplied(false); // Filtre değiştiğinde henüz uygulanmadı
  }
  function handleProgramChange(value: string) {
    setProgramId(value ? Number(value) : "");
    setFiltersEnabled(true);
    setFiltersApplied(false);
  }
  function handleLevelChange(value: string) {
    setLevelId(value ? Number(value) : "");
    setFiltersEnabled(true);
    setFiltersApplied(false);
  }
  function handleCourseChange(value: string) {
    setCourseId(value ? Number(value) : "");
    setFiltersEnabled(true);
    setFiltersApplied(false);
  }
  function handleSchoolTypeChange(value: string) {
    setSchoolTypeId(value ? Number(value) : "");
    setFiltersEnabled(true);
    setFiltersApplied(false);
  }

  // 8) Hizmet Seç / Kaldır
  function handleSelectService(srv: ServiceData) {
    const found = selectedServices.find((s) => s.serviceId === srv.id);
    if (!found) {
      setSelectedServices((prev) => [
        ...prev,
        {
          serviceId: srv.id,
          discountIds: [],
          downPayment: 0,
          chosenInstallments: srv.max_installments || 1,
          maxInstallments: srv.max_installments || 1,
          paymentMethod: undefined,
          serviceDate: "",
        },
      ]);
    } else {
      setSelectedServices((prev) => prev.filter((s) => s.serviceId !== srv.id));
    }
  }

  function handleToggleDiscount(serviceId: number, discountId: number) {
    setSelectedServices((prev) =>
      prev.map((item) => {
        if (item.serviceId === serviceId) {
          const has = item.discountIds.includes(discountId);
          return {
            ...item,
            discountIds: has
              ? item.discountIds.filter((id) => id !== discountId)
              : [...item.discountIds, discountId],
          };
        }
        return item;
      })
    );
  }

  function handleDownPayment(serviceId: number, newVal: number) {
    setSelectedServices((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId ? { ...item, downPayment: newVal } : item
      )
    );
  }

  function handleInstallment(serviceId: number, newVal: number) {
    setSelectedServices((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId
          ? { ...item, chosenInstallments: newVal }
          : item
      )
    );
  }

  function handlePaymentMethod(serviceId: number, methodId: number) {
    setSelectedServices((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId
          ? { ...item, paymentMethod: methodId }
          : item
      )
    );
  }

  function handleServiceDate(serviceId: number, dateStr: string) {
    setSelectedServices((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId ? { ...item, serviceDate: dateStr } : item
      )
    );
  }

  // 9) Calculation
  const { totalPrice, totalDiscount, netTotal } = useMemo(() => {
    let tPrice = 0;
    let tDisc = 0;
    selectedServices.forEach((sel) => {
      const srv = services.find((s) => s.id === sel.serviceId);
      if (!srv) return;
      const rawPrice = Number(srv.price);
      let discVal = 0;
      const used = discounts.filter((d) => sel.discountIds.includes(d.id));

      used.forEach((d) => {
        if (d.discount_type === 0) {
          discVal += rawPrice * (Number(d.amount) / 100);
        } else {
          discVal += Number(d.amount);
        }
      });
      if (srv.max_discount) {
        discVal = Math.min(discVal, srv.max_discount);
      }
      tPrice += rawPrice;
      tDisc += discVal;
    });
    return {
      totalPrice: tPrice,
      totalDiscount: tDisc,
      netTotal: tPrice - tDisc,
    };
  }, [selectedServices, services, discounts]);

  // 10) format
  function formatCurrency(num: number): string {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(num);
  }

  return (
    <div >

      {/* Hizmet Yok Modal */}
      <Modal
        show={showNoServiceModal}
        onHide={() => setShowNoServiceModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hizmet Bulunamadı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Seçtiğiniz filtreler için tanımlı hizmet bulunamadı.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowNoServiceModal(false)}
          >
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Filtreler */}
      <Card className="mb-3">
        <Card.Body>
          <Row className="mb-3">
            <Col md={2}>
              <Form.Label>Şube</Form.Label>
              <Form.Select
                value={branchId}
                onClick={() => setFiltersEnabled(true)}
                onChange={(e) => handleBranchChange(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={2}>
              <Form.Label>Okul Seviyesi</Form.Label>
              <Form.Select
                value={programId}
                onChange={(e) => handleProgramChange(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {programs.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={2}>
              <Form.Label>Sınıf Seviyesi</Form.Label>
              <Form.Select
                value={levelId}
                onChange={(e) => handleLevelChange(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {levels.map((lv) => (
                  <option key={lv.id} value={lv.id}>
                    {lv.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={2}>
              <Form.Label>Alan</Form.Label>
              <Form.Select
                value={courseId}
                onChange={(e) => handleCourseChange(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {courses.map((cr) => (
                  <option key={cr.id} value={cr.id}>
                    {cr.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={2}>
              <Form.Label>Okul Türü</Form.Label>
              <Form.Select
                value={schoolTypeId}
                onChange={(e) => handleSchoolTypeChange(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {schoolTypes.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={2}>
              <Form.Label>Taksit Dönemi</Form.Label>
              <div style={{ width: "100%" }}>
                <SpkFlatpickr
                  placeholder={[today, today]}
                  options={{
                    mode: "range",
                    dateFormat: "Y-m-d",
                    disableMobile: true,
                  }}
                  inputClass="form-control"
                  value={
                    _installmentEnd
                      ? `${_installmentStart} to ${_installmentEnd}`
                      : _installmentStart
                  }
                  onfunChange={(dates: Date[]) => {
                    if (dates.length === 2) {
                      setInstallmentStart(dates[0].toISOString().split("T")[0]);
                      setInstallmentEnd(dates[1].toISOString().split("T")[0]);
                    } else if (dates.length === 1) {
                      setInstallmentStart(dates[0].toISOString().split("T")[0]);
                      setInstallmentEnd("");
                    } else {
                      setInstallmentStart("");
                      setInstallmentEnd("");
                    }
                    // Also enable fetch
                    setFiltersEnabled(true);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {filtersApplied && selectedServices.length > 0 ? (
        <>
          (
          <Row className="mb-3 bg-dark text-white py-2 rounded">
            <Col md={4} className="text-center">
              <strong>Liste: </strong>
              {formatCurrency(totalPrice)}
            </Col>
            <Col md={4} className="text-center">
              <strong>İndirim: </strong>
              {formatCurrency(totalDiscount)}
            </Col>
            <Col md={4} className="text-center">
              <strong>Net: </strong>
              {formatCurrency(netTotal)}
            </Col>
          </Row>
          )
        </>
      ) : null}

      <Accordion alwaysOpen>
        {services.map((srv: ServiceData, idx: number) => {
          const isSelected = selectedServices.some(
            (s) => s.serviceId === srv.id
          );
          const sel = selectedServices.find((s) => s.serviceId === srv.id);

          // discount logic
          let discountVal = 0;
          let netVal = Number(srv.price);
          if (sel) {
            const usedDiscounts = discounts.filter((d) =>
              sel.discountIds.includes(d.id)
            );
            usedDiscounts.forEach((d) => {
              if (d.discount_type === 0) {
                discountVal += netVal * (Number(d.amount) / 100);
              } else {
                discountVal += Number(d.amount);
              }
            });
            if (srv.max_discount) {
              discountVal = Math.min(discountVal, srv.max_discount);
            }
            netVal -= discountVal;
            if (netVal < 0) netVal = 0;
          }

          const dp = sel?.downPayment || 0;
          let netAfterDp = netVal - dp;
          if (netAfterDp < 0) netAfterDp = 0;

          const taksitCount =
            sel?.chosenInstallments || (srv.max_installments ?? 1);
          const monthlyPay = netAfterDp / taksitCount;

          return (
            <Accordion.Item eventKey={String(idx)} key={srv.id}>
              <Accordion.Header onClick={() => handleSelectService(srv)}>
                {isSelected && (
                  <i
                    className="bi bi-check-circle-fill text-success fs-5 me-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedServices((prev) =>
                        prev.filter((item) => item.serviceId !== srv.id)
                      );
                    }}
                  />
                )}
                {srv.name}
              </Accordion.Header>

              {isSelected && sel && (
                <Accordion.Body>
                  <div className="d-flex flex-wrap gap-3 mb-2">
                    <div>
                      <strong>Taksit Dönemi:</strong> {sel.serviceDate || "-"}
                    </div>
                    <div>
                      <i className="bi bi-credit-card-2-front-fill text-primary me-2" />
                      <strong>Maksimum Taksit:</strong> {sel.maxInstallments}
                    </div>
                    <div>
                      <strong>Taksit Başına Ödeme:</strong>{" "}
                      {formatCurrency(monthlyPay)}
                    </div>
                  </div>

                  <Row className="mb-3 text-center bg-dark text-white py-2 rounded">
                    <Col md={4}>
                      Liste: {formatCurrency(srv.price as number)}
                    </Col>
                    <Col md={4}>İndirim: {formatCurrency(discountVal)}</Col>
                    <Col md={4}>Net: {formatCurrency(netAfterDp)}</Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Ödeme Yöntemi</Form.Label>
                        <Form.Select
                          value={sel.paymentMethod || ""}
                          onChange={(e) =>
                            handlePaymentMethod(srv.id, Number(e.target.value))
                          }
                        >
                          <option value="">Seçiniz</option>
                          {paymentMethods.map((pm) => (
                            <option key={pm.id} value={pm.id}>
                              {pm.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Peşinat</Form.Label>
                        <Form.Control
                          type="number"
                          min={0}
                          value={sel.downPayment}
                          onChange={(e) =>
                            handleDownPayment(srv.id, Number(e.target.value))
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Taksit Seç</Form.Label>
                        <Form.Select
                          value={sel.chosenInstallments}
                          onChange={(e) =>
                            handleInstallment(srv.id, Number(e.target.value))
                          }
                        >
                          {Array.from(
                            { length: sel.maxInstallments },
                            (_, i) => i + 1
                          ).map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Taksit Dönemi</Form.Label>
                        <div style={{ minWidth: "200px" }}>
                          <SpkFlatpickr
                            placeholder="YYYY-MM-DD"
                            options={{
                              dateFormat: "Y-m-d",
                              disableMobile: true,
                            }}
                            inputClass="form-control form-control-sm"
                            value={
                              sel.serviceDate ? [new Date(sel.serviceDate)] : []
                            }
                            onfunChange={(dates: Date[]) => {
                              const dateStr = dates[0]
                                ? dates[0].toISOString().split("T")[0]
                                : "";
                              handleServiceDate(srv.id, dateStr);
                            }}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  {srv.accept_discount === 1 ? (
                    <Row>
                      <Col md={6}>
                        <strong>Genel İndirimler</strong>
                        {discounts
                          .filter(
                            (d) =>
                              d.service_id === srv.id &&
                              d.is_seasonal === 0 &&
                              srv.accept_discount === 1
                          )
                          .map((d) => {
                            const checked = sel.discountIds.includes(d.id);
                            const labelStr =
                              d.discount_type === 0
                                ? `${d.name} (%${d.amount})`
                                : `${d.name} (${formatCurrency(
                                  d.amount as number
                                )})`;
                            return (
                              <Form.Check
                                key={d.id}
                                type="checkbox"
                                label={labelStr}
                                checked={checked}
                                onChange={() =>
                                  handleToggleDiscount(srv.id, d.id)
                                }
                              />
                            );
                          })}
                      </Col>
                      <Col md={6}>
                        <strong>Dönemsel İndirimler</strong>
                        {discounts
                          .filter(
                            (d) =>
                              d.service_id === srv.id &&
                              d.is_seasonal === 1 &&
                              srv.accept_discount === 1
                          )
                          .map((d) => {
                            const checked = sel.discountIds.includes(d.id);
                            const labelStr =
                              d.discount_type === 0
                                ? `${d.name} (%${d.amount})`
                                : `${d.name} (${formatCurrency(
                                  d.amount as number
                                )})`;
                            return (
                              <Form.Check
                                key={d.id}
                                type="checkbox"
                                label={labelStr}
                                checked={checked}
                                onChange={() =>
                                  handleToggleDiscount(srv.id, d.id)
                                }
                              />
                            );
                          })}
                      </Col>
                    </Row>
                  ) : (
                    <div className="alert alert-info mt-2">
                      Bu hizmet indirim kabul etmez.
                    </div>
                  )}
                </Accordion.Body>
              )}
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}

import React, { useState, useEffect, useMemo } from "react";
import { Accordion, Button, Modal, Row, Col, Form } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import SpkFlatpickr from "@spk-reusable-components/reusable-plugins/spk-flatpicker";

// Hooks
import { useServicesTable } from "../../../../hooks/service/useList";
import { useDiscountsTable } from "../../../../hooks/discounts/useList";
import { usePaymentMethodsList } from "../../../../hooks/paymentMethods/useList";
import { useStep2 } from "../../../../hooks/student/useStep2";
import { useStep3 } from "../../../../hooks/student/useStep3";

// Types
import { IService } from "../../../../../types/services/list";
import { DiscountData } from "../../../../../types/discounts/list";
import { PaymentMethod } from "../../../../../types/paymentMethods/list";

/**
 * Seçili hizmet bilgisi
 */
export interface ISelectedService {
  serviceId: number;           // Hizmet ID
  discountIds: number[];       // Uygulanan indirim ID’leri
  paymentMethod?: number;      // Seçilen Payment Method ID
  serviceDate: string;         // Tek tarih
  maxInstallments: number;     // Maksimum taksit (API’den srv.max_installments)
  chosenInstallments: number;  // Kullanıcının seçtiği taksit
  downPayment: number;         // Peşinat
}

/** Step2 Bileşeni Props */
interface CreateEnrollmentStep2Props {
  studentId: number; // PUT /students/:id
  branche_id: number | null;
  level_id: number | null;
  program_id: number | null;
  course_id: number | null;

  selectedServices: ISelectedService[];
  setSelectedServices: React.Dispatch<React.SetStateAction<ISelectedService[]>>;

  onNext: () => void;
  onPrev: () => void;
}

const CreateEnrollmentStep2: React.FC<CreateEnrollmentStep2Props> = ({
  studentId,
  branche_id,
  level_id,
  program_id,
  course_id,
  selectedServices,
  setSelectedServices,
  onNext,
  onPrev,
}) => {
  const [showNoServiceModal, setShowNoServiceModal] = useState(false);

  // 1) Hizmet, İndirim, Ödeme Yöntemi verilerini alıyoruz
  const {
    data: serviceListResponse,
    loading: servicesLoading,
    error: _servicesError,
  } = useServicesTable({
    enabled: true,
    branch_id: branche_id || undefined,
    level_id: level_id || undefined,
    program_id: program_id || undefined,
    course_id: course_id || undefined,
    page: 1,
    pageSize: 9999,
  });
  const services: IService[] = useMemo(
    () => serviceListResponse || [],
    [serviceListResponse]
  );

  useEffect(() => {
    // Eğer hizmet listesi boş geliyorsa => Modal
    if (!servicesLoading && services && services.length === 0) {
      setShowNoServiceModal(true);
    } else {
      setShowNoServiceModal(false);
    }
  }, [servicesLoading, services]);

  const {
    data: discountListResponse,
    loading: _discountsLoading,
    error: _discountsError,
  } = useDiscountsTable({
    enabled: true,
    page: 1,
    pageSize: 9999,
  });
  const discounts: DiscountData[] = useMemo(
    () => discountListResponse || [],
    [discountListResponse]
  );

  const {
    data: paymentMethodListResponse,
    loading: _pmLoading,
    error: _pmError,
  } = usePaymentMethodsList({
    enabled: true,
    page: 1,
    pageSize: 9999,
  });
  const paymentMethods: PaymentMethod[] = useMemo(
    () => paymentMethodListResponse || [],
    [paymentMethodListResponse]
  );

  // Step2 & Step3 Hook
  const { saveStep2, status: step2Status } = useStep2();
  const { saveStep3, status: step3Status } = useStep3();

  const step2Loading = step2Status === "LOADING";
  const step3Loading = step3Status === "LOADING";
  const isAnyLoading = step2Loading || step3Loading;

  // 2) Hizmet Seç / Kaldır / İndirim vb.
  function handleSelectService(srv: IService) {
    // Örnek: Eğer bu hizmete daha önce taksit girilmişse
    // (srv.hasInstallments === true gibi bir property) => engelle
    if ((srv as any).hasInstallments) {
      alert("Seçilen hizmete bağlı daha önce taksit girişi olmuştur, lütfen farklı bir hizmet seçiniz.");
      return;
    }

    // Zaten seçili mi?
    const exist = selectedServices.find((x) => x.serviceId === srv.id);
    if (exist) return;

    // Ekle
    setSelectedServices((prev) => [
      ...prev,
      {
        serviceId: srv.id,
        discountIds: [],
        paymentMethod: undefined,
        serviceDate: "",                  // tek tarih
        maxInstallments: srv.max_installments || 1,
        chosenInstallments: 1,
        downPayment: 0,
      },
    ]);
  }

  function handleRemoveService(srvId: number, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    setSelectedServices((prev) => prev.filter((x) => x.serviceId !== srvId));
  }

  function handleToggleDiscount(serviceId: number, discountId: number) {
    setSelectedServices((prev) =>
      prev.map((item) => {
        if (item.serviceId === serviceId) {
          const has = item.discountIds.includes(discountId);
          if (has) {
            return {
              ...item,
              discountIds: item.discountIds.filter((d) => d !== discountId),
            };
          } else {
            return {
              ...item,
              discountIds: [...item.discountIds, discountId],
            };
          }
        }
        return item;
      })
    );
  }

  // Tarih tek => "serviceDate"
  function handleServiceDateChange(serviceId: number, dates: Date[]) {
    const dateStr = dates[0] ? dates[0].toISOString().split("T")[0] : "";
    setSelectedServices((prev) =>
      prev.map((x) =>
        x.serviceId === serviceId ? { ...x, serviceDate: dateStr } : x
      )
    );
  }

  // 3) Formatlar
  function formatCurrency(numOrStr: number | string): string {
    const val = typeof numOrStr === "string" ? parseFloat(numOrStr) : numOrStr;
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(val);
  }

  // Seçilen hizmetlerin toplam liste ücreti
  const totalPrice = useMemo(() => {
    let sum = 0;
    selectedServices.forEach((sel) => {
      const srv = services.find((s) => s.id === sel.serviceId);
      if (!srv) return;
      sum += parseFloat(srv.price);
    });
    return sum;
  }, [selectedServices, services]);

  // Seçilen hizmetlerin toplam indirimi
  const totalDiscount = useMemo(() => {
    let sum = 0;
    selectedServices.forEach((sel) => {
      const srv = services.find((s) => s.id === sel.serviceId);
      if (!srv) return;
      const rawPrice = parseFloat(srv.price);

      let discountSum = 0;
      const usedDiscounts = discounts.filter((d) =>
        sel.discountIds.includes(d.id)
      );
      usedDiscounts.forEach((d) => {
        const dAmount = parseFloat(d.amount);
        if (d.discount_type === 0) {
          // % indirim
          discountSum += rawPrice * (dAmount / 100);
        } else {
          // tutar indirimi
          discountSum += dAmount;
        }
      });
      const maxD = srv.max_discounts
        ? parseFloat(String(srv.max_discounts))
        : 99999999;
      discountSum = Math.min(discountSum, maxD);

      sum += discountSum;
    });
    return sum;
  }, [selectedServices, discounts, services]);

  const netTotal = Math.max(0, totalPrice - totalDiscount);

  // 4) Step2 + Step3 Kaydet
  async function handleSaveStep2() {
    if (selectedServices.length === 0) {
      alert("En az bir hizmet seçiniz!");
      return;
    }

    // Step2 Payload
    const serviceIds = selectedServices.map((s) => s.serviceId);
    const allDiscountIds = Array.from(
      new Set(selectedServices.flatMap((s) => s.discountIds))
    );
    const step2Payload = {
      type: "final",
      step: "2",
      services: serviceIds,
      discounts: allDiscountIds,
    };

    // Step3 Payload
    const services_final = selectedServices.map((s) => s.serviceId);
    const step3Discounts = allDiscountIds;
    // Tek tarih => array'e çevirirsek
    const services_dates = selectedServices.map((s) => s.serviceDate);

    // varsayım: sabit vergi
    const taxes = [3, 4];

    // net ücret => raw price - discount - downPayment
    const fees = selectedServices.map((sel) => {
      const srv = services.find((x) => x.id === sel.serviceId);
      if (!srv) return 0;
      const rawPrice = parseFloat(srv.price);

      // indirim
      let discountVal = 0;
      const used = discounts.filter((d) => sel.discountIds.includes(d.id));
      used.forEach((d) => {
        const dd = parseFloat(d.amount);
        if (d.discount_type === 0) discountVal += rawPrice * (dd / 100);
        else discountVal += dd;
      });
      const maxD = srv.max_discounts
        ? parseFloat(String(srv.max_discounts))
        : 99999999;
      discountVal = Math.min(discountVal, maxD);

      const net = Math.max(0, rawPrice - discountVal);
      const netAfterDp = Math.max(0, net - sel.downPayment);
      return netAfterDp;
    });

    const advance_prices = selectedServices.map((sel) => sel.downPayment);
    const payment_methods = selectedServices.map((sel) => sel.paymentMethod ?? 0);

    const step3Payload = {
      type: "final",
      step: "3",
      branch_id: branche_id ?? 0,
      discounts: step3Discounts,
      services_final,
      services_dates,
      taxes,
      fees,
      advance_prices,
      payment_methods,
    };

    try {
      // Step2 kaydet
      await saveStep2(studentId, step2Payload);
      console.log("Step2 kaydı başarılı.");

      // Step3 kaydet
      await saveStep3(studentId, step3Payload);
      console.log("Step3 kaydı başarılı.");

      onNext();
    } catch (err: any) {
      console.error("Step2/Step3 kaydetme hatası:", err);
      alert("Kaydetme hatası: " + err.message);
    }
  }

  return (
    <>
      {/* “Hizmet Yok” Modal */}
      <Modal show={showNoServiceModal} onHide={() => setShowNoServiceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hizmet Bulunamadı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Seçilen şube / program / level / course için tanımlı hizmet yok. Lütfen{" "}
          <a href="/student/services" style={{ color: "black" }}>
            Hizmet Yönetimi
          </a>{" "}
          sayfasına gidiniz.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowNoServiceModal(false)}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Step2 İçerik */}
      <div className="container my-3">
        {selectedServices.length > 0 && (
          <Row className="mb-3 text-center">
            <Col md={4}>
              <div>
                Liste:
                <strong className="ms-2">{formatCurrency(totalPrice)}</strong>
              </div>
            </Col>
            <Col md={4}>
              <div>
                İndirim:
                <strong className="ms-2">{formatCurrency(totalDiscount)}</strong>
              </div>
            </Col>
            <Col md={4}>
              <div>
                Net:
                <strong className="ms-2">{formatCurrency(netTotal)}</strong>
              </div>
            </Col>
          </Row>
        )}

        <Accordion alwaysOpen>
          {services.map((srv, idx) => {
            // Bu servis seçili mi?
            const isSelected = selectedServices.some((x) => x.serviceId === srv.id);
            // Seçiliyse details
            const selObj = selectedServices.find((x) => x.serviceId === srv.id);

            // Ham fiyat
            const rawPrice = parseFloat(srv.price);

            // İndirim hesapla
            let discountVal = 0;
            if (selObj) {
              const used = discounts.filter((d) => selObj.discountIds.includes(d.id));
              used.forEach((d) => {
                const dd = parseFloat(d.amount);
                if (d.discount_type === 0) discountVal += rawPrice * (dd / 100);
                else discountVal += dd;
              });
              const maxD = srv.max_discounts
                ? parseFloat(String(srv.max_discounts))
                : 9999999;
              discountVal = Math.min(discountVal, maxD);
            }
            const finalNet = Math.max(0, rawPrice - discountVal);
            const dp = selObj?.downPayment ?? 0;
            const finalNetAfterDp = Math.max(0, finalNet - dp);

            // "Ana Servis" / "Alt Servis"
            const mainOrSub = srv.is_main === 1 ? "Ana Servis" : "Alt Servis";
            const vatRateText = `KDV Oranı: %${srv.vat_rate || 0}`;

            return (
              <Accordion.Item eventKey={String(idx)} key={srv.id}>
                <Accordion.Header
                  onClick={() => {
                    if (!isSelected) {
                      // Seçme
                      handleSelectService(srv);
                    }
                  }}
                >
                  {isSelected && (
                    <i
                      style={{ marginRight: "1rem", cursor: "pointer" }}
                      className="bi bi-check-circle-fill text-success fs-5"
                      onClick={(e) => handleRemoveService(srv.id, e)}
                    />
                  )}
                  {srv.name} {"  "}
                  <small className="text-muted ms-2">
                    ({mainOrSub}, {vatRateText})
                  </small>
                </Accordion.Header>
                {isSelected && selObj && (
                  <Accordion.Body>
                    {/* Ücret Bilgisi Row */}
                    <Row className="mb-3 text-center">
                      <Col md={4}>
                        Liste: <strong>{formatCurrency(rawPrice)}</strong>
                      </Col>
                      <Col md={4}>
                        İndirim: <strong>{formatCurrency(discountVal)}</strong>
                      </Col>
                      <Col md={4}>
                        Net: <strong>{formatCurrency(finalNetAfterDp)}</strong>
                      </Col>
                    </Row>
                    <Col md={3}>
                        <Form.Group>
                          {/* Maksimum Taksit */}
                          <Form.Label>
                            <i className="bi bi-credit-card-2-front-fill text-primary me-2" />
                            Maksimum Taksit: {selObj.maxInstallments}
                          </Form.Label>
                        </Form.Group>
                      </Col>
                    {/* Form Elemanları */}
                    <Row className="mb-3">
                    
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Ödeme Yöntemi</Form.Label>
                          <Form.Select
                            value={selObj.paymentMethod ?? ""}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setSelectedServices((prev) =>
                                prev.map((x) =>
                                  x.serviceId === srv.id
                                    ? { ...x, paymentMethod: val }
                                    : x
                                )
                              );
                            }}
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
                          <NumericFormat
                            className="form-control"
                            decimalSeparator=","
                            thousandSeparator="."
                            allowNegative={false}
                            decimalScale={2}
                            fixedDecimalScale
                            value={selObj.downPayment}
                            onValueChange={(vals) => {
                              const { floatValue } = vals;
                              setSelectedServices((prev) =>
                                prev.map((x) =>
                                  x.serviceId === srv.id
                                    ? {
                                        ...x,
                                        downPayment: floatValue ?? 0,
                                      }
                                    : x
                                )
                              );
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Taksit Seç</Form.Label>
                          <Form.Select
                            value={selObj.chosenInstallments}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setSelectedServices((prev) =>
                                prev.map((x) =>
                                  x.serviceId === srv.id
                                    ? { ...x, chosenInstallments: val }
                                    : x
                                )
                              );
                            }}
                          >
                            {Array.from(
                              { length: selObj.maxInstallments },
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
                          <Form.Label>Hizmet Tarihi</Form.Label>
                          <SpkFlatpickr
                            value={selObj.serviceDate ? [new Date(selObj.serviceDate)] : []}
                            onfunChange={(dates: Date[]) => {
                              handleServiceDateChange(srv.id, dates);
                            }}
                            options={{
                              dateFormat: "Y-m-d",
                              disableMobile: true,
                            }}
                            inputClass="form-control"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                 
              
                  

                    {/* İndirim Seçenekleri */}
                    {srv.accept_discount === 1 ? (
                      <Row>
                        <Col md={6}>
                          <strong>Genel İndirimler</strong>
                          {discounts
                            .filter(
                              (d) =>
                                d.service_id === srv.id &&
                                d.is_seasonal === 0 &&
                                d.service &&
                                d.service.accept_discount === 1
                            )
                            .map((dd) => {
                              const checked = selObj.discountIds.includes(dd.id);
                              const labelText =
                                dd.discount_type === 0
                                  ? `${dd.name} (%${dd.amount})`
                                  : `${dd.name} (${formatCurrency(dd.amount)})`;
                              return (
                                <Form.Check
                                  key={dd.id}
                                  type="checkbox"
                                  label={labelText}
                                  checked={checked}
                                  onChange={() =>
                                    handleToggleDiscount(srv.id, dd.id)
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
                                d.service &&
                                d.service.accept_discount === 1
                            )
                            .map((dd) => {
                              const checked = selObj.discountIds.includes(dd.id);
                              const labelText =
                                dd.discount_type === 0
                                  ? `${dd.name} (%${dd.amount})`
                                  : `${dd.name} (${formatCurrency(dd.amount)})`;
                              return (
                                <Form.Check
                                  key={dd.id}
                                  type="checkbox"
                                  label={labelText}
                                  checked={checked}
                                  onChange={() =>
                                    handleToggleDiscount(srv.id, dd.id)
                                  }
                                />
                              );
                            })}
                        </Col>
                      </Row>
                    ) : (
                      <div className="alert alert-warning mt-3">
                        Bu hizmet için indirim geçerli değildir.
                      </div>
                    )}
                  </Accordion.Body>
                )}
              </Accordion.Item>
            );
          })}
        </Accordion>

        {/* Alt Butonlar */}
        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-secondary" onClick={onPrev}>
            Geri
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleSaveStep2}
            disabled={isAnyLoading}
          >
            {isAnyLoading ? "Kaydediliyor..." : "Kaydet ve İlerle"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateEnrollmentStep2;

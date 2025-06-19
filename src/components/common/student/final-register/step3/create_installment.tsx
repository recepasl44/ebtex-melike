import React, { useState, useEffect } from "react";
import {
  Accordion,
  Button,
  Table,
  Form,
  Spinner,
  Modal,
} from "react-bootstrap";
import SpkFlatpickr from "../../../../../@spk-reusable-components/reusable-plugins/spk-flatpicker";

// Tarih manipülasyonu için dayjs
import dayjs from "dayjs";

// Hooks
import { useEnrollmentsList } from "../../../../hooks/enrollments/useList";
import { useAddInstallment } from "../../../../hooks/Installment/useAdd";
import { useDeleteInstallment } from "../../../../hooks/Installment/useDelete";
import { useUpdateInstallment } from "../../../../hooks/Installment/useUpdate";

// Types
import { Enrollment } from "../../../../../types/enrollments/list";
import { IInstallment } from "../../../../../types/Installment/list";
import {
  CreateInstallmentResponse,
} from "../../../../../types/Installment/add";
import { PaymentMethod } from "../../../../../types/paymentMethods/list";

interface CreateInstallmentStep3Props {
  studentId: number;
  enrollments?: any[];
  paymentMethods: PaymentMethod[];
  onPrev: () => void;
  onNext: () => void;
}

/** 
 * mapCreateToInstallment:
 *  CreateInstallmentResponse (is_paid: boolean | null) => Installment (is_paid: number | null)
 */
function mapCreateToInstallment(resp: CreateInstallmentResponse): IInstallment {
  return {
    ...resp,
    // boolean => number (0|1)
    is_paid: resp.is_paid ? 1 : 0,
  };
}

const CreateInstallmentStep3: React.FC<CreateInstallmentStep3Props> = ({
  studentId,
  paymentMethods,
  onPrev,
  onNext,
}) => {
  const [loading, setLoading] = useState(false);
  const [expandedEnrollments, setExpandedEnrollments] = useState<number[]>([]);

  // Enrollments Hook
  const {
    data: enrollmentsData,
    loading: enrollLoading,
    error,
  } = useEnrollmentsList({
    enabled: true,
    student_id: studentId,
    paginate: 25,
    orderBy: "ASC",
    sortBy: "created_at",
  });

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  // CRUD hooks
  const { addInstallment, status: addStatus } = useAddInstallment();
  const { removeInstallment, status: deleteStatus } = useDeleteInstallment();
  const { editInstallment, status: updateStatus } = useUpdateInstallment();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalEnrollmentId, setModalEnrollmentId] = useState<number | null>(null);

  // Toplu ekleme form alanları
  const [modalAmount, setModalAmount] = useState("0.00");
  const [modalCount, setModalCount] = useState(1);
  const [modalStartDate, setModalStartDate] = useState<Date | null>(null);

  useEffect(() => {
    if (enrollmentsData) {
      setEnrollments(enrollmentsData);
    }
  }, [enrollmentsData]);

  function toggleEnrollment(id: number) {
    setExpandedEnrollments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  /** Local state update (satır içi input değişiklikleri) */
  function updateInstallmentField(
    enrollmentId: number,
    installmentId: number,
    field: keyof IInstallment,
    value: any
  ) {
    setEnrollments((prev) =>
      prev.map((enr) => {
        if (enr.id !== enrollmentId) return enr;
        const newInst = enr.installments.map((ins) =>
          ins.id === installmentId ? { ...ins, [field]: value } : ins
        );
        return { ...enr, installments: newInst };
      })
    );
  }

  /** PUT /installments/:id */
  async function handleUpdateInstallment(enrollmentId: number, ins: IInstallment) {
    if (!ins.id) return;
    setLoading(true);
    try {
      const payload = {
        installmentId: ins.id,
        body: {
          enrollment_id: enrollmentId,
          student_id: studentId,
          amount: ins.amount,
          due_date: ins.due_date,
          // number => boolean
          is_paid: ins.is_paid === 1 ? true : false,
          payment_date: ins.payment_date,
        },
      };
      await editInstallment(payload);
    } catch (err: any) {
      alert("Güncelleme hatası: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  /** DELETE /installments/:id */
  async function handleDeleteInstallment(enrollmentId: number, insId: number) {
    if (!window.confirm("Bu taksiti silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    try {
      await removeInstallment({ installmentId: insId });
      setEnrollments((prev) =>
        prev.map((enr) => {
          if (enr.id !== enrollmentId) return enr;
          return {
            ...enr,
            installments: enr.installments.filter((i) => i.id !== insId),
          };
        })
      );
    } catch (err: any) {
      alert("Silme hatası: " + err.message);
    } finally {
      setLoading(false);
    }
  }


  async function handleDeleteAll(enrollmentId: number) {
    if (!window.confirm("Hepsini silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    try {
      const target = enrollments.find((x) => x.id === enrollmentId);
      if (target) {
        for (const ins of target.installments) {
          if (ins.id) {
            await removeInstallment({ installmentId: ins.id });
          }
        }
        setEnrollments((prev) =>
          prev.map((enr) =>
            enr.id === enrollmentId ? { ...enr, installments: [] } : enr
          )
        );
      }
    } catch (err: any) {
      alert("Toplu silme hatası: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  /** Toplu ekleme modal aç/kapa */
  function openModal(enrId: number) {
    setModalEnrollmentId(enrId);
    setModalAmount("0.00");
    setModalCount(1);
    setModalStartDate(null); // reset
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
  }

  /** Toplu ekle: girilen adet kadar taksit ekliyoruz. 
   *  modalStartDate => + i ay => due_date
   */
  async function handleBatchAdd() {
    if (!modalEnrollmentId) return;
    if (!modalStartDate) {
      alert("Lütfen başlangıç vade tarihi seçiniz!");
      return;
    }
    setLoading(true);

    try {
      for (let i = 0; i < modalCount; i++) {
        // dayjs => startDate + i ay
        const dueDateStr = dayjs(modalStartDate).add(i, "month").format("YYYY-MM-DD 00:00:00");

        const resp = await addInstallment({
          enrollment_id: modalEnrollmentId,
          amount: modalAmount,
          is_paid: false,
          due_date: dueDateStr,
          payment_date: "0000-00-00 00:00:00",
        });
        if (resp && resp.id) {
          const newIns = mapCreateToInstallment(resp);
          setEnrollments((prev) =>
            prev.map((enr) => {
              if (enr.id !== modalEnrollmentId) return enr;
              return { ...enr, installments: [...enr.installments, newIns] };
            })
          );
        }
      }
      closeModal();
    } catch (err: any) {
      alert("Toplu ekleme hatası: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSaveAndNext() {
    onNext();
  }

  const isLoading =
    loading || enrollLoading || addStatus === "LOADING" || updateStatus === "LOADING" || deleteStatus === "LOADING";

  return (
    <div>
      {/* Toplu ekleme modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Toplu Taksit Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Taksit Tutarı</Form.Label>
            <Form.Control
              type="text"
              value={modalAmount}
              onChange={(e) => setModalAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Taksit Adedi</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={modalCount}
              onChange={(e) => setModalCount(parseInt(e.target.value) || 1)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Başlangıç Vade Tarihi</Form.Label>
            <SpkFlatpickr
              value={modalStartDate ? [modalStartDate] : []}
              onfunChange={(dates: Date[]) => {
                if (dates[0]) {
                  setModalStartDate(dates[0]);
                } else {
                  setModalStartDate(null);
                }
              }}
              options={{ dateFormat: "Y-m-d", disableMobile: true }}
              inputClass="form-control"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Vazgeç
          </Button>
          <Button variant="primary" onClick={handleBatchAdd}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>

      {isLoading && (
        <div className="mb-2 d-flex align-items-center">
          <Spinner animation="border" size="sm" className="me-2" />
          <span>İşlemler yükleniyor...</span>
        </div>
      )}

      <h4>Taksit Yönetimi (Step3)</h4>
      {error && <div className="alert alert-danger">{String(error)}</div>}

      {(!enrollments || enrollments.length === 0) ? (
        <div className="alert alert-info">Hiç enrollment bulunamadı.</div>
      ) : (
        <Accordion>
          {enrollments.map((enr) => {
            const open = expandedEnrollments.includes(enr.id);
            return (
              <Accordion.Item eventKey={String(enr.id)} key={enr.id}>
                <Accordion.Header onClick={() => toggleEnrollment(enr.id)}>
                  #{enr.id} - {enr.service?.name || "N/A"} - Ücret: {enr.total_fee}
                </Accordion.Header>
                {open && (
                  <Accordion.Body>
                    <div className="d-flex justify-content-end mb-2" style={{ gap: "1rem" }}>
                      <Button variant="outline-primary" size="sm" onClick={() => openModal(enr.id)}>
                        Ekle
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteAll(enr.id)}>
                        Hepsini Sil
                      </Button>
                    </div>

                    {/* Scroll’lu, responsive tablo */}
                    <div className="table-responsive" style={{ maxHeight: 300, overflowY: "auto" }}>
                      <Table bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Tutar</th>
                            <th>Vade</th>
                            <th>Ödeme Tarihi</th>
                            <th>Ödeme Yöntemi</th>
                            <th>Ödendi?</th>
                            <th>İşlem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enr.installments.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="text-center">
                                Henüz taksit yok.
                              </td>
                            </tr>
                          ) : (
                            enr.installments.map((ins) => (
                              <tr key={ins.id}>
                                <td>{ins.id}</td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={ins.amount}
                                    onChange={(e) =>
                                      updateInstallmentField(enr.id, ins.id, "amount", e.target.value)
                                    }
                                  />
                                </td>
                                <td>
                                  <SpkFlatpickr
                                    value={ins.due_date || ""}
                                    onfunChange={(dates: Date[]) =>
                                      updateInstallmentField(enr.id, ins.id, "due_date", dates[0]?.toISOString().split('T')[0] || '')
                                    }
                                    options={{ dateFormat: "Y-m-d", disableMobile: true }}
                                    inputClass="form-control"
                                  />
                                </td>
                                <td>
                                  <SpkFlatpickr
                                    value={ins.payment_date || ""}
                                    onfunChange={(dates: Date[]) =>
                                      updateInstallmentField(enr.id, ins.id, "payment_date", dates[0]?.toISOString().split('T')[0] || '')
                                    }
                                    options={{ dateFormat: "Y-m-d", disableMobile: true }}
                                    inputClass="form-control"
                                  />
                                </td>
                                <td>
                                  <Form.Select
                                    value={"" /* eğer “payment_method_id” yoksa boş */}
                                    onChange={() => {
                                      // updateInstallmentField(enr.id, ins.id, "payment_method_id", e.target.value);
                                    }}
                                  >
                                    <option value="">Seçiniz</option>
                                    {paymentMethods.map((pm) => (
                                      <option key={pm.id} value={pm.id}>
                                        {pm.name}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </td>
                                <td>
                                  <Form.Check
                                    type="checkbox"
                                    checked={ins.is_paid === 1}
                                    onChange={(e) =>
                                      updateInstallmentField(
                                        enr.id,
                                        ins.id,
                                        "is_paid",
                                        e.target.checked ? 1 : 0
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    className="me-1"
                                    onClick={() => handleUpdateInstallment(enr.id, ins)}
                                  >
                                    Kaydet
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteInstallment(enr.id, ins.id)}
                                  >
                                    Sil
                                  </Button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Accordion.Body>
                )}
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}

      <div className="d-flex justify-content-between mt-3">
        <Button variant="outline-secondary" onClick={onPrev}>
          Geri
        </Button>
        <Button variant="outline-secondary" onClick={handleSaveAndNext}>
          Kaydet ve İlerle
        </Button>
      </div>
    </div>
  );
};

export default CreateInstallmentStep3;

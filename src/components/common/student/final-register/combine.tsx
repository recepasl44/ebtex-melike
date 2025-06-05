import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Button,
  Form,
  Spinner,
  Card,
  InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { Stepper, Step, StepButton } from "@mui/material";

import ReusableModalForm from "../../ReusableModalForm";
import { useStep1Fields } from "./step1/step1_fields";
import CreateEnrollmentStep2, {
  ISelectedService,
} from "./step2/create_enrollment";
import CreateInstallmentStep3 from "./step3/create_installment"; // <-- Step3 bileşeni
import CreateInstallmentStep4 from "./step4/create_aggrement"; // <-- Step3 bileşeni
import Pageheader from "../../../page-header/pageheader";

// Hooks
import { useListStudents } from "../../../hooks/student/useList";
import { useAddStudent } from "../../../hooks/student/useAddStudent";
import { useStep1 } from "../../../hooks/student/useStep1";

// Types
import { IStudent } from "../../../../types/student/list";
import { PaymentMethod } from "../../../../types/paymentMethods/list";

/**
 * API’den dönen IStudent objesini, Step1 form initialValues’a dönüştürür.
 * (form doldurma için pre-fill)
 */
function mapApiStudentToFormValues(apiStudent: IStudent) {
   const address = {
    address: apiStudent.address?.address || "",
    country_id: apiStudent.address?.country_id || "",
    city_id: apiStudent.address?.city_id || "",
    county_id: apiStudent.address?.county_id || "",
    district_id: apiStudent.address?.district_id || "",
  };

  return {
    id: apiStudent.id,
    step:"1",
        register_date: apiStudent.register_date
      ? apiStudent.register_date.split(" ")[0]
      : new Date().toISOString().split("T")[0],
    branche_id: apiStudent.branche_id || 0,
    season_id: apiStudent.season_id || 0,
    register_no: "",
    student_no: "",
    identification_no: apiStudent.identification_no || "",
    first_name: apiStudent.first_name || "",
    last_name: apiStudent.last_name || "",
    birthday: apiStudent.birthday ? apiStudent.birthday.split(" ")[0] : "",
    phone: apiStudent.phone || "",
    mobile_phone: apiStudent.mobile_phone || "",
    email: apiStudent.email || "",
    by_register: "",
    school_id: apiStudent.school_id || 0,
    school_name: apiStudent.school_name || "",
    schooltype_id: "",
    gender_id: apiStudent.gender_id || 0,
    program_id: apiStudent.program_id || 0,
    level_id: apiStudent.level_id || 0,
    course_id: apiStudent.course_id || 0,
    // Örnek “level_name” => ek alan
    level_name: apiStudent.level?.name || "",
    // Adres
    address,
    // Özel bilgiler
    financial_status: apiStudent.financial_status || "",
    blood_group: "",
    illnesses: "",
    special_info: "",
    notes: "",
    // Aile vb.
    fatherAlive: true,
    fatherIsGuardian: false,
    fatherName: "",
    fatherTc: "",
    fatherMobile: "",
    fatherJob: "",
    fatherHomeTel: "",
    fatherWorkTel: "",
    fatherAddress: "",
    fatherWorkAddress: "",
    fatherBirthdate: "",
    fatherWorkplace: "",
    fatherEmail: "",
    fatherMarriage: "",
    motherAlive: true,
    motherIsGuardian: false,
    motherName: "",
    motherTc: "",
    motherMobile: "",
    motherJob: "",
    motherHomeTel: "",
    motherWorkTel: "",
    motherAddress: "",
    motherWorkAddress: "",
    motherBirthdate: "",
    motherWorkplace: "",
    motherEmail: "",
    motherMarriage: "",
    isSeparateGuardian: false,
    guardianName: "",
    guardianRelation: "",
    guardianTc: "",
    guardianMobile: "",
    guardianJob: "",
    guardianHomeTel: "",
    guardianWorkTel: "",
    guardianAddress: "",
    guardianWorkAddress: "",
    guardianBirthdate: "",
    guardianWorkplace: "",
    guardianEmail: "",
  };
}

const FinalRegisterCombine: React.FC = () => {
  // STEPPER
  const steps = [
    "Öğrenci Bilgisi",
    "Hizmet Seçimi",
    "Taksit Düzenleme",
    "Sözleşme",
  ];
  const [activeStep, setActiveStep] = useState<number>(0);
  const stepKeys = ["step1", "step2", "step3", "step4"] as const;
  const [activeKey, setActiveKey] =
    useState<(typeof stepKeys)[number]>("step1");
  const [paymentMethods] = useState<PaymentMethod[]>([]);
  // TCKN Modal
  const [showTcModal, setShowTcModal] = useState(true);
  const [tcInput, setTcInput] = useState("");
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [errorCheck, setErrorCheck] = useState<string | null>(null);
  const [preCheckResults, setPreCheckResults] = useState<IStudent[]>([]);
  const [selectedServices, setSelectedServices] = useState<ISelectedService[]>(
    []
  );
  const [enrollments, _setEnrollments] = useState<any[]>([]);

  // STEP1 => Student State (formik initialValues)
  const [studentFormData, setStudentFormData] = useState<any>({
    id: undefined,
    branche_id: 1,
    season_id: 2,
    register_no: "",

    identification_no: "",
    first_name: "",
    last_name: "",
    birthday: "",
    phone: "",
    gender_id: 0,
    mobile_phone: "",
    email: "",
    by_register: "",
    school_id: 0,
    schooltype_id: "",
    advisor_teacher: "",
    class_teacher: "",
    school_name: "",
    address: {
      address: "",
      country_id: "",
      city_id: "",
      county_id: "",
      district_id: "",
    },
    // ...
  });
const [selectedBranchId, setSelectedBranchId] = useState<number>(
    0
  );

  // Step1 => Loading, Error
  const [loadingStep1, setLoadingStep1] = useState(false);
  const [errorStep1, setErrorStep1] = useState<string | null>(null);

  // Hooks
  const { saveStep1 } = useStep1(); // update => PUT /students/:id
  const { createStudent } = useAddStudent(); // create => POST /students

  // TCKN Arama
  const [listEnabled, setListEnabled] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    data: studentList,
    loading: listLoading,
    error: listError,
  } = useListStudents({
    enabled: listEnabled,
    page: 1,
    pageSize: 25,
    identification_no: filter,
  });
  const step1Fields = useStep1Fields(
    selectedBranchId,
    (id: number) => setSelectedBranchId(id)
  );
  // TCKN Kontrol
  const handleTcknCheck = async () => {
    try {
      setLoadingCheck(true);
      setErrorCheck(null);

      if (!tcInput || tcInput.length < 11) {
        throw new Error("Lütfen geçerli bir TCKN giriniz (11 haneli).");
      }
      setFilter(tcInput);
      setListEnabled(true);
    } catch (err: any) {
      setErrorCheck(err.message);
    } finally {
      setLoadingCheck(false);
    }
  };

  // List students result
  useEffect(() => {
    if (!listEnabled) return;
    if (listLoading) return;
    if (listError) {
      setErrorCheck(String(listError));
      return;
    }

    const foundArray = studentList || [];
    if (foundArray.length === 0) {
      // Yeni kayıt
      toast.info("Bu TCKN ile kayıt bulunamadı, yeni kayıt açabilirsiniz.");
      setStudentFormData((prev: any) => ({
        ...prev,
        identification_no: tcInput,
      }));
      setShowTcModal(false);
    } else if (foundArray.length === 1) {
      // Tek kayıt
      const found = foundArray[0];
      toast.success(`Öğrenci bulundu: ${found.first_name} ${found.last_name}`);
      const mapped = mapApiStudentToFormValues(found);
      setStudentFormData(mapped);
       setSelectedBranchId(mapped.branche_id || 0);

      setShowTcModal(false);
    } else {
      // Birden fazla
      setPreCheckResults(foundArray);
    }
  }, [listEnabled, listLoading, studentList, listError]);

  const handleSelectStudentFromList = useCallback(
    (st: IStudent) => {
      const mapped = mapApiStudentToFormValues(st);
      setStudentFormData(mapped);
      setSelectedBranchId(mapped.branche_id || 0);
      setShowTcModal(false);
    },
    []
  );
  // Stepper yardımları
  const goToStep = (idx: number) => {
    setActiveStep(idx);
    setActiveKey(stepKeys[idx]);
  };
  const handleStepAttempt = (targetIndex: number) => {
    if (targetIndex < activeStep) {
      return goToStep(targetIndex);
    }
    if (targetIndex > activeStep + 1) {
      toast.error("Lütfen adımları sırayla tamamlayın.");
      return;
    }
    goToStep(targetIndex);
  };

  /**
   * STEP1 Submit => create (POST) veya update (PUT).
   * Boş alanlar => partial update
   */
  const handleSubmitStep1 = async (values: any, helpers: any) => {
    setLoadingStep1(true);
    setErrorStep1(null);

    try {
            const guardian: any = {};

      if (values.fatherIsGuardian) {
        guardian["1"] = {
          is_alive: values.fatherAlive ? 1 : 0,
          is_parent: 1,
          is_divorced: values.isSeparateGuardian ? 1 : 0,
          kinship_id: 1,
          kinship: null,
          identification_no: values.fatherTc,
          full_name: values.fatherName,
          phone: values.fatherMobile,
          profession: values.fatherJob,
          home_phone: values.fatherHomeTel,
          work_phone: values.fatherWorkTel,
          address: values.fatherAddress,
          work_address: values.fatherWorkAddress,
          birthday: values.fatherBirthdate,
          workplace: values.fatherWorkplace,
          email: values.fatherEmail,
          wedding_anniversary: values.fatherMarriage,
        };
      }

      if (values.motherIsGuardian) {
        guardian["0"] = {
          is_alive: values.motherAlive ? 1 : 0,
          is_parent: 1,
          is_divorced: values.isSeparateGuardian ? 1 : 0,
          kinship_id: 0,
          kinship: null,
          identification_no: values.motherTc,
          full_name: values.motherName,
          phone: values.motherMobile,
          profession: values.motherJob,
          home_phone: values.motherHomeTel,
          work_phone: values.motherWorkTel,
          address: values.motherAddress,
          work_address: values.motherWorkAddress,
          birthday: values.motherBirthdate,
          workplace: values.motherWorkplace,
          email: values.motherEmail,
          wedding_anniversary: values.motherMarriage,
        };
      }

      if (!values.fatherIsGuardian && !values.motherIsGuardian) {
        guardian["2"] = {
          is_alive: 1,
          is_parent: 1,
          is_divorced: values.isSeparateGuardian ? 1 : 0,
          kinship_id: 2,
          kinship: values.guardianRelation,
          identification_no: values.guardianTc,
          full_name: values.guardianName,
          phone: values.guardianMobile,
          profession: values.guardianJob,
          home_phone: values.guardianHomeTel,
          work_phone: values.guardianWorkTel,
          address: values.guardianAddress,
          work_address: values.guardianWorkAddress,
          birthday: values.guardianBirthdate,
          workplace: values.guardianWorkplace,
          email: values.guardianEmail,
          wedding_anniversary: "",
        };
      }

      const payload = { ...values, guardian };
      Object.keys(payload).forEach((key) => {
        const startsWithGuardian = key.startsWith("guardian") && key !== "guardian";
        if (key.startsWith("father") || key.startsWith("mother") || startsWithGuardian || key  === "isSeparateGuardian") {
          delete (payload as any)[key];
        }
      });
      // 2) Boş ("" veya null) olan key’leri payload’tan sil => partial update
      for (const key in payload) {
           if ((payload as any)[key] === "" || (payload as any)[key] == null) {
          delete (payload as any)[key];
        }
      }

      // 3) ID yok => POST /students
      if (!payload.id) {
        const resp = await createStudent(payload);
        if (!resp) throw new Error("Yeni öğrenci eklenemedi!");
        toast.success("Yeni öğrenci kaydedildi.");

        if (resp.data?.id) {
          setStudentFormData({ ...values, id: resp.data.id });
        }
        goToStep(1);
      } else {
        // 4) ID varsa => PUT /students/:id
        const resp = await saveStep1(payload, payload.id);
        if (!resp) throw new Error("Güncelleme hatası!");
        toast.success("Öğrenci bilgileri güncellendi.");
        goToStep(1);
      }
    } catch (err: any) {
      toast.error(err.message);
      setErrorStep1(err.message);
    } finally {
      helpers.setSubmitting(false);
      setLoadingStep1(false);
    }
  };

  return (
    <div className="px-4">
      <Pageheader title="Öğrenci Yönetimi" currentpage="Kesin Kayıt" />
      {/* TCKN Kontrol Modal */}
      {isClient && (
        <Modal
          show={showTcModal}
          backdrop="static"
          keyboard={false}
          onHide={() => {
            setShowTcModal(false);
          }}
          style={{ marginTop: "4rem" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>T.C. Kimlik Kontrol</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="d-flex align-items-center gap-2 mb-3">
              <Form.Label
                className="mb-0"
                style={{ width: 120, textAlign: "left", marginRight: 8 }}
              >
                T.C. Kimlik No
              </Form.Label>

              <InputGroup>
                <Form.Control
                  style={{
                    border: "1px solid rgb(var(--border-color-rgb))",
                  }}
                  type="text"
                  placeholder="TCKN"
                  value={tcInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                    setTcInput(val);
                  }}
                />
                <InputGroup.Text
                  onClick={handleTcknCheck}
                  style={{
                    cursor: "pointer",
                    border: "1px solid rgb(var(--border-color-rgb))",
                  }}
                >
                  {loadingCheck || listLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <i className="bi bi-search"></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {errorCheck && (
              <div className="text-danger mt-1 mb-3">{errorCheck}</div>
            )}

            {preCheckResults.length > 0 ? (
              <div className="mt-3">
                <h6>Bu T.C. ile kayıtlı öğrenciler:</h6>
                <ul
                  className="list-group"
                  style={{ maxHeight: 200, overflowY: "auto" }}
                >
                  {preCheckResults.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>
                          {item.first_name} {item.last_name}
                        </strong>
                        <br />
                        <small>
                          ID: {item.id} {item.email ? `• ${item.email}` : ""}
                        </small>
                      </div>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleSelectStudentFromList(item)}
                      >
                        Seç
                      </Button>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      toast.info("Yeni kayıt açabilirsiniz.");
                      setStudentFormData((prev: any) => ({
                        ...prev,
                        identification_no: tcInput,
                      }));
                      setShowTcModal(false);
                    }}
                  >
                    Yeni Kayıt
                  </Button>
                </div>
              </div>
            ) : null}
          </Modal.Body>
        </Modal>
      )}

      {/* STEP Wizard */}
      {!showTcModal && (
        <Card className="mt-4">
          <Card.Body>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, idx) => (
                <Step key={idx}>
                  <StepButton onClick={() => handleStepAttempt(idx)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>

            {/* STEP1 => Öğrenci Formu */}
            {activeKey === "step1" && (
              <div className="mt-4">
                <ReusableModalForm
                  show={false}
                  fields={step1Fields}
                  initialValues={studentFormData}
                  onSubmit={handleSubmitStep1}
                  isLoading={loadingStep1}
                  error={errorStep1}
                  onClose={() => {}}
                  hideButtons={false}
                  confirmButtonLabel="Kaydet ve İlerle"
                  cancelButtonLabel="Vazgeç"
                  mode="single"
                />
              </div>
            )}

            {/* STEP2 => Hizmet Seçimi */}

            {/* STEP2 */}
            {activeKey === "step2" && (
              <CreateEnrollmentStep2
                branche_id={studentFormData.branche_id}
                studentId={studentFormData.id}
                level_id={studentFormData.level_id}
                program_id={studentFormData.program_id}
                course_id={studentFormData.course_id}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                onPrev={() => goToStep(0)}
                onNext={() => goToStep(2)}
              />
            )}

            {/* STEP3 => Taksit Düzenleme */}
            {activeKey === "step3" && (
              <CreateInstallmentStep3
                studentId={studentFormData.id}
                enrollments={enrollments}
                paymentMethods={paymentMethods}
                onPrev={() => goToStep(1)}
                onNext={() => goToStep(3)}
              />
            )}

            {/* STEP4 => Sözleşme */}
            {activeKey === "step4" && (
              <CreateInstallmentStep4
                studentId={studentFormData.id}
                onPrev={() => goToStep(1)}
                onNext={() => goToStep(3)}
                enrollmentIds={enrollments}
              />
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default FinalRegisterCombine;

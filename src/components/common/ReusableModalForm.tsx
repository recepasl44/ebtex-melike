import React from "react";
import { Modal, Button, Row, Col, Form as BsForm } from "react-bootstrap";
import { Formik, Form, Field, FormikValues, FormikHelpers } from "formik";
import * as Yup from "yup";
import { NumericFormat, PatternFormat } from "react-number-format";
import SpkFlatpickr from "../../@spk-reusable-components/reusable-plugins/spk-flatpicker";
import { useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import CreatableSelect from "react-select/creatable";
import darkcontrol from "../../utils/darkmodecontroller";

/** MUI Stepper - Örnekte paylaştığınız haliyle */
import { Stepper, Step, StepButton } from "@mui/material";

export interface FieldDefinition {
  name: string;
  label?: string;
  placeholder?: string;
  type?:
  | "text"
  | "number"
  | "date"
  | "time"
  | "checkbox"
  | "doubledate"
  | "select"
  | "currency"
  | "togglebar"
  | "email"
  | "phone"
  | "multiselect"
  | "textarea"
  | "iban"
  | "autocomplete"
  | "file"
  | "placeholder"
  | "heading"
  | "checkbox-group";
  autoFocus?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  col?: number;
  row?: number;
  min?: number;
  disabled?: boolean;
  max?: number;
  multi?: boolean;
  pattern?: RegExp;
  options?: { label: string; value: any }[];
  dependencyKey?: string;
  renderForm?: (formik: any) => JSX.Element;
  onChange?: (value: any, formik: any) => void;
  onClick?: (value: any, formik: any) => void;
  onFocus?: (formik: any) => void;
  onInputChange?: (text: string, formik: any) => void;
  plus?: string;
  buttonText?: string; // Buton metni özelliği eklendi

  enableReinitialize?: boolean;
  buttonVoid?: () => void; // Buton özelliği eklendi
}

/** Gelen field'lar için Yup şemasını otomatik oluşturur. */
function buildYupSchemaFromFields(fields: FieldDefinition[]) {
  const shape: Record<string, Yup.AnySchema> = {};

  fields.forEach((f) => {
    let schema: Yup.AnySchema;

    if (f.type === "file") {
      // Dosya alanına tip: mixed()
      schema = Yup.mixed();
    } else if (f.type === "checkbox" || f.type === "togglebar") {
      schema = Yup.boolean();
    } else if (f.type === "date") {
      schema = Yup.date().typeError("Geçerli bir tarih giriniz.");
    } else if (f.type === "number" || f.type === "currency") {
      schema = Yup.number().typeError("Sayısal bir değer giriniz.");
    } else if (f.type === "email") {
      schema = Yup.string().email("Geçerli bir email giriniz.");
    } else if (f.type === "phone") {
      if (!f.pattern) f.pattern = /^0\d{10}$/;
      schema = Yup.string().transform((_, originalValue) =>
        originalValue.replace(/\D/g, "")
      );
    } else if (f.type === "iban") {
      if (!f.pattern) f.pattern = /^[A-Z]{2}[0-9]{24}$/;
      schema = Yup.string().transform((_, originalValue) =>
        (originalValue || "").replace(/\s/g, "").toUpperCase()
      );
    } else {
      schema = Yup.string();
    }

    // Çoklu seçim alanı (multiselect)
    if (f.type === "multiselect") {
      const arrSchema = Yup.array().of(Yup.string());
      shape[f.name] = f.required
        ? arrSchema.min(1, "En az 1 seçim yapın")
        : arrSchema;
      return;
    }

    // Zorunlu mu?
    if (f.required) {
      schema = schema.required("Zorunlu alan");
    }

    // Pattern
    if (
      f.pattern &&
      !["checkbox", "togglebar", "number", "currency"].includes(f.type || "")
    ) {
      schema = (schema as Yup.StringSchema).matches(
        f.pattern,
        "Geçerli format değil"
      );
    }

    // Min/max length
    if (
      f.minLength &&
      !["checkbox", "togglebar", "number", "currency"].includes(f.type || "")
    ) {
      schema = (schema as Yup.StringSchema).min(
        f.minLength,
        `En az ${f.minLength} karakter`
      );
    }
    if (
      f.maxLength &&
      !["checkbox", "togglebar", "number", "currency"].includes(f.type || "")
    ) {
      schema = (schema as Yup.StringSchema).max(
        f.maxLength,
        `En fazla ${f.maxLength} karakter`
      );
    }

    // Number/currency min-max
    if (f.type === "number" || f.type === "currency") {
      if (typeof f.min === "number") {
        schema = (schema as Yup.NumberSchema).min(f.min, `En az ${f.min}`);
      }
      if (typeof f.max === "number") {
        schema = (schema as Yup.NumberSchema).max(f.max, `En fazla ${f.max}`);
      }
    }

    shape[f.name] = schema;
  });

  return Yup.object().shape(shape);
}

interface ReusableModalFormProps<T extends FormikValues> {
  show: boolean;
  title?: string;
  fields: FieldDefinition[] | ((values: T) => FieldDefinition[]);
  initialValues: T;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  isLoading?: boolean;
  error?: string | null;
  onClose: () => void;
  autoGoBackOnModalClose?: boolean;
  hideButtons?: boolean;
  mode?: "single" | "double";
  autoFocus?: boolean;
  /** Stepper (Opsiyonel) */
  showStepper?: boolean;
  steps?: string[];
  buttonVoid?: () => void; // Buton özelliği eklendi

  buttonText?: string; // Buton metni özelliği eklendi

  children?: React.ReactNode;
  activeStep?: number;
  handleStepAttempt?: (targetIndex: number) => void;
  /** Modal boyutu (lg varsayılan) */
  modalSize?: "sm" | "lg" | "xl";
}

/** Elemanları satır bazında gruplamak için helper */
function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  const tmp = [...arr];
  while (tmp.length) {
    result.push(tmp.splice(0, size));
  }
  return result;
}

export default function ReusableModalForm<T extends FormikValues>({
  show,
  title = "",
  fields,
  initialValues,
  onSubmit,
  confirmButtonLabel = "Kaydet",
  cancelButtonLabel = "Vazgeç",
  isLoading = false,
  error,
  onClose,
  autoGoBackOnModalClose = false,
  hideButtons = false,
  mode = "double",
  buttonVoid,
  /** Stepper */
  showStepper = false,
  steps = [],
  activeStep = 0,
  buttonText,
  handleStepAttempt,
  modalSize = "lg",
}: ReusableModalFormProps<T>) {
  const navigate = useNavigate();

  function handleClose() {
    if (autoGoBackOnModalClose) {
      navigate(-1);
    } else {
      onClose();
    }
  }

  function buildValidationSchema() {
    if (typeof fields === "function") {
      return buildYupSchemaFromFields(fields(initialValues));
    }
    return buildYupSchemaFromFields(fields);
  }

  const chunkSize = mode === "single" ? 1 : 2;

  if (show) {
    return (
      <Modal show={true} onHide={handleClose} centered size={modalSize}>
        {/** OPSİYONEL STEPPER */}
        {showStepper && steps.length > 0 && (
          <div className="p-3">
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, idx) => (
                <Step key={idx}>
                  <StepButton onClick={() => handleStepAttempt?.(idx)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={buildValidationSchema()}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => {
            const computedFields =
              typeof fields === "function" ? fields(formik.values) : fields;
            const fieldChunks = chunkArray(computedFields, chunkSize);

            return (
              <Form>
                <Modal.Header closeButton>
                  <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                {isLoading && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "95vw",
                      height: "100vh",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      zIndex: 9999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Yükleniyor...</span>
                    </div>
                  </div>
                )}

                <Modal.Body>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {fieldChunks.map((row, idx) => (
                    <Row key={idx}>
                      {row.map((fieldDef) => {
                        // col sayısı
                        const span =
                          fieldDef.col ?? (mode === "single" ? 12 : 6);
                        return (
                          <Col md={span} key={fieldDef.name}>
                            {renderField(fieldDef, formik, navigate)}
                          </Col>
                        );
                      })}
                    </Row>
                  ))}
                  {children}
                </Modal.Body>
                {!hideButtons && (
                  <Modal.Footer>
                    <div className="me-auto">
                      {buttonVoid && (
                        <Button
                          variant="outline-secondary"
                          onClick={buttonVoid}
                          disabled={isLoading}
                        >
                          {buttonText}
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="outline-secondary"
                      onClick={handleClose}
                      disabled={isLoading}
                    >
                      {cancelButtonLabel}
                    </Button>

                    <Button
                      variant="outline-primary"
                      type="submit"
                      disabled={isLoading || !formik.isValid}
                    >
                      {isLoading ? "İşlem yapılıyor..." : confirmButtonLabel}
                    </Button>
                  </Modal.Footer>
                )}
              </Form>
            );
          }}
        </Formik>
      </Modal>
    );
  } else {
    // Modal görünmüyorken fallback plain form
    return (
      <div>
        {/** OPSİYONEL STEPPER */}
        {showStepper && steps.length > 0 && (
          <div className="p-3">
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, idx) => (
                <Step key={idx}>
                  <StepButton onClick={() => handleStepAttempt?.(idx)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={buildValidationSchema()}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => {
            const computedFields =
              typeof fields === "function" ? fields(formik.values) : fields;
            const fieldChunks = chunkArray(computedFields, chunkSize);

            return (
              <Form>
                <h3>{title}</h3>

                {isLoading && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      zIndex: 9999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Yükleniyor...</span>
                    </div>
                  </div>
                )}

                {error && <div className="alert alert-danger">{error}</div>}

                  {fieldChunks.map((row, idx) => (
                    <Row key={idx}>
                      {row.map((fieldDef) => {
                        const span = fieldDef.col ?? (mode === "single" ? 12 : 6);
                        return (
                          <Col md={span} key={fieldDef.name}>
                            {renderField(fieldDef, formik, navigate)}
                          </Col>
                        );
                      })}
                    </Row>
                  ))}
                  {children}

                  {!hideButtons && (
                  <div className="mt-3 d-flex justify-content-end">
                    <Button
                      variant="outline-secondary"
                      onClick={onClose}
                      disabled={isLoading}
                    >
                      {cancelButtonLabel}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      type="submit"
                      disabled={isLoading || !formik.isValid}
                      className="ms-2"
                    >
                      {isLoading ? "İşlem yapılıyor..." : confirmButtonLabel}
                    </Button>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

/** Form alanlarını (FieldDefinition) ekrana basan yardımcı fonksiyon */
export function renderField(
  f: FieldDefinition,
  formik: any,
  navigate: (path: string) => void
) {
  const hasError = formik.touched[f.name] && formik.errors[f.name];
  const labelColor =
    darkcontrol.dataThemeMode === "dark"
      ? "#e9ecef"
      : "rgb(var(--text-color-rgb))";
  const labelWidth = 120;
  const groupClasses = "d-flex align-items-center";
  const labelStyle: React.CSSProperties = {
    width: labelWidth,
    textAlign: "left",
    marginBottom: 0,
    color: labelColor,
    lineHeight: "1rem",
  };
  const inputWrapperStyle: React.CSSProperties = { flex: 1 };

  // 1) Eğer özel bir renderForm fonksiyonu varsa
  if (f.renderForm) {
    const hasLabel = !!f.label;
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        {hasLabel && (
          <BsForm.Label style={labelStyle}>
            {f.label}
            {f.required && <span style={{ color: "red" }}>*</span>}
            {hasError && (
              <div className="text-danger" style={{ fontSize: 12 }}>
                {String(formik.errors[f.name])}
              </div>
            )}
          </BsForm.Label>
        )}
        <div style={inputWrapperStyle}>{f.renderForm(formik)}</div>
      </BsForm.Group>
    );
  }

  // 2) Checkbox
  if (f.type === "checkbox") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>
        <div style={{ marginLeft: 8, display: "flex", alignItems: "center" }}>
          <Field name={f.name}>
            {({ field }: { field: any }) => (
              <input
                type="checkbox"
                checked={field.value || false}
                onChange={(e) => {
                  const checked = e.target.checked;
                  // 1) Formik değerini güncelle
                  formik.setFieldValue(f.name, checked);
                  // 2) Eğer varsa onChange callback’ini çağır
                  f.onChange?.(checked, formik);
                }}
                style={{ width: 15, height: 15, cursor: "pointer" }}
              />
            )}
          </Field>
        </div>
      </BsForm.Group>
    );
  }

  // 2.5) Checkbox group (checkbox-group)
  if (f.type === "checkbox-group") {
    return (
      <BsForm.Group key={f.name} className="mb-3">
        {f.label && (
          <BsForm.Label style={{ ...labelStyle }}>
            {f.label}
            {f.required && <span style={{ color: "red" }}>*</span>}
            {hasError && (
              <div className="text-danger" style={{ fontSize: 12 }}>
                {String(formik.errors[f.name])}
              </div>
            )}
          </BsForm.Label>
        )}

        <div
          className="d-flex flex-wrap gap-3"
          style={{ marginLeft: f.label ? 8 : 0 }}
        >
          {f.options?.map((option) => {
            // Her bir checkbox için tam field adını oluştur: "guardian.status.isAlive" gibi
            const fieldName = `${f.name}.${option.value}`;

            return (
              <div key={option.value} className="form-check me-3">
                <Field name={fieldName}>
                  {({ field }: { field: any }) => (
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        id={`${f.name}-${option.value}`}
                        checked={field.value || false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          // Formik değerini güncelle
                          formik.setFieldValue(fieldName, checked);
                          // Eğer varsa onChange callback'ini çağır
                          f.onChange?.(
                            {
                              ...formik.values[f.name],
                              [option.value]: checked,
                            },
                            formik
                          );
                        }}
                        className="form-check-input me-2"
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`${f.name}-${option.value}`}
                      >
                        {option.label}
                      </label>
                    </div>
                  )}
                </Field>
              </div>
            );
          })}
        </div>
      </BsForm.Group>
    );
  }

  // 3) "doubledate" => Tarih aralığı (range)
  if (f.type === "doubledate") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>

        <div style={inputWrapperStyle}>
          <Field name={f.name}>
            {({ field, form }: any) => {
              const s = field.value?.startDate;
              const e = field.value?.endDate;
              const fpValue = s && e ? [new Date(s), new Date(e)] : undefined;

              return (
                <SpkFlatpickr
                  value={fpValue}
                  options={{
                    mode: "range",
                    dateFormat: "Y-m-d",
                    allowInput: false,
                  }}
                  inputClass="form-control"
                  placeholder="Tarih aralığı seçiniz"
                  onfunChange={(dates: Date[]) => {
                    if (!dates || dates.length === 0) {
                      form.setFieldValue(f.name, {
                        startDate: "",
                        endDate: "",
                      });
                      if (f.onChange)
                        f.onChange({ startDate: "", endDate: "" }, form);
                    } else if (dates.length === 2) {
                      const start = dates[0].toISOString().slice(0, 10);
                      const end = dates[1].toISOString().slice(0, 10);
                      form.setFieldValue(f.name, {
                        startDate: start,
                        endDate: end,
                      });
                      if (f.onChange)
                        f.onChange({ startDate: start, endDate: end }, form);
                    }
                  }}
                />
              );
            }}
          </Field>
        </div>
      </BsForm.Group>
    );
  }

  // 4) "multiselect" => Çoklu seçim
  if (f.type === "multiselect") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>

        <div style={inputWrapperStyle}>
          <Field name={f.name}>
            {({ field, form }: { field: any; form: any }) => {
              const options =
                f.options?.map((o) =>
                  typeof o === "string"
                    ? { value: o, label: o }
                    : { value: o.value, label: o.label }
                ) || [];

              const value = Array.isArray(field.value)
                ? field.value.map((v: string) => ({ value: v, label: v }))
                : [];

              return (
                <CreatableSelect
                  isMulti
                  classNamePrefix="react-select"
                  placeholder={f.label}
                  value={value}
                  options={options}
                  onChange={(sel) =>
                    form.setFieldValue(
                      f.name,
                      Array.isArray(sel) ? sel.map((o) => o.value) : []
                    )
                  }
                  styles={{
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#212529",
                      zIndex: 9999,
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#5c67f7"
                        : state.isSelected
                          ? "#343a40"
                          : "transparent",
                      color: "#fff",
                    }),
                    multiValue: (b) => ({ ...b, backgroundColor: "#343a40" }),
                    multiValueLabel: (b) => ({ ...b, color: "#fff" }),
                    control: (b, s) => ({
                      ...b,
                      backgroundColor: "transparent",
                      boxShadow: s.isFocused
                        ? "0 0 0 0.05rem rgba(130,138,145,.25)"
                        : "none",
                    }),
                    input: (b) => ({ ...b, color: "#fff" }),
                    singleValue: (b) => ({ ...b, color: "#fff" }),
                  }}
                />
              );
            }}
          </Field>
        </div>
      </BsForm.Group>
    );
  }

  // 5) Togglebar (switch)
  if (f.type === "togglebar") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>
        <div style={inputWrapperStyle}>
          <Field name={f.name}>
            {({ field }: { field: any }) => (
              <BsForm.Check
                type="switch"
                id={f.name}
                checked={field.value || false}
                onChange={(e) => formik.setFieldValue(f.name, e.target.checked)}
                label=""
              />
            )}
          </Field>
        </div>
      </BsForm.Group>
    );
  }

  // 6) File input
  if (f.type === "file") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>
        <div style={inputWrapperStyle}>
          <Field name={f.name}>
            {({ form }: { form: any }) => (
              <>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0] || null;
                    form.setFieldValue(f.name, file);
                  }}
                />
                {formik.values[f.name] &&
                  typeof formik.values[f.name] === "object" && (
                    <p style={{ marginTop: 4 }}>
                      {(formik.values[f.name] as File).name}
                    </p>
                  )}
              </>
            )}
          </Field>
        </div>
      </BsForm.Group>
    );
  }

  // 7) Tarih inputu
  if (f.type === "date") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>
        <div style={inputWrapperStyle}>
          <Field name={f.name}>
            {({ field, form }: { field: any; form: any }) => (
              <SpkFlatpickr
                value={field.value || ""}
                onfunChange={(dates: Date[]) => {
                  if (!dates || !dates.length) {
                    form.setFieldValue(f.name, "");
                    return;
                  }
                  const iso = dates[0].toISOString().split("T")[0];
                  form.setFieldValue(f.name, iso);
                }}
                options={{ dateFormat: "Y-m-d" }}
                inputClass="form-control"
                placeholder={f.placeholder || ""}
              />
            )}
          </Field>
        </div>
      </BsForm.Group>
    );
  }
  if (f.type === "autocomplete") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>

        <div style={inputWrapperStyle}>
          <Field name={f.name}>
            {({ field, form }: { field: any; form: any }) => (
              <Typeahead
                id={`typeahead-${f.name}`}
                labelKey="label" // "label" property’sini kullanıcıya göster
                options={f.options || []}
                placeholder={f.placeholder || ""}
                // Kullanıcı klavyede yazdıkça tetiklenir (API çağrısını burada yapabilirsiniz)
                onInputChange={(text) => {
                  // Formik değeri vs. anlık güncellemek istiyorsanız:
                  // form.setFieldValue(f.name, ""); // opsiyonel

                  // Sizin "enableSchoolSearch" / "schoolSearchTerm" logiciniz
                  if (f.onInputChange) {
                    f.onInputChange(text, form);
                  }
                }}
                // Kullanıcı listeden bir öğe seçtiğinde
                onChange={(selected) => {
                  // "selected" => genelde [ { label, value }, ... ] (tek seçimde 1 eleman)
                  if (selected.length > 0) {
                    const sel = selected[0] as { label: string; value: any };
                    // Formik state => okul ID tutmak istediğinizi varsayıyoruz
                    form.setFieldValue(f.name, sel.value);

                    // Ek olarak fieldDefinition onChange
                    if (f.onChange) {
                      f.onChange(sel.value, form);
                    }
                  } else {
                    // Seçim temizlendiyse
                    form.setFieldValue(f.name, "");
                  }
                }}
                // "selected" => mevcut formik değerine (ID’ye) uyan item
                selected={(f.options || []).filter(
                  (opt) => opt.value === field.value
                )}
              />
            )}
          </Field>
        </div>
      </BsForm.Group>
    );
  }

  // 8) Time input
  if (f.type === "time") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>
        <div style={inputWrapperStyle}>
          <Field name={f.name}>
            {({ field, form }: { field: any; form: any }) => (
              <input
                type="time"
                className="form-control"
                value={field.value || ""}
                onChange={(e) => form.setFieldValue(f.name, e.target.value)}
              />
            )}
          </Field>
        </div>
      </BsForm.Group>
    );
  }

  // 9) currency
  if (f.type === "currency") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>
        <div style={inputWrapperStyle}>
          <Field name={f.name}>
            {({ field, form }: { field: any; form: any }) => (
              <NumericFormat
                className="form-control"
                allowNegative={false}
                decimalSeparator=","
                thousandSeparator="."
                suffix=" ₺"
                decimalScale={2}
                fixedDecimalScale
                value={field.value || ""}
                onValueChange={(vals) => {
                  form.setFieldValue(f.name, vals.floatValue ?? 0);
                }}
              />
            )}
          </Field>
        </div>
      </BsForm.Group>
    );
  }

  // 10) select
  if (f.type === "select") {
    if (f.plus) {
      return (
        <BsForm.Group
          key={f.name}
          className={groupClasses}
          style={{ minHeight: 50 }}
        >
          <BsForm.Label style={labelStyle}>
            {f.label}
            {f.required && <span style={{ color: "red" }}>*</span>}
            {hasError && (
              <div className="text-danger" style={{ fontSize: 12 }}>
                {String(formik.errors[f.name])}
              </div>
            )}
          </BsForm.Label>
          <div style={inputWrapperStyle}>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flexBasis: "100%", minWidth: 0 }}>
                <Field
                  as="select"
                  name={f.name}
                  className="form-select"
                  style={{ width: "100%" }}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    if (f.onChange) {
                      f.onChange(e.target.value, formik);
                    } else {
                      formik.handleChange(e);
                    }
                  }}
                  onClick={(e: React.MouseEvent<HTMLSelectElement>) => {
                    if (f.onClick) {
                      f.onClick((e.target as HTMLSelectElement).value, formik);
                    }
                  }}
                  onFocus={() => {
                    if (f.onFocus) {
                      f.onFocus(formik);
                    }
                  }}
                >
                  <option value="">Seçiniz</option>
                  {f.options?.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Field>
              </div>
              <Button
                variant="outline-secondary"
                onClick={() => navigate(f.plus!)}
                style={{ marginLeft: 8 }}
              >
                <i className="ti ti-plus" />
              </Button>
            </div>
          </div>
        </BsForm.Group>
      );
    } else {
      return (
        <BsForm.Group
          key={f.name}
          className={groupClasses}
          style={{ minHeight: 50 }}
        >
          <BsForm.Label style={labelStyle}>
            {f.label}
            {f.required && <span style={{ color: "red" }}>*</span>}
            {hasError && (
              <div className="text-danger" style={{ fontSize: 12 }}>
                {String(formik.errors[f.name])}
              </div>
            )}
          </BsForm.Label>
          <div style={inputWrapperStyle}>
            <Field
              as="select"
              name={f.name}
              className="form-select"
              style={{ width: "100%" }}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                if (f.onChange) {
                  f.onChange(e.target.value, formik);
                } else {
                  formik.handleChange(e);
                }
              }}
              onClick={(e: React.MouseEvent<HTMLSelectElement>) => {
                if (f.onClick) {
                  f.onClick((e.target as HTMLSelectElement).value, formik);
                }
              }}
              onFocus={() => {
                if (f.onFocus) {
                  f.onFocus(formik);
                }
              }}
            >
              <option value="">Seçiniz</option>
              {f.options?.map((opt, i) => (
                <option key={i} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Field>
          </div>
        </BsForm.Group>
      );
    }
  }

  // 11) email
  if (f.type === "email") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>
        <div style={inputWrapperStyle}>
          <Field
            as="input"
            type="email"
            name={f.name}
            className="form-control"
            placeholder={f.placeholder || ""}
          />
        </div>
      </BsForm.Group>
    );
  }

  // 12) phone
  if (f.type === "phone") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>
        <div style={inputWrapperStyle}>
          <Field name={f.name}>
            {({ field, form }: { field: any; form: any }) => (
              <PatternFormat
                className="form-control"
                format="0 (###) ### ## ##"
                mask="_"
                allowEmptyFormatting
                value={field.value || ""}
                onValueChange={(vals: any) => {
                  form.setFieldValue(f.name, vals.formattedValue);
                }}
                onBlur={formik.handleBlur}
                name={f.name}
              />
            )}
          </Field>
        </div>
      </BsForm.Group>
    );
  }

  // 13) iban
  if (f.type === "iban") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{ minHeight: 50 }}
      >
        <BsForm.Label style={labelStyle}>
          {f.label}
          {f.required && <span style={{ color: "red" }}>*</span>}
          {hasError && (
            <div className="text-danger" style={{ fontSize: 12 }}>
              {String(formik.errors[f.name])}
            </div>
          )}
        </BsForm.Label>
        <div style={inputWrapperStyle}>
          <Field name={f.name}>
            {({ field, form }: { field: any; form: any }) => (
              <PatternFormat
                className="form-control"
                format="TR## #### #### #### #### ######"
                mask="_"
                allowEmptyFormatting={false}
                placeholder="IBAN"
                value={field.value || ""}
                onValueChange={(vals: any) => {
                  const raw = vals.formattedValue
                    .replace(/\s/g, "")
                    .toUpperCase();
                  form.setFieldValue(f.name, raw);
                }}
                onBlur={formik.handleBlur}
                name={f.name}
              />
            )}
          </Field>
        </div>
      </BsForm.Group>
    );
  }

  // 14) heading
  if (f.type === "heading") {
    return (
      <BsForm.Group
        key={f.name}
        className={groupClasses}
        style={{
          minHeight: 50,
        }}
      >
        <div style={{ marginTop: 10 }}>
          <h6>{f.label}</h6>
        </div>
      </BsForm.Group>
    );
  }

  // 15) default => text / textarea
  return (
    <BsForm.Group
      key={f.name}
      className={groupClasses}
      style={{ minHeight: 50 }}
    >
      <BsForm.Label style={labelStyle}>
        {f.label}
        {f.required && <span style={{ color: "red" }}>*</span>}
        {hasError && (
          <div className="text-danger" style={{ fontSize: 12 }}>
            {String(formik.errors[f.name])}
          </div>
        )}
      </BsForm.Label>
      <div style={inputWrapperStyle}>
        <Field
          as={f.type === "textarea" ? "textarea" : "input"}
          type={f.type === "textarea" ? undefined : f.type}
          name={f.name}
          className="form-control"
          disabled={f.disabled}
          placeholder={f.placeholder || ""}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            formik.handleChange(e);
            if (f.onChange) {
              f.onChange(e.target.value, formik);
            }
          }}
        />
      </div>
    </BsForm.Group>
  );
}

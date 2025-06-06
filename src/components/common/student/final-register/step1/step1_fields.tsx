import { Row, Col, Card } from "react-bootstrap";
import { FieldDefinition, renderField } from "../../../ReusableModalForm";

import { useStudentFields } from "./student_information";
import { useSchoolFields } from "./school_information";
import { useAddressFields } from "./address_information";
import { getSpecialFields } from "./special_information";
import { getFatherFields } from "./father_information";
import { getMotherFields } from "./mother_information";
import { getGuardianFields } from "./guardion_information";

export function useStep1Fields(
  branchId: number = 0,
  onBranchChange?: (branchId: number) => void
): FieldDefinition[] {
  const sFields = useStudentFields(onBranchChange);
  const oFields = useSchoolFields(branchId);
  const aFields = useAddressFields();
  const spFields = getSpecialFields();
  const fFields = getFatherFields();
  const mFields = getMotherFields();
  const gFields = getGuardianFields();

  const hiddenFields: FieldDefinition[] = [
    ...sFields,
    ...oFields,
    ...aFields,
    ...spFields,
    ...fFields,
    ...mFields,
    ...gFields,
  ].map((f) => ({ ...f, hidden: true }));

  return [
      ...hiddenFields,
    {
      name: "customStep1Layout",
      type: "text",
      renderForm: (formik) => {
     

        return (
          <>
            <Row>
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Header>
                    <h5>Öğrenci Bilgileri</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {sFields.map((sf) => (
                        <Col md={sf.col ?? 6} key={sf.name}>
                          {renderField(sf, formik, () => {})}
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Header>
                    <h5>Okul Bilgileri</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {oFields.map((of) => (
                        <Col md={of.col ?? 6} key={of.name}>
                          {renderField(of, formik, () => {})}
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Header>
                    <h5>Adres Bilgileri</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {aFields.map((af) => (
                        <Col md={af.col ?? 6} key={af.name}>
                          {renderField(af, formik, () => {})}
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Header>
                    <h5>Özel Bilgiler</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {spFields.map((sf) => (
                        <Col md={sf.col ?? 6} key={sf.name}>
                          {renderField(sf, formik, () => {})}
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card.Header>
              <h5>Aile Bilgisi</h5>
            </Card.Header>
            <Row className="mt-2">
              <Col md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Row>
                      {fFields.map((f) => (
                        <Col md={f.col ?? 6} key={f.name}>
                          {renderField(f, formik, () => {})}
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Row>
                      {mFields.map((m) => (
                        <Col md={m.col ?? 6} key={m.name}>
                          {renderField(m, formik, () => {})}
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Row>
                      {gFields.map((g) => (
                        <Col md={g.col ?? 6} key={g.name}>
                          {renderField(g, formik, () => {})}
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];
}

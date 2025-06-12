import { FieldDefinition, renderField } from "../../../ReusableModalForm";
import { getAddressFields } from "./addressFields";
import { getStudentAndSchoolFields } from "./studentAndSchoolFields";
import { getGuardianFields } from "./guardianFields";
import { Col, Row } from "react-bootstrap";

export function getPreRegisterFields(): FieldDefinition[] {
  return [
    {
      name: "customPreRegisterLayout",
      type: "text",
      renderForm: (formik) => {
        const adressFields = getAddressFields();
        const studentAndSchoolFields = getStudentAndSchoolFields();
        const guardianFields = getGuardianFields();

        return (
          <>
            <Row>
              <Col md={6}>
                {studentAndSchoolFields.map((sf) => (
                  <Col md={sf.col ?? 12} key={sf.name}>
                    {renderField(sf, formik, () => {})}
                  </Col>
                ))}
              </Col>
              <Col md={6}>
                {adressFields.map((af) => (
                  <Col md={af.col ?? 12} key={af.name}>
                    {renderField(af, formik, () => {})}
                  </Col>
                ))}
                {guardianFields.map((gf) => (
                  <Col md={gf.col ?? 12} key={gf.name}>
                    {renderField(gf, formik, () => {})}
                  </Col>
                ))}
              </Col>
            </Row>
          </>
        );
      },
    },
  ];
}

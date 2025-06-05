import { FieldDefinition, renderField } from "../../../../../ReusableModalForm";
import { getStudentFields } from "./information_field";
import { Row, Col } from "react-bootstrap";

export function getStep1Fields(): FieldDefinition[] {
  return [
    {
      name: "customStep1Layout",
      type: "text",
      renderForm: (formik) => {
        const sFields = getStudentFields();

        return (
          <>
            <Row>
              <Col md={12}>
                <Row>
                  {sFields.map((sf) => (
                    <Col md={sf.col ?? 6} key={sf.name}>
                      {renderField(sf, formik, () => {})}
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];
}

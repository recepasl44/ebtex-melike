import { Row, Col } from "react-bootstrap";
import { getMeetingFields } from "./meeting_infformation_fields";
import { FieldDefinition, renderField } from "../../../../../ReusableModalForm";

export function getStep8Fields(): FieldDefinition[] {
  return [
    {
      name: "customStep1Layout",
      type: "text",
      renderForm: (formik) => {
        const sFields = getMeetingFields();

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

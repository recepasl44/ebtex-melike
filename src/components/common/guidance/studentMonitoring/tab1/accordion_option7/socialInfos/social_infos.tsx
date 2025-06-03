import { Row, Col } from "react-bootstrap";
import { getSocialFields } from "./social_information_fields";
import { FieldDefinition, renderField } from "../../../../../ReusableModalForm";

export function getStep7Fields(): FieldDefinition[] {
  return [
    {
      name: "customStep1Layout",
      type: "text",
      renderForm: (formik) => {
        const sFields = getSocialFields();

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

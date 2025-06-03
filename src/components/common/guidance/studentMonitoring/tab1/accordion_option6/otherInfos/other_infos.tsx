import { Row, Col } from "react-bootstrap";
import { getOtherFields } from "./other_infformation_field";
import { FieldDefinition, renderField } from "../../../../../ReusableModalForm";

export function getStep6Fields(): FieldDefinition[] {
  return [
    {
      name: "customStep1Layout",
      type: "text",
      renderForm: (formik) => {
        const sFields = getOtherFields();

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

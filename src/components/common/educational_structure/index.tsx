import { Row, Col, Card } from "react-bootstrap";
import SchoolTypeTable from "./school_types/table";
import SchoolLevelTable from "./school_level/table";
import ClassLevelTable from "./class_level/table";
import TrackTable from "./track/table";
import { useState } from "react";

export default function CombinedPage() {
  const [selectedSchoolTypeId, setSelectedSchoolTypeId] = useState<number>();

  const [selectedSchoolLevelId, setSelectedSchoolLevelId] = useState<number>();

  const [selectedSchoolClassId, setSelectedSchoolClassId] = useState<number>();

  const [enabled, setEnabled] = useState(false);
  return (
    <div>
      <Row>
        <Col md={3}>
          <Card>
            <h5>Okul Türleri</h5>
            <SchoolTypeTable
              onSelectSchoolType={(schoolType) => {
                setSelectedSchoolTypeId(schoolType.id);
                setEnabled(true);
              }}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <h5>Okul Seviyesi</h5>
            <SchoolLevelTable
              schoolTypeId={selectedSchoolTypeId}
              enabled={enabled}
              onSelectSchoolLevel={(schoolLevel) => {
                setSelectedSchoolLevelId(schoolLevel.id);
                setEnabled(true);
              }}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <h5>Sınıf Seviyesi</h5>
            <ClassLevelTable
              schoolLevelId={selectedSchoolLevelId}
              enabled={enabled}
              onSelectClassLevel={(classLevel) => {
                setSelectedSchoolClassId(classLevel.id);
                setEnabled(true);
              }}
            />
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <h5>Alan</h5>
            <TrackTable
              schoolClassId={selectedSchoolClassId}
              enabled={enabled}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

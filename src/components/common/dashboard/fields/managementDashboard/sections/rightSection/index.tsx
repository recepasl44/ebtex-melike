import React from "react";
import { Row } from "react-bootstrap";
import { DailyBulletin, NumberOfMaleAndFemaleStudent } from "../../../../type.ts";
import MaleandfemaleStudentsCountChart from "../../../../components/MaleandfemaleStudentsCountChart.tsx";
import InfoBoxRow from "../../../../components/InfoBoxRow.tsx";
import DailyAttendanceRow from "../../../../components/DailyAttendanceRow.tsx";
import CurrentBulletin from "../../../../components/CurrentBulletin.tsx";





interface RightSectionProps {
  isDark: boolean;
  attendanceData: any[];
  daily_bulletins:DailyBulletin[];
  maleandfemaleStudentsCount:NumberOfMaleAndFemaleStudent[];
}

const RightSection: React.FC<RightSectionProps> = ({ isDark, attendanceData ,daily_bulletins,maleandfemaleStudentsCount}) => {
  return (
    <Row>
      <InfoBoxRow isDark={isDark} />
      <DailyAttendanceRow attendanceData={attendanceData} />
      <CurrentBulletin
        daily_bulletins={daily_bulletins} />
      <MaleandfemaleStudentsCountChart maleandfemaleStudentsCount={maleandfemaleStudentsCount} />
    </Row>
  );
};

export default RightSection;

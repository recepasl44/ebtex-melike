import React from "react";
import { Row } from "react-bootstrap";
import InfoBoxRow from "./InfoBoxRow";
import DailyAttendanceRow from "./DailyAttendanceRow";
import { DailyBulletin, NumberOfMaleAndFemaleStudent } from "../../../../../type";
import CurrentBulletin from "./CurrentBulletin";
import MaleandfemaleStudentsCountChart from "../leftSection/MaleandfemaleStudentsCountChart";





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

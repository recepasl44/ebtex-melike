import React from "react";
import {Col} from "react-bootstrap";
import WeeklyFoodMenuRow from "./WeeklyFoodMenuRow";
import {  ExamCountdownItem, NumberOfInternalAndExternalRecordsByMonth, PollTypeDistribution } from "../../../../../type";
import DistributionofPollingTypeChart from "./DistributionofPollingTypeChart";
import Calendar from "../Calendar";
import ExamCountdown from "./ExamCountdown";

interface WeeklyFoodAndAttendanceProps {
    weeklyFoodsMenu: any;
    Number_of_internal_and_external_records_by_month:NumberOfInternalAndExternalRecordsByMonth;
    attendanceTypeDistribution: PollTypeDistribution;
    examCountdown: ExamCountdownItem[];
}

const WeeklyFoodAndAttendance: React.FC<WeeklyFoodAndAttendanceProps> = ({
                                                                             weeklyFoodsMenu,
                                                                              attendanceTypeDistribution,
                                                                                examCountdown,
                                                                         }) => {
    return (
        <Col xxl={6} xl={6}>
            <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu}/>

            {/* Yoklama türü dağılımı */}
            <DistributionofPollingTypeChart data={attendanceTypeDistribution} />
            {/* Sınav geri Sayımı */}
            <ExamCountdown examCountdown={examCountdown} />
            {/* Takvim */}
            <Calendar />

            {/* Günlük Ders Programı */}
        </Col>
    );
};

export default WeeklyFoodAndAttendance;

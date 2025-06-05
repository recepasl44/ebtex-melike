import React from "react";
import {Col} from "react-bootstrap";
import {  ExamCountdownItem, NumberOfInternalAndExternalRecordsByMonth, PollTypeDistribution } from "../type.ts";
import DistributionofPollingTypeChart from "./DistributionofPollingTypeChart.tsx";
import WeeklyFoodMenuRow from "./WeeklyFoodMenuRow.tsx";
import ExamCountdown from "./ExamCountdown.tsx";
import Calendar from "./Calendar.tsx";


interface WeeklyFoodAndAttendanceProps {
    weeklyFoodsMenu: any;
    Number_of_internal_and_external_records_by_month:NumberOfInternalAndExternalRecordsByMonth;
    attendanceTypeDistribution: PollTypeDistribution;
    examCountdown: ExamCountdownItem[];
}

const WeeklyFoodAndAttendanceee: React.FC<WeeklyFoodAndAttendanceProps> = ({
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

export default WeeklyFoodAndAttendanceee;

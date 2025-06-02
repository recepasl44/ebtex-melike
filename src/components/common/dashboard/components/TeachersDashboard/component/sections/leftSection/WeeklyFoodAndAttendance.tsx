import React from "react";
import {Col} from "react-bootstrap";
import WeeklyFoodMenuRow from "./WeeklyFoodMenuRow";
import { DailyClassSchedule, NumberOfInternalAndExternalRecordsByMonth, NumberOfMaleAndFemaleStudent } from "../../../../../type";
import DailyCourseScheduleTable from "./DailyCourseScheduleTable";
import MaleandfemaleStudentsCountChart from "./MaleandfemaleStudentsCountChart";

interface WeeklyFoodAndAttendanceProps {
    weeklyFoodsMenu: any;
    Number_of_internal_and_external_records_by_month:NumberOfInternalAndExternalRecordsByMonth;
    dailyCourseSchedule: DailyClassSchedule[];
    maleandfemaleStudentsCount: NumberOfMaleAndFemaleStudent[];
}

const WeeklyFoodAndAttendance: React.FC<WeeklyFoodAndAttendanceProps> = ({
                                                                             weeklyFoodsMenu,
                                                                            dailyCourseSchedule,
                                                                            maleandfemaleStudentsCount,

                                                                         }) => {
    return (
        <Col xxl={6} xl={6}>
            <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu}/>

            {/* Ödev Durumu Analizi */}
                <MaleandfemaleStudentsCountChart maleandfemaleStudentsCount={maleandfemaleStudentsCount} />
                   {/* günlük ders calıssma programı  */}
        <DailyCourseScheduleTable data={dailyCourseSchedule} />
       
        </Col>
    );
};

export default WeeklyFoodAndAttendance;

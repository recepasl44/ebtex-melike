import React from "react";
import {Col} from "react-bootstrap";
import { DailyClassSchedule, NumberOfInternalAndExternalRecordsByMonth, NumberOfMaleAndFemaleStudent } from "../type.ts";
import MaleandfemaleStudentsCountChart from "./MaleandfemaleStudentsCountChart.tsx";
import WeeklyFoodMenuRow from "./WeeklyFoodMenuRow.tsx";


interface WeeklyFoodAndAttendanceProps {
    weeklyFoodsMenu: any;
    Number_of_internal_and_external_records_by_month:NumberOfInternalAndExternalRecordsByMonth;
    dailyCourseSchedule: DailyClassSchedule[];
    maleandfemaleStudentsCount: NumberOfMaleAndFemaleStudent[];
}

const WeeklyFoodAndAttendancedd: React.FC<WeeklyFoodAndAttendanceProps> = ({
                                                                             weeklyFoodsMenu,
                                                                            maleandfemaleStudentsCount,

                                                                         }) => {
    return (
        <Col xxl={6} xl={6}>
            <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu}/>

            {/* Ödev Durumu Analizi */}
                <MaleandfemaleStudentsCountChart maleandfemaleStudentsCount={maleandfemaleStudentsCount} />

        </Col>
    );
};

export default WeeklyFoodAndAttendancedd;

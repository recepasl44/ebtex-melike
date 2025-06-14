import React from "react";
import {Col} from "react-bootstrap";
import { DailyClassSchedule, HomeworkStatusAnalysis, NumberOfInternalAndExternalRecordsByMonth } from "../type.ts";
import WeeklyFoodMenuRow from "./WeeklyFoodMenuRow.tsx";
import HomeworkStatusAnalysisChart from "./HomeworkStatusAnalysisChart.tsx";
import DailyCourseScheduleTable from "./DailyCourseScheduleTable.tsx";
import Calendar from "./Calendar.tsx";

interface WeeklyFoodAndAttendanceProps {
    weeklyFoodsMenu: any;
    Number_of_internal_and_external_records_by_month:NumberOfInternalAndExternalRecordsByMonth;
homeworkStatusAnalysis: HomeworkStatusAnalysis;
    dailyCourseSchedule: DailyClassSchedule[];
}

const WeeklyFoodAndAttendances: React.FC<WeeklyFoodAndAttendanceProps> = ({
                                                                             weeklyFoodsMenu,
                                                                            homeworkStatusAnalysis,
                                                                            dailyCourseSchedule,
                                                                         }) => {
    return (
        <Col xxl={6} xl={6}>

            <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu}/>

            {/* Ödev Durumu Analizi */}
                <HomeworkStatusAnalysisChart homeworkStatusAnalysis={homeworkStatusAnalysis}/>
                   {/* günlük ders calıssma programı  */}
        <DailyCourseScheduleTable data={dailyCourseSchedule} />
        <Calendar />

        </Col>
    );
};

export default WeeklyFoodAndAttendances;

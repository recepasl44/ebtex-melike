import React from "react";
import {Col} from "react-bootstrap";
import WeeklyFoodMenuRow from "./WeeklyFoodMenuRow";
import { DailyClassSchedule, HomeworkStatusAnalysis, NumberOfInternalAndExternalRecordsByMonth } from "../../../../../type";
import HomeworkStatusAnalysisChart from "./HomeworkStatusAnalysisChart";
import DailyCourseScheduleTable from "./DailyCourseScheduleTable";

interface WeeklyFoodAndAttendanceProps {
    weeklyFoodsMenu: any;
    Number_of_internal_and_external_records_by_month:NumberOfInternalAndExternalRecordsByMonth;
homeworkStatusAnalysis: HomeworkStatusAnalysis;
    dailyCourseSchedule: DailyClassSchedule[];
}

const WeeklyFoodAndAttendance: React.FC<WeeklyFoodAndAttendanceProps> = ({
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
       
        </Col>
    );
};

export default WeeklyFoodAndAttendance;

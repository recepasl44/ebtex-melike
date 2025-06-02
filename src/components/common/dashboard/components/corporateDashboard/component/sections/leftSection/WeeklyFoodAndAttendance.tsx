import React from "react";
import {Col} from "react-bootstrap";
import WeeklyFoodMenuRow from "./WeeklyFoodMenuRow";
import InternalExternalRecordByMonth from "./InternalExternalRecordByMonth";
import { HomeworkStatusAnalysis, NumberOfInternalAndExternalRecordsByMonth } from "../../../../../type";
import HomeworkStatusAnalysisChart from "./HomeworkStatusAnalysisChart";

interface WeeklyFoodAndAttendanceProps {
    weeklyFoodsMenu: any;
    Number_of_internal_and_external_records_by_month:NumberOfInternalAndExternalRecordsByMonth;
homeworkStatusAnalysis: HomeworkStatusAnalysis;
}

const WeeklyFoodAndAttendance: React.FC<WeeklyFoodAndAttendanceProps> = ({
                                                                             weeklyFoodsMenu,
                                                                            homeworkStatusAnalysis,
                                                                              Number_of_internal_and_external_records_by_month
                                                                         }) => {
    return (
        <Col xxl={4} xl={4}>
            <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu}/>

            {/* Ödev Durumu Analizi */}
                <HomeworkStatusAnalysisChart homeworkStatusAnalysis={homeworkStatusAnalysis}/>
                   {/* İç ve Dış Kayıtların Aylık Dağılımı */}
            <InternalExternalRecordByMonth
             Number_of_internal_and_external_records_by_monthData={Number_of_internal_and_external_records_by_month}
              />
        </Col>
    );
};

export default WeeklyFoodAndAttendance;

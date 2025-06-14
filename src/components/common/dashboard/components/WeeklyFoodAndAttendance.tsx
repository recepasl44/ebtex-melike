import React from "react";
import {Col} from "react-bootstrap";
import WeeklyFoodMenuRow from "./WeeklyFoodMenuRow.tsx";
import DailyAttendanceMonitoring from "./DailyAttendanceMonitoring.tsx";
import InternalExternalRecordByMonth from "./InternalExternalRecordByMonth.tsx";
import { NumberOfInternalAndExternalRecordsByMonth } from "../type.ts";

interface WeeklyFoodAndAttendanceProps {
    weeklyFoodsMenu: any;
    dailyAttendanceData: {
        class?: number;
        lesson_learned?: number;
        lesson_not_learned?: number;
    };
    Number_of_internal_and_external_records_by_month:NumberOfInternalAndExternalRecordsByMonth;
    

}

const WeeklyFoodAndAttendance: React.FC<WeeklyFoodAndAttendanceProps> = ({
                                                                             weeklyFoodsMenu,
                                                                             dailyAttendanceData,
                                                                              Number_of_internal_and_external_records_by_month
                                                                         }) => {
    return (
        <Col xxl={4} xl={4}>
            <WeeklyFoodMenuRow weeklyFoodsMenu={weeklyFoodsMenu}/>

            {/* Günlük Devam Verisi */}
            <DailyAttendanceMonitoring dailyAttendanceData={dailyAttendanceData}/>

                   {/* İç ve Dış Kayıtların Aylık Dağılımı */}
            <InternalExternalRecordByMonth
             Number_of_internal_and_external_records_by_monthData={Number_of_internal_and_external_records_by_month}
              />
        </Col>
    );
};

export default WeeklyFoodAndAttendance;

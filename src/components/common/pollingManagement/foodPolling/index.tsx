/* src/components/common/pollingManagement/clupPolling/index.tsx */
import React, { useState } from 'react';
import TabsContainer from '../class-course/component/organisms/TabsContainer';

/* Sekme içerikleri – daha önce oluşturduğunuz sayfalar */
import FoodAttendanceTable from './pages/foodPolling/table';
import FoodGroupPlanTable from './pages/groupPlan/table';
import FoodOfficerListTable from './pages/officerList/table';
import FoodPollingCountsTable from './pages/pollingCount/table';
import Pageheader from "../../../page-header/pageheader";

/* -------------------------------------------------------------- */
const ClupPollingManagementPage: React.FC = () => {
    /* aktif sekme index’i */
    const [activeIdx, setActiveIdx] = useState<number>(0);

    /* sekme başlıkları ve içerikleri */
    const tabs = [
        {
            label: 'Grup Planla',
            content: <FoodGroupPlanTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Görevli Listesi',
            content: <FoodOfficerListTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Yemek Yoklama',
            content: <FoodAttendanceTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Yoklama Sayıları',
            content: <FoodPollingCountsTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (
        <div className="px-4">
            <Pageheader title="Yoklama Yönetimi" currentpage="Yemek Yoklama" />

            <TabsContainer
                tabs={tabs}
                selectedIndex={activeIdx}
                onTabChange={(idx) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default ClupPollingManagementPage;

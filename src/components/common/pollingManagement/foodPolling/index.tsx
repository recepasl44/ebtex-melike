/* src/components/common/pollingManagement/clupPolling/index.tsx */
import React, { useState } from 'react';
import TabsContainer from '../class-course/component/organisms/TabsContainer';

/* Sekme içerikleri – daha önce oluşturduğunuz sayfalar */
import FoodAttendanceTable from './pages/foodPolling/table';
import FoodGroupPlanTable from './pages/groupPlan/table';
import FoodOfficerListTable from './pages/officerList/table';
import FoodPollingCountsTable from './pages/pollingCount/table';

/* -------------------------------------------------------------- */
const ClupPollingManagementPage: React.FC = () => {
    /* aktif sekme index’i */
    const [activeIdx, setActiveIdx] = useState<number>(0);

    /* sekme başlıkları ve içerikleri */
    const tabs = [
        { label: 'Grup Planla', content: <FoodGroupPlanTable /> },
        { label: 'Görevli Listesi', content: <FoodOfficerListTable /> },
        { label: 'Yemek Yoklama', content: <FoodAttendanceTable /> },
        { label: 'Yoklama Sayıları', content: <FoodPollingCountsTable /> },
    ];

    return (
        <div className="px-4">
            <h4>Yemek Yoklama</h4>

            <TabsContainer
                tabs={tabs}
                selectedIndex={activeIdx}
                onTabChange={(idx) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default ClupPollingManagementPage;

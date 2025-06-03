/* components/common/pollingManagement/class-course/index.tsx */
import React, { useState } from 'react';
import TabsContainer from './component/organisms/TabsContainer';

/* --- sekme içerikleri --------------------------------------------------- */
import ExecutiveStatusTable from './pages/executiveStatus/table';
import PollingListTable from './pages/pollingList/table';
import PollingCountsTable from './pages/pollingCounts/table';
import Pageheader from '../../../page-header/pageheader';



const PollingManagementPage: React.FC = () => {
    /* aktif sekme index’i */
    const [activeIdx, setActiveIdx] = useState<number>(0);

    /* sekme başlıkları ve içerikleri */
    const tabsConfig = [
        {
            label: 'Yönetici Durum',
            content: <ExecutiveStatusTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Yoklama Listesi',
            content: <PollingListTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Yoklama Sayıları',
            content: <PollingCountsTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },

    ];

    return (
        <div className="px-4">
            <Pageheader title="Yoklama Yönetimi" currentpage="Sınıf & Ders" />

            <TabsContainer
                tabs={tabsConfig}
                selectedIndex={activeIdx}
                onTabChange={(idx: number) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default PollingManagementPage;

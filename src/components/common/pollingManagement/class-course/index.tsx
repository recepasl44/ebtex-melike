/* components/common/pollingManagement/class-course/index.tsx */
import React, { useState } from 'react';
import TabsContainer from './component/organisms/TabsContainer';

/* --- sekme içerikleri --------------------------------------------------- */
import ExecutiveStatusTable from './pages/executiveStatus/table';
import PollingListTable from './pages/pollingList/table';
import PollingCountsTable from './pages/pollingCounts/table';

/* ------------------------------------------------------------------------ */
const PollingManagementPage: React.FC = () => {
    /* aktif sekme index’i */
    const [activeIdx, setActiveIdx] = useState<number>(0);

    /* sekme başlıkları ve içerikleri */
    const tabsConfig = [
        { label: 'Yönetici Durum', content: <ExecutiveStatusTable /> },
        { label: 'Yoklama Listesi', content: <PollingListTable /> },
        { label: 'Yoklama Sayıları', content: <PollingCountsTable /> },
    ];

    return (
        <div className="px-4">
            <h3>Sınıf &amp; Ders</h3>

            <TabsContainer
                tabs={tabsConfig}
                selectedIndex={activeIdx}
                onTabChange={(idx: number) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default PollingManagementPage;

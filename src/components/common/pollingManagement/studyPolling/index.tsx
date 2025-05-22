/* -------------------------------------------------------------------------- */
/* src/components/common/pollingManagement/studyPolling/index.tsx            */
/* -------------------------------------------------------------------------- */

import React, { useState } from 'react';
import TabsContainer from '../studyPolling/components/organisms/TabsContainers'

/* —— tab contents —— */
import StudyPlanTable from './pages/studyPlan/table';
import StudyProgramTable from './pages/studyProgram/table';
import StudyPollingTable from './pages/studyPolling/table';
import PollingCountTable from './pages/pollingCount/table';

/* ========================================================================== */
const StudyPollingPage: React.FC = () => {
    /* active-tab state */
    const [activeIdx, setActiveIdx] = useState<number>(0);

    /* tabs: label + React element to render */
    const tabsConfig = [
        { label: 'Etüt Planla', content: <StudyPlanTable /> },
        { label: 'Etüt Programı', content: <StudyProgramTable /> },
        { label: 'Etüt Yoklama', content: <StudyPollingTable /> },
        { label: 'Yoklama Sayıları', content: <PollingCountTable /> },
    ];

    return (
        <div className="px-4">
            <h3>Etüt Yoklama</h3>

            <TabsContainer
                tabs={tabsConfig}
                selectedIndex={activeIdx}
                onTabChange={(idx: number) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default StudyPollingPage;

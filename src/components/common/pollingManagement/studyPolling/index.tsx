

import React, { useState } from 'react';
import TabsContainer from './components/organisms/TabsContainers'

/* —— tab contents —— */
import StudyPlanTable from './pages/studyPlan/table';
import StudyProgramTable from './pages/studyProgram/table';
import StudyPollingTable from './pages/studyPolling/table';
import PollingCountTable from './pages/pollingCount/table';
import Pageheader from "../../../page-header/pageheader";

const StudyPollingPage: React.FC = () => {
    /* active-tab state */
    const [, setActiveIdx] = useState<number>(0);

    /* tabs: label + React element to render */
    const tabsConfig = [
        {
            label: 'Etüt Planla',
            content: <StudyPlanTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Etüt Programı',
            content: <StudyProgramTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Etüt Yoklama',
            content: <StudyPollingTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Yoklama Sayıları',
            content: <PollingCountTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (
        <div className="px-4">
            <Pageheader title="Yoklama Yönetimi" currentpage="Etüt Yoklama" />

            <TabsContainer
                tabs={tabsConfig}
                // selectedIndex={activeIdx}
                onTabChange={(idx: number) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default StudyPollingPage;

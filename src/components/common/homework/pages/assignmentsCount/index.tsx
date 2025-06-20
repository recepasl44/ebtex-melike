import React, { useState } from 'react';
import TabsContainer from '../../components/organisms/TabsContainer';

import GivenHomeworkCount from './assigned/table';
import PlannedHomeworkCount from './planned/table';
import CompletedHomeworkCount from './resolved/table';

const AssignmentsCountPage: React.FC = () => {
    const [, setSelectedTab] = useState(0);

    const tabsConfig = [

        {
            label: 'Planlanan Ödevler',
            content: <PlannedHomeworkCount />,
            activeBgColor: '#9E5CF7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#9E5CF726',
            passiveTextColor: '#9E5CF7',
        },
        {
            label: 'Verilen Ödevler',
            content: <GivenHomeworkCount />,
            activeBgColor: '#9E5CF7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#9E5CF726',
            passiveTextColor: '#9E5CF7',
        },
        {
            label: 'Tamamlanan Ödevler',
            content: <CompletedHomeworkCount />,
            activeBgColor: '#9E5CF7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#9E5CF726',
            passiveTextColor: '#9E5CF7',
        },
    ];

    return (
        <div >
            <TabsContainer
                tabs={tabsConfig}
                onTabChange={(parentIdx) => setSelectedTab(parentIdx)}
            />
        </div>
    );
};

export default AssignmentsCountPage;


import React, { useState } from 'react';
import TabsContainer from '../../components/organisms/TabsContainer';


import GivenHomeworkCount from './assigned/table';
import PlannedHomeworkCount from './planned/table';
import CompletedHomeworkCount from './resolved/table';

const AssignmentsCountPage: React.FC = () => {

    const [, setSelectedTab] = useState(0);

    const tabsConfig = [
        {
            label: 'Verilen Ödevler',
            content: <GivenHomeworkCount />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Planlanan Ödevler',
            content: <PlannedHomeworkCount />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Tamamlanan Ödevler',
            content: <CompletedHomeworkCount />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (
        <div className="px-4">


            <TabsContainer
                tabs={tabsConfig}

                onTabChange={(parentIdx) => setSelectedTab(parentIdx)}
            />
        </div>
    );
};

export default AssignmentsCountPage;

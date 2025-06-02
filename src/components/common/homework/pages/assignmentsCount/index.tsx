
import React, { useState } from 'react';
import TabsContainer from '../../components/organisms/TabsContainer';


import GivenHomeworkCount from './assigned/table';
import PlannedHomeworkCount from './planned/table';
import CompletedHomeworkCount from './resolved/table';

const AssignmentsCountPage: React.FC = () => {

    const [selectedTab, setSelectedTab] = useState(0);

    const tabsConfig = [
        { label: 'Verilen Ödevler', content: <GivenHomeworkCount /> },
        { label: 'Planlanan Ödevler', content: <PlannedHomeworkCount /> },
        { label: 'Tamamlanan Ödevler', content: <CompletedHomeworkCount /> },
    ];

    return (
        <div className="px-4">


            <TabsContainer
                tabs={tabsConfig}
                selectedIndex={selectedTab}
                onTabChange={(parentIdx) => setSelectedTab(parentIdx)}
            />
        </div>
    );
};

export default AssignmentsCountPage;

/* components/common/homework/index.tsx */
import React, { useState } from 'react';
import TabsContainer from './components/organisms/TabsContainer';

import PlannedAssignmentsTable from './pages/plannedAssignments/table';
import DefiningHomeworkPage from './pages/assignmentsDefinition/table';
import AssignmentsCheckTable from './pages/assignmentsCheck/table';
import AssignmentsListTable from './pages/assignmentsList/table';
import AssignmentsCountPage from './pages/assignmentsCount';

const HomeworkTrackingPage: React.FC = () => {
    const [activeIdx, setActiveIdx] = useState(0);

    const tabsConfig = [
        {
            label: 'Planlanan Ödevler',
            content: <PlannedAssignmentsTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Ödev Tanımlama',
            content: <DefiningHomeworkPage />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Ödev Kontrolü',
            content: <AssignmentsCheckTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Ödev Listesi',
            content: <AssignmentsListTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Ödev Sayıları',
            content: <AssignmentsCountPage />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (
        <div className="px-4">
            <h5>Ödev Takip</h5>

            <TabsContainer
                tabs={tabsConfig}
                selectedIndex={activeIdx}
                onTabChange={(parent) => setActiveIdx(parent)}
            />
        </div>
    );
};

export default HomeworkTrackingPage;

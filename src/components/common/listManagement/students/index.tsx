import React, { useState } from 'react';
import TabsContainer from './component/organisms/TabsContainer';
import ClassListTable from './pages/classList/table';
import Pageheader from '../../../page-header/pageheader';

const StudentListManagementPage: React.FC = () => {
    const [activeIdx, setActiveIdx] = useState<number>(0);

    const tabs = [
        {
            label: 'Sınıf Listesi',
            content: <ClassListTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (
        <div className="px-4">
            <Pageheader title="Liste Yönetimi" currentpage="Öğrenciler" />
            <TabsContainer tabs={tabs} onTabChange={setActiveIdx} />
        </div>
    );
};

export default StudentListManagementPage;

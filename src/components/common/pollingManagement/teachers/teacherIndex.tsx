/* components/common/pollingManagement/class-course/index.tsx */
import React, { useState } from 'react';
import TabsContainer from './component/organisms/TabsContainer';

import TeachersTable from './pages/teachers/table';
import TeachersPollingTable from './pages/teachersPolling/table';
import LessonPollingTable from './pages/lesson/table';
import Pageheader from "../../../page-header/pageheader";



const TeacherPollingManagementPage: React.FC = () => {
    /* aktif sekme index’i */
    const [activeIdx, setActiveIdx] = useState<number>(0);

    /* sekme başlıkları ve içerikleri */
    const tabsConfig = [
        {
            label: 'Öğretmen Yoklama Listesi',
            content: <TeachersTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Öğretmen Nöbet  Yoklama Listesi',
            content: <TeachersPollingTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Ders Yoklama',
            content: <LessonPollingTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (
        <div className="px-4">
            <Pageheader title="Yoklama Yönetimi" currentpage="Öğretmen Yoklama" />

            <TabsContainer
                tabs={tabsConfig}
                selectedIndex={activeIdx}
                onTabChange={(idx: number) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default TeacherPollingManagementPage;

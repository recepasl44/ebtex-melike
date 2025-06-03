/* src/components/common/pollingManagement/clupPolling/index.tsx */
import React, { useState } from 'react';
import TabsContainer from '../class-course/component/organisms/TabsContainer';

/* Sekme içerikleri – daha önce oluşturduğunuz sayfalar */
import ClubGroupPlanTable from './pages/clupPlan/table';
import ClubProgramTable from './pages/clupProgram/table';
import ClubPollingTable from './pages/clupPolling/table';
import ClubCountTable from './pages/clupCount/table';
import Pageheader from "../../../page-header/pageheader";

/* -------------------------------------------------------------- */
const ClupPollingManagementPage: React.FC = () => {
    /* aktif sekme index’i */
    const [activeIdx, setActiveIdx] = useState<number>(0);

    /* sekme başlıkları ve içerikleri */
    const tabs = [
        {
            label: 'Kulüp Planla',
            content: <ClubGroupPlanTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Kulüp Programı',
            content: <ClubProgramTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Kulüp Yoklama',
            content: <ClubPollingTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Yoklama Sayıları',
            content: <ClubCountTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (
        <div className="px-4">
            <Pageheader title="Yoklama Yönetimi" currentpage="Kulüp Yoklama" />

            <TabsContainer
                tabs={tabs}
                selectedIndex={activeIdx}
                onTabChange={(idx) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default ClupPollingManagementPage;

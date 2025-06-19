import React, { useState } from 'react';
import TabsContainer from '../daily/component/organisms/TabsContainer';
import Pageheader from '../../page-header/pageheader';
import IncomingChecksTable from '../incomingChecks/table';
import ChecksAndPromissoryTable from '../checksandpromissory/table';

const CheckManagementIndex: React.FC = () => {
    const [activeIdx, setActiveIdx] = useState<number>(0);

    const tabs = [
        {
            label: 'Gelen Çekler',
            content: <IncomingChecksTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Giden Çekler',
            content: <ChecksAndPromissoryTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (

        <><Pageheader title="Çek Yönetimi" currentpage={tabs[activeIdx].label} /><TabsContainer tabs={tabs} onTabChange={(idx) => setActiveIdx(idx)} /></>

    );
};

export default CheckManagementIndex;
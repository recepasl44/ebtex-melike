import { useState, FC } from 'react';
import TabsContainer from '../class-course/component/organisms/TabsContainer';

import ParentRequestEntryTable from './pages/requestEntry/table';
import Pageheader from "../../../page-header/pageheader";


const ParentIndexPage: FC = () => {
    const [activeIdx, setActiveIdx] = useState<number>(0);

    const tabs = [
        {
            label: 'Talep Girişi',
            content: <ParentRequestEntryTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (
        <div className="px-4">
            <Pageheader title="Yoklama Yönetimi" currentpage="Veli Talep Girişi" />

            <TabsContainer
                tabs={tabs}
                selectedIndex={activeIdx}
                onTabChange={setActiveIdx}
            />
        </div>
    );
};

export default ParentIndexPage;

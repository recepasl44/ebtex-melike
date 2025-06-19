

import { useState } from 'react';


import TabsContainer from './component/organisms/TabsContainer';


import AdministrativeRequestTable from './pages/request/table';
import Pageheader from '../../../page-header/pageheader';


const AdministrativeSupportTeamPage: React.FC = () => {
    /* Aktif sekme index’i                                                     */
    const [, setActiveIdx] = useState<number>(0);

    /* Sekme etiketleri + içerikleri                                           */
    const tabsConfig = [
        {
            label: 'Talep Girişi',
            content: <AdministrativeRequestTable />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (
        <div >
            <Pageheader title="Yoklama Yönetimi" currentpage="Okul-İdare Ve Destek Kadrosu" />

            <TabsContainer
                tabs={tabsConfig}
                // selectedIndex={activeIdx}
                onTabChange={(idx: number) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default AdministrativeSupportTeamPage;
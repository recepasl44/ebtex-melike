/* -------------------------------------------------------------------------- */
/*  Administrative Support Team – Sekmeli Ana Sayfa                           */
/* -------------------------------------------------------------------------- */

import { useState } from 'react';

/* UI şablonu  —  proje içinde zaten kullanılan sekme bileşeni                */
import TabsContainer from './component/organisms/TabsContainer';

/* Sayfa içerikleri                                                          */
import AdministrativeRequestTable from './pages/request/table';
import Pageheader from '../../../page-header/pageheader';

/* ========================================================================== */
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
        <div className="px-4">
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
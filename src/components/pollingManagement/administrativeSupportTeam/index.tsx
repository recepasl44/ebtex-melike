/* -------------------------------------------------------------------------- */
/*  Administrative Support Team – Sekmeli Ana Sayfa                           */
/* -------------------------------------------------------------------------- */

import { useState } from 'react';

/* UI şablonu  —  proje içinde zaten kullanılan sekme bileşeni                */
import TabsContainer from './component/organisms/TabsContainer';

/* Sayfa içerikleri                                                          */
import AdministrativeRequestTable from './pages/request/table';

/* ========================================================================== */
const AdministrativeSupportTeamPage: React.FC = () => {
    /* Aktif sekme index’i                                                     */
    const [activeIdx, setActiveIdx] = useState<number>(0);

    /* Sekme etiketleri + içerikleri                                           */
    const tabsConfig = [
        { label: 'Talep Girişi', content: <AdministrativeRequestTable /> },
    ];

    return (
        <div className="px-4">
            <h3>Okul-İdare Ve Destek Kadrosu</h3>

            <TabsContainer
                tabs={tabsConfig}
                selectedIndex={activeIdx}
                onTabChange={(idx: number) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default AdministrativeSupportTeamPage;
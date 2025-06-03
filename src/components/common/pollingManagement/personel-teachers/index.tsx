/* -------------------------------------------------------------------------- */
/*  Personel / Öğretmen Yoklama – Sekmeli Ana Sayfa                            */
/* -------------------------------------------------------------------------- */

import { useState } from 'react';

/* UI şablonu  —  proje içinde zaten kullanılan sekme bileşeni                */
import TabsContainer from './component/organisms/TabsContainer';

/* Sayfa içerikleri                                                          */
import DemandManagementTable from './pages/demandManagement/table';
import DailyPollingTable from './pages/daily/table';
import PollingCountsTable from './pages/count/table';
import Pageheader from "../../../page-header/pageheader";

/* ========================================================================== */
const StaffPollingManagementPage: React.FC = () => {
    /* Aktif sekme index’i                                                     */
    const [activeIdx, setActiveIdx] = useState<number>(0);

    /* Sekme etiketleri + içerikleri                                           */
    const tabsConfig = [
        { label: 'Talep Yönetimi', content: <DemandManagementTable /> },
        { label: 'Günlük Yoklama', content: <DailyPollingTable /> },
        { label: 'Yoklama Sayıları', content: <PollingCountsTable /> },
    ];

    return (
        <div className="px-4">
            <Pageheader title="Yoklama Yönetimi" currentpage="Personel / Öğretmen Yoklama" />

            <TabsContainer
                tabs={tabsConfig}
                selectedIndex={activeIdx}
                onTabChange={(idx: number) => setActiveIdx(idx)}
            />
        </div>
    );
};

export default StaffPollingManagementPage;

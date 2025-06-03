import { useState, FC } from 'react';
import TabsContainer from '../class-course/component/organisms/TabsContainer';

import ParentRequestEntryTable from './pages/requestEntry/table';

/* -------------------------------------------------------------- */
const ParentIndexPage: FC = () => {
    const [activeIdx, setActiveIdx] = useState<number>(0);

    const tabs = [
        { label: 'Talep Girişi', content: <ParentRequestEntryTable /> },
    ];

    return (
        <div className="px-4">
            <h4>Veli Talep Girişi</h4>

            <TabsContainer
                tabs={tabs}
                selectedIndex={activeIdx}
                onTabChange={setActiveIdx}
            />
        </div>
    );
};

export default ParentIndexPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TabsContainer from '../guidance/components/organisms/TabsContainer';
import Pageheader from '../../page-header/pageheader';

// Existing tabs from personnel detail
import PersonelPrimTab from '../personel/personelDetail/tabs/prim/table';
import KesintiTab from '../personel/personelDetail/tabs/kesinti/table';
import PersonelTazminatTab from '../personel/personelDetail/tabs/tazminat/table';
import PersonelIadeTab from '../personel/personelDetail/tabs/iade/table';
import { usePrimlerShow } from '../../hooks/employee/prim/usePrimlerShow';

const ExtraOperationsPage: React.FC = () => {
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const { id } = useParams<{ id?: string }>();
    const personelId = id ? Number(id) : undefined;
    const { getPrimler } = usePrimlerShow();

    useEffect(() => {
        if (personelId) {
            getPrimler(personelId);
        }
    }, [personelId, getPrimler]);

    const tabsConfig = [
        {
            label: 'Prim',
            content: <PersonelPrimTab personelId={personelId} enabled={activeIdx === 0 && !!personelId} />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Kesinti',
            content: <KesintiTab personelId={personelId} enabled={activeIdx === 1 && !!personelId} />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'Tazminat',
            content: <PersonelTazminatTab personelId={personelId} enabled={activeIdx === 2 && !!personelId} />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
        {
            label: 'İade',
            content: <PersonelIadeTab personelId={personelId} enabled={activeIdx === 3 && !!personelId} />,
            activeBgColor: '#5C67F7',
            activeTextColor: '#FFFFFF',
            passiveBgColor: '#5C67F726',
            passiveTextColor: '#5C67F7',
        },
    ];

    return (
        <div>
            <Pageheader title="Ekstra İşlemler" currentpage={tabsConfig[activeIdx]?.label} />
            <TabsContainer tabs={tabsConfig} onTabChange={(idx) => setActiveIdx(idx)} />
        </div>
    );
};

export default ExtraOperationsPage;

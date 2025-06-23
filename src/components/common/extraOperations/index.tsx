import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TabsContainer from '../guidance/components/organisms/TabsContainer';
import Pageheader from '../page-header/pageheader';

// Existing tabs from personnel detail
import PersonelPrimTab from '../personel/personelDetail/tabs/prim/table';
import KesintiTab from '../personel/personelDetail/tabs/kesinti/table';
import PersonelTazminatTab from '../personel/personelDetail/tabs/tazminat/table';
import PersonelIadeTab from '../personel/personelDetail/tabs/iade/table';

const ExtraOperationsPage: React.FC = () => {
  const [, setActiveIdx] = useState<number>(0);
  const { id } = useParams<{ id?: string }>();
  const personelId = id ? Number(id) : undefined;

  const tabsConfig = [
    {
      label: 'Prim',
      content: <PersonelPrimTab personelId={personelId} enabled={!!personelId} />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Kesinti',
      content: <KesintiTab personelId={personelId} enabled={!!personelId} />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Tazminat',
      content: <PersonelTazminatTab personelId={personelId} enabled={!!personelId} />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'İade',
      content: <PersonelIadeTab personelId={personelId} enabled={!!personelId} />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div>
      <Pageheader title="Personel Yönetimi" currentpage="Ekstra İşlemler" />
      <TabsContainer tabs={tabsConfig} onTabChange={setActiveIdx} />
    </div>
  );
};

export default ExtraOperationsPage;

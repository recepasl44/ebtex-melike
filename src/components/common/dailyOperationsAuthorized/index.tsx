import React, { useState } from 'react';
import TabsContainer from './component/organisms/TabsContainer';
import DailyOperationsAuthorizedTable from './table';
import Pageheader from '../page-header/pageheader';

const DailyOperationsAuthorizedPage: React.FC = () => {
  const [, setActiveIdx] = useState<number>(0);

  const tabsConfig = [
    {
      label: 'Yetkili',
      content: <DailyOperationsAuthorizedTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div className="px-4">
      <Pageheader title="Finans ve Muhasebe" currentpage="Yetkili İşlemler" />
      <TabsContainer tabs={tabsConfig} onTabChange={(idx: number) => setActiveIdx(idx)} />
    </div>
  );
};

export default DailyOperationsAuthorizedPage;

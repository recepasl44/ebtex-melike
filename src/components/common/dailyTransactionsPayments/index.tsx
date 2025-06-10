import React, { useState } from 'react';
import TabsContainer from './component/organisms/TabsContainer';
import DailyTransactionsPaymentsTable from './table';
import Pageheader from '../../page-header/pageheader';

const DailyTransactionsPaymentsPage: React.FC = () => {
  const [, setActiveIdx] = useState<number>(0);

  const tabsConfig = [
    {
      label: 'Ödemeler',
      content: <DailyTransactionsPaymentsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div className="px-4">
      <Pageheader title="Finans ve Muhasebe" currentpage="Günlük İşlemler" />
      <TabsContainer tabs={tabsConfig} onTabChange={(idx: number) => setActiveIdx(idx)} />
    </div>
  );
};

export default DailyTransactionsPaymentsPage;

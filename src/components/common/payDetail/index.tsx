import React, { useState } from 'react';
import TabsContainer from '../daily/component/organisms/TabsContainer';

import PaymentDetailsTable from '../payment_details/table';
import PayInstallments from '../payInstallments';
import DiscountStudentTable from '../discountStudent/table';
import OverduePaymentsPage from '../overduePayments/Table';

import Pageheader from '../../page-header/pageheader';

const PayDetailModule: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const tabsConfig = [
    {
      label: 'Ödeme Detayı',
      content: <PaymentDetailsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Taksitler',
      content: <PayInstallments />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'İndirimler',
      content: <DiscountStudentTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Vadesi Geçenler',
      content: <OverduePaymentsPage />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (

    <><Pageheader
      title="Ödeme Detayları"
      currentpage={tabsConfig[activeIdx]?.label} /><TabsContainer
        tabs={tabsConfig}
        onTabChange={(idx: number) => setActiveIdx(idx)} /></>

  );
};

export default PayDetailModule;

import React, { useState } from 'react';
import TabsContainer from '../../pollingManagement/class-course/component/organisms/TabsContainer';
import Pageheader from '../../../page-header/pageheader';

import FinalRegisterCombine from '../final-register/combine';
import ServiceManagement from '../service_management';
import CalculatePage from '../calculate';
import InternalsTable from '../../internal/table';

const RegisterIndexPage: React.FC = () => {
  const [, setActiveIdx] = useState<number>(0);

  const tabs = [
    {
      label: 'Kesin Kayıt',
      content: <FinalRegisterCombine />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Hizmet Yönetimi',
      content: <ServiceManagement />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Ücret Hesapla',
      content: <CalculatePage />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Kayıt Kontrol',
      content: <InternalsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div className="px-4">
      <Pageheader title="Öğrenciler" currentpage="Kayıt" />
      <TabsContainer tabs={tabs} onTabChange={(idx) => setActiveIdx(idx)} />
    </div>
  );
};

export default RegisterIndexPage;

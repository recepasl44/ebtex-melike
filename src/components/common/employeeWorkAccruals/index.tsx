import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Pageheader from '../../page-header/pageheader';
import TabsContainer from './component/organisms/TabsContainer';

import EmployeeWorkAccrualsTable from './pages/contract/table';
import EmployeeAccrualIndex from './pages/accrual';
import EmployeePaymentsIndex from './pages/payments';

const EmployeeWorkAccrualsIndex: React.FC = () => {
  const tabs = [
    {
      label: 'Sözleşme',
      content: <EmployeeWorkAccrualsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Çalışma ve Hakediş',
      content: <EmployeeAccrualIndex />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Ödemeler',
      content: <EmployeePaymentsIndex />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromSearch = () => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    return tab ? parseInt(tab, 10) : 0;
  };

  const [activeIdx, setActiveIdx] = useState<number>(getTabFromSearch());

  useEffect(() => {
    setActiveIdx(getTabFromSearch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div>
      <Pageheader title="Çalışma ve Hakediş" currentpage={tabs[activeIdx].label} />
      <TabsContainer
        tabs={tabs}
        selectedIndex={activeIdx}
        onTabChange={(parentIdx) => {
          setActiveIdx(parentIdx);
          const params = new URLSearchParams(location.search);
          params.set('tab', parentIdx.toString());
          navigate(`${location.pathname}?${params.toString()}`, { replace: true });
        }}
      />
    </div>
  );
};

export default EmployeeWorkAccrualsIndex;

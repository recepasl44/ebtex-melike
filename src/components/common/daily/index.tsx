
import React from 'react';
import TabsContainer from './component/organisms/TabsContainer';

import DailyTransactionsFinancialSummary from '../daily/dailyTransactionsFinancialSummary';
import StudentInstallmentsTable from '../daily/studentInstallments';
import DailyIncomeTable from '../daily/dailyIncome/table';
import DailyExpensesTable from '../daily/dailyExpenses';
import DailyStaffAppointmentsTable from "../daily/dailyStaffAppointments";
import DailyCardManagementTable from '../daily/dailyCardManagement';
import DailyTransactionsPaymentsTable from '../daily/dailyTransactionsPayments/table';
import DailyTransferTable from './dailyTransfer';
import DailyOperationsAuthorized from '../daily/dailyOperationsAuthorized';
import Pageheader from '../../page-header/pageheader';

const DailyModule: React.FC = () => {
  const handleTabChange = (
    parentTabIndex: number,
    childTabIndex: number | null
  ) => {
    console.log(`Parent Tab: ${parentTabIndex}, Child Tab: ${childTabIndex}`);
  };

  const tabsConfig = [
    {
      label: 'Finansal Özet',
      content: <DailyTransactionsFinancialSummary />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Taksitler',
      content: <StudentInstallmentsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Gelirler',
      content: <DailyIncomeTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Giderler',
      content: <DailyExpensesTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Personel Ödemeleri',
      content: <DailyStaffAppointmentsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Kart Yönetimi',
      content: <DailyCardManagementTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Ödemeler',
      content: <DailyTransactionsPaymentsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Transfer',
      content: <DailyTransferTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Yetkili',
      content: <DailyOperationsAuthorized />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div>
      <Pageheader title="Finans ve Muhasebe" currentpage="Günlük İşlemler" />
      <TabsContainer tabs={tabsConfig} onTabChange={handleTabChange} />
    </div>
  );
};

export default DailyModule;

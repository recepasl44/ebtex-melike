import React, { useState } from 'react';
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
  const [, setActiveIdx] = useState<number>(0);

  const tabsConfig = [
    {
      label: 'Finansal Özet',
      content: (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <DailyTransactionsFinancialSummary />
        </div>
      ),
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Taksitler',
      content: (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <StudentInstallmentsTable />
        </div>
      ),
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Gelirler',
      content: (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <DailyIncomeTable />
        </div>
      ),
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Giderler',
      content: (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <DailyExpensesTable />
        </div>
      ),
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Personel Ödemeleri',
      content: (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <DailyStaffAppointmentsTable />
        </div>
      ),
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Kart Yönetimi',
      content: (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <DailyCardManagementTable />
        </div>
      ),
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Ödemeler',
      content: (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <DailyTransactionsPaymentsTable />
        </div>
      ),
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Transfer',
      content: (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <DailyTransferTable />
        </div>
      ),
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Yetkili',
      content: (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <DailyOperationsAuthorized />
        </div>
      ),
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div className="w-full">
      <Pageheader title="Finans ve Muhasebe" currentpage="Günlük İşlemler" />
      <TabsContainer
        tabs={tabsConfig}
        onTabChange={(idx: number) => setActiveIdx(idx)}
      />
    </div>
  );
};

export default DailyModule;

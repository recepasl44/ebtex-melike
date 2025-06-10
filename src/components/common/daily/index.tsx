
import React, { useState } from 'react';
import TabsContainer from './component/organisms/TabsContainer';

import DailyTransactionsFinancialSummary from '../dailyTransactionsFinancialSummary';
import DebtsTable from '../debts/table';
import OtherIncomeTable from '../otherIncome/table';
import ExpenseListPage from '../expences/main/table';
import PaymentTab from '../personel/financialSummary/PaymentTab';
import CreditCardTable from '../creditcard/table';
import DailyTransactionsPaymentsTable from '../dailyTransactionsPayments/table';
import TransfersTable from '../transfers/table';
import DailyOperationsAuthorized from '../dailyOperationsAuthorized';
import Pageheader from '../../page-header/pageheader';

const DailyModule: React.FC = () => {
  /* aktif sekme index’i */
  const [, setActiveIdx] = useState<number>(0);

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
      content: <DebtsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Gelirler',
      content: <OtherIncomeTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Giderler',
      content: <ExpenseListPage />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Personel Ödemeleri',
      content: <PaymentTab />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#5C67F726',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Kart Yönetimi',
      content: <CreditCardTable />,
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
      content: <TransfersTable />,
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
    <div className="px-4">
      <Pageheader title="Finans ve Muhasebe" currentpage="Günlük İşlemler" />
      <TabsContainer
        tabs={tabsConfig}
        onTabChange={(idx: number) => setActiveIdx(idx)}
      />
    </div>
  );
};

export default DailyModule;

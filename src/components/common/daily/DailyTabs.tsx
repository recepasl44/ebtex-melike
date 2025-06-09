import TabsContainer from '../guidance/components/organisms/TabsContainer';
import FinancialSummary from '../accounting/financialSummary';
import DebtsTable from '../debts/table';
import OtherIncomeTable from '../otherIncome/table';
import ExpenseListPage from '../expences/main/table';
import PaymentTab from '../personel/financialSummary/PaymentTab';
import CreditCardTable from '../creditcard/table';
import PaymentDetailsTable from '../payment_details/table';
import TransfersTable from '../transfers/table';
import Tasks from './Tasks';
import Pageheader from '../../page-header/pageheader';

interface DailyTabsProps {
  currentpage: string;
}

const DailyTabs = ({ currentpage }: DailyTabsProps) => {
  const tabsConfig = [
    {
      label: 'Finansal Özet',
      content: <FinancialSummary />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Taksitler',
      content: <DebtsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Gelirler',
      content: <OtherIncomeTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Giderler',
      content: <ExpenseListPage />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Personel Ödemeleri',
      content: <PaymentTab />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Kart Yönetimi',
      content: <CreditCardTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Ödemeler',
      content: <PaymentDetailsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Transfer',
      content: <TransfersTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Yetkili',
      content: <Tasks />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div className="px-4">
      <Pageheader title="Finans ve Muhasebe" currentpage={currentpage} />
      <TabsContainer tabs={tabsConfig} />
    </div>
  );
};

export default DailyTabs;

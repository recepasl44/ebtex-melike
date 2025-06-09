import TabsContainer from '../guidance/components/organisms/TabsContainer';
import Summary from './Summary';
import PaymentDetailsTable from '../payment_details/table';
import IncomeListPage from '../income/table';
import ExpenseListPage from '../expences/main/table';
import CreditCardTable from '../creditcard/table';
import PaymentTab from '../personel/financialSummary/PaymentTab';
import TransfersTable from '../transfers/table';
import Payments from './Payments';
import Authority from './Authority';

const DailyModule = () => {
  const tabsConfig = [
    {
      label: 'Finansal Özet',
      content: <Summary />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Taksitler',
      content: <PaymentDetailsTable />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
    {
      label: 'Gelirler',
      content: <IncomeListPage />,
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
      content: <Payments />,
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
      content: <Authority />,
      activeBgColor: '#5C67F7',
      activeTextColor: '#FFFFFF',
      passiveBgColor: '#E1E4FB',
      passiveTextColor: '#5C67F7',
    },
  ];

  return (
    <div className="flex" style={{ padding: '23px 50px 0' }}>
      <TabsContainer tabs={tabsConfig} />
    </div>
  );
};

export default DailyModule;

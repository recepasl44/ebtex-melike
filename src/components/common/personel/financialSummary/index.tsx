import TabsContainer from "../../guidance/components/organisms/TabsContainer";
import ContractInfoTab from "./ContractInfoTab";
import AccrualTab from "./AccrualTab";
import PaymentTab from "./PaymentTab";

const PersonelFinancialSummary = () => {
  const tabsConfig = [
    {
      label: "Sözleşme Bilgileri",
      content: <ContractInfoTab />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Hakediş",
      content: <AccrualTab />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
    {
      label: "Ödemeler",
      content: <PaymentTab />,
      activeBgColor: "#5C67F7",
      activeTextColor: "#FFFFFF",
      passiveBgColor: "#E1E4FB",
      passiveTextColor: "#5C67F7",
    },
  ];

  return (
    <div className="flex" style={{ padding: "23px 50px 0" }}>
      <TabsContainer tabs={tabsConfig} />
    </div>
  );
};

export default PersonelFinancialSummary;

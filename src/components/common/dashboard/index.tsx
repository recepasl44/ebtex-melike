import FoundingDirectorDashboard from "./components/foundingDirectorDashboard/component";
import { dummyDataDashboar } from "./dummyData";

const Dashboard = () => {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <FoundingDirectorDashboard data={dummyDataDashboar} />
      {/* <CorporateLeaderDashboard data={dummyDataDashboar} /> */}
      {/* <ManagementDashboard data={dummyDataDashboar} /> */}
      {/* <TeachersDashboard data={dummyDataDashboar} /> */}
      {/* <PDRDashboard data={dummyDataDashboar} /> */}
      {/* <StudentAffairsDashboard data={dummyDataDashboar} /> */}
      {/* <FinanceOfficerDashboard data={dummyDataDashboar} /> */}
      {/* <SupportStaffDashboard data={dummyDataDashboar} />  */}
      {/* <SuerviceDriverDashboard data={dummyDataDashboar} />*/}
    </div>
  );
};
export default Dashboard;

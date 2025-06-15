import FoundingDirectorDashboard from "./fields/foundingDirectorDashboard/index.tsx";
import { useDashboard } from "../../hooks/dashboard/useDashboard";

const Dashboard = () => {
  const { data } = useDashboard();
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {data && <FoundingDirectorDashboard data={data} />}
      {/* <CorporateLeaderDashboard data={dummyDataDashboar} /> */}
      {/* <ManagementDashboard data={dummyDataDashboar} /> */}
      {/* <TeachersDashboard data={dummyDataDashboar} /> */}
      {/* <PDRDashboard data={dummyDataDashboar} /> */}
      {/* <StudentAffairsDashboard data={dummyDataDashboar} /> */}
      {/* <FinanceOfficerDashboard data={dummyDataDashboar} /> */}
      {/* <SupportStaffDashboard data={dummyDataDashboar} /> */}
      {/* <SuerviceDriverDashboard data={dummyDataDashboar} /> */}
      {/*     <ServiceManagerDashboard data={dummyDataDashboar} />*/}
      {/* <ParentGuardianDashboard data={dummyDataDashboar} />*/}
      {/* <StudentDashboard data={dummyDataDashboar} /> */}
    </div>
  );
};
export default Dashboard;

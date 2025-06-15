import FoundingDirectorDashboard from "./fields/foundingDirectorDashboard/index.tsx";
import CorporateLeaderDashboard from "./fields/corporateDashboard/index.tsx";
import ManagementDashboard from "./fields/managementDashboard/index.tsx";
import TeachersDashboard from "./fields/TeachersDashboard/index.tsx";
import PDRDashboard from "./fields/PDRDashboard/index.tsx";
import StudentAffairsDashboard from "./fields/StudentAffairsDashboard/index.tsx";
import FinanceOfficerDashboard from "./fields/financeOfficerDashboard/index.tsx";
import SupportStaffDashboard from "./fields/supportStaffDashboard/index.tsx";
import SuerviceDriverDashboard from "./fields/serviceDriverDashboard/index.tsx";
import ServiceManagerDashboard from "./fields/serviceManagerDashboard/index.tsx";
import ParentGuardianDashboard from "./fields/parentGuardianDashboard/index.tsx";
import StudentDashboard from "./fields/studentDashboard/index.tsx";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import getUserDataField from "../../utils/user_data_field";

import CorporateLeaderDashboard from "./fields/corporateDashboard/index.tsx";
import ManagementDashboard from "./fields/managementDashboard/index.tsx";
import TeachersDashboard from "./fields/TeachersDashboard/index.tsx";
import PDRDashboard from "./fields/PDRDashboard/index.tsx";
import StudentAffairsDashboard from "./fields/StudentAffairsDashboard/index.tsx";
import FinanceOfficerDashboard from "./fields/financeOfficerDashboard/index.tsx";
import SupportStaffDashboard from "./fields/supportStaffDashboard/index.tsx";
import SuerviceDriverDashboard from "./fields/serviceDriverDashboard/index.tsx";
import ServiceManagerDashboard from "./fields/serviceManagerDashboard/index.tsx";
import ParentGuardianDashboard from "./fields/parentGuardianDashboard/index.tsx";
import StudentDashboard from "./fields/studentDashboard/index.tsx";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import getUserDataField from "../../utils/user_data_field";

const Dashboard = () => {
  const { data } = useDashboard();
  const { me } = getUserDataField();

  const roleId = me?.role_id;

  const renderDashboard = () => {
    if (!data) return null;
    switch (roleId) {
      case 1:
        return <FoundingDirectorDashboard data={data} />;
      case 2:
        return <CorporateLeaderDashboard data={data} />;
      case 3:
        return <ManagementDashboard data={data} />;
      case 4:
        return <TeachersDashboard data={data} />;
      case 5:
        return <PDRDashboard data={data} />;
      case 6:
        return <StudentAffairsDashboard data={data} />;
      case 7:
        return <FinanceOfficerDashboard data={data} />;
      case 8:
        return <SupportStaffDashboard data={data} />;
      case 9:
        return <SuerviceDriverDashboard data={data} />;
      case 10:
        return <ServiceManagerDashboard data={data} />;
      case 11:
        return <ParentGuardianDashboard data={data} />;
      case 12:
        return <StudentDashboard data={data} />;
      default:
        return <FoundingDirectorDashboard data={data} />;
    }
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {renderDashboard()}

    </div>
  );
};
export default Dashboard;

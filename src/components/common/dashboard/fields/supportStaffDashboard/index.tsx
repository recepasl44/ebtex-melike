import { DashboardResponseType } from "../../type.ts";
import Row8Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const SupportStaffDashboard: React.FC<CorporateLeaderDashboardProps> = ({data}) => {



  return (
    <div>
        <Row8Component data={data}/>
    </div>
  )
}

export default SupportStaffDashboard

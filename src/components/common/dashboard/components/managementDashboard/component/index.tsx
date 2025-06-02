import { DashboardResponseType } from "../../../type";
import Row3Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const ManagementDashboard: React.FC<CorporateLeaderDashboardProps> = ({data}) => {


  
  return (
    <div>
        <Row3Component data={data}/>
    </div>
  )
}

export default ManagementDashboard

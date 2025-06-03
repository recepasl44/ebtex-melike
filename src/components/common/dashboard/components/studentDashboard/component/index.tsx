import { DashboardResponseType } from "../../../type";
import Row12Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const StudentDashboard: React.FC<CorporateLeaderDashboardProps> = ({data}) => {


  
  return (
    <div>
        <Row12Component data={data}/>
    </div>
  )
}

export default StudentDashboard

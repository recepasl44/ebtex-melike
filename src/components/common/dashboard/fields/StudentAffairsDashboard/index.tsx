import { DashboardResponseType } from "../../type.ts";
import Row6Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const StudentAffairsDashboard: React.FC<CorporateLeaderDashboardProps> = ({data}) => {



  return (
    <div>
        <Row6Component data={data}/>
    </div>
  )
}

export default StudentAffairsDashboard

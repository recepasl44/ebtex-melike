import { DashboardResponseType } from "../../type.ts";
import Row4Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const TeachersDashboard: React.FC<CorporateLeaderDashboardProps> = ({data}) => {



  return (
    <div>
        <Row4Component data={data}/>
    </div>
  )
}

export default TeachersDashboard

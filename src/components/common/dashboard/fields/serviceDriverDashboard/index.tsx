import { DashboardResponseType } from "../../type.ts";
import Row9Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const SuerviceDriverDashboard: React.FC<CorporateLeaderDashboardProps> = ({data}) => {



  return (
    <div>
        <Row9Component data={data}/>
    </div>
  )
}

export default SuerviceDriverDashboard

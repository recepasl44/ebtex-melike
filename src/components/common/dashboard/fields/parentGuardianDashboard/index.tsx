import { DashboardResponseType } from "../../type.ts";
import Row11Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const ParentGuardianDashboard: React.FC<CorporateLeaderDashboardProps> = ({data}) => {



  return (
    <div>
        <Row11Component data={data}/>
    </div>
  )
}

export default ParentGuardianDashboard

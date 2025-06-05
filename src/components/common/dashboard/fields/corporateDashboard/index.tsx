import { DashboardResponseType } from "../../type.ts";
import Row2Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const CorporateLeaderDashboard: React.FC<CorporateLeaderDashboardProps> = (props) => {



  return (
    <div>
        <Row2Component data={props.data}/>
    </div>
  )
}

export default CorporateLeaderDashboard

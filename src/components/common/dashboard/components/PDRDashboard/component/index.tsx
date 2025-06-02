import { DashboardResponseType } from "../../../type";
import Row5Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const PDRDashboard: React.FC<CorporateLeaderDashboardProps> = ({data}) => {


  
  return (
    <div>
        <Row5Component data={data}/>
    </div>
  )
}

export default PDRDashboard

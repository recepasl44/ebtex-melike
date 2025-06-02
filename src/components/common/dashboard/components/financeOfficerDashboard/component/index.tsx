import { DashboardResponseType } from "../../../type";
import Row7Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const FinanceOfficerDashboard: React.FC<CorporateLeaderDashboardProps> = ({data}) => {


  
  return (
    <div>
        <Row7Component data={data}/>
    </div>
  )
}

export default FinanceOfficerDashboard

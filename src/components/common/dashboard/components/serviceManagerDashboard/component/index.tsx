import { DashboardResponseType } from "../../../type";
import Row10Component from "./sections";

interface CorporateLeaderDashboardProps {
  data: DashboardResponseType;
}

const ServiceManagerDashboard: React.FC<CorporateLeaderDashboardProps> = ({data}) => {


  
  return (
    <div>
        <Row10Component data={data}/>
    </div>
  )
}

export default ServiceManagerDashboard

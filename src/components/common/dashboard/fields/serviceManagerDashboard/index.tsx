import { DashboardResponseType } from "../../type.ts";
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

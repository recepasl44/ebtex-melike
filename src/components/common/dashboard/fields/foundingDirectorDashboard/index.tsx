import {DashboardResponseType} from "../../type.ts";
import Row1Component from "./sections";

interface FoundingDirectorDashboardProps {
    data: DashboardResponseType;
}

const FoundingDirectorDashboard: React.FC<FoundingDirectorDashboardProps> = (props) => {
    return (
        <div>
            <Row1Component data={props.data}/>
        </div>
    )
}
export default FoundingDirectorDashboard

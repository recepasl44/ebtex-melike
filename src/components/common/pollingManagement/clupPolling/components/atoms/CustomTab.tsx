import { FC } from "react";
import Box from "@mui/material/Box";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomTab: FC<TabPanelProps> = ({ children, value, index }) => (
    <div
        className="mt-5"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
    >
        {value === index && <Box>{children}</Box>}
    </div>
);

export default CustomTab;

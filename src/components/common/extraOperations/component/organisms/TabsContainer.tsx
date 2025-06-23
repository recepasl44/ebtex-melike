import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FC, useState, useEffect } from "react";

interface TabConfig {
    label: string;
    content: React.ReactNode;
    children?: TabConfig[] | undefined;
    activeBgColor?: string;
    activeTextColor?: string;
    passiveBgColor?: string;
    passiveTextColor?: string;
    width?: string;
    height?: string;
}
interface TabsContainerProps {
    tabs: TabConfig[];
    onTabChange?: (parentTabIndex: number, childTabIndex: number | null) => void;
}

const TabsContainer: FC<TabsContainerProps> = ({ tabs, onTabChange }) => {
    // always start from the first tab
    const [value, setValue] = useState<number>(0);
    const [childValue, setChildValue] = useState<number | null>(
        tabs?.[0]?.children?.length ? 0 : null
    );

    useEffect(() => {
        // reset child index if tab structure changes
        if (tabs?.[value]?.children?.length) {
            setChildValue(0);
        } else {
            setChildValue(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabs]);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        const hasChildren = tabs?.[newValue]?.children?.length;
        if (hasChildren) {
            setChildValue(0);
        } else {
            setChildValue(null);
        }

        if (onTabChange) onTabChange(newValue, hasChildren ? 0 : null);
    };

    const handleChildChange = (_: React.SyntheticEvent, newValue: number) => {
        setChildValue(newValue);
        if (onTabChange) onTabChange(value, newValue);
    };

    const tabStyle = {
        components: {
            MuiTab: {
                styleOverrides: {
                    root: {
                        minHeight: "36px",
                        height: "36px",
                        minWidth: "165px",
                        maxWidth: "165px",
                    },
                },
            },
        },
    };

    return (
        <Box
            sx={{
                overflowX: "auto",
                minWidth: "100%",
                borderRadius: "8px",
                padding: "12px",
                // Tab component stilini override et
                "& .MuiTab-root": tabStyle.components.MuiTab.styleOverrides.root,
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                allowScrollButtonsMobile
                variant="scrollable"
                textColor="inherit"
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    "& .MuiTabs-indicator": {
                        display: "none",
                    },
                }}
            >
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        disableRipple
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            color:
                                value === index
                                    ? tab.activeTextColor || "#FFF"
                                    : tab.passiveTextColor || "#5C67F7",
                            fontSize: "13px",
                            borderRadius: "8px",
                            backgroundColor:
                                value === index
                                    ? tab.activeBgColor || "#5C67F7"
                                    : tab.passiveBgColor || "#E1E4FB",
                            minWidth: tab.width || "200px",
                            height: tab.height || "30px",
                            px: 1,
                            py: 1,
                            mr: 3,
                            opacity: "1 !important",
                        }}
                    />
                ))}
            </Tabs>

            {tabs.map((tab, index) => (
                <Box
                    key={index}
                    role="tabpanel"
                    hidden={value !== index}
                    id={`tabpanel-${index}`}
                    aria-labelledby={`tab-${index}`}
                >
                    {value === index && (
                        <div className="mt-3">
                            {tab.content}

                            {tab.children && (
                                <Tabs
                                    value={childValue ?? 0}
                                    onChange={handleChildChange}
                                    allowScrollButtonsMobile
                                    textColor="inherit"
                                    variant="scrollable"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        mt: 1,
                                        "& .MuiTabs-indicator": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    {tab.children.map((child, childIndex) => (
                                        <Tab
                                            key={childIndex}
                                            label={child.label}
                                            disableRipple
                                            sx={{
                                                textTransform: "none",
                                                fontWeight: 500,
                                                color:
                                                    childValue === childIndex
                                                        ? child.activeTextColor || "#FFF"
                                                        : child.passiveTextColor || "#4CAF50",
                                                fontSize: "12px",
                                                borderRadius: "6px",
                                                backgroundColor:
                                                    childValue === childIndex
                                                        ? child.activeBgColor || "#4CAF50"
                                                        : child.passiveBgColor || "#C8E6C9",
                                                minWidth: child.width || "150px",
                                                height: child.height || "42px",
                                                px: 1,
                                                py: 1,
                                                mr: 3,
                                                opacity: "1 !important",
                                            }}
                                        />
                                    ))}
                                </Tabs>
                            )}

                            {tab.children &&
                                tab.children.map((child, childIndex) => (
                                    <Box
                                        key={childIndex}
                                        role="tabpanel"
                                        hidden={childValue !== childIndex}
                                        id={`child-tabpanel-${childIndex}`}
                                        aria-labelledby={`child-tab-${childIndex}`}
                                    >
                                        {childValue === childIndex && (
                                            <div className="mt-2">{child.content}</div>
                                        )}
                                    </Box>
                                ))}
                        </div>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default TabsContainer;

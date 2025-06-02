/* components/common/homework/components/organisms/TabsContainer.tsx */
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FC, useState, useEffect } from 'react';

/* ------------------------------------------------------------------ */
/*  Tipler                                                            */
/* ------------------------------------------------------------------ */
interface TabConfig {
    label: string;
    content: React.ReactNode;
    children?: TabConfig[];
    /* renkleri opsiyonel bırakalım */
    activeBgColor?: string;
    activeTextColor?: string;
    passiveBgColor?: string;
    passiveTextColor?: string;
}

export interface TabsContainerProps {
    tabs: TabConfig[];

    /** Kontrollü kullanım  – seçili üst-sekme */
    selectedIndex?: number;

    /**
     * Sekme değiştiğinde çağrılır  
     *  – parentTabIndex  : üst sekme  
     *  – childTabIndex   : alt sekme (yoksa `null`)
     */
    onTabChange?: (parentTabIndex: number, childTabIndex: number | null) => void;
}

/* ------------------------------------------------------------------ */
/*  Bileşen                                                           */
/* ------------------------------------------------------------------ */
const TabsContainer: FC<TabsContainerProps> = ({
    tabs,
    selectedIndex,
    onTabChange,
}) => {
    /* Eğer dışarıdan selectedIndex geliyorsa onu kullan, yoksa internal state */
    const [value, setValue] = useState<number>(selectedIndex ?? 0);
    const [childVal, setChildVal] = useState<number | null>(null);

    /* dışarıdan selectedIndex değişirse internal state’i senkronize et */
    useEffect(() => {
        if (selectedIndex !== undefined) setValue(selectedIndex);
    }, [selectedIndex]);

    /* ilk render’da alt sekme gerekiyorsa 0’a çekelim */
    useEffect(() => {
        if (tabs?.[value]?.children?.length) setChildVal(0);
    }, [tabs, value]);

    const handleParentChange = (_: React.SyntheticEvent, newVal: number) => {
        /* uncontrolled moddaysak state’i güncelle */
        if (selectedIndex === undefined) setValue(newVal);

        const hasChildren = !!tabs?.[newVal]?.children?.length;
        setChildVal(hasChildren ? 0 : null);

        onTabChange?.(newVal, hasChildren ? 0 : null);
    };

    const handleChildChange = (_: React.SyntheticEvent, newVal: number) => {
        setChildVal(newVal);
        onTabChange?.(value, newVal);
    };

    /* ------------- render ------------- */
    return (
        <Box sx={{ mt: 2, overflowX: 'auto' }}>
            {/* ÜST SEKME ÇUBUĞU */}
            <Tabs
                value={value}
                onChange={handleParentChange}
                variant="scrollable"
                allowScrollButtonsMobile
                textColor="inherit"
                sx={{
                    '& .MuiTabs-indicator': { display: 'none' },
                }}
            >
                {tabs.map((t, i) => (
                    <Tab
                        key={i}
                        label={t.label}
                        disableRipple
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '12px',
                            borderRadius: 2,
                            px: 8, py: 1, mr: 3,
                            color: value === i
                                ? t.activeTextColor || '#fff'
                                : t.passiveTextColor || '#5C67F7',
                            backgroundColor: value === i
                                ? t.activeBgColor || '#5C67F7'
                                : t.passiveBgColor || '#E1E4FB',
                        }}
                    />
                ))}
            </Tabs>

            {/* PANEL ve ALT SEKME (varsa) */}
            {tabs.map((parent, pIdx) => (
                <Box
                    key={pIdx}
                    role="tabpanel"
                    hidden={value !== pIdx}
                >
                    {value === pIdx && (
                        <div className="mt-3">
                            {parent.content}

                            {parent.children && (
                                <>
                                    <Tabs
                                        value={childVal ?? 0}
                                        onChange={handleChildChange}
                                        allowScrollButtonsMobile
                                        textColor="inherit"
                                        sx={{
                                            mt: 1,
                                            '& .MuiTabs-indicator': { display: 'none' },
                                        }}
                                    >
                                        {parent.children.map((c, cIdx) => (
                                            <Tab
                                                key={cIdx}
                                                label={c.label}
                                                disableRipple
                                                sx={{
                                                    textTransform: 'none',
                                                    fontWeight: 500,
                                                    fontSize: '11px',
                                                    borderRadius: 1.5,
                                                    px: 6, py: 0.5, mr: 2,
                                                    color: childVal === cIdx
                                                        ? c.activeTextColor || '#fff'
                                                        : c.passiveTextColor || '#4CAF50',
                                                    backgroundColor: childVal === cIdx
                                                        ? c.activeBgColor || '#4CAF50'
                                                        : c.passiveBgColor || '#C8E6C9',
                                                }}
                                            />
                                        ))}
                                    </Tabs>

                                    {parent.children.map((c, cIdx) => (
                                        <Box
                                            key={cIdx}
                                            role="tabpanel"
                                            hidden={childVal !== cIdx}
                                        >
                                            {childVal === cIdx && <div className="mt-2">{c.content}</div>}
                                        </Box>
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default TabsContainer;

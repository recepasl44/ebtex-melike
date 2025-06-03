import { useState } from "react";
          import { useSelector } from "react-redux";
          import { RootState } from "../../../../../../../store";
          import AnalysisTable from "../../AnalysisTable.tsx";
          import TestSelector from "../../../TestSelector.tsx";
          import HeaderBlock from "../../headerSection/headerBlock/HeaderBlock.tsx";

          const GainAnalysis: React.FC<any> = ({ data }) => {
            const [activeTestIndex, setActiveTestIndex] = useState<number | null>(null);

            // Redux Store'dan dark/light bilgisi
            const localVariable = useSelector((state: RootState) => state.ui);
            const isDark = localVariable.dataThemeMode === "dark";

            const handleTestSelect = (index: number) => {
              setActiveTestIndex((prev) => (prev === index ? null : index));
            };

            const testSelectorHeight = `${data.length * 35}px`;

            // Active/passive colors for both themes
            const colors = {
              active: {
                bg: isDark ? "#FF5D9F" : "#FF5D9F",
                text: isDark ? "#FFFFFF" : "#FFFFFF"
              },
              passive: {
                bg: isDark ? "#2A293E" : "#FF5D9F26",
                text: isDark ? "#FF5D9F" : "#FF5D9F"
              },
              header: {
                fill: isDark ? "#334155" : "#A76BF8",
                stroke: isDark ? "#374151" : "#E6EFF3",
                text: isDark ? "#E2E8F0" : undefined
              }
            };

            return (
              <div>
                <HeaderBlock
                  text="SORULARA GÖRE KAZANIM ANALİZİ"
                  fill={colors.header.fill}
                  stroke={colors.header.stroke}
                  width="100%"
                  height="25px"
                />
                <TestSelector
                  activeIndex={activeTestIndex !== null ? activeTestIndex : -1}
                  onSelect={handleTestSelect}
                  data={data}
                  width="100%"
                  height={testSelectorHeight}
                  activeBgColor={colors.active.bg}
                  activeTextColor={colors.active.text}
                  passiveBgColor={colors.passive.bg}
                  passiveTextColor={colors.passive.text}
                  textStyle={{
                    fontSize: "14px",
                    fontWeight: 100
                  }}
                />
                <AnalysisTable
                  data={data}
                  activeTestIndex={activeTestIndex}
                  width="100%"
                  height="auto"
                />
              </div>
            );
          };

          export default GainAnalysis;

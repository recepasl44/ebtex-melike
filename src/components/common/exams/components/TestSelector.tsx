import React, { CSSProperties } from 'react';

        interface TestItem {
          name: string;
        }

        interface TestSelectorProps {
          activeIndex: number | null;
          onSelect: (index: number) => void;
          data: TestItem[];
          width?: string;
          height?: string;
          activeBgColor?: string;
          activeTextColor?: string;
          passiveBgColor?: string;
          passiveTextColor?: string;
          textStyle?: CSSProperties;
        }

        const TestSelector: React.FC<TestSelectorProps> = ({
          activeIndex,
          onSelect,
          data,
          width = "100%",
          height = "auto",
          activeBgColor = "#FF5D9F",
          activeTextColor = "#FFFFFF",
          passiveBgColor = "#FF5D9F26",
          passiveTextColor = "#FF5D9F",
          textStyle = {},
        }) => {
          // Container style
          const containerStyle: CSSProperties = {
            width,
            height,
            display: "flex",
            flexDirection: "column",
          };

          // Base row style (shared properties)
          const baseRowStyle: CSSProperties = {
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: 600,
            transition: "background-color 0.3s ease",
            borderBottom: "1px solid #FF5D9F", // Updated border color
            ...textStyle,
          };

          return (
            <div className="test-selector-wrapper" style={containerStyle}>
              {data.map((test, index) => {
                const isActive = index === activeIndex;

                // Combine base style with conditional colors
                const rowStyle: CSSProperties = {
                  ...baseRowStyle,
                  backgroundColor: isActive ? activeBgColor : passiveBgColor,
                  color: isActive ? activeTextColor : passiveTextColor,
                };

                return (
                  <div
                    key={index}
                    className="test-row"
                    style={rowStyle}
                    onClick={() => onSelect(index)}
                  >
                    {test.name}
                  </div>
                );
              })}
            </div>
          );
        };

        export default TestSelector;

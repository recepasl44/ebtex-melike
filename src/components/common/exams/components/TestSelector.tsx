import React, { CSSProperties } from 'react';

interface Props {
  activeIndex: number | null;
  onSelect: (index: number) => void;
  data: {
    name: string;
  }[];
  width?: string;
  height?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  passiveBgColor?: string;
  passiveTextColor?: string;
  textStyle?: CSSProperties; // Yeni prop: metin stilleri
}

const TestSelector: React.FC<Props> = ({
  activeIndex,
  onSelect,
  data,
  width = "100%",
  height = "auto",
  activeBgColor = "#FF5D9F",
  activeTextColor = "#FFFFFF",
  passiveBgColor = "#FF5D9F26",
  passiveTextColor = "#FF5D9F",
  textStyle = {}, // Varsayılan boş stil
}) => {

   
  return (
    <div
      className="test-selector-wrapper"
      style={{ width, height }}
    >
      {data.map((test, index) => {
        const isActive = index === activeIndex;

        const rowStyle = {
          backgroundColor: isActive ? activeBgColor : passiveBgColor,
          color: isActive ? activeTextColor : passiveTextColor,
          padding: "6px 12px",
          cursor: "pointer",
          fontWeight: 600,
          transition: "background-color 0.3s ease",
          borderBottom: "1px solid #E6EFF3",
          ...textStyle, 
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
import HeaderBlock from "./headerBlock/HeaderBlock.tsx";

interface HeaderSectionProps {
  platform: PlatformInfo;
  quizType: string;
  quiz_type_id: number;
}

interface PlatformInfo {
  name: string;
  city: string;
  county: string;
  quiz_type_id: number;
}

const HeaderSection = ({
  platform,
  quizType,
  quiz_type_id,
}: HeaderSectionProps) => {
  const institutionText = `${platform.name} ${platform.city} / ${platform.county}`;
  const examTitle = `${quizType} SINAV SONUÇ BELGESİ`;

  const rightColors: Record<number, string> = {
    1: "#A76BF8",
    2: "#A76BF8",
    3: "#A76BF8",
    4: "#A76BF8",
    5: "#A76BF8",
    6: "#FB4242",
    7: "#FE7C58",
    8: "#FE7C58",
    9: "#E354D4",
    10: "#FF5D9F",
    11: "#27AEEB",
  };
  const backgroundColorR = rightColors[quiz_type_id] || "#FF5D9F";

  const leftColors: Record<number, string> = {
    1: "#727BF8",
    2: "#727BF8",
    3: "#727BF8",
    4: "#727BF8",
    5: "#727BF8",
    6: "#727BF8",
    7: "#727BF8",
    8: "#727BF8",
    9: "#727BF8",
    10: "#727BF8",
    11: "#EFBE5F",
  };
  const backgroundColorL = leftColors[quiz_type_id] || "#EFBE5F";

  return (
    <div 
    style={{ flexWrap: "nowrap" }}
    className="d-flex  justify-content-center w-100">
      <HeaderBlock
        text={institutionText}
        fill={backgroundColorL}
        stroke="#E6EFF3"
        cutRight
        width="51%"
        height="30px"
      />
      <HeaderBlock
        text={examTitle}
        fill={backgroundColorR}
        stroke="#E6EFF3"
        cutLeft
        width="51%"
        height="30px"
      />
    </div>
  );
};

export default HeaderSection;

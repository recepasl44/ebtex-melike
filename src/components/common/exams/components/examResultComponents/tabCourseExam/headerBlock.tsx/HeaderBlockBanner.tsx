import React from "react";
import HeaderBlock from "../../headerSection/headerBlock/HeaderBlock.tsx";

type Props = {
  quizName: string;
  studentName: string;
  className: string;
};

const HeaderBanner: React.FC<Props> = ({
  quizName,
  studentName,
  className,
}) => {
  return (
<div
  className="d-flex justify-content-center"
  style={{ width: "100%" }}
>
  <HeaderBlock
    text={quizName}
    fill="#0082FF"
    stroke="#E6EFF3"
    cutRight
    width="32.5%"
    height="25px"
  />
  <HeaderBlock
    text={studentName}
    fill="#E354D4"
    stroke="#E6EFF3"
    cutLeft
    cutRight
    width="40%"
    height="25px"
  />
  <HeaderBlock
    text={className}
    fill="#FF8E6F"
    stroke="#E6EFF3"
    cutLeft
    width="30%"
    height="25px"
  />
</div>


  );
};

export default HeaderBanner;

import React from "react";
import { getComparisonIcon } from "../../../../../../../../utils/getComparisonIcon.ts";

type Props = {
  comparison: string;
};

const ComparisonIcon: React.FC<Props> = ({ comparison }) => {
  const iconSrc = getComparisonIcon(comparison);
  return <img src={iconSrc} alt="icon" width={16} height={16} />;
};

export default ComparisonIcon;

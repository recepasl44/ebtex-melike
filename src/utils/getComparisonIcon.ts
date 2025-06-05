import { routeIcons } from "../assets/images/routeIcon";

export const getComparisonIcon = (direction: string): string => {
  const icons: Record<string, string> = {
    up: routeIcons.upIcon,
    down: routeIcons.downIcon,
    right: routeIcons.rightIcon,
  };
  return icons[direction] || "";
};
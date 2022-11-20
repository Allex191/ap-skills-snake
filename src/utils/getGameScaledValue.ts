import { Theme } from "@emotion/react";

interface getGameScaledValueProps {
  theme: Theme;
  size: number;
  unit: "px" | "vw" | "vh" | "%";
}

export const getGameScaledValue = (
  theme: getGameScaledValueProps["theme"],
  size: getGameScaledValueProps["size"],
  unit: getGameScaledValueProps["unit"]
) => {
  return Math.trunc(size * theme.uIItemsScale) + unit;
};

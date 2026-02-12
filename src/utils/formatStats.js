// src/utils/formatStats.js
export const formatSolved = stats => {
  if (!stats) return "0 problems";
  const { easy = 0, medium = 0, hard = 0 } = stats;
  const total = easy + medium + hard;
  return `${total} problems (E:${easy} M:${medium} H:${hard})`;
};

export const formatRankChange = diff => {
  if (diff == null) return "";
  if (diff < 0) return `${Math.abs(diff)} better`;
  if (diff > 0) return `${diff} worse`;
  return "no change";
};

// extracting text from a string and returning a RegExp that matches the exact text, ignoring case
export const exactTextPattern = (value: string): RegExp => {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escapedValue}$`, "i");
};

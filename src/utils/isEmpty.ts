export const isEmpty = (value: any): boolean => {
  if (value == null) return true;

  if (typeof value === "boolean") return false;

  if (typeof value === "string") return value.trim().length === 0;

  if (typeof value === "number") return false;

  if (Array.isArray(value)) return value.length === 0;

  if (value instanceof Map || value instanceof Set) return value.size === 0;

  if (typeof value === "object") return Object.keys(value).length === 0;

  return false; //아무것도 일치하지 않으면 false
};

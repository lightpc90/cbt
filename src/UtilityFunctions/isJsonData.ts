export function isJsonString(value: unknown): boolean {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null;
  } catch (err) {
    return false;
  }
}

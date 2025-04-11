export const parseProtobufMessage = (message: string) => {
  return message
    .split("\n")
    .filter((line) => line.startsWith("0:"))
    .map((line) => line.slice(3, -1)) // Remove `0:"` and trailing `"`
    .join("")
    .replace("\n", "");
};

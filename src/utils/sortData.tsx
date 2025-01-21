import { User } from "@/interfaces/user";

let direction: "asc" | "des" = "asc";

export const sortData = (
  field: string,
  data: User[]
): { sortedData: User[]; direction: "asc" | "des" } => {
  direction = direction === "asc" ? "des" : "asc";

  // Split the field for nested property access
  const fieldParts = field.split(".");

  // Sort the data array (here we use any type because this x and y can be of any type)
  const sortedData = data.sort((a, b) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let x: any = a;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let y: any = b;

    // Access nested properties
    for (const part of fieldParts) {
      x = x?.[part];
      y = y?.[part];
    }

    // Sort numbers
    if (typeof x === "number" && typeof y === "number") {
      return direction === "asc" ? x - y : y - x;
    }

    // Sort strings
    if (typeof x === "string" && typeof y === "string") {
      return direction === "asc"
        ? x.toLowerCase().localeCompare(y.toLowerCase())
        : y.toLowerCase().localeCompare(x.toLowerCase());
    }

    // Sort dates
    if (Date.parse(x) && Date.parse(y)) {
      const xDate = Date.parse(x);
      const yDate = Date.parse(y);
      return direction === "asc" ? xDate - yDate : yDate - xDate;
    }

    // Sort booleans
    if (typeof x === "boolean" && typeof y === "boolean") {
      return direction === "asc"
        ? x === y
          ? 0
          : x
          ? -1
          : 1
        : y === x
        ? 0
        : y
        ? -1
        : 1;
    }

    // Default case (fallback)
    return direction === "asc" ? 0 : 0;
  });

  return { sortedData, direction };
};

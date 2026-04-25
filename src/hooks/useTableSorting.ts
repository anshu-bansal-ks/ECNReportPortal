import { useMemo, useState } from "react";
import { Column } from "../lib/supabase";

export function useTableSorting<T>(
  data: T[],
  columns?: Column[]
) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig || !columns) return data;

    const col = columns.find(c => c.key === sortConfig.key);
    if (!col) return data;

    return [...data].sort((a: any, b: any) => {
      let aVal = a[col.key];
      let bVal = b[col.key];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      switch (col.type) {
        case "number":
        case "currency":
        case "percentage":
          aVal = Number(String(aVal).replace(/,/g, ""));
          bVal = Number(String(bVal).replace(/,/g, ""));
          break;

        case "date":
        case "datetime":
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
          break;

        default:
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
      }

      return sortConfig.direction === "asc"
        ? aVal > bVal ? 1 : -1
        : aVal < bVal ? 1 : -1;
    });
  }, [data, sortConfig, columns]);

  return {
    sortedData,
    sortConfig,
    handleSort
  };
}

import { useMemo } from "react";

export function useFindEvent<T extends { id: number | string }>(
  data: T[],
  id: number | string ): T | undefined {
    
  const result = useMemo(() => {
    return data.find((item) => item.id === id);
  }, [data, id]);

  return result;
}

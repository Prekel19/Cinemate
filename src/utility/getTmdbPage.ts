import type { TMDBResponse } from "@/models/types";
import { getTmdbApi } from "./getTmdbApi";

export async function getTmdbPage<T>(
  endpoint: string,
  pageParam: number,
  params?: Record<string, string | number | boolean>
): Promise<{
  data: T;
  currentPage: number;
  nextPage: number | null;
}> {
  const data = await getTmdbApi<T>(endpoint, { ...params, page: pageParam });

  return {
    data,
    currentPage: pageParam,
    nextPage: pageParam + 1 < (data as TMDBResponse).total_pages ? pageParam + 1 : null,
  };
}

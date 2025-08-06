import axios from "axios";

const url: string = "https://api.themoviedb.org/3/";

export async function getTmdbApi<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  const formatedUrl: string = url + endpoint;

  const res = await axios.get<T>(formatedUrl, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      ...(params ?? {}),
    },
  });

  return res.data;
}

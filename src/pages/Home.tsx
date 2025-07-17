import { HomeCarousel } from "@/components/HomeCarousel/HomeCarousel";
import type { Trendings } from "@/models/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const Home = () => {
  const {
    data: trending,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await axios.get(url, options);
      return res.data as Trendings;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  console.log(trending.results);
  return (
    <>
      <HomeCarousel trendings={trending.results} />
    </>
  );
};

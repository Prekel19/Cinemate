import { HomeCarousel } from "@/components/HomeCarousel/HomeCarousel";
import type { Trendings } from "@/models/types";
import { getTmdbApi } from "@/utility/getTmdbApi";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const {
    data: trending,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: () =>
      getTmdbApi<Trendings>("trending/movie/day", {
        language: "en-US",
      }),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <HomeCarousel trendings={trending.results} />
    </>
  );
};

import { useEffect, useRef } from "react";
import { HomeCarousel } from "@/components/HomeCarousel/HomeCarousel";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { MediaTile } from "@/components/MediaTile/MediaTile";
import type { Trendings } from "@/models/types";
import { getTmdbApi } from "@/utility/getTmdbApi";
import { getTmdbPage } from "@/utility/getTmdbPage";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { Fade } from "react-awesome-reveal";

export const Home = () => {
  const endOfPageRef = useRef<HTMLDivElement>(null);

  const {
    data: trending,
    isPending: isTrendingPending,
    isError: isTrendingError,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: () =>
      getTmdbApi<Trendings>("trending/movie/day", {
        language: "en-US",
      }),
  });

  const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["home-discover"],
      queryFn: ({ pageParam = 1 }) =>
        getTmdbPage<Trendings>("trending/all/week", pageParam, {
          language: "en-US",
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      { rootMargin: "0px 0px 400px 0px" }
    );

    if (endOfPageRef.current && hasNextPage) {
      observer.observe(endOfPageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  if (isTrendingError || isError) {
    return <div>Error</div>;
  }

  console.log(data?.pages);

  return (
    <>
      {isTrendingPending ? (
        <div className="loading-spinner">
          <ClipLoader color="#9ca3af80" size={60} />
        </div>
      ) : (
        <Fade className="home-fade" triggerOnce>
          <HomeCarousel trendings={trending.results} />
          <SearchBar />
          <div className="home-discover media-tiles-container">
            <Fade triggerOnce>
              {data?.pages &&
                data.pages.map((page) => {
                  return page.data.results.map((item) => (
                    <MediaTile
                      key={item.id}
                      id={item.id}
                      imgUrl={item.poster_path}
                      title={item.title || item.name || ""}
                      mediaType={item.media_type}
                      rating={item.vote_average}
                      releaseDate={item.release_date || item.first_air_date || ""}
                    />
                  ));
                })}
            </Fade>
          </div>
          {(isFetchingNextPage || isPending) && (
            <div className="page-loader">
              <ClipLoader color="#9ca3af80" size={50} />
            </div>
          )}
        </Fade>
      )}
      <div ref={endOfPageRef}></div>
    </>
  );
};

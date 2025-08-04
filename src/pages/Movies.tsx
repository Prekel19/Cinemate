import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { MoviesFilters } from "@/components/MediaFilters/MoviesFilters";
import { MediaTile } from "@/components/MediaTile/MediaTile";
import { useMoviesFilterContext } from "@/context/MoviesFilterContext";
import type { MovieDiscover } from "@/models/types";
import { getTmdbPage } from "@/utility/getTmdbPage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import { ClipLoader } from "react-spinners";

export const Movies = () => {
  const { genres, year, sorting } = useMoviesFilterContext();
  const endOfPageRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies-discover", { genres, year, sorting }],
    queryFn: ({ pageParam = 1 }) =>
      getTmdbPage<MovieDiscover>("discover/movie", pageParam, {
        language: "en-US",
        with_genres: genres,
        primary_release_year: year,
        sort_by: sorting,
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

  if (isError) {
    return <div className="fetch-error">{error?.message}</div>;
  }

  return (
    <div className="movies">
      <MoviesFilters />
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="movies-discover media-tiles-container">
            <Fade triggerOnce>
              {data?.pages &&
                data.pages.map((page) =>
                  page.data.results.map((movie) => (
                    <MediaTile
                      key={movie.id}
                      id={movie.id}
                      imgUrl={movie.poster_path}
                      title={movie.title}
                      mediaType="movie"
                      rating={movie.vote_average}
                      releaseDate={movie.release_date}
                    />
                  ))
                )}
            </Fade>
          </div>
          <div ref={endOfPageRef}>
            {(isPending || isFetchingNextPage) && (
              <div className="page-loader">
                <ClipLoader color="#9ca3af80" size={50} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

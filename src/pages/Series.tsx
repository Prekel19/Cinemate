import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { SeriesFilters } from "@/components/MediaFilters/SeriesFilters";
import { MediaTile } from "@/components/MediaTile/MediaTile";
import { useSeriesFilterContext } from "@/context/SeriesFilterContext";
import type { SeriesDiscover } from "@/models/types";
import { getTmdbPage } from "@/utility/getTmdbPage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import { ClipLoader } from "react-spinners";

export const Series = () => {
  const { genres, year, sorting } = useSeriesFilterContext();

  const endOfPageRef = useRef<HTMLDivElement | null>(null);

  const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["series-discover", { genres, year, sorting }],
      queryFn: ({ pageParam = 1 }) =>
        getTmdbPage<SeriesDiscover>("discover/tv", pageParam, {
          language: "en-US",
          with_genres: genres,
          first_air_date_year: year,
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
    console.log("error");
  }

  return (
    <div className="series">
      <SeriesFilters />
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="series-discover media-tiles-container">
            <Fade triggerOnce>
              {data?.pages &&
                data.pages.map((page) =>
                  page.data.results.map((movie) => (
                    <MediaTile
                      key={movie.id}
                      id={movie.id}
                      imgUrl={movie.poster_path}
                      title={movie.name}
                      mediaType="tv"
                      rating={movie.vote_average}
                      releaseDate={movie.first_air_date}
                    />
                  ))
                )}
            </Fade>
          </div>

          <div ref={endOfPageRef}>
            {isFetchingNextPage && (
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

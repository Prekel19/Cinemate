import { MediaTile } from "@/components/MediaTile/MediaTile";
import type { MovieDiscover } from "@/models/types";
import { getTmdbPage } from "@/utility/getTmdbPage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";

export const Movies = () => {
  const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["movies-discover"],
      queryFn: ({ pageParam = 1 }) =>
        getTmdbPage<MovieDiscover>("discover/movie", pageParam, {
          language: "en-US",
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (isError) {
    console.log("error");
  }

  console.log(data?.pages);
  return (
    <Fade triggerOnce>
      <div className="movies">
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
        <div ref={ref}>
          {(isPending || isFetchingNextPage) && (
            <div className="page-loader">
              <ClipLoader color="#9ca3af80" size={50} />
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
};

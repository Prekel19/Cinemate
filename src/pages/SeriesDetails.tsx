import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { MediaBanner } from "@/components/MediaDetails/MediaBanner";
import { MediaDetailsButtons } from "@/components/MediaDetails/MediaDetailsButtons";
import { MediaDetailsOverview } from "@/components/MediaDetails/MediaDetailsOverview";
import { MediaDetailsTitle } from "@/components/MediaDetails/MediaDetailsTitle";
import { MediaHeaderInfo } from "@/components/MediaDetails/MediaHeaderInfo";
import type { Series } from "@/models/types";
import { getTmdbApi } from "@/utility/getTmdbApi";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import { useParams } from "react-router";

export const SeriesDetails = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["media-details", { id }],
    queryFn: () =>
      getTmdbApi<Series>(`/tv/${id}`, {
        language: "en-US",
      }),
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <>
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <div className="media-details">
          <Fade triggerOnce>
            <MediaBanner src={data.backdrop_path} alt={data.name} />
            <div className="media-details-content-wrapper">
              <div className="media-details-header">
                <MediaDetailsTitle title={data.name} tagline={data.tagline} />
                <MediaHeaderInfo
                  rating={data.vote_average}
                  seasons={data.number_of_seasons}
                  releaseDate={data.first_air_date}
                />
              </div>
              <MediaDetailsButtons />
              <div className="media-details-content">
                <div className="media-details-content-left">
                  <MediaDetailsOverview overview={data.overview} />
                </div>
                <div className="media-details-content-right"></div>
              </div>
            </div>
          </Fade>
        </div>
      )}
    </>
  );
};

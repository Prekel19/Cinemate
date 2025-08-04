import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { CastCarousel } from "@/components/MediaDetails/CastCarousel/CastCarousel";
import { MediaBanner } from "@/components/MediaDetails/MediaBanner";
import { MediaDetailsButtons } from "@/components/MediaDetails/MediaDetailsButtons";
import { MediaDetailsOverview } from "@/components/MediaDetails/MediaDetailsOverview";
import { MediaDetailsTitle } from "@/components/MediaDetails/MediaDetailsTitle";
import { MediaHeaderInfo } from "@/components/MediaDetails/MediaHeaderInfo";
import { SeasonList } from "@/components/MediaDetails/SeasonList/SeasonList";
import { Container } from "@/components/ui/Container/Container";
import type { Credits, Series } from "@/models/types";
import { getTmdbApi } from "@/utility/getTmdbApi";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import { useParams } from "react-router";

export const SeriesDetails = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["media-details", { id }],
    queryFn: () =>
      getTmdbApi<Series>(`tv/${id}`, {
        language: "en-US",
      }),
  });

  const {
    data: credits,
    isPending: isCreditsPending,
    isError: isCreditsError,
    error: creditsError,
  } = useQuery({
    queryKey: ["media-cast", { id }],
    queryFn: () =>
      getTmdbApi<Credits>(`tv/${id}/credits`, {
        language: "en-US",
      }),
  });

  if (isError || isCreditsError) {
    return <div className="fetch-error">{error?.message || creditsError?.message}</div>;
  }

  return (
    <>
      {isPending || isCreditsPending ? (
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
              <MediaDetailsButtons
                id={data.id}
                imgUrl={data.poster_path}
                title={data.name}
                mediaType="tv"
                rating={data.vote_average}
                releaseDate={data.first_air_date}
              />
              <div className="media-details-content">
                <div className="media-details-content-left">
                  <MediaDetailsOverview overview={data.overview} />
                  <CastCarousel cast={credits.cast} />
                  <SeasonList seasons={data.seasons} />
                </div>
                <div className="media-details-content-right">
                  <Container>
                    <h3 className="media-details-info-title">Details</h3>
                    <div className="media-details-info-section">
                      <span>{data.created_by.length > 1 ? "Creators" : "Creator"}</span>
                      <p>
                        {data.created_by.length > 0
                          ? data.created_by.map((person) => person.name).join(", ")
                          : "-"}
                      </p>
                    </div>
                    <div className="media-details-info-section">
                      <span>Status</span>
                      <p>{data.status}</p>
                    </div>
                    <div className="media-details-info-section">
                      <span>Original title</span>
                      <p>{data.original_name}</p>
                    </div>
                    <div className="media-details-info-section">
                      <span>Genres</span>
                      <p>{data.genres.map((item) => item.name).join(", ")}</p>
                    </div>
                    <div className="media-details-info-section">
                      <span>Total Episodes</span>
                      <p>{data.number_of_episodes}</p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      )}
    </>
  );
};

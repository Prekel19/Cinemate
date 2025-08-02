import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { CastCarousel } from "@/components/MediaDetails/CastCarousel/CastCarousel";
import { MediaBanner } from "@/components/MediaDetails/MediaBanner";
import { MediaDetailsButtons } from "@/components/MediaDetails/MediaDetailsButtons";
import { MediaDetailsOverview } from "@/components/MediaDetails/MediaDetailsOverview";
import { MediaDetailsTitle } from "@/components/MediaDetails/MediaDetailsTitle";
import { MediaHeaderInfo } from "@/components/MediaDetails/MediaHeaderInfo";
import { Container } from "@/components/ui/Container/Container";
import type { Credits, Movie } from "@/models/types";
import { getFormatedSum } from "@/utility/getFormatedSum";
import { getTmdbApi } from "@/utility/getTmdbApi";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import { useParams } from "react-router";

export const MovieDetails = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["media-details", { id }],
    queryFn: () =>
      getTmdbApi<Movie>(`/movie/${id}`, {
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
      getTmdbApi<Credits>(`/movie/${id}/credits`, {
        language: "en-US",
      }),
  });

  if (isError || isCreditsError) {
    return <div>Error: {error?.message || creditsError?.message}</div>;
  }

  console.log(data);
  console.log(credits);

  return (
    <>
      {isPending || isCreditsPending ? (
        <LoadingSpinner />
      ) : (
        <div className="media-details">
          <Fade triggerOnce>
            <MediaBanner src={data.backdrop_path} alt={data.title} />
            <div className="media-details-content-wrapper">
              <div className="media-details-header">
                <MediaDetailsTitle title={data.title} tagline={data.tagline} />
                <MediaHeaderInfo
                  rating={data.vote_average}
                  runtime={data.runtime}
                  releaseDate={data.release_date}
                />
              </div>
              <MediaDetailsButtons
                id={data.id}
                imgUrl={data.poster_path}
                title={data.title}
                mediaType="movie"
                rating={data.vote_average}
                releaseDate={data.release_date}
              />
              <div className="media-details-content">
                <div className="media-details-content-left">
                  <MediaDetailsOverview overview={data.overview} />
                  <CastCarousel cast={credits.cast} />
                </div>
                <div className="media-details-content-right">
                  <Container className="media-details-info">
                    <h3 className="media-details-info-title">Details</h3>
                    <div className="media-details-info-section">
                      <span>Director</span>
                      <p>{credits.crew[0].name}</p>
                    </div>
                    <div className="media-details-info-section">
                      <span>Status</span>
                      <p>{data.status}</p>
                    </div>
                    <div className="media-details-info-section">
                      <span>Original title</span>
                      <p>{data.original_title}</p>
                    </div>
                    <div className="media-details-info-section">
                      <span>Genres</span>
                      <p>{data.genres.map((item) => item.name).join(", ")}</p>
                    </div>
                  </Container>
                  <Container className="media-details-info">
                    <h3 className="media-details-info-title">Box Office</h3>
                    <div className="media-details-info-section">
                      <span>Budget</span>
                      <p>{data.budget ? getFormatedSum(data.budget) : "-"}</p>
                    </div>
                    <div className="media-details-info-section">
                      <span>Revenue</span>
                      <p>{data.revenue ? getFormatedSum(data.revenue) : "-"}</p>
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

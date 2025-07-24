import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { MediaBanner } from "@/components/MediaDetails/MediaBanner";
import { MediaDetailsButtons } from "@/components/MediaDetails/MediaDetailsButtons";
import { MediaDetailsOverview } from "@/components/MediaDetails/MediaDetailsOverview";
import { MediaDetailsTitle } from "@/components/MediaDetails/MediaDetailsTitle";
import { Container } from "@/components/ui/Container/Container";
import type { Movie } from "@/models/types";
import { getFormatedSum } from "@/utility/getFormatedSum";
import { getTmdbApi } from "@/utility/getTmdbApi";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Star } from "lucide-react";
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
            <MediaBanner src={data.backdrop_path} alt={data.title} />
            <div className="media-details-content-wrapper">
              <div className="media-details-header">
                <MediaDetailsTitle title={data.title} tagline={data.tagline} />
                <div className="media-details-header-info">
                  <p>
                    <Star size={20} color="#eab308" />
                    {Math.round(data.vote_average * 10) / 10}/10
                  </p>
                  <p>
                    <Clock size={20} color="#9ca3af" />
                    {data.runtime} min
                  </p>
                  <p>
                    <Calendar size={20} color="#9ca3af" />
                    {new Date(data.release_date).getFullYear()}
                  </p>
                </div>
              </div>
              <MediaDetailsButtons />
              <div className="media-details-content">
                <div className="media-details-content-left">
                  <MediaDetailsOverview overview={data.overview} />
                </div>
                <div className="media-details-content-right">
                  <Container className="media-details-info">
                    <h3 className="media-details-info-title">Details</h3>
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

import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { MediaBanner } from "@/components/MediaBanner/MediaBanner";
import { MediaDetailsButtons } from "@/components/MediaDetailsButtons/MediaDetailsButtons";
import type { Movie } from "@/models/types";
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
                <h2 className="media-details-title">{data.title}</h2>
                {data.tagline && (
                  <p className="media-details-tagline">"{data.tagline}"</p>
                )}
                <div className="media-details-header-info">
                  <p>
                    <Star size={24} color="#eab308" />
                    {Math.round(data.vote_average * 10) / 10}/10
                  </p>
                  <p>
                    <Clock size={24} color="#9ca3af" />
                    {data.runtime} min
                  </p>
                  <p>
                    <Calendar size={24} color="#9ca3af" />
                    {new Date(data.release_date).getFullYear()}
                  </p>
                </div>
              </div>
              <MediaDetailsButtons />
              <div className="media-details-overview">
                <h3>Overview</h3>
                <p>{data.overview}</p>
              </div>
            </div>
          </Fade>
        </div>
      )}
    </>
  );
};

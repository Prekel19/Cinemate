import type { Episode } from "@/models/types";
import { Container } from "../ui/Container/Container";
import { baseImgUrl } from "@/models/data";
import { getFormatedDate } from "@/utility/getFormatedDate";
import { Star } from "lucide-react";
import "./style.scss";

type EpisodesListProps = {
  episodes: Episode[];
};

export const EpisodesList = ({ episodes }: EpisodesListProps) => {
  return (
    <div className="episodes-list">
      {episodes.map((episode) => (
        <Container key={episode.id} className="episodes-item">
          <div className="episode-poster">
            <img
              src={`${baseImgUrl}original${episode.still_path}`}
              alt={`${episode.name} poster`}
            />
          </div>
          <div className="episode-body">
            <div className="episode-body-header">
              <p className="episode-title">{episode.name}</p>
              {episode.runtime > 0 && (
                <p className="episode-runtime">{episode.runtime} min</p>
              )}
            </div>
            {episode.air_date && (
              <span className="episode-subtitle">
                {getFormatedDate(episode.air_date)}
              </span>
            )}
            {episode.overview && <p className="episode-overview">{episode.overview}</p>}
            {episode.vote_average > 0 && <EpisodeRating rating={episode.vote_average} />}
          </div>
        </Container>
      ))}
    </div>
  );
};

const EpisodeRating = ({ rating }: { rating: number }) => {
  return (
    <div className="episode-rating">
      <Star size={20} color="#eab308" />
      <p>{Math.round(rating * 10) / 10}</p>
    </div>
  );
};

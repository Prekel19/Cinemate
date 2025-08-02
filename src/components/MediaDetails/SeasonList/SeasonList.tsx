import { Container } from "@/components/ui/Container/Container";
import type { Seasons } from "@/models/types";
import { baseImgUrl, posterSizes } from "@/models/data";
import { Star } from "lucide-react";
import "./style.scss";

type SeasonListProps = {
  seasons: Seasons[];
};

export const SeasonList = ({ seasons }: SeasonListProps) => {
  return (
    <div className="season-list">
      {seasons.map((season) => (
        <Container key={season.id} className="season-item">
          <div className="season-poster">
            <img src={`${baseImgUrl}${posterSizes.w342}${season.poster_path}`} />
          </div>
          <div className="season-body">
            <div className="season-body-header">
              <p className="season-title">{season.name}</p>
              <p className="season-episodes">
                {season.episode_count}
                {season.episode_count > 1 ? " Episodes" : " Episode"}
              </p>
            </div>
            <span className="season-subtitle">
              {new Date(season.air_date).getFullYear()}
            </span>
            {season.overview && <p className="season-overview">{season.overview}</p>}
            <div className="season-rating">
              <Star size={20} color="#eab308" />
              <p>{Math.round(season.vote_average * 10) / 10}</p>
            </div>
          </div>
        </Container>
      ))}
    </div>
  );
};

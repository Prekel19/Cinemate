import { Container } from "@/components/ui/Container/Container";
import type { Seasons } from "@/models/types";
import { baseImgUrl, posterSizes } from "@/models/data";
import { Link, useParams } from "react-router";
import { Star } from "lucide-react";
import "./style.scss";

type SeasonListProps = {
  seasons: Seasons[];
};

export const SeasonList = ({ seasons }: SeasonListProps) => {
  const { id } = useParams();

  if (seasons.length === 0) {
    return null;
  }

  return (
    <div className="seasons">
      <h3 className="seasons-title">Seasons</h3>
      <div className="season-list">
        {seasons.map((season) => (
          <Container key={season.id} className="season-item">
            <div className="season-poster">
              <Link to={`/series/${id}/season/${season.season_number}`}>
                <img
                  src={`${baseImgUrl}${posterSizes.w342}${season.poster_path}`}
                  alt={`${season.name} poster`}
                />
              </Link>
            </div>
            <div className="season-body">
              <div className="season-body-header">
                <p className="season-title">
                  <Link to={`/series/${id}/season/${season.season_number}`}>
                    {season.name}
                  </Link>
                </p>
                <p className="season-episodes">
                  {season.episode_count}
                  {season.episode_count > 1 ? " Episodes" : " Episode"}
                </p>
              </div>
              {season.air_date && (
                <span className="season-subtitle">
                  {new Date(season.air_date).getFullYear()}
                </span>
              )}
              {season.overview && <p className="season-overview">{season.overview}</p>}
              <div className="season-rating">
                <Star size={20} color="#eab308" />
                <p>{Math.round(season.vote_average * 10) / 10}</p>
              </div>
            </div>
          </Container>
        ))}
      </div>
    </div>
  );
};

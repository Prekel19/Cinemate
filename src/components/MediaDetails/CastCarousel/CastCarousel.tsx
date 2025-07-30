import type { Cast } from "@/models/types";
import { CastTile } from "./CastTile";
import "./style.scss";

type CastCarouselProps = {
  cast: Cast[];
};

export const CastCarousel = ({ cast }: CastCarouselProps) => {
  return (
    <div className="cast">
      <h3 className="cast-title">Cast</h3>
      <div className="cast-carousel">
        {cast.slice(0, 10).map((actor) => (
          <CastTile key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  );
};

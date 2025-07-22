import { Link } from "react-router";
import "./style.scss";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Star } from "lucide-react";

type MediaTileProps = {
  imgUrl: string;
  title: string;
  rating: number;
  releaseDate: string;
};

export const MediaTile = ({ imgUrl, title, rating, releaseDate }: MediaTileProps) => {
  const yearOfRelease = new Date(releaseDate).getFullYear();

  return (
    <div className="media-tile">
      <Link to="/">
        <AspectRatio className="media-tile-poster" ratio={2 / 3}>
          <img src={imgUrl ?? ""} alt={`${title} poster`} />
        </AspectRatio>
        <div className="media-tile-content">
          <h3 className="media-tile-title" title={title}>
            {title}
          </h3>
          <div className="media-tile-info">
            <p className="media-tile-rating">
              <Star size={16} color="#9ca3af" />
              {Math.round(rating * 10) / 10}
            </p>
            <p className="media-tile-release-date">{yearOfRelease}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

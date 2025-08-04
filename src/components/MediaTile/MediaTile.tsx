import { Link } from "react-router";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { baseImgUrl, posterSizes } from "@/models/data";
import { Star } from "lucide-react";
import "./style.scss";

type MediaTileProps = {
  id: number;
  imgUrl: string;
  title: string;
  rating: number;
  mediaType: string;
  releaseDate: string;
};

export const MediaTile = ({
  id,
  imgUrl,
  title,
  rating,
  mediaType,
  releaseDate,
}: MediaTileProps) => {
  const yearOfRelease = releaseDate ? new Date(releaseDate).getFullYear() : "";
  const media = mediaType === "movie" ? "movies" : "series";

  return (
    <div className="media-tile">
      <Link to={`/${media}/${id}`}>
        <AspectRatio className="media-tile-poster" ratio={2 / 3}>
          <img
            src={imgUrl && `${baseImgUrl}${posterSizes.w342}${imgUrl}`}
            alt={`${title} poster`}
          />
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

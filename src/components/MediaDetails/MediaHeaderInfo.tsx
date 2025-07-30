import { Calendar, Clock, Star, Tv } from "lucide-react";

type MediaHeaderInfoProps = {
  rating: number;
  seasons?: number;
  runtime?: number;
  releaseDate: string;
};

export const MediaHeaderInfo = ({
  rating,
  seasons,
  runtime,
  releaseDate,
}: MediaHeaderInfoProps) => {
  return (
    <div className="media-details-header-info">
      <div>
        <Star size={20} color="#eab308" />
        <p>{Math.round(rating * 10) / 10}/10</p>
      </div>
      {runtime && <Runtime runtime={runtime} />}
      {seasons && <NumberOfSeasons seasons={seasons} />}
      <div>
        <Calendar size={20} color="#9ca3af" />
        <p>{new Date(releaseDate).getFullYear()}</p>
      </div>
    </div>
  );
};

const Runtime = ({ runtime }: { runtime: number }) => {
  return (
    <div>
      <Clock size={20} color="#9ca3af" />
      <p>{runtime} min</p>
    </div>
  );
};

const NumberOfSeasons = ({ seasons }: { seasons: number }) => {
  return (
    <div>
      <Tv size={20} color="#9ca3af" />
      <p>{seasons} Seasons</p>
    </div>
  );
};

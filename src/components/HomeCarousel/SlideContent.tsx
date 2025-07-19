import type { TrendingsResults } from "@/models/types";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Info } from "lucide-react";

type SlideContentProps = {
  trending: TrendingsResults;
};

type TrendingInfoProps = {
  rating: number;
  mediaType: string;
};

export const SlideContent = ({ trending }: SlideContentProps) => {
  return (
    <div className="slide-content">
      <p className="trending-heading">Trending</p>
      <h2 className="trending-title">{trending.title}</h2>
      <p className="trending-description">{trending.overview.split(".")[0] + "."}</p>
      <TrendingInfo rating={trending.vote_average} mediaType={trending.media_type} />
      <Button className="trending-btn" asChild>
        <Link to="/">
          <Info />
          More Info
        </Link>
      </Button>
    </div>
  );
};

const TrendingInfo = ({ rating, mediaType }: TrendingInfoProps) => {
  return (
    <div className="trending-info">
      <p className="trending-rating">
        <span className="text-yellow-500">★</span> {Math.round(rating * 10) / 10}
      </p>
      <span>•</span>
      <p className="trending-type">{mediaType}</p>
    </div>
  );
};

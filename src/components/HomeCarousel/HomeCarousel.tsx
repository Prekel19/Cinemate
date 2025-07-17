import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { TrendingsResults } from "@/models/types";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Info } from "lucide-react";
import "./style.scss";

type HomeCarouselProps = {
  trendings: TrendingsResults[];
};

type TrendingInfoProps = {
  rating: number;
  mediaType: string;
};

export const HomeCarousel = ({ trendings }: HomeCarouselProps) => {
  const filteredTrendings = trendings.filter((el) => el.vote_average > 0);
  const sortedTrendings = filteredTrendings
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  return (
    <div className="home-carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        navigation
        loop
      >
        {sortedTrendings.map((trending) => (
          <SwiperSlide key={trending.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${trending.backdrop_path}`}
              alt={trending.title}
            />
            <div className="slide-gradient"></div>
            <div className="slide-content">
              <p className="trending-heading">Trending</p>
              <h2 className="trending-title">{trending.title}</h2>
              <p className="trending-description">
                {trending.overview.split(".")[0] + "."}
              </p>
              <TrendingInfo
                rating={trending.vote_average}
                mediaType={trending.media_type}
              />
              <Button className="trending-btn" asChild>
                <Link to="/">
                  <Info />
                  More Info
                </Link>
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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

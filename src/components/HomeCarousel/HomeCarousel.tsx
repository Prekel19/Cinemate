import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { TrendingsResults } from "@/models/types";
import { SlideContent } from "./SlideContent";
import { AsyncImage } from "loadable-image";
import "./style.scss";

type HomeCarouselProps = {
  trendings: TrendingsResults[];
};

export const HomeCarousel = ({ trendings }: HomeCarouselProps) => {
  const filteredTrendings = trendings.filter((el) => el.vote_average > 0);
  const sortedTrendings = filteredTrendings
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  return (
    <div className="home-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        touchStartPreventDefault={false}
        pagination={{ clickable: true }}
        speed={800}
        slidesPerView={1}
        autoplay={{ delay: 7000 }}
        navigation
        loop
      >
        {sortedTrendings.map((trending) => (
          <SwiperSlide key={trending.id}>
            <AsyncImage
              src={`https://image.tmdb.org/t/p/original/${trending.backdrop_path}`}
              style={{ width: 1920, height: 1080 }}
              loader={<div style={{ background: "#000" }} />}
              alt={trending.title}
            />
            <div className="slide-gradient"></div>
            <SlideContent trending={trending} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

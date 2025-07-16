import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { TrendingsResults } from "@/models/types";
import "./style.scss";

type HomeCarouselProps = {
  trendings: TrendingsResults[];
};

export const HomeCarousel = ({ trendings }: HomeCarouselProps) => {
  return (
    <div className="home-carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        navigation
        loop
      >
        {trendings.map((trending) => (
          <SwiperSlide key={trending.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${trending.backdrop_path}`}
              alt={trending.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

import "./style.scss";

type MediaBannerProps = {
  src: string;
  alt: string;
};

export const MediaBanner = ({ src, alt }: MediaBannerProps) => {
  return (
    <div className="media-details-banner">
      <img src={`https://image.tmdb.org/t/p/original${src}`} alt={alt} />
      <div className="media-details-banner-gradient"></div>
    </div>
  );
};

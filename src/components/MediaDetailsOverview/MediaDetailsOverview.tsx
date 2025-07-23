import "./style.scss";

type MediaDetailsOverviewProps = {
  overview: string;
};

export const MediaDetailsOverview = ({ overview }: MediaDetailsOverviewProps) => {
  return (
    <div className="media-details-overview">
      <h3 className="media-details-overview-title">Overview</h3>
      <p className="media-details-overview-desc">{overview}</p>
    </div>
  );
};

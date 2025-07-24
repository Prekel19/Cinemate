import "./style.scss";

type MediaDetailsTitleProps = {
  title: string;
  tagline: string | null;
};

export const MediaDetailsTitle = ({ title, tagline }: MediaDetailsTitleProps) => {
  return (
    <>
      <h2 className="media-details-title">{title}</h2>
      {tagline && <p className="media-details-tagline">"{tagline}"</p>}
    </>
  );
};

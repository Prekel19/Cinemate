import { MediaTile } from "@/components/MediaTile/MediaTile";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Fade } from "react-awesome-reveal";

export const Watchlist = () => {
  const { watchlist } = useWatchlist();

  if (!watchlist.length) {
    return (
      <div className="watchlist">
        <p className="text-center pt-6">You haven't added any movies or series yet</p>
      </div>
    );
  }

  return (
    <div className="watchlist media-tiles-container">
      <Fade triggerOnce>
        {watchlist.map((item) => (
          <MediaTile
            key={item.id}
            id={item.id}
            imgUrl={item.imgUrl}
            title={item.title}
            mediaType={item.mediaType}
            rating={item.rating}
            releaseDate={item.releaseDate}
          />
        ))}
      </Fade>
    </div>
  );
};

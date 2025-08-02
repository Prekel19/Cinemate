import { Button } from "../ui/button";
import { Bookmark, Share } from "lucide-react";
import type { Watchlist } from "@/models/types";
import { useWatchlist } from "@/hooks/useWatchlist";
import { toast } from "sonner";
import "./style.scss";

export const MediaDetailsButtons = ({
  id,
  imgUrl,
  title,
  mediaType,
  rating,
  releaseDate,
}: Watchlist) => {
  const { updateWatchlist, isOnWatchlist } = useWatchlist();

  const handleWatchlist = () => {
    updateWatchlist(id, imgUrl, title, mediaType, rating, releaseDate);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link has been copied!");
  };

  return (
    <div className="media-details-buttons">
      <Button className="media-details-button watchlist-btn" onClick={handleWatchlist}>
        <Bookmark size={24} color={isOnWatchlist(id) ? "#eab308" : "#ffffff"} />
        Add to Watchlist
      </Button>
      <Button className="media-details-button share-btn" onClick={handleCopy}>
        <Share size={24} /> Share
      </Button>
    </div>
  );
};

import { Bookmark, Share } from "lucide-react";
import { Button } from "../ui/button";
import "./style.scss";

export const MediaDetailsButtons = () => {
  return (
    <div className="media-details-buttons">
      <Button className="media-details-button watchlist">
        <Bookmark size={24} />
        Add to Watchlist
      </Button>
      <Button className="media-details-button share">
        <Share size={24} /> Share
      </Button>
    </div>
  );
};

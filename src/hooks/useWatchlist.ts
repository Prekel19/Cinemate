import type { Watchlist } from "@/models/types";
import { useState } from "react";

export const useWatchlist = () => {
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState<boolean>(false);

  const watchlist: Watchlist[] = JSON.parse(localStorage.getItem("watchlist") ?? "[]");
  const watchlistIds: number[] = JSON.parse(
    localStorage.getItem("watchlist-ids") ?? "[]"
  );

  const updateWatchlist = (
    id: number,
    imgUrl: string,
    title: string,
    mediaType: "movie" | "tv",
    rating: number,
    releaseDate: string
  ) => {
    if (isOnWatchlist(id)) {
      const index = watchlistIds.indexOf(id);

      watchlist.splice(index, 1);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));

      watchlistIds.splice(index, 1);
      localStorage.setItem("watchlist-ids", JSON.stringify(watchlistIds));

      setIsAddedToWatchlist(false);
    } else {
      watchlist.push({
        id: id,
        imgUrl: imgUrl,
        title: title,
        mediaType: mediaType,
        rating: rating,
        releaseDate: releaseDate,
      });
      localStorage.setItem("watchlist", JSON.stringify(watchlist));

      watchlistIds.push(id);
      localStorage.setItem("watchlist-ids", JSON.stringify(watchlistIds));

      setIsAddedToWatchlist(true);
    }
  };

  const isOnWatchlist = (id: number): boolean => {
    return watchlistIds.includes(id) || isAddedToWatchlist ? true : false;
  };

  return { watchlist, updateWatchlist, isOnWatchlist };
};

import { EpisodesList } from "@/components/EpisodesList/EpisodesList";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { MediaBanner } from "@/components/MediaDetails/MediaBanner";
import type { Series, Season as SeasonResults } from "@/models/types";
import { getTmdbApi } from "@/utility/getTmdbApi";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import { useParams } from "react-router";

export const Season = () => {
  const { id, seasonNumber } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["media-details", { id }],
    queryFn: () =>
      getTmdbApi<Series>(`tv/${id}`, {
        language: "en-US",
      }),
  });

  const {
    data: season,
    isPending: isSeasonPending,
    isError: isSeasonError,
  } = useQuery({
    queryKey: ["season", { id, seasonNumber }],
    queryFn: () =>
      getTmdbApi<SeasonResults>(`tv/${id}/season/${seasonNumber}`, {
        lanuage: "en-US",
      }),
  });

  if (isError || isSeasonError) {
    return null;
  }

  return (
    <>
      {isPending || isSeasonPending ? (
        <LoadingSpinner />
      ) : (
        <div className="season">
          <Fade triggerOnce>
            <MediaBanner src={data.backdrop_path} alt={data.name} />
            <h2 className="season-title">{season.name}</h2>
            <EpisodesList episodes={season.episodes} />
          </Fade>
        </div>
      )}
    </>
  );
};

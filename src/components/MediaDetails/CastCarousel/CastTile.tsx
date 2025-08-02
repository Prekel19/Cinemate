import { AspectRatio } from "@/components/ui/aspect-ratio";
import { baseImgUrl, profileSizes } from "@/models/data";
import type { Cast } from "@/models/types";

type CastTileProps = {
  actor: Cast;
};

export const CastTile = ({ actor }: CastTileProps) => {
  return (
    <div className="cast-tile">
      <AspectRatio className="cast-tile-profile" ratio={2 / 3}>
        <img src={`${baseImgUrl}${profileSizes.w185}${actor.profile_path}`} />
      </AspectRatio>
      <div className="cast-tile_body">
        <h3 className="cast-tile-name">{actor.name}</h3>
        <h4 className="cast-tile-character">{actor.character}</h4>
      </div>
    </div>
  );
};

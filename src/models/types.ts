import type { backdropSizes, posterSizes, profileSizes } from "./data";

export type PosterSize = keyof typeof posterSizes;
export type backdropSize = keyof typeof backdropSizes;
export type ProfileSize = keyof typeof profileSizes;

export type TMDBResponse = {
  page: number;
  total_pages: number;
  total_results: number;
};

export type Trendings = TMDBResponse & {
  results: TrendingsResults[];
};

export type TrendingsResults = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  name?: string;
  original_name?: string;
  title?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date?: string;
  release_date?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Search = TMDBResponse & {
  results: SearchResults[];
};

export type SearchResults = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name?: string;
  original_name?: string;
  title?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

// MOVIE
export type Genres = {
  id: number;
  name: string;
};

export type ProductionCompanies = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountries = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// TV
export type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string | null;
};

export type LastEpisodeToAir = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
};

export type Networks = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type Seasons = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type Series = {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genres[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: Networks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  seasons: Seasons[];
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: number;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export type Watchlist = {
  id: number;
  imgUrl: string;
  title: string;
  rating: number;
  mediaType: "movie" | "tv";
  releaseDate: string;
};

export type MovieResults = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  title: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SeriesResults = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  name: string;
  original_name: string;
  origin_country: string[];
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDiscover = TMDBResponse & {
  results: MovieResults[];
};

export type SeriesDiscover = TMDBResponse & {
  results: SeriesResults[];
};

export type Sorting = {
  name: string;
  value: string;
};

export type FilterContext = {
  onGenresChange: (val: string) => void;
  genres: string;
  onYearChange: (val: string) => void;
  year: string;
  onSortingChange: (val: string) => void;
  sorting: string;
};

export type Episode = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: Crew[];
  guest_stars: Cast[];
};

export type Season = {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type MenuItems = {
  name: string;
  path: string;
};

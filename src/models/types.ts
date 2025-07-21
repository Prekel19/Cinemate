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
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
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

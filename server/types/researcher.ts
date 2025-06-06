export interface Researcher {
  id: number;
  name: string;
  affiliation: string;
  keywords: string[];
  profileUrl: string;
  matchScore?: number;
}

export interface SearchResponse {
  researchers: Researcher[];
  query: string;
}
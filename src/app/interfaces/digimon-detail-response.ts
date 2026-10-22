export interface DigimonEvolution {
  id: number;
  digimon: string;
  condition: string;
  image: string;
  url: string;
}

export interface DigimonDetailResponse {
  id: number;
  name: string;
  xAntibody: boolean;
  images: { href: string; transparent: boolean }[];
  levels: { id: number; level: string }[];
  types: { id: number; type: string }[];
  attributes: { id: number; attribute: string }[];
  fields: { id: number; field: string; image: string }[];
  releaseDate: string;
  descriptions: { origin: string; language: string; description: string }[];
  skills: { id: number; skill: string; translation: string; description: string }[];
  priorEvolutions: DigimonEvolution[];
  nextEvolutions: DigimonEvolution[];
}

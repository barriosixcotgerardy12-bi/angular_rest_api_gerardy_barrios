export interface NamedResource {
  name: string;
  url: string;
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;            // decímetros
  weight: number;            // hectogramos
  base_experience: number | null;
  species: NamedResource;
  types: { slot: number; type: NamedResource }[];
  abilities: { ability: NamedResource; is_hidden: boolean; slot: number }[];
  stats: { base_stat: number; effort: number; stat: NamedResource }[];
  moves: { move: NamedResource }[];
  sprites: {
    front_default: string | null;
    other?: { 'official-artwork'?: { front_default: string | null } };
  };
}

export interface PokemonSpeciesResponse {
  is_legendary: boolean;
  is_mythical: boolean;
  genera: { genus: string; language: NamedResource }[];
  flavor_text_entries: { flavor_text: string; language: NamedResource; version: NamedResource }[];
}
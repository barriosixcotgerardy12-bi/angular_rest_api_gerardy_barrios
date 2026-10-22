export interface DemonSlayerCharacterItem {
  id: number;
  name: string;
  age: number | null;
  gender: string;
  race: string;
  description: string;
  img: string;
  affiliation_id: number | null;
  arc_id: number | null;
  quote: string;
}

export interface DemonSlayerPagination {
  totalElements: number;
  elementsOnPage: number;
  currentPage: number;
  totalPages: number;
  previousPage: string;
  nextPage: string;
}

export interface DemonSlayerListResponse {
  pagination: DemonSlayerPagination;
  content: DemonSlayerCharacterItem[];
}

export interface DemonSlayerArc {
  name: string;
  description?: string;
}

export interface DemonSlayerAffiliation {
  name: string;
  description?: string;
}

export interface DemonSlayerCombatStyle {
  id: number;
  name: string;
  description?: string;
  img?: string;
}

export interface DemonSlayerDetailItem {
  id: number;
  name: string;
  age?: number | null;
  gender?: string;
  race?: string;
  description?: string;
  img?: string;
  quote?: string;
  first_arc_appearance?: DemonSlayerArc | null;
  affiliation?: DemonSlayerAffiliation | null;
  combat_style?: DemonSlayerCombatStyle[];
}

export interface DemonSlayerDetailResponse {
  content: DemonSlayerDetailItem[];
}
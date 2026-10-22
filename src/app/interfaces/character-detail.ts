export interface DetailField {
  label: string;
  value: string | number;
}

export interface DetailItem {
  name: string;
  text?: string;
}

export interface DetailGroup {
  title: string;
  items: DetailItem[];
}

export interface DetailRelationItem {
  id: number;
  name: string;
  image?: string;
  condition?: string;
}

export interface DetailRelation {
  title: string;
  items: DetailRelationItem[];
}

export interface CharacterDetail {
  id: number;
  name: string;
  image: string | null;
  description?: string;
  fields: DetailField[];
  groups: DetailGroup[];
  relations: DetailRelation[];
}
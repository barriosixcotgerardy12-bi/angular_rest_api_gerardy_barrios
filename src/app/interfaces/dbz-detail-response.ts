import {DbzCharacterItem} from './dbz-response';

export interface DbzPlanet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deletedAt: string | null;
}

export interface DbzTransformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: string | null;
}

export interface DbzDetailResponse extends DbzCharacterItem {
  originPlanet?: DbzPlanet | null;
  transformations?: DbzTransformation[];
}
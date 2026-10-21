export interface DigimonListItem {
  id: number;
  name: string;
  href: string;
  image: string;
}

export interface DigimonPageable {
  currentPage: number;
  elementsOnPage: number;
  totalElements: number;
  totalPages: number;
  previousPage: string;
  nextPage: string;
}

export interface DigimonListResponse {
  content: DigimonListItem[];
  pageable: DigimonPageable;
}
export interface Camper {
  id: string;
  name: string;
  coverImage: string;
  price: number;
  totalReviews: number;
  location: string;
  rating: number;
  description: string;
  form: "alcove" | "panel_van" | "integrated" | "semi_integrated";
  transmission: "automatic" | "manual";
  engine: "diesel" | "petrol" | "hybrid" | "electric";
}

export interface CamperResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface GetCampers {
  page?: number;
  perPage?: number;
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
}

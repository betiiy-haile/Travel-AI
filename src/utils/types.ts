interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Geometry {
  location: Location;
  viewport: Viewport;
}

interface OpeningHours {
  open_now: boolean;
  weekday_text?: string[];
}

interface Photo {
  photo_reference: string;
  width: number;
  height: number;
}

export interface Place {
  business_status: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  rating?: number;
  reference: string;
  types: string[];
  user_ratings_total?: number;
  vicinity: string;
}

type OverpassNode = {
  type: "node";
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
};

type OverpassWay = {
  type: "way";
  id: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

type OverpassRelation = {
  type: "relation";
  id: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

export type OverpassElement = OverpassNode | OverpassWay | OverpassRelation;

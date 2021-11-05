export interface CryptoNews {
  _type: string;
  readLink: string;
  queryContext: QueryContext;
  totalEstimatedMatches: number;
  sort: Sort[];
  value: Value[];
}

export interface QueryContext {
  _type: string;
  originalQuery: string;
  adultIntent: boolean;
}

export interface Sort {
  _type: string;
  name: string;
  id: string;
  isSelected: boolean;
  url: string;
}

export interface Value {
  _type: string;
  name: string;
  url: string;
  image: Image;
  description: string;
  about?: About[];
  provider: Provider[];
  datePublished: string;
  category?: string;
  mentions?: Mention[];
}

export interface Image {
  _type: string;
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  _type: string;
  contentUrl: string;
  width: number;
  height: number;
}

export interface About {
  _type: string;
  readLink: string;
  name: string;
}

export interface Provider {
  _type: string;
  name: string;
  image: Image2;
}

export interface Image2 {
  _type: string;
  thumbnail: Thumbnail2;
}

export interface Thumbnail2 {
  _type: string;
  contentUrl: string;
}

export interface Mention {
  _type: string;
  name: string;
}

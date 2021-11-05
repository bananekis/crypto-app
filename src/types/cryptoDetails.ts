export interface CryptoDetails {
  status: string;
  data: Data;
}

export interface Data {
  base: Base;
  coin: Coin;
}

export interface Base {
  symbol: string;
  sign: string;
}

export interface Coin {
  id: number;
  uuid: string;
  slug: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconType: string;
  iconUrl: string;
  websiteUrl: string;
  socials: Social[];
  links: Link[];
  confirmedSupply: boolean;
  numberOfMarkets: number;
  numberOfExchanges: number;
  type: string;
  volume: number;
  marketCap: number;
  price: number;
  circulatingSupply: number;
  totalSupply: number;
  approvedSupply: boolean;
  firstSeen: number;
  listedAt: number;
  change: number;
  rank: number;
  history: string[];
  allTimeHigh: AllTimeHigh;
  penalty: boolean;
}

export interface Social {
  name: string;
  url: string;
  type: string;
}

export interface Link {
  name: string;
  type: string;
  url: string;
}

export interface AllTimeHigh {
  price: number;
  timestamp: number;
}

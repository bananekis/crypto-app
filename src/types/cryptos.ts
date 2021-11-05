export interface Cryptos {
  status: string;
  data: Data;
}

export interface Data {
  stats: Stats;
  base: Base;
  coins: Coin[];
}

export interface Stats {
  total: number;
  offset: number;
  limit: number;
  order: string;
  base: string;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: number;
  total24hVolume: number;
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
  color?: string;
  iconType: string;
  iconUrl: string;
  websiteUrl?: string;
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

export interface CryptoExchanges {
  status: string;
  data: Data;
}

export interface Data {
  stats: Stats;
  currencies: Currency[];
  exchanges: Exchange[];
}

export interface Stats {
  volume: number;
  total: number;
  limit: number;
  offset: number;
}

export interface Currency {
  id: number;
  uuid: string;
  type: string;
  iconUrl: string;
  name: string;
  symbol: string;
  sign: string;
}

export interface Exchange {
  id: number;
  uuid: string;
  name: string;
  description?: string;
  iconUrl: string;
  verified: boolean;
  lastTickerCreatedAt: number;
  numberOfMarkets: number;
  volume: number;
  websiteUrl: string;
  rank: number;
  marketShare: number;
}

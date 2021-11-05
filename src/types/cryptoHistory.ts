export interface CryptoHistory {
  status: string;
  data: Data;
}

export interface Data {
  change: number;
  history: History[];
}

export interface History {
  price: string;
  timestamp: number;
}

import { CryptoDetails } from "../types/cryptoDetails";
import { CryptoExchanges } from "../types/cryptoExchanges";
import { CryptoHistory } from "../types/cryptoHistory";
import { Cryptos } from "../types/cryptos";
import { baseUrl, cryptoApiHeaders } from "../config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<Cryptos, number>({
      query: (count: number) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<CryptoDetails, string>({
      query: (coinId: string) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<
      CryptoHistory,
      { coinId: string; timePeriod: string }
    >({
      query: ({ coinId, timePeriod }: { coinId: string; timePeriod: string }) =>
        createRequest(`/coin/${coinId}/history/${timePeriod}`),
    }),
    getExchanges: builder.query<CryptoExchanges, any>({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;

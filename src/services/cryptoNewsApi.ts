import { CryptoNews } from "../types/cryptoNews";
import { SelectValue } from "antd/lib/select";
import { baseUrlNews, cryptoNewsHeaders } from "../config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlNews }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<
      CryptoNews,
      {
        newsCategory: SelectValue;
        count: number;
      }
    >({
      query: ({
        newsCategory,
        count,
      }: {
        newsCategory: SelectValue;
        count: number;
      }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

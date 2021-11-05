import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import { SelectValue } from "antd/lib/select";
import { color } from "../../config";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { useState } from "react";
import Loader, { Div } from "../dumb_components/Loader";
import moment from "moment";
import styled from "styled-components";

const Img = styled.img`
  width: 25%;
`;

const DivArticleInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DivArticleHeader = styled.div`
  display: flex;
  margin-bottom: 1em;
  align-items: center;
`;

const DivArticleHeaderTitle = styled.div`
  padding-right: 20px;
`;

const P = styled.p`
  color: ${color.black};
`;

const { Text, Title } = Typography;
const { Option } = Select;

type Props = {
  simplified?: boolean;
};

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }: Props) => {
  const [newsCategory, setNewsCategory] =
    useState<SelectValue>("Cryptocurrency");

  const { data: cryptosList } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (isFetching || !cryptosList || !cryptoNews) return <Loader />;
  else if (cryptoNews.value.length === 0) {
    return <Div>Neboli nájdené žiadne kryptomeny</Div>;
  }

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            placeholder="Vyber Krypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => {
              return (
                option?.children.toLowerCase().indexOf(input.toLowerCase()) > 0
              );
            }}
            style={{ width: "200px" }}
          >
            <Option value="Cryptocurrency">Všetko</Option>
            {cryptosList.data.coins.map((currency) => (
              <Option value={currency.name} key={currency.id}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}

      {cryptoNews.value.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable>
            <a href={news.url} target="_blank" rel="noreferrer">
              <DivArticleHeader>
                <DivArticleHeaderTitle>
                  <Title level={4}>{news.name}</Title>
                </DivArticleHeaderTitle>
                <Img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </DivArticleHeader>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <DivArticleInfo>
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news"
                    style={{ marginRight: ".5em" }}
                  />
                  <Text>{news.provider[0]?.name}</Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("seconds").fromNow()}
                </Text>
              </DivArticleInfo>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;

import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Col, Row, Select, Typography } from "antd";
import { color } from "../../config";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";
import Loader from "../dumb_components/Loader";
import millify from "millify";
import styled from "styled-components";

const { Title, Text } = Typography;
const { Option } = Select;

const TitleMain = styled(Title)`
  display: flex;
  justify-content: center;
`;

const PCryptoInfo = styled.p`
  display: flex;
  justify-content: center;
`;

const ColHeading = styled(Col)`
  border-bottom: 1px solid ${color.ghostWhite};
  margin-bottom: 2em;
`;

const ColStatistics = styled(Col)`
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin-bottom: 3em;

  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

const ColValues = styled(Col)`
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
  padding: 10px;
  border-bottom: 1px solid ${color.ghostWhite};
`;

const TitleParser = styled(Title)`
  margin: 0 !important;
  & > p {
    color: ${color.grey};
    padding-right: 100px;

    @media (max-width: 430px) {
      padding-right: 0px;
    }
  }
`;

const ColCryptoInfo = styled(Col)`
  display: flex;

  @media (max-width: 430px) {
    flex-direction: column;
    padding-right: 0px;
  }
`;

const CryptoDetails = () => {
  const [timePeriod, setTimePeriod] = useState<string>("7d");

  const { coinId } = useParams<{ coinId: string }>();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  const cryptoDetails = data?.data.coin;

  if (isFetching || !cryptoDetails || !coinHistory) {
    return <Loader />;
  }

  const time = ["24h", "7d", "30d", "1y", "5y"];

  const stats = [
    {
      title: "Cena v USD",
      value: `$${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Trhová Kapitalizácia",
      value: `$${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Najvyššia dosiahnutá hodnota (denný priemer)",
      value: `$${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Počet Marketplacov",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Počet Výmien",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Schválené Zásobovanie",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Celková Ponuka",
      value: `$${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Cirkulujúce Zásobovanie",
      value: `$${
        cryptoDetails.circulatingSupply === null
          ? "null"
          : millify(cryptoDetails.circulatingSupply)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col>
      <Col>
        <ColHeading>
          <TitleMain level={2}>
            {cryptoDetails.name} ({cryptoDetails.slug}) Cena
          </TitleMain>
          <PCryptoInfo>
            {cryptoDetails.name} aktuálna cena v US dolároch. Pozri štatistiky,
            trhové kapitalizácie a zásobovanie.
          </PCryptoInfo>
        </ColHeading>
        <Select
          defaultValue="7d"
          placeholder="select time period"
          onChange={(value) => setTimePeriod(value)}
          style={{ width: "200px", marginBottom: "2em" }}
        >
          {time.map((date) => (
            <Option key={date} value={date}>
              {date}
            </Option>
          ))}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />
        <ColStatistics>
          <Col>
            <Col>
              <Title level={3}>{cryptoDetails.name} Štatistiky</Title>
              <p>Údaje týkajúce sa štatistík kryptomeny {cryptoDetails.name}</p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <ColValues key={title}>
                <Col>
                  <Text>{icon}</Text>
                  <Text style={{ padding: "0 25px 0 10px" }}>{title}</Text>
                </Col>
                <Text strong>{value}</Text>
              </ColValues>
            ))}
          </Col>
          <Col>
            <Col>
              <Title level={3}>Ostatné</Title>
              <p>Zhrnutie štatistík všetkých kryptomien</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <ColValues key={title}>
                <Col>
                  <Text>{icon}</Text>
                  <Text style={{ padding: "0 25px 0 10px" }}>{title}</Text>
                </Col>
                <Text strong>{value}</Text>
              </ColValues>
            ))}
          </Col>
        </ColStatistics>
      </Col>
      <ColCryptoInfo>
        <Row style={{ marginBottom: "2em", flex: "0.8" }}>
          <Title level={3}>What is {cryptoDetails.name}</Title>
          <TitleParser level={5}>
            {HTMLReactParser(cryptoDetails.description)}
          </TitleParser>
        </Row>
        <Col style={{ flex: "0.2" }}>
          <Title level={3}>{cryptoDetails.name} Links</Title>
          {cryptoDetails.links.map((link, index) => (
            <ColValues key={index}>
              <Title level={5}>{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </ColValues>
          ))}
        </Col>
      </ColCryptoInfo>
    </Col>
  );
};

export default CryptoDetails;

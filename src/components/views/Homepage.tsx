import { Col, Row, Statistic, Typography } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Cryptocurrencies from "../smart_components/Cryptocurrencies";
import Loader from "../dumb_components/Loader";
import News from "../smart_components/News";
import millify from "millify";
import styled from "styled-components";

const { Title } = Typography;

const DivTop10 = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const TitleMain = styled(Title)`
  @media (max-width: 430px) {
    text-align: center;
    width: 70%;
    font-size: 1.6em !important;
  } ;
`;

const TitleSecond = styled(Title)`
  @media (max-width: 430px) {
    font-size: 1.2em !important;
  } ;
`;

export const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data.stats;

  if (isFetching || !globalStats) {
    return <Loader />;
  }

  return (
    <>
      <Title level={2}>Globálne Štatistiky Kryptomien</Title>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Statistic
            title="Počet všetkých kryptomien"
            value={globalStats.total}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Celková Trhová Kapitalizácia"
            value={millify(globalStats.totalMarketCap)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Počet Marketov"
            value={millify(globalStats.totalMarkets)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Počet marketingeových výmien"
            value={millify(globalStats.totalExchanges)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic title="24h Nárast" value={"..."}></Statistic>
        </Col>
      </Row>
      <DivTop10>
        <TitleMain level={2}>Top 10 Kryptomien na svete</TitleMain>
        <TitleSecond level={3}>
          <Link to="/cryptocurrencies">Ukáž viac</Link>
        </TitleSecond>
      </DivTop10>
      <Cryptocurrencies simplified />
      <DivTop10>
        <TitleMain level={2}>Aktuality z Krypto sveta</TitleMain>
        <TitleSecond level={3}>
          <Link to="/news">Ukáž viac</Link>
        </TitleSecond>
      </DivTop10>
      <News simplified />
    </>
  );
};

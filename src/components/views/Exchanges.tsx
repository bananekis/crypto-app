import { Avatar, Col, Collapse, Row, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import styled from "styled-components";

import { useGetExchangesQuery } from "../../services/cryptoApi";
import Loader from "../dumb_components/Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Strong = styled.strong`
  margin-right: 0.5em;
  margin-left: 0.5em;

  @media (max-width: 430px) {
    font-size: 0.8em;
    display: block;
    text-align: center;
  }
`;

const RowHeader = styled(Row)`
  padding: 12px 16px;

  @media (max-width: 430px) {
    text-align: center;
    align-items: center;
  }
`;

const RowList = styled(Row)`
  @media (max-width: 430px) {
    align-items: center;
    text-align: center;
  }
`;

const ColPlatform = styled(Col)`
  @media (max-width: 430px) {
    text-align: center;
  }
`;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery([]);
  const exchangesList = data?.data.exchanges;

  if (isFetching || !exchangesList) return <Loader />;

  return (
    <>
      <RowHeader>
        <Col span={6}>Platformy</Col>
        <Col span={6}>Pohyb v priebehu 24h</Col>
        <Col span={6}>Markety</Col>
        <Col span={6}>Zmeny</Col>
      </RowHeader>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <RowList key={exchange.id}>
                    <ColPlatform span={6}>
                      <Text>
                        <Strong>{exchange.rank}.</Strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <Strong>{exchange.name}</Strong>
                      </Text>
                    </ColPlatform>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </RowList>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;

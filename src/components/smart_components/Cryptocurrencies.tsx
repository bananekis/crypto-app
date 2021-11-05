import { Card, Col, Input, Row } from "antd";
import { Coin } from "../../types/cryptos";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Loader from "../dumb_components/Loader";
import millify from "millify";
import styled from "styled-components";

const Img = styled.img`
  width: 50px;
`;

export const DivSearch = styled.div`
  width: 15%;
  margin-bottom: 1.5em;
`;

type Props = {
  simplified?: boolean;
};

const Cryptocurrencies = ({ simplified }: Props) => {
  const count = simplified ? 10 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState<Coin[] | undefined>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const filteredData = cryptosList?.data.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchValue]);

  if (isFetching || !cryptos) {
    return <Loader />;
  }

  return (
    <Row gutter={[32, 32]}>
      {!simplified && (
        <Col span={24}>
          <Input
            placeholder="Hľadaj Kryptomenu"
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: "200px" }}
          />
        </Col>
      )}
      {cryptos.map((currency) => (
        <Col xs={24} sm={12} lg={6} key={currency.id}>
          <Link to={`/crypto/${currency.id}`}>
            <Card
              title={`${currency.rank}. ${currency.name}`}
              extra={<Img src={currency.iconUrl} />}
              hoverable
            >
              <p>Cena: {millify(currency.price)}</p>
              <p>Trhová Kapitalizácia: {millify(currency.marketCap)}</p>
              <p>Denná Zmena: {millify(currency.change)}%</p>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default Cryptocurrencies;

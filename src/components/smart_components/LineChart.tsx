import { Col, Row, Typography } from "antd";
import { CryptoHistory } from "../../types/cryptoHistory";
import { Line } from "react-chartjs-2";
import { color } from "../../config";
import styled from "styled-components";

const ColInfo = styled(Col)`
  display: flex;
  align-items: baseline;
`;

const ColMain = styled(Col)`
  margin-bottom: 1em;
`;

const { Title } = Typography;

type Props = {
  coinHistory: CryptoHistory;
  currentPrice: string;
  coinName: string;
};

const LineChart = ({ coinHistory, currentPrice, coinName }: Props) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < coinHistory.data.history.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimeStamp.push(
      new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Cena v USD",
        data: coinPrice,
        fill: false,
        backgroundColor: color.blue,
        borderColor: color.blue,
      },
    ],
  };

  const options = {
    scales: {
      id: {
        beginAtZero: true,
      },
    },
  };

  return (
    <ColMain>
      <Row align="middle" justify="space-between">
        <Title level={2} style={{ margin: 0 }}>
          {coinName} Cenový Graf
        </Title>
        <ColInfo>
          <Title level={5} style={{ marginRight: "1em" }}>
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5}>
            Aktuálna {coinName} Cena: ${currentPrice}
          </Title>
        </ColInfo>
      </Row>
      <Line data={data} options={options} />
    </ColMain>
  );
};

export default LineChart;

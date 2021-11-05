import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import { color } from "../../config";

const { Title } = Typography;

const Footer = () => {
  return (
    <>
      <Title level={5} style={{ color: color.white, textAlign: "center" }}>
        KryptoBaroni <br />
        Všetky práva vyhradené.
      </Title>
      <Space>
        <Link to="/">Domov</Link>
        <Link to="/exchanges">Platformy</Link>
        <Link to="/news">Aktuality</Link>
      </Space>
    </>
  );
};

export default Footer;

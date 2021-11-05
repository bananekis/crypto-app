import { Avatar, Button, Menu, Typography } from "antd";
import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { color } from "../../config";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import styled from "styled-components";

const DivNavWrapper = styled.div`
  position: relative;
  left: 0;
  margin: 10px;
  height: 100vh;
  margin: 0px;
  background-color: ${color.oceanBlue};
  color: ${color.white};

  @media (max-width: 430px) {
    height: auto;
  }
`;

const DivLogo = styled.div`
  display: flex;
  align-items: flex-start;
`;

const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonStyled = styled(Button)`
  display: none;
  margin-top: 0.4em;
  @media (max-width: 430px) {
    display: block;
  }
`;

const { Title } = Typography;

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number>(1960);

  const location = useLocation();

  const key =
    location.pathname.split("/")[1] === "crypto"
      ? "cryptocurrencies"
      : location.pathname.split("/")[1];

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 430) {
      setActiveMenu(false);
    } else setActiveMenu(true);
  }, [screenSize]);

  return (
    <DivNavWrapper>
      <DivWrapper>
        <DivLogo>
          <Avatar src={logo} size="large" style={{ marginRight: ".5em" }} />
          <Title level={2}>
            <Link to="/">KryptoBaroni</Link>
          </Title>
        </DivLogo>
        <ButtonStyled onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </ButtonStyled>
      </DivWrapper>
      {activeMenu && (
        <Menu theme="dark" selectedKeys={[key]}>
          <Menu.Item icon={<HomeOutlined />} key="">
            <Link to="/">Domov</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key="cryptocurrencies">
            <Link to="/cryptocurrencies">Kryptomeny</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />} key="exchanges">
            <Link to="/exchanges">Platformy</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />} key="news">
            <Link to="/news">Aktuality</Link>
          </Menu.Item>
        </Menu>
      )}
    </DivNavWrapper>
  );
};

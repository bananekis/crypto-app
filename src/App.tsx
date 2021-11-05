import "./index.css";
import { Homepage } from "./components/views/Homepage";
import { Layout } from "antd";
import { Navbar } from "./components/smart_components/Navbar";
import { Route, Switch } from "react-router";
import { color } from "./config";
import CryptoDetails from "./components/smart_components/CryptoDetails";
import Cryptocurrencies from "./components/smart_components/Cryptocurrencies";
import Exchanges from "./components/views/Exchanges";
import Footer from "./components/dumb_components/Footer";
import News from "./components/smart_components/News";
import styled from "styled-components";

const DivNav = styled.div`
  flex: 0.2;
  background-color: ${color.oceanBlue};
  padding: 20px;
`;

const DivMain = styled.div`
  flex: 0.8;
`;

const DivFooter = styled.div`
  background-color: ${color.oceanBlue};
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`;

const DivApp = styled.div`
  display: flex;
  overflow: hidden;

  @media (max-width: 430px) {
    flex-direction: column;
  } ;
`;

const DivRoute = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <DivApp>
      <DivNav>
        <Navbar />
      </DivNav>
      <DivMain>
        <Layout>
          <Switch>
            <DivRoute>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </DivRoute>
          </Switch>
        </Layout>
        <DivFooter>
          <Footer />
        </DivFooter>
      </DivMain>
    </DivApp>
  );
}

export default App;

import { Spin } from "antd";
import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = () => {
  return (
    <Div>
      <Spin />
    </Div>
  );
};

export default Loader;

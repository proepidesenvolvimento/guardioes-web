import styled from 'styled-components';
import { device } from 'utils/devices';
import {
  Link,
} from "react-router-dom";

export const Container = styled.div`
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  height: 70px;
  background: #5dd39e;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0% 2%;
  z-index: 5;
`;


export const Logo = styled.img`
  height: 35px;
`;

export const HeaderNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: max(200px, 30vw);
    margin-right: 20px;
    @media ${device.mobileL} {
      margin-right: 10px;
    };
`;

export const NavTo = styled(Link)`
    text-decoration: none;
    font-family: "ArgentumSans", sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.825rem;
    color: #FFFFFF;
    margin-left: 10px;

    @media ${device.mobileL} {
      font-size: 15px;
    };
`;

export const UserName = styled.h1`
    text-decoration: none;
    font-family: "ArgentumSans", sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.825rem;
    color: #FFFFFF;
    @media ${device.mobileL} {
      font-size: 15px;
    };
    margin-right: 150px;
`;

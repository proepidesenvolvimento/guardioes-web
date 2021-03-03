import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const RedesSociais = styled.div`
    margin-top: 5%;
    margin-right: 10%;
    margin-left: 10%;
`;

export const MainTittle = styled.div`
  color: #5DD39E;
  font-size: 45px;
  font-weight: 400;
  margin-left: 10%;

  -webkit-font-smoothing: antialiased;
`;

export const Card = styled.div`
  width: 30%;
`;

export const HeadSection = styled.div`
    height: 8vh;
    margin: 0;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 5%;
  margin-right: 10%;
  margin-left: 10%;
`;

export const Email = styled.text`
  color: #5DD39E;
  font-weight: bold;
  font-size: 14;
`;

export const Body = styled.div`
    height: 84vh;
    background: linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(230,230,230,1) 100%);
    margin: 0;
    width: 100vw;
`;

export const Text = styled.div`
  color: #524948;
  font-size: 14px;
`;

export const Option = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 2%;
`;

export const SocialMedia = styled.button`
  margin-right: 2%;
  margin-top: 2%;
  margin-bottom: 2%;
  width: 50%;
  border: 0;
  border-radius: 5px;
  height: 2.2rem;
  cursor: pointer;
  transition: opacity: 0.2s;

  &:hover {
      opacity: 0.7;
  }

  @media (min-width: 500px) {
      width: 10rem;
  }
`;

export const SocialMediaText = styled.text`
  font-size: 12px;
  font-weight: 300;
`;
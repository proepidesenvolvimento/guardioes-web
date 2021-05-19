import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  width: max(17vw, 200px);
  display: flex;
  flex-direction: column;
  background: #5DD39E;
  justify-content: initial;
  align-items: center;
`;

export const OptionsSection = styled.div`
  margin-top: 50px;
  height: 85%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: initial;
`;

export const OptionButton = styled.button`
  margin: 0 auto;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  border: ${props => props.selected ? "2px solid #348EAC" : "2px solid #FFFFFF"};
  background: ${props => props.selected ? "#348EAC" : "transparent"};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  margin-bottom: 10px;
  outline: none !important;
`;

export const OptionName = styled.div`
  font-family: "ArgentumSans", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #FFFFFF;
`;

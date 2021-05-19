import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  width: max(17vw, 200px);
  height: 92vh;
  display: flex;
  flex-direction: column;
  background: #5DD39E;
  justify-content: space-between;
  align-items: center;
  position: fixed;
`;

export const OptionsSection = styled.div`
  margin-top: 50px;
  height: 70vh;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const OptionButton = styled.button`
  margin: 0 auto;
  width: 100%;
  height: 50px;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    background: #348EAC;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 2px solid #348EAC;
  }

  transition: all 0.5s;
`;

export const OptionName = styled.div`
  font-family: "ArgentumSans", sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 21px;
  color: #FFFFFF;
`;

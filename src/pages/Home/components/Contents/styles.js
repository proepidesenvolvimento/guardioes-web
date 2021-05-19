import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;

  @media (min-width: 500px) {
    width: 100%;
  }
`;

export const AddContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  align-content: center;
  margin: 0% 5%;
  margin-bottom: 2rem;
  background-color: #E5E5E5;
  border-radius: 10px;
  font-style: normal;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5DD39E;
  height: 70px;
  border-radius: 10px;
  border-bottom: 2px solid rgba(0,0,0,0.125);
  z-index: 5;
`;

export const ContainerTitle = styled.h3`
  margin: 0;
  font-weight: 600;
  font-family: "ArgentumSans", sans-serif;
  font-size: 22px;
  color: white;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.25);
  text-align: center;
`;

export const ContainerForm = styled.div`
  margin: 1rem 1.8rem;
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 20;
  color: #348EAC;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.125);
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  background-color: #5DD39E;
  color: white;
  border: 0;
  border-radius: 5px;
  height: 2.2rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: 500px) {
    width: 14rem;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #5DD39E;
  color: white;
  border: 0;
  border-radius: 5px;
  height: 2.2rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: 500px) {
    width: 14rem;
  }
`;

export const EditInput = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 20;
  color: #348EAC;
  margin-bottom: 1rem;
`;

export const ImageSelector = styled.div`
  background-color: #ffffff;
  border: solid 1px #cccccc;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;

  &:after {
    content: "";
    flex: auto;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;

export const ImgContent = styled.img`
  border: ${props => props.selected ? 'solid 2px #007bff': '0px'};
  border-radius: 5px;
  cursor: pointer;
  padding: ${props => props.selected ? '2px': '0px'};
`;

export const TextArea = styled.textarea`
  border: solid 1px #CCCCCC;
  border-radius: 5px;
  padding: 5px 5px 10px 10px;

  &:focus {
    border: solid 2px #007bff;
    padding: 4px 4px 9px 9px;
  }

  &:disabled {
    background: #f8f9fa;
  }
`;
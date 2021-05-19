import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;

  @media (min-width: 500px) {
    width: 100%;
  }
`;

export const ContainerContentBox = styled.div`
    display: flex;
    flex-direction: column;
    height: ${props => props.component_height ? props.component_height + '6rem' : '26rem'};
    /* 50 */
    width: 90%;
    align-content: center;
    margin: 2.5% 5%;
    background-color: #E5E5E5;
    border-radius: 10px 10px 10px 10px;
    font-style: normal;

    @media (min-width: 500px) {
        width: 90%;
    }
`;

export const ContentBoxHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5DD39E;
    height: 70px;
    border-radius: 10px 10px 10px 10px;
    border-bottom: 2px solid rgba(0,0,0,0.125);
`;

export const ContentBoxTitle = styled.h3`
    margin: 0;
    font-weight: 600;
    font-family: "ArgentumSans", sans-serif;
    font-size: 22px;
    color: white;
    text-shadow: 2px 5px 10px rgba(0,0,0,0.25);
`;

export const ContentBoxTable = styled.div`
    display: flex;
    margin: 1rem 1.8rem;
    max-height: ${props => props.component_height ? props.component_height : '20rem'};
    /* 40 */
`;

export const EditInput = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 700;
    font-size: 20;
    color: #348EAC;
    margin-bottom: 1rem;
`;

export const TextArea = styled.textarea`
    width: 100%;
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

export const SubmitButton = styled.button`
    width: 100%;
    background-color: #5DD39E;
    color: white;
    border: 0;
    border-radius: 5px;
    height: 2.2rem;
    cursor: pointer;
    transition: opacity 0.2s;
    margin: 30px;
    align-self: flex-end;

    &:hover {
        opacity: 0.7;
    }

    @media (min-width: 750px) {
        width: 14rem;
    }
`;

export const ContainerForm = styled.div`
  margin: 30px auto;
  max-height: 14rem;
  width: 70vw;
  width: 95%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Inputs = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const CheckboxInputBlock = styled.div`
  width: 250px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-weight: 700;
  color: #348EAC;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.125);
  margin-bottom: 1rem;
  margin-right: 50px;
`;

export const Label = styled.label` 
  margin: 0;
  padding-right: 20px;
`;

export const CheckboxInput = styled.input` 
  border: 2px solid #348EAC;
  border-radius: 5px;
  transition: opacity 0.2s;
  padding-left: 10px;
  cursor: pointer;
`;

export const InputBlock = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 20;
  color: #348EAC;
  text-shadow: 2px 5px 10px rgba(0,0,0,0.125);
  margin-bottom: 1rem;
  margin-right: 50px;
`;

export const Input = styled.input`
  width: 100%;
  background-color: white;
  color: black;
  border: 2px solid #348EAC;
  border-radius: 5px;
  height: 2.2rem;
  transition: opacity 0.2s;
  padding-left: 10px;
`;
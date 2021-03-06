import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 65%;

    @media (min-width: 500px) {
        width: 100%;
    }
`;

export const AddAdminContainer = styled.div`
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

export const SubmitButton = styled.button`
    width: 100%;
    background-color: #5DD39E;
    color: white;
    border: 0;
    border-radius: 5px;
    height: 2.2rem;
    cursor: pointer;
    transition: opacity: 0.2s;

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

export const CheckboxInput = styled.input` 
  border: 2px solid #348EAC;
  border-radius: 5px;
  transition: opacity 0.2s;
  padding-left: 10px;
  cursor: pointer;
`;

export const Label = styled.label` 
  margin: 0;
  padding-right: 20px;
`;

export const EditCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 700;
  font-size: 20;
  color: #348EAC;
  margin-bottom: 1rem;
  align-items: center;
`;

export const EditCheckboxInput = styled.input`
  margin-left: .5rem;
`;
import styled from 'styled-components';
import { device } from 'utils/devices';

export const Span = styled.span`
  color: red;
  font-size: 15px;
`;

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const HeadSection = styled.div`
    height: 8vh;
    margin: 0;
`;

export const Body = styled.div`
    height: 84vh;
    background: linear-gradient(184deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(230,230,230,1) 100%);
    margin: 0;
    width: 100vw;
`;

export const LoginBox = styled.form`
    width: max(300px, 35vw);
    height: max(400px, 70vh);
    margin: 0 auto;
    background: linear-gradient(180deg, #FFFFFF 99.99%, rgba(255, 255, 255, 0) 100%);
    box-shadow: 4px 4px 50px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: calc(50vw - max(300px, 35vw)/2);
    z-index: 1;
    padding: 20px;
`;

export const Title = styled.p`
    font-family: Lovelo;
    font-style: normal;
    font-weight: 900;
    font-size: 5rem;
    line-height: 5rem;
    color: #282828;
    text-align: flex-start;
    margin-top: 20px;

    @media ${device.laptopL}{
        font-size: 3rem;
        line-height: 3rem;
        text-align: center;
    } 
`;

export const Subtitle = styled.p`
    font-family: Lovelo-Normal;
    font-style: normal;
    font-size: 2rem;
    line-height: 2rem;
    color: #282828;
    text-align: flex-start;
    margin-bottom: 30px;

    @media ${device.laptopL}{
        font-size: 2rem;
        line-height: 2rem;
        text-align: center;
    } 
`;

export const Field = styled.input`
    width: max(250px, 30vw);
    height: 50px;
    margin: 20px auto;
    border: 2px solid #348EAC;
    box-sizing: border-box;
    border-radius: 15px;

    text-decoration: none;
    font-family: Argentum Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #000000;
    text-align: center;
    outline: 0;
    cursor: text;

    &::placeholder {
        font-family: Argentum Sans;
        font-style: normal;
        font-weight: 500;
        font-size: 25px;
        line-height: 40px;
        color: #000000;
        opacity: 0.5;
        text-align: center;
    }

    &:focus {
        &::-webkit-input-placeholder {
            color: white;
        }
        &:-moz-placeholder { /* Firefox 18- */
            color: white;  
        }
    
        &::-moz-placeholder {  /* Firefox 19+ */
            color: white;  
        }
    
        &:-ms-input-placeholder {  
            color: white;  
        }  
    }
`;

export const SendButton = styled.button`
    width: 180px;
    height: 50px;
    margin-top: 30px;
    border-radius: 15px;
    border: 1px;
    text-decoration: none;
    cursor: pointer;
    background: #63D5A2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    outline: none;
`;

export const SendButtonName = styled.p`
    text-align: center;
    text-decoration: none;
    margin: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
`;

export const ResetLink = styled.a`
    cursor: pointer;
    color: #348EAC;
    &:hover {
        color: #5dd39e;
    }
`;

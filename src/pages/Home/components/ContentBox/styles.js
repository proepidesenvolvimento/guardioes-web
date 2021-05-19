import styled from 'styled-components';

export const Container = styled.div`
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

export const ContentBoxTableHeader = styled.th`
    font-weight: 700;
    font-size: 20;
    color: #348EAC;
    text-shadow: 2px 5px 10px rgba(0,0,0,0.125);
`;

export const ContentBoxTableIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    filter: invert(46%) sepia(95%) saturate(331%) hue-rotate(148deg) brightness(88%) contrast(86%);
    transition: opacity 0.2s;
    &:hover {
        opacity: 0.7;
    }
`;
import React from 'react'
import Lottie from 'lottie-react-web'
import {
  Container,
  Body,
  AnimationDiv,
  Title,
  Subtitle,
  HomeButton
} from './styles';
import Header from 'sharedComponents/Header'
import checkAnimation from './assets/checkAnimation.json'

const Thanks = () => {
  const handleClick = () => {
    window.location.refresh(true)
  }

  return (
    <Container>
      <Header />
      <Body>
        <AnimationDiv>
          <Lottie
            speed={0.5}
            options={{
              animationData: checkAnimation,
              loop: false,
            }
          }/>
        </AnimationDiv>
        <Title>
          Obrigado por se inscrever!
        </Title>
        <Subtitle>
          Iremos enviar a confirmação de cadastro no e-mail em breve. Fique Atento!
        </Subtitle>
        <HomeButton onClick={handleClick} to="/login">
          Voltar
        </HomeButton>
      </Body>
    </Container>
  );
}

export default Thanks;
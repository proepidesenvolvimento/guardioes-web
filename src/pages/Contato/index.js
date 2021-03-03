import React from 'react'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { Divider } from '@material-ui/core';
import {
	Container,
	RedesSociais,
	Text,
	Option,
	SocialMedia,
	SocialMediaText,
	Body,
	HeadSection,
	Content,
	MainTittle,
	Card,
	Email,
} from './styles'
import Header from "sharedComponents/Header";
import Backicon from 'sharedComponents/BackIcon'

export default function Contato(){
	return (
		<Container>
      <Header />
      <HeadSection>
        <Backicon />
      </HeadSection>
      <Body>
				<MainTittle>Dúvidas? Entre em contato com a gente</MainTittle>

				<Content>
					<Card>
						<Option>ProEpi</Option>
						<Text>Dúvidas sobre a ProEpi? Fale conosco através do nosso e-mail:</Text>
						<Email>contato@proepi.org.br</Email>
					</Card>

					<Card>
						<Option>Equipe Técnica </Option>
						<Text>Problema no sistema? Entre em contato com o suporte técnico: </Text>
						<Email>proepi.desenvolvimento@gmail.com</Email>
					</Card>

					<Card>
						<Option>Endereço: </Option>
						<Text>SRTVS QD 701, bloco “O”, edifício Multiempresarial, sala 891 – Asa Sul – Brasília</Text>
					</Card>

				</Content>

				<RedesSociais>
					<Divider />
					<br /> <br />
					<Option>ProEpi nas Redes Sociais</Option>
						<Text>Siga a ProEpi nas redes sociais e para acompanhar mais de perto nosso trabalho.</Text>
						<SocialMedia onClick={() => window.open('https://facebook.com/AssociacaoProEpi')}>	
							<FaFacebook size={30}/>
							<SocialMediaText> /AssociacaoProEpi</SocialMediaText>
						</SocialMedia>	
					
						<SocialMedia onClick={() => window.open('http://instagram.com/redeproepi')}> 
							<FaInstagram size={30} />
							<SocialMediaText> @proepi</SocialMediaText>
						</SocialMedia>
				</RedesSociais>

      </Body>
    </Container>

	)
}
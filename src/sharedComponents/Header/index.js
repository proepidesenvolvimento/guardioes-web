import React from 'react';
import {
  Container,
  Logo,
  HeaderNav,
  NavTo,
  Logout
} from './styles';
import logo from 'utils/assets/logo.png';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setUser
} from 'actions/';

const Header = ({
  authenticated,
  setUser
}) => {
  const logout = () => {
    if (authenticated === true ) {
      sessionService.deleteSession()
      sessionService.deleteUser()
      setUser("")
    } 
  }
  return (
    <Container>
      <Logo src={logo} style={{ fill: "#fff" }} />
      <HeaderNav>
        <NavTo to="/">
          Home
        </NavTo>
        {authenticated === true ?
          <NavTo to="/panel">
            Painel
          </NavTo>
        : null}
        {authenticated === false ?
          <NavTo to="/statistics">
            Estatísticas
          </NavTo>
        : null}
        <NavTo to="/login" onClick={() => logout()}>
          {authenticated === true ? "Logout" : "Login"}
        </NavTo>
        <NavTo to="/contact">
          Contato
        </NavTo>
      </HeaderNav>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setUser
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

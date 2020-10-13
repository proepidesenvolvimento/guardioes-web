import React, { useState, useEffect } from 'react';
import {
  Container,
  Body
} from './styles';
import NavBar from './components/NavBar';
import Header from 'sharedComponents/Header'
import Apps from './components/Apps';
import Groups from './components/Groups';
import Symptoms from './components/Symptoms';
import GroupManagers from './components/GroupManagers';
import Dashboard from './components/Dashboard';
import Contents from './components/Contents';
import Syndromes from './components/Syndromes';
import { connect } from 'react-redux';
import {
  setToken,
  setUser
} from 'actions/';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import Users from './components/Users';
import { useHistory } from "react-router-dom";

const Home = ({
  token,
  setToken,
  user,
  setUser
}) => {

  const history = useHistory()

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      const auxUser = await sessionService.loadUser()
      setToken(auxSession.token)
      setUser(auxUser)
    }
    _loadSession();
  }, [token]);

  const [component, setComponent] = useState({})
  const [components, setComponents] = useState([])

  const loadComponents = () => {
    setComponents([
      {
        key: "admins",
        value: "Admins"
      },
      {
        key: "configApps",
        value: Apps
      },
      {
        key: "managers",
        value: "Gerentes"
      },
      {
        key: "managersGroup",
        value: GroupManagers
      },
      {
        key: "groups",
        value: Groups
      },
      {
        key: "symptoms",
        value: Symptoms
      },
      {
        key: "syndromes",
        value: Syndromes
      },
      {
        key: "contents",
        value: Contents
      },
      {
        key: "users",
        value: Users
      },
      {
        key: "dashboard",
        value: Dashboard
      }
    ])
    setComponent({
      key: "admins",
      value: "Admins"
    })
  }

  useEffect(() => {
    loadComponents();
    if (token === "") {
      history.push("/login")
    }
  }, [])

  const setComponentCallback = (component) => {
    setComponent({ key: component.key, value: component.value });
  }

  return (
    <Container>
      <Header />
      <Body style={{ overflowX: 'hidden' }}>
        <NavBar setComponentCallback={setComponentCallback} />
        {components.map((comp) => {
          if (comp.key === component.key) {
            return <comp.value />
          }
        })}
      </Body>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setToken,
    setUser
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
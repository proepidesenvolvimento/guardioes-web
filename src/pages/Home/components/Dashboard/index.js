import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setUser,
  setToken
} from 'actions/';
import { sessionService } from 'redux-react-session';

import queryString from 'query-string';

import getGraphs from './services/getGraphs'

import { isEmpty } from "lodash";
import './styles.css';

const Dashboard = ({
  token,
  user
}, props) => {
  const [urls, setUrls] = useState({})
  const [hashes, setHashes] = useState(queryString.parse(window.location.hash))

  if (isEmpty(hashes)){
    setHashes({surveys: null})
  }

  const _getUrls = async (type) => {
    if(!type){
      type = 'surveys'
    } else {
      type = Object.keys(hashes)[0]
    }

    const response = await getGraphs(token, type)
    setUrls(response.urls)
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();

    _getUrls(Object.keys(hashes)[0])
    if (isEmpty(hashes)) {
      setHashes({ surveys: null })
    } else {
      setHashes(hashes)
    }

    console.log(urls)
  }, [hashes.surveys, hashes.users, hashes.biosecurity, hashes.vigilance, user, token]);
  
  const isHashes = (string) => {
    if (typeof hashes[string] !== "undefined") return true
    return false
  }

  const isGroupManager = () => user.type === 'group_manager';
  
  const isVigilance = () => {
    if (user.vigilance_email != null) {
      if (user.vigilance_email.length > 0) return true
    } else return false
  }

  // This allows a begin date for iframes
  let date = props.date || '2020-06-10T07:01:16.923Z' // App launch date

  return (
    <div style={{ height: '100%' }}>
      <div className="dash visualizations">
        <ul className="nav nav-tabs justify-content-center" style={{ marginTop: 20 }}>
          <li className="nav-item">
            <a onClick={() => setHashes({ surveys: null })} className={`nav-link ${isHashes('surveys') ? 'active' : ''}`} href="#surveys">Reportes</a>
          </li>
          <li className="nav-item">
            <a onClick= {() => setHashes({ users: null })} className={`nav-link ${isHashes('users') ? 'active' : ''}`} href="#users">Usuários</a>
          </li>
          <li className="nav-item">
            <a onClick={() => setHashes({ biosecurity: null })} className={`nav-link ${ !isGroupManager() ? 'd-none': ''} ${isHashes('biosecurity') ? 'active' : ''}`} href="#biosecurity">Biosegurança</a>
          </li>
          <li className="nav-item">
          <a onClick={() => setHashes({ vigilance: null })} className={`nav-link ${ !isGroupManager() || !isVigilance() ? 'd-none': ''} ${isHashes('vigilance') ? 'active' : ''}`} href="#vigilance">Vigilância Ativa</a>
          </li>
        </ul>
      </div>
        {urls?.length &&
          <iframe
            title="Dashboard"
            src={urls[0]['iframe_url']}
            frameborder="0"
            width="100%"
            height="92%"
            allowtransparency
          />
        }
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  token: state.user.token
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setUser,
    setToken,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

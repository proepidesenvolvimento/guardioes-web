import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setUser
} from 'actions/';
import queryString from 'query-string';

import getGraphs from './services/getGraphs'
import getAdminPayloads from './services/getAdminPayloads';
import getManagerPayloads from './services/getManagerPayloads'; 
import getGroupManagerPayloads from './services/getGroupManagerPayloads';

import { isEmpty } from "lodash";
import './styles.css';

const Dashboard = ({
  user
}, props) => {
  const [currentNav, setCurrentNav] = useState({})
  const [urls, setUrls] = useState({})
  const hashes = queryString.parse(window.location.hash)

  const _getUrls = async () => {
    let payloads = []

    switch(user.type){
      case 'admin':
        payloads = getAdminPayloads(user);
        break;
      case 'manager':
        payloads = getManagerPayloads(user);
        break;
      case 'group_manager':
        payloads = getGroupManagerPayloads(user);    
    }

    const response = await getGraphs(payloads)
    setUrls(response.urls)
  }

  useEffect(() => {
    _getUrls()
    if (isEmpty(hashes)) {
      setCurrentNav({ geral: null })
    }
    else {
      setCurrentNav(hashes)
    }
  }, [hashes.geral, hashes.adesao, hashes.dados, user]);
  
  const isCurrentNav = (string) => {
    if (typeof currentNav[string] !== "undefined") return true
    return false
  }
  // This allows a begin date for iframes
  let date = props.date || '2020-06-10T07:01:16.923Z' // App launch date

  return (
    <div style={{ width: '100%', height: '100%' }}>
          {urls?.length && urls.map((url) => {
            return (
                <iframe
                  src={url['iframe_url']}
                  frameborder="0"
                  width="100%"
                  height="100%"
                  allowtransparency
                />
            )
          })}
        </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setUser,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

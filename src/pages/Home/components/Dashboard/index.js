import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { isEmpty } from "lodash";
import './styles.css';

function Dashboard(props) {
  const [currentNav, setCurrentNav] = useState({})
  const hashes = queryString.parse(window.location.hash)

  useEffect(() => {
    if (isEmpty(hashes)) {
      setCurrentNav({ geral: null })
    }
    else {
      setCurrentNav(hashes)
    }
  }, [hashes.geral, hashes.adesao, hashes.dados]);

  const isCurrentNav = (string) => {
    if (typeof currentNav[string] !== "undefined") return true
    return false
  }

  // This allows a begin date for iframes
  let date = props.date || '2020-06-10T07:01:16.923Z' // App launch date

  return (
    <div className="dash visualizations">
      <ul className="nav nav-tabs justify-content-center" style={{marginTop: 20}}>
        <li className="nav-item">
          <a className={`nav-link ${isCurrentNav('geral') ? 'active' : ''}`} href="#geral">Dados gerais</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${isCurrentNav('adesao') ? 'active' : ''}`} href="#adesao">Dados sobre adesão</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${isCurrentNav('dados') ? 'active' : ''}`} href="#dados">Tabelas de dados</a>
        </li>
      </ul>

      <div className={`dash visualizations ${isCurrentNav('geral') ? '' : 'd-none'}`}>
        <iframe
          title="Dados gerais"
          src={"http://painel.gds.proepi.org.br:5601/app/kibana#/dashboard/4471fcd0-8a4c-11ea-8338-a5c2f3db7279?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:'" + date + "',to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(title:'Desenvolvido%20em%20parceria%20com'),gridData:(h:4,i:'6e12ee3e-d228-44b2-bac2-35d1cd135f67',w:48,x:0,y:0),id:b18405e0-ace1-11ea-8757-c560579e51be,panelIndex:'6e12ee3e-d228-44b2-bac2-35d1cd135f67',title:'Desenvolvido%20em%20parceria%20com',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:'4f2bc523-6c05-41f2-b2bc-cbe39097ca9a',w:38,x:0,y:4),id:'0f8af150-e24b-11ea-b06d-f32b0ae9e5ff',panelIndex:'4f2bc523-6c05-41f2-b2bc-cbe39097ca9a',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:18,i:d6c925da-4938-4709-aa7a-25b6eb84ac7d,w:10,x:38,y:4),id:'706f5000-e247-11ea-b06d-f32b0ae9e5ff',panelIndex:d6c925da-4938-4709-aa7a-25b6eb84ac7d,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:d0aa5ec7-496f-4942-9606-8e38a5b3225b,w:38,x:0,y:13),id:'0577ee50-e248-11ea-b06d-f32b0ae9e5ff',panelIndex:d0aa5ec7-496f-4942-9606-8e38a5b3225b,type:visualization,version:'7.6.1'),(embeddableConfig:(hiddenLayers:!(),isLayerTOCOpen:!f,mapCenter:(lat:-14.97744,lon:-50.80119,zoom:3.42),openTOCDetails:!(),title:'Reports%20sintom%C3%A1ticos%20por%20estado%20(total)'),gridData:(h:23,i:fee718ca-77eb-4021-98ca-197f0eff0c7c,w:26,x:0,y:22),id:'9d98a6e0-915b-11ea-8757-c560579e51be',panelIndex:fee718ca-77eb-4021-98ca-197f0eff0c7c,title:'Reports%20sintom%C3%A1ticos%20por%20estado%20(total)',type:map,version:'7.6.1'),(embeddableConfig:(),gridData:(h:14,i:aac53799-e601-455c-abbd-09a4a9073196,w:22,x:26,y:22),id:'338e8690-e249-11ea-b06d-f32b0ae9e5ff',panelIndex:aac53799-e601-455c-abbd-09a4a9073196,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:b8c94d40-d183-49d7-bff5-489b9d57064a,w:22,x:26,y:36),id:'7be5d010-e249-11ea-b06d-f32b0ae9e5ff',panelIndex:b8c94d40-d183-49d7-bff5-489b9d57064a,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:ebf5b601-3916-4c1b-98a1-909ba4574c29,w:48,x:0,y:45),id:'1273aed0-e24a-11ea-b06d-f32b0ae9e5ff',panelIndex:ebf5b601-3916-4c1b-98a1-909ba4574c29,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:10,i:'23742b45-9d5b-4838-a21b-0985da316169',w:36,x:0,y:54),id:'54fc7570-e24a-11ea-b06d-f32b0ae9e5ff',panelIndex:'23742b45-9d5b-4838-a21b-0985da316169',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:10,i:'3e96a110-cf56-46c7-bfb9-c31bc6322398',w:12,x:36,y:54),id:'747d08b0-e24a-11ea-b06d-f32b0ae9e5ff',panelIndex:'3e96a110-cf56-46c7-bfb9-c31bc6322398',type:visualization,version:'7.6.1')),query:(language:kuery,query:''),timeRestore:!t,title:'Dados%20gerais%20-%20Guardi%C3%B5es%20da%20Sa%C3%BAde',viewMode:view)"}
          frameBorder="0"
          height="1870"
          width="100%"
        />
      </div>

      <div className={`dash visualizations ${isCurrentNav('adesao') ? '' : 'd-none'}`}>
        <iframe
          title="Dados sobre adesão"
          src={"http://painel.gds.proepi.org.br:5601/app/kibana#/dashboard/890db060-c06f-11ea-8757-c560579e51be?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:'" + date + "',to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:15,i:'19ab77de-4c86-48ae-8bc5-409052991902',w:48,x:0,y:0),id:'000abcf0-e256-11ea-b06d-f32b0ae9e5ff',panelIndex:'19ab77de-4c86-48ae-8bc5-409052991902',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:d4a06aab-f9a2-436e-b8a6-cefa3b711dab,w:48,x:0,y:15),id:'517cf530-e256-11ea-b06d-f32b0ae9e5ff',panelIndex:d4a06aab-f9a2-436e-b8a6-cefa3b711dab,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:'38264330-a718-49f2-9636-dda67d9f719b',w:48,x:0,y:30),id:'54fc7570-e24a-11ea-b06d-f32b0ae9e5ff',panelIndex:'38264330-a718-49f2-9636-dda67d9f719b',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:18,i:'269f3c4c-1ea7-4d6d-a3ae-6bfba2982984',w:48,x:0,y:45),id:'2a37dea0-e25a-11ea-b06d-f32b0ae9e5ff',panelIndex:'269f3c4c-1ea7-4d6d-a3ae-6bfba2982984',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:'87eea98b-a107-468c-aeea-f06b096be024',w:48,x:0,y:63),id:a5c35f40-e25a-11ea-b06d-f32b0ae9e5ff,panelIndex:'87eea98b-a107-468c-aeea-f06b096be024',type:visualization,version:'7.6.1'),(embeddableConfig:(hiddenLayers:!(),isLayerTOCOpen:!f,mapCenter:(lat:-14.14736,lon:-52.64071,zoom:3.6),openTOCDetails:!()),gridData:(h:30,i:fcc41562-98bd-411c-8995-d9ceaf3352af,w:48,x:0,y:93),id:ce21ad90-c0a2-11ea-8757-c560579e51be,panelIndex:fcc41562-98bd-411c-8995-d9ceaf3352af,type:map,version:'7.6.1'),(embeddableConfig:(),gridData:(h:15,i:'2cc1390c-8d30-4712-ba41-d6cf01242fc6',w:48,x:0,y:78),id:'47a719e0-e261-11ea-b06d-f32b0ae9e5ff',panelIndex:'2cc1390c-8d30-4712-ba41-d6cf01242fc6',type:visualization,version:'7.6.1')),query:(language:kuery,query:''),timeRestore:!t,title:'M%C3%A9tricas%20de%20engajamento%20-%20Guardi%C3%B5es%20da%20Sa%C3%BAde',viewMode:view)"} 
          frameBorder="0"
          height="3550" 
          width="100%"
        />
      </div>

      <div className={`dash visualizations ${isCurrentNav('dados') ? '' : 'd-none'}`}>
        <iframe
          title="Tabelas de dados"
          src={"http://painel.gds.proepi.org.br:5601/app/kibana#/dashboard/926885c0-acd0-11ea-8757-c560579e51be?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:'" + date + "',to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:3,i:ea5f3762-c339-47d1-bc92-9ef6346cf66e,w:48,x:0,y:0),id:b18405e0-ace1-11ea-8757-c560579e51be,panelIndex:ea5f3762-c339-47d1-bc92-9ef6346cf66e,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:20,i:'492b704d-1fee-4fae-aab1-3c13d668136a',w:48,x:0,y:3),id:'231e3e70-ed2c-11ea-a5d0-b9c877143e8b',panelIndex:'492b704d-1fee-4fae-aab1-3c13d668136a',type:search,version:'7.6.1'),(embeddableConfig:(),gridData:(h:19,i:f589cd8e-bafd-4b39-aece-18a90f8afbdd,w:48,x:0,y:23),id:bd3b53e0-ed2b-11ea-a5d0-b9c877143e8b,panelIndex:f589cd8e-bafd-4b39-aece-18a90f8afbdd,type:search,version:'7.6.1')),query:(language:kuery,query:''),timeRestore:!f,title:Relat%C3%B3rios,viewMode:view)"} 
          frameBorder="0"
          height="1250"
          width="100%"
        />
      </div>

      <i className={"note"}>NOTA: caso você encontre problemas nessa página, use o navegador Firefox</i>
    </div>
  );
}

export default Dashboard;
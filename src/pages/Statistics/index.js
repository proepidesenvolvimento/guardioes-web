import React, { useEffect, useState } from 'react';

import {
  Container,
} from "./styles";
import Header from "sharedComponents/Header";

const Statistics = ({
}) => {

  return (
    <Container>
        <Header />
        <iframe
            title="Dados gerais"
            src="http://painel.gds.proepi.org.br:8090/s/publico/app/kibana#/dashboard/4471fcd0-8a4c-11ea-8338-a5c2f3db7279?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:'2020-06-10T03:00:00.000Z',to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(title:'Desenvolvido%20em%20parceria%20com'),gridData:(h:4,i:'6e12ee3e-d228-44b2-bac2-35d1cd135f67',w:48,x:0,y:0),id:b18405e0-ace1-11ea-8757-c560579e51be,panelIndex:'6e12ee3e-d228-44b2-bac2-35d1cd135f67',title:'Desenvolvido%20em%20parceria%20com',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:'4f2bc523-6c05-41f2-b2bc-cbe39097ca9a',w:38,x:0,y:4),id:'0f8af150-e24b-11ea-b06d-f32b0ae9e5ff',panelIndex:'4f2bc523-6c05-41f2-b2bc-cbe39097ca9a',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:18,i:d6c925da-4938-4709-aa7a-25b6eb84ac7d,w:10,x:38,y:4),id:'706f5000-e247-11ea-b06d-f32b0ae9e5ff',panelIndex:d6c925da-4938-4709-aa7a-25b6eb84ac7d,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:d0aa5ec7-496f-4942-9606-8e38a5b3225b,w:38,x:0,y:13),id:'0577ee50-e248-11ea-b06d-f32b0ae9e5ff',panelIndex:d0aa5ec7-496f-4942-9606-8e38a5b3225b,type:visualization,version:'7.6.1'),(embeddableConfig:(hiddenLayers:!(),isLayerTOCOpen:!f,mapCenter:(lat:-14.97744,lon:-50.80119,zoom:3.42),openTOCDetails:!(),title:'Reports%20sintom%C3%A1ticos%20por%20estado%20(total)'),gridData:(h:23,i:fee718ca-77eb-4021-98ca-197f0eff0c7c,w:26,x:0,y:22),id:'9d98a6e0-915b-11ea-8757-c560579e51be',panelIndex:fee718ca-77eb-4021-98ca-197f0eff0c7c,title:'Reports%20sintom%C3%A1ticos%20por%20estado%20(total)',type:map,version:'7.6.1'),(embeddableConfig:(),gridData:(h:14,i:aac53799-e601-455c-abbd-09a4a9073196,w:22,x:26,y:22),id:'338e8690-e249-11ea-b06d-f32b0ae9e5ff',panelIndex:aac53799-e601-455c-abbd-09a4a9073196,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:b8c94d40-d183-49d7-bff5-489b9d57064a,w:22,x:26,y:36),id:'7be5d010-e249-11ea-b06d-f32b0ae9e5ff',panelIndex:b8c94d40-d183-49d7-bff5-489b9d57064a,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:9,i:ebf5b601-3916-4c1b-98a1-909ba4574c29,w:48,x:0,y:45),id:'1273aed0-e24a-11ea-b06d-f32b0ae9e5ff',panelIndex:ebf5b601-3916-4c1b-98a1-909ba4574c29,type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:10,i:'23742b45-9d5b-4838-a21b-0985da316169',w:36,x:0,y:54),id:'54fc7570-e24a-11ea-b06d-f32b0ae9e5ff',panelIndex:'23742b45-9d5b-4838-a21b-0985da316169',type:visualization,version:'7.6.1'),(embeddableConfig:(),gridData:(h:10,i:'3e96a110-cf56-46c7-bfb9-c31bc6322398',w:12,x:36,y:54),id:'747d08b0-e24a-11ea-b06d-f32b0ae9e5ff',panelIndex:'3e96a110-cf56-46c7-bfb9-c31bc6322398',type:visualization,version:'7.6.1')),query:(language:kuery,query:''),timeRestore:!t,title:'Dados%20gerais%20-%20Guardi%C3%B5es%20da%20Sa%C3%BAde',viewMode:view)"
            frameBorder="0"
            height="1860"
            width="100%"
        >
        </iframe>
    </Container>
  );
}

export default Statistics;
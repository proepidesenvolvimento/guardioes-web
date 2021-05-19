import React, { useState } from 'react';

import { DropdownDiv, DropdownTitle, Header, SelectionDiv } from './styles.js'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';


export default function DropdownComponent(props){  
  const [userType, setUserType] = useState('admin');

  const handleOnClick = (event) => {
    setUserType(event.target.value)
    props.setItemsCallback(event.target.value)
  }

  return (
    <SelectionDiv>
      <DropdownTitle>Logar como </DropdownTitle>
        <Select
          onChange={handleOnClick}
          value={userType}
          style={{
            color: '#fff',
            fontFamily: 'Argentum Sans',
            margin: '0px',
            width: '40%',
            borderBottom: '0px'
          }}
        >
          <MenuItem value={'group_manager'} style={{ fontFamily: 'Argentum Sans' }}>Instituição</MenuItem>
          <MenuItem value={'manager'} style={{ fontFamily: 'Argentum Sans' }}>Gerente</MenuItem>
          <MenuItem value={'city_manager'} style={{ fontFamily: 'Argentum Sans' }}>Gerente de Município</MenuItem>
          <MenuItem value={'admin'} style={{ fontFamily: 'Argentum Sans' }}>Administrador</MenuItem>
        </Select>
    </SelectionDiv>
  );
}

import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { 
  ContentBoxTableHeader,
  CheckboxInput,
  WarningMessage,
 } from './styles';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TableComponent = ({
  contents,
  fields,
  setContentShow,
  vigilance_syndromes,
  setVigilanceSyndromes,
  vigilance_email,
  token,
}) => {

  const checkBoxState = () => {
    if (vigilance_email === null || vigilance_email === ""){
      return true
    } else {
      return false
    }
  }

  const isVigilance = syndrome => {
    if (vigilance_syndromes) {
      for (let vs of vigilance_syndromes) {
        if (vs.syndrome_id === syndrome.id) {
          return true
        }
      }
    }
  }

  const handleChange = syndrome => {
    let vs = vigilance_syndromes ? vigilance_syndromes : []
    let belongs = false
    for (let v of vs) {
      if (v.syndrome_id === syndrome.id)
        belongs = true
    }
    if (belongs) {
      vs = vigilance_syndromes.filter(s => s.syndrome_id !== syndrome.id)
    } else {
      const aux_synd = {syndrome_id: syndrome.id, surto_id: syndrome.surto_id}
      vs.push(aux_synd)
    }
    setVigilanceSyndromes(vs)
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          {fields.map(field => (
            <ContentBoxTableHeader style={{maxWidth: "500px"}} key={field.key}>{field.value}</ContentBoxTableHeader>
          ))}
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {contents.map(content => (
          <tr key={content.id}>
            {fields.map(field => (
              <td style={{maxWidth: "500px"}} key={field.key}>{content[field.key]}</td>
            ))}
            <td>
              <Link to="/panel">
                <button className="btn btn-info" onClick={() => { setContentShow(content) }}>
                  Visualizar
                        </button>
              </Link>
            </td>
            <td>
              {vigilance_email === null || vigilance_email === "" ? 
                <WarningMessage>Você deve possuir um e-mail cadastrado para poder participar</WarningMessage>
                :
                <label htmlFor="belongs_to_vigilance">Faz parte da Vigilância?</label>
              }
              <CheckboxInput
                type="checkbox"
                id="belongs_to_vigilance"
                checked={isVigilance(content)}
                onChange={(e) => handleChange(content)}
                disabled={checkBoxState()}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableComponent;
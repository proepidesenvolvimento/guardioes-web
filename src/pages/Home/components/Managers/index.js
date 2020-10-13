import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setManagers
} from 'actions/';
import { bindActionCreators } from 'redux';
import getAllManagers from './services/getAllManagers'
import createManager from './services/createManager'
import deleteManager from './services/deleteManager'

import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  Form,
  Inputs,
  InputBlock,
  Input,
  SubmitButton
} from './styles';
import { useForm } from "react-hook-form";

import ContentBox from '../ContentBox';

const Managers = ({
  token,
  user,
  // managers,
  // setManagers
}) => {

  const [managers, setManagers] = useState()

  const { handleSubmit } = useForm()
  const [managerName, setManagerName] = useState("")

  const _createManager = async () => {
    const data = {

    }
    const reponse = await createManager(data, token)
    setManagerName("")
  }

  const _deleteManager = async (id, token) => {
    deleteManager(id, token)
  }

  const loadManagers = async (token) => {
    const response = await getAllManagers(token)
    let aux_managers = [];
    response.managers.map(manager => {
      aux_managers.push({
        "id": manager.id,
        "name": manager.description
      })
    })
    setManagers(aux_managers)
  }

  useEffect(() => {
    console.log(token)
    // loadManagers(token)
  }, [token]);

  const fields =
    [{
      key: "id",
      value: "ID"
    },
    {
      key: "name",
      value: "Nome",
    }];

  return (
    <Container>
      <ContentBox
        title="Gerentes"
        token={token}
        contents={managers ? managers : []}
        fields={fields}
        delete_function={_deleteManager}
      />

      <AddAppContainer className="shadow-sm">
        <ContainerHeader>
          <ContainerTitle>Adicionar Gerente</ContainerTitle>
        </ContainerHeader>
        <ContainerForm>
          <Form id="addApp" onSubmit={handleSubmit(_createManager)}>
            <Inputs>
              <InputBlock>
                <label htmlFor="name">Nome</label>
                <Input
                  type="text"
                  id="name"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                />
              </InputBlock>
            </Inputs>
            <SubmitButton type="submit">
              Adicionar
            </SubmitButton>
          </Form>
        </ContainerForm>
      </AddAppContainer>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Managers);

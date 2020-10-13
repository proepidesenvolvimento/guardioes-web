import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setGroupManagers, setToken
} from 'actions/';

import { bindActionCreators } from 'redux';
import getAllGroupManagers from './services/getAllGroupManagers'
import createGroupManager from './services/createGroupManager'
import deleteGroupManager from './services/deleteGroupManager'
import editGroupManager from './services/editGroupManager';

import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  Form,
  Inputs,
  CheckboxInputBlock,
  CheckboxInput,
  InputBlock,
  Input,
  SubmitButton,
  Label,
  EditInput,
  EditButton,
  EditCheckbox,
  EditCheckboxInput
} from './styles';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import ContentBox from '../ContentBox';

const GroupManagers = ({
  token,
  user,
  groupManagers,
  setGroupManagers,
  setToken
}) => {

  const { handleSubmit } = useForm()
  const [groupManagerName, setGroupManagerName] = useState("")
  const [groupManagerEmail, setGroupManagerEmail] = useState("")
  const [groupManagerTwitter, setGroupManagerTwitter] = useState("")
  const [groupManagerGroup, setGroupManagerGroup] = useState("")
  const [groupManagerIdentificationCode, setGroupManagerIdentificationCode] = useState(false)
  const [groupManagerLengthIdentificationCode, setGroupManagerLengthIdentificationCode] = useState(0)
  const [groupManagerPassword, setGroupManagerPassword] = useState("")
  const [modalEdit, setModalEdit] = useState(false);
  const [editingGroupManager, setEditingGroupManager] = useState({});
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTwitter, setEditTwitter] = useState("");
  const [editGroup, setEditGroup] = useState("");
  const [editIDCode, setEditIDCode] = useState(false);
  const [editLengthIDCode, setEditLengthIDCode] = useState(0);
  const [editPassword, setEditPassword] = useState("");
  const [groupManagerShow, setGroupManagerShow] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const _createGroupManager = async () => {
    const data = {
      "group_manager": {
        "password": groupManagerPassword,
        "email": groupManagerEmail,
        "name": groupManagerName,
        "group_name": groupManagerGroup,
        "twitter": groupManagerTwitter,
        "app_id": 1,
        "require_id": groupManagerIdentificationCode,
        "id_code_length": groupManagerIdentificationCode ? groupManagerLengthIdentificationCode : undefined
      }
    }
    await createGroupManager(data, token)
    setGroupManagerName("")
    setGroupManagerPassword("")
    setGroupManagerEmail("")
    setGroupManagerGroup("")
    setGroupManagerIdentificationCode(false)
    setGroupManagerLengthIdentificationCode(0)
    setGroupManagerTwitter("")
    _getAllGroupManagers(token);
  }

  const _deleteGroupManager = async (id, token) => {
    await deleteGroupManager(id, token)
    _getAllGroupManagers(token)
  }

  const _editGroupManager = async () => {
    const data = {
      "group_manager": {
        "password": editPassword,
        "email": editEmail,
        "name": editName,
        "group_name": editGroup,
        "twitter": editTwitter,
        "app_id": 1,
        "require_id": editIDCode,
        "id_code_length": editIDCode ? editLengthIDCode : null
      }
    };
    await editGroupManager(editingGroupManager.id, data, token);
    setModalEdit(false);
    _getAllGroupManagers(token);
  }

  const handleShow = (content) => {
    setGroupManagerShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setEditingGroupManager(content);
    setEditName(content.name);
    setEditEmail(content.email);
    setEditGroup(content.group_name);
    setModalEdit(!modalEdit);
  }

  const handleEditName = (value) => {
    setEditName(value);
  }

  const handleEditEmail = (value) => {
    setEditEmail(value);
  }

  const handleEditGroup = (value) => {
    setEditGroup(value);
  }

  const handleEditTwitter = (value) => {
    setEditTwitter(value);
  }

  const handleEditIDCode = (value) => {
    setEditIDCode(value);
  }

  const handleEditLengthIDCode = (value) => {
    setEditLengthIDCode(value);
  }

  const handleEditPassword = (value) => {
    setEditPassword(value);
  }

  const _getAllGroupManagers = async (token) => {
    const response = await getAllGroupManagers(token)
    loadGroupManagers(response)
  }

  const loadGroupManagers = async (response) => {
    let aux_group_managers = [];
    if (!response.group_managers) {
      response.group_managers = [];
    }
    response.group_managers.forEach(group_manager => {
      aux_group_managers.push({
        "id": group_manager.id,
        "name": group_manager.name,
        "email": group_manager.email,
        "group_name": group_manager.group_name
      })
    })
    await setGroupManagers(aux_group_managers)
    return
  }

  useEffect(() => {
    _getAllGroupManagers(token)
    setToken(token)
  }, []);

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
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Informações do Gerente de Instituição
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>ID</label>
            <input
              className="text-dark"
              type="text"
              value={groupManagerShow.id}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Nome</label>
            <input
              className="text-dark"
              type="text"
              value={groupManagerShow.name}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>E-mail</label>
            <input
              className="text-dark"
              type="text"
              value={groupManagerShow.email}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Grupo</label>
            <input
              className="text-dark"
              type="text"
              value={groupManagerShow.group_name}
              disabled
            />
          </EditInput>
        </Modal.Body>

        <Modal.Footer>
          <EditButton onClick={() => setModalShow(false)}>Voltar</EditButton>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalEdit}
        onHide={() => setModalEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Gerente de Instituição
          </Modal.Title>
        </Modal.Header>
        <form id="editGroupManager" onSubmit={handleSubmit(_editGroupManager)}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="edit_name">Nome</label>
              <input
                type="text"
                id="edit_name"
                value={editName}
                onChange={(e) => handleEditName(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_email">E-mail</label>
              <input
                type="email"
                id="edit_email"
                value={editEmail}
                onChange={(e) => handleEditEmail(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_password">Senha</label>
              <input
                type="password"
                id="edit_password"
                value={editPassword}
                onChange={(e) => handleEditPassword(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_group">Grupo</label>
              <input
                type="text"
                id="edit_group"
                value={editGroup}
                onChange={(e) => handleEditGroup(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_twitter">Twitter</label>
              <input
                type="text"
                id="edit_twitter"
                value={editTwitter}
                onChange={(e) => handleEditTwitter(e.target.value)}
              />
            </EditInput>

            <EditCheckbox>
              <label htmlFor="edit_id_code">Código de Identificação</label>
              <EditCheckboxInput
                type="checkbox"
                id="edit_id_code"
                value={editIDCode}
                onChange={() => handleEditIDCode(!editIDCode)}
              />
            </EditCheckbox>

            {editIDCode ? <EditInput>
                  <label htmlFor="edit_len_id_code">Quantidade de caracteres</label>
                  <input
                    type="number"
                    id="edit_len_id_code"
                    value={editLengthIDCode}
                    min="1"
                    onChange={(e) => handleEditLengthIDCode(e.target.value)}
                  />
              </EditInput> : null}
          </Modal.Body>
          <Modal.Footer>
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Gerentes de Instituições"
          token={token}
          contents={groupManagers ? groupManagers : []}
          fields={fields}
          delete_function={_deleteGroupManager}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Gerente</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addApp" onSubmit={handleSubmit(_createGroupManager)}>
              <Inputs>
                <InputBlock>
                  <label htmlFor="name">Nome</label>
                  <Input
                    type="text"
                    id="name"
                    value={groupManagerName}
                    onChange={(e) => setGroupManagerName(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="email">E-mail</label>
                  <Input
                    type="email"
                    id="email"
                    value={groupManagerEmail}
                    onChange={(e) => setGroupManagerEmail(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="group">Grupo</label>
                  <Input
                    type="text"
                    id="group"
                    value={groupManagerGroup}
                    onChange={(e) => setGroupManagerGroup(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="twitter">Twitter</label>
                  <Input
                    type="text"
                    id="twitter"
                    value={groupManagerTwitter}
                    onChange={(e) => setGroupManagerTwitter(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="password">Senha</label>
                  <Input
                    type="password"
                    id="password"
                    value={groupManagerPassword}
                    onChange={(e) => setGroupManagerPassword(e.target.value)}
                  />
                </InputBlock>
                <CheckboxInputBlock>
                  <Label htmlFor="id_code">Código de Identificação</Label>
                  <CheckboxInput
                    type="checkbox"
                    id="id_code"
                    value={groupManagerIdentificationCode}
                    onChange={(e) => setGroupManagerIdentificationCode(!groupManagerIdentificationCode)}
                  />
                </CheckboxInputBlock>
                {groupManagerIdentificationCode ?
                  <InputBlock>
                    <label htmlFor="len_id_code">Quantidade de caracteres</label>
                    <Input
                      type="text"
                      id="len_id_code"
                      value={groupManagerLengthIdentificationCode}
                      onChange={(e) => setGroupManagerLengthIdentificationCode(e.target.value)}
                    />
                  </InputBlock>
                  : null}
              </Inputs>
              <SubmitButton type="submit">
                Adicionar
              </SubmitButton>
            </Form>
          </ContainerForm>
        </AddAppContainer>
      </Container >
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  groupManagers: state.user.group_managers
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setGroupManagers,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupManagers);
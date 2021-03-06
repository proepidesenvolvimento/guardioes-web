import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setManagers, setToken
} from 'actions/';

import { bindActionCreators } from 'redux';
import getAllManagers from './services/getAllManagers'
import createManager from './services/createManager'
import deleteManager from './services/deleteManager'
import editManager from './services/editManager';
import { modelsCheckboxes } from './modelsPermissions';

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
  SubmitButton,
  EditInput,
  EditButton,
} from './styles';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import ContentBox from '../ContentBox';

const Managers = ({
  token,
  user,
  managers,
  setManagers,
  setToken
}) => {

  const { handleSubmit } = useForm()
  const [managerName, setManagerName] = useState("")
  const [managerEmail, setManagerEmail] = useState("")
  const [managerPassword, setManagerPassword] = useState("")
  const [modalEdit, setModalEdit] = useState(false);
  const [editingManager, setEditingManager] = useState({});
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [managerShow, setManagerShow] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const [modelsManage, setModelsManage] = useState([]);
  const [showModelsManage, setShowModelsManage] = useState([]);

  const _createManager = async () => {
    const data = {
      "manager": {
        "password": managerPassword,
        "email": managerEmail,
        "name": managerName,
        "app_id": user.app_id,
        "permission_attributes": {
          "models_create": [],
          "models_read": [],
          "models_update": [],
          "models_destroy": [],
          "models_manage": modelsManage
        }
      }
    }
    const response = await createManager(data, token)
    if (!response.errors) {
      setManagerName("");
      setManagerPassword("");
      setManagerEmail("");
      setModelsManage([]);
      _getAllManagers(token);
    }
  }

  const handleModelsPermissions = (model) => {
    if (modelsManage.includes(model)) {
      let newModelsManage = modelsManage.filter((m) => m !== model);
      setModelsManage(newModelsManage);
    }
    else {
      let newModelsManage = modelsManage.slice();
      newModelsManage.push(model);
      setModelsManage(newModelsManage);
    }
  }

  const _deleteManager = async (id, token) => {
    await deleteManager(id, token)
    _getAllManagers(token)
  }

  const _editManager = async () => {
    const data = {
      "manager": {
        "email": editingManager.email,
        "name": editingManager.name,
        "app_id": user.app_id,
        "permission": editingManager.permission
      }
    }
    await editManager(editingManager.id, data, token);
    setModalEdit(false);
    _getAllManagers(token);
  }

  const handleShow = (content) => {
    setManagerShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setEditingManager(content);
    setModalEdit(!modalEdit);
  }

  const _getAllManagers = async (token) => {
    const response = await getAllManagers(token)
    loadManagers(response)
  }

  const loadManagers = async (response) => {
    let aux_managers = [];
    if (!response.managers) {
      response.managers = [];
    }
    response.managers.forEach(manager => {
      aux_managers.push({
        "id": manager.manager.id,
        "name": manager.manager.name,
        "email": manager.manager.email,
        "permissions": manager.permissions ? manager.models_manage : [],
      })
    })
    if (aux_managers.length === 0) {
      aux_managers = null
    }
    await setManagers(aux_managers)
  }

  useEffect(() => {
    _getAllManagers(token)
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
            Informações do Gerente
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>ID</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.id}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Nome</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.name}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>E-mail</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.email}
              disabled
            />
          </EditInput>
          <InputBlock>
            <label htmlFor="permission">Permissões do Gerente:</label>

            {modelsCheckboxes.map((model, key) => (
              <div className="form-check" key={key}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`manage-${model.value}`}
                  checked={managerShow.permissions ? managerShow.permissions.includes(model.value) : false}
                  disabled
                />
                <label className="form-check-label" htmlFor={`manage-${model.value}`}>
                  {model.label}
                </label>
              </div>
            ))}
          </InputBlock>
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
            Editar Gerente
          </Modal.Title>
        </Modal.Header>
        <form id="editManager" onSubmit={handleSubmit(_editManager)}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="edit_name">Nome</label>
              <input
                type="text"
                id="edit_name"
                value={editingManager.name}
                onChange={(e) => setEditingManager({...editingManager, name: e.target.value})}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_email">E-mail</label>
              <input
                type="email"
                id="edit_email"
                value={editingManager.email}
                onChange={(e) => setEditingManager({...editingManager, email: e.target.value})}
                disabled
              />
            </EditInput>

            <InputBlock>
            <label htmlFor="permission">Permissões do Gerente:</label>

            {modelsCheckboxes.map((model, key) => (
              <div className="form-check" key={key}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`manage-${model.value}-2`}
                  checked={editingManager.permissions ? editingManager.permissions.includes(model.value) : false}
                  onChange={() => {
                    let newPermissions = editingManager.permissions.slice()
                    if (editingManager.permissions.includes(model.value)) {
                      newPermissions = newPermissions.filter((p) => p !== model.value)
                    } else {
                      newPermissions.push(model.value)
                    }
                    setEditingManager({...editingManager, permission: newPermissions})
                  }}
                />
                <label className="form-check-label" htmlFor={`manage-${model.value}-2`}>
                  {model.label}
                </label>
              </div>
            ))}
          </InputBlock>
          </Modal.Body>
          <Modal.Footer>
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Gerentes"
          token={token}
          contents={managers}
          fields={fields}
          delete_function={_deleteManager}
          handleEdit={handleEdit}
          handleShow={handleShow}
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
                <InputBlock>
                  <label htmlFor="email">E-mail</label>
                  <Input
                    type="email"
                    id="email"
                    value={managerEmail}
                    onChange={(e) => setManagerEmail(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="password">Senha</label>
                  <Input
                    type="password"
                    id="password"
                    value={managerPassword}
                    onChange={(e) => setManagerPassword(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="permission">Permissões do Gerente:</label>

                  {modelsCheckboxes.map((model, key) => (
                    <div className="form-check" key={key}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`manage-${model.value}-3`}
                        checked={modelsManage.includes(model.value)}
                        onChange={() => handleModelsPermissions(model.value)}
                      />
                      <label className="form-check-label" htmlFor={`manage-${model.value}-3`}>
                        {model.label}
                      </label>
                    </div>
                  ))}
                </InputBlock>
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
  managers: state.user.managers
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setManagers,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Managers);

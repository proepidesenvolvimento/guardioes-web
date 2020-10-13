import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setSymptoms, setToken
} from 'actions/';

import { bindActionCreators } from 'redux';
import getAllSymptoms from './services/getAllSymptoms'
import createSymptom from './services/createSymptom'
import deleteSymptom from './services/deleteSymptom'
import editSymptom from './services/editSymptom';

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
  TextArea,
  EditButton
} from './styles';
import { useForm } from "react-hook-form";
import ContentBox from '../ContentBox';
import Modal from 'react-bootstrap/Modal';

const Symptoms = ({
  token,
  user,
  symptoms,
  setSymptoms,
  setToken
}) => {

  const { handleSubmit } = useForm()
  const [symptomName, setSymptomName] = useState("")
  const [symptomDescription, setSymptomDescription] = useState("")
  const [modalEdit, setModalEdit] = useState(false);
  const [editingSymptom, setEditingSymptom] = useState({});
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [symptomShow, setSymptomShow] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const _createSymptom = async () => {
    const data = {
      "description": symptomName,
      "code": symptomName.trim().replace(' ', ''),
      "priority": 1,
      "details": symptomDescription,
      "message": null,
      "app_id": 1
      // Por enquanto esta sendo usado o 1, mas quando for corrigido as rotas
      // será usado o app_id do user logado, como feito abaixo
      // "app_id": user.app_id
    }
    await createSymptom(data, token)
    setSymptomName("")
    setSymptomDescription("")
    _getAllSymptoms(token)
  }

  const _deleteSymptom = async (id, token) => {
    await deleteSymptom(id, token)
    _getAllSymptoms(token)
  }

  const _getAllSymptoms = async (token) => {
    const response = await getAllSymptoms(token)
    loadSymptoms(response)
  }

  const _editSymptom = async () => {
    const data = {
      "description": editName,
      "code": editName.trim().replace(' ', ''),
      "priority": 1,
      "details": editDescription,
      "message": null,
      "app_id": 1
    };
    await editSymptom(editingSymptom.id, data, token);
    setModalEdit(false);
    _getAllSymptoms(token);
  }

  const handleShow = (content) => {
    setSymptomShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setEditingSymptom(content);
    setEditName(content.name);
    setEditDescription(content.description);
    setModalEdit(!modalEdit);
  }

  const handleEditName = (value) => {
    setEditName(value);
  }

  const handleEditDescription = (value) => {
    setEditDescription(value);
  }

  const loadSymptoms = async (response) => {
    let aux_symptoms = [];
    if (!response.symptoms)
      response.symptoms = [];
    response.symptoms.forEach(symptom => {
      aux_symptoms.push({
        "id": symptom.id,
        "name": symptom.description,
        "description": symptom.details
      })
    })
    setSymptoms(aux_symptoms)
  }

  useEffect(() => {
    _getAllSymptoms(token)
    setToken(token)
  }, []);

  const fields = [{
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
            Informações do Sintoma
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>ID</label>
            <input
              className="text-dark"
              type="text"
              value={symptomShow.id}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Nome</label>
            <input
              className="text-dark"
              type="text"
              value={symptomShow.name}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Descrição</label>
            <TextArea
              className="text-dark"
              type="text"
              value={symptomShow.description}
              disabled
              rows="4"
              cols="50"
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
            Editar Sintoma
          </Modal.Title>
        </Modal.Header>
        <form id="editSymptom" onSubmit={handleSubmit(_editSymptom)}>
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
              <label htmlFor="edit_description">Descrição</label>
              <TextArea
                type="text"
                id="edit_description"
                value={editDescription}
                onChange={(e) => handleEditDescription(e.target.value)}
                rows="4"
                cols="50"
              />
            </EditInput>
          </Modal.Body>
          <Modal.Footer>
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Sintomas"
          token={token}
          contents={symptoms ? symptoms : []}
          fields={fields}
          delete_function={_deleteSymptom}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Sintoma</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addApp" onSubmit={handleSubmit(_createSymptom)}>
              <Inputs>
                <InputBlock>
                  <label htmlFor="name">Nome</label>
                  <Input
                    type="text"
                    id="name"
                    value={symptomName}
                    onChange={(e) => setSymptomName(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="name">Descrição</label>
                  <Input
                    type="text"
                    id="description"
                    value={symptomDescription}
                    onChange={(e) => setSymptomDescription(e.target.value)}
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
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  symptoms: state.user.symptoms
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setSymptoms,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Symptoms);
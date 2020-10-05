import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setGroups, setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import getAllGroups from './services/getAllGroups'
import createGroup from './services/createGroup'
import deleteGroup from './services/deleteGroup'
import editGroup from './services/editGroup';
import {
  Container,
  AddGroupContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  InputBlock,
  EditInput,
  SubmitButton,
  Input,
  SelectInput,
  Form
} from './styles';
import { useForm } from "react-hook-form";
import ContentBox from '../ContentBox';
import Modal from 'react-bootstrap/Modal';
import { sessionService } from 'redux-react-session';

const Groups = ({
  token,
  user,
  groups,
  setGroups,
  setToken
}) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [editingGroup, setEditingGroup] = useState({});
  const { handleSubmit } = useForm()
  const [modalShow, setModalShow] = useState(false);
  const [groupShow, setGroupShow] = useState({});

  const [creating, setCreating] = useState(null)
  const [creatingCourse, setCreatingCourse] = useState({
    parent_id: 0,
    address: "",
    cep: "",
    code: "",
    description: "",
    email: "",
    parent_id: 0,
    phone: "",
    children_label: null
  })

  const _createCourse = async () => {
    console.log(creatingCourse)
    const response = await createGroup(creatingCourse, token)
    console.log(response)
    fetchData(token)
  }

  const fetchData = async (token) => {
    const response = await getAllGroups(token, user.type)

    if (!response && !response.groups)
      return
    
    let aux_groups = response.groups
    aux_groups = aux_groups.filter((group) => group.children_label !== "ESTADO")
    aux_groups = aux_groups.filter((group) => group.children_label !== "Pais")
    aux_groups = aux_groups.map((group) => {
      switch(group.children_label) {
        case "MUNICIPIO":
          group.type = "Estado"
          break;
        case "GRUPO":
          group.type = "Município"
          break;
        case "CURSO":
          group.type = "Instituição"
          break;
        case null:
          group.type = "Curso"
          break;
      }
      group.parentName = group.parent.name;
      return group
    })
    setGroups(aux_groups)
  }

  const handleDelete = async (id, token) => {
    await deleteGroup(id, token)
    fetchData(token)
  }

  const _editGroup = async () => {
    const data = {
      description: editingGroup.description,
      code: editingGroup.code,
      address: editingGroup.address,
      cep: editingGroup.cep,
      phone: editingGroup.phone,
      email: editingGroup.email
    }
    await editGroup(editingGroup.id, data, token);
    setModalEdit(false);
    fetchData(token);
  }

  const handleShow = (content) => {
    setGroupShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setEditingGroup(content);
    setModalEdit(!modalEdit);
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();
    fetchData(token)
  }, [token]);

  const fields = [
    { key: "id", value: "ID" },
    { key: "description", value: "Nome" },
    { key: "type", value: "Tipo" },
    { key: "parentName", value: "Pertence a(o)" }
  ];

  console.log(creatingCourse.parent_id)

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Informações da Instituição
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <EditInput>
            <label>Nome</label>
            <input
              className="text-dark"
              type="text"
              value={groupShow.description}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Tipo</label>
            <input
              className="text-dark"
              type="text"
              value={groupShow.type}
              disabled
            />
          </EditInput>

          {groupShow.children_label ? 
            <EditInput>
              <label>Tipo dos Grupos Filhos</label>
              <input
                className="text-dark"
                type="text"
                value={groupShow.children_label}
                disabled
              />
            </EditInput>
          : null }

          {groupShow.parentName ?
            <EditInput>
              <label>Nome do Grupo Pai</label>
              <input
                className="text-dark"
                type="text"
                value={groupShow.parentName}
                disabled
              />
            </EditInput>
          : null }

          {groupShow.code ?
            <EditInput>
              <label htmlFor="edit_code">Código</label>
              <input
                type="text"
                id="edit_code"
                value={groupShow.code}
                disabled
              />
            </EditInput>
          : null }  

          { groupShow.address ?
            <EditInput>
              <label htmlFor="edit_address">Endereço</label>
              <input
                type="text"
                id="edit_address"
                value={groupShow.address}
                disabled
              />
            </EditInput>
          : null }

          {groupShow.cep ?
            <EditInput>
              <label htmlFor="edit_cep">CEP</label>
              <input
                type="text"
                id="edit_cep"
                value={groupShow.cep}
                disabled
              />
            </EditInput>
          : null }

          {groupShow.phone ?
            <EditInput>
              <label htmlFor="edit_phone">Telefone</label>
              <input
                type="text"
                id="edit_phone"
                value={groupShow.phone}
                disabled
              />
            </EditInput>
          : null }

          {groupShow.email ?
            <EditInput>
              <label htmlFor="edit_name">Email</label>
              <input
                type="text"
                id="edit_email"
                value={groupShow.email}
                disabled
              />
            </EditInput>
          : null }
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setModalShow(false)}>Voltar</SubmitButton>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalEdit}
        onHide={() => setModalEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Instituição
          </Modal.Title>
        </Modal.Header>
        <form id="editGroup" onSubmit={handleSubmit(_editGroup)}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="edit_name">Nome</label>
              <input
                type="text"
                id="edit_name"
                value={editingGroup.description}
                onChange={(e) => setEditingGroup({...editingGroup, description: e.target.value})}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_code">Código</label>
              <input
                type="text"
                id="edit_code"
                value={editingGroup.code}
                onChange={(e) => setEditingGroup({...editingGroup, code: e.target.value})}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_address">Endereço</label>
              <input
                type="text"
                id="edit_address"
                value={editingGroup.address}
                onChange={(e) => setEditingGroup({...editingGroup, address: e.target.value})}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_cep">CEP</label>
              <input
                type="text"
                id="edit_cep"
                value={editingGroup.cep}
                onChange={(e) => setEditingGroup({...editingGroup, cep: e.target.value})}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_phone">Telefone</label>
              <input
                type="text"
                id="edit_phone"
                value={editingGroup.phone}
                onChange={(e) => setEditingGroup({...editingGroup, phone: e.target.value})}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_name">Email</label>
              <input
                type="text"
                id="edit_email"
                value={editingGroup.email}
                onChange={(e) => setEditingGroup({...editingGroup, email: e.target.value})}
              />
            </EditInput>

          </Modal.Body>
          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
          <ContentBox
            title="Instituições"
            token={token}
            contents={groups ? groups : []}
            fields={fields}
            delete_function={handleDelete}
            handleEdit={handleEdit}
            handleShow={handleShow}  
          />
        
        <AddGroupContainer className="shadow-sm">
          {user.type === "admin" ?
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <SubmitButton style={{alignSelf: 'flex-start'}} onClick={() => setCreating("group")}>Add Instituição</SubmitButton>
              <SubmitButton style={{justifySelf: 'flex-end'}} onClick={() => setCreating("course")}>Add Curso</SubmitButton>  
            </div>
          : null}
          <ContainerHeader>
            <ContainerTitle>{creating === "group" ? "Adicionar Instituição" : "Adicionar Curso"}</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addCourse" onSubmit={handleSubmit(_createCourse)}>
              <InputBlock>
                <label htmlFor="name">Nome</label>
                <Input
                  type="text"
                  id="name"
                  value={creatingCourse.description}
                  onChange={(e) => setCreatingCourse({...creatingCourse, description: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Código</label>
                <Input
                  type="text"
                  id="code"
                  value={creatingCourse.code}
                  onChange={(e) => setCreatingCourse({...creatingCourse, code: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Endereço</label>
                <Input
                  type="text"
                  id="address"
                  value={creatingCourse.address}
                  onChange={(e) => setCreatingCourse({...creatingCourse, address: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">CEP</label>
                <Input
                  type="text"
                  id="cep"
                  value={creatingCourse.cep}
                  onChange={(e) => setCreatingCourse({...creatingCourse, cep: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Telefone</label>
                <Input
                  type="text"
                  id="phone"
                  value={creatingCourse.phone}
                  onChange={(e) => setCreatingCourse({...creatingCourse, phone: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Email</label>
                <Input
                  type="text"
                  id="email"
                  value={creatingCourse.email}
                  onChange={(e) => setCreatingCourse({...creatingCourse, email: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">{creating === "group" ? "Município" : "Instituição"}</label>
                <SelectInput
                  type="select"
                  id="name"
                  onChange={(e) => setCreatingCourse({...creatingCourse, parent_id: e.target.value})}
                >
                  <option value="" selected disabled hidden>Escolha aqui</option>
                  {creating === "group" ?
                    groups.filter((g) => g.children_label === "GRUPO").map((g) => {
                    return <option key={g.id} value={g.id}>{g.description}</option>
                  }) :
                    groups.filter((g) => g.children_label === "CURSO").map((g) => {
                    return <option key={g.id} value={g.id}>{g.description}</option>
                  })}
                </SelectInput>
              </InputBlock>

              <SubmitButton type="submit">
                {creating === "group" ? "Criar Instituição" : "Criar Curso"}
              </SubmitButton>
            </Form>
          </ContainerForm>
        </AddGroupContainer>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  groups: state.user.groups
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setGroups,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Groups);
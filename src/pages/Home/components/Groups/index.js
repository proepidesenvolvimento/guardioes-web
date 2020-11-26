import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setGroups, setToken } from 'actions/';
import { bindActionCreators } from 'redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import getAllGroups from './services/getAllGroups';
import createGroup from './services/createGroup';
import deleteGroup from './services/deleteGroup';
import validatePermissions from './services/validatePermissions';
import ModalShow from './components/ModalShow';
import ModalEdit from './components/ModalEdit';
import handleNavigate from './components/handleNavigate';
import editIcon from '../assets/edit-solid.svg';
import deleteIcon from '../assets/trash-solid.svg';
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
  Form,
  ContainerContent,
  ContentBoxHeader,
  ContentBoxTitle,
  ContentBoxTable,
  ContentBoxTableHeader,
  ContentBoxTableIcon,
} from './styles';
import { Table } from 'react-bootstrap';
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
  const [setGroupShow] = useState({});

  const [states, setStates] = useState([]);
  const [counties, setCounties] = useState([]);
  const [schools, setSchools] = useState([]);

  const [goBack, setGoBack] = useState(false);
  const [courses, setCourses] = useState([]);
  const [country, setCountry] = useState([]);
  const [creating, setCreating] = useState("course");
  const [creatingGroup, setCreatingGroup] = useState({
    parent_id: 0,
    address: "",
    cep: "",
    code: "",
    description: "",
    email: "",
    phone: "",
    children_label: null
  })
  const [creatingState, setCreatingState] = useState("");
  const [creatingCountie, setCreatingCountie] = useState("");

  useEffect(() => {
    if (creating === "group") {
      let desc = user.group_manager.group_name
      setCreatingGroup({...creatingGroup, description: desc, children_label: "CURSO"})
    }
    else
      setCreatingGroup({...creatingGroup, description: "", children_label: null})
  }, [creating])

  const _createGroup = async () => {
    const response = await createGroup(creatingGroup, token)
    if (!response.errors)
      clearData()
    fetchData(token)
  }

  const clearData = () => {
    setCreatingGroup({
      parent_id: 0,
      address: "",
      cep: "",
      code: "",
      description: "",
      email: "",
      phone: "",
      children_label: null
    })
    setEditingGroup({})
    setGroupShow({})
    setCreating("course")
  }

  const fetchData = async (token) => {
    const response = await getAllGroups(token)

    if (!response && !response.groups)
      return
    
    let aux_groups = response.groups
    setCountry(aux_groups[1])
    aux_groups = aux_groups.filter((group) => group.children_label !== "Pais")
    aux_groups = aux_groups.filter((group) => group.children_label !== "ESTADO")
    let aux_states = []
    let aux_counties = []
    let aux_schools = []
    let aux_courses = []

    aux_groups = aux_groups.map((group) => {
      group.parentName = group.parent.name
      switch(group.children_label) {
        case "MUNICIPIO":
          group.type = "Estado"
          aux_states.push(group)
          break;
        case "GRUPO":
          group.type = "Município"
          aux_counties.push(group)
          break;
        case "CURSO":
          group.type = "Instituição"
          aux_schools.push(group)
          break;
        case null:
          group.type = "Curso"
          aux_courses.push(group)
          break;
        default:
          break;
      }
      return group
    })
    setStates(aux_states)
    setCounties(aux_counties)
    setSchools(aux_schools)
    setCourses(aux_courses)
    setGroups(aux_groups.filter((g) => g.children_label === "MUNICIPIO"))
  }

  const handleDelete = async (id, token) => {
    await deleteGroup(id, token)
    fetchData(token)
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

  return (
    <>
      <ModalShow
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <ModalEdit
        show={modalEdit}
        onHide={() => setModalEdit(false)}
      />

      <Container>
        <ContainerContent>
          <ContentBoxHeader>
            <ContentBoxTitle>Instituições</ContentBoxTitle>
          </ContentBoxHeader>
          <ContentBoxTable>
            <Table responsive>
              <thead>
              {goBack ? 
              <tr>
                <td>
                  <button style={{width: '150%', height: '25px', padding: 0}} className="btn btn-info" onClick={() => handleNavigate(groups[0], true)}>
                    Voltar
                  </button>
                </td>
              </tr>
              : null }
                <tr>
                  {fields.map(field => (
                      <ContentBoxTableHeader key={field.value}>{field.value}</ContentBoxTableHeader>
                  ))}
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {groups.map(group => (
                  <tr key={group.id}>
                    {fields.map(field => (
                      <td key={field.value}>{group[field.key]}</td>
                    ))}
                    <td>
                      <button className="btn btn-info" onClick={() => handleShow(group)}>
                        Detalhes
                      </button>
                    </td>
                    {group.children_label !== null ?
                    <td>
                      <button className="btn btn-info" onClick={() => handleNavigate(group)}>
                        Ver filhos
                      </button>
                    </td>
                    : null}
                    {validatePermissions(group) ?
                    <>
                      <td>
                        <Link to="/panel">
                          <ContentBoxTableIcon
                            src={editIcon}
                            alt="Editar"
                            onClick={() => { handleEdit(group) }}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link to="/panel">
                          <ContentBoxTableIcon
                            src={deleteIcon}
                            alt="Deletar"
                            onClick={() => { handleDelete(group.id, token) }}
                          />
                        </Link>
                      </td>
                    </>
                    : null}
                  </tr>
                ))}
              </tbody>
            </Table>
          </ContentBoxTable>
        </ContainerContent>
        
        {user.type === "group_manager" ?
        <AddGroupContainer className="shadow-sm">
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <SubmitButton
                style={{alignSelf: 'flex-start'}}
                onClick={() => {
                  clearData()
                  setCreating("group")
                }}
              >Add Instituição</SubmitButton>
              <SubmitButton
                style={{justifySelf: 'flex-end'}}
                onClick={() => {
                  clearData()
                  setCreating("course")
                }}
              >Add Subgrupo de Instituição</SubmitButton>  
            </div>
          <ContainerHeader>
            <ContainerTitle>{creating === "group" ? "Adicionar Instituição" : "Adicionar Subgrupo de Instituição"}</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addCourse" onSubmit={handleSubmit(_createGroup)}>
              {creating === "course" ?
              <InputBlock>
                <label htmlFor="name">Nome</label>
                <Input
                  type="text"
                  id="name"
                  value={creatingGroup.description}
                  onChange={(e) => setCreatingGroup({...creatingGroup, description: e.target.value})}
                />
              </InputBlock>
              : null}

              <InputBlock>
                <label htmlFor="name">Código</label>
                <Input
                  type="text"
                  id="code"
                  value={creatingGroup.code}
                  onChange={(e) => setCreatingGroup({...creatingGroup, code: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Endereço</label>
                <Input
                  type="text"
                  id="address"
                  value={creatingGroup.address}
                  onChange={(e) => setCreatingGroup({...creatingGroup, address: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">CEP</label>
                <Input
                  type="text"
                  id="cep"
                  value={creatingGroup.cep}
                  onChange={(e) => setCreatingGroup({...creatingGroup, cep: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Telefone</label>
                <Input
                  type="text"
                  id="phone"
                  value={creatingGroup.phone}
                  onChange={(e) => setCreatingGroup({...creatingGroup, phone: e.target.value})}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="name">Email</label>
                <Input
                  type="text"
                  id="email"
                  value={creatingGroup.email}
                  onChange={(e) => setCreatingGroup({...creatingGroup, email: e.target.value})}
                />
              </InputBlock>
              <InputBlock>
                <label htmlFor="name">Estado</label>
                <SelectInput
                  type="select"
                  id="name"
                  onChange={(e) => setCreatingState(e.target.value)}
                >
                  <option>Escolha</option>
                  {states.filter((g) => g.type === "Estado").map((g) => {
                    return <option value={g.description}>{g.description}</option>
                  })}
                </SelectInput>
              </InputBlock>

              {creatingState.length !== 0 ?
              <InputBlock>
                <label htmlFor="name">Município</label>
                <SelectInput
                  type="select"
                  id="name"
                  onChange={(e) => {
                    const id = parseInt(e.target.value, 10)
                    if (creating === "group")
                      setCreatingGroup({...creatingGroup, parent_id: id})
                    const aux_description = counties.find(countie => countie.id === id).description
                    setCreatingCountie(aux_description)
                  }}
                >
                  <option>Escolha</option>
                  {counties.filter((g) => g.parent.name === creatingState).map((g) => {
                    return <option key={g.id} value={g.id}>{g.description}</option>
                  })}
                </SelectInput>
              </InputBlock>
              : null}

              {creating === "course" && creatingCountie.length !== 0?
              <InputBlock>
                <label htmlFor="name">Instituição</label>
                <SelectInput
                  type="select"
                  id="name"
                  onChange={(e) => {
                    const id = parseInt(e.target.value, 10)
                    if (creating === "course")
                      setCreatingGroup({...creatingGroup, parent_id: id})
                  }}
                >
                  <option>Escolha</option>
                  {schools.filter((g) => g.parent.name === creatingCountie).map((g) => {
                    return <option key={g.id} value={g.id}>{g.description}</option>
                  })}
                </SelectInput>
              </InputBlock>
              : null}

              <SubmitButton type="submit">
                {creating === "group" ? "Criar Instituição" : "Criar Subgrupo de Instituição"}
              </SubmitButton>
            </Form>
          </ContainerForm>
        </AddGroupContainer>
        : null}
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
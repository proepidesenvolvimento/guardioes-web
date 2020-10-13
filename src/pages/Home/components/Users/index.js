import React, { useEffect, useState } from 'react';
import {
  Container,
  EditInput,
  SubmitButton,
  EditCheckbox,
  EditCheckboxInput,
  SearchView
} from './styles';
import { connect } from 'react-redux';
import {
 setUsers,
 setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import ContentBox from '../ContentBox';
import getAllUsers from './services/getAllUsers';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'
import deleteUser from './services/deleteUser';
import editUser from './services/editUser';
import { useForm } from "react-hook-form";

const Users = ({
  setUsers,
  users,
  setToken,
  token
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [userShow, setUserShow] = useState({});
  const [modalEdit, setModalEdit] = useState(false);
  const [editingUser, setEditingUser] = useState({});
  const [editName, setEditName] = useState("");
  const [editBirthdate, setEditBirthdate] = useState(new Date());
  const [editCountry, setEditCountry] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editRace, setEditRace] = useState("");
  const [editProfessional, setEditProfessional] = useState(false);
  const { handleSubmit } = useForm();
  const [userSearch, setUserSearch] = useState("");
  const [userList, setUserList] = useState([]);


  const fields = [
    {
      key: "id",
      value: "ID"
    },
    {
      key: "user_name",
      value: "Nome"
    }
  ]

  const search = (userSearch) => {
    const filteredUsers = users.filter((user) => {
      if ( userSearch.length > 1) {
        return user.user_name && user.user_name.indexOf(userSearch) >= 0; 
      }
      else {
        return users
      }
    });
    setUserList(filteredUsers)
  }

  const handleShow = (user) => {
    setUserShow(user);
    setModalShow(!modalShow);
  }

  const handleSearch = (value) => {
    setUserSearch(value)
    search(userSearch)
  }
  const _getUsers = async (token) => {
    const response = await getAllUsers(token)
    console.log(response.users)
    setUsers(response.users)
    setUserList(response.users)
  }

  const _deleteUser = async (id, token) => {
    const response = await deleteUser(id, token)
    console.log(response)
    _getUsers(token);
  }

  const _editUser = async () => {
    const data = {
      "user": {
        "user_name": editName,
        "birthdate": editBirthdate,
        "country": editCountry,
        "gender": editGender,
        "race": editRace,
        "is_professional": editProfessional
      }
    };
    console.log(data);
    await editUser(editingUser.id, data, token);
    setModalEdit(false);
    _getUsers(token);
  }

  const handleEdit = (content) => {
    setEditingUser(content);
    setEditName(content.user_name);
    setEditBirthdate(content.birthdate);
    setEditCountry(content.country);
    setEditGender(content.gender);
    setEditRace(content.race);
    setEditProfessional(content.is_professional);
    setModalEdit(!modalEdit);
  }

  const handleEditName = (value) => {
    setEditName(value);
  }

  const handleEditBirthdate = (value) => {
    setEditBirthdate(value);
  }

  const handleEditCountry = (value) => {
    setEditCountry(value);
  }

  const handleEditGender = (value) => {
    setEditGender(value);
  }

  const handleEditRace = (value) => {
    setEditRace(value);
  }

  const handleEditProfessional = (value) => {
    setEditProfessional(value);
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();
    _getUsers(token)
  }, [token]);

  return (
    <>
      <Modal
        show={modalEdit}
        onHide={() => setModalEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Usuário
          </Modal.Title>
        </Modal.Header>
        <form id="editUser" onSubmit={handleSubmit(_editUser)}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="email">E-mail</label>
              <input
                className="text-dark"
                type="text"
                id="email"
                value={editingUser.email}
                disabled
              />
            </EditInput>

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
              <label htmlFor="edit_country">País</label>
              <input 
                type="text"
                id="edit_country"
                value={editCountry}
                onChange={(e) => handleEditCountry(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_birthdate">Data de Nascimento</label>
              <input
                id="edit_birthdate"
                type="date"
                value={moment(editBirthdate).format("YYYY-MM-DD")}
                onChange={(e) => handleEditBirthdate(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_gender">Gênero</label>
              <input 
                id="edit_gender"
                type="text"
                value={editGender}
                onChange={(e) => handleEditGender(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_race">Raça</label>
              <input 
                id="edit_race"
                type="text"
                value={editRace}
                onChange={(e) => handleEditRace}
              />
            </EditInput>

            <EditCheckbox>
              <label htmlFor="edit_professional">Profissional da Saúde</label>
              <EditCheckboxInput 
                id="edit_professional"
                type="checkbox"
                value={editProfessional}
                onChange={() => handleEditProfessional(!editProfessional)}
              />
            </EditCheckbox>
          </Modal.Body>

          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            User Information
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>Birthdate</label>
            <input
              className="text-dark"
              type="text"
              value={moment(userShow.birthdate).format('MM/DD/YYYY')}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Country</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.country}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Gender</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.gender}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Race</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.race}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Is Professional</label>
            <input
              className="text-dark"
              type="text"
              value={userShow.is_professional}
              disabled
            />
          </EditInput>
        </Modal.Body>

        <Modal.Footer>
          <SubmitButton onClick={() => setModalShow(false)}>Voltar</SubmitButton>
        </Modal.Footer>
      </Modal>

      <Container>
        <SearchView>
          <EditInput>
            <label>Search Users</label>
            <input 
              type="text"
              value={userSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </EditInput>
        </SearchView>
        <ContentBox 
          title="Users"
          fields={fields}
          contents={userList ? userList : []}
          handleShow={handleShow}
          component_height={'40rem'}
          delete_function={_deleteUser}
          token={token}
          handleEdit={handleEdit}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  users: state.user.users
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setUsers,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users); 
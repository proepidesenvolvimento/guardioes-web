import React, { useEffect, useState } from 'react';
import {
    Container,
    AddContentContainer,
    ContainerHeader,
    ContainerTitle,
    ContainerForm,
    InputBlock,
    SubmitButton,
    EditInput,
    TextArea
  } from './styles';
import { useForm } from "react-hook-form";
import ContentBox from '../ContentBox';
import getAllContents from './services/getAllContents'
import deleteContent from './services/deleteContent'
import createContent from './services/createContent'
import editContent from './services/editContent';
import { connect } from 'react-redux';
import {
  setContents,
  setToken
} from 'actions/';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import Modal from 'react-bootstrap/Modal';

const Contents = ({
  contents,
  token,
  setToken,
  user,
  setContents
}) => {
  const fields =
    [{
      key: "id",
      value: "ID"
    },
    {
      key: "title",
      value: "Title",
    },
  ];
  const { handleSubmit } = useForm()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const content_type = useState("text")
  const [source_link, setSourceLink] = useState("")
  const [modalEdit, setModalEdit] = useState(false);
  const [editingContent, setEditingContent] = useState({});
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editSourceLink, setEditSourceLink] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [contentShow, setContentShow] = useState({});


  const _getContents = async (token) => {
    const response = await getAllContents(token)
    setContents(response.contents)
  }

  const _createContent = async () => {
    const data = {
      "content": {
        title,
        body,
        content_type,
        source_link,
        app_id: user.app_id
      }
    }
    await createContent(data, token)
    setTitle("");
    setBody("");
    setSourceLink("");
    _getContents(token)
  }

  const _editContent = async () => {
    const data = {
      "title": editTitle,
      "body": editBody,
      content_type,
      "source_link": editSourceLink,
      app_id: user.app_id
    };
    await editContent(editingContent.id, data, token);
    setModalEdit(false);
    _getContents(token);
  }

  const handleShow = (content) => {
    setContentShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setEditingContent(content);
    setEditTitle(content.title);
    setEditBody(content.body);
    setEditSourceLink(content.source_link);
    setModalEdit(!modalEdit);
  }

  const handleEditTitle = (value) => {
    setEditTitle(value);
  }

  const handleEditBody = (value) => {
    setEditBody(value);
  }

  const handleEditSourceLink = (value) => {
    setEditSourceLink(value);
  }

  const _deleteContent = async (id, token) => {
    await deleteContent(id, token)
    _getContents(token);
  }

  useEffect(() => {
    const _loadSession = async () => {
      const auxSession = await sessionService.loadSession()
      setToken(auxSession.token)
    }
    _loadSession();
    _getContents(token)
  }, [token]);

  const handleTitle = (value) => {
    setTitle(value)
  }

  const handleBody = (value) => {
    setBody(value)
  }

  const handleSourceLink = (value) => {
    setSourceLink(value)
  }
  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Informações do Conteúdo
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>ID</label>
            <input
              className="text-dark"
              type="text"
              value={contentShow.id}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Título</label>
            <input
              className="text-dark"
              type="text"
              value={contentShow.title}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Conteúdo</label>
            <TextArea
              className="text-dark"
              type="text"
              value={contentShow.body}
              disabled
              rows="4"
              cols="50"
            />
          </EditInput>

          <EditInput>
            <label>Tipo</label>
            <input
              className="text-dark"
              type="text"
              value={contentShow.content_type}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Fonte</label>
            <input
              className="text-dark"
              type="text"
              value={contentShow.source_link}
              disabled
            />
          </EditInput>
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
            Editar Conteúdo
          </Modal.Title>  
        </Modal.Header>  
        <form id="editContent" onSubmit={handleSubmit(_editContent)}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="edit_title">Título</label>
              <input
                type="text"
                id="edit_title"
                value={editTitle}
                onChange={(e) => handleEditTitle(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_body">Conteúdo</label>
              <TextArea
                type="text"
                id="edit_body"
                value={editBody}
                onChange={(e) => handleEditBody(e.target.value)}
                rows="4"
                cols="50"
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_source_link">Link da Fonte</label>
              <input
                type="text"
                id="edit_source_link"
                value={editSourceLink}
                onChange={(e) => handleEditSourceLink(e.target.value)}
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
            title="Conteúdos" 
            fields={fields}
            delete_function={_deleteContent}
            contents={contents ? contents : []}
            token={token}
            handleEdit={handleEdit}
            handleShow={handleShow}
            />

        <AddContentContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Conteúdo</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <form id="addContent" onSubmit={handleSubmit(_createContent)}>
              <InputBlock>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => handleTitle(e.target.value)}
                />
              </InputBlock>

              <InputBlock>
                <label htmlFor="body">Body</label>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => handleBody(e.target.value)} />
              </InputBlock>

              <InputBlock>
                <label htmlFor="body">Source Link</label>
                <input
                  type="text"
                  id="source_link"
                  value={source_link}
                  onChange={(e) => handleSourceLink(e.target.value)} />
              </InputBlock>



              {/* <Input type="submit" className="shadow-sm" /> */}
              <SubmitButton type="submit">
                Criar Conteudo
              </SubmitButton>
            </form>
          </ContainerForm>
        </AddContentContainer>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  contents: state.user.contents
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setContents,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contents);
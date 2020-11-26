import React from 'react';
import Modal from 'react-bootstrap/Modal';
import editGroup from './services/editGroup';
import {
  EditInput,
  SubmitButton
} from './styles';

const [modalEdit, setModalEdit] = useState(false);
const [editingGroup, setEditingGroup] = useState({});

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

const ModalEdit = ({
  
  }) => (
    <ModalEdit
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

            {editingGroup.code ?
            <EditInput>
              <label htmlFor="edit_code">Código</label>
              <input
                type="text"
                id="edit_code"
                value={editingGroup.code}
                onChange={(e) => setEditingGroup({...editingGroup, code: e.target.value})}
              />
            </EditInput>
            : null}

            {editingGroup.address ?
            <EditInput>
              <label htmlFor="edit_address">Endereço</label>
              <input
                type="text"
                id="edit_address"
                value={editingGroup.address}
                onChange={(e) => setEditingGroup({...editingGroup, address: e.target.value})}
              />
            </EditInput>
            : null}

            {editingGroup.cep ?
            <EditInput>
              <label htmlFor="edit_cep">CEP</label>
              <input
                type="text"
                id="edit_cep"
                value={editingGroup.cep}
                onChange={(e) => setEditingGroup({...editingGroup, cep: e.target.value})}
              />
            </EditInput>
            : null}

            {editingGroup.phone ?
            <EditInput>
              <label htmlFor="edit_phone">Telefone</label>
              <input
                type="text"
                id="edit_phone"
                value={editingGroup.phone}
                onChange={(e) => setEditingGroup({...editingGroup, phone: e.target.value})}
              />
            </EditInput>
            : null}

            {editingGroup.email ?    
            <EditInput>
              <label htmlFor="edit_name">Email</label>
              <input
                type="text"
                id="edit_email"
                value={editingGroup.email}
                onChange={(e) => setEditingGroup({...editingGroup, email: e.target.value})}
              />
            </EditInput>
            : null}

          </Modal.Body>
          <Modal.Footer>
            <SubmitButton type="submit">Editar</SubmitButton>
          </Modal.Footer>
        </form>
    </ModalEdit>
  );

export default ModalEdit;
import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
    Container,
    ContentBoxHeader,
    ContentBoxTitle,
    ContentBoxTable,
    ContentBoxTableHeader,
    ContentBoxTableIcon,
} from './styles';

import editIcon from '../assets/edit-solid.svg';
import deleteIcon from '../assets/trash-solid.svg';

const ContentBox = ({ 
    title,
    fields,
    contents,
    delete_function,
    token,
    handleEdit,
    handleShow,
    component_height
  }) => {

    const _deleteApp = async (id, token) => {
        await delete_function(id, token)
    }

    const setEditingContent = (content) => {
        handleEdit(content);
    }

    const setContentShow = (content) => {
        handleShow(content);
    }
 
    return (
        <Container 
          className="shadow-sm"
          component_height={component_height}
          >
            <ContentBoxHeader>
                <ContentBoxTitle>{title}</ContentBoxTitle>
            </ContentBoxHeader>
            <ContentBoxTable
              component_height={component_height}
            >
                <Table responsive>
                    <thead>
                        <tr>
                            {fields.map(field => (
                                <ContentBoxTableHeader>{field.value}</ContentBoxTableHeader>
                            ))}
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {contents.map(content => (
                            <tr>
                                {fields.map(field => (
                                    <td>{content[field.key]}</td>
                                ))}
                                <td>
                                    <Link to="/panel">
                                        <button className="btn btn-info" onClick={() => { setContentShow(content) }}>
                                            Visualizar
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to="/panel">
                                        <ContentBoxTableIcon
                                            src={editIcon}
                                            alt="Editar"
                                            onClick={() => { setEditingContent(content) }}
                                        />
                                    </Link>
                                </td>
                                <td>
                                    <Link to="/panel">
                                        <ContentBoxTableIcon
                                            src={deleteIcon}
                                            alt="Deletar"
                                            onClick={() => { _deleteApp(content.id, token) }}
                                        />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ContentBoxTable>
        </Container>
    );
}

export default ContentBox;
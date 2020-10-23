import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setSyndromes, setToken } from 'actions/';
import { bindActionCreators } from 'redux';
import { useForm } from 'react-hook-form';
import ContentBox from '../ContentBox';
import Modal from 'react-bootstrap/Modal';
import getAllSyndromes from './services/getAllSyndromes';
import deleteSyndrome from './services/deleteSyndrome';
import createSyndrome from './services/createSyndrome';
import MultiSelect from 'react-multi-select-component';
import getAllSymptoms from '../Symptoms/services/getAllSymptoms';
import editSyndrome from './services/editSyndrome';

import {
    Container,
    AddSyndromeContainer,
    ContainerHeader,
    ContainerTitle,
    ContainerForm,
    InputBlock,
    EditInput,
    SubmitButton,
    TextArea,
    SymptomsButton,
    ButtonBlock
} from './styles';

const Syndromes = ({
    token,
    user,
    syndromes,
    setSyndromes,
    setToken
}) => {
    const { handleSubmit } = useForm();
    const [syndromeDescription, setSyndromeDescription] = useState("");
    const [syndromeDetails, setSyndromeDetails] = useState("");
    const [createModal, setCreateModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [syndromeShow, setSyndromeShow] = useState({});
    const [editDescription, setEditDescription] = useState("");
    const [editDetails, setEditDetails] = useState("");
    const [editSymptoms, setEditSymptoms] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [editingSyndrome, setEditingSyndrome] = useState({});

    const _createSyndrome = async () => {
        let symptoms = [];
        selected.map(s => {
            symptoms.push({
                description: s.label,
                percentage: s.percentage,
                app_id: s.app_id
            })
        })
        const data = {
            "syndrome": {
                "description": syndromeDescription,
                "details": syndromeDetails,
                "symptom": symptoms
            }
        }
        const response = await createSyndrome(data, token);
        _getSyndromes(token);
        setSyndromeDescription("");
        setSyndromeDetails("");
        setSelected([]);
    }

    const _getSyndromes = async (token) => {
        const response = await getAllSyndromes(token);
        setSyndromes(response.syndromes);
    }

    const _getSymptoms = async (token) => {
        const response = await getAllSymptoms(token);
        let s = [];
        if (!response.symptoms) {
            response.symptoms = [];
        }
        response.symptoms.map(async symptom => {
            const option = {
                label: symptom.description, 
                value: symptom.id,
                percentage: 0,
                app_id: 1
            };
            s.push(option);
        });
        setOptions(s);
    }

    const _deleteSyndrome = async (id, token) => {
        await deleteSyndrome(id, token);
        _getSyndromes(token);
    }

    const _editSyndrome = async () => {
        let symptoms = [];
        editSymptoms.map(s => {
            symptoms.push({
                description: s.label,
                percentage: s.percentage,
                app_id: s.app_id
            })
        })
        const data = {
            "description": editDescription,
            "details": editDetails,
            "symptom": symptoms
        };
        await editSyndrome(editingSyndrome.id, data, token);
        setEditModal(false);
        _getSyndromes(token);
    }

    const handlePercentage = (value, symptom) => {
        setSelected(
            selected.map(s => 
                s.value === symptom.value ? {... s, percentage: value} : s
            )
        );
    }

    const handleEditPercentage = (value, symptom) => {
        setEditSymptoms(
            editSymptoms.map(s => 
                s.value === symptom.value ? {... s, percentage: value} : s
            )
        )
    }

    const handleEdit = (content) => {
        setEditingSyndrome(content);
        setEditDescription(content.description);
        setEditDetails(content.details);
        setEditSymptoms(content.symptoms);
        setEditModal(!editModal);
    }

    const handleShow = (content) => {
        setSyndromeShow(content);
        setShowModal(!showModal);
    }

    useEffect(() => {
        _getSyndromes(token);
        _getSymptoms(token);
        setToken(token);
    }, [token]);

    const fields = [
        { key: "id", value: "ID" },
        { key: "description", value: "Título" }
    ];

    return (
        <>
            <Modal
                show={editModal}
                onHide={() => setEditModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Editar Síndrome
                    </Modal.Title>
                </Modal.Header>
                <form id="editSyndrome" onSubmit={handleSubmit(_editSyndrome)}>
                    <Modal.Body>
                        <EditInput>
                            <label htmlFor="edit_title">Título</label>
                            <input
                                type="text"
                                id="edit_title"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </EditInput>

                        <EditInput>
                            <label htmlFor="edit_description">Descrição</label>
                            <TextArea
                                type="text"
                                id="edit_description"
                                value={editDetails}
                                onChange={(e) => setEditDetails(e.target.value)}
                                rows="1"
                                cols="50"
                            />
                        </EditInput>

                        <EditInput>
                            <label htmlFor="edit_symptoms">Sintomas</label>
                            <MultiSelect
                                options={options}
                                value={editSymptoms}
                                onChange={setEditSymptoms}
                                id="edit_symptoms"
                            />
                        </EditInput>

                        {editSymptoms.map(s => (
                            <EditInput className="bg-light p-2">
                                <h6>{s.label}</h6>
                                <label htmlFor={`edit_percentage-${s.value}`}>Porcentagem</label>
                                <input
                                    type="number"
                                    id={`edit_percentage-${s.value}`}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={s.percentage}
                                    onChange={(e) => handleEditPercentage(e.target.value, s)}
                                />
                            </EditInput>
                        ))}                        
                    </Modal.Body>

                    <Modal.Footer>
                        <SubmitButton type="submit">Editar</SubmitButton>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal
                show={createModal}
                onHide={() => setCreateModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sintomas
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditInput>
                        <label htmlFor="symptoms">Sintomas</label>
                        <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            id="symptoms"
                        />
                    </EditInput>

                    {selected.map(s => (
                        <EditInput className="bg-light p-2">
                            <h6>{s.label}</h6>
                            <label htmlFor={`percentage=${s.value}`}>Porcentagem</label>
                            <input
                                type="number"
                                id={`percentage-${s.value}`}
                                min={0}
                                max={1}
                                step={0.01}
                                value={s.percentage}
                                onChange={(e) => handlePercentage(e.target.value, s)}
                            />
                        </EditInput>
                    ))}
                </Modal.Body>

                <Modal.Footer>
                    <SubmitButton onClick={() => setCreateModal(false)}>Confirmar</SubmitButton>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Informações da Síndrome
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditInput>
                        <label>ID</label>
                        <input
                            className="text-dark"
                            type="text"
                            value={syndromeShow.id}
                            disabled
                        />
                    </EditInput>

                    <EditInput>
                        <label>Título</label>
                        <input 
                            className="text-dark"
                            type="text"
                            value={syndromeShow.description}
                            disabled
                        />
                    </EditInput>

                    <EditInput>
                        <label>Descrição</label>
                        <TextArea
                            className="text-dark"
                            type="text"
                            value={syndromeShow.details}
                            disabled
                            rows="1"
                            cols="50"
                        />
                    </EditInput>

                    {syndromeShow.symptoms ? syndromeShow.symptoms.map(symptom => (
                        <EditInput className="bg-light p-2">
                            <h6>{symptom.label}</h6>
                            <label htmlFor={`percentage-${symptom.id}`}>Porcentagem</label>
                            <input
                                type="number"
                                id={`percentage-${symptom.id}`}
                                min={0}
                                max={1}
                                step={0.01}
                                value={symptom.percentage}
                                disabled
                            />
                        </EditInput>
                    )) : null }
                </Modal.Body>

                <Modal.Footer>
                    <SubmitButton onClick={() => setShowModal(false)}>Voltar</SubmitButton>                    
                </Modal.Footer>
            </Modal>

            <Container>
                <ContentBox
                    title="Síndromes"
                    token={token}
                    contents={syndromes ? syndromes : []}
                    fields={fields}
                    delete_function={_deleteSyndrome}
                    handleShow={handleShow}
                    handleEdit={handleEdit}
                />

                <AddSyndromeContainer className="shadow-sm">
                    <ContainerHeader>
                        <ContainerTitle>
                            Adicionar Síndrome
                        </ContainerTitle>
                    </ContainerHeader>
                    <ContainerForm>
                        <form id="addSyndrome" onSubmit={handleSubmit(_createSyndrome)}>
                            <InputBlock>
                                <label htmlFor="description">Título</label>
                                <input
                                    type="text"
                                    id="description"
                                    value={syndromeDescription}
                                    onChange={(e) => setSyndromeDescription(e.target.value)}
                                />
                            </InputBlock>

                            <InputBlock>
                                <label htmlFor="details">Descrição</label>
                                <TextArea
                                    type="text"
                                    id="details"
                                    value={syndromeDetails}
                                    onChange={(e) => setSyndromeDetails(e.target.value)}
                                    rows="1"
                                    cols="50"
                                />
                            </InputBlock>

                            <ButtonBlock>
                                <SymptomsButton onClick={() => setCreateModal(!createModal)}>
                                    Ver Sintomas
                                </SymptomsButton>

                                <SubmitButton type="submit">
                                    Criar Síndrome
                                </SubmitButton>
                            </ButtonBlock>
                        </form>
                    </ContainerForm>
                </AddSyndromeContainer>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    user: state.user.user,
    syndromes: state.user.syndromes
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        setSyndromes,
        setToken
    },
    dispatch,
);

export default connect (
    mapStateToProps,
    mapDispatchToProps,
)(Syndromes);
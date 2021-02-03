import api from 'services/api';

const editSyndrome = async (id, data, token) => 
    await api.patch(`/syndromes/${id}`, data, 
    {
        headers: {
            "Authorization": token,
        }
    }
    )
    .then(async (res) => {
        const response = { data: res.data };
        alert('Sindrome editado!');
        return response;
    })
    .catch((e) => {
        if (e.response.data.error === "You are not authorized to access this page.") {
            alert("Você não tem permissão para editar Síndromes.");
        } else {
            alert('Algo deu errado, tente novamente!');
        }
        console.log(e);
        return { data: {}, errors: e };
    });

export default editSyndrome;
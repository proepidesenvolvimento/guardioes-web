import api from 'services/api';

const createSyndrome = async (data, token) =>
    await api.post(`/syndromes`, data, 
    {
        headers: {
            "Authorization": token,
        }
    }
    )
    .then(async (res) => {
        const response = { data: res.data };
        alert('Sindrome criado!');
        return response;
    })
    .catch((e) => {
        if (e.response.data.error === "You are not authorized to access this page.") {
            alert("Você não tem permissão para criar Síndromes.");
        } else {
            alert('Algo deu errado, tente novamente!');
        }
        console.log(e);
        return { data: {}, errors: e };
    });

export default createSyndrome;
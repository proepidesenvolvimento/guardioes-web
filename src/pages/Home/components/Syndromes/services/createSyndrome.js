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
        return response;
    })
    .catch((e) => {
        alert("Algo deu errado, tente novamente!");
        console.log(e);
        return { data: {}, errors: e };
    });

export default createSyndrome;
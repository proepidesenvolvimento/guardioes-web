import api from 'services/api';

const getAllSyndromes = async (token) => 
    await api.get('/syndromes', {
        headers: {
            "Authorization": token,
        },
    }
    )
    .then(async (res) => {
        const { data } = res;
        return data;
    })
    .catch((e) => {
        console.log(e);
        return { data: {}, errors: e }
    });

export default getAllSyndromes;
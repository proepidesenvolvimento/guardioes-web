import api from 'services/api';

const deleteSyndrome = async (id, token) =>
    api.delete(`/syndromes/${id}`, {
        headers: {
            "Authorization": token,
        },
    }
    )
    .then(async (res) => {
        const { data } = res;
        alert("Syndrome Deletada!");
        return data;
    })
    .catch((e) => {
        console.log(e);
    });

export default deleteSyndrome;
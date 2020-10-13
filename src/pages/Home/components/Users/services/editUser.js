import api from 'services/api';

const editUser = async (id, data, token) => {
        await api.patch(`/admin_update/${id}`, data,
        {
            headers: {
                "Authorization": token,
            }
        }
    )
        .then(async (res) => {
            alert('Usuário Editado!');
            const response = { data: res.data };
            return response;
        })
        .catch((e) => {
            alert('Algo deu errado, tente novamente!');
            console.log(e);
            return { data: {}, errors: e };
        });
}
export default editUser;
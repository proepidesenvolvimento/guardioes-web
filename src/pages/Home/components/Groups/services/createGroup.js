import api from 'services/api';

const createGroup = async (data, token) =>
  api.post(`/groups`, data,
    {
      headers: {
        "Authorization": token,
      }
    }
  )
    .then(async (res) => {
      alert('Grupo criado!');
      const response = { data: res.data };
      return response
    })
    .catch((e) => {
      alert('Algo deu errado, tente novamente!');
      console.log(e);
      return { data: {}, errors: e }
    });
export default createGroup;
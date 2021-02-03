import api from 'services/api';

const createManagers = async (data, token) =>
  api.post(`/manager/signup`, data,
    {
      headers: {
        "Authorization": token,
      }
    }
  )
    .then(async (res) => {
      const response = { data: res.data };
      alert('Menager criado!');
      return response
    })
    .catch((e) => {
      alert('Algo deu errado, tente novamente!');
      console.log(e);
      return { data: {}, errors: e }
    });
    
export default createManagers;
import api from 'services/api';

const getAllCityManagers = async (token) => 
  api.get('/city_managers', {
    headers: {
      "Authorization": token,
    },
  })
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para visualizar Gerentes de Municípios.");
    }
    console.log(e);
    return { data: {}, errors: e }
  });

export default getAllCityManagers;

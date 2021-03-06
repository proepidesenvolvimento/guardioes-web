import api from 'services/api';

const editCityManager = async (id, data, token) => 
  api.patch(`/city_managers/${id}`, data, {
    headers: {
      "Authorization": token,
    }
  })
  .then(async (res) => {
    alert('Editado com sucesso!');
    const response = { data: res.data };
    return response;
  })
  .catch((e) => {
    if (e.response.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para editar Gerentes de Municípios.");
    } else {
      alert('Algo deu errado, tente novamente!');
    }
    console.log(e);
    return { data: {}, errors: e };
  });

export default editCityManager;
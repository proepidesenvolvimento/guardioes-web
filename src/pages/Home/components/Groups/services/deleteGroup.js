import api from 'services/api';

const deleteGroup = async (id, token) => api
  .delete(`/groups/${id}`, {
    headers: {
      "Authorization": token,
    },
  }
  )
  .then(async (res) => {
    const { data } = res;
    alert("Grupo deletado")
    return data
  })
  .catch((e) => {
    console.log(e);
  });

export default deleteGroup;

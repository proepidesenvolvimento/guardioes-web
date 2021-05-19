import api from 'services/api';

const getGraphs = async (token, type) =>
  api.post(`/data_visualization/metabase_urls`, 
  {
    "type": type
  },
  {
    headers: {
      "Authorization": token
    },
  }
)
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    if (e.response?.data.error === "You are not authorized to access this page.") {
      alert("Você não tem permissão para visualizar Instituições.");
    }
    console.log(e);
    return { data: {}, errors: e }
  });

export default getGraphs;
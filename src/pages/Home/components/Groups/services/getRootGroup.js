import api from 'services/api';

const getRootGroup = async () => api
  .get(`/groups/root`)
  .then(async (res) => {
    const { data } = res;
    return data
  })
  .catch((e) => {
    return { data: {}, errors: e }
  });

export default getRootGroup;
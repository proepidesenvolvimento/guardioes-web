import axios from 'axios';
import { apiURL } from 'services/urls'

axios.defaults.baseURL = apiURL;
axios.defaults.responseType = 'json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

export default axios;
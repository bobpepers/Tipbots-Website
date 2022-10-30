import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'discordapp.com';

export default axios;

import axios from 'axios';

const baseURL = 'http://localhost:3001/';

export default axios.create({
  baseURL: baseURL,
});

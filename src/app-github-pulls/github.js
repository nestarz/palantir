/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.github.com',
  withCredentials: false,
});
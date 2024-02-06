import axios from 'axios';

const gamepassApiClient = axios.create({
  baseURL: 'http://localhost:2075', // Replace with your API endpoint
  headers: {
    'Content-Type': 'application/json'
  }
});

export default gamepassApiClient;
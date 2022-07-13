import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

export const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

export const update = (id, changedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, changedPerson);
  return request
    .then((response) => response.data)
    .catch((err) => {
      console.error('oops');
    });
};

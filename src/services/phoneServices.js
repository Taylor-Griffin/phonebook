import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

export const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

// export const remove = (id) => {
//   console.log(id);
//   const request = axios.delete(`${baseUrl}/${id}`);
//   return request.then((response) => response.data);
// };

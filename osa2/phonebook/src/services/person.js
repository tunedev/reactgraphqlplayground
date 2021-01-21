import axios from 'axios';
const baseUrl = '/api/persons';

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data.data);
};

export const create = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then((response) => response.data.data);
};

export const deleteOne = (id) => {
  if (window.confirm('Do you really want to delete this person')) {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => {
      return response.data.data;
    });
  }
};

export const update = (id, obj) => {
  const request = axios.patch(`${baseUrl}/${id}`, obj);
  return request.then((response) => response.data.data);
};

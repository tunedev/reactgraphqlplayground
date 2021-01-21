import axios from 'axios';

const baseUrl = 'http://localhost:3331/notes';

export const getAll = async () => (await axios.get(baseUrl)).data;

export const newNote = async (content) =>
  (await axios.post(baseUrl, { content, important: false })).data;

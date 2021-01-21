import axios from 'axios';

const baseUrl = 'http://localhost:3222/anecdotes';

export const getAll = async () => (await axios.get(baseUrl)).data;

export const addNew = async (content) =>
  (await axios.post(baseUrl, { content, votes: 0 })).data;

export const voteAnecdote = async (id, updatedContent) => {
  console.log(
    (await axios.patch(`${baseUrl}/${id}`, { ...updatedContent })).data
  );
};

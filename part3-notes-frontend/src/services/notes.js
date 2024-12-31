import axios from "axios";
const baseUrl = "/api/notes";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject, user) => {
  const request = axios.post(baseUrl, newObject, {
    headers: { Authorization: user ? `Bearer ${user.token}` : null },
  });
  const response = await request;
  return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

export default {
  getAll,
  create,
  update,
};

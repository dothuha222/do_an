import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/receptions";

export const listReception = () => axios.get(REST_API_BASE_URL);

export const createReception = (recep) => axios.post(REST_API_BASE_URL,recep)

export const getReception = (recepId) => axios.get(REST_API_BASE_URL + '/' + recepId)

export const updateReception = (recepId,reception) => axios.put(REST_API_BASE_URL + '/' + recepId,reception);

export const deleteReception = (recepId) => axios.delete(REST_API_BASE_URL + '/' + recepId);
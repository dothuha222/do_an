import axios from "axios";

const REST_API_PATIENT = "http://localhost:8080/user";
const REST_API_CHECKACCOUNT = "http://localhost:8080/user/check-account"
const REST_API_GET_ALL = "http://localhost:8080/user/"

const REST_API_USER = "http://localhost:8080/user/"
const REST_API_BENH_NHAN = "http://localhost:8080/user/benhnhan"

const REST_API_DON = "http://localhost:8080/dontiepnhan/1";
const REST_API_DON_DA_DUYET = "http://localhost:8080/dontiepnhan/2"
const REST_API_DON_TU_CHOI = "http://localhost:8080/dontiepnhan/6"


export const createPatient = (patient) => axios.post(REST_API_PATIENT,patient)
export const checkAccount = (acc) => axios.post(REST_API_CHECKACCOUNT,acc)
export const getAllUsers = () => axios.get(REST_API_GET_ALL)
export const getAllBenhNhan = () => axios.get(REST_API_BENH_NHAN)
export const changePassword = (id, password) => {
  return axios.put(`${REST_API_USER}${id}`, password);
};

export const getDon = () => axios.get(REST_API_DON)
export const getDonDuyet = () => axios.get(REST_API_DON_DA_DUYET)
export const getDonTuChoi = () => axios.get(REST_API_DON_TU_CHOI)

export const getUserById = (id) => {
    return axios.get(`${REST_API_USER}/${id}`)
};

export const updateUser = (id, userData) => {
    return axios.put(`${REST_API_USER}/${id}`, userData);
  };

  export const deleteUser = (id) => {
    return axios.delete(`${REST_API_USER}/${id}`);
  };



// export const listReception = () => axios.get(REST_API_BASE_URL);


// export const getReception = (recepId) => axios.get(REST_API_BASE_URL + '/' + recepId)

// export const updateReception = (recepId,reception) => axios.put(REST_API_BASE_URL + '/' + recepId,reception);

// export const deleteReception = (recepId) => axios.delete(REST_API_BASE_URL + '/' + recepId);
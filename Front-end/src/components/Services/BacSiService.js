import axios from "axios";

const REST_API_DON = "http://localhost:8080/dontiepnhan/3";
const REST_API_BENH_AN = "http://localhost:8080/benhan"
const REST_API_LOAI_DV = "http://localhost:8080/loaidichvu"
const REST_API_DV = "http://localhost:8080/dichvu"
const REST_API_CSSK ="http://localhost:8080/benhan/chisosuckhoe"
const REST_API_DON_THUOC ="http://localhost:8080/donthuoc"


export const getAllDon = () => axios.get(REST_API_DON)
export const getLichSuBA = (id) => axios.get(`${REST_API_BENH_AN}/${id}`)

export const createBA = (data) => axios.post(REST_API_BENH_AN,data)
export const createChiSo = (data) => axios.post(REST_API_CSSK,data)
export const createDonThuoc = (data) => axios.post(REST_API_DON_THUOC,data)
export const getCSSK = (id) => axios.get(`${REST_API_CSSK}/${id}`)

export const getAllDV = () => axios.get(REST_API_LOAI_DV)
export const getDVById = (id) => axios.get(`${REST_API_DV}/${id}`)
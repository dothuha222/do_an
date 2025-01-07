import axios from "axios";

const REST_API_ADD_DON = "http://localhost:8080/dontiepnhan/";
const REST_API_PHONG_KHAM = "http://localhost:8080/phongkham";
const REST_API_BENH_NHAN = "http://localhost:8080/user/benhnhan"
const REST_API_GET_DON = "http://localhost:8080/dontiepnhan/3"

const REST_API_GET_DON_CD = "http://localhost:8080/dontiepnhan/1"
const REST_API_GET_DON_DK = "http://localhost:8080/dontiepnhan/4"
const REST_API_GET_DON_DKED = "http://localhost:8080/dontiepnhan/5"

const REST_API_HOADON = "http://localhost:8080/hoadon";
const REST_API_DON_TIEP_NHAN = "http://localhost:8080/dontiepnhan/"

const REST_API_THUOC = "http://localhost:8080/thuoc";

export const getInvoiceByCCCD = (cccd) => axios.post(REST_API_HOADON, cccd);
export const createDontiepnhan = (don) => axios.post(REST_API_ADD_DON,don)
export const getAllPK = () => axios.get(REST_API_PHONG_KHAM)
export const getAllBN = () => axios.get(REST_API_BENH_NHAN)

export const getDonById = () => axios.get(REST_API_GET_DON)
export const getDonCD = () => axios.get(REST_API_GET_DON_CD)
export const getDonDK = () => axios.get(REST_API_GET_DON_DK)
export const getDonDKED = () => axios.get(REST_API_GET_DON_DKED)

export const capNhatDTN = (id,payload) => axios.put(`${REST_API_DON_TIEP_NHAN}${id}`,payload)
export const capNhatHD = (id,trangThaiId) => axios.put(`${REST_API_HOADON}/${id}`,{ id: trangThaiId })

export const getDsThuoc = () => axios.get(REST_API_THUOC)
export const getThuocById = (id) => axios.get(`${REST_API_THUOC}/${id}`)
export const addThuoc = (data) => axios.post(REST_API_THUOC, data)
export const updateThuoc = (id,data) => axios.put(`${REST_API_THUOC}/${id}`,data)
export const deleteThuoc = (id) => axios.delete(`${REST_API_THUOC}/${id}`)
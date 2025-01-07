

import React, { useState, useEffect } from 'react';
import styles from '../../css/HealthManagement/HealthForm.module.css'; // Import CSS styles
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import { MdDelete, MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import { getLichSuBA,getCSSK } from '../Services/BacSiService';


import {
    TextField,
    Button,
    IconButton,
    Autocomplete,
    Grid,
    Box,
    Select,
    MenuItem,
    FormControl
  } from "@mui/material";

const ViewHistoryBA = ({ten}) => {
    const {id} = useParams();
    const location = useLocation();
    const { benhNhanId } = location.state || {};
    const [formData, setFormData] = useState({});
    const [patientData, setPatientData] = useState(null)
    console.log(ten)

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getLichSuBA(benhNhanId);
            const data = response.data;
            console.log(data);       

            const chisoData = await getCSSK(id);
            setFormData(chisoData.data);
            console.log(formData);

            const matchedData = data.find(item => item.benh_an_id === parseInt(id));
            console.log(matchedData);
            if (matchedData) {
            const formattedData = {
                id: `BN${String(matchedData.don_tiep_nhan.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
                name: matchedData.don_tiep_nhan.benh_nhan.ten,
                dob: formatDate(matchedData.don_tiep_nhan.benh_nhan.ns),
                gender: matchedData.don_tiep_nhan.benh_nhan.gioi_tinh,
                address: matchedData.don_tiep_nhan.benh_nhan.dia_chi,
                room: matchedData.don_tiep_nhan.phong_kham.ten,
                doctor: matchedData.bac_si.ten,
                reason: matchedData.don_tiep_nhan.ly_do_kham,
                ngayKham:formatDate(matchedData.don_tiep_nhan.thoiGian),

                chuan_doan:matchedData.chuanDoan,
                ket_luan:matchedData.ket_luan,
                khamBP: matchedData.khamBP,
                khamTT:matchedData.khamTT,
                tien_su_benh: matchedData.tienSuBenh
            };

            console.log(formattedData)
            setPatientData(formattedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };
        fetchData();
    }, [id, ten]);

    useEffect(() => {
        if (patientData) {
        console.log(patientData);
        }
    }, [patientData]);

 

    const navigator = useNavigate();
    const handleViewHistory = () => {
        navigator(`/view-history-list/${patientData.benhNhanId}`);
      };

      function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }

      console.log(patientData)

      if (!patientData) {
        return <div>Dữ liệu không tồn tại</div>;
      }
    
    return (
        <div className={styles.healthForm}>
            <div className={styles.healthFormA}>
                <div className={styles.formSection} style={{ padding: "8px 20px", width: "30%", backgroundColor:"#e1e9f4" }}>
                    <h3 className={styles.formSectionTitle}>Thông tin bệnh nhân</h3>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Mã BN:</label>
                        <input className={styles.formInput} type="text" value={patientData.id} readOnly />
                    </div>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Họ và tên:</label>
                        <input className={styles.formInput} type="text" value={patientData.name} readOnly />
                    </div>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Ngày sinh:</label>
                        <input className={styles.formInput} type="text" value={patientData.dob} readOnly />
                    </div>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Giới tính:</label>
                        <input className={styles.formInput} type="text" value={patientData.gender} readOnly />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-start', justifyContent: 'space-between', width:'69%' }}>
                    <div className={styles.formSection} style={{ fontSize: '14px', width: '100%' , padding: '10px 20px', backgroundColor:'#588ad726'}}>
                        <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                            <label className={styles.formLabel}>Phòng khám:</label>
                            <input className={styles.formInput} type="text" value={patientData.room} readOnly />
                        </div>
                        <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                            <label className={styles.formLabel}>Bác sĩ thực hiện:</label>
                            <input className={styles.formInput} type="text" value={patientData.doctor} readOnly />
                        </div>
                        <div className={styles.formGroup} style={{ marginBottom: "8px", alignItems:"stretch" }}>
                            <label className={styles.formLabel}>Ngày khám bệnh:</label>
                            <input className={styles.formInput} type="text" value={patientData.ngayKham} readOnly />
                        </div>
                    </div>
                   
                </div>
            </div>

            <div className={styles.formSection} style={{ marginTop: '0px', marginBottom: '20px'}}>
                <h3 className={styles.formSectionTitle}>Thông tin khám bệnh</h3>
                <div className={styles.formFlex}
                >
                    <div className={styles.formGroup}>
                        <span className={styles.formChiSo}>Chỉ số</span>
                    </div>
                    <div className={styles.formColumn}>
                        <label>Cân nặng (kg)</label>
                        <input
                            type="text"
                            placeholder="kg"
                            name="weight"
                            value={formData.can_nang}
                            className={styles.formGroupInput}
                            disabled
                            style={{ backgroundColor:"#E3F5FF"}}
                        />
                    </div>
                    <div className={styles.formColumn}>
                        <label>Chiều cao (cm)</label>
                        <input
                            type="text"
                            placeholder="cm"
                            name="height"
                            value={formData.chieu_cao}
                            className={styles.formGroupInput}
                            disabled
                            style={{ backgroundColor:"#E3F5FF"}}
                        />
                    </div>
                    <div className={styles.formColumn}>
                        <label>Nhiệt độ (*C)</label>
                        <input
                            type="text"
                            placeholder="°C"
                            name="temperature"
                            value={formData.nhiet_do}
                            className={styles.formGroupInput}
                            disabled
                            style={{ backgroundColor:"#E3F5FF"}}
                        />
                    </div>
                    <div className={styles.formColumn}>
                        <label>Nhịp thở</label>
                        <input
                            type="text"
                            placeholder="lần/phút"
                            name="breathingRate"
                            value={formData.nhip_tho}
                            className={styles.formGroupInput}
                            disabled
                            style={{ backgroundColor:"#E3F5FF"}}
                        />
                    </div>
                    <div className={styles.formColumn}>
                        <label>Mạch</label>
                        <input
                            type="text"
                            placeholder="lần/phút"
                            name="pulse"
                            value={formData.mach}
                            className={styles.formGroupInput}
                            disabled
                            style={{ backgroundColor:"#E3F5FF"}}
                        />
                    </div>
                    <div className={styles.formColumn}>
                        <label>Huyết áp</label>
                        <input
                            type="text"
                            name="bloodPressure"
                            value={formData.huyet_ap}
                            className={styles.formGroupInput}
                            disabled
                            style={{ backgroundColor:"#E3F5FF"}}
                        />
                    </div>
                </div>
                <div className={styles.formFlexGroup}>
                    <div className={styles.formFlexGroupA}>
                        <div className={styles.formGroup}>
                            <label>Lý do khám bệnh</label>
                            <input
                                type="text"
                                name="reason"
                                disabled
                                value={patientData.reason}
                                style={{ backgroundColor:"#E3F5FF"}}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tiền sử bệnh</label>
                            <input
                                type="text"
                                name="medicalHistory"
                                value={patientData.tien_su_benh}
                                disabled
                                style={{ backgroundColor:"#E3F5FF"}}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Chẩn đoán ban đầu</label>
                            <input
                                type="text"
                                name="preliminaryDiagnosis"
                                value={patientData.chuan_doan}
                                disabled
                                style={{ backgroundColor:"#E3F5FF"}}
                            />
                        </div>
                    </div>
                    <div className={styles.formFlexGroupA}>
                        <div className={styles.formGroup}>
                            <label>Khám toàn thân</label>
                            <input
                                type="text"
                                name="generalExamination"
                                value={patientData.khamTT}
                                disabled
                                style={{ backgroundColor:"#E3F5FF"}}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Khám bộ phận</label>
                            <input
                                type="text"
                                name="specificExamination"
                                value={patientData.khamBP}
                                disabled
                                style={{ backgroundColor:"#E3F5FF"}}
                            />
                        </div>
    
                        </div>
                    </div>
                <div className={styles.formGroup}>
                    <label>Tóm tắt kết quả khám bệnh</label>
                    <textarea
                        name="summary"
                        value={patientData.ket_luan}
                        disabled
                        style={{ backgroundColor:"#E3F5FF"}}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewHistoryBA;


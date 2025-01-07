

import React, { useState, useEffect } from 'react';
import styles from '../../css/HealthManagement/PrescriptionForm.module.css'; // Import CSS styles
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import DatePicker from 'react-datepicker'; 
import { useNavigate,useLocation, useParams } from "react-router-dom";
import { createDonThuoc, getLichSuBA } from '../Services/BacSiService';

import {
    TextField,
    Button,
    IconButton,
    Autocomplete,
    Grid,
    Box,
  } from "@mui/material";
import { MdDelete, MdAdd } from "react-icons/md"
  
const PrescriptionForm = ({ten,userId}) => {
    const {id} = useParams();
    const location = useLocation();
    const benhNhanId = location.state?.benhNhanId;
    console.log(id);
    console.log(benhNhanId);
    const [formData, setFormData] = useState({
       ghi_chu:'',
       ds_don_thuoc:[],
       benh_an_id: id
    });
    const drugData = [
        { 
            thuoc_id:1,
            don_vi: "viên",
            gia:'5000',
            ten: 'Paracetamol'
          },
          { 
            thuoc_id:2,
            don_vi: "lọ",
            gia:'15000',
            ten: 'NaCl 90%'
          },
    ];

    const [medications, setMedications] = useState([
    { id: 1, ten: "", don_vi: "", so_luong: "", ghi_chu: "" },
    ]);
    const navigator = useNavigate();
    const handleViewHistory = () => {
        navigator(`/view-history-list/${patientData.benhNhanId}`);
    };

    const [patientData, setPatientData] = useState({})
    useEffect(() => {
           const fetchData = async () => {
           try {
               const response = await getLichSuBA(benhNhanId);
               const data = response.data;
               console.log(data);       
   
               const matchedData = data.find(item => item.benh_an_id === parseInt(id));
               console.log(matchedData);
               if (matchedData) {
               const formattedData = {
                   id: `BN${String(matchedData.don_tiep_nhan.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
                   name: matchedData.don_tiep_nhan.benh_nhan.ten,
                   dob: matchedData.don_tiep_nhan.benh_nhan.ns,
                   gender: matchedData.don_tiep_nhan.benh_nhan.gioi_tinh,
                   address: matchedData.don_tiep_nhan.benh_nhan.dia_chi,
                   room: matchedData.don_tiep_nhan.phong_kham.ten,
                   doctor: ten,
                   reason: matchedData.don_tiep_nhan.ly_do_kham,
                //    ngayKham:formatDate(matchedData.don_tiep_nhan.thoiGian),
                ngayKham:matchedData.don_tiep_nhan.thoiGian,
        
                   ket_luan:matchedData.ket_luan,
                
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

       // Thêm khối mới
    const addMedication = () => {
    const newMedication = {
      id: medications.length + 1,
      ten: "",
      don_vi: "",
      so_luong: "",
      ghi_chu: "",
    };
    setMedications([...medications, newMedication]);
  };

  // Xóa khối
  const removeMedication = (id) => {
    const updatedMedications = medications
      .filter((med) => med.id !== id)
      .map((med, index) => ({
        ...med,
        id: index + 1, // Cập nhật lại STT
      }));
    setMedications(updatedMedications);
  };


const handleMedicationChange = (id, field, value) => {
    const updatedMedications = medications.map((med) => {
      if (med.id === id) {
        const updatedMed = { ...med, [field]: value };
  
        // Chỉ cập nhật 'donVi' khi trường 'ten' thay đổi
        if (field === "ten") {
          const drug = drugData.find((d) => d.name === value);
          updatedMed.don_vi = drug ? drug.don_vi : "";
        }
  
        return updatedMed;
      }
      return med;
    });
    setMedications(updatedMedications);
  };

  console.log(medications)
  

    const [endTime, setEndTime] = useState(null);
    const [startTime] = useState(new Date());
    const [errors, setErrors] = useState({});
    const [selectedDate, setSelectedDate] = useState(null); 

   
    const formatDate = (date) => {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const yyyy = date.getFullYear();
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveAndPrint = async () => {
        try {
            const ds_thuoc = medications.map(item => ({
                thuoc_id: item.id,
                so_luong: item.so_luong
            }));
            console.log("Danh sách thuoc", ds_thuoc);
        
            const payload = {
                ...formData,
                ds_don_thuoc:ds_thuoc
            };
            console.log("Payload gửi lên:", payload);
        
            const baResponse = await createDonThuoc(payload);
            alert('Tạo đơn thuốc thành công!');
            console.log("Response đơn thuốc:", baResponse.data);
            
        } catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            alert(`Có lỗi xảy ra: ${error.message}`);
        }
    };

    const handleCancel = () => {
        if (window.confirm("Xác nhận hủy đơn khám bệnh?")) {
            setFormData({
                ghi_chu:'',
                ds_don_thuoc:[],
                benh_an_id: id
            });
        }
    };
    

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
                            <label className={styles.formLabel}>Thời gian bắt đầu khám:</label>
                            <p className={styles.formSectionP}> {formatDate(startTime)}</p>
                            {/* {endTime && <p>Thời gian kết thúc khám: {formatDate(endTime)}</p>} */}
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.savePrint} onClick={handleSaveAndPrint}>
                            <FaPrint style={{ marginRight: '8px' }} /> <span>LƯU VÀ IN PHIẾU</span>
                        </button>
                        <button className={styles.viewHistory} onClick={handleViewHistory}>
                            <FaHistory style={{ marginRight: '8px' }} /> <span>XEM LỊCH SỬ</span>
                        </button>
                        <button className={styles.cancel} onClick={handleCancel}>
                            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.formSection} style={{ marginTop: '0px', marginBottom: '20px'}}>
                <h3 className={styles.formSectionTitle}>Thông tin đơn thuốc</h3>
                <div className={styles.formFlexGroup}>
                    <div className={styles.formGroup}>
                        <label>Chuẩn đoán </label>
                        <input
                            type="text"
                            name="ket_luan"
                            disabled
                            value={patientData.ket_luan}
                            style={{ backgroundColor:"#E3F5FF"}}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Ngày tái khám</label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/yyyy"
                            className={styles.filterDate}
                            selected={selectedDate} // Liên kết state với ô input
                            onChange={(date) => setSelectedDate(date)} // Cập nhật state khi chọn n
                        />
                    </div>
                </div>
                <div className={styles.FormThuoc}>
                    <h3 >Thuốc điều trị</h3>
                    {medications.map((medication, index) => (
                        <div className={styles.BoxThuoc} >
                            <Grid container spacing={2} alignItems="center" key={medication.id}>
                        {/* STT */}
                        <Grid item xs={1}>
                            <TextField
                            value={medication.id}
                            disabled
                            fullWidth
                            placeholder="STT"
                            InputProps={{
                                style: {
                                  fontSize: "15px", 
                                  backgroundColor: '#fff',
                                },
                              }}
                            />
                        </Grid>

                        {/* Tên thuốc (Autocomplete) */}
                        <Grid item xs={4}>
                            <Autocomplete
                            options={drugData}
                            getOptionLabel={(option) => option.ten}
                            value={drugData.find((d) => d.ten === medication.ten) || null}
                            onChange={(e, newValue) =>
                                handleMedicationChange(medication.id, "ten", newValue?.ten || "")
                            }
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                placeholder="🔍"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                ...params.InputProps,
                                    style: {
                                      fontSize: "15px", 
                                      backgroundColor: '#fff',
                                    },
                                  }}
                                />
                            )}
                            />
                        </Grid>

                        {/* Số lượng */}
                        <Grid item xs={2}>
                            <TextField
                            value={medication.quantity}
                            onChange={(e) =>
                                handleMedicationChange(medication.id, "quantity", e.target.value)
                            }
                            placeholder="Số lượng"
                            fullWidth
                            type="number"
                            InputProps={{
                                style: {
                                  fontSize: "15px",  
                                  backgroundColor: '#fff',
                                },
                              }}
                            />
                        </Grid>

                        {/* Đơn vị */}
                        <Grid item xs={1}>
                            <TextField
                            value={medication.don_vi}
                            disabled
                            fullWidth
                            placeholder="Đơn vị"
                            InputProps={{
                                style: {
                                  fontSize: "15px",  
                                  backgroundColor: '#fff',
                                },
                              }}
                            />
                        </Grid>

                        {/* Ghi chú */}
                        <Grid item xs={8}>
                            <TextField
                            value={medication.note}
                            onChange={(e) =>
                                handleMedicationChange(medication.id, "note", e.target.value)
                            }
                            placeholder="Ghi chú"
                            fullWidth
                            InputProps={{
                                style: {
                                  fontSize: "15px",  
                                  backgroundColor: '#fff',
                                  padding:"3px"  // // Chỉnh font-size
                                },
                              }}
                            />
                        </Grid>

                        {/* Nút Xóa */}
                        {index !== 0 && (
                            <Grid item xs={1}>
                            <IconButton
                                onClick={() => removeMedication(medication.id)}
                                color="error"
                            >
                                <MdDelete />
                            </IconButton>
                            </Grid>
                        )}
                        </Grid>
                        </div>
                    ))}

                    {/* Thêm khối mới */}
                    <Button
                        startIcon={<MdAdd />}
                        variant="contained"
                        color="primary"
                        onClick={addMedication}
                        style={{ marginTop: "16px" }}
                    >
                        Thêm thuốc
                    </Button>
                </div>  
                <div className={styles.formGroup} style={{ marginTop: "30px", width: '66%' }}>
                    <label>Lời dặn của bác sĩ</label>
                    <textarea
                        name="ghi_chu"
                        value={formData.ghi_chu}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default PrescriptionForm;


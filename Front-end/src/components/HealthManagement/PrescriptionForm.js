

import React, { useState } from 'react';
import styles from '../../css/HealthManagement/PrescriptionForm.module.css'; // Import CSS styles
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import DatePicker from 'react-datepicker'; // Import DatePicker
import {
    TextField,
    Button,
    IconButton,
    Autocomplete,
    Grid,
    Box,
  } from "@mui/material";
import { MdDelete, MdAdd } from "react-icons/md"
  
const PrescriptionForm = () => {
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        temperature: '',
        breathingRate: '',
        pulse: '',
        bloodPressure: '',
        reason: 'Đau mỏi vai gáy',
        medicalHistory: '',
        preliminaryDiagnosis: '',
        generalExamination: '',
        specificExamination: '',
        service: '',
        summary: 'Đau dạ dày',
        loidan:''
    });
    const drugData = [
        { name: "Panadol", donVi: "viên" },
        { name: "Ibuprofen", donVi: "viên" },
        { name: "Paracetamol", donVi: "viên" },
        { name: "Amoxicillin", donVi: "viên" },
        { name: "Cefixime", donVi: "gói" },
        { name: "Metformin", donVi: "gói" },
        { name: "Loratadine", donVi: "viên" },
        { name: "Vitamin C", donVi: "gói" },
        { name: "Omeprazole", donVi: "viên" },
        { name: "Doxycycline", donVi: "viên" },
    ];
    
      const [medications, setMedications] = useState([
        { id: 1, name: "", donVi: "", quantity: "", note: "" },
      ]);
       // Thêm khối mới
  const addMedication = () => {
    const newMedication = {
      id: medications.length + 1,
      name: "",
      donVi: "",
      quantity: "",
      note: "",
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

  // Handle thay đổi thông tin
//   const handleMedicationChange = (id, field, value) => {
//     const updatedMedications = medications.map((med) => {
//       if (med.id === id) {
//         const drug = drugData.find((d) => d.name === value);
//         return {
//           ...med,
//           [field]: value,
//           donVi: drug ? drug.donVi : "",
//         };
//       }
//       return med;
//     });
//     setMedications(updatedMedications);
//   };

const handleMedicationChange = (id, field, value) => {
    const updatedMedications = medications.map((med) => {
      if (med.id === id) {
        const updatedMed = { ...med, [field]: value };
  
        // Chỉ cập nhật 'donVi' khi trường 'name' thay đổi
        if (field === "name") {
          const drug = drugData.find((d) => d.name === value);
          updatedMed.donVi = drug ? drug.donVi : "";
        }
  
        return updatedMed;
      }
      return med;
    });
    setMedications(updatedMedications);
  };
  

    const [endTime, setEndTime] = useState(null);
    const [startTime] = useState(new Date());
    const [errors, setErrors] = useState({});
    const [selectedDate, setSelectedDate] = useState(null); // State lưu giữ ngày đã chọn

    const patientData = [
        {id: 'BN2098',
            name: 'Nguyễn Văn Minh',
            dob: '08/11/1970',
            cccd: '034300112686',
            gender: 'Nam',
            address: 'Duy Tân, Cầu Giấy',
            reason: 'Đau dạ dày',
            room: '102B',
            phoneNumber: '0988176563', 
            bhytCode: 'DN47888025341',
            receptionTime: '25/12/2024',
            receptionCode: 'RN310'}
    ];
    const clinicData = [
        { id: 'BN001', department: '102B', doctorName: 'Phạm Minh Phương'}
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.weight) newErrors.weight = 'Cân nặng là bắt buộc';
        if (!formData.height) newErrors.height = 'Chiều cao là bắt buộc';
        if (!formData.temperature) newErrors.temperature = 'Nhiệt độ là bắt buộc';
        if (!formData.breathingRate) newErrors.breathingRate = 'Nhịp thở là bắt buộc';
        if (!formData.pulse) newErrors.pulse = 'Mạch là bắt buộc';
        if (!formData.bloodPressure) newErrors.bloodPressure = 'Huyết áp là bắt buộc';
        return newErrors;
    };
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

    const handleSaveAndPrint = () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const end = new Date();
            setEndTime(end);
            // Show modal for confirmation
            if (window.confirm("Xác nhận lưu và in phiếu?")) {
                alert(`Lưu thành công!\nThời gian bắt đầu:  ${formatDate(startTime)}\nThời gian kết thúc: ${formatDate(end)}`);;
            }
        }
    };

    const handleCancel = () => {
        if (window.confirm("Xác nhận hủy đơn khám bệnh?")) {
            setFormData({
                weight: '',
                height: '',
                temperature: '',
                breathingRate: '',
                pulse: '',
                bloodPressure: '',
                reason: '',
                medicalHistory: '',
                preliminaryDiagnosis: '',
                generalExamination: '',
                specificExamination: '',
                service: '',
                summary: 'Đau dạ dày',
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
                        <input className={styles.formInput} type="text" value={patientData[0].id} readOnly />
                    </div>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Họ và tên:</label>
                        <input className={styles.formInput} type="text" value={patientData[0].name} readOnly />
                    </div>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Ngày sinh:</label>
                        <input className={styles.formInput} type="text" value={patientData[0].dob} readOnly />
                    </div>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Giới tính:</label>
                        <input className={styles.formInput} type="text" value={patientData[0].gender} readOnly />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-start', justifyContent: 'space-between', width:'69%' }}>
                    <div className={styles.formSection} style={{ fontSize: '14px', width: '100%' , padding: '10px 20px', backgroundColor:'#588ad726'}}>
                        <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                            <label className={styles.formLabel}>Phòng khám:</label>
                            <input className={styles.formInput} type="text" value={clinicData[0].department} readOnly />
                        </div>
                        <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                            <label className={styles.formLabel}>Bác sĩ thực hiện:</label>
                            <input className={styles.formInput} type="text" value={clinicData[0].doctorName} readOnly />
                        </div>
                        <div className={styles.formGroup} style={{ marginBottom: "8px", alignItems:"stretch" }}>
                            <label className={styles.formLabel}>Thời gian bắt đầu khám:</label>
                            <p className={styles.formSectionP}> {formatDate(startTime)}</p>
                            {endTime && <p>Thời gian kết thúc khám: {formatDate(endTime)}</p>}
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.savePrint} onClick={handleSaveAndPrint}>
                            <FaPrint style={{ marginRight: '8px' }} /> <span>LƯU VÀ IN PHIẾU</span>
                        </button>
                        <button className={styles.viewHistory} onClick={handleSaveAndPrint}>
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
                            name="reason"
                            disabled
                            value={formData.summary}
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
                            getOptionLabel={(option) => option.name}
                            value={drugData.find((d) => d.name === medication.name) || null}
                            onChange={(e, newValue) =>
                                handleMedicationChange(medication.id, "name", newValue?.name || "")
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
                            value={medication.donVi}
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
                        name="loidan"
                        value={formData.loidan}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default PrescriptionForm;




import React, { useState } from 'react';
import styles from '../../css/HealthManagement/HealthForm.module.css'; // Import CSS styles
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import { MdDelete, MdAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
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

const HealthForm = () => {
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        temperature: '',
        breathingRate: '',
        pulse: '',
        bloodPressure: '',
        spo2:'',
        reason: 'Đau dạ dày',
        medicalHistory: '',
        preliminaryDiagnosis: '',
        generalExamination: '',
        specificExamination: '',
        // services: '',
        summary: '',
    });

    const [errors, setErrors] = useState({});
    const [startTime] = useState(new Date());
    const [endTime, setEndTime] = useState(null);

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

    const serviceData = [
        {name: 'Khám tai - mũi - họng'},
        {name: 'Khám da liễu'},
        {name: 'Khám sản phụ khoa'},
        {name: 'Khám nội khoa'},
        {name: 'Khám sức khỏe tổng quát'},
        {name: 'Khám sức khỏe định kỳ'},
        {name: 'Xét nghiệm nước tiểu'},
        {name: 'Xét nghiệm máu tổng quát'},
        {name: 'Xét nghiệm sinh hóa'},
        {name: 'Siêu âm ổ bụng'},
        {name: 'Chụp X-quang phổi'},
        {name: 'Chụp CT-Scan'},
        {name: 'Chụp MRI'},
        {name: 'Nội soi dạ dày'},
        {name: 'Tiêm phòng cúm'},
        {name: 'Tiêm phòng HPV'},
        {name: 'Tư vấn dinh dưỡng'},
    ]

    const typeService = [
        { name: "Cơ bản" },
        { name: "Cao cấp" }
    ]
    const navigator = useNavigate();
    const handleViewHistory = () => {
        navigator('/view-history');
      };
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
                summary: '',
            });
        }
    };

    const [services, setServices] = useState([
        { id: 1, name: "", type: ""},
      ]);

      const handleServiceChange = (id, field, value) => {
            const updateServices = services.map((med) => {
              if (med.id === id) {
                const service = serviceData.find((d) => d.name === value);
                return {
                  ...med,
                  [field]: value,
                };
              }
              return med;
            });
            setServices(updateServices);
          };
    const addService = () => {
        const newServices = {
          id: services.length + 1,
          name: "",
          type: "",
        };
        setServices([...services, newServices]);
      };
    
      // Xóa khối
      const removeServices = (id) => {
        const updateServices = services
          .filter((med) => med.id !== id)
          .map((med, index) => ({
            ...med,
            id: index + 1, // Cập nhật lại STT
          }));
        setServices(updateServices);
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
                            value={formData.weight}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.weight && <span className={styles.error}>{errors.weight}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Chiều cao (cm)</label>
                        <input
                            type="text"
                            placeholder="cm"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.height && <span className={styles.error}>{errors.height}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Nhiệt độ (*C)</label>
                        <input
                            type="text"
                            placeholder="°C"
                            name="temperature"
                            value={formData.temperature}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.temperature && <span className={styles.error}>{errors.temperature}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Nhịp thở</label>
                        <input
                            type="text"
                            placeholder="lần/phút"
                            name="breathingRate"
                            value={formData.breathingRate}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.breathingRate && <span className={styles.error}>{errors.breathingRate}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Mạch</label>
                        <input
                            type="text"
                            placeholder="lần/phút"
                            name="pulse"
                            value={formData.pulse}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.pulse && <span className={styles.error}>{errors.pulse}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Huyết áp</label>
                        <input
                            type="text"
                            name="bloodPressure"
                            value={formData.bloodPressure}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.bloodPressure && <span className={styles.error}>{errors.bloodPressure}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>SPO2</label>
                        <input
                            type="text"
                            name="spo2"
                            placeholder="%"
                            value={formData.spo2}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.spo2 && <span className={styles.error}>{errors.spo2}</span>}
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
                                value={formData.reason}
                                style={{ backgroundColor:"#E3F5FF"}}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tiền sử bệnh</label>
                            <input
                                type="text"
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Chẩn đoán ban đầu</label>
                            <input
                                type="text"
                                name="preliminaryDiagnosis"
                                value={formData.preliminaryDiagnosis}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className={styles.formFlexGroupA}>
                        <div className={styles.formGroup}>
                            <label>Khám toàn thân</label>
                            <input
                                type="text"
                                name="generalExamination"
                                value={formData.generalExamination}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Khám bộ phận</label>
                            <input
                                type="text"
                                name="specificExamination"
                                value={formData.specificExamination}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.FormThuoc} style={{ display: 'block,',marginBottom:'26px' }}>
                        <label className={styles.FormThuocLable}>Chỉ định dịch vụ</label>
                        {services.map((service, index) => (
                            <div className={styles.boxService} key={service.id}>
                            <Grid container spacing={2} alignItems="center">
                                {/* STT */}
                                <Grid item xs={1}>
                                <TextField
                                    value={service.id}
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

                                {/* Tên dịch vụ (Autocomplete) */}
                                <Grid item xs={6}>
                                <Autocomplete
                                    options={serviceData}
                                    getOptionLabel={(option) => option.name}
                                    value={serviceData.find((d) => d.name === service.name) || null}
                                    onChange={(e, newValue) =>
                                        handleServiceChange(service.id, "name", newValue?.name || "")
                                    }
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="🔍 Tên dịch vụ"
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

                                {/* Loại (Select) */}
                                <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Select
                                    value={service.type || ""}
                                    onChange={(e) =>
                                        handleServiceChange(service.id, "type", e.target.value)
                                    }
                                    displayEmpty
                                    style={{
                                        fontSize: "15px",
                                        backgroundColor: '#fff',
                                    }}
                                    >
                                         {/* Placeholder */}
      <MenuItem value="" disabled>
        Chọn loại dịch vụ
      </MenuItem>
                                    {typeService.map((option, index) => (
                                        <MenuItem key={index} value={option.name}>
                                        {option.name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                </Grid>
                                {/* Nút Xóa */}
                                {index !== 0 && (
                                    <Grid item xs={1}>
                                    <IconButton
                                        onClick={() => removeServices(service.id)}
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
                                onClick={addService}
                                style={{ marginTop: "16px" }}
                            >
                                Thêm dịch vụ
                            </Button>
                        </div>
                        </div>
                    </div>
                <div className={styles.formGroup}>
                    <label>Tóm tắt kết quả khám bệnh</label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default HealthForm;


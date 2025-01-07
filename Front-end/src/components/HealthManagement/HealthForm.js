

import React, { useState, useEffect } from 'react';
import styles from '../../css/HealthManagement/HealthForm.module.css'; // Import CSS styles
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import { MdDelete, MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDon,getAllDV,getDVById,createBA,createChiSo } from '../Services/BacSiService';

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

const HealthForm = ({ten,userId}) => {
    const [donTNId, setDonTNId] = useState(null)
    const [patientData, setPatientData] = useState(null)
    const [startTime] = useState(new Date());

    console.log(ten)
    const {id} = useParams();
    const [formData, setFormData] = useState({
        tienSuBenh:'',
        khamTT:'',
        khamBP:'',
        chuanDoan:'',
        ket_luan:'',
        thoi_gian: startTime,
        nguoi_dung_id:'',
        don_tiep_nhan_id: '',
        ds_dich_vu_ids:[]
    });

    console.log(userId)
    console.log(donTNId)

    const [chisoSK, setChiSo] = useState({
        can_nang:'',
        chieu_cao:'',
        nhiet_do:'',
        nhip_tho:'',
        mach:'',
        huyet_ap:'',
        benh_an_id: ''
    })
    // const [errors, setErrors] = useState({});
    // const [endTime, setEndTime] = useState(null);
    const [a,setA] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getAllDon();
            const data = response.data;
            console.log(data);       

            const matchedData = data.find(item => item.don_tiep_nhan_id === parseInt(id));
            console.log(matchedData);
            setA(matchedData)
            if (matchedData) {
            const formattedData = {
                id: `BN${String(matchedData.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
                name: matchedData.benh_nhan.ten,
                // dob: formatDate(matchedData.benh_nhan.ns),
                dob: matchedData.benh_nhan.ns,
                gender: matchedData.benh_nhan.gioi_tinh,
                address: matchedData.benh_nhan.dia_chi,
                room: matchedData.phong_kham.ten,
                doctor: ten,
                reason: matchedData.ly_do_kham,
                benhNhanId:matchedData.benh_nhan.nguoi_dung_id,
                don_tiep_nhan_id: matchedData.don_tiep_nhan_id
            };

            console.log(formattedData)
            setPatientData(formattedData);
            setDonTNId(formattedData.don_tiep_nhan_id)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };
        fetchData();
    }, [id, ten, userId]);

    useEffect(() => {
        if (patientData) {
        console.log(patientData);
        }
    }, [patientData]);


    const [typeService, setTypeService] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [services, setServices] = useState([{ id: 1, name: "", type: "" }]);

    useEffect(() => {
        getAllDV()
          .then((response) => {
            console.log(response.data);
            const typeData = response.data; 
            console.log(typeData);
            setTypeService(typeData);
          })
          .catch((error) => console.error("Error fetching type services:", error));
      }, []);
        const handleTypeChange = (serviceId, value) => {
            setServices((prevServices) =>
                prevServices.map((service) =>
                    service.id === serviceId ? { ...service, type: value, dich_vu_id: "" } : service // Đặt lại giá trị dịch vụ đã chọn khi loại dịch vụ thay đổi
                )
            );
            const selectedType = typeService.find((type) => type.loai_dich_vu_id === value);
            if (selectedType) {
                getDVById(selectedType.loai_dich_vu_id)
                    .then((response) => {
                        setServiceData((prevData) => ({
                            ...prevData,
                            [serviceId]: response.data, // Lưu trữ dịch vụ theo từng ô
                        }));
                    })
                    .catch((error) => console.error("Error fetching services:", error));
            };
          }
        const handleServiceChange = (serviceId, field, value) => {
        setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === serviceId ? { ...service, [field]: value } : service
            )
        );
        }         
    console.log(services)
    const addService = () => {
        setServices((prevServices) => [
            ...prevServices,
            { id: prevServices.length + 1, name: "", type: "" },
        ]);
    };
      const removeServices = (id) => {
        const updateServices = services
          .filter((med) => med.id !== id)
          .map((med, index) => ({
            ...med,
            id: index + 1, 
          }));
        setServices(updateServices);
      };   
    const navigator = useNavigate();
    const handleViewHistory = () => {
        navigator(`/view-history-list/${patientData.benhNhanId}`);
      };
    // const validateForm = () => {
    //     const newErrors = {};
    //     if (!formData.weight) newErrors.weight = 'Cân nặng là bắt buộc';
    //     if (!formData.height) newErrors.height = 'Chiều cao là bắt buộc';
    //     if (!formData.temperature) newErrors.temperature = 'Nhiệt độ là bắt buộc';
    //     if (!formData.breathingRate) newErrors.breathingRate = 'Nhịp thở là bắt buộc';
    //     if (!formData.pulse) newErrors.pulse = 'Mạch là bắt buộc';
    //     if (!formData.bloodPressure) newErrors.bloodPressure = 'Huyết áp là bắt buộc';
    //     return newErrors;
    // };
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

    const handleChiSoChange = (e) => {
        const { name, value } = e.target;
        setChiSo({...chisoSK,[name]: value})
    };
   
    const handleSaveAndPrint = async () => {
        try {
            const ds_dich_vu = services.map(item => item.dich_vu_id);
            console.log("Danh sách dịch vụ:", ds_dich_vu);
      
            const payload = {
                ...formData,
                nguoi_dung_id: userId,
                don_tiep_nhan_id: donTNId,
                ds_dich_vu_ids: ds_dich_vu
            };
            console.log("Payload gửi lên:", payload);
      
            const baResponse = await createBA(payload);
            alert('Tạo bệnh án thành công!');
            console.log("Response bệnh án:", baResponse.data);
      
            const benhAnId = baResponse.data.benh_an_id;

      
            const cssk = {
                ...chisoSK,
                benh_an_id: benhAnId
            };
            console.log("Payload chỉ số sức khỏe:", cssk);
      
            const csskResponse = await createChiSo(cssk);
            console.log("Response chỉ số sức khỏe:", csskResponse.data);
            alert('Cập nhật chỉ số sức khỏe thành công!');
            const benhNhanId = patientData.benhNhanId
            navigator(`/prescription-form/${benhAnId}`, { state: { benhNhanId } });
        } catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            alert(`Có lỗi xảy ra: ${error.message}`);
        }
      };
    const handleCancel = () => {
        // try {
        //     const cssk = {
        //         ...chisoSK,
        //         benh_an_id: 1,
        //     };
        //     console.log("Payload chỉ số sức khỏe:", cssk);
    
        //     createChiSo(cssk)
        //         .then((csskResponse) => {
        //             alert('Cập nhật chỉ số sức khỏe thành công!');
        //             console.log("Response chỉ số sức khỏe:", csskResponse.data);
        //         })
        //         .catch((error) => {
        //             console.error("Đã xảy ra lỗi khi cập nhật chỉ số sức khỏe:", error);
        //             alert(`Có lỗi xảy ra: ${error.message}`);
        //         });
        // } catch (error) {
        //     console.error("Đã xảy ra lỗi ngoài dự kiến:", error);
        //     alert(`Có lỗi xảy ra: ${error.message}`);
        // }
    };
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
                            name="can_nang"
                            value={chisoSK.can_nang}
                            onChange={handleChiSoChange}
                            className={styles.formGroupInput}
                        />
                        {/* {errors.weight && <span className={styles.error}>{errors.weight}</span>} */}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Chiều cao (cm)</label>
                        <input
                            type="text"
                            placeholder="cm"
                            name="chieu_cao"
                            value={chisoSK.chieu_cao}
                            onChange={handleChiSoChange}
                            className={styles.formGroupInput}
                        />
                        {/* {errors.height && <span className={styles.error}>{errors.height}</span>} */}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Nhiệt độ (*C)</label>
                        <input
                            type="text"
                            placeholder="°C"
                            name="nhiet_do"
                            value={chisoSK.nhiet_do}
                            onChange={handleChiSoChange}
                            className={styles.formGroupInput}
                        />
                        {/* {errors.temperature && <span className={styles.error}>{errors.temperature}</span>} */}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Nhịp thở</label>
                        <input
                            type="text"
                            placeholder="lần/phút"
                            name="nhip_tho"
                            value={chisoSK.nhip_tho}
                            onChange={handleChiSoChange}
                            className={styles.formGroupInput}
                        />
                        {/* {errors.breathingRate && <span className={styles.error}>{errors.breathingRate}</span>} */}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Mạch</label>
                        <input
                            type="text"
                            placeholder="lần/phút"
                            name="mach"
                            value={chisoSK.mach}
                            onChange={handleChiSoChange}
                            className={styles.formGroupInput}
                        />
                        {/* {errors.pulse && <span className={styles.error}>{errors.pulse}</span>} */}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Huyết áp</label>
                        <input
                            type="text"
                            name="huyet_ap"
                            value={chisoSK.huyet_ap}
                            onChange={handleChiSoChange}
                            className={styles.formGroupInput}
                        />
                        {/* {errors.bloodPressure && <span className={styles.error}>{errors.bloodPressure}</span>} */}
                    </div>
                    {/* <div className={styles.formColumn}>
                        <label>SPO2</label>
                        <input
                            type="text"
                            name="spo2"
                            placeholder="%"
                            value={chisoSK.spo2}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                    </div> */}
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
                                name="tienSuBenh"
                                value={formData.tienSuBenh}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Chẩn đoán ban đầu</label>
                            <input
                                type="text"
                                name="chuanDoan"
                                value={formData.chuanDoan}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className={styles.formFlexGroupA}>
                        <div className={styles.formGroup}>
                            <label>Khám toàn thân</label>
                            <input
                                type="text"
                                name="khamTT"
                                value={formData.khamTT}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Khám bộ phận</label>
                            <input
                                type="text"
                                name="khamBP"
                                value={formData.khamBP}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div
                        className={styles.FormThuoc}
                        style={{ display: "block", marginBottom: "26px" }}
                        >
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
                                        backgroundColor: "#fff",
                                    },
                                    }}
                                />
                                </Grid>

                                <Grid item xs={6}>
                                {/* <FormControl fullWidth variant="outlined">
                                    <Select
                                        // value={serviceData.find((d) => d.dich_vu_id === service.dich_vu_id)?.dich_vu_id || ""}
                                        value={service.dich_vu_id ||""}
                                        onChange={(e) => handleServiceChange(service.id, "dich_vu_id", e.target.value)}
                                    >
                                        <MenuItem value="" disabled>
                                        Chọn dịch vụ
                                    </MenuItem>
                                        {serviceData.map((serviceItem) => (
                                            <MenuItem key={serviceItem.dich_vu_id} value={serviceItem.dich_vu_id}>
                                                {serviceItem.ten}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl> */}
                                <FormControl fullWidth variant="outlined">
                                <Select
                                    value={service.dich_vu_id || ""}
                                    onChange={(e) => handleServiceChange(service.id, "dich_vu_id", e.target.value)}
                                >
                                    <MenuItem value="" disabled>
                                        Chọn dịch vụ
                                    </MenuItem>
                                    {serviceData[service.id]?.map((serviceItem) => (
                                        <MenuItem key={serviceItem.dich_vu_id} value={serviceItem.dich_vu_id}>
                                            {serviceItem.ten}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            </Grid>


                                {/* Loại (Select) */}
                                <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Select
                                    value={service.type || ""}
                                    onChange={(e) =>
                                        handleTypeChange(service.id, e.target.value)
                                    }
                                    displayEmpty
                                    style={{
                                        fontSize: "15px",
                                        backgroundColor: "#fff",
                                    }}
                                    >
                                    <MenuItem value="" disabled>
                                        Chọn loại dịch vụ
                                    </MenuItem>
                                    {typeService.map((option, index) => (
                                        <MenuItem key={option.loai_dich_vu_id} value={option.loai_dich_vu_id}>
                                        {option.ten}
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
                        name="ket_luan"
                        value={formData.ket_luan}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};
export default HealthForm;


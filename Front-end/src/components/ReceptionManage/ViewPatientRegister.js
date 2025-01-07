

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getAllBenhNhan } from '../Services/NguoiDungService';


const ViewPatientRegister = ({ten}) => {

  const {id} = useParams();

  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [patientData, setPatientData] = useState(null)

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
   useEffect(() => {
      const fetchPatients = async () => {
        try {
          const response = await getAllBenhNhan();
          const data = response.data;
          console.log(response.data);

          const matchedData = data.find(item => item.nguoi_dung_id === parseInt(id));
          console.log(matchedData);

          const formattedData = {
            id: `BN${String(matchedData.nguoi_dung_id).padStart(4, '0')}`,
            name: matchedData.ten,
            dob: formatDate(matchedData.ns),
            gender: matchedData.gioi_tinh,
            address: matchedData.dia_chi,
            cccd: matchedData.cccd,
            sdt: matchedData.sdt,
            ma_bhyt: matchedData.ma_bhyt,
            username: matchedData.username,
            password: matchedData.password
        };

        console.log(formattedData)
        setPatientData(formattedData);
        } catch (error) {
          console.error('Lỗi khi lấy danh sách bệnh nhân:', error);
        }
      };
  
      fetchPatients();
    }, [id]);


  const handleSaveAndPrint = (e) => {
    let validationErrors = {};
    // if (!formData.fullName) validationErrors.fullName = 'Họ và tên là bắt buộc';
    // if (!formData.birthDate) validationErrors.birthDate = 'Ngày sinh là bắt buộc';
    // if (!formData.cccd) validationErrors.cccd = 'CCCD là bắt buộc';
    // if (!formData.gender) validationErrors.gender = 'Giới tính là bắt buộc';
    // if (!formData.address) validationErrors.address = 'Địa chỉ là bắt buộc';
    // if (!formData.phoneNumber) validationErrors.phoneNumber = 'Số điện thoại là bắt buộc';
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    // else{
    //   // setErrors({})
    //   e.preventDefault();
    //   if(id){
    //     updateReception(id, formData).then((response) => {
    //       console.log(response.data)
    //       navigator('/patient-list')
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })
    //     console.log('da sua')
    //   }
    //   else{
    //     createReception(formData).then((response) => {
    //       console.log(response.data)
    //       navigator('/patient-list')
    //       setFormData
    //         ({
    //           fullName: '',
    //           birthDate: '',
    //           cccd: '',
    //           gender: '',
    //           address: '',
    //           phoneNumber: '', 
    //           bhytCode: '',
    //         });
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })
    //     console.log("da luu")
    //   }
    // }
  };

  // const handleCancel = () => {
  //   setShowConfirmModal(true);
  // };

  // const handleConfirmCancel = () => {
  //   setFormData
  //   ({
  //       fullName: '',
  //       birthDate: '',
  //       cccd: '',
  //       gender: '',
  //       address: '',
  //       phoneNumber: '', 
  //       bhytCode: '',
  //   });
  //   setShowConfirmModal(false);
  // };

  if (!patientData) {
    return <div>Dữ liệu không tồn tại</div>;
  }
  return (
    <div className={styles.receptionForm}>
    
      <div className={styles.formSection} style={{ marginTop: '42px' }}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin bệnh nhân</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Mã bệnh nhân</label>
                <input
                  type="text"
                  name="patientId"
                  value={patientData.id}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Họ và tên <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={patientData.name}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ngày sinh <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={patientData.dob}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>CCCD <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="cccd"
                  value={patientData.cccd}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Giới tính <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="cccd"
                  value={patientData.gender}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>              
              <div className={styles.formGroup}>
                <label>Địa chỉ <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="address"
                  value={patientData.address}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
            </div>
            <div className={styles.formFlex1}>

              
              <div className={styles.formGroup}>
                <label>Số điện thoại  <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={patientData.sdt}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
                {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}

              </div>
              <div className={styles.formGroup}>
                <label>Mã số BHYT</label>
                <input
                  type="text"
                  name="bhytCode"
                  value={patientData.ma_bhyt}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tên đăng nhập <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="address"
                  value={patientData.username}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
                {errors.address && <span className={styles.error}>{errors.address}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Mật khẩu <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="address"
                  value={patientData.password}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
                {errors.address && <span className={styles.error}>{errors.address}</span>}
              </div>
              
            </div>
          </div>
        </form>
      </div>
      {/* {!isDisabled && (
        <div className={styles.buttons}>
          <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
            <span style={{ padding: '0px 14px' }}>LƯU</span>
          </button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
          </button>
        </div>
      )} */}
      {/* Modal Confirm */}
      {/* <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Xác nhận hủy?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmCancel}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default ViewPatientRegister;

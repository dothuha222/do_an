

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
// import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { createReception, getReception,updateReception } from '../Services/ReceptionService';
import { useParams } from 'react-router-dom';

const PatientRegister = ({ mode, receptionData, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    cccd: '',
    gender: '',
    address: '',
    phoneNumber:'',
    bhytCode: '',
  });

  const {id} = useParams();

  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // useEffect(() => {
  //   if (receptionData) {
  //     setFormData(receptionData);
  //   }
  // }, [receptionData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleDateChange = (date) => {
    setFormData({ ...formData, birthDate: date });
  };

  const handleSaveAndPrint = (e) => {
    let validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = 'Họ và tên là bắt buộc';
    if (!formData.birthDate) validationErrors.birthDate = 'Ngày sinh là bắt buộc';
    if (!formData.cccd) validationErrors.cccd = 'CCCD là bắt buộc';
    if (!formData.gender) validationErrors.gender = 'Giới tính là bắt buộc';
    if (!formData.address) validationErrors.address = 'Địa chỉ là bắt buộc';
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Số điện thoại là bắt buộc';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    else{
      // setErrors({})
      e.preventDefault();
      if(id){
        updateReception(id, formData).then((response) => {
          console.log(response.data)
          navigator('/patient-list')
        })
        .catch(error => {
          console.error(error)
        })
        console.log('da sua')
      }
      else{
        createReception(formData).then((response) => {
          console.log(response.data)
          navigator('/patient-list')
          setFormData
            ({
              fullName: '',
              birthDate: '',
              cccd: '',
              gender: '',
              address: '',
              phoneNumber: '', 
              bhytCode: '',
            });
        })
        .catch(error => {
          console.error(error)
        })
        console.log("da luu")
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setFormData
    ({
        fullName: '',
        birthDate: '',
        cccd: '',
        gender: '',
        address: '',
        phoneNumber: '', 
        bhytCode: '',
    });
    setShowConfirmModal(false);
  };

  const isDisabled = mode === 'view';
  useEffect(() => {
    if(id){
      getReception(id).then((res) => {
        setFormData(res.data)
      }).catch((err) => {
        console.error(err);
      })
    }
  },[id])

  return (
    <div className={styles.receptionForm}>
    
      <div className={styles.formSection} style={{ marginTop: '42px' }}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin bệnh nhân</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              {/* <div className={styles.formGroup}>
                <label>Mã bệnh nhân</label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div> */}
              <div className={styles.formGroup}>
                <label>Họ và tên <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                />
                {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Ngày sinh <span style={{ color: 'red' }}>*</span></label>
                <DatePicker
                  selected={formData.birthDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className={styles.datePicker}
                  disabled={isDisabled}
                  placeholderText="Chọn ngày sinh"
                />
                {errors.birthDate && <span className={styles.error}>{errors.birthDate}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>CCCD <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="cccd"
                  value={formData.cccd}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                />
                {errors.cccd && <span className={styles.error}>{errors.cccd}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Giới tính <span style={{ color: 'red' }}>*</span></label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
                {errors.gender && <span className={styles.error}>{errors.gender}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Địa chỉ <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                />
                {errors.address && <span className={styles.error}>{errors.address}</span>}
              </div>
            </div>
            <div className={styles.formFlex1}>
           
              
              <div className={styles.formGroup}>
                <label>Số điện thoại  <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}

              </div>
              <div className={styles.formGroup}>
                <label>Mã số BHYT</label>
                <input
                  type="text"
                  name="bhytCode"
                  value={formData.bhytCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tên đăng nhập <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                />
                {errors.address && <span className={styles.error}>{errors.address}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Mật khẩu <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                />
                {errors.address && <span className={styles.error}>{errors.address}</span>}
              </div>
              
            </div>
          </div>
        </form>
      </div>
      {!isDisabled && (
        <div className={styles.buttons}>
          <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
            <span style={{ padding: '0px 14px' }}>LƯU</span>
          </button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
          </button>
        </div>
      )}
      {/* Modal Confirm */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
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
      </Modal>
    </div>
  );
};

export default PatientRegister;

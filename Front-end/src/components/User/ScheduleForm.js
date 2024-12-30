

import React, { useState, useEffect } from 'react';
import styles from '../../css/User/ScheduleForm.module.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const  ScheduleForm = ({ mode, receptionData, onClose }) => {
  const [formData, setFormData] = useState({
    appointDay:'',
    patientId: 'BN2098',
    fullName: 'Nguyễn Văn Anh',
    birthDate: '08/12/1980',
    cccd: '034300988712',
    gender: 'Nam',
    address: 'Vạn Phúc, Hà Đông',
    reason: '',
    // room: '',
    phoneNumber: '0988176563', // Giá trị 'Có' hoặc 'Không'
    bhytCode: 'DN47888025341',
  });

  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (receptionData) {
      setFormData(receptionData);
    }
  }, [receptionData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleBHYTChange = (value) => {
  //   setFormData({
  //     ...formData,
  //     bhyt: value,
  //     bhytCode: value === 'Có' ? formData.bhytCode : '', // Reset mã số BHYT nếu chọn "Không"
  //   });
  // };

  const handleAppointChange = (date) => {
    setFormData({ ...formData, appointDay:date});
  };
  const handleDateChange = (date) => {
    setFormData({ ...formData, birthDate: date });
  };

  const handleSaveAndPrint = () => {
    let validationErrors = {};
    if (!formData.appointDay) validationErrors.appointDay = 'Ngày hẹn khám là bắt buộc';
    if (!formData.reason) validationErrors.reason = 'Lý do khám là bắt buộc';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Gửi dữ liệu đã sửa lên server
    console.log('Lưu dữ liệu:', formData);
    onClose();
  };

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    onClose();
    setShowConfirmModal(false);
  };

  // const isDisabled = mode === 'view';

  return (
    <div className={styles.receptionForm}>
      <div className={styles.formSection}>
        <form>
            <h3 className={styles.formH}>ĐƠN TIẾP NHẬN</h3>
          <div className={styles.formFlex}>
             <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Mã bệnh nhân</label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Họ và tên </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ngày sinh </label>
                <DatePicker
                  // selected={formData.birthDate}
                  value={formData.birthDate}
                  dateFormat="dd/MM/yyyy"
                  className={styles.datePicker}
                  placeholderText="Chọn ngày sinh"
                  style={{ backgroundColor: '#e3f5ff' }}
                  disabled
                />
              </div>
              <div className={styles.formGroup}>
                <label>CCCD</label>
                <input
                  type="text"
                  name="cccd"
                  value={formData.cccd}
                  onChange={handleInputChange}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ngày hẹn khám <span style={{ color: 'red' }}>*</span></label>
                <DatePicker
                    selected={formData.appointDay}
                    onChange={handleAppointChange}
                    dateFormat="dd/MM/yyyy"
                    className={styles.datePickerB}
                    placeholderText="Chọn ngày hẹn khám"
                />
                {errors.appointDay && <span className={styles.error}>{errors.appointDay}</span>}
              </div>
            </div>
            <div className={styles.formFlex1}>
            <div className={styles.formGroup}>
                <label>Giới tính </label>
                <input
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                >
                </input>
              </div>
              <div className={styles.formGroup}>
                <label>Địa chỉ </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mã số BHYT</label>
                <input
                  type="text"
                  name="bhytCode"
                  value={formData.bhytCode}
                  onChange={handleInputChange}
                  disabled
                  placeholder="Nhập mã số BHYT"
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Lý do khám <span style={{ color: 'red' }}>*</span> </label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  // disabled={isDisabled}
                />
                {errors.reason && <span className={styles.error}>{errors.reason}</span>}
              </div>
            </div>
          </div>
          
        <div className={styles.buttons}>
          <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
            <span>ĐẶT LỊCH HẸN</span>
          </button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
          </button>
        </div>
        </form>
      </div>

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

export default ScheduleForm;

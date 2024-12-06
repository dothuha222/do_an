

import React, { useState } from 'react';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';


const ReceptionForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    fullName: '',
    birthDate: '',
    cccd: '',
    gender: '',
    address: '',
    reason: '',
    room: '',
  });

  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthDate: date });
  };

  const formatDate = (date) => {
    if (!date) return '';
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JS bắt đầu từ 0
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const handleSaveAndPrint = () => {
    let validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = 'Họ và tên là bắt buộc';
    if (!formData.birthDate) validationErrors.birthDate = 'Ngày sinh là bắt buộc';
    if (!formData.cccd) validationErrors.cccd = 'CCCD là bắt buộc';
    if (!formData.gender) validationErrors.gender = 'Giới tính là bắt buộc';
    if (!formData.address) validationErrors.address = 'Địa chỉ là bắt buộc';
    if (!formData.reason) validationErrors.reason = 'Lý do khám là bắt buộc';
    if (!formData.room) validationErrors.room = 'Phòng khám là bắt buộc';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Hiển thị modal thành công khi lưu và in phiếu
    setShowSuccessModal(true);

    // Reset form
    setFormData({
      patientId: '',
      fullName: '',
      birthDate: '',
      cccd: '',
      gender: '',
      address: '',
      reason: '',
      room: '',
    });
  };

  const handleCancel = () => {
    // Mở modal confirm khi hủy
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setFormData({
      patientId: '',
      fullName: '',
      birthDate: '',
      cccd: '',
      gender: '',
      address: '',
      reason: '',
      room: '',
    });
    setShowConfirmModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className={styles.receptionForm}>
      <div className={styles.buttons}>
        <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
          <FaPrint style={{ marginRight: '8px' }} /> <span>LƯU VÀ IN PHIẾU</span>
        </button>
        <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
          <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span> 
        </button>
      </div>
      <div className={styles.formSection}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin bệnh nhân</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Mã bệnh nhân</label>
                <input type="text" name="patientId" value={formData.patientId} disabled style={{backgroundColor: '#e3f5ff'}}/>
              </div>
              <div className={styles.formGroup}>
                <label>Họ và tên <span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
                {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Ngày sinh <span style={{color: 'red'}}>*</span></label>
                <DatePicker
                  selected={formData.birthDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className={styles.datePicker}
                  placeholderText="Chọn ngày sinh"
                  required
                />
                {errors.birthDate && <span className={styles.error}>{errors.birthDate}</span>}
              </div>
            </div>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>CCCD <span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  name="cccd"
                  value={formData.cccd}
                  onChange={handleInputChange}
                  required
                />
                {errors.cccd && <span className={styles.error}>{errors.cccd}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Giới tính <span style={{color: 'red'}}>*</span></label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
                {errors.gender && <span className={styles.error}>{errors.gender}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Địa chỉ <span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                {errors.address && <span className={styles.error}>{errors.address}</span>}
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className={styles.formSection}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin phiếu</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Mã đơn tiếp nhận </label>
                <input type="text" name="receiptId" disabled style={{backgroundColor: '#e3f5ff'}}/>
              </div>
            </div>
          <div className={styles.formFlex1}>
            <div className={styles.formGroup}>
              <label>Ngày khám</label>
              <input type="text" name="visitDate" disabled style={{backgroundColor: '#e3f5ff'}}/>
            </div>
          </div>
          </div>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Lý do khám <span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                />
                {errors.reason && <span className={styles.error}>{errors.reason}</span>}
              </div>
            </div>
            <div className={styles.formFlex1}>
            <div className={styles.formGroup}>
              <label>Phòng khám <span style={{color: 'red'}}>*</span></label>
              <select name="room" value={formData.room} onChange={handleInputChange} required>
                <option value="">Chọn phòng khám</option>
                <option value="101A">Phòng khám 101A</option>
                <option value="102B">Phòng khám 102B</option>
                <option value="103C">Phòng khám 103C</option>
              </select>
              {errors.room && <span className={styles.error}>{errors.room}</span>}
            </div>
          </div>
          </div>
        </form>
      </div>

      {/* Modal Confirm Save */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Xác nhận hủy đơn tiếp nhận?</p>
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

      {/* Modal Success */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Lưu và in phiếu thành công!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReceptionForm;

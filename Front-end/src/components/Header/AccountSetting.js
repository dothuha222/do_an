import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../css/Header/AccountSetting.module.css'; // Import module CSS
import Image from '../../img/avatar.jpg';

const AccountSetting = ({ updateHeaderAvatar }) => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Đỗ Thu Hà',
    birthDate: '2000-11-09', // Dữ liệu ban đầu
    phoneNumber: '0999888777',
    avatar: Image, // Đường dẫn ảnh avatar
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal thành công
  const [isError, setIsError] = useState(false);

  const handleEdit = () => setIsEditable(true);

  const handleSave = () => {
    const isValid = formData.phoneNumber.match(/^\d{10}$/); // Kiểm tra số điện thoại
    if (isValid) {
      setShowConfirmModal(true); // Hiển thị xác nhận
    } else {
      setIsError(true); // Hiển thị lỗi
    }
  };

  const handleConfirmSave = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true); // Hiển thị modal thành công
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setIsEditable(false);
    navigate(-1); // Quay lại trang trước đó
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result, // Cập nhật avatar
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.accountSettingBody}>
      <div className={styles.accountSettingContainer}>
        {/* Tiêu đề và nút quay lại */}
        <div className={styles.header}>
          <h3>Cài đặt tài khoản</h3>
          <button onClick={() => navigate(-1)}>&lt; Quay lại</button>
        </div>

        {/* Form */}
        <form className={styles.accountForm}>
          <h3>Thông tin tài khoản</h3>
          {/* Họ và tên */}
          <div className={styles.formGroup}>
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          {/* Ngày sinh */}
          <div className={styles.formGroup}>
            <label>Ngày sinh</label>
            <DatePicker
              selected={formData.birthDate ? new Date(formData.birthDate) : null}
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  birthDate: date.toISOString().split('T')[0],
                }))
              }
              dateFormat="dd/MM/yyyy"
              disabled={!isEditable}
            />
          </div>

          {/* Số điện thoại */}
          <div className={styles.formGroup}>
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

          {/* Ảnh đại diện */}
          <div className={styles.formGroup}>
            <label>Ảnh đại diện</label>
            <div className={styles.avatarPreview}>
              <img
                src={formData.avatar || 'https://via.placeholder.com/100'}
                alt="Avatar"
              />
            </div>
            {isEditable && (
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            )}
          </div>

          {/* Nút chỉnh sửa và lưu */}
          <div className={styles.formButtons}>
            {isEditable ? (
              <>
                <Button
                  variant="secondary"
                  className={`${styles.customButton} ${styles.customSaveButton}`}
                  onClick={handleSave}
                >
                  Lưu
                </Button>
                <Button
                  variant="outline-secondary"
                  className={`${styles.customButton}`}
                  onClick={() => setIsEditable(false)}
                >
                  Hủy
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={handleEdit}>
                Chỉnh sửa
              </Button>
            )}
          </div>
        </form>

        {/* Modal Confirm Save */}
        <Modal show={showConfirmModal} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Bạn muốn lưu các thay đổi này không?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleConfirmSave}>
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
            <p>Thông tin tài khoản đã được cập nhật thành công!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Hiển thị lỗi nếu dữ liệu không hợp lệ */}
        {isError && (
          <div className={styles.errorMessage}>Dữ liệu nhập không hợp lệ!</div>
        )}
      </div>
    </div>
  );
};

export default AccountSetting;

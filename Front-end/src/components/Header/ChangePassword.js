
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import styles from '../../css/Header/ChangePassword.module.css'; 
import { changePassword } from '../Services/NguoiDungService';

const ChangePassword = ({userId}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [isError, setIsError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Hàm xử lý thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm xử lý bật/tắt hiển thị mật khẩu
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  console.log(userId)

  const handleSave = () => {
    const { currentPassword, newPassword, confirmNewPassword } = formData;
    console.log(formData)
    
    // if (newPassword === confirmNewPassword && currentPassword && newPassword.length >= 6) {    
      if (newPassword === confirmNewPassword) {
        changePassword(userId, {'new-password': newPassword})
          .then(response => {
            console.log(response.data);
            setShowSuccessModal(true);
          })
          .catch(error => {
            console.error(error);
            setIsError(true);
          });
      }
      else{
        setIsError(true)
      }
  }

  // Hàm xử lý hủy thay đổi và quay lại trang trước đó
  const handleCancel = () => {
    navigate(-1);
  };

  // Hàm xử lý đóng thông báo thành công
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <div className={styles.changePasswordBody}>
      <div className={styles.changePasswordContainer}>
        {/* Tiêu đề và nút quay lại */}
        <div className={styles.header}>
          <h3>Đổi mật khẩu</h3>
          <button onClick={() => navigate(-1)}>&lt; Quay lại</button>
        </div>

        {/* Form đổi mật khẩu */}
        <form className={styles.changePasswordForm}>
          <h3>Thông tin mật khẩu</h3>

          {/* Mật khẩu hiện tại */}
          <div className={styles.formGroup}>
            <label>Nhập mật khẩu hiện tại</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword.currentPassword ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <span onClick={() => togglePasswordVisibility('currentPassword')} className={styles.eyeIcon}>
                {showPassword.currentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Mật khẩu mới */}
          <div className={styles.formGroup}>
            <label>Nhập mật khẩu mới</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <span onClick={() => togglePasswordVisibility('newPassword')} className={styles.eyeIcon}>
                {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Nhập lại mật khẩu mới */}
          <div className={styles.formGroup}>
            <label>Nhập lại mật khẩu mới</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword.confirmNewPassword ? 'text' : 'password'}
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />
              <span onClick={() => togglePasswordVisibility('confirmNewPassword')} className={styles.eyeIcon}>
                {showPassword.confirmNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Nút Lưu và Hủy */}
          <div className={styles.formButtons}>
            <Button variant="primary" onClick={handleSave} className={styles.customSaveButton}>
              Lưu
            </Button>
            <Button variant="outline-secondary" onClick={handleCancel} className={styles.customCancelButton}>
              Hủy
            </Button>
          </div>
        </form>

        {/* Thông báo lỗi nếu nhập không hợp lệ */}
        {isError && (
          <div className={styles.errorMessage}>Dữ liệu nhập không đúng. Vui lòng kiểm tra lại.</div>
        )}

        {/* Modal thành công */}
        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title>Đổi mật khẩu thành công</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Mật khẩu của bạn đã được thay đổi thành công!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ChangePassword;

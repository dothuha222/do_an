import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from '../../css/Header/Header.module.css'; // Import CSS Module
import avatar from "../../img/avatar.jpg"; // Import ảnh avatar

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicked outside
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Handle user logout
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={styles.headerBody}>
      <header className={styles.header}>
        {/* Vị trí bên trái */}
        {/* <h5 className={styles.headerTitle}>HỆ THỐNG QUẢN LÝ PHÒNG KHÁM TƯ NHÂN</h5> */}
        <NavLink 
        to="/reception-form" 
        className={styles.headerTitle} 
      >
        HỆ THỐNG QUẢN LÝ PHÒNG KHÁM TƯ NHÂN
      </NavLink>
        {/* Vị trí bên phải */}
        <div className={styles.headerRight} onClick={(e) => e.stopPropagation()}>
          <div className={styles.loginDev} onClick={() => navigate('/login')}>
            <strong>Đăng nhập</strong>
          </div>
          <div className={styles.userDev}>
            <div className={styles.userInfo}>
              {/* <strong>Nguyễn Văn Anh</strong> */}
              {/* <strong>Đỗ Thu Hà</strong> */}
              <strong>Phạm Minh Phương</strong>
            </div>
            <button className={styles.dropdownToggleBtn} onClick={toggleDropdown}>
              <i className="fas fa-chevron-down"></i>
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    closeDropdown();
                    navigate('/change-password');
                  }}
                >
                  Đổi mật khẩu
                </button>
                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    closeDropdown();
                    handleLogout();
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Tạo backdrop khi dropdown mở */}
        {isDropdownOpen && <div onClick={closeDropdown} className={styles.dropdownBackdrop}></div>}
      </header>
    </div>
  );
};

export default Header;

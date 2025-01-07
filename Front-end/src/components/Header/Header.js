import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from '../../css/Header/Header.module.css'; 
import { TbEngineOff } from 'react-icons/tb';

const Header = ({ten}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };
  console.log(ten)
  
  return (
    <div className={styles.headerBody}>
      <header className={styles.header}>
 
        <NavLink 
        to="/reception-form" 
        className={styles.headerTitle} 
      >
        HỆ THỐNG QUẢN LÝ PHÒNG KHÁM TƯ NHÂN
      </NavLink>
        {/* <div className={styles.headerRight} onClick={(e) => e.stopPropagation()}>
          <div className={styles.loginDev} onClick={() => navigate('/login')}>
            <strong>Đăng nhập</strong>
          </div>
          <div className={styles.userDev}>
            <div className={styles.userInfo}>
              <strong></strong>
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
        {isDropdownOpen && <div onClick={closeDropdown} className={styles.dropdownBackdrop}></div>} */}
          <div className={styles.headerRight} onClick={(e) => e.stopPropagation()}>
          {ten ? ( // Hiển thị tên nếu userName tồn tại
            <div className={styles.userDev}>
              <div className={styles.userInfo}>
                <strong>{ten}</strong>
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
          ) : (
            // Nếu userName không tồn tại, hiển thị nút đăng nhập
            <div className={styles.loginDev} onClick={() => navigate('/login')}>
              <strong>Đăng nhập</strong>
            </div>
          )}
        </div>
        {isDropdownOpen && <div onClick={closeDropdown} className={styles.dropdownBackdrop}></div>}
      </header>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png'
import styles from '../../css/User/NavbarUser.module.css'
const NavbarUser = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className={`${styles.navbar} ${isSticky ? styles.sticky : ""}`}>
      <div className={styles.tabLogo}>
        <div>
          <Link to="/home"><img src={logo} style={{width:'100%'}}/></Link>
        </div>
      </div>
      <ul className={styles.tabs}>
        <li
          className={`${styles.tabItem} ${activeTab === 'home' ? styles.active : ''}`}
          onClick={() => handleTabClick('home')}
        >
          <Link to="/home">Trang chủ</Link>
        </li>
        <li
          className={`${styles.tabItem} ${activeTab === 'schedule' ? styles.active : ''}`}
          onClick={() => handleTabClick('schedule')}
        >
          <Link to="/schedule-form">Đặt lịch hẹn</Link>
        </li>
        <li
          className={`${styles.tabItem} ${activeTab === 'scheduleList' ? styles.active : ''}`}
          onClick={() => handleTabClick('scheduleList')}
        >
          <Link to="/schedule-list">Danh sách lịch hẹn</Link>
        </li>
        <li
          className={`${styles.tabItem} ${activeTab === 'healthHistory' ? styles.active : ''}`}
          onClick={() => handleTabClick('healthHistory')}
        >
        <Link to="/health-history">Lịch sử bệnh án</Link>
        </li>
        {/* <li
          className={`${styles.tabItem} ${activeTab === 'invoiceHistory' ? styles.active : ''}`}
          onClick={() => handleTabClick('invoiceHistory')}
        >
          <Link to="/invoice-history">Hóa đơn</Link>
        </li> */}
      </ul>
      
    </div>
  );
};

export default NavbarUser;

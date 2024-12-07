import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ReceptionManage/Navbar.css'; // Đảm bảo đã import CSS cho Navbar

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('receptionForm');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="navbar">
      <ul className="tabs">
        <li
          className={`tab-item ${activeTab === 'receptionForm' ? 'active' : ''}`}
          onClick={() => handleTabClick('receptionForm')}
        >
          <Link to="/reception-form">Đơn tiếp nhận</Link>
        </li>
        <li
          className={`tab-item ${activeTab === 'receptionList' ? 'active' : ''}`}
          onClick={() => handleTabClick('receptionList')}
        >
          <Link to="/reception-list">Danh sách tiếp nhận</Link>
        </li>
        <li
          className={`tab-item ${activeTab === 'patientList' ? 'active' : ''}`}
          onClick={() => handleTabClick('patientList')}
        >
          <Link to="/patient-list">Danh sách bệnh nhân</Link>
        </li>
        <li
          className={`tab-item ${activeTab === 'healthForm' ? 'active' : ''}`}
          onClick={() => handleTabClick('healthForm')}
        >
          <Link to="/health-form">Đơn khám bệnh</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

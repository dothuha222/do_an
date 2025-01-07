import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ReceptionManage/Navbar.css'; // Đảm bảo đã import CSS cho Navbar

const NavbarHealth = () => {
  const [activeTab, setActiveTab] = useState('receptionForm');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="navbar">
      <ul className="tabs">
        <li
          className={`tab-item ${activeTab === 'khambenhList' ? 'active' : ''}`}
          onClick={() => handleTabClick('khambenhList')}
        >
          <Link to="/khambenh-list">Danh sách khám bệnh</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default NavbarHealth;

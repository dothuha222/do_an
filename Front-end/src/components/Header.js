import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import "../css/Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <Nav variant="tabs" activeKey={location.pathname} className="custom-tabs">
      <Nav.Item>
        <Nav.Link as={Link} to="/" eventKey="/">
          Đơn Tiếp Nhận
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/reception-list" eventKey="/reception-list">
          Danh Sách Tiếp Nhận
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/patient-list" eventKey="/patient-list">
          Danh Sách Bệnh Nhân
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Header;

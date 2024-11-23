
// import React, { useState } from 'react';
// import { Button, Row, Col, Form, Card, Container, Nav } from 'react-bootstrap';
// import Header from './Header';
// const ReceptionForm = () => {
//   const [activeTab, setActiveTab] = useState('receptionForm'); // Quản lý tab hiện tại

//   // Nội dung từng tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'receptionForm':
//         return (
//           <div>
//             {/* Nội dung giao diện Đơn Tiếp Nhận */}
//             <Card className="shadow-sm border-0">
//               <Card.Body>
//                 <div className="d-flex justify-content-between mb-3">
//                   <Button variant="success" className="mr-2">Thêm Mới (F2)</Button>
//                   <Button variant="warning" className="mr-2">Sửa (F3)</Button>
//                   <Button variant="primary" className="mr-2">Lưu (F4)</Button>
//                   <Button variant="danger" className="mr-2">Hủy</Button>
//                   <Button variant="info">In Phiếu</Button>
//                 </div>

//                 {/* Phần 1: Thông tin bệnh nhân */}
//                 <Card className="mb-4 border-0 shadow-sm">
//                   <Card.Header className="bg-primary text-white">
//                     <h5 className="mb-0">Thông Tin Bệnh Nhân</h5>
//                   </Card.Header>
//                   <Card.Body>
//                     <Row>
//                       <Col md={3}>
//                         <Form.Group>
//                           <Form.Label>Mã BN</Form.Label>
//                           <Form.Control type="text" />
//                         </Form.Group>
//                       </Col>
//                       <Col md={3}>
//                         <Form.Group>
//                           <Form.Label>Họ tên</Form.Label>
//                           <Form.Control type="text" />
//                         </Form.Group>
//                       </Col>
//                       <Col md={3}>
//                         <Form.Group>
//                           <Form.Label>Năm sinh</Form.Label>
//                           <Form.Control type="date" />
//                         </Form.Group>
//                       </Col>
//                       <Col md={3}>
//                         <Form.Group>
//                           <Form.Label>Giới tính</Form.Label>
//                           <Form.Control as="select">
//                             <option>Nam</option>
//                             <option>Nữ</option>
//                           </Form.Control>
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                   </Card.Body>
//                 </Card>

//                 {/* Phần 2: Thông tin phiếu */}
//                 <Card className="mb-4 border-0 shadow-sm">
//                   <Card.Header className="bg-success text-white">
//                     <h5 className="mb-0">Thông Tin Phiếu</h5>
//                   </Card.Header>
//                   <Card.Body>
//                     <Row>
//                       <Col md={3}>
//                         <Form.Group>
//                           <Form.Label>Mã ĐK Khám</Form.Label>
//                           <Form.Control type="text" value="Tự động sinh" readOnly />
//                         </Form.Group>
//                       </Col>
//                       <Col md={3}>
//                         <Form.Group>
//                           <Form.Label>Ngày đăng ký khám</Form.Label>
//                           <Form.Control type="text" value={new Date().toLocaleDateString('vi-VN')} readOnly />
//                         </Form.Group>
//                       </Col>
//                       <Col md={3}>
//                         <Form.Group>
//                           <Form.Label>Dịch vụ</Form.Label>
//                           <Form.Control as="select">
//                             <option>Khám nội thường</option>
//                             <option>Khám ngoại thường</option>
//                           </Form.Control>
//                         </Form.Group>
//                       </Col>
//                       <Col md={3}>
//                         <Form.Group>
//                           <Form.Label>Phòng khám</Form.Label>
//                           <Form.Control type="text" />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Form.Group>
//                       <Form.Label>Lý do khám</Form.Label>
//                       <Form.Control as="textarea" rows={3} />
//                     </Form.Group>
//                   </Card.Body>
//                 </Card>
//               </Card.Body>
//             </Card>
//           </div>
//         );
//       case 'receptionList':
//         return (
//           <div>
//             <h5>Danh Sách Tiếp Nhận</h5>
//             <p>Hiển thị danh sách các đơn tiếp nhận.</p>
//           </div>
//         );
//       case 'patientList':
//         return (
//           <div>
//             <h5>Danh Sách Bệnh Nhân</h5>
//             <p>Hiển thị danh sách bệnh nhân.</p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Container className="mt-4">
//       {/* Tab điều hướng */}
//       <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
//         <Nav.Item>
//           <Nav.Link eventKey="receptionForm">Đơn Tiếp Nhận</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="receptionList">Danh Sách Tiếp Nhận</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="patientList">Danh Sách Bệnh Nhân</Nav.Link>
//         </Nav.Item>
//       </Nav>

//       {/* Nội dung tab */}
//       {renderContent()}
//     </Container>
//   );
// };

// export default ReceptionForm;

import React, { useState } from 'react';
import { Button, Row, Col, Form, Card, Container, Nav } from 'react-bootstrap';
import Header from './Header';

const ReceptionForm = () => {
  return (
    <Container className="mt-4">
      {/* Header sẽ được hiển thị chung ở đầu */}
      <Header />

      {/* Nội dung Đơn Tiếp Nhận */}
      <Card className="shadow-sm border-0 mt-4">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <Button variant="success" className="mr-2">Thêm Mới (F2)</Button>
            <Button variant="warning" className="mr-2">Sửa (F3)</Button>
            <Button variant="primary" className="mr-2">Lưu (F4)</Button>
            <Button variant="danger" className="mr-2">Hủy</Button>
            <Button variant="info">In Phiếu</Button>
          </div>

          {/* Phần 1: Thông tin bệnh nhân */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Thông Tin Bệnh Nhân</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Mã BN</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Năm sinh</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Control as="select">
                      <option>Nam</option>
                      <option>Nữ</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Phần 2: Thông tin phiếu */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Thông Tin Phiếu</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Mã ĐK Khám</Form.Label>
                    <Form.Control type="text" value="Tự động sinh" readOnly />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Ngày đăng ký khám</Form.Label>
                    <Form.Control type="text" value={new Date().toLocaleDateString('vi-VN')} readOnly />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Dịch vụ</Form.Label>
                    <Form.Control as="select">
                      <option>Khám nội thường</option>
                      <option>Khám ngoại thường</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Phòng khám</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Lý do khám</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReceptionForm;

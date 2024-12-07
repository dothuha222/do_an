
import React, { useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import styles from '../../css/ReceptionManage/ReceptionList.module.css';

const ReceptionList = () => {
  const [filters, setFilters] = useState({
    fromDate: null, // Thay đổi từ chuỗi sang giá trị null (dùng cho DatePicker)
    toDate: null,
    searchPatient: '',
  });

  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

  const [receptionList, setReceptionList] = useState([
    // Dữ liệu giả lập như ban đầu
    {
      id: 1,
      patientCode: 'BN001',
      patientName: 'Nguyen Van A',
      receptionCode: 'RN001',
      receptionTime: '2024-11-28T09:00:00',
      room: '101A',
      status: 'Đợi khám',
    },
    {
        id: 2,
        patientCode: 'BN002',
        patientName: 'Tran Thi B',
        receptionCode: 'RN002',
        receptionTime: '2024-11-28T10:00:00',
        room: '102B',
        status: 'Đang khám',
      },
      {
        id: 3,
        patientCode: 'BN003',
        patientName: 'Le Van C',
        receptionCode: 'RN003',
        receptionTime: '2024-11-28T11:00:00',
        room: '103C',
        status: 'Đã khám',
      },
      {
        id: 4,
        patientCode: 'BN004',
        patientName: 'Pham Thi D',
        receptionCode: 'RN004',
          receptionTime: '2024-11-28T12:00:00',
          room: '104D',
          status: 'Đợi khám',
        },
        {
          id: 5,
          patientCode: 'BN005',
          patientName: 'Nguyen Thi E',
          receptionCode: 'RN005',
          receptionTime: '2024-11-28T13:00:00',
          room: '105E',
          status: 'Đang khám',
        },
        {
          id: 6,
          patientCode: 'BN006',
          patientName: 'Do Van F',
          receptionCode: 'RN006',
          receptionTime: '2024-11-28T14:00:00',
          room: '106F',
          status: 'Đã khám',
        },
        {
          id: 7,
          patientCode: 'BN007',
          patientName: 'Tran Van G',
          receptionCode: 'RN007',
          receptionTime: '2024-11-28T15:00:00',
          room: '107G',
          status: 'Đợi khám',
        },
        {
          id: 8,
          patientCode: 'BN008',
          patientName: 'Le Thi H',
          receptionCode: 'RN008',
          receptionTime: '2024-11-28T16:00:00',
          room: '108H',
          status: 'Đang khám',
        },
        {
          id: 9,
          patientCode: 'BN009',
          patientName: 'Nguyen Van I',
          receptionCode: 'RN009',
          receptionTime: '2024-11-28T17:00:00',
          room: '109I',
          status: 'Đã khám',
        },
        {
          id: 10,
          patientCode: 'BN010',
          patientName: 'Pham Thi J',
          receptionCode: 'RN010',
          receptionTime: '2024-11-28T18:00:00',
          room: '110J',
          status: 'Đợi khám',
        },
        {
          id: 11,
          patientCode: 'BN011',
          patientName: 'Tran Thi K',
          receptionCode: 'RN011',
          receptionTime: '2024-11-28T19:00:00',
          room: '111K',
          status: 'Đang khám',
        },
        {
          id: 12,
          patientCode: 'BN012',
          patientName: 'Le Van L',
          receptionCode: 'RN012',
          receptionTime: '2024-11-28T20:00:00',
          room: '112L',
          status: 'Đã khám',
    },
    // Thêm dữ liệu khác...
  ]);

  // Đổi định dạng ngày tháng thành dd/MM/yyyy
  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSearch = () => {
    const { fromDate, toDate, searchPatient } = filters;
    let filteredList = [...receptionList];

    if (fromDate && !toDate) {
      filteredList = filteredList.filter(
        (item) => new Date(item.receptionTime) >= fromDate
      );
    } else if (!fromDate && toDate) {
      alert('Chưa chọn ngày bắt đầu');
      return;
    } else if (fromDate && toDate) {
      filteredList = filteredList.filter(
        (item) =>
          new Date(item.receptionTime) >= fromDate &&
          new Date(item.receptionTime) <= toDate
      );
    }

    if (searchPatient) {
      filteredList = filteredList.filter((item) =>
        item.patientName.toLowerCase().includes(searchPatient.toLowerCase())
      );
    }

    setReceptionList(filteredList);
    setCurrentPage(1); // Reset về trang đầu tiên
  };

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = receptionList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(receptionList.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.receptionList}>
      {/* Phần 1: Bộ lọc */}
      <div className={styles.filterSection}>
        <div>
          <label>Từ ngày</label>
          <DatePicker
            selected={filters.fromDate}
            onChange={(date) => handleFilterChange('fromDate', date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className={styles.filterDate}
          />
        </div>
        <div>
          <label>Đến ngày</label>
          <DatePicker
            selected={filters.toDate}
            onChange={(date) => handleFilterChange('toDate', date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className={styles.filterDate}
          />
        </div>
        <div className={styles.filterName}>
          <label>Tìm kiếm BN</label>
          <input
            type="text"
            name="searchPatient"
            placeholder="Nhập tên bệnh nhân"
            value={filters.searchPatient}
            onChange={(e) =>
              handleFilterChange('searchPatient', e.target.value)
            }
            className={styles.filterDate}
          />
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          <i className="fa fa-search" /> Tìm kiếm
        </button>
      </div>

      {/* Phần 2: Bảng danh sách */}
      <table className={styles.listTable}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã bệnh nhân</th>
            <th>Họ và tên</th>
            <th>Mã đơn tiếp nhận</th>
            <th>Thời gian tiếp nhận</th>
            <th>Phòng khám</th>
            <th>Chi tiết</th>
            <th>Hành động</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr
                key={item.id}
                style={{
                  backgroundColor:
                    (indexOfFirstItem + index + 1) % 2 === 0 ? '#e7e7e7' : '#fff',
                }}
              >
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.patientCode}</td>
                <td>{item.patientName}</td>
                <td>{item.receptionCode}</td>
                <td>{formatDate(new Date(item.receptionTime))}</td>
                <td>{item.room}</td>
                <td>
                  <button
                    className={styles.detailButton}
                    onClick={() => alert(`Xem chi tiết ${item.receptionCode}`)}
                  >
                    Xem
                  </button>
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => alert(`Sửa ${item.receptionCode}`)}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() =>
                      window.confirm('Bạn muốn xóa bản ghi này không?') &&
                      alert(`Đã xóa ${item.receptionCode}`)
                    }
                  >
                    <FaTrash />
                  </button>
                </td>
                <td
                  style={{
                    color:
                      item.status === 'Đợi khám'
                        ? 'blue'
                        : item.status === 'Đang khám'
                        ? '#e6c900'
                        : 'green',
                  }}
                >
                  {item.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phần 3: Phân trang */}
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          &lt;
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ReceptionList;


// import React, { useState, useEffect } from 'react';
// import styles from '../../css/ReceptionManage/ReceptionList.module.css';
// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
// import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
// import Modal from 'react-bootstrap/Modal';
// import ReceptionForm from './ReceptionForm';

// const ReceptionList = () => {
//   const [receptions, setReceptions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedReception, setSelectedReception] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [mode, setMode] = useState('add'); // Modes: 'add', 'edit', 'view'

//   useEffect(() => {
//     // Giả lập dữ liệu tiếp nhận
//     const dummyData = [
//       { id: 1, patientId: 'P001', fullName: 'Nguyễn Văn A', receptionCode: 'R001', receptionTime: '06/12/2024', reason: 'Khám tổng quát', room: '101A' },
//       { id: 2, patientId: 'P002', fullName: 'Trần Thị B', receptionCode: 'R002', receptionTime: '06/12/2024', reason: 'Khám nội tiết', room: '102B' },
//       { id: 3, patientId: 'P003', fullName: 'Lê Văn C', receptionCode: 'R003', receptionTime: '06/12/2024', reason: 'Khám tai mũi họng', room: '103C' },
//     ];
//     setReceptions(dummyData);
//   }, []);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredReceptions = receptions.filter((reception) =>
//     reception.fullName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddReception = () => {
//     setSelectedReception(null);
//     setMode('add');
//     setShowModal(true);
//   };

//   const handleEditReception = (reception) => {
//     setSelectedReception(reception);
//     setMode('edit');
//     setShowModal(true);
//   };

//   const handleViewReception = (reception) => {
//     setSelectedReception(reception);
//     setMode('view');
//     setShowModal(true);
//   };

//   const handleDeleteReception = (id) => {
//     const confirmed = window.confirm('Bạn có chắc chắn muốn xóa không?');
//     if (confirmed) {
//       setReceptions(receptions.filter((reception) => reception.id !== id));
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className={styles.receptionListContainer}>
//       <h2 className={styles.header}>Danh sách tiếp nhận</h2>
//       <div className={styles.actionContainer}>
//         <input
//           type="text"
//           placeholder="Tìm kiếm theo tên bệnh nhân..."
//           value={searchTerm}
//           onChange={handleSearch}
//           className={styles.searchInput}
//         />
//         <Button onClick={handleAddReception} className={styles.addButton}>
//           <FaPlus /> Thêm mới
//         </Button>
//       </div>
//       <Table striped bordered hover className={styles.receptionTable}>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Mã bệnh nhân</th>
//             <th>Họ và tên</th>
//             <th>Mã phiếu</th>
//             <th>Ngày tiếp nhận</th>
//             <th>Lý do khám</th>
//             <th>Phòng khám</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredReceptions.length > 0 ? (
//             filteredReceptions.map((reception, index) => (
//               <tr key={reception.id}>
//                 <td>{index + 1}</td>
//                 <td>{reception.patientId}</td>
//                 <td>{reception.fullName}</td>
//                 <td>{reception.receptionCode}</td>
//                 <td>{reception.receptionTime}</td>
//                 <td>{reception.reason}</td>
//                 <td>{reception.room}</td>
//                 <td>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     onClick={() => handleViewReception(reception)}
//                     className={styles.viewButton}
//                   >
//                     <FaSearch /> Xem
//                   </Button>
//                   <Button
//                     variant="warning"
//                     size="sm"
//                     onClick={() => handleEditReception(reception)}
//                     className={styles.editButton}
//                   >
//                     <FaEdit /> Sửa
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDeleteReception(reception.id)}
//                     className={styles.deleteButton}
//                   >
//                     <FaTrash /> Xóa
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className={styles.noData}>
//                 Không tìm thấy dữ liệu phù hợp
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Modal for Add/Edit/View */}
//       <Modal show={showModal} onHide={handleModalClose} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {mode === 'add' && 'Thêm mới tiếp nhận'}
//             {mode === 'edit' && 'Chỉnh sửa tiếp nhận'}
//             {mode === 'view' && 'Xem chi tiết tiếp nhận'}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <ReceptionForm mode={mode} receptionData={selectedReception} onClose={handleModalClose} />
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ReceptionList;

// import React, { useState, useEffect } from 'react';
// import styles from '../../css/ReceptionManage/ReceptionList.module.css';
// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
// import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
// import Modal from 'react-bootstrap/Modal';
// import ReceptionForm from './ReceptionForm';

// const ReceptionList = () => {
//   const [receptions, setReceptions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedReception, setSelectedReception] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [mode, setMode] = useState('add'); // Modes: 'add', 'edit', 'view'

//   useEffect(() => {
//     // Giả lập dữ liệu tiếp nhận
//     const dummyData = [
//       { id: 1, patientId: 'P001', fullName: 'Nguyễn Văn A', receptionCode: 'R001', receptionTime: '06/12/2024', reason: 'Khám tổng quát', room: '101A' },
//       { id: 2, patientId: 'P002', fullName: 'Trần Thị B', receptionCode: 'R002', receptionTime: '06/12/2024', reason: 'Khám nội tiết', room: '102B' },
//       { id: 3, patientId: 'P003', fullName: 'Lê Văn C', receptionCode: 'R003', receptionTime: '06/12/2024', reason: 'Khám tai mũi họng', room: '103C' },
//     ];
//     setReceptions(dummyData);
//   }, []);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredReceptions = receptions.filter((reception) =>
//     reception.fullName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddReception = () => {
//     setSelectedReception(null);
//     setMode('add');
//     setShowModal(true);
//   };

//   const handleEditReception = (reception) => {
//     setSelectedReception(reception);
//     setMode('edit');
//     setShowModal(true);
//   };

//   const handleViewReception = (reception) => {
//     setSelectedReception(reception);
//     setMode('view');
//     setShowModal(true);
//   };

//   const handleDeleteReception = (id) => {
//     const confirmed = window.confirm('Bạn có chắc chắn muốn xóa không?');
//     if (confirmed) {
//       setReceptions(receptions.filter((reception) => reception.id !== id));
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className={styles.receptionListContainer}>
//       <h2 className={styles.header}>Danh sách tiếp nhận</h2>
//       <div className={styles.actionContainer}>
//         <input
//           type="text"
//           placeholder="Tìm kiếm theo tên bệnh nhân..."
//           value={searchTerm}
//           onChange={handleSearch}
//           className={styles.searchInput}
//         />
//         <Button onClick={handleAddReception} className={styles.addButton}>
//           <FaPlus /> Thêm mới
//         </Button>
//       </div>
//       <Table striped bordered hover className={styles.receptionTable}>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Mã bệnh nhân</th>
//             <th>Họ và tên</th>
//             <th>Mã phiếu</th>
//             <th>Ngày tiếp nhận</th>
//             <th>Lý do khám</th>
//             <th>Phòng khám</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredReceptions.length > 0 ? (
//             filteredReceptions.map((reception, index) => (
//               <tr key={reception.id}>
//                 <td>{index + 1}</td>
//                 <td>{reception.patientId}</td>
//                 <td>{reception.fullName}</td>
//                 <td>{reception.receptionCode}</td>
//                 <td>{reception.receptionTime}</td>
//                 <td>{reception.reason}</td>
//                 <td>{reception.room}</td>
//                 <td>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     onClick={() => handleViewReception(reception)}
//                     className={styles.viewButton}
//                   >
//                     <FaSearch /> Xem
//                   </Button>
//                   <Button
//                     variant="warning"
//                     size="sm"
//                     onClick={() => handleEditReception(reception)}
//                     className={styles.editButton}
//                   >
//                     <FaEdit /> Sửa
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDeleteReception(reception.id)}
//                     className={styles.deleteButton}
//                   >
//                     <FaTrash /> Xóa
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className={styles.noData}>
//                 Không tìm thấy dữ liệu phù hợp
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Modal for Add/Edit/View */}
//       <Modal show={showModal} onHide={handleModalClose} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {mode === 'add' && 'Thêm mới tiếp nhận'}
//             {mode === 'edit' && 'Chỉnh sửa tiếp nhận'}
//             {mode === 'view' && 'Xem chi tiết tiếp nhận'}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <ReceptionForm mode={mode} receptionData={selectedReception} onClose={handleModalClose} />
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ReceptionList;
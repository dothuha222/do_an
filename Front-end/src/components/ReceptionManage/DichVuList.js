

import React, { useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import icons
import styles from '../../css/ReceptionManage/PatientList.module.css';
import { useNavigate } from 'react-router-dom';
const DichVuList = () => {
  const navigator = useNavigate();

  const handleAdd = () => {
    navigator('/dichvu-form');
  };
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

  const [patients, setPatients] = useState([
    // Dữ liệu giả lập
    { 
        id: 1, 
        dichVuCode: 'DV001', 
        dichVuName: 'Khám tổng quát', 
        type: 'Cơ bản', 
        price: '200000', 
    },
    { 
        id: 2, 
        dichVuCode: 'DV002', 
        dichVuName: 'Khám chuyên khoa nội', 
        type: 'Cơ bản', 
        price: '300000', 
    },
    { 
        id: 3, 
        dichVuCode: 'DV003', 
        dichVuName: 'Khám chuyên khoa ngoại', 
        type: 'Cao cấp', 
        price: '500000', 
    },
    { 
        id: 4, 
        dichVuCode: 'DV004', 
        dichVuName: 'Khám sức khỏe định kỳ', 
        type: 'Cao cấp', 
        price: '800000', 
    },
    { 
      id: 5, 
      dichVuCode: 'DV005', 
      dichVuName: 'Khám da liễu', 
      type: 'Cơ bản', 
      price: '250000', 
  },
  { 
      id: 6, 
      dichVuCode: 'DV006', 
      dichVuName: 'Khám tim mạch', 
      type: 'Cao cấp', 
      price: '600000', 
  }
]
  )
  // Xóa bệnh nhân
  const handleDelete = (id) => {
    if (window.confirm('Bạn muốn xóa bản ghi này không?')) {
      setPatients(patients.filter((patient) => patient.id !== id));
    }
  };

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = patients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(patients.length / itemsPerPage);

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
    <div className={styles.patientList}>
       <div className={styles.addButton} >
       <button
            variant="contained"
            color="primary"
            onClick={() => handleAdd()}
            style={{backgroundColor:'#588ad7', color:'#fff', border: 'none', borderRadius:'4px', padding:'10px 14px', margin:'20px 0 30px 64px'}}
        >
            THÊM DỊCH VỤ +
        </button>
       </div>
      {/* Phần 2: Bảng danh sách */}
      <table className={styles.listTable}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã dịch vụ</th>
            <th>Tên dịch vụ</th>
            <th>Loại dịch vụ</th>
            <th>Giá tiền</th>
            <th>Chi tiết</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((patient, index) => (
              <tr 
              key={patient.id}
              style={{
                backgroundColor:
                  (indexOfFirstItem + index + 1) % 2 === 0 ? '#e7e7e7' : '#fff',
              }}
              >
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{patient.dichVuCode}</td>
                <td>{patient.dichVuName}</td>
                <td>{patient.type}</td>
                <td>{patient.price}</td>
                <td>
                  <button
                    className={styles.detailButton}
                    onClick={() => alert(`Xem chi tiết ${patient.dichVuCode}`)}
                  >
                    Xem
                  </button>
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => alert(`Sửa ${patient.dichVuCode}`)}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(patient.id)}
                  >
                    <FaTrash />
                  </button>
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

export default DichVuList;

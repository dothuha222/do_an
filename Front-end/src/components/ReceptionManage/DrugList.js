

import React, { useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import icons
import styles from '../../css/ReceptionManage/PatientList.module.css';
import { useNavigate } from 'react-router-dom';
const DrugList = () => {
  const navigator = useNavigate();

  const handleAdd = () => {
    navigator('/drug-form');
  };
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

  const [patients, setPatients] = useState([
    // Dữ liệu giả lập
    { 
        id: 1, 
        drugCode: 'TH001', 
        drugName: 'Paracetamol', 
        unit: 'viên', 
        price: '5000', 
    },
    { 
        id: 2, 
        drugCode: 'TH002', 
        drugName: 'Amoxicillin', 
        unit: 'viên', 
        price: '700', 
    },
    { 
        id: 3, 
        drugCode: 'TH003', 
        drugName: 'Ibuprofen', 
        unit: 'viên', 
        price: '8000', 
    },
    { 
        id: 4, 
        drugCode: 'TH004', 
        drugName: 'Ciprofloxacin', 
        unit: 'viên', 
        price: '10000', 
    },
    { 
      id: 5, 
      drugCode: 'TH005', 
      drugName: 'Metronidazole', 
      unit: 'viên', 
      price: '6000', 
  },
  { 
      id: 6, 
      drugCode: 'TH006', 
      drugName: 'Azithromycin', 
      unit: 'viên', 
      price: '12000', 
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
            THÊM THUỐC +
        </button>
       </div>
      {/* Phần 2: Bảng danh sách */}
      <table className={styles.listTable}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã thuốc</th>
            <th>Tên thuốc</th>
            <th>Đơn vị</th>
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
                <td>{patient.drugCode}</td>
                <td>{patient.drugName}</td>
                <td>{patient.unit}</td>
                <td>{patient.price}</td>
                <td>
                  <button
                    className={styles.detailButton}
                    onClick={() => alert(`Xem chi tiết ${patient.drugCode}`)}
                  >
                    Xem
                  </button>
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => alert(`Sửa ${patient.drugCode}`)}
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

export default DrugList;

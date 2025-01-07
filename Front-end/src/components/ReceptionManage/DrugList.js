

import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import icons
import styles from '../../css/ReceptionManage/PatientList.module.css';
import { useNavigate } from 'react-router-dom';
import {getDsThuoc, deleteThuoc} from '../Services/LeTanService'
import { Link } from 'react-router-dom';

const DrugList = () => {
  const navigator = useNavigate();

  const handleAdd = () => {
    navigator('/drug-form');
  };
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

  const [drugList, setDrugList] = useState([])

  const transformDrugData = (drugArray) => {
    return drugArray.map((drug) => ({
      id: drug.thuoc_id,
      drugCode: `TH${drug.thuoc_id.toString().padStart(3, '0')}`, // Định dạng mã thuốc với tiền tố "TH" và 3 chữ số
      drugName: drug.ten,
      unit: drug.don_vi.toLowerCase(), // Chuyển đơn vị về chữ thường (nếu cần)
      price: drug.gia.toString(), // Chuyển giá thành chuỗi
    }));
  };

  useEffect(() => {
    getDsThuoc()
      .then((response) => {
        console.log(response.data)
        const transformedData = transformDrugData(response.data);
        console.log(transformedData)
        setDrugList(transformedData); 
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách thuốc:", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thuốc này?")) {
      deleteThuoc(id)
        .then((response) => {
          console.log("Xóa thuốc thành công:", response.data);
          alert("Thuốc đã được xóa thành công!");
          setDrugList((prevList) => prevList.filter((drug) => drug.id !== id));
        })
        .catch((error) => {
          console.error("Lỗi khi xóa thuốc:", error);
        });
    }
  }

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = drugList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(drugList.length / itemsPerPage);

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
                  <Link to={`/view-drug/${patient.id}`}>Xem</Link>
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    
                    // onClick={() => alert(`Sửa ${patient.drugCode}`)}
                  >
                    <Link to={`/edit-drug/${patient.id}`}><FaPencilAlt /></Link>
                    
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

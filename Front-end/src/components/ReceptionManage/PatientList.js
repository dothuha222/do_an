

import React, { useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import icons
import styles from '../../css/ReceptionManage/PatientList.module.css';

const PatientList = () => {
  const [filters, setFilters] = useState({
    searchPatient: '',
  });

  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

  const [patients, setPatients] = useState([
    // Dữ liệu giả lập
    { id: 1, patientCode: 'BN2098', fullName: 'Nguyễn Văn Anh', gender: 'Nam', dob: '08/12/1980', cccd: '034300988712', address: 'Vạn Phúc, Hà Đông' },
  { id: 2, patientCode: 'BN2099', fullName: 'Trần Thị Hoa', gender: 'Nữ', dob: '15/04/1985', cccd: '034300876543', address: 'Ngọc Hồi, Thanh Trì' },
  { id: 3, patientCode: 'BN2100', fullName: 'Phạm Văn Minh', gender: 'Nam', dob: '22/09/1990', cccd: '034300765432', address: 'Kim Giang, Thanh Xuân' },
  { id: 4, patientCode: 'BN2101', fullName: 'Lê Thị Hương', gender: 'Nữ', dob: '05/03/1978', cccd: '034300654321', address: 'Phúc La, Hà Đông' },
  { id: 5, patientCode: 'BN2102', fullName: 'Hoàng Văn Dũng', gender: 'Nam', dob: '18/06/1988', cccd: '034300543210', address: 'Hạ Đình, Thanh Xuân' },
  { id: 6, patientCode: 'BN2103', fullName: 'Vũ Thị Lan', gender: 'Nữ', dob: '12/11/1992', cccd: '034300432109', address: 'Nhân Chính, Thanh Xuân' },
  { id: 7, patientCode: 'BN2104', fullName: 'Đặng Văn Khánh', gender: 'Nam', dob: '30/01/1983', cccd: '034300321098', address: 'Cầu Giấy, Hà Nội' },
  { id: 8, patientCode: 'BN2105', fullName: 'Nguyễn Thị Mai', gender: 'Nữ', dob: '07/07/1986', cccd: '034300210987', address: 'Hoàng Mai, Hà Nội' },
  { id: 9, patientCode: 'BN2106', fullName: 'Bùi Văn Thắng', gender: 'Nam', dob: '19/02/1985', cccd: '034300109876', address: 'Đống Đa, Hà Nội' },
  ]);

  const [filteredPatients, setFilteredPatients] = useState(patients); // Danh sách sau khi tìm kiếm

  // Thay đổi bộ lọc
  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  // Tìm kiếm
  const handleSearch = () => {
    const { searchPatient } = filters;
    let filteredList = patients;

    if (searchPatient) {
      filteredList = patients.filter((item) =>
        item.fullName.toLowerCase().includes(searchPatient.toLowerCase())
      );
    }

    setFilteredPatients(filteredList);
    setCurrentPage(1); // Reset về trang đầu tiên
  };

  // Xóa bệnh nhân
  const handleDelete = (id) => {
    if (window.confirm('Bạn muốn xóa bản ghi này không?')) {
      setFilteredPatients(filteredPatients.filter((patient) => patient.id !== id));
    }
  };

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

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
      <div className={styles.filterSection}>
        <div className={styles.filterName}>
          <label>Tìm kiếm BN</label>
          <input
           type="text"
           name="searchPatient"
           placeholder="Nhập tên bệnh nhân"
           value={filters.searchPatient}
           onChange={(e) => handleFilterChange('searchPatient', e.target.value)}
           className={styles.filterInput}
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
            <th>Giới tính</th>
            <th>Ngày sinh</th>
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
                <td>{patient.patientCode}</td>
                <td>{patient.fullName}</td>
                <td>{patient.gender}</td>
                <td>{patient.dob}</td>
                <td>
                  <button
                    className={styles.detailButton}
                    onClick={() => alert(`Xem chi tiết ${patient.patientCode}`)}
                  >
                    Xem
                  </button>
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => alert(`Sửa ${patient.patientCode}`)}
                  >
                    <FaPencilAlt />
                  </button>
                  {/* <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(patient.id)}
                  >
                    <FaTrash />
                  </button> */}
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

export default PatientList;

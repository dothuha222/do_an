
import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import styles from '../../css/ReceptionManage/PatientList.module.css';
// import { getAllUsers, getUserById, updateUser, deleteUser } from '../Services/NguoiDungService';
import { getAllBenhNhan } from '../Services/NguoiDungService';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [filters, setFilters] = useState({ searchPatient: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllBenhNhan();
        console.log(response.data);
        const data = response.data.map((item, index) => ({
          stt: index + 1,
          patientCode: `BN${String(item.nguoi_dung_id).padStart(4, '0')}`,
          fullName: item.ten,
          gender: item.gioi_tinh,
          birthDate: formatDate(item.ns),
          id: item.nguoi_dung_id,
        }));
        console.log(data)
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bệnh nhân:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSearch = () => {
    const { searchPatient } = filters;

    if (!searchPatient.trim()) {
      setFilteredPatients(patients); // Hiển thị toàn bộ nếu ô tìm kiếm trống
      return;
    }

    const filteredList = patients.filter((item) =>
      item.fullName.toLowerCase().includes(searchPatient.toLowerCase())
    );

    // if (searchPatient) {
    //   filteredList = patients.filter((item) =>
    //     item.fullName.toLowerCase().includes(searchPatient.toLowerCase())
    //   );
    // }

    setFilteredPatients(filteredList);
    setCurrentPage(1);
  };

  // const handleDetail = async (id) => {
  //   try {
  //     const response = await getUserById(id);
  //     alert(`Chi tiết người dùng: ${JSON.stringify(response.data, null, 2)}`);
  //   } catch (error) {
  //     console.error('Lỗi khi lấy chi tiết người dùng:', error);
  //   }
  // };

  // const handleEdit = async (id) => {
  //   try {
  //     await updateUser(id, { /* dữ liệu sửa đổi */ });
  //     alert('Cập nhật thành công!');
  //   } catch (error) {
  //     console.error('Lỗi khi cập nhật người dùng:', error);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   if (window.confirm('Bạn có chắc chắn muốn xóa không?')) {
  //     try {
  //       await deleteUser(id);
  //       setFilteredPatients(filteredPatients.filter((patient) => patient.id !== id));
  //       alert('Xóa thành công!');
  //     } catch (error) {
  //       console.error('Lỗi khi xóa người dùng:', error);
  //     }
  //   }
  // };

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
            currentItems.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.stt}</td>
                <td>{patient.patientCode}</td>
                <td>{patient.fullName}</td>
                <td>{patient.gender}</td>
                <td>{patient.birthDate}</td>
                <td>
                  {/* <Link to={`/view-patient-register/${item.id}`} state={{ benhNhanId: id }}>Xem</Link> */}
                  <Link to={`/view-patient-register/${patient.id}`}>Xem</Link>
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    // onClick={() => handleEdit(patient.id)}
                  >
                    <FaPencilAlt />
                  </button>
                 
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>

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

import React, { useState,useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import styles from '../../css/User/ScheduleList.module.css';
import { getLichSuBA } from '../Services/BacSiService';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';



const ViewHistory = () => {
  const {id} = useParams();
  const [filters, setFilters] = useState({
    fromDate: null, 
    toDate: null,
  });

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  const [lichSu, setLichSu] = useState([
  ]);
  const [originalReceptionList, setOriginalReceptionList] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

 useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getLichSuBA(id);
        console.log(response.data)
        const data = response.data.map((item, index) => ({
          stt: index + 1,
          healthCode: `BA${String(item.benh_an_id).padStart(4, '0')}`,
          ngayKham: formatDate(item.don_tiep_nhan.thoiGian),
          doctor: item.bac_si.ten,
          benh_an_id: item.benh_an_id
        }));
        setLichSu(data);
        setOriginalReceptionList(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bệnh nhân:', error);
      }
    };

    fetchPatients();
  }, [id]);

console.log(lichSu)
  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

 
  const handleSearch = () => {
    const { fromDate, toDate } = filters;
    let filteredList = [...originalReceptionList];
  
    if (fromDate && !toDate) {
      filteredList = filteredList.filter(
        (item) => new Date(convertToISO(item.ngayKham)) >= new Date(fromDate)
      );
    } else if (!fromDate && toDate) {
      alert('Chưa chọn ngày bắt đầu');
      return;
    } else if (fromDate && toDate) {
      filteredList = filteredList.filter(
        (item) =>
          new Date(convertToISO(item.ngayKham)) >= new Date(fromDate) &&
          new Date(convertToISO(item.ngayKham)) <= new Date(toDate)
      );
    }
    setLichSu(filteredList);;
    setCurrentPage(1);
  };

  function convertToISO(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }
  
  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lichSu.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(lichSu.length / itemsPerPage);

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
        <button className={styles.searchButton} onClick={handleSearch}>
          <i className="fa fa-search" /> Tìm kiếm
        </button>
      </div>

      {/* Phần 2: Bảng danh sách */}
      <table className={styles.listTable}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã bệnh án</th>
            <th>Ngày tiếp nhận</th>
            <th>Bác sĩ khám</th>
            <th>Chi tiết bệnh án</th>
            <th>Đơn thuốc</th>
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
                <td>{item.healthCode}</td>
                <td>{item.ngayKham}</td>
                <td>{item.doctor}</td>
                <td>
                   <Link to={`/view-history-ba/${item.benh_an_id}`} state={{ benhNhanId: id }}>Xem</Link>
                </td>
                <td>
                  <button
                    className={styles.detailButton}
                    onClick={() => alert(`Sửa ${item.receptionCode}`)}
                  >
                    Xem
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

export default ViewHistory;

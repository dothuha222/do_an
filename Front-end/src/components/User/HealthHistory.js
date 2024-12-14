import React, { useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import styles from '../../css/User/ScheduleList.module.css';

const HealthHistory = () => {
  const [filters, setFilters] = useState({
    fromDate: null, // Thay đổi từ chuỗi sang giá trị null (dùng cho DatePicker)
    toDate: null,
  });

  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

  const [receptionList, setReceptionList] = useState([
    // Dữ liệu giả lập như ban đầu
    {
      id: 1,
      receptionCode: 'RN001',
      appointTime: '14-12-2024',
      room: '--',
      status: 'Chờ xác nhận',
    },
    {
        id: 2,
        receptionCode: 'RN002',
        appointTime: '14-12-2024',
        room: '101A',
        status: 'Đã xác nhận',
    },
    {
        id: 3,
        receptionCode: 'RN003',
        appointTime: '14-12-2024',
        room: '--',
        status: 'Từ chối',
    },
    {
        id: 4,
        receptionCode: 'RN004',
        appointTime: '14-12-2024',
        room: '101A',
        status: 'Đã xác nhận',
    },
    // Thêm dữ liệu khác...
  ]);

  // Đổi định dạng ngày tháng thành dd/MM/yyyy
//   const formatDate = (date) => {
//     if (!date) return '';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSearch = () => {
    const { fromDate, toDate} = filters;
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
        <button className={styles.searchButton} onClick={handleSearch}>
          <i className="fa fa-search" /> Tìm kiếm
        </button>
      </div>

      {/* Phần 2: Bảng danh sách */}
      <table className={styles.listTable}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã đơn tiếp nhận</th>
            <th>Ngày hẹn khám</th>
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
                <td>{item.receptionCode}</td>
                <td>{item.appointTime}</td>
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
                      item.status === 'Chờ xác nhận'
                        ? 'blue'
                        : item.status === 'Đã xác nhận'
                        ? 'green'
                        : 'red',
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

export default HealthHistory;


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

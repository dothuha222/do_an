
import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import styles from '../../css/ReceptionManage/ReceptionList.module.css';
import { useNavigate } from 'react-router-dom';
import { getAllDon } from '../Services/BacSiService';
import { Link } from 'react-router-dom';

const KhamBenhList = () => {
  const navigator = useNavigate();
  const [filters, setFilters] = useState({
    fromDate: null, 
    toDate: null,
    searchPatient: '',
  });

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 
  const [receptionList, setReceptionList] = useState([])

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllDon();
        console.log(response.data)
        const data = response.data.map((item, index) => ({
          stt: index + 1,
          patientCode: `BN${String(item.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
          patientName: item.benh_nhan.ten,
          receptionCode: `TN${String(item.don_tiep_nhan_id).padStart(4, '0')}`,
          receptionTime: formatDate(item.thoiGian),
          room: item.phong_kham.ten,
          status: item.trang_thai_don.ten,
          receptionId: item.don_tiep_nhan_id
        }));
        setReceptionList(data);
        // setFilteredPatients(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bệnh nhân:', error);
      }
    };

    fetchPatients();
  }, []);

  console.log(receptionList)


  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  // const handleSearch = () => {
  //   const { fromDate, toDate, searchPatient } = filters;
  //   let filteredList = [...receptionList];

  //   if (fromDate && !toDate) {
  //     filteredList = filteredList.filter(
  //       (item) => new Date(item.receptionTime) >= fromDate
  //     );
  //   } else if (!fromDate && toDate) {
  //     alert('Chưa chọn ngày bắt đầu');
  //     return;
  //   } else if (fromDate && toDate) {
  //     filteredList = filteredList.filter(
  //       (item) =>
  //         new Date(item.receptionTime) >= fromDate &&
  //         new Date(item.receptionTime) <= toDate
  //     );
  //   }

  //   if (searchPatient) {
  //     filteredList = filteredList.filter((item) =>
  //       item.patientName.toLowerCase().includes(searchPatient.toLowerCase())
  //     );
  //   }

  //   setReceptionList(filteredList);
  //   setCurrentPage(1); 
  // };

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

  // const handleViewDetail = (id) => {
  //   navigator(`/view-don/${id}`); 
  // };

  return (
    <div className={styles.receptionList}>
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
        <button className={styles.searchButton} 
        // onClick={handleSearch}
        >
          <i className="fa fa-search" /> Tìm kiếm
        </button>
      </div>

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
                <td>{item.receptionTime}</td>
                <td>{item.room}</td>
                <td>
                  <Link to={`/view-don/${item.receptionId}`}>Xem</Link>
                </td>
                
                <td
                  style={{
                    color:
                    '#ff5200'
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

export default KhamBenhList;


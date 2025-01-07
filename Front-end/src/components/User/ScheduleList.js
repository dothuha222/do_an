

import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import styles from '../../css/ReceptionManage/ReceptionList.module.css';
import { useNavigate } from 'react-router-dom';
import {getDon, getDonDuyet, getDonTuChoi}  from '../Services/NguoiDungService'
import { Link } from 'react-router-dom';

const ScheduleList = () => {
  const navigator = useNavigate();
  const [filters, setFilters] = useState({
    fromDate: null, 
    toDate: null,
  });

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 
  const [receptionList, setReceptionList] = useState([])
  const [originalReceptionList, setOriginalReceptionList] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const [responseDon, responseDonDuyet, responseDonTuChoi] = await Promise.all([
          getDon(),
          getDonDuyet(),
          getDonTuChoi(),
        ]);

        console.log(responseDonDuyet.data);
  
        const combinedData = [
          ...responseDon.data.map((item, index) => ({
            stt: index + 1,
            patientCode: `BN${String(item.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
            patientName: item.benh_nhan.ten,
            receptionCode: `TN${String(item.don_tiep_nhan_id).padStart(4, '0')}`,
            receptionTime: formatDate(item.thoiGian),
            status: item.trang_thai_don.ten,
            receptionId: item.don_tiep_nhan_id,
          })),
          ...responseDonDuyet.data.map((item, index) => ({
            stt: responseDon.data.length + index + 1, // Tiếp tục đánh số
            patientCode: `BN${String(item.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
            patientName: item.benh_nhan.ten,
            receptionCode: `TN${String(item.don_tiep_nhan_id).padStart(4, '0')}`,
            receptionTime: formatDate(item.thoiGian),
            status: item.trang_thai_don.ten,
            receptionId: item.don_tiep_nhan_id,
            phongKham: item.phong_kham.ten
          })),
          ...responseDonTuChoi.data.map((item, index) => ({
            stt: responseDon.data.length + responseDonDuyet.data.length + index + 1, // Tiếp tục đánh số
            patientCode: `BN${String(item.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
            patientName: item.benh_nhan.ten,
            receptionCode: `TN${String(item.don_tiep_nhan_id).padStart(4, '0')}`,
            receptionTime: formatDate(item.thoiGian),
            status: item.trang_thai_don.ten,
            receptionId: item.don_tiep_nhan_id,
          })),
        ];
  
        setReceptionList(combinedData);
        setOriginalReceptionList(combinedData);
        console.log(combinedData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bệnh nhân:", error);
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

 
  const handleSearch = () => {
    const { fromDate, toDate } = filters;
    let filteredList = [...originalReceptionList];
  
    if (fromDate && !toDate) {
      filteredList = filteredList.filter(
        (item) => new Date(convertToISO(item.receptionTime)) >= new Date(fromDate)
      );
    } else if (!fromDate && toDate) {
      alert('Chưa chọn ngày bắt đầu');
      return;
    } else if (fromDate && toDate) {
      filteredList = filteredList.filter(
        (item) =>
          new Date(convertToISO(item.receptionTime)) >= new Date(fromDate) &&
          new Date(convertToISO(item.receptionTime)) <= new Date(toDate)
      );
    }
  
    setReceptionList(filteredList);
    setCurrentPage(1);
  };
  
  function convertToISO(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }
  
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
        <button className={styles.searchButton} 
        onClick={handleSearch}
        >
          <i className="fa fa-search" /> Tìm kiếm
        </button>
      </div>

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
                <td>{item.receptionTime}</td>
                <td>{item.phongKham}</td>
                <td>
                  <Link to={`/lich-hen/${item.receptionId}`}>Xem</Link>
                </td>
               
                <td>
                {item.status === "Chờ duyệt" ? (
                  <>
                    <button
                      className={styles.editButton}
                      // onClick={}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className={styles.deleteButton}
                      // onClick={}
                    >
                      <FaTrash />
                    </button>
                  </>
                ) : (
                  <span></span>
                )}
                </td>
                <td
                  style={{
                    color: 
                      item.status === "Chờ duyệt" ? "blue" :
                      item.status === "Đã duyệt" ? "green" :
                      item.status === "Từ chối" ? "red" :
                      "black" // Mặc định nếu không khớp với các giá trị trên
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

export default ScheduleList;




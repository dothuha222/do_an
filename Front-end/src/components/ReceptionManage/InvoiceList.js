
import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import styles from '../../css/ReceptionManage/ReceptionList.module.css';
import {listReception} from '../Services/ReceptionService'
import { Navigate, useNavigate } from 'react-router-dom';
import {updateReception, deleteReception} from '../Services/ReceptionService'

const InvoiceList = () => {
  const navigator = useNavigate();
  const [filters, setFilters] = useState({
    searchPatient: '',
  });

  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

  const [receptionList, setReceptionList] = useState([
    // Dữ liệu giả lập như ban đầu
    {
      id: 1,
      invoiceCode: 'HD097',
      patientName: 'Vũ Thị Lan',
      birthDate: '15/03/1980',
      gender: 'Nam',
      tongTien: '2.000.000',
      status: 'Chưa thanh toán'
    },
    {
      id: 2,
      invoiceCode: 'HD098',
      patientName: 'Trần Thị Bình',
      birthDate: '01/02/1986',
      gender: 'Nữ',
      tongTien: '1.250.000',
      status: 'Đã thanh toán'
    },
    {
      id: 3,
      invoiceCode: 'HD099',
      patientName: 'Lê Thị Cúc',
      birthDate: '10/07/1990',
      gender: 'Nữ',
      tongTien: '800.000',
      status: 'Chưa thanh toán'
    },
    {
      id: 4,
      invoiceCode: 'HD100',
      patientName: 'Phạm Văn Dũng',
      birthDate: '22/11/1975',
      gender: 'Nam',
      tongTien: '1.500.000',
      status: 'Đã thanh toán'
    },
    {
      id: 5,
      invoiceCode: 'HD101',
      patientName: 'Hoàng Thị Hoa',
      birthDate: '05/06/1982',
      gender: 'Nữ',
      tongTien: '2.300.000',
      status: 'Đã thanh toán'
    },

  ]);

// 
const handleViewDetail = () => {
    navigator('/invoice-form');
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSearch = () => {
    const { searchPatient } = filters;
    let filteredList = [...receptionList];


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


  const viewDetail = (id) => {
    navigator(`/invoice-form/${id}`)
  }
  const editDetail = (id) => {
    navigator(`/edit-invoice-form/${id}`)
  }
  

  return (
    <div className={styles.receptionList}>
      {/* Phần 1: Bộ lọc */}
      <div className={styles.filterSection}>
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
            <th>Mã hóa đơn</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Tổng thanh toán</th>
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
                <td>{item.invoiceCode}</td>
                <td>{item.patientName}</td>
                <td>{item.birthDate}</td>
                <td>{item.gender}</td>
                <td>{item.tongTien}</td>
                <td>
                  <button
                    className={styles.detailButton}
                    onClick={() => handleViewDetail()}
                  >
                    Xem
                  </button>
                </td>
                <td
                  style={{
                    color:
                      item.status === 'Chưa thanh toán'
                        ? 'blue'
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

export default InvoiceList;


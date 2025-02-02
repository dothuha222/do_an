
import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import styles from '../../css/ReceptionManage/ReceptionList.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import {getInvoiceByCCCD} from '../Services/LeTanService'
import { Link } from 'react-router-dom';

const InvoiceList = () => {
  const navigator = useNavigate();
  const [filters, setFilters] = useState({
    searchPatient: '',
  });

  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 5; // Số lượng bản ghi mỗi trang
  // const [invoiceList, setInvoiceList] = useState([]);

  const [receptionList, setReceptionList] = useState([
    // Dữ liệu giả lập như ban đầu
    // {
    //   id: 1,
    //   invoiceCode: 'HD097',
    //   patientName: 'Vũ Thị Lan',
    //   birthDate: '15/03/1980',
    //   gender: 'Nam',
    //   tongTien: '2.000.000',
    //   status: 'Chưa thanh toán'
    // },

  ]);

  const [data, setData] = useState({
    cccd: '123456789012'
  })


  useEffect(() => {
    const fetchInvoiceList = async () => {
      try {
        const response = await getInvoiceByCCCD(data);
        console.log(response.data)
        const test = response.data.map((item, index) => ({
          stt: index + 1,
          invoiceCode: `HD${String(item.hoa_don_id).padStart(4, '0')}`,
          patientName: item.don_thuoc.benh_an.don_tiep_nhan.benh_nhan.ten,
          birthDate: formatDate(item.don_thuoc.benh_an.don_tiep_nhan.benh_nhan.ns),
          gender: item.don_thuoc.benh_an.don_tiep_nhan.benh_nhan.gioi_tinh,
          tongTien: item.tong_tien - item.giam_gia,
          status: item.trang_thai_hd.ten,
          idHD:item.hoa_don_id
        }));
        console.log(test);
        setReceptionList(test);  // Gán danh sách hóa đơn vào state
      } catch (error) {
        console.error('Lỗi khi lấy danh sách hóa đơn:', error);
      }
    };

    // Gọi hàm lấy hóa đơn khi component render
    fetchInvoiceList();
  }, []); 

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
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
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
                  
                    <Link to={`/invoice-form/${item.idHD}`}>Xem</Link>
                
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


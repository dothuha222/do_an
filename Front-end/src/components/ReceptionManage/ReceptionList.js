
import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import styles from '../../css/ReceptionManage/ReceptionList.module.css';
import {listReception} from '../Services/ReceptionService'
import { useNavigate } from 'react-router-dom';
import {updateReception, deleteReception} from '../Services/ReceptionService'

const ReceptionList = () => {
  const navigator = useNavigate();
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
      patientCode: 'BN2100',
      patientName: 'Nguyễn Văn Minh',
      receptionCode: 'RN310',
      receptionTime: '25/12/2024',
      room: '102B',
      status: 'Đợi khám',
    },
    {
        id: 2,
        patientCode: 'BN1112',
        patientName: 'Trần Thanh Bình',
        receptionCode: 'RN297',
        receptionTime: '25/12/2024',
        room: '102B',
        status: 'Đợi khám',
      },
      {
        id: 3,
        patientCode: 'BN1002',
        patientName: 'Phạm Thu Trà',
        receptionCode: 'RN288',
        receptionTime: '25/12/2024',
        room: '102B',
        status: 'Đợi khám',
      },
      {
        id: 4,
        patientCode: 'BN0815',
        patientName: 'Nguyễn Trung Quân',
        receptionCode: 'RN287',
        receptionTime: '25/12/2024',
        room: '102B',
        status: 'Đợi khám',
      },
      {
        id: 5,
        patientCode: 'BN1012',
        patientName: 'Trần Ngọc Lan',
        receptionCode: 'RN266',
        receptionTime: '24/12/2024',
        room: '102B',
        status: 'Đợi khám',
      },

  ]);

  // const [receptionList, setReceptionList] = useState([])
  // const getAllReception = () => {
  //   listReception().then((response) => {
  //     setReceptionList(response.data)
  //   }).catch((error) => {
  //     console.error(error);
  //   })
  // }
  // useEffect(() => {
  //   getAllReception();
  // }, [])
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


  const viewDetail = (id) => {
    navigator(`/reception-form/${id}`)
  }
  const editDetail = (id) => {
    navigator(`/edit-reception-form/${id}`)
  }
  
  // const removeReception = (id) => {
  //   console.log(id)
  //   deleteReception(id).then((res) =>{
  //     getAllReception();
  //   }).catch(err => {
  //     console.error(err)
  //   })
  // }

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
            {/* <th>Hành động</th> */}
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
                  <button
                    className={styles.detailButton}
                    onClick={(viewDetail(item.patientCode))}
                  >
                    Xem
                  </button>
                </td>
                
                  {/* <button
                    className={styles.editButton}
                    onClick={() => editDetail(item.patientCode)}
                  >
                    <FaPencilAlt />
                  </button> */}
                   {/* <button
                    className={styles.deleteButton}  
                    onClick={() =>
                      window.confirm('Bạn muốn xóa bản ghi này không?') &&
                    removeReception(item.patientCode)
                    }
                  >
                    <FaTrash />
                  </button>  */}
                
                <td
                  style={{
                    color:
                      item.status === 'Chờ duyệt'
                        ? 'blue'
                        : item.status === 'Đợi khám'
                        ? '#ff5200'
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


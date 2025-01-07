

import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import styles from '../../css/ReceptionManage/ReceptionList.module.css';
import { useNavigate } from 'react-router-dom';
import { getDonById, getDonCD, getDonDK, getDonDKED, capNhatDTN} from '../Services/LeTanService';
import { Link } from 'react-router-dom';

const ReceptionList = () => {
  const navigator = useNavigate();
  const [filters, setFilters] = useState({
    fromDate: null, 
    toDate: null,
    searchPatient: '',
  });

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 
  const [receptionList, setReceptionList] = useState([])
  const [originalReceptionList, setOriginalReceptionList] = useState([]);

  useEffect(() => {
      const fetchPatients = async () => {
        try {
          const [responseDoiKham, responseChoDuyet, responseDangKham, responseDaKham] = await Promise.all([
            getDonById(),
            getDonCD(),
            getDonDK(),
            getDonDKED(),
          ]);
  
          console.log(responseDoiKham.data);
          console.log(responseChoDuyet.data);
    
          const combinedData = [
            ...responseDoiKham.data.map((item, index) => ({
              stt: index + 1,
              patientCode: `BN${String(item.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
              patientName: item.benh_nhan.ten,
              receptionCode: `TN${String(item.don_tiep_nhan_id).padStart(4, '0')}`,
              receptionTime: formatDate(item.thoiGian),
              status: item.trang_thai_don.ten,
              receptionId: item.don_tiep_nhan_id,
              phongKham: item.phong_kham.ten
            })),
            ...responseChoDuyet.data.map((item, index) => ({
              stt: responseDoiKham.data.length + index + 1, // Tiếp tục đánh số
              patientCode: `BN${String(item.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
              patientName: item.benh_nhan.ten,
              receptionCode: `TN${String(item.don_tiep_nhan_id).padStart(4, '0')}`,
              receptionTime: formatDate(item.thoiGian),
              status: item.trang_thai_don.ten,
              receptionId: item.don_tiep_nhan_id,
              
            })),
            ...responseDangKham.data.map((item, index) => ({
              stt: responseChoDuyet.data.length + responseDoiKham.data.length + index + 1, // Tiếp tục đánh số
              patientCode: `BN${String(item.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
              patientName: item.benh_nhan.ten,
              receptionCode: `TN${String(item.don_tiep_nhan_id).padStart(4, '0')}`,
              receptionTime: formatDate(item.thoiGian),
              status: item.trang_thai_don.ten,
              receptionId: item.don_tiep_nhan_id,
              phongKham: item.phong_kham.ten
            })),
            ...responseDaKham.data.map((item, index) => ({
              stt: responseChoDuyet.data.length + responseDoiKham.data.length + responseDangKham.data.length + index + 1, // Tiếp tục đánh số
              patientCode: `BN${String(item.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
              patientName: item.benh_nhan.ten,
              receptionCode: `TN${String(item.don_tiep_nhan_id).padStart(4, '0')}`,
              receptionTime: formatDate(item.thoiGian),
              status: item.trang_thai_don.ten,
              receptionId: item.don_tiep_nhan_id,
              phongKham: item.phong_kham.ten
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
    const { fromDate, toDate, searchPatient } = filters;
  
    // Bắt đầu từ danh sách gốc để luôn lọc từ dữ liệu ban đầu
    let filteredList = [...originalReceptionList];
  
    // Lọc theo khoảng ngày
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
  
    // Lọc theo tên bệnh nhân
    if (searchPatient && searchPatient.trim() !== "") {
      filteredList = filteredList.filter((item) =>
        item.patientName.toLowerCase().includes(searchPatient.toLowerCase().trim())
      );
    }
  
    // Cập nhật danh sách hiển thị
    setReceptionList(filteredList);
    setCurrentPage(1);
  };

  function convertToISO(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }
  const handleEdit = (id) => {
    navigator(`/edit-don/${id}`)
  };
  
  const handleDelete = (id) => {
    const payload = { 
     trang_thai_don_id: 6
   }
   console.log(payload);
   capNhatDTN(id,payload)
   .then(response => {
     alert('Xóa thành công!');
     navigator('/reception-list')
     console.log(response.data);
     window.location.reload();
   })
   .catch(error => {
     console.error("Lỗi khi cập nhật đơn tiếp nhận:", error);
     throw error;
   });
  };

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
        onClick={handleSearch}
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
                <td>{item.receptionTime}</td>
                <td>{item.phongKham}</td>
                <td>
                  {["Đợi khám", "Đang khám", "Đã khám"].includes(item.status) ? (
                    <Link to={`/don-tiep-nhan/${item.receptionId}`}>Xem</Link>
                  ) : item.status === "Chờ duyệt" ? (
                    <Link to={`/duyet-kham/${item.receptionId}`}>Xem</Link>
                  ) : (
                    <span></span>
                  )}
                </td>
                {/* <td> */}
                  {/* <Link to={`/don-tiep-nhan/${item.receptionId}`}>Xem</Link> */}
                  {/* <Link to={`/duyet-kham/${item.receptionId}`}>Xem</Link> */}
                {/* </td> */}
                <td>
                {item.status === "Đợi khám" ? (
                  <>
                    <button
                      className={styles.editButton}
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(item.receptionId);
                      }}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className={styles.deleteButton}
                      // onClick={handleDelete(item.receptionId)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(item.receptionId);
                      }}
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



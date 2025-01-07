// import React, { useState } from 'react';
// import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
// import DatePicker from 'react-datepicker'; // Import DatePicker
// import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
// import styles from '../../css/User/ScheduleList.module.css';

// const HealthHistory = () => {
//   const [filters, setFilters] = useState({
//     fromDate: null, // Thay đổi từ chuỗi sang giá trị null (dùng cho DatePicker)
//     toDate: null,
//   });

//   const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
//   const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

//   const [receptionList, setReceptionList] = useState([
//     // Dữ liệu giả lập như ban đầu
//     {
//       id: 1,
//       healthCode: 'KB180',
//       ngayKham: '14/01/2024',
//       doctor: 'Trần Văn Mạnh',
//     },
//     {
//         id: 2,
//         healthCode: 'KB131',
//         ngayKham: '01/11/2022',
//         doctor: 'Phạm Minh Phương',
//     },
//     {
//         id: 3,
//         healthCode: 'KB075',
//         ngayKham: '21/01/2022',
//         doctor: 'Nguyễn Thị Bích',
//     },
//     {
//         id: 4,
//         healthCode: 'KB002',
//         ngayKham: '12/04/2021',
//         doctor: 'Nguyễn Tiến Minh',
//     },
//     // Thêm dữ liệu khác...
//   ]);


//   const handleFilterChange = (field, value) => {
//     setFilters({ ...filters, [field]: value });
//   };

//   const handleSearch = () => {
//     const { fromDate, toDate} = filters;
//     let filteredList = [...receptionList];

//     if (fromDate && !toDate) {
//       filteredList = filteredList.filter(
//         (item) => new Date(item.receptionTime) >= fromDate
//       );
//     } else if (!fromDate && toDate) {
//       alert('Chưa chọn ngày bắt đầu');
//       return;
//     } else if (fromDate && toDate) {
//       filteredList = filteredList.filter(
//         (item) =>
//           new Date(item.receptionTime) >= fromDate &&
//           new Date(item.receptionTime) <= toDate
//       );
//     }
//     setReceptionList(filteredList);
//     setCurrentPage(1); // Reset về trang đầu tiên
//   };

//   // Phân trang
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = receptionList.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(receptionList.length / itemsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className={styles.receptionList}>
//       {/* Phần 1: Bộ lọc */}
//       <div className={styles.filterSection}>
//         <div>
//           <label>Từ ngày</label>
//           <DatePicker
//             selected={filters.fromDate}
//             onChange={(date) => handleFilterChange('fromDate', date)}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="dd/mm/yyyy"
//             className={styles.filterDate}
//           />
//         </div>
//         <div>
//           <label>Đến ngày</label>
//           <DatePicker
//             selected={filters.toDate}
//             onChange={(date) => handleFilterChange('toDate', date)}
//             dateFormat="dd/MM/yyyy"
//             placeholderText="dd/mm/yyyy"
//             className={styles.filterDate}
//           />
//         </div>
//         <button className={styles.searchButton} onClick={handleSearch}>
//           <i className="fa fa-search" /> Tìm kiếm
//         </button>
//       </div>

//       {/* Phần 2: Bảng danh sách */}
//       <table className={styles.listTable}>
//         <thead>
//           <tr>
//             <th>STT</th>
//             <th>Mã bệnh án</th>
//             <th>Ngày khám bệnh</th>
//             <th>Bác sĩ khám</th>
//             <th>Chi tiết bệnh án</th>
//             <th>Đơn thuốc</th>
//             <th>Hóa đơn</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.length > 0 ? (
//             currentItems.map((item, index) => (
//               <tr
//                 key={item.id}
//                 style={{
//                   backgroundColor:
//                     (indexOfFirstItem + index + 1) % 2 === 0 ? '#e7e7e7' : '#fff',
//                 }}
//               >
//                 <td>{indexOfFirstItem + index + 1}</td>
//                 <td>{item.healthCode}</td>
//                 <td>{item.ngayKham}</td>
//                 <td>{item.doctor}</td>
//                 <td>
//                   <button
//                     className={styles.detailButton}
//                     onClick={() => alert(`Xem chi tiết ${item.receptionCode}`)}
//                   >
//                     Xem
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className={styles.detailButton}
//                     onClick={() => alert(`Sửa ${item.receptionCode}`)}
//                   >
//                     Xem
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className={styles.detailButton}
//                     onClick={() => alert(`Sửa ${item.receptionCode}`)}
//                   >
//                     Xem
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9">Không có dữ liệu</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Phần 3: Phân trang */}
//       <div className={styles.pagination}>
//         <button onClick={handlePrevPage} disabled={currentPage === 1}>
//           &lt;
//         </button>
//         <span>
//           Trang {currentPage} / {totalPages}
//         </span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HealthHistory;
import React, { useState,useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import thêm icon bút chì
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import styles from '../../css/User/ScheduleList.module.css';
import { getLichSuBA } from '../Services/BacSiService';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';



const HealthHistory = ({userId}) => {
  const [filters, setFilters] = useState({
    fromDate: null, 
    toDate: null,
  });

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 

  const [lichSu, setLichSu] = useState([
  ]);

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
        const response = await getLichSuBA(userId);
        console.log(response.data)
        const data = response.data.map((item, index) => ({
          stt: index + 1,
          healthCode: `BA${String(item.benh_an_id).padStart(4, '0')}`,
          ngayKham: formatDate(item.don_tiep_nhan.thoiGian),
          doctor: item.bac_si.ten,
          benh_an_id: item.benh_an_id
        }));
        setLichSu(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bệnh nhân:', error);
      }
    };

    fetchPatients();
  }, [userId]);

console.log(lichSu)
  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSearch = () => {
    const { fromDate, toDate} = filters;
    let filteredList = [...lichSu];

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
    setLichSu(filteredList);
    setCurrentPage(1); // Reset về trang đầu tiên
  };

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
            <th>Ngày khám bệnh</th>
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
                   <Link to={`/view-history-ba/${item.benh_an_id}`} state={{ benhNhanId: userId }}>Xem</Link>
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

export default HealthHistory;

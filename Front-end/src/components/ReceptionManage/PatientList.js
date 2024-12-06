// // // import React, { useState } from 'react';
// // // import '../../css/ReceptionManage/PatientList.css';

// // // const PatientList = () => {
// // //   const [searchText, setSearchText] = useState('');
// // //   const [patients, setPatients] = useState([
// // //     {
// // //       id: 'P001',
// // //       name: 'Nguyen Van A',
// // //       birthDate: '1980-05-15',
// // //       gender: 'Nam',
// // //       cccd: '123456789012',
// // //       address: 'Hà Nội',
// // //     },
// // //     {
// // //       id: 'P002',
// // //       name: 'Tran Thi B',
// // //       birthDate: '1990-10-20',
// // //       gender: 'Nữ',
// // //       cccd: '987654321098',
// // //       address: 'TP. Hồ Chí Minh',
// // //     },
// // //   ]);

// // //   const [filteredPatients, setFilteredPatients] = useState(patients);

// // //   const handleSearch = () => {
// // //     const filtered = patients.filter((patient) =>
// // //       patient.name.toLowerCase().includes(searchText.toLowerCase())
// // //     );
// // //     setFilteredPatients(filtered);
// // //   };

// // //   const handleDelete = (id) => {
// // //     const confirmDelete = window.confirm('Bạn muốn xóa bản ghi này không?');
// // //     if (confirmDelete) {
// // //       setFilteredPatients(filteredPatients.filter((patient) => patient.id !== id));
// // //     }
// // //   };

// // //   return (
// // //     <div className="patient-list">
// // //       <h2>Danh sách bệnh nhân</h2>

// // //       {/* Phần 1: Tìm kiếm */}
// // //       <div className="search-bar">
// // //         <input
// // //           type="text"
// // //           placeholder="Tìm kiếm BN"
// // //           value={searchText}
// // //           onChange={(e) => setSearchText(e.target.value)}
// // //         />
// // //         <button className="search-button" onClick={handleSearch}>
// // //           <i className="fas fa-search"></i> Tìm kiếm
// // //         </button>
// // //       </div>

// // //       {/* Phần 2: Bảng danh sách */}
// // //       <table className="list-table">
// // //         <thead>
// // //           <tr>
// // //             <th>STT</th>
// // //             <th>Mã bệnh nhân</th>
// // //             <th>Họ và tên</th>
// // //             <th>Giới tính</th>
// // //             <th>Ngày sinh</th>
// // //             <th>CCCD</th>
// // //             <th>Địa chỉ</th>
// // //             <th>Chi tiết</th>
// // //             <th>Hành động</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {filteredPatients.map((patient, index) => (
// // //             <tr key={patient.id}>
// // //               <td>{index + 1}</td>
// // //               <td>{patient.id}</td>
// // //               <td>{patient.name}</td>
// // //               <td>{patient.gender}</td>
// // //               <td>{patient.birthDate}</td>
// // //               <td>{patient.cccd}</td>
// // //               <td>{patient.address}</td>
// // //               <td>
// // //                 <button
// // //                   className="detail-button"
// // //                   onClick={() => alert(`Xem chi tiết bệnh nhân: ${patient.id}`)}
// // //                 >
// // //                   Xem
// // //                 </button>
// // //               </td>
// // //               <td>
// // //                 <i
// // //                   className="fas fa-edit edit-icon"
// // //                   onClick={() => alert(`Sửa thông tin bệnh nhân: ${patient.id}`)}
// // //                 ></i>
// // //                 <i
// // //                   className="fas fa-trash delete-icon"
// // //                   onClick={() => handleDelete(patient.id)}
// // //                 ></i>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // export default PatientList;

// // import React, { useState } from 'react';
// // import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import icon
// // import styles from '../../css/ReceptionManage/PatientList.module.css';

// // const PatientList = () => {
// //   const [filters, setFilters] = useState({
// //     searchPatient: '',
// //   });

// //   const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
// //   const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

// //   const [patientList, setPatientList] = useState([
// //     // Dữ liệu giả lập
// //     {
// //       id: 1,
// //       patientCode: 'BN001',
// //       fullName: 'Nguyen Van A',
// //       gender: 'Nam',
// //       dob: '1990-01-01',
// //       cccd: '123456789',
// //       address: 'Hà Nội',
// //     },
// //     {
// //       id: 2,
// //       patientCode: 'BN002',
// //       fullName: 'Tran Thi B',
// //       gender: 'Nữ',
// //       dob: '1995-02-02',
// //       cccd: '987654321',
// //       address: 'Hải Phòng',
// //     },
// //     {
// //       id: 1,
// //       patientCode: 'BN001',
// //       fullName: 'Nguyen Van A',
// //       gender: 'Nam',
// //       dob: '1990-01-01',
// //       cccd: '123456789',
// //       address: 'Hà Nội',
// //     },
// //     {
// //       id: 2,
// //       patientCode: 'BN002',
// //       fullName: 'Tran Thi B',
// //       gender: 'Nữ',
// //       dob: '1995-02-02',
// //       cccd: '987654321',
// //       address: 'Hải Phòng',
// //     },
// //     {
// //       id: 1,
// //       patientCode: 'BN001',
// //       fullName: 'Nguyen Van A',
// //       gender: 'Nam',
// //       dob: '1990-01-01',
// //       cccd: '123456789',
// //       address: 'Hà Nội',
// //     },
// //     {
// //       id: 2,
// //       patientCode: 'BN002',
// //       fullName: 'Tran Thi B',
// //       gender: 'Nữ',
// //       dob: '1995-02-02',
// //       cccd: '987654321',
// //       address: 'Hải Phòng',
// //     },
// //     {
// //       id: 1,
// //       patientCode: 'BN001',
// //       fullName: 'Nguyen Van A',
// //       gender: 'Nam',
// //       dob: '1990-01-01',
// //       cccd: '123456789',
// //       address: 'Hà Nội',
// //     },
// //     {
// //       id: 2,
// //       patientCode: 'BN002',
// //       fullName: 'Tran Thi B',
// //       gender: 'Nữ',
// //       dob: '1995-02-02',
// //       cccd: '987654321',
// //       address: 'Hải Phòng',
// //     },
// //     {
// //       id: 1,
// //       patientCode: 'BN001',
// //       fullName: 'Nguyen Van A',
// //       gender: 'Nam',
// //       dob: '1990-01-01',
// //       cccd: '123456789',
// //       address: 'Hà Nội',
// //     },
// //     {
// //       id: 2,
// //       patientCode: 'BN002',
// //       fullName: 'Tran Thi B',
// //       gender: 'Nữ',
// //       dob: '1995-02-02',
// //       cccd: '987654321',
// //       address: 'Hải Phòng',
// //     },
// //     // Thêm dữ liệu khác nếu cần
// //   ]);

// //   const handleFilterChange = (field, value) => {
// //     setFilters({ ...filters, [field]: value });
// //   };

// //   const handleSearch = () => {
// //     const { searchPatient } = filters;
// //     let filteredList = [...patientList];

// //     if (searchPatient) {
// //       filteredList = filteredList.filter((item) =>
// //         item.fullName.toLowerCase().includes(searchPatient.toLowerCase())
// //       );
// //     }

// //     setPatientList(filteredList);
// //     setCurrentPage(1); // Reset về trang đầu tiên
// //   };

// //   // Phân trang
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = patientList.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(patientList.length / itemsPerPage);

// //   const handleNextPage = () => {
// //     if (currentPage < totalPages) {
// //       setCurrentPage(currentPage + 1);
// //     }
// //   };

// //   const handlePrevPage = () => {
// //     if (currentPage > 1) {
// //       setCurrentPage(currentPage - 1);
// //     }
// //   };

// //   return (
// //     <div className={styles.patientList}>
// //       {/* Phần 1: Bộ lọc */}
// //       <div className={styles.filterSection}>
// //         <div className={styles.filterName}>
// //           <label>Tìm kiếm BN</label>
// //           <input
// //             type="text"
// //             name="searchPatient"
// //             placeholder="Nhập tên bệnh nhân"
// //             value={filters.searchPatient}
// //             onChange={(e) => handleFilterChange('searchPatient', e.target.value)}
// //             className={styles.filterDate}
// //           />
// //         </div>
// //         <button className={styles.searchButton} onClick={handleSearch}>
// //           <i className="fa fa-search" /> Tìm kiếm
// //         </button>
// //       </div>

// //       {/* Phần 2: Bảng danh sách */}
// //       <table className={styles.listTable}>
// //         <thead>
// //           <tr>
// //             <th>STT</th>
// //             <th>Mã bệnh nhân</th>
// //             <th>Họ và tên</th>
// //             <th>Giới tính</th>
// //             <th>Ngày sinh</th>
// //             <th>CCCD</th>
// //             <th>Địa chỉ</th>
// //             <th>Chi tiết</th>
// //             <th>Hành động</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {currentItems.length > 0 ? (
// //             currentItems.map((item, index) => (
// //               <tr
// //                 key={item.id}
// //                 style={{
// //                   backgroundColor:
// //                     (indexOfFirstItem + index + 1) % 2 === 0 ? '#e7e7e7' : '#fff',
// //                 }}
// //               >
// //                 <td>{indexOfFirstItem + index + 1}</td>
// //                 <td>{item.patientCode}</td>
// //                 <td>{item.fullName}</td>
// //                 <td>{item.gender}</td>
// //                 <td>{item.dob}</td>
// //                 <td>{item.cccd}</td>
// //                 <td>{item.address}</td>
// //                 <td>
// //                   <button
// //                     className={styles.detailButton}
// //                     onClick={() => alert(`Xem chi tiết ${item.patientCode}`)}
// //                   >
// //                     Xem
// //                   </button>
// //                 </td>
// //                 <td>
// //                   <button
// //                     className={styles.editButton}
// //                     onClick={() => alert(`Sửa ${item.patientCode}`)}
// //                   >
// //                     <FaPencilAlt />
// //                   </button>
// //                   <button
// //                     className={styles.deleteButton}
// //                     onClick={() =>
// //                       window.confirm('Bạn muốn xóa bản ghi này không?') &&
// //                       alert(`Đã xóa ${item.patientCode}`)
// //                     }
// //                   >
// //                     <FaTrash />
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="9">Không có dữ liệu</td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>

// //       {/* Phần 3: Phân trang */}
// //       <div className={styles.pagination}>
// //         <button onClick={handlePrevPage} disabled={currentPage === 1}>
// //           &lt;
// //         </button>
// //         <span>
// //           Trang {currentPage} / {totalPages}
// //         </span>
// //         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
// //           &gt;
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PatientList;

// import React, { useState } from 'react';
// import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import icons
// import styles from '../../css/ReceptionManage/PatientList.module.css';

// const PatientList = () => {
//   const [filters, setFilters] = useState({
//     searchPatient: '',
//   });

//   const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
//   const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

//   const [patients, setPatients] = useState([
//     // Dữ liệu giả lập
//     {
//       id: 1,
//       patientCode: 'BN001',
//       fullName: 'Nguyen Van A',
//       gender: 'Nam',
//       dob: '1990-01-01',
//       cccd: '123456789',
//       address: 'Hà Nội',
//     },
//     {
//       id: 2,
//       patientCode: 'BN002',
//       fullName: 'Tran Thi B',
//       gender: 'Nữ',
//       dob: '1995-02-02',
//       cccd: '987654321',
//       address: 'Hải Phòng',
//     },
//     {
//       id: 1,
//       patientCode: 'BN001',
//       fullName: 'Nguyen Van A',
//       gender: 'Nam',
//       dob: '1990-01-01',
//       cccd: '123456789',
//       address: 'Hà Nội',
//     },
//     {
//       id: 2,
//       patientCode: 'BN002',
//       fullName: 'Tran Thi B',
//       gender: 'Nữ',
//       dob: '1995-02-02',
//       cccd: '987654321',
//       address: 'Hải Phòng',
//     },
//     {
//       id: 1,
//       patientCode: 'BN001',
//       fullName: 'Nguyen Van A',
//       gender: 'Nam',
//       dob: '1990-01-01',
//       cccd: '123456789',
//       address: 'Hà Nội',
//     },
//     {
//       id: 2,
//       patientCode: 'BN002',
//       fullName: 'Tran Thi B',
//       gender: 'Nữ',
//       dob: '1995-02-02',
//       cccd: '987654321',
//       address: 'Hải Phòng',
//     },
//     {
//       id: 1,
//       patientCode: 'BN001',
//       fullName: 'Nguyen Van A',
//       gender: 'Nam',
//       dob: '1990-01-01',
//       cccd: '123456789',
//       address: 'Hà Nội',
//     },
//     {
//       id: 2,
//       patientCode: 'BN002',
//       fullName: 'Tran Thi B',
//       gender: 'Nữ',
//       dob: '1995-02-02',
//       cccd: '987654321',
//       address: 'Hải Phòng',
//     },
//     {
//       id: 1,
//       patientCode: 'BN001',
//       fullName: 'Nguyen Van A',
//       gender: 'Nam',
//       dob: '1990-01-01',
//       cccd: '123456789',
//       address: 'Hà Nội',
//     },
//     {
//       id: 2,
//       patientCode: 'BN002',
//       fullName: 'Tran Thi B',
//       gender: 'Nữ',
//       dob: '1995-02-02',
//       cccd: '987654321',
//       address: 'Hải Phòng',
//     },
//     // Thêm dữ liệu để kiểm tra phân trang...
//   ]);

//   const [filteredPatients, setFilteredPatients] = useState(patients); // Danh sách sau khi tìm kiếm

//   // Thay đổi bộ lọc
//   const handleFilterChange = (field, value) => {
//     setFilters({ ...filters, [field]: value });
//   };

//   // Tìm kiếm
//   const handleSearch = () => {
//     const { searchPatient } = filters;
//     let filteredList = patients;

//     if (searchPatient) {
//       filteredList = patients.filter((item) =>
//         item.fullName.toLowerCase().includes(searchPatient.toLowerCase())
//       );
//     }

//     setFilteredPatients(filteredList);
//     setCurrentPage(1); // Reset về trang đầu tiên
//   };

//   // Xóa bệnh nhân
//   const handleDelete = (id) => {
//     if (window.confirm('Bạn muốn xóa bản ghi này không?')) {
//       setFilteredPatients(filteredPatients.filter((patient) => patient.id !== id));
//     }
//   };

//   // Phân trang
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

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
//     <div className={styles.patientList}>
//       {/* Phần 1: Bộ lọc */}
//       <div className={styles.filterSection}>
//         <label>Tìm kiếm BN</label>
//         <input
//           type="text"
//           name="searchPatient"
//           placeholder="Nhập tên bệnh nhân"
//           value={filters.searchPatient}
//           onChange={(e) => handleFilterChange('searchPatient', e.target.value)}
//           className={styles.filterInput}
//         />
//         <button className={styles.searchButton} onClick={handleSearch}>
//           <i className="fa fa-search" /> Tìm kiếm
//         </button>
//       </div>

//       {/* Phần 2: Bảng danh sách */}
//       <table className={styles.listTable}>
//         <thead>
//           <tr>
//             <th>STT</th>
//             <th>Mã bệnh nhân</th>
//             <th>Họ và tên</th>
//             <th>Giới tính</th>
//             <th>Ngày sinh</th>
//             <th>CCCD</th>
//             <th>Địa chỉ</th>
//             <th>Chi tiết</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.length > 0 ? (
//             currentItems.map((patient, index) => (
//               <tr key={patient.id}>
//                 <td>{indexOfFirstItem + index + 1}</td>
//                 <td>{patient.patientCode}</td>
//                 <td>{patient.fullName}</td>
//                 <td>{patient.gender}</td>
//                 <td>{patient.dob}</td>
//                 <td>{patient.cccd}</td>
//                 <td>{patient.address}</td>
//                 <td>
//                   <button
//                     className={styles.detailButton}
//                     onClick={() => alert(`Xem chi tiết ${patient.patientCode}`)}
//                   >
//                     Xem
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className={styles.editButton}
//                     onClick={() => alert(`Sửa ${patient.patientCode}`)}
//                   >
//                     <FaPencilAlt />
//                   </button>
//                   <button
//                     className={styles.deleteButton}
//                     onClick={() => handleDelete(patient.id)}
//                   >
//                     <FaTrash />
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

// export default PatientList;

import React, { useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; // Import icons
import styles from '../../css/ReceptionManage/PatientList.module.css';

const PatientList = () => {
  const [filters, setFilters] = useState({
    searchPatient: '',
  });

  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 5; // Số lượng bản ghi mỗi trang

  const [patients, setPatients] = useState([
    // Dữ liệu giả lập
    { id: 1, patientCode: 'BN001', fullName: 'Nguyen Van A', gender: 'Nam', dob: '1990-01-01', cccd: '123456789', address: 'Hà Nội' },
    { id: 2, patientCode: 'BN002', fullName: 'Tran Thi B', gender: 'Nữ', dob: '1995-02-02', cccd: '987654321', address: 'Hải Phòng' },
    { id: 3, patientCode: 'BN003', fullName: 'Le Thi C', gender: 'Nữ', dob: '1998-03-03', cccd: '135792468', address: 'Hà Nội' },
    { id: 4, patientCode: 'BN004', fullName: 'Pham Minh D', gender: 'Nam', dob: '1988-04-04', cccd: '246813579', address: 'Đà Nẵng' },
    { id: 5, patientCode: 'BN005', fullName: 'Nguyen Thi E', gender: 'Nữ', dob: '1993-05-05', cccd: '112233445', address: 'Hà Nội' },
    { id: 6, patientCode: 'BN006', fullName: 'Nguyen Thi F', gender: 'Nữ', dob: '1991-06-06', cccd: '556677889', address: 'Hải Phòng' },
    { id: 7, patientCode: 'BN007', fullName: 'Pham Minh G', gender: 'Nam', dob: '1994-07-07', cccd: '223344556', address: 'Hà Nội' },
    { id: 8, patientCode: 'BN008', fullName: 'Le Thi H', gender: 'Nữ', dob: '1997-08-08', cccd: '998877665', address: 'Đà Nẵng' },
    { id: 9, patientCode: 'BN009', fullName: 'Tran Thi I', gender: 'Nữ', dob: '1999-09-09', cccd: '112233667', address: 'Hải Phòng' },
    { id: 3, patientCode: 'BN003', fullName: 'Le Thi C', gender: 'Nữ', dob: '1998-03-03', cccd: '135792468', address: 'Hà Nội' },
    { id: 4, patientCode: 'BN004', fullName: 'Pham Minh D', gender: 'Nam', dob: '1988-04-04', cccd: '246813579', address: 'Đà Nẵng' },
    { id: 5, patientCode: 'BN005', fullName: 'Nguyen Thi E', gender: 'Nữ', dob: '1993-05-05', cccd: '112233445', address: 'Hà Nội' },
    { id: 6, patientCode: 'BN006', fullName: 'Nguyen Thi F', gender: 'Nữ', dob: '1991-06-06', cccd: '556677889', address: 'Hải Phòng' },
    { id: 7, patientCode: 'BN007', fullName: 'Pham Minh G', gender: 'Nam', dob: '1994-07-07', cccd: '223344556', address: 'Hà Nội' },
    { id: 8, patientCode: 'BN008', fullName: 'Le Thi H', gender: 'Nữ', dob: '1997-08-08', cccd: '998877665', address: 'Đà Nẵng' },
    { id: 9, patientCode: 'BN009', fullName: 'Tran Thi I', gender: 'Nữ', dob: '1999-09-09', cccd: '112233667', address: 'Hải Phòng' },
    { id: 10, patientCode: 'BN010', fullName: 'Nguyen Minh K', gender: 'Nam', dob: '1989-10-10', cccd: '445566778', address: 'Hà Nội' },
    { id: 11, patientCode: 'BN011', fullName: 'Le Thi L', gender: 'Nữ', dob: '1996-11-11', cccd: '776655443', address: 'Đà Nẵng' },
    { id: 12, patientCode: 'BN012', fullName: 'Pham Minh M', gender: 'Nam', dob: '1992-12-12', cccd: '998877665', address: 'Hải Phòng' }
  ]);

  const [filteredPatients, setFilteredPatients] = useState(patients); // Danh sách sau khi tìm kiếm

  // Thay đổi bộ lọc
  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  // Tìm kiếm
  const handleSearch = () => {
    const { searchPatient } = filters;
    let filteredList = patients;

    if (searchPatient) {
      filteredList = patients.filter((item) =>
        item.fullName.toLowerCase().includes(searchPatient.toLowerCase())
      );
    }

    setFilteredPatients(filteredList);
    setCurrentPage(1); // Reset về trang đầu tiên
  };

  // Xóa bệnh nhân
  const handleDelete = (id) => {
    if (window.confirm('Bạn muốn xóa bản ghi này không?')) {
      setFilteredPatients(filteredPatients.filter((patient) => patient.id !== id));
    }
  };

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

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
    <div className={styles.patientList}>
      {/* Phần 1: Bộ lọc */}
      {/* <div className={styles.filterSection}>
        <label>Tìm kiếm BN</label>
        <input
          type="text"
          name="searchPatient"
          placeholder="Nhập tên bệnh nhân"
          value={filters.searchPatient}
          onChange={(e) => handleFilterChange('searchPatient', e.target.value)}
          className={styles.filterInput}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          <i className="fa fa-search" /> Tìm kiếm
        </button>
      </div> */}
      <div className={styles.filterSection}>
        <div className={styles.filterName}>
          <label>Tìm kiếm BN</label>
          <input
           type="text"
           name="searchPatient"
           placeholder="Nhập tên bệnh nhân"
           value={filters.searchPatient}
           onChange={(e) => handleFilterChange('searchPatient', e.target.value)}
           className={styles.filterInput}
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
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>CCCD</th>
            <th>Địa chỉ</th>
            <th>Chi tiết</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((patient, index) => (
              <tr 
              key={patient.id}
              style={{
                backgroundColor:
                  (indexOfFirstItem + index + 1) % 2 === 0 ? '#e7e7e7' : '#fff',
              }}
              >
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{patient.patientCode}</td>
                <td>{patient.fullName}</td>
                <td>{patient.gender}</td>
                <td>{patient.dob}</td>
                <td>{patient.cccd}</td>
                <td>{patient.address}</td>
                <td>
                  <button
                    className={styles.detailButton}
                    onClick={() => alert(`Xem chi tiết ${patient.patientCode}`)}
                  >
                    Xem
                  </button>
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => alert(`Sửa ${patient.patientCode}`)}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(patient.id)}
                  >
                    <FaTrash />
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

export default PatientList;

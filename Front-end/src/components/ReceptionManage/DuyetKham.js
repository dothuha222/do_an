



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/User/ScheduleForm.module.css';
import { getDon } from '../Services/NguoiDungService';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { getAllPK, capNhatDTN } from '../Services/LeTanService';

const DuyetKham = ({userId}) => {
  const {id} = useParams();
  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [phongKhams, setPhongKhams] = useState([]); 
  const [selectedRoomId, setSelectedRoomId] = useState("");
  
  const [data1, setData1] = useState({
    ly_do_kham: '',
    le_tan_id: userId,
    phong_kham_id: '',
    trang_thai_don_id: 3
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDon();
        const data = response.data;
        console.log(data);
        
        const matchedData = data.find(item => item.don_tiep_nhan_id === parseInt(id));
        console.log(matchedData);
        if (matchedData) {
          const formattedData = {
            patientCode: `BN${String(matchedData.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
            patientName: matchedData.benh_nhan.ten,
            bod: formatDate(matchedData.benh_nhan.ns),
            cccd: matchedData.benh_nhan.cccd,
            gender: matchedData.benh_nhan.gioi_tinh,
            address: matchedData.benh_nhan.dia_chi,
            phone: matchedData.benh_nhan.sdt,
            maBHYT: matchedData.benh_nhan.ma_bhyt,
            receptionCode: `TN${String(matchedData.don_tiep_nhan_id).padStart(4, '0')}`,
            room: matchedData.phong_kham?.ten || "",
            reason: matchedData.ly_do_kham,
            patientId: matchedData.benh_nhan.nguoi_dung_id,
            ngayHen: formatDate(matchedData.thoiGian),
            donTNId: matchedData.don_tiep_nhan_id
          };
          setFormData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
useEffect(() => {
    const fetchPhongKhams = async () => {
        try {
            const response = await getAllPK();
            console.log(response.data)
            setPhongKhams(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu phòng khám:", error);
        }
    };

    fetchPhongKhams();
}, []);
  useEffect(() => {
    if (formData) {
      console.log(formData);
    }
  }, [formData]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const handlePKChange = (event) => {
    const selectedId = event.target.value; // Lấy id từ value của <option>
    setSelectedRoomId(selectedId);
    setErrors((prevErrors) => ({ ...prevErrors, room: "" })); // Xóa lỗi nếu có
  };
  const handleSaveAndPrint = (e) => {
      e.preventDefault();
    console.log(formData);
    const payload = { 
      ...data1,
      thoiGian: formData.ngayHen,
      cccd: formData.cccd,
      benh_nhan_id: formData.patientId,
      le_tan_id: userId,
      ly_do_kham: formData.reason,
      phong_kham_id: selectedRoomId
    }
    console.log(payload);
    capNhatDTN(formData.donTNId,payload)
    .then(response => {
      alert('Gửi thành công!');
      console.log(response.data);
      navigator('/reception-list')
    })
    .catch(error => {
      console.error("Lỗi khi cập nhật đơn tiếp nhận:", error);
      throw error;
    });
 };
 const handleCancel = () => {
  setShowConfirmModal(true);
};

const handleConfirmCancel = (e) => {
  e.preventDefault();
  console.log(formData);
  const payload = { 
   ...data1,
   thoiGian: formData.ngayHen,
   cccd: formData.cccd,
   benh_nhan_id: formData.patientId,
   le_tan_id: userId,
   ly_do_kham: formData.reason,
   phong_kham_id: selectedRoomId,
   trang_thai_don_id: 6
 }
 console.log(payload);
 capNhatDTN(formData.donTNId,payload)
 .then(response => {
   alert('Từ chối thành công!');
   console.log(response.data);
   setShowConfirmModal(false);
   navigator('/reception-list')
 })
 .catch(error => {
   console.error("Lỗi khi cập nhật đơn tiếp nhận:", error);
   throw error;
 });
};
console.log(selectedRoomId)

  if (!formData) {
    return <div>Dữ liệu không tồn tại</div>;
  }

  return (
    <div className={styles.receptionForm}>
      <div className={styles.buttons}>
           <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
             <FaPrint style={{ marginRight: '8px' }} /> <span>DUYỆT ĐƠN</span>
           </button>
           <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
             <FaTimes style={{ marginRight: '8px' }} /> <span>TỪ CHỐI</span>
           </button>
         </div>
      <div className={styles.formSection}>
        <form>
            <h3 className={styles.formH}>ĐƠN TIẾP NHẬN</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Mã bệnh nhân</label>
                <input
                  type="text"
                  name="id"
                  value={formData.patientCode}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Họ và tên </label>
                <input
                  type="text"
                  name="name"
                  value={formData.patientName}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ngày sinh </label>
                <DatePicker
                  value={formData.bod}
                  dateFormat="dd/MM/yyyy"
                  className={styles.datePicker}
                  placeholderText="Chọn ngày sinh"
                  style={{ backgroundColor: '#e3f5ff' }}
                  disabled
                />
              </div>
              <div className={styles.formGroup}>
                <label>CCCD</label>
                <input
                  type="text"
                  name="cccd"
                  value={formData.cccd}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ngày hẹn khám <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="cccd"
                  value={formData.ngayHen}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
                {/* <DatePicker
                    selected={formData.ngayHen}
                    dateFormat="dd/MM/yyyy"
                    className={styles.datePickerB}
                    placeholderText="Chọn ngày hẹn khám"

                /> */}
                {errors.thoiGian && <span className={styles.error}>{errors.thoiGian}</span>}
              </div>
            </div>
            <div className={styles.formFlex1}>
            <div className={styles.formGroup}>
                <label>Giới tính </label>
                <input
                  name="gender"
                  value={formData.gender}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                >
                </input>
              </div>
              <div className={styles.formGroup}>
                <label>Địa chỉ </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phone}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mã số BHYT</label>
                <input
                  type="text"
                  name="bhytCode"
                  value={formData.maBHYT}
                  disabled
                  placeholder="Nhập mã số BHYT"
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Lý do khám <span style={{ color: 'red' }}>*</span> </label>
                <input
                  type="text"
                  name="reason"
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                  value={formData.reason}
                />
                {errors.reason && <span className={styles.error}>{errors.reason}</span>}
              </div>
              {/* {formData.phong_kham && (
              <div className={styles.formGroup}>
                  <label>Phòng khám<span style={{ color: 'red' }}>*</span></label>
                  <input
                  type="text"
                  name="phong_kham"
                  value={formData.phong_kham}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                  />
              </div>
              )} */}
              <div className={styles.formGroup}>
                <label>
                    Phòng khám <span style={{ color: "red" }}>*</span>
                </label>
                <select
                    name="room"
                    value={selectedRoomId}
                    onChange={handlePKChange}
                >
                    <option value="">Chọn phòng khám</option>
                    {phongKhams.map((phongKham) => (
                        <option key={phongKham.phong_kham_id} value={phongKham.phong_kham_id}>
                            {phongKham.ten}
                        </option>
                    ))}
                </select>
                {errors.room && (
                    <span className={styles.error}>{errors.room}</span>
                )}
            </div>
            </div>
          </div>
      
        </form>
      </div>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
         <Modal.Header closeButton>
           <Modal.Title>Xác nhận</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <p>Xác nhận từ chối duyệt đơn?</p>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
             Hủy
           </Button>
           <Button variant="primary" onClick={handleConfirmCancel}>
             Đồng ý
           </Button>
         </Modal.Footer>
       </Modal>
    </div>
  );
};

export default DuyetKham;

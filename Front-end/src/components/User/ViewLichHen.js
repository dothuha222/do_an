
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/User/ScheduleForm.module.css';
import { getDon } from '../Services/NguoiDungService';
import DatePicker from 'react-datepicker'; // Import DatePicker

const ViewLichHen = () => {
  const {id} = useParams();
  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState(null);

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
            ngayHen: formatDate(matchedData.thoiGian)
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

 
  if (!formData) {
    return <div>Dữ liệu không tồn tại</div>;
  }

  return (
    <div className={styles.receptionForm}>
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
            {formData.phong_kham && (
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
            )}
          </div>
        </div>
    
      </form>
    </div>
  </div>
  );
};

export default ViewLichHen;

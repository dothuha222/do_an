

import React, { useState, useEffect } from 'react';
import styles from '../../css/User/ScheduleForm.module.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { getLichSuBA } from '../Services/BacSiService';
import { createDontiepnhan } from '../Services/LeTanService';
import { useNavigate } from 'react-router-dom';


const  ScheduleForm = ({ userId}) => {
  const [formData, setFormData] = useState({
    ly_do_kham:"",
    thoiGian:"",
    benh_nhan_id: userId,
    trang_thai_don_id: 1
  });
  const navigator = useNavigate();

  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [patientData, setPatientData] = useState(null)
  useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getLichSuBA(userId);
            const data = response.data;
            console.log(data);       

            const matchedData = data[0]
            console.log(matchedData);
            if (matchedData) {
            const formattedData = {
                id: `BN${String(matchedData.don_tiep_nhan.benh_nhan.nguoi_dung_id).padStart(4, '0')}`,
                name: matchedData.don_tiep_nhan.benh_nhan.ten,
                dob: matchedData.don_tiep_nhan.benh_nhan.ns,
                cccd: matchedData.don_tiep_nhan.benh_nhan.cccd,
                gender: matchedData.don_tiep_nhan.benh_nhan.gioi_tinh,
                address: matchedData.don_tiep_nhan.benh_nhan.dia_chi,
                phoneNumber: matchedData.don_tiep_nhan.benh_nhan.sdt,
                maBHYT: matchedData.don_tiep_nhan.benh_nhan.ma_bhyt,
                benhNhanId : matchedData.don_tiep_nhan.benh_nhan.nguoi_dung_id,
            };

            console.log(formattedData)
            setPatientData(formattedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };
        fetchData();
    }, [userId]);

    useEffect(() => {
        if (patientData) {
        console.log(patientData);
        }
    }, [patientData]);
  // useEffect(() => {
  //   if (receptionData) {
  //     setFormData(receptionData);
  //   }
  // }, [receptionData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleBHYTChange = (value) => {
  //   setFormData({
  //     ...formData,
  //     bhyt: value,
  //     bhytCode: value === 'Có' ? formData.bhytCode : '', // Reset mã số BHYT nếu chọn "Không"
  //   });
  // };

  const handleAppointChange = (date) => {
    setFormData({ ...formData, thoiGian:date});
  };
  const handleDateChange = (date) => {
    setFormData({ ...formData, birthDate: date });
  };

  const handleSaveAndPrint = (e) => {
    // let validationErrors = {};
    // if (!formData.thoiGian) validationErrors.thoiGian = 'Ngày hẹn khám là bắt buộc';
    // if (!formData.reason) validationErrors.reason = 'Lý do khám là bắt buộc';
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    e.preventDefault();
    const payload ={
      ...formData,
      benh_nhan_id: patientData.benhNhanId
    }
    alert('Đẩy dữ liệu')
    console.log('Đẩy dữ liệu:', payload);
    createDontiepnhan(payload).then(response => {
      alert('Gui thanh cong!')
      console.log(response.data)
      navigator('/schedule-list')
      setFormData
            ({
              ly_do_kham:"",
              thoiGian:"",
              benh_nhan_id: userId,
              trang_thai_don_id: 1
            });
    })
  };

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    // onClose();
    setShowConfirmModal(false);
  };

  // const isDisabled = mode === 'view';
  if (!patientData) {
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
                  value={patientData.id}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Họ và tên </label>
                <input
                  type="text"
                  name="name"
                  value={patientData.name}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ngày sinh </label>
                <DatePicker
                  value={patientData.dob}
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
                  value={patientData.cccd}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ngày hẹn khám <span style={{ color: 'red' }}>*</span></label>
                <DatePicker
                    selected={formData.thoiGian}
                    onChange={handleAppointChange}
                    dateFormat="dd/MM/yyyy"
                    className={styles.datePickerB}
                    placeholderText="Chọn ngày hẹn khám"
                />
                {errors.thoiGian && <span className={styles.error}>{errors.thoiGian}</span>}
              </div>
            </div>
            <div className={styles.formFlex1}>
            <div className={styles.formGroup}>
                <label>Giới tính </label>
                <input
                  name="gender"
                  value={patientData.gender}
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
                  value={patientData.address}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={patientData.phoneNumber}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mã số BHYT</label>
                <input
                  type="text"
                  name="bhytCode"
                  value={patientData.maBHYT}
                  disabled
                  placeholder="Nhập mã số BHYT"
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Lý do khám <span style={{ color: 'red' }}>*</span> </label>
                <input
                  type="text"
                  name="ly_do_kham"
                  value={formData.ly_do_kham}
                  onChange={handleInputChange}
                  // disabled={isDisabled}
                />
                {errors.reason && <span className={styles.error}>{errors.reason}</span>}
              </div>
            </div>
          </div>
          
        <div className={styles.buttons}>
          <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
            <span>ĐẶT LỊCH HẸN</span>
          </button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
          </button>
        </div>
        </form>
      </div>

      {/* Modal Confirm */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Xác nhận hủy?</p>
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

export default ScheduleForm;

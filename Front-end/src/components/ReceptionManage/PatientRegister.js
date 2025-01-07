

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import { FaTimes } from 'react-icons/fa';
import { createPatient} from '../Services/NguoiDungService';
import { useParams } from 'react-router-dom';

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    ten: '',
    ns: '',
    gioi_tinh: '',
    vai_tro: 'benh_nhan',
    dia_chi: '',
    sdt:'',
    username: '',
    password: '',
    cccd:'',
    ma_bhyt:''
  });


  const {id} = useParams();

  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const formatDateToString = (date) => {
    if (!date) return ""; // Kiểm tra nếu date null hoặc undefined
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };


  const handleDateChange = (date) => {
    setFormData({ ...formData, ns: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSave= (e) => {
    
    e.preventDefault();
    const payload = {
      ...formData,
      ns: formatDateToString(formData.ns), // Chuyển đổi khi gửi
    };
    console.log(payload);
    createPatient(payload).then(response => {
      alert('Gui thanh cong!')
      navigator('/patient-list')
      console.log(response.data)
    })
    // navigator('/patient-list')
    // setFormData
    // ({
    //   ten: '',
    //   ns: '',
    //   cccd: '',
    //   gioi_tinh: '',
    //   vai_tro: 'benh_nhan',
    //   dia_chi: '',
    //   sdt:'',
    //   username: '',
    //   password: '',
    //   ma_bhyt:''
    // });
    // })
    // .catch(error => {
    //   console.error(error)
    // })
    console.log("da luu")
    // let validationErrors = {};
    // if (!formData.ten) validationErrors.ten = 'Họ và tên là bắt buộc';
    // if (!formData.ns) validationErrors.ns = 'Ngày sinh là bắt buộc';
    // if (!formData.cccd) validationErrors.cccd = 'CCCD là bắt buộc';
    // if (!formData.gioi_tinh) validationErrors.gioi_tinh = 'Giới tính là bắt buộc';
    // if (!formData.dia_chi) validationErrors.dia_chi = 'Địa chỉ là bắt buộc';
    // if (!formData.sdt) validationErrors.sdt = 'Số điện thoại là bắt buộc';
    // if (!formData.username) validationErrors.usernames = 'Tên đăng nhập là bắt buộc';
    // if (!formData.password) validationErrors.password = 'Mật khẩu là bắt buộc';
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    // else{
      // setErrors({})
      // e.preventDefault();
     
      
    // if(id){
    //   updateReception(id, formData).then((response) => {
    //     console.log(response.data)
    //     navigator('/patient-list')
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })
    //   console.log('da sua')
    // }
    // else{
    //   createPatient(formData).then((response) => {
    //   console.log(response.data)
    //   navigator('/patient-list')
    //   setFormData
    //   ({
    //     ten: '',
    //     ns: '',
    //     cccd: '',
    //     gioi_tinh: '',
    //     vai_tro: 'benh_nhan',
    //     dia_chi: '',
    //     sdt:'',
    //     username: '',
    //     password: '',
    //     ma_bhyt:''
    //   });
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })
    //   console.log("da luu")
    // }
    // }
  };

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setFormData
    ({
      ten: '',
      ns: '',
      cccd: '',
      gioi_tinh: '',
      vai_tro: 'benh_nhan',
      dia_chi: '',
      sdt:'',
      username: '',
      password: '',
      ma_bhyt:''
    });
   
  };

  // useEffect(() => {
  //   if(id){
  //     getReception(id).then((res) => {
  //       setFormData(res.data)
  //     }).catch((err) => {
  //       console.error(err);
  //     })
  //   }
  // },[id])

  return (
    <div className={styles.receptionForm}>
    
      <div className={styles.formSection} style={{ marginTop: '42px' }}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin bệnh nhân</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Họ và tên <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="ten"
                  value={formData.ten}
                  onChange={handleInputChange}
                />
                {errors.ten && <span className={styles.error}>{errors.ten}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Ngày sinh <span style={{ color: 'red' }}>*</span></label>
                <DatePicker
                  selected={formData.ns} 
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className={styles.datePicker}
                  placeholderText="Chọn ngày sinh"
                />
                {errors.ns && <span className={styles.error}>{errors.ns}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>CCCD <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="cccd"
                  value={formData.cccd}
                  onChange={handleInputChange}
                />
                {errors.cccd && <span className={styles.error}>{errors.cccd}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Giới tính <span style={{ color: 'red' }}>*</span></label>
                <select
                  name="gioi_tinh"
                  value={formData.gioi_tinh}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
                {errors.gioi_tinh && <span className={styles.error}>{errors.gioi_tinh}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Địa chỉ <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="dia_chi"
                  value={formData.dia_chi}
                  onChange={handleInputChange}
                />
                {errors.dia_chi && <span className={styles.error}>{errors.dia_chi}</span>}
              </div>
            </div>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Số điện thoại <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="sdt"
                  value={formData.sdt}
                  onChange={handleInputChange}
                />
                {errors.sdt && <span className={styles.error}>{errors.sdt}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Mã số BHYT</label>
                <input
                  type="text"
                  name="ma_bhyt"
                  value={formData.ma_bhyt}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tên đăng nhập <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && <span className={styles.error}>{errors.username}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Mật khẩu <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
              </div>
              
            </div>
          </div>
        </form>
      </div>
        <div className={styles.buttons}>
          <button type='button' onClick={handleSave} className={`${styles.btn} ${styles.savePrint}`}>
            <span style={{ padding: '0px 14px' }}>LƯU</span>
          </button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
          </button>
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

export default PatientRegister;

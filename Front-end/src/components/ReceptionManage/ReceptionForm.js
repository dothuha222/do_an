

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { createReception, getReception,updateReception } from '../Services/ReceptionService';
import { useParams } from 'react-router-dom';

const ReceptionForm = ({ mode, receptionData, onClose }) => {
  const [formData, setFormData] = useState({
    // patientId: '',
    // fullName: '',
    // birthDate: '',
    // cccd: '',
    // gender: '',
    // address: '',
    // reason: '',
    // room: '',
    // phoneNumber:'',
    // bhytCode: '',
    
    patientId: 'BN2098',
    fullName: 'Nguyễn Văn Minh',
    birthDate: '08/11/1970',
    cccd: '',
    gender: 'Nam',
    address: 'Duy Tân, Cầu Giấy',
    reason: '',
    room: '102B',
    phoneNumber: '0988176563', 
    bhytCode: 'DN47888025341',
    receptionTime: '25/12/2024',
    receptionCode: 'RN310'
  });

  const {id} = useParams();

  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // useEffect(() => {
  //   if (receptionData) {
  //     setFormData(receptionData);
  //   }
  // }, [receptionData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleDateChange = (date) => {
    setFormData({ ...formData, birthDate: date });
  };

  const handleSaveAndPrint = (e) => {
    let validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = 'Họ và tên là bắt buộc';
    if (!formData.birthDate) validationErrors.birthDate = 'Ngày sinh là bắt buộc';
    if (!formData.cccd) validationErrors.cccd = 'CCCD là bắt buộc';
    if (!formData.gender) validationErrors.gender = 'Giới tính là bắt buộc';
    if (!formData.address) validationErrors.address = 'Địa chỉ là bắt buộc';
    if (!formData.reason) validationErrors.reason = 'Lý do khám là bắt buộc';
    if (!formData.room) validationErrors.room = 'Phòng khám là bắt buộc';
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Số điện thoại là bắt buộc';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    else{
      // setErrors({})
      e.preventDefault();
      if(id){
        updateReception(id, formData).then((response) => {
          console.log(response.data)
          navigator('/reception-list')
        })
        .catch(error => {
          console.error(error)
        })
        console.log('da sua')
      }
      else{
        createReception(formData).then((response) => {
          console.log(response.data)
          navigator('/reception-list')
          setFormData
            ({
              // patientId: '',
              fullName: '',
              birthDate: '',
              cccd: '',
              gender: '',
              address: '',
              reason: '',
              room: '',
              phoneNumber: '', 
              bhytCode: '',
            });
        })
        .catch(error => {
          console.error(error)
        })
        console.log("da luu")
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setFormData
            ({
              // patientId: '',
              fullName: '',
              birthDate: '',
              cccd: '',
              gender: '',
              address: '',
              reason: '',
              room: '',
              phoneNumber: '', 
              bhytCode: '',
            });
    setShowConfirmModal(false);
  };

  const isDisabled = mode === 'view';
  useEffect(() => {
    if(id){
      getReception(id).then((res) => {
        setFormData(res.data)
      }).catch((err) => {
        console.error(err);
      })
    }
  },[id])

  return (
    <div className={styles.receptionForm}>
      {!isDisabled && (
        <div className={styles.buttons}>
          <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
            <FaPrint style={{ marginRight: '8px' }} /> <span>LƯU VÀ IN PHIẾU</span>
             {/* <span>KHÁM BỆNH</span> */}
             {/* <span>DUYỆT ĐƠN</span> */}
          </button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
          </button>
        </div>
      )}
      {/* <div className={styles.formSection}>
      <form>
      <h3 className={styles.formSectionTitle}>Thông tin bệnh nhân</h3>
      </form>
      </div> */}

      <div className={styles.formSection}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin phiếu</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              {/* <div className={styles.formGroup}>
                <label>Mã đơn tiếp nhận</label>
                <input
                  type="text"
                  name="receiptId"
                  value={formData.receptionCode}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div> */}
            </div>
            {/* <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Ngày khám</label>
                <input
                  type="text"
                  name="visitDate"
                  value={formData.receptionTime}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
            </div> */}
          </div>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
            <div className={styles.formGroup}>
                <label>CCCD <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="cccd"
                  value={formData.cccd}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                  // disabled
                  // style={{ backgroundColor: '#e3f5ff' }}
                />
                {errors.cccd && <span className={styles.error}>{errors.cccd}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Lý do khám <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  // disabled={isDisabled}
                  disabled
                  // style={{ backgroundColor: '#e3f5ff' }}
                />
                {errors.reason && <span className={styles.error}>{errors.reason}</span>}
              </div>
            </div>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Phòng khám <span style={{ color: 'red' }}>*</span></label>
                <select
                  name="room"
                  // value={formData.room}
                  onChange={handleInputChange}
                  // disabled={isDisabled}
                  // disabled
                  // style={{ backgroundColor: '#e3f5ff' }}
                >
                  <option value="">Chọn phòng khám</option>
                  <option value="101A">Phòng khám 101A</option>
                  <option value="102B">Phòng khám 102B</option>
                  <option value="103C">Phòng khám 103C</option>
                </select>
                {errors.room && <span className={styles.error}>{errors.room}</span>}
                {/* <input
                  type="text"
                  name="reason"
                  value={formData.room}
                  onChange={handleInputChange}
                  // disabled={isDisabled}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
                {errors.reason && <span className={styles.error}>{errors.reason}</span>} */}
              </div>
            </div>
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

export default ReceptionForm;

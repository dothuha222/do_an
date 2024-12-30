

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import { FaTimes } from 'react-icons/fa';
import { createReception, getReception,updateReception } from '../Services/ReceptionService';
import { useParams } from 'react-router-dom';

const DichVuForm = ({ mode, receptionData, onClose }) => {
  const [formData, setFormData] = useState({
    dichVuName: '',
    type: '',
    price: '',
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
    if (!formData.dichVuName) validationErrors.fullName = 'Tên thuốc là bắt buộc';
    if (!formData.type) validationErrors.birthDate = 'Đơn vị là bắt buộc';
    if (!formData.price) validationErrors.cccd = 'Giá tiền là bắt buộc';
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
          navigator('/patient-list')
        })
        .catch(error => {
          console.error(error)
        })
        console.log('da sua')
      }
      else{
        createReception(formData).then((response) => {
          console.log(response.data)
          navigator('/patient-list')
          setFormData
            ({

                dichVuName: '',
                type: '',
                price: '',
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
        dichVuName: '',
        type: '',
        price: '',
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
      <div className={styles.formSection} style={{ marginTop: '42px' }}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin dịch vụ</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Tên dịch vụ <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="dichVuName"
                  value={formData.dichVuName}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                />
                {errors.dichVuName && <span className={styles.error}>{errors.dichVuName}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label>Loại dịch vụ<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                />
                {errors.type && <span className={styles.error}>{errors.type}</span>}
              </div>
            </div>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Giá tiền<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                />
                {errors.price && <span className={styles.error}>{errors.price}</span>}
              </div>
              
            </div>
          </div>
        </form>
      </div>
      {!isDisabled && (
        <div className={styles.buttons}>
          <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
            <span style={{ padding: '0px 14px' }}>LƯU</span>
          </button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
          </button>
        </div>
      )}
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

export default DichVuForm;

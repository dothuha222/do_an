

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import { FaTimes } from 'react-icons/fa';
// import { createReception, getReception,updateReception } from '../Services/ReceptionService';
import { useParams } from 'react-router-dom';
import { addThuoc } from '../Services/LeTanService';

const DrugForm = () => {
  const [formData, setFormData] = useState({
    ten: '',
    don_vi: '',
    gia: '',
  });

  const {id} = useParams();

  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSaveAndPrint = () => {
    const payload = formData
        console.log(payload);
        addThuoc(payload)
        .then((response) => {
          console.log(response.data);
          navigator('/drug-list')
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật thuốc:", error);
        });
  };

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setFormData
    ({
        ten: '',
        don_vi: '',
        gia: '',
    });
    setShowConfirmModal(false);
    navigator('/drug-list')
  };


  return (
    <div className={styles.receptionForm}>
    
      <div className={styles.formSection} style={{ marginTop: '42px' }}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin thuốc</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Tên thuốc <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="ten"
                  value={formData.ten}
                  onChange={handleInputChange}
                />
                {errors.drugName && <span className={styles.error}>{errors.drugName}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label>Đơn vị<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="don_vi"
                  value={formData.don_vi}
                  onChange={handleInputChange}
                />
                {errors.unit && <span className={styles.error}>{errors.unit}</span>}
              </div>
            </div>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Giá tiền<span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="gia"
                  value={formData.gia}
                  onChange={handleInputChange}
                />
                {errors.price && <span className={styles.error}>{errors.price}</span>}
              </div>
            </div>
          </div>
        </form>
      </div>
        <div className={styles.buttons}>
          <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
            <span style={{ padding: '0px 14px' }}>LƯU</span>
          </button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
          </button>
        </div>
      {/* )} */}
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

export default DrugForm;

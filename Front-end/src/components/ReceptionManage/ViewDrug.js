

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getThuocById } from '../Services/LeTanService';

const ViewDrug = () => {
  const [formData, setFormData] = useState({
    don_vi: '',
    gia: '',
    ten: '',
  });

  const {id} = useParams();

  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    getThuocById(id)
      .then((response) => {
        console.log(response.data)
        const data = response.data
        setFormData(data)
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách thuốc:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveAndPrint = (e) => {
    let validationErrors = {};
    if (!formData.drugName) validationErrors.fullName = 'Tên thuốc là bắt buộc';
    if (!formData.unit) validationErrors.birthDate = 'Đơn vị là bắt buộc';
    if (!formData.price) validationErrors.cccd = 'Giá tiền là bắt buộc';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

  };

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setFormData
    ({
        drugName: '',
        unit: '',
        price: '',
    });
    setShowConfirmModal(false);
  };

  return (
    <div className={styles.receptionForm}>
    
      <div className={styles.formSection} style={{ marginTop: '42px' }}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin thuốc</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Tên thuốc</label>
                <input
                  type="text"
                  name="drugName"
                  value={formData.ten}
                  onChange={handleInputChange}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Đơn vị</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.don_vi}
                  onChange={handleInputChange}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
            </div>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Giá tiền</label>
                <input
                  type="text"
                  name="price"
                  value={formData.gia}
                  onChange={handleInputChange}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              
            </div>
          </div>
        </form>
      </div>
      {/* {!isDisabled && ( */}
        {/* <div className={styles.buttons}>
          <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
            <span style={{ padding: '0px 14px' }}>LƯU</span>
          </button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
          </button>
        </div> */}
      {/* )} */}
      {/* Modal Confirm */}
      {/* <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
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
      </Modal> */}
    </div>
  );
};

export default ViewDrug;

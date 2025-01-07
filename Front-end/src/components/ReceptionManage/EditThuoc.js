

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getThuocById, updateThuoc } from '../Services/LeTanService';

const EditThuoc = () => {
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
    setShowConfirmModal(true);
    
  };

  const handleCancel = () => {
    navigator('/drug-list')
  };

  const handleConfirmCancel = () => {
    const payload = formData
    console.log(payload);
    updateThuoc(id, payload)
    .then((response) => {
      console.log(response.data);
      navigator('/drug-list')
      setShowConfirmModal(false);
    })
    .catch((error) => {
      console.error("Lỗi khi cập nhật thuốc:", error);
    });
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
                  name="ten"
                  value={formData.ten}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Đơn vị</label>
                <input
                  type="text"
                  name="don_vi"
                  value={formData.don_vi}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Giá tiền</label>
                <input
                  type="text"
                  name="gia"
                  value={formData.gia}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* {!isDisabled && ( */}
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
          <p>Xác nhận sửa thuốc?</p>
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

export default EditThuoc;

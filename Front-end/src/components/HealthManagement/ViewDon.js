
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { getAllDon } from '../Services/BacSiService';
import { Link } from 'react-router-dom';

const ViewDon = () => {

  const {id} = useParams();
  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDon();
        const data = response.data;
        console.log(data);
        
        const matchedData = data.find(item => item.don_tiep_nhan_id === parseInt(id));
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
            room: matchedData.phong_kham.ten,
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


  const handleKhamBenh = () => {
    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    navigator('/khambenh-list')
    console.log('Hủy')
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
    navigator(`/health-form/${id}`);
  };

  if (!formData) {
    return <div>Dữ liệu không tồn tại</div>;
  }

  return (
    <div className={styles.receptionForm} style={{marginTop: '30px'}}>
      <div className={styles.buttons}>
        <button onClick={handleKhamBenh} className={`${styles.btn} ${styles.savePrint}`}>
          <FaPrint style={{ marginRight: '8px' }} /> <span>KHÁM BỆNH</span>
        </button>
        <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
          <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
        </button>
      </div>
      <div className={styles.formSection}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin bệnh nhân</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Mã bệnh nhân</label>
                <input
                  type="text"
                  name="receiptId"
                  value={formData.patientCode}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Họ và tên</label>
                <input
                  type="text"
                  name="receiptId"
                  value={formData.patientName}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ngày sinh</label>
                <input
                  type="text"
                  name="receiptId"
                  value={formData.bod}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>CCCD</label>
                <input
                  type="text"
                  name="receiptId"
                  value={formData.cccd}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
            </div>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Giới tính</label>
                <input
                  type="text"
                  name="receiptId"
                  value={formData.gender}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="receiptId"
                  value={formData.address}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="receiptId"
                  value={formData.phone}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mã số BHYT</label>
                <input
                  type="text"
                  name="receiptId"
                  value={formData.maBHYT}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className={styles.formSection}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin phiếu</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Mã đơn tiếp nhận</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.receptionCode}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ngày khám</label>
                <input
                  type="text"
                  name="visitDate"
                  value={formData.ngayHen}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
            </div>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Lý do khám</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phòng khám</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.room}
                  disabled
                  style={{ backgroundColor: '#e3f5ff' }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Modal Confirm */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận khám bệnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Xác nhận khám bệnh cho bệnh nhân này?</p>
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

export default ViewDon;

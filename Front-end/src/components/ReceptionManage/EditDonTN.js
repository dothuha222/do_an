

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { getAllDon } from '../Services/BacSiService';
import { getAllPK, capNhatDTN } from '../Services/LeTanService';

import { Link } from 'react-router-dom';

const EditDonTN = ({userId}) => {
  const {id} = useParams();
  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [phongKhams, setPhongKhams] = useState([]); 
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
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
            ngayHen: formatDate(matchedData.thoiGian),
            patientId: matchedData.benh_nhan.nguoi_dung_id,
            receptionId: matchedData.don_tiep_nhan_id
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

  const handlePKChange = (event) => {
    const selectedId = event.target.value; // Lấy id từ value của <option>
    setSelectedRoomId(selectedId);
    setErrors((prevErrors) => ({ ...prevErrors, room: "" })); // Xóa lỗi nếu có
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

   const handleSaveAndPrint = (e) => {
        e.preventDefault();
      console.log(formData);
      const payload = { 
        thoiGian: formData.ngayHen,
        cccd: formData.cccd,
        benh_nhan_id: formData.patientId,
        le_tan_id: userId,
        ly_do_kham: formData.reason,
        phong_kham_id: selectedRoomId,
        trang_thai_don_id: 3
      }
      console.log(payload);
      capNhatDTN(formData.receptionId,payload)
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
    navigator('/reception-list')
  };

  if (!formData) {
    return <div>Dữ liệu không tồn tại</div>;
  }

  return (
    <div className={styles.receptionForm} style={{marginTop: '30px'}}>
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
              
            </div>
            <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Lý do khám <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className={styles.formGroup}>
                <label>Phòng khám</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.room}
                />
              </div> */}
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
      <div className={styles.buttons}>
           <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
             <FaPrint style={{ marginRight: '8px' }} /> <span>LƯU</span>
           </button>
           <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
             <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
           </button>
         </div>
    </div>
  );
};

export default EditDonTN;

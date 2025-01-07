

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReceptionManage/ReceptionForm.module.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
// import { createReception, getReception,updateReception } from '../Services/PatientService';
import { useParams } from 'react-router-dom';
import { createDontiepnhan, getAllPK } from '../Services/LeTanService';


const ReceptionForm = ({userId}) => {

  const [formData, setFormData] = useState({
    ly_do_kham: '',
    cccd: '',
    le_tan_id: userId,
    phong_kham_id: '',
    trang_thai_don_id: 3,
  });
  const [phongKhams, setPhongKhams] = useState([]); 
  // const [selectedRoom, setSelectedRoom] = useState("")
  const [selectedRoomId, setSelectedRoomId] = useState("");
  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({
        ...prev,
        le_tan_id: userId, 
      }));
    }
  }, [userId]);

  const {id} = useParams();

  console.log(formData)

  const navigator = useNavigate();
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

// const handlePKChange = (event) => {
//   const { name, value } = event.target;
//   setSelectedRoom(value);
//   setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Xóa lỗi nếu có
// };

const handlePKChange = (event) => {
  const selectedId = event.target.value; // Lấy id từ value của <option>
  setSelectedRoomId(selectedId);
  setErrors((prevErrors) => ({ ...prevErrors, room: "" })); // Xóa lỗi nếu có
};

  const handleSaveAndPrint = (e) => {
     e.preventDefault();
    console.log(formData);
    const payload = { 
      ...formData,
      phong_kham_id: selectedRoomId
    }
    createDontiepnhan(payload).then(response => {
      alert('Gui thanh cong!')
      console.log(response.data)
      navigator('/reception-list')
      setFormData
            ({
              ly_do_kham: '',
              cccd: '',
              le_tan_id: '',
              phong_kham_id: '',
              trang_thai_don_id: 4,
            });
    })
    .catch(error => {
        console.error(error)
        alert('Không tìm thấy bệnh nhân, kiểm tra lại số CCCD')
    })
    // let validationErrors = {};
    // if (!formData.fullName) validationErrors.fullName = 'Họ và tên là bắt buộc';
    // if (!formData.birthDate) validationErrors.birthDate = 'Ngày sinh là bắt buộc';
    // if (!formData.cccd) validationErrors.cccd = 'CCCD là bắt buộc';
    // if (!formData.gender) validationErrors.gender = 'Giới tính là bắt buộc';
    // if (!formData.address) validationErrors.address = 'Địa chỉ là bắt buộc';
    // if (!formData.reason) validationErrors.reason = 'Lý do khám là bắt buộc';
    // if (!formData.room) validationErrors.room = 'Phòng khám là bắt buộc';
    // if (!formData.phoneNumber) validationErrors.phoneNumber = 'Số điện thoại là bắt buộc';

    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    // else{
    //   // setErrors({})
    //   e.preventDefault();
    //   if(id){
    //     updateReception(id, formData).then((response) => {
    //       console.log(response.data)
    //       navigator('/reception-list')
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })
    //     console.log('da sua')
    //   }
    //   else{
    //     createReception(formData).then((response) => {
    //       console.log(response.data)
    //       navigator('/reception-list')
    //       setFormData
    //         ({
    //           // patientId: '',
    //           fullName: '',
    //           birthDate: '',
    //           cccd: '',
    //           gender: '',
    //           address: '',
    //           reason: '',
    //           room: '',
    //           phoneNumber: '', 
    //           bhytCode: '',
    //         });
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })
    //     console.log("da luu")
    //   }
    // }
  };

  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    setFormData
            ({
              ly_do_kham: '',
              cccd: '',
              le_tan_id: '',
              phong_kham_id: '',
              trang_thai_don_id: 4,
            });
    setShowConfirmModal(false);
  };
  console.log(selectedRoomId)


  return (
    <div className={styles.receptionForm}>
        <div className={styles.buttons}>
          <button onClick={handleSaveAndPrint} className={`${styles.btn} ${styles.savePrint}`}>
            <FaPrint style={{ marginRight: '8px' }} /> <span>LƯU VÀ IN PHIẾU</span>
          </button>
          <button onClick={handleCancel} className={`${styles.btn} ${styles.cancel}`}>
            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
          </button>
        </div>

      <div className={styles.formSection}>
        <form>
          <h3 className={styles.formSectionTitle}>Thông tin phiếu</h3>
          <div className={styles.formFlex}>
            <div className={styles.formFlex1}>
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
                <label>Lý do khám <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  name="ly_do_kham"
                  value={formData.ly_do_kham}
                  onChange={handleInputChange}
                />
                {errors.ly_do_kham && <span className={styles.error}>{errors.ly_do_kham}</span>}
              </div>
            </div>
            {/* <div className={styles.formFlex1}>
              <div className={styles.formGroup}>
                <label>Phòng khám <span style={{ color: 'red' }}>*</span></label>
                <select
                  name="room"
                  onChange={handleInputChange}
                >
                  <option value="">Chọn phòng khám</option>
                  <option value="101A">Phòng khám 101A</option>
                  <option value="102B">Phòng khám 102B</option>
                  <option value="103C">Phòng khám 103C</option>
                </select>
                {errors.room && <span className={styles.error}>{errors.room}</span>}
              </div>
            </div> */}
            <div className={styles.formFlex1}>
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

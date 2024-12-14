

import React, { useState } from 'react';
import styles from '../../css/ReceptionManage/InvoiceForm.module.css'; // Import CSS styles
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
// import DatePicker from 'react-datepicker'; // Import DatePicker
// import {
//     TextField,
//     Button,
//     IconButton,
//     Autocomplete,
//     Grid,
//     Box,
//   } from "@mui/material";
// import { MdDelete, MdAdd } from "react-icons/md"
  
const InvoiceForm = () => {
    const invoiceData = {
        patientId: 'BN001',
        patientName: 'Nguyễn Văn A',
        visitDate: '2024-12-10',
        hasBHYT: true,
        items: [
          {
            groupName: 'Dịch vụ khám',
            services: [
              {
                name: 'Khám nội',
                unit: 'Lần',
                quantity: 1,
                collectedQuantity: 1,
                unitPrice: 10000,
                totalPrice: 10000,
              },
            ],
            medicines: [],
          },
          {
            groupName: 'Thuốc',
          services: [],
          medicines: [
            {
              name: 'ACERONKO 4mg',
              unit: 'Viên',
              quantity: 33,
              collectedQuantity: 15,
              unitPrice: 4000,
              totalPrice: 60000,
            },
            {
              name: 'Natri clorid 0.45% 500ml',
              unit: 'Chai',
              quantity: 14,
              collectedQuantity: 14,
              unitPrice: 1100000,
              totalPrice: 15400000,
            },
          ],
        },
      ],
    };
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        temperature: '',
        breathingRate: '',
        pulse: '',
        bloodPressure: '',
        reason: 'Đau mỏi vai gáy',
        medicalHistory: '',
        preliminaryDiagnosis: '',
        generalExamination: '',
        specificExamination: '',
        service: '',
        summary: 'Đau dạ dày',
        loidan:''
    });
    
   // Calculate total amount
   const calculateTotalAmount = () => {
      return invoiceData.items.reduce((total, item) => {
      const serviceTotal = item.services.reduce((sum, service) => sum + service.totalPrice, 0);
      const medicineTotal = item.medicines ? item.medicines.reduce((sum, medicine) => sum + medicine.totalPrice, 0) : 0;
      return total + serviceTotal + medicineTotal;
    }, 0);
  };

    const totalAmount = calculateTotalAmount();
    // Calculate BHYT support
    const calculateBHYTSupport = () => {
        return invoiceData.hasBHYT ? totalAmount * 0.8 : 0;
    };

    const bhytSupport = calculateBHYTSupport();

    // Calculate final payment
    const totalPayment = totalAmount - bhytSupport;

    const [endTime, setEndTime] = useState(null);
    const [startTime] = useState(new Date());
    
    const patientData = [
        { id: 'BN001', name: 'Nguyễn Quỳnh Lan', dob: '02/09/1990', gender: 'Nữ' }
    ];
    const letanData = [
        { id: 'BN001', name: 'Đỗ Thu Hà', dob: '02/09/1990', gender: 'Nữ' }
    ];

    const trangthaiHoaDon = [
        { id: 'BN001',name:'Chưa thanh toán', department: 'ABC', doctorName: 'Nguyễn Văn B'}
    ];

    const formatDate = (date) => {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const yyyy = date.getFullYear();
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
    };


    const handleSaveAndPrint = () => {
        const end = new Date();
        setEndTime(end);
        // Show modal for confirmation
        if (window.confirm("Xác nhận lưu và in phiếu?")) {
            alert(`Lưu thành công!\nThời gian bắt đầu:  ${formatDate(startTime)}\nThời gian thanh toán: ${formatDate(end)}`);;
        }
    };

    const handleCancel = () => {
        if (window.confirm("Xác nhận hủy đơn khám bệnh?")) {
            setFormData({
                weight: '',
                height: '',
                temperature: '',
                breathingRate: '',
                pulse: '',
                bloodPressure: '',
                reason: '',
                medicalHistory: '',
                preliminaryDiagnosis: '',
                generalExamination: '',
                specificExamination: '',
                service: '',
                summary: 'Đau dạ dày',
            });
        }
    };
    

    return (
        <div className={styles.healthForm}>
            <div className={styles.healthFormA}>
                <div className={styles.formSection} style={{ padding: "8px 20px", width: "30%", backgroundColor:"#e1e9f4" }}>
                    <h3 className={styles.formSectionTitle}>Thông tin bệnh nhân</h3>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Mã BN:</label>
                        <input className={styles.formInput} type="text" value={patientData[0].id} readOnly />
                    </div>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Họ và tên:</label>
                        <input className={styles.formInput} type="text" value={patientData[0].name} readOnly />
                    </div>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Ngày sinh:</label>
                        <input className={styles.formInput} type="text" value={patientData[0].dob} readOnly />
                    </div>
                    <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                        <label className={styles.formLabel}>Giới tính:</label>
                        <input className={styles.formInput} type="text" value={patientData[0].gender} readOnly />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-start', justifyContent: 'space-between', width:'69%' }}>
                    <div className={styles.formSectionB} style={{ fontSize: '14px', width: '100%' , padding: '16px 30px 3px', backgroundColor:'#588ad726'}}>
                        <div className={styles.formGroupA}>
                            <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                                <label className={styles.formLabel}>Lễ tân:</label>
                                <input className={styles.formInput} type="text" value={letanData[0].name} readOnly />
                            </div>
                        
                            <div className={styles.formGroup} style={{ marginBottom: "8px", alignItems:"stretch" , width: '100%' }}>
                                <label className={styles.formLabel}>Thời gian bắt đầu khám:</label>
                                <p className={styles.formSectionP}> {formatDate(startTime)}</p>
                                {endTime && <p>Thời gian kết thúc khám: {formatDate(endTime)}</p>}
                            </div>
                        </div>
                        <div className={styles.formGroupA}>
                            <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                                <label className={styles.formLabel}>Trạng thái:</label>
                                <input className={styles.formInput} style={{ fontWeight: "600", color: "blue", fontSize: "14px"}} type="text" value={trangthaiHoaDon[0].name} readOnly />
                            </div>
                        
                            <div className={styles.formGroup} style={{ marginBottom: "8px", width: '100%', alignItems:"stretch" }}>
                                <label className={styles.formLabel}>Thời gian thanh toán:</label>
                                <p className={styles.formSectionP}> {formatDate(startTime)}</p>
                                {endTime && <p>Thời gian kết thúc khám: {formatDate(endTime)}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.savePrint} onClick={handleSaveAndPrint}>
                            <FaPrint style={{ marginRight: '8px' }} /> <span>LƯU VÀ IN PHIẾU</span>
                        </button>
                        <button className={styles.cancel} onClick={handleCancel}>
                            <FaTimes style={{ marginRight: '8px' }} /> <span>HỦY</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.formSection} style={{ marginTop: '0px', marginBottom: '20px'}}>
                <h3 className={styles.formSectionTitle}>Thông tin hóa đơn</h3>
                {/* Invoice Table */}
                <table className={styles.invoiceTable}>
                    <thead>
                    <tr>
                        <th>Nội dung</th>
                        <th>ĐVT</th>
                        <th>SL</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoiceData.items.map((item, index) => (
                        <React.Fragment key={index}>
                        <tr>
                            <td colSpan="6" className={styles.groupHeader}>{item.groupName}</td>
                        </tr>
                        {item.services.map((service, serviceIndex) => (
                            <tr key={serviceIndex}>
                            <td>{service.name}</td>
                            <td>{service.unit}</td>
                            <td>{service.quantity}</td>
                            <td>{service.unitPrice.toLocaleString()}</td>
                            <td>{service.totalPrice.toLocaleString()}</td>
                            </tr>
                        ))}
                        {item.medicines && item.medicines.map((medicine, medicineIndex) => (
                            <tr key={medicineIndex}>
                            <td>{medicine.name}</td>
                            <td>{medicine.unit}</td>
                            <td>{medicine.quantity}</td>
                            <td>{medicine.unitPrice.toLocaleString()}</td>
                            <td>{medicine.totalPrice.toLocaleString()}</td>
                            </tr>
                        ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                {/* Total Amount */}
                <div className={styles.totalAmount}>
                    <label>Tổng cộng:</label>
                    <span>{totalAmount.toLocaleString()} VNĐ</span>
                </div>
                {/* BHYT Support */}
                <div className={styles.BHChiTra}>
                    <label>BHYT chi trả:</label>
                    <span>{bhytSupport.toLocaleString()} VNĐ</span>
                </div>

                {/* Final Payment */}
                <div className={styles.finalPayment}>
                    <label>Tổng thanh toán:</label>
                    <span>{totalPayment.toLocaleString()} VNĐ</span>
                </div>
            </div>
        </div>
    );
};

export default InvoiceForm;


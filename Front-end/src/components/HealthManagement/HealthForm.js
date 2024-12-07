// import React, { useState } from 'react';
// import styles from '../../css/HealthManagement/HealthForm.module.css'; // Import CSS styles

// const HealthForm = () => {
//     const [formData, setFormData] = useState({
//         weight: '',
//         height: '',
//         temperature: '',
//         breathingRate: '',
//         pulse: '',
//         bloodPressure: '',
//         reason: '',
//         medicalHistory: '',
//         preliminaryDiagnosis: '',
//         generalExamination: '',
//         specificExamination: '',
//         service: '',
//         summary: '',
//     });

//     const [errors, setErrors] = useState({});
//     const [startTime] = useState(new Date());

//     const patientData = [
//         { id: 'BN001', name: 'Nguyễn Quỳnh Lan', dob: '02/09/1990', gender: 'Nữ' }
//     ];

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.weight) newErrors.weight = 'Cân nặng là bắt buộc';
//         if (!formData.height) newErrors.height = 'Chiều cao là bắt buộc';
//         if (!formData.temperature) newErrors.temperature = 'Nhiệt độ là bắt buộc';
//         if (!formData.breathingRate) newErrors.breathingRate = 'Nhịp thở là bắt buộc';
//         if (!formData.pulse) newErrors.pulse = 'Mạch là bắt buộc';
//         if (!formData.bloodPressure) newErrors.bloodPressure = 'Huyết áp là bắt buộc';
//         return newErrors;
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSaveAndPrint = () => {
//         const newErrors = validateForm();
//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//         } else {
//             const endTime = new Date();
//             // Show modal for confirmation
//             if (window.confirm("Xác nhận lưu và in phiếu?")) {
//                 alert(`Lưu thành công!\nThời gian bắt đầu: ${startTime}\nThời gian kết thúc: ${endTime}`);
//             }
//         }
//     };

//     const handleCancel = () => {
//         if (window.confirm("Xác nhận hủy đơn khám bệnh?")) {
//             setFormData({
//                 weight: '',
//                 height: '',
//                 temperature: '',
//                 breathingRate: '',
//                 pulse: '',
//                 bloodPressure: '',
//                 reason: '',
//                 medicalHistory: '',
//                 preliminaryDiagnosis: '',
//                 generalExamination: '',
//                 specificExamination: '',
//                 service: '',
//                 summary: '',
//             });
//         }
//     };

//     return (
//         <div className={styles.receptionForm}>
//             <div className={styles.formSection}>
//                 <h3 className={styles.formSectionTitle}>Thông tin bệnh nhân</h3>
//                 <div className={styles.formGroup}>
//                     <label>Mã BN</label>
//                     <input type="text" value={patientData[0].id} readOnly />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label>Họ và tên</label>
//                     <input type="text" value={patientData[0].name} readOnly />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label>Ngày sinh</label>
//                     <input type="text" value={patientData[0].dob} readOnly />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label>Giới tính</label>
//                     <input type="text" value={patientData[0].gender} readOnly />
//                 </div>
//             </div>
            
//             <div className={styles.formFlex}>
//                 <div>
//                     <h3 className={styles.formSectionTitle}>Thông tin phòng khám</h3>
//                     <p>Phòng khám: ABC</p>
//                     <p>Bác sĩ thực hiện: Dr. XYZ</p>
//                     <p>Thời gian bắt đầu: {startTime.toLocaleString()}</p>
//                 </div>
//                 <div className={styles.buttons}>
//                     <button className={styles.savePrint} onClick={handleSaveAndPrint}>LƯU VÀ IN PHIẾU</button>
//                     <button className={styles.cancel} onClick={handleCancel}>HỦY</button>
//                 </div>
//             </div>

//             <div className={styles.formSection}>
//                 <h3 className={styles.formSectionTitle}>Thông tin khám bệnh</h3>
//                 <div>
//                     <h4>Chỉ số khám bệnh</h4>
//                     <div className={styles.formGroup}>
//                         <label>Cân nặng (kg)</label>
//                         <input
//                             type="text"
//                             placeholder="kg"
//                             name="weight"
//                             value={formData.weight}
//                             onChange={handleInputChange}
//                         />
//                         {errors.weight && <span className={styles.error}>{errors.weight}</span>}
//                     </div>
//                     {/* Repeat for other inputs */}
//                 </div>

//                 <div className={styles.formFlex}>
//                     <div className={styles.formFlex1}>
//                         <label>Lý do khám bệnh</label>
//                         <input
//                             type="text"
//                             name="reason"
//                             disabled
//                             value={formData.reason}
//                         />
//                     </div>
//                     {/* Repeat for A2 */}
//                 </div>

//                 <h4>Tóm tắt kết quả khám bệnh</h4>
//                 <textarea
//                     name="summary"
//                     value={formData.summary}
//                     onChange={handleInputChange}
//                 />
//             </div>
//         </div>
//     );
// };

// export default HealthForm;

import React, { useState } from 'react';
import styles from '../../css/HealthManagement/HealthForm.module.css'; // Import CSS styles
import { FaPrint } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const HealthForm = () => {
    const [formData, setFormData] = useState({
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
        summary: '',
    });

    const [errors, setErrors] = useState({});
    const [startTime] = useState(new Date());
    const [endTime, setEndTime] = useState(null);

    const patientData = [
        { id: 'BN001', name: 'Nguyễn Quỳnh Lan', dob: '02/09/1990', gender: 'Nữ' }
    ];
    const clinicData = [
        { id: 'BN001', department: 'ABC', doctorName: 'Nguyễn Văn B'}
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.weight) newErrors.weight = 'Cân nặng là bắt buộc';
        if (!formData.height) newErrors.height = 'Chiều cao là bắt buộc';
        if (!formData.temperature) newErrors.temperature = 'Nhiệt độ là bắt buộc';
        if (!formData.breathingRate) newErrors.breathingRate = 'Nhịp thở là bắt buộc';
        if (!formData.pulse) newErrors.pulse = 'Mạch là bắt buộc';
        if (!formData.bloodPressure) newErrors.bloodPressure = 'Huyết áp là bắt buộc';
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveAndPrint = () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const end = new Date();
            setEndTime(end);
            // Show modal for confirmation
            if (window.confirm("Xác nhận lưu và in phiếu?")) {
                alert(`Lưu thành công!\nThời gian bắt đầu:  ${startTime.toLocaleString()}\nThời gian kết thúc: ${end.toLocaleString()}`);
            }
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
                summary: '',
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
                    <div className={styles.formSection} style={{ fontSize: '14px', width: '100%' , padding: '10px 20px', backgroundColor:'#588ad726'}}>
                        <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                            <label className={styles.formLabel}>Phòng khám:</label>
                            <input className={styles.formInput} type="text" value={clinicData[0].department} readOnly />
                        </div>
                        <div className={styles.formGroup} style={{ marginBottom: "8px" }}>
                            <label className={styles.formLabel}>Bác sĩ thực hiện:</label>
                            <input className={styles.formInput} type="text" value={clinicData[0].doctorName} readOnly />
                        </div>
                        <div className={styles.formGroup} style={{ marginBottom: "8px", alignItems:"stretch" }}>
                            <label className={styles.formLabel}>Thời gian bắt đầu khám:</label>
                            <p className={styles.formSectionP}> {startTime.toLocaleString()}</p>
                            {endTime && <p>Thời gian kết thúc khám: {endTime.toLocaleString()}</p>}
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

            <div className={styles.formSection} style={{ marginTop: '0px', marginBottom: '0px'}}>
                <h3 className={styles.formSectionTitle}>Thông tin khám bệnh</h3>
                <div className={styles.formFlex}
                >
                    <div className={styles.formGroup}>
                        <span className={styles.formChiSo}>Chỉ số</span>
                    </div>
                    <div className={styles.formColumn}>
                        <label>Cân nặng (kg)</label>
                        <input
                            type="text"
                            placeholder="kg"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.weight && <span className={styles.error}>{errors.weight}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Chiều cao (cm)</label>
                        <input
                            type="text"
                            placeholder="cm"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.height && <span className={styles.error}>{errors.height}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Nhiệt độ (*C)</label>
                        <input
                            type="text"
                            placeholder="°C"
                            name="temperature"
                            value={formData.temperature}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.temperature && <span className={styles.error}>{errors.temperature}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Nhịp thở</label>
                        <input
                            type="text"
                            placeholder="lần/phút"
                            name="breathingRate"
                            value={formData.breathingRate}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.breathingRate && <span className={styles.error}>{errors.breathingRate}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Mạch</label>
                        <input
                            type="text"
                            placeholder="lần/phút"
                            name="pulse"
                            value={formData.pulse}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.pulse && <span className={styles.error}>{errors.pulse}</span>}
                    </div>
                    <div className={styles.formColumn}>
                        <label>Huyết áp</label>
                        <input
                            type="text"
                            name="bloodPressure"
                            value={formData.bloodPressure}
                            onChange={handleInputChange}
                            className={styles.formGroupInput}
                        />
                        {errors.bloodPressure && <span className={styles.error}>{errors.bloodPressure}</span>}
                    </div>
                </div>
                <div className={styles.formFlexGroup}>
                    <div className={styles.formFlexGroupA}>
                        <div className={styles.formGroup}>
                            <label>Lý do khám bệnh</label>
                            <input
                                type="text"
                                name="reason"
                                disabled
                                value={formData.reason}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Tiền sử bệnh</label>
                            <input
                                type="text"
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Chẩn đoán ban đầu</label>
                            <input
                                type="text"
                                name="preliminaryDiagnosis"
                                value={formData.preliminaryDiagnosis}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className={styles.formFlexGroupA}>
                        <div className={styles.formGroup}>
                            <label>Khám toàn thân</label>
                            <input
                                type="text"
                                name="generalExamination"
                                value={formData.generalExamination}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Khám bộ phận</label>
                            <input
                                type="text"
                                name="specificExamination"
                                value={formData.specificExamination}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Chỉ định dịch vụ</label>
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                            >
                                <option value="">Chọn dịch vụ</option>
                                <option value="Xét nghiệm">Xét nghiệm</option>
                                <option value="Chụp X-Quang">Chụp X-Quang</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label>Tóm tắt kết quả khám bệnh</label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default HealthForm;


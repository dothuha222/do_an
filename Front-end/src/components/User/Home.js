import React, { useState, useEffect } from 'react';
import styles from '../../css/User/Home.module.css';
import clinic from "../../img/clinic.jpg"; // Đường dẫn tương đối từ file hiện tại
import intro1 from "../../img/intro1.png"
import intro2 from "../../img/intro2.png"
import intro3 from "../../img/intro3.png"
import intro4 from "../../img/intro4.png"
import csvc1 from "../../img/csvc1.jpg"
import csvc2 from "../../img/csvc2.jpg"
import csvc3 from "../../img/csvc3.jpg"
import csvc4 from "../../img/csvc4.jpg"
import logo from "../../img/logo.png"
import ct from "../../img/congthuong.png"
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import fb from "../../img/fb.png"
import yt from "../../img/youtube.png"
import visa from "../../img/visa.png"
import mt from "../../img/mastercard.png"
import tienmat from "../../img/cash.png"
import slide1 from "../../img/slide1.jpg"
import slide2 from "../../img/slide2.jpg"
import slide3 from "../../img/slide3.jpg"

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: slide1, alt: 'Welcome to our clinic' },
    { src: slide3, alt: 'Advanced healthcare services' },
    { src: slide2, alt: 'State-of-the-art facilities' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  return (
    <div className={styles.homePage}>
    {/* Slidebar */}
    <div className={styles.slider}>
      <button className={styles.prevButton} onClick={handlePrev}>&lt;</button>
      <div className={styles.slideContainer} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <img
            key={index}
            className={styles.slideImage}
            src={slide.src}
            alt={slide.alt}
          />
        ))}
      </div>
      <button className={styles.nextButton} onClick={handleNext}>&gt;</button>
    </div>

    {/* Introduction */}
    <div className={styles.introduction}>
        <div className={styles.container}>
            <section className={styles.section}>
                <h2>VỀ CHÚNG TÔI</h2>
                <div className={styles.aboutUs}>
                    <ul style={{width:'50%'}}>
                        <li>Phòng khám tư nhân thành lập năm 2002, ban đầu đối mặt với nhiều khó khăn về cơ sở vật chất và nhân lực. Tuy nhiên, bệnh viện đã không ngừng nâng cao chất lượng khám chữa bệnh, đầu tư trang thiết bị hiện đại và áp dụng công nghệ y học tiên tiến. 
                        </li>
                        <li>Phòng khám tư nhân thành lập năm 2002, ban đầu đối mặt với nhiều khó khăn về cơ sở vật chất và nhân lực. Tuy nhiên, bệnh viện đã không ngừng nâng cao chất lượng khám chữa bệnh, đầu tư trang thiết bị hiện đại và áp dụng công nghệ y học tiên tiến. 
                        </li>
                    </ul>
                    <div style={{width:'45%'}}>
                        <img src={clinic} alt="clinic" style={{width:'100%', borderRadius: "16px", boxShadow:"5px 9px 16px #ccc"}} />
                    </div>
                </div>
            </section>
            <section className={styles.sectionA}>
                <div className={styles.intro}>
                    <div className={styles.introA}>
                        <div className={styles.imgIntroA}>
                            <img src={intro1} alt="intro1"/>
                        </div>
                        <div className={styles.spanIntroA}>
                            <span>18</span>
                            <span>+</span>
                        </div>
                        <div className={styles.spanIntroB}>
                            <p>Chuyên khoa</p>
                        </div>
                    </div>
                    <div className={styles.introA}>
                        <div className={styles.imgIntroA}>
                            <img src={intro2} alt="intro1"/>
                        </div>
                        <div className={styles.spanIntroA}>
                            <span>400</span>
                            <span>+</span>
                        </div>
                        <div className={styles.spanIntroB}>
                            <p>Bác sĩ, y tá giỏi</p>
                        </div>
                    </div>
                    <div className={styles.introA}>
                        <div className={styles.imgIntroA}>
                            <img src={intro3} alt="intro1"/>
                        </div>
                        <div className={styles.spanIntroA}>
                            <span>100</span>
                            <span>%</span>
                        </div>
                        <div className={styles.spanIntroB}>
                            <p>Khách hàng hài lòng</p>
                        </div>
                    </div>
                    <div className={styles.introA}>
                        <div className={styles.imgIntroA}>
                            <img src={intro4} alt="intro1"/>
                        </div>
                        <div className={styles.spanIntroA}>
                            <span>22</span>
                            <span>+</span>
                        </div>
                        <div className={styles.spanIntroB}>
                            <p>Năm kinh nghiệm</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                <h2>TẦM NHÌN - SỨ MỆNH</h2>
                <div className={styles.tamnhin}>
                    <div className={styles.tamnhinA}>
                        <h3>Chất lượng hàng đầu
                        </h3>
                        <p>Với phương châm “Vì Sức Khỏe Công Đồng - Luôn Hết Lòng Phục Vụ” Bệnh viện
                            Đa khoa Cửa Đông phấn đấu cung cấp những dịch vụ đạt tiêu chuẩn quốc tế cho bệnh nhân nhằm đáp ứng nhu cầu khám chữa bệnh cao cấp hiện nay.</p>
                    </div>
                    <div className={styles.tamnhinA}>
                        <h3>Môi trường thân thiện
                        </h3>
                        <p>Luôn đặt bệnh nhân làm ưu tiên hàng đầu và đem lại môi trường khám chữa bệnh thân thiện, hiệu quả với những thiết bị y khoa hiện đại, phấn đấu xây dựng và trở thành bệnh viện: Uy tín - Niềm tin - Chất lượng của người bệnh.</p>
                    </div>
                    <div className={styles.tamnhinA}>
                        <h3>Vươn tầm quốc tế
                        </h3>
                        <p>Bệnh viện Đa khoa Cửa Đông định hướng phát triển trở thành đơn vị y tế hàng đầu khu vực và vươn tầm quốc tế, đem đến các dịch vụ đẳng cấp, góp phần nâng cao chất lượng sống của người Việt.</p>
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                <h2>CƠ SỞ VẬT CHẤT HIỆN ĐẠI</h2>
                <p>
                Về trang thiết bị, Bệnh viện đầu tư máy chụp cộng hưởng từ MRI 3.0 Tesla (0.4T), 02 máy chụp cắt lớp vi tính CT Scaner (16 lát cắt và 128 lát cắt), 4 máy chụp X.Quang Kỹ thuật số của Mỹ, 09 máy siêu âm màu, 04 máy nội soi dạ dày- đại tràng-trực tràng, 02 máy tán sỏi ngoài cơ thể, 01 máy tán sỏi ngược dòng bằng Lazer, 01 buồng điều trị Oxy cao áp, 20 ghế răng nha khoa hiện đại của Nhật, máy điện tim, máy điện não, máy siêu âm đo độ loãng xương…
                </p>
                <div className={styles.coSo}>
                    <div className={styles.coSoA}>
                        <div className={styles.coSoAImg}>
                            <img src={csvc1} alt="intro1"/>
                        </div>
                        <h4>Máy chụp cộng hưởng từ MRI 3.0 Tesla</h4>
                    </div>
                    <div className={styles.coSoA}>
                        <div className={styles.coSoAImg}>
                            <img src={csvc2} alt="intro1"/>
                        </div>
                        <h4>Máy chụp cắt lớp vi tính CT Scanner 128 dãy </h4>
                    </div>
                    <div className={styles.coSoA}>
                        <div className={styles.coSoAImg}>
                            <img src={csvc3} alt="intro1"/>
                        </div>
                        <h4>Labo Xét nghiệm hiện đại</h4>
                    </div>
                    <div className={styles.coSoA}>
                        <div className={styles.coSoAImg}>
                            <img src={csvc4} alt="intro1"/>
                        </div>
                        <h4>Trung tâm nội soi tiêu hóa đạt chuẩn</h4>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <div className={styles.footer}>
        <div className={styles.footerItem}>
            <div className={styles.footerItemTitle} style={{alignItems: "center"}}>
                <img src={logo} alt="logo"/>
                <span className={styles.footerSpan}>HỆ THỐNG QUẢN LÝ PHÒNG KHÁM TƯ NHÂN</span>
            </div>
            <div className={styles.footerItemTitle}>
                <span> <FaMapMarkerAlt /></span>
                <span style={{marginLeft: "8px"}}>Số 666, Đường Lạc Long Quân, phường Nhật Tân, quận Tây Hồ, Hà Nội</span>
            </div>
            <div className={styles.footerItemTitle}>
                <span><FaPhoneAlt /></span>
                <span style={{marginLeft: "8px"}}>0288.666.999</span>
            </div>
            <div className={styles.footerItemTitle}>
                <span><FaEnvelope /></span>
                <span style={{marginLeft: "8px"}}>htqlypkham@gmail.com</span>
            </div>
            <div className={styles.footerItemTitle}>
                <img src = {ct} style={{width: "44%"}}/>
            </div>
        </div>
        <div className={styles.footerItem} style={{marginTop: "10px", marginLeft:'60px'}}>
            <div className={styles.footerItemTitle}>
                <span className={styles.footerSpan}>CHĂM SÓC KHÁCH HÀNG</span>
            </div>
            <div className={styles.footerItemTitleA}>
                <span>Chính sách bảo mật</span>
                <span>Hướng dẫn thanh toán</span>
                <span>Trung tâm trợ giúp</span>
                <span>Câu hỏi thường gặp</span>
            </div>
        </div>
        <div className={styles.footerItem}>
            <div className={styles.footerItemTitle} style={{marginTop: "20px"}}>
                <span className={styles.footerSpan}>KẾT NỐI VỚI PHÒNG KHÁM</span>
            </div>
            <div className={styles.footerItemTitleB}>
                <img src = {fb}/>
                <img src = {yt}/>
            </div>
            <div className={styles.footerItemTitle} style={{alignItems:"center"}}>
                <span className={styles.footerSpan} style={{marginRight:"6px"}}>THANH TOÁN</span>
                <div className={styles.imgWrapper}>
                    <img src = {visa}/>
                    <img src = {mt}/>
                    <img src = {tienmat}/>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
};

export default Home;

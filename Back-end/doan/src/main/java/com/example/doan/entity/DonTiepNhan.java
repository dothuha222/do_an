package com.example.doan.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "don_tiep_nhan")
public class DonTiepNhan {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "don_tiep_nhan_id")
	private Integer don_tiep_nhan_id;

	@Column(name = "thoi_gian")
	private Date date;

	@Column(name = "ly_do_kham")
	private String ly_do_kham;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "benh_nhan_id")
	private BenhNhan benh_nhan;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "nguoi_dung_id")
	private LeTan leTan;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "phong_kham_id")
	private PhongKham phong_kham;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "trang_thai_don_id")
	private TrangThaiDon trang_thai_don;

	public DonTiepNhan(Integer don_tiep_nhan_id, Date date, String ly_do_kham, BenhNhan benh_nhan, LeTan leTan,
			PhongKham phong_kham, TrangThaiDon trang_thai_don) {
		super();
		this.don_tiep_nhan_id = don_tiep_nhan_id;
		this.date = date;
		this.ly_do_kham = ly_do_kham;
		this.benh_nhan = benh_nhan;
		this.leTan = leTan;
		this.phong_kham = phong_kham;
		this.trang_thai_don = trang_thai_don;
	}

	public Integer getDon_tiep_nhan_id() {
		return don_tiep_nhan_id;
	}

	public void setDon_tiep_nhan_id(Integer don_tiep_nhan_id) {
		this.don_tiep_nhan_id = don_tiep_nhan_id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getLy_do_kham() {
		return ly_do_kham;
	}

	public void setLy_do_kham(String ly_do_kham) {
		this.ly_do_kham = ly_do_kham;
	}

	public BenhNhan getBenh_nhan() {
		return benh_nhan;
	}

	public void setBenh_nhan(BenhNhan benh_nhan) {
		this.benh_nhan = benh_nhan;
	}

	public LeTan getLeTan() {
		return leTan;
	}

	public void setLeTan(LeTan leTan) {
		this.leTan = leTan;
	}

	public PhongKham getPhong_kham() {
		return phong_kham;
	}

	public void setPhong_kham(PhongKham phong_kham) {
		this.phong_kham = phong_kham;
	}

	public TrangThaiDon getTrang_thai_don() {
		return trang_thai_don;
	}

	public void setTrang_thai_don(TrangThaiDon trang_thai_don) {
		this.trang_thai_don = trang_thai_don;
	}

	@Override
	public String toString() {
		return "DonTiepNhan [don_tiep_nhan_id=" + don_tiep_nhan_id + ", date=" + date + ", ly_do_kham=" + ly_do_kham
				+ ", benh_nhan=" + benh_nhan + ", leTan=" + leTan + ", phong_kham=" + phong_kham + ", trang_thai_don="
				+ trang_thai_don + "]";
	}

}

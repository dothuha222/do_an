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
@Table(name = "hoa_don")
public class HoaDon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hoa_don_id")
	private Integer hoa_don_id;

	@Column(name = "ma_bh")
	private String ma_bh;

	@Column(name = "giam_gia")
	private Integer giam_gia;

	@Column(name = "tong_tien")
	private Integer tong_tien;

	@Column(name = "thoi_gian")
	private Date thoi_gian;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "don_thuoc_id")
	private DonThuoc don_thuoc;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "trang_thai_hd_id")
	private TrangThaiHD trang_thai_hd;

	public HoaDon(Integer hoa_don_id, String ma_bh, Integer giam_gia, Integer tong_tien, Date thoi_gian,
			DonThuoc don_thuoc, TrangThaiHD trang_thai_hd) {
		super();
		this.hoa_don_id = hoa_don_id;
		this.ma_bh = ma_bh;
		this.giam_gia = giam_gia;
		this.tong_tien = tong_tien;
		this.thoi_gian = thoi_gian;
		this.don_thuoc = don_thuoc;
		this.trang_thai_hd = trang_thai_hd;
	}

	public Integer getHoa_don_id() {
		return hoa_don_id;
	}

	public void setHoa_don_id(Integer hoa_don_id) {
		this.hoa_don_id = hoa_don_id;
	}

	public String getMa_bh() {
		return ma_bh;
	}

	public void setMa_bh(String ma_bh) {
		this.ma_bh = ma_bh;
	}

	public Integer getGiam_gia() {
		return giam_gia;
	}

	public void setGiam_gia(Integer giam_gia) {
		this.giam_gia = giam_gia;
	}

	public Integer getTong_tien() {
		return tong_tien;
	}

	public void setTong_tien(Integer tong_tien) {
		this.tong_tien = tong_tien;
	}

	public Date getThoi_gian() {
		return thoi_gian;
	}

	public void setThoi_gian(Date thoi_gian) {
		this.thoi_gian = thoi_gian;
	}

	public DonThuoc getDon_thuoc() {
		return don_thuoc;
	}

	public void setDon_thuoc(DonThuoc don_thuoc) {
		this.don_thuoc = don_thuoc;
	}

	public TrangThaiHD getTrang_thai_hd() {
		return trang_thai_hd;
	}

	public void setTrang_thai_hd(TrangThaiHD trang_thai_hd) {
		this.trang_thai_hd = trang_thai_hd;
	}

	@Override
	public String toString() {
		return "HoaDon [hoa_don_id=" + hoa_don_id + ", ma_bh=" + ma_bh + ", giam_gia=" + giam_gia + ", tong_tien="
				+ tong_tien + ", thoi_gian=" + thoi_gian + ", don_thuoc=" + don_thuoc + ", trang_thai_hd="
				+ trang_thai_hd + "]";
	}

}

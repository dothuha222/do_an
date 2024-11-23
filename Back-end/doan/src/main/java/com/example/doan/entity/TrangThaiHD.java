package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "trang_thai_hd")
public class TrangThaiHD {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "trang_thai_hd_id")
	private Integer trang_thai_hd_id;

	@Column(name = "ten")
	private String ten;

	public TrangThaiHD(Integer trang_thai_hd_id, String ten) {
		super();
		this.trang_thai_hd_id = trang_thai_hd_id;
		this.ten = ten;
	}

	public Integer getTrang_thai_hd_id() {
		return trang_thai_hd_id;
	}

	public void setTrang_thai_hd_id(Integer trang_thai_hd_id) {
		this.trang_thai_hd_id = trang_thai_hd_id;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	@Override
	public String toString() {
		return "TrangThaiHD [trang_thai_hd_id=" + trang_thai_hd_id + ", ten=" + ten + "]";
	}

}

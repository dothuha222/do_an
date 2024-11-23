package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "thuoc")
public class Thuoc {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "thuoc_id")
	private Integer thuoc_id;

	@Column(name = "ten")
	private String ten;

	@Column(name = "don_vi")
	private String don_vi;

	@Column(name = "gia")
	private Integer gia;

	public Thuoc(Integer thuoc_id, String ten, String don_vi, Integer gia) {
		super();
		this.thuoc_id = thuoc_id;
		this.ten = ten;
		this.don_vi = don_vi;
		this.gia = gia;
	}

	public Integer getThuoc_id() {
		return thuoc_id;
	}

	public void setThuoc_id(Integer thuoc_id) {
		this.thuoc_id = thuoc_id;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public String getDon_vi() {
		return don_vi;
	}

	public void setDon_vi(String don_vi) {
		this.don_vi = don_vi;
	}

	public Integer getGia() {
		return gia;
	}

	public void setGia(Integer gia) {
		this.gia = gia;
	}

	@Override
	public String toString() {
		return "Thuoc [thuoc_id=" + thuoc_id + ", ten=" + ten + ", don_vi=" + don_vi + ", gia=" + gia + "]";
	}

}

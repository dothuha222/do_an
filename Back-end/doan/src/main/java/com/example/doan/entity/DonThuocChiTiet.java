package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "don_thuoc_chi_tiet")
@Data
public class DonThuocChiTiet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "don_thuoc_chi_tiet_id")
	private Integer don_thuoc_chi_tiet_id;

	@Column(name = "so_luong")
	private Integer so_luong;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "thuoc_id")
	private Thuoc thuoc;

	public DonThuocChiTiet(Integer don_thuoc_chi_tiet_id, Integer so_luong, Thuoc thuoc) {
		super();
		this.don_thuoc_chi_tiet_id = don_thuoc_chi_tiet_id;
		this.so_luong = so_luong;
		this.thuoc = thuoc;
	}

	public Integer getDon_thuoc_chi_tiet_id() {
		return don_thuoc_chi_tiet_id;
	}

	public void setDon_thuoc_chi_tiet_id(Integer don_thuoc_chi_tiet_id) {
		this.don_thuoc_chi_tiet_id = don_thuoc_chi_tiet_id;
	}

	public Integer getSo_luong() {
		return so_luong;
	}

	public void setSo_luong(Integer so_luong) {
		this.so_luong = so_luong;
	}

	public Thuoc getThuoc() {
		return thuoc;
	}

	public void setThuoc(Thuoc thuoc) {
		this.thuoc = thuoc;
	}

	@Override
	public String toString() {
		return "DonThuocChiTiet [don_thuoc_chi_tiet_id=" + don_thuoc_chi_tiet_id + ", so_luong=" + so_luong + ", thuoc="
				+ thuoc + "]";
	}

}

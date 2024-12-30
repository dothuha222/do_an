package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "trang_thai_don")
@Data
@NoArgsConstructor
public class TrangThaiDon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "trang_thai_don_id")
	private Integer trang_thai_don_id;

	@Column(name = "ten")
	private String ten;

	public TrangThaiDon(Integer trang_thai_don_id, String ten) {
		super();
		this.trang_thai_don_id = trang_thai_don_id;
		this.ten = ten;
	}

	public Integer getTrang_thai_don_id() {
		return trang_thai_don_id;
	}

	public void setTrang_thai_don_id(Integer trang_thai_don_id) {
		this.trang_thai_don_id = trang_thai_don_id;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	@Override
	public String toString() {
		return "TrangThaiDon [trang_thai_don_id=" + trang_thai_don_id + ", ten=" + ten + "]";
	}

}

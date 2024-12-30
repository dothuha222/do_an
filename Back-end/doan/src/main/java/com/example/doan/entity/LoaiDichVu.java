package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "loai_dich_vu")
@Data
public class LoaiDichVu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "loai_dich_vu_id")
	private Integer loai_dich_vu_id;

	@Column(name = "ten")
	private String ten;

	@Override
	public String toString() {
		return "LoaiDichVu [loai_dich_vu_id=" + loai_dich_vu_id + ", ten=" + ten + "]";
	}

	public Integer getLoai_dich_vu_id() {
		return loai_dich_vu_id;
	}

	public void setLoai_dich_vu_id(Integer loai_dich_vu_id) {
		this.loai_dich_vu_id = loai_dich_vu_id;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public LoaiDichVu(Integer loai_dich_vu_id, String ten) {
		super();
		this.loai_dich_vu_id = loai_dich_vu_id;
		this.ten = ten;
	}
}

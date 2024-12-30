package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "loai_phong_kham")
@Data
public class LoaiPhongKham {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "loai_pk_id")
	private Integer loai_pk_id;

	@Column(name = "ten")
	private String ten;

	@Column(name = "mo_ta")
	private String mo_ta;
	
	public LoaiPhongKham() {}

	public LoaiPhongKham(Integer loai_pk_id, String ten, String mo_ta) {
		super();
		this.loai_pk_id = loai_pk_id;
		this.ten = ten;
		this.mo_ta = mo_ta;
	}

	public Integer getLoai_pk_id() {
		return loai_pk_id;
	}

	public void setLoai_pk_id(Integer loai_pk_id) {
		this.loai_pk_id = loai_pk_id;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public String getMo_ta() {
		return mo_ta;
	}

	public void setMo_ta(String mo_ta) {
		this.mo_ta = mo_ta;
	}

	@Override
	public String toString() {
		return "LoaiPhongKham [loai_pk_id=" + loai_pk_id + ", ten=" + ten + ", mo_ta=" + mo_ta + "]";
	}

}

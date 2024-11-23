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

@Entity
@Table(name = "phong_kham")
public class PhongKham {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "phong_kham_id")
	private Integer phong_kham_id;

	@Column(name = "ten")
	private String ten;
	
	@Column(name = "so_benh_nhan_hien_tai")
	private Integer so_benh_nhan_hien_tai;
	
	@Column(name = "so_benh_nhan_toi_da")
	private Integer so_benh_nhan_toi_da;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "loai_pk_id")
	private LoaiPhongKham loai_pk;

	public PhongKham(Integer phong_kham_id, String ten, LoaiPhongKham loai_pk) {
		super();
		this.phong_kham_id = phong_kham_id;
		this.ten = ten;
		this.loai_pk = loai_pk;
	}

	public Integer getPhong_kham_id() {
		return phong_kham_id;
	}

	public void setPhong_kham_id(Integer phong_kham_id) {
		this.phong_kham_id = phong_kham_id;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public LoaiPhongKham getLoai_pk() {
		return loai_pk;
	}

	public void setLoai_pk(LoaiPhongKham loai_pk) {
		this.loai_pk = loai_pk;
	}

	@Override
	public String toString() {
		return "PhongKham [phong_kham_id=" + phong_kham_id + ", ten=" + ten + ", loai_pk=" + loai_pk + "]";
	}

}

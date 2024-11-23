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
@Table(name = "dich_vu")
public class DichVu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "dich_vu_id")
	private Integer dich_vu_id;

	@Column(name = "ten")
	private String ten;

	@Column(name = "gia")
	private Integer gia;

	@Column(name = "mo_ta")
	private String mo_ta;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "loai_dich_vu_id")
	private LoaiDichVu loai_dich_vu;

	public DichVu(Integer dich_vu_id, String ten, Integer gia, String mo_ta, LoaiDichVu loai_dich_vu) {
		super();
		this.dich_vu_id = dich_vu_id;
		this.ten = ten;
		this.gia = gia;
		this.mo_ta = mo_ta;
		this.loai_dich_vu = loai_dich_vu;
	}

	public Integer getDich_vu_id() {
		return dich_vu_id;
	}

	public void setDich_vu_id(Integer dich_vu_id) {
		this.dich_vu_id = dich_vu_id;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public Integer getGia() {
		return gia;
	}

	public void setGia(Integer gia) {
		this.gia = gia;
	}

	public String getMo_ta() {
		return mo_ta;
	}

	public void setMo_ta(String mo_ta) {
		this.mo_ta = mo_ta;
	}

	public LoaiDichVu getLoai_dich_vu() {
		return loai_dich_vu;
	}

	public void setLoai_dich_vu(LoaiDichVu loai_dich_vu) {
		this.loai_dich_vu = loai_dich_vu;
	}

	@Override
	public String toString() {
		return "DichVu [dich_vu_id=" + dich_vu_id + ", ten=" + ten + ", gia=" + gia + ", mo_ta=" + mo_ta
				+ ", loai_dich_vu=" + loai_dich_vu + "]";
	}

}

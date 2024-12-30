package com.example.doan.entity.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

public class DonTiepNhanDTO {
	private String ly_do_kham;
	private Integer benh_nhan_id;
	private Integer le_tan_id;
	private Integer phong_kham_id;
	private Integer trang_thai_don_id;

	public DonTiepNhanDTO() {
	}
	public DonTiepNhanDTO(String ly_do_kham, Integer benh_nhan_id, Integer le_tan_id, Integer phong_kham_id,
			Integer trang_thai_don_id) {
		super();
		this.ly_do_kham = ly_do_kham;
		this.benh_nhan_id = benh_nhan_id;
		this.le_tan_id = le_tan_id;
		this.phong_kham_id = phong_kham_id;
		this.trang_thai_don_id = trang_thai_don_id;
	}

	public String getLy_do_kham() {
		return ly_do_kham;
	}

	public void setLy_do_kham(String ly_do_kham) {
		this.ly_do_kham = ly_do_kham;
	}

	public Integer getBenh_nhan_id() {
		return benh_nhan_id;
	}

	public void setBenh_nhan_id(Integer benh_nhan_id) {
		this.benh_nhan_id = benh_nhan_id;
	}

	public Integer getLe_tan_id() {
		return le_tan_id;
	}

	public void setLe_tan_id(Integer le_tan_id) {
		this.le_tan_id = le_tan_id;
	}

	public Integer getPhong_kham_id() {
		return phong_kham_id;
	}

	public void setPhong_kham_id(Integer phong_kham_id) {
		this.phong_kham_id = phong_kham_id;
	}

	public Integer getTrang_thai_don_id() {
		return trang_thai_don_id;
	}

	public void setTrang_thai_don_id(Integer trang_thai_don_id) {
		this.trang_thai_don_id = trang_thai_don_id;
	}

}

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
@Table(name = "chi_so_suc_khoe")
public class ChiSoSucKhoe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "chi_so_id")
	private Integer chi_so_id;

	@Column(name = "can_nang")
	private String can_nang;

	@Column(name = "chieu_cao")
	private String chieu_cao;

	@Column(name = "nhiet_do")
	private String nhiet_do;
	
	@Column(name = "nhip_tho")
	private String nhip_tho;
	
	@Column(name = "mach")
	private String mach;
	
	@Column(name = "huyet_ap")
	private String huyet_ap;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "benh_an_id")
	private BenhAn benhAn;
	
	public ChiSoSucKhoe() {}

	public ChiSoSucKhoe(Integer chi_so_id, String can_nang, String chieu_cao, String nhiet_do, String nhip_tho,
			String mach, String huyet_ap) {
		super();
		this.chi_so_id = chi_so_id;
		this.can_nang = can_nang;
		this.chieu_cao = chieu_cao;
		this.nhiet_do = nhiet_do;
		this.nhip_tho = nhip_tho;
		this.mach = mach;
		this.huyet_ap = huyet_ap;
	}

	public Integer getChi_so_id() {
		return chi_so_id;
	}

	public void setChi_so_id(Integer chi_so_id) {
		this.chi_so_id = chi_so_id;
	}

	public String getCan_nang() {
		return can_nang;
	}

	public void setCan_nang(String can_nang) {
		this.can_nang = can_nang;
	}

	public String getChieu_cao() {
		return chieu_cao;
	}

	public void setChieu_cao(String chieu_cao) {
		this.chieu_cao = chieu_cao;
	}

	public String getNhiet_do() {
		return nhiet_do;
	}

	public void setNhiet_do(String nhiet_do) {
		this.nhiet_do = nhiet_do;
	}

	public String getNhip_tho() {
		return nhip_tho;
	}

	public void setNhip_tho(String nhip_tho) {
		this.nhip_tho = nhip_tho;
	}

	public String getMach() {
		return mach;
	}

	public void setMach(String mach) {
		this.mach = mach;
	}

	public String getHuyet_ap() {
		return huyet_ap;
	}

	public void setHuyet_ap(String huyet_ap) {
		this.huyet_ap = huyet_ap;
	}

	@Override
	public String toString() {
		return "ChiSoSucKhoe [chi_so_id=" + chi_so_id + ", can_nang=" + can_nang + ", chieu_cao=" + chieu_cao
				+ ", nhiet_do=" + nhiet_do + ", nhip_tho=" + nhip_tho + ", mach=" + mach + ", huyet_ap=" + huyet_ap
				+ "]";
	}

}

package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "benh_nhan")
public class BenhNhan {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "benh_nhan_id")
	private Integer benh_nhan_id;

	@Column(name = "cccd")
	private String cccd;

	@Column(name = "ten")
	private String ten;
	
	@Column(name = "ns")
	private String ns;
	
	@Column(name = "gioi_tinh")
	private String gioi_tinh;
	
	@Column(name = "dia_chi")
	private String dia_chi;

	public BenhNhan(Integer benh_nhan_id, String cccd, String ten, String ns, String gioi_tinh, String dia_chi) {
		super();
		this.benh_nhan_id = benh_nhan_id;
		this.cccd = cccd;
		this.ten = ten;
		this.ns = ns;
		this.gioi_tinh = gioi_tinh;
		this.dia_chi = dia_chi;
	}

	public Integer getBenh_nhan_id() {
		return benh_nhan_id;
	}

	public void setBenh_nhan_id(Integer benh_nhan_id) {
		this.benh_nhan_id = benh_nhan_id;
	}

	public String getCccd() {
		return cccd;
	}

	public void setCccd(String cccd) {
		this.cccd = cccd;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public String getNs() {
		return ns;
	}

	public void setNs(String ns) {
		this.ns = ns;
	}

	public String getGioi_tinh() {
		return gioi_tinh;
	}

	public void setGioi_tinh(String gioi_tinh) {
		this.gioi_tinh = gioi_tinh;
	}

	public String getDia_chi() {
		return dia_chi;
	}

	public void setDia_chi(String dia_chi) {
		this.dia_chi = dia_chi;
	}

	@Override
	public String toString() {
		return "BenhNhan [benh_nhan_id=" + benh_nhan_id + ", cccd=" + cccd + ", ten=" + ten + ", ns=" + ns
				+ ", gioi_tinh=" + gioi_tinh + ", dia_chi=" + dia_chi + "]";
	}

}

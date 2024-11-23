package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Table(name = "nguoi_dung")
@Inheritance(strategy = InheritanceType.JOINED)
public class NguoiDung {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "nguoi_dung_id")
	private Integer nguoi_dung_id;

	@Column(name = "ten")
	private String ten;

	@Column(name = "ns")
	private String ns;

	@Column(name = "vai_tro")
	private String vai_tro;

	@Column(name = "sdt")
	private String sdt;

	public NguoiDung(Integer nguoi_dung_id, String ten, String ns, String vai_tro, String sdt) {
		super();
		this.nguoi_dung_id = nguoi_dung_id;
		this.ten = ten;
		this.ns = ns;
		this.vai_tro = vai_tro;
		this.sdt = sdt;
	}

	public Integer getNguoi_dung_id() {
		return nguoi_dung_id;
	}

	public void setNguoi_dung_id(Integer nguoi_dung_id) {
		this.nguoi_dung_id = nguoi_dung_id;
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

	public String getVai_tro() {
		return vai_tro;
	}

	public void setVai_tro(String vai_tro) {
		this.vai_tro = vai_tro;
	}

	public String getSdt() {
		return sdt;
	}

	public void setSdt(String sdt) {
		this.sdt = sdt;
	}

	@Override
	public String toString() {
		return "NguoiDung [nguoi_dung_id=" + nguoi_dung_id + ", ten=" + ten + ", ns=" + ns + ", vai_tro=" + vai_tro
				+ ", sdt=" + sdt + "]";
	}

}

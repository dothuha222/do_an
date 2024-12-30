package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "nguoi_dung")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public class NguoiDung {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "nguoi_dung_id")
	private Integer nguoi_dung_id;

	@Column(name = "ten")
	private String ten;

	@Column(name = "ns")
	private String ns;
	
	@Column(name = "gioi_tinh")
	private String gioi_tinh;

	@Column(name = "vai_tro")
	private String vai_tro;
	
	@Column(name = "dia_chi")
	private String dia_chi;

	@Column(name = "sdt")
	private String sdt;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	
	public NguoiDung() {}

	public NguoiDung(Integer nguoi_dung_id, String ten, String ns, String gioi_tinh, String vai_tro, String dia_chi,
			String sdt, String username, String password) {
		super();
		this.nguoi_dung_id = nguoi_dung_id;
		this.ten = ten;
		this.ns = ns;
		this.gioi_tinh = gioi_tinh;
		this.vai_tro = vai_tro;
		this.dia_chi = dia_chi;
		this.sdt = sdt;
		this.username = username;
		this.password = password;
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

	public String getGioi_tinh() {
		return gioi_tinh;
	}

	public void setGioi_tinh(String gioi_tinh) {
		this.gioi_tinh = gioi_tinh;
	}

	public String getVai_tro() {
		return vai_tro;
	}

	public void setVai_tro(String vai_tro) {
		this.vai_tro = vai_tro;
	}

	public String getDia_chi() {
		return dia_chi;
	}

	public void setDia_chi(String dia_chi) {
		this.dia_chi = dia_chi;
	}

	public String getSdt() {
		return sdt;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setSdt(String sdt) {
		this.sdt = sdt;
	}

	@Override
	public String toString() {
		return "NguoiDung [nguoi_dung_id=" + nguoi_dung_id + ", ten=" + ten + ", ns=" + ns + ", gioi_tinh=" + gioi_tinh
				+ ", vai_tro=" + vai_tro + ", dia_chi=" + dia_chi + ", sdt=" + sdt + ", username=" + username
				+ ", password=" + password + "]";
	}

}

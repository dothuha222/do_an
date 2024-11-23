package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "chi_so_suc_khoe")
public class ChiSoSucKhoe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "chi_so_id")
	private Integer chi_so_id;

	@Column(name = "ten")
	private String ten;

	@Column(name = "chi_so")
	private String chi_so;

	public ChiSoSucKhoe(Integer chi_so_id, String ten, String chi_so) {
		super();
		this.chi_so_id = chi_so_id;
		this.ten = ten;
		this.chi_so = chi_so;
	}

	public Integer getChi_so_id() {
		return chi_so_id;
	}

	public void setChi_so_id(Integer chi_so_id) {
		this.chi_so_id = chi_so_id;
	}

	public String getTen() {
		return ten;
	}

	public void setTen(String ten) {
		this.ten = ten;
	}

	public String getChi_so() {
		return chi_so;
	}

	public void setChi_so(String chi_so) {
		this.chi_so = chi_so;
	}

	@Override
	public String toString() {
		return "ChiSoSucKhoe [chi_so_id=" + chi_so_id + ", ten=" + ten + ", chi_so=" + chi_so + "]";
	}

}

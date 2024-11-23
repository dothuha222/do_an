package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "bac_si")
public class BacSi extends NguoiDung {

	@Column(name = "bang_cap")
	private String bang_cap;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "phong_kham_id")
	private PhongKham phong_kham;

	public BacSi(Integer nguoi_dung_id, String ten, String ns, String vai_tro, String sdt, String bang_cap) {
		super(nguoi_dung_id, ten, ns, vai_tro, sdt);
		this.bang_cap = bang_cap;
	}

	public String getBang_cap() {
		return bang_cap;
	}

	public void setBang_cap(String bang_cap) {
		this.bang_cap = bang_cap;
	}

	@Override
	public String toString() {
		return "BacSi [bang_cap=" + bang_cap + ", getBang_cap()=" + getBang_cap() + ", getNguoi_dung_id()="
				+ getNguoi_dung_id() + ", getTen()=" + getTen() + ", getNs()=" + getNs() + ", getVai_tro()="
				+ getVai_tro() + ", getSdt()=" + getSdt() + ", toString()=" + super.toString() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + "]";
	}

}

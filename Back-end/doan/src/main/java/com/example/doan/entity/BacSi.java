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
	
	public BacSi() {
		super();
	}
	

	public BacSi(Integer nguoi_dung_id, String ten, String ns, String gioi_tinh, String vai_tro, String dia_chi,
			String sdt, String username, String password) {
		super(nguoi_dung_id, ten, ns, gioi_tinh, vai_tro, dia_chi, sdt, username, password);
	}

	public String getBang_cap() {
		return bang_cap;
	}

	public void setBang_cap(String bang_cap) {
		this.bang_cap = bang_cap;
	}

	public PhongKham getPhong_kham() {
		return phong_kham;
	}

	public void setPhong_kham(PhongKham phong_kham) {
		this.phong_kham = phong_kham;
	}

	@Override
	public String toString() {
		return "BacSi [bang_cap=" + bang_cap + ", phong_kham=" + phong_kham + "]";
	}

}

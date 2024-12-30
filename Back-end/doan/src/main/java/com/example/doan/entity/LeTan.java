package com.example.doan.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "le_tan")
public class LeTan extends NguoiDung{
	
	public LeTan() {
		super();
	}

	public LeTan(Integer nguoi_dung_id, String ten, String ns, String gioi_tinh, String vai_tro, String dia_chi,
			String sdt, String username, String password) {
		super(nguoi_dung_id, ten, ns, gioi_tinh, vai_tro, dia_chi, sdt, username, password);
	}

	@Override
	public String toString() {
		return "LeTan [getNguoi_dung_id()=" + getNguoi_dung_id() + ", getTen()=" + getTen() + ", getNs()=" + getNs()
				+ ", getGioi_tinh()=" + getGioi_tinh() + ", getVai_tro()=" + getVai_tro() + ", getDia_chi()="
				+ getDia_chi() + ", getSdt()=" + getSdt() + ", toString()=" + super.toString() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + "]";
	}
	
}

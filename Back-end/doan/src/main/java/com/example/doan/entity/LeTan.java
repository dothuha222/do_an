package com.example.doan.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "le_tan")
public class LeTan extends NguoiDung{

	public LeTan(Integer nguoi_dung_id, String ten, String ns, String vai_tro, String sdt) {
		super(nguoi_dung_id, ten, ns, vai_tro, sdt);
	}
	
}

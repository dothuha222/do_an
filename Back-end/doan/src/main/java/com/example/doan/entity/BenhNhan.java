package com.example.doan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "benh_nhan")
public class BenhNhan extends NguoiDung {
	

	@Column(name = "cccd")
	private String cccd;
	
	@Column(name = "ma_bhyt")
	private String ma_bhyt;
	
	public BenhNhan() {
		super();
	}

	public BenhNhan(Integer nguoi_dung_id, String ten, String ns, String gioi_tinh, String vai_tro, String dia_chi,
            String sdt, String username, String password, String cccd, String ma_bhyt) {
		super(nguoi_dung_id, ten, ns, gioi_tinh, vai_tro, dia_chi, sdt, username, password);
		this.cccd = cccd;
		this.ma_bhyt = ma_bhyt;
	}

	public String getCccd() {
		return cccd;
	}

	public void setCccd(String cccd) {
		this.cccd = cccd;
	}

	public String getMa_bhyt() {
		return ma_bhyt;
	}

	public void setMa_bhyt(String ma_bhyt) {
		this.ma_bhyt = ma_bhyt;
	}

	@Override
	public String toString() {
		return "BenhNhan [cccd=" + cccd + ", ma_bhyt=" + ma_bhyt + "]";
	}
	
	
}

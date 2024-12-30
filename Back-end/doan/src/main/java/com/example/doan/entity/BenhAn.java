package com.example.doan.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "benh_an")
@AllArgsConstructor
public class BenhAn {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "benh_an_id")
	private Integer benh_an_id;

	@Column(name = "ket_luan")
	private String ket_luan;

	@Column(name = "thoi_gian")
	private Date thoi_gian;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "don_tiep_nhan_id")
	private DonTiepNhan don_tiep_nhan;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "nguoi_dung_id")
	private BacSi bac_si;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "dich_vu_benh_an", joinColumns = @JoinColumn(name = "benh_an_id"), inverseJoinColumns = @JoinColumn(name = "dich_vu_id"))
	private List<DichVu> ds_dich_vu;
	
	public BenhAn() {}

	

	public Integer getBenh_an_id() {
		return benh_an_id;
	}

	public void setBenh_an_id(Integer benh_an_id) {
		this.benh_an_id = benh_an_id;
	}

	public String getKet_luan() {
		return ket_luan;
	}

	public void setKet_luan(String ket_luan) {
		this.ket_luan = ket_luan;
	}

	public Date getThoi_gian() {
		return thoi_gian;
	}

	public void setThoi_gian(Date thoi_gian) {
		this.thoi_gian = thoi_gian;
	}

	public DonTiepNhan getDon_tiep_nhan() {
		return don_tiep_nhan;
	}

	public void setDon_tiep_nhan(DonTiepNhan don_tiep_nhan) {
		this.don_tiep_nhan = don_tiep_nhan;
	}

	public BacSi getBac_si() {
		return bac_si;
	}

	public void setBac_si(BacSi bac_si) {
		this.bac_si = bac_si;
	}

	public List<DichVu> getDs_dich_vu() {
		return ds_dich_vu;
	}

	public void setDs_dich_vu(List<DichVu> ds_dich_vu) {
		this.ds_dich_vu = ds_dich_vu;
	}

	@Override
	public String toString() {
		return "BenhAn [benh_an_id=" + benh_an_id + ", ket_luan=" + ket_luan + ", thoi_gian=" + thoi_gian
				+ ", ds_chi_so=" + ", don_tiep_nhan=" + don_tiep_nhan + ", bac_si=" + bac_si
				+ ", ds_dich_vu=" + ds_dich_vu + "]";
	}

}

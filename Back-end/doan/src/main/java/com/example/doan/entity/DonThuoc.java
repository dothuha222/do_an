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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "don_thuoc")
@Data
public class DonThuoc {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "don_thuoc_id")
	private Integer don_thuoc_id;

	@Column(name = "thoi_gian")
	private Date date;

	@Column(name = "ghi_chu")
	private String ghi_chu;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "don_thuoc_chi_tiet_id")
	private List<DonThuocChiTiet> ds_don_thuoc;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "benh_an_id")
	private BenhAn benh_an;

	public DonThuoc(Integer don_thuoc_id, Date date, String ghi_chu, List<DonThuocChiTiet> ds_don_thuoc,
			BenhAn benh_an) {
		super();
		this.don_thuoc_id = don_thuoc_id;
		this.date = date;
		this.ghi_chu = ghi_chu;
		this.ds_don_thuoc = ds_don_thuoc;
		this.benh_an = benh_an;
	}

	public Integer getDon_thuoc_id() {
		return don_thuoc_id;
	}

	public void setDon_thuoc_id(Integer don_thuoc_id) {
		this.don_thuoc_id = don_thuoc_id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getGhi_chu() {
		return ghi_chu;
	}

	public void setGhi_chu(String ghi_chu) {
		this.ghi_chu = ghi_chu;
	}

	public List<DonThuocChiTiet> getDs_don_thuoc() {
		return ds_don_thuoc;
	}

	public void setDs_don_thuoc(List<DonThuocChiTiet> ds_don_thuoc) {
		this.ds_don_thuoc = ds_don_thuoc;
	}

	public BenhAn getBenh_an() {
		return benh_an;
	}

	public void setBenh_an(BenhAn benh_an) {
		this.benh_an = benh_an;
	}

	@Override
	public String toString() {
		return "DonThuoc [don_thuoc_id=" + don_thuoc_id + ", date=" + date + ", ghi_chu=" + ghi_chu + ", ds_don_thuoc="
				+ ds_don_thuoc + ", benh_an=" + benh_an + "]";
	}

}

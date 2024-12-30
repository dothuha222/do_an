package com.example.doan.service;

import java.util.List;

import com.example.doan.entity.BenhNhan;
import com.example.doan.entity.NguoiDung;

public interface UserService {
	BenhNhan saveBenhNhan(BenhNhan benhNhan);
	
	NguoiDung getNguoiDungByUserNameAndPassword(String username, String password);
	
	List<NguoiDung> getAllNguoiDung();
	
}

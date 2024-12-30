package com.example.doan.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.doan.entity.BenhNhan;
import com.example.doan.entity.NguoiDung;
import com.example.doan.repository.BenhNhanRepository;
import com.example.doan.repository.NguoiDungRepository;
import com.example.doan.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private BenhNhanRepository benhNhanRepository;
	
	@Autowired 
	private NguoiDungRepository nguoiDungRepository;

	@Override
	public BenhNhan saveBenhNhan(BenhNhan benhNhan) {
		try {
			return benhNhanRepository.save(benhNhan);
		} catch (Exception e) {
			return null;
		}
	}
	
	@Override
	public NguoiDung getNguoiDungByUserNameAndPassword(String username, String password) {
		return nguoiDungRepository.getUserByUsernameAndPassword(username, password);
	}

	@Override
	public List<NguoiDung> getAllNguoiDung() {
		return nguoiDungRepository.findAllNguoiDung();
	}
	
}

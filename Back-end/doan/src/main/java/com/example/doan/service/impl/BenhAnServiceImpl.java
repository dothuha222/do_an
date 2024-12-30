package com.example.doan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.doan.entity.ChiSoSucKhoe;
import com.example.doan.repository.BenhAnRepository;
import com.example.doan.repository.ChiSoSucKhoeRepository;
import com.example.doan.service.BenhAnService;

@Service
public class BenhAnServiceImpl implements BenhAnService {
	
	@Autowired
	private ChiSoSucKhoeRepository chiSoSucKhoeRepository;
	
	@Autowired
	private BenhAnRepository benhAnRepository;

	@Override
	public ChiSoSucKhoe addChiSoSucKhoe(ChiSoSucKhoe chiSoSucKhoe) {
		return chiSoSucKhoeRepository.save(chiSoSucKhoe);
	}

}

package com.example.doan.service;

import com.example.doan.entity.DonTiepNhan;
import com.example.doan.entity.dto.DonTiepNhanDTO;

public interface DonTiepNhanService {
	DonTiepNhan saveDonTiepNhan(DonTiepNhanDTO dto);
	
	DonTiepNhan updateDonTiepNhan(Integer id, DonTiepNhanDTO dto);
}

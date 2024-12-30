package com.example.doan.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.doan.entity.BenhNhan;
import com.example.doan.entity.DonTiepNhan;
import com.example.doan.entity.LeTan;
import com.example.doan.entity.PhongKham;
import com.example.doan.entity.TrangThaiDon;
import com.example.doan.entity.dto.DonTiepNhanDTO;
import com.example.doan.repository.BenhNhanRepository;
import com.example.doan.repository.DonTiepNhanRepository;
import com.example.doan.repository.LeTanRepository;
import com.example.doan.repository.PhongKhamRepository;
import com.example.doan.repository.TrangThaiDonRepository;
import com.example.doan.service.DonTiepNhanService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class DonTiepNhanServiceImpl implements DonTiepNhanService {
	
	@Autowired
	private DonTiepNhanRepository donTiepNhanRepository;
	
	@Autowired
	private BenhNhanRepository benhNhanRepository;
	
	@Autowired
	private LeTanRepository leTanRepository;
	
	@Autowired
	private PhongKhamRepository phongKhamRepository;
	
	@Autowired
	private TrangThaiDonRepository trangThaiDonRepository;

	@Override
	public DonTiepNhan saveDonTiepNhan(DonTiepNhanDTO dto) {
		DonTiepNhan donTiepNhan = new DonTiepNhan();
		BenhNhan benhNhan = benhNhanRepository.findById(dto.getBenh_nhan_id())
	            .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy Bệnh nhân với ID: " + dto.getBenh_nhan_id()));
        LeTan leTan = leTanRepository.findById(dto.getLe_tan_id())
            .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy Lễ tân với ID: " + dto.getLe_tan_id()));
        PhongKham phongKham = phongKhamRepository.findById(dto.getPhong_kham_id())
            .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy Phòng khám với ID: " + dto.getPhong_kham_id()));
        TrangThaiDon trangThaiDon = trangThaiDonRepository.findById(dto.getTrang_thai_don_id())
            .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy Trạng thái đơn với ID: " + dto.getTrang_thai_don_id()));

        donTiepNhan.setLy_do_kham(dto.getLy_do_kham());
        donTiepNhan.setBenh_nhan(benhNhan);
        donTiepNhan.setLeTan(leTan);
        donTiepNhan.setPhong_kham(phongKham);
        donTiepNhan.setTrang_thai_don(trangThaiDon);
        donTiepNhan.setDate(new Date()); // Thời gian hiện tại
        
        
		return donTiepNhanRepository.save(donTiepNhan);
	}

	@Override
	public DonTiepNhan updateDonTiepNhan(Integer id, DonTiepNhanDTO dto) {
		DonTiepNhan donTiepNhan = donTiepNhanRepository.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy đơn tiếp nhận với ID: " + id));

        if (dto.getLy_do_kham() != null) {
            donTiepNhan.setLy_do_kham(dto.getLy_do_kham());
        }

        if (dto.getBenh_nhan_id() != null) {
            BenhNhan benhNhan = benhNhanRepository.findById(dto.getBenh_nhan_id())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy Bệnh nhân với ID: " + dto.getBenh_nhan_id()));
            donTiepNhan.setBenh_nhan(benhNhan);
        }

        if (dto.getLe_tan_id() != null) {
            LeTan leTan = leTanRepository.findById(dto.getLe_tan_id())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy Lễ tân với ID: " + dto.getLe_tan_id()));
            donTiepNhan.setLeTan(leTan);
        }

        if (dto.getPhong_kham_id() != null) {
            PhongKham phongKham = phongKhamRepository.findById(dto.getPhong_kham_id())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy Phòng khám với ID: " + dto.getPhong_kham_id()));
            donTiepNhan.setPhong_kham(phongKham);
        }

        if (dto.getTrang_thai_don_id() != null) {
            TrangThaiDon trangThaiDon = trangThaiDonRepository.findById(dto.getTrang_thai_don_id())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy Trạng thái đơn với ID: " + dto.getTrang_thai_don_id()));
            donTiepNhan.setTrang_thai_don(trangThaiDon);
        }

        return donTiepNhanRepository.save(donTiepNhan);
	}
}

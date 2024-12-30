package com.example.doan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.doan.entity.DonTiepNhan;
import com.example.doan.entity.dto.DonTiepNhanDTO;
import com.example.doan.service.DonTiepNhanService;

@RestController
@RequestMapping("/api/dontiepnhan")
@CrossOrigin("*")
public class DonTiepNhanController {
	
	@Autowired
	private DonTiepNhanService donTiepNhanService;
	
	@PostMapping("/add-dontiepnhan")
	public ResponseEntity<DonTiepNhan> addBenhNhan(@ModelAttribute DonTiepNhanDTO dto) {
        try {
        	DonTiepNhan donTiepNhan = donTiepNhanService.saveDonTiepNhan(dto);
        	return ResponseEntity.status(HttpStatus.CREATED).body(donTiepNhan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    } 
	
	@PutMapping("/{id}")
    public ResponseEntity<DonTiepNhan> capNhatDonTiepNhan(
            @PathVariable Integer id,
            @ModelAttribute DonTiepNhanDTO dto) {
        DonTiepNhan updatedDonTiepNhan = donTiepNhanService.updateDonTiepNhan(id, dto);
        return ResponseEntity.ok(updatedDonTiepNhan);
    }
}

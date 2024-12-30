package com.example.doan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.doan.entity.ChiSoSucKhoe;
import com.example.doan.service.BenhAnService;

@RestController
@RequestMapping("/api/benhan")
@CrossOrigin("*")
public class BenhAnController {
	
	@Autowired
	private BenhAnService benhAnService;
	
	@PostMapping("/chisosuckhoe")
	public ResponseEntity<ChiSoSucKhoe> addBenhNhan(@ModelAttribute ChiSoSucKhoe chiSoSucKhoe) {
        try {
        	ChiSoSucKhoe newChiSoSucKhoe = benhAnService.addChiSoSucKhoe(chiSoSucKhoe);
        	return ResponseEntity.status(HttpStatus.CREATED).body(newChiSoSucKhoe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    } 
	
}

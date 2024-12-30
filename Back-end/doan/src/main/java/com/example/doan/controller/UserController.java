package com.example.doan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.doan.entity.BenhNhan;
import com.example.doan.entity.NguoiDung;
import com.example.doan.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/add-benhnhan")
    public ResponseEntity<BenhNhan> addBenhNhan(@ModelAttribute BenhNhan benhNhan) {
        try {
            BenhNhan newBenhNhan = (BenhNhan) userService.saveBenhNhan(benhNhan);
            return ResponseEntity.status(HttpStatus.CREATED).body(newBenhNhan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	
	@PostMapping("/check-account")
    public ResponseEntity<NguoiDung> checkUser(@RequestParam String username, 
            @RequestParam String password) {

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(null);
        }
        NguoiDung user = userService.getNguoiDungByUserNameAndPassword("tranhao", "123");
        System.err.println(user);

        if (user != null) {
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
	
	@GetMapping("/all")
    public ResponseEntity<List<NguoiDung>> getAllNguoiDung() {
        try {
            List<NguoiDung> nguoiDungList = userService.getAllNguoiDung();
            if (nguoiDungList.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(nguoiDungList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	
}

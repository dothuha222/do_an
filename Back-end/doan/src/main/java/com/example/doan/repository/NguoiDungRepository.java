package com.example.doan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.doan.entity.NguoiDung;

public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer>{
	
	@Query("SELECT nd FROM NguoiDung nd WHERE nd.username = ?1 AND nd.password = ?2")
    NguoiDung getUserByUsernameAndPassword(String username, String password);
	
	@Query("SELECT n FROM NguoiDung n")
    List<NguoiDung> findAllNguoiDung();
	
}

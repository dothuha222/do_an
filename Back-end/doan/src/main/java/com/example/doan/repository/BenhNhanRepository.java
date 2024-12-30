package com.example.doan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.doan.entity.BenhNhan;

public interface BenhNhanRepository extends JpaRepository<BenhNhan, Integer>{
	
	@Query("select bn from BenhNhan bn")
	BenhNhan getUserByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}

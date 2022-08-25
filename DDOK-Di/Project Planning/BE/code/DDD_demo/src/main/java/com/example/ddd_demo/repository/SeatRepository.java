package com.example.ddd_demo.repository;

import com.example.ddd_demo.entity.Seat;
import com.example.ddd_demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long>{
}




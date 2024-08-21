package com.example.ecommerce.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {
}


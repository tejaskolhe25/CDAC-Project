package com.example.ecommerce.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Product;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByNameContainingOrDescriptionContaining(String name, String description);
}

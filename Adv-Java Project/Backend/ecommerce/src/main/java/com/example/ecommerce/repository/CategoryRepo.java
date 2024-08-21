package com.example.ecommerce.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Category;

public interface CategoryRepo extends JpaRepository<Category, Long> {
}


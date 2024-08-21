package com.example.ecommerce.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Address;

public interface AddressRepo extends JpaRepository<Address, Long> {
}


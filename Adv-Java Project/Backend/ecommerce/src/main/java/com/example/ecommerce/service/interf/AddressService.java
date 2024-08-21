package com.example.ecommerce.service.interf;

import com.example.ecommerce.dto.Response;
import com.example.ecommerce.dto.AddressDto;


public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
}

package com.example.ecommerce.service.interf;


import org.springframework.data.domain.Pageable;

import com.example.ecommerce.dto.OrderRequest;
import com.example.ecommerce.dto.Response;
import com.example.ecommerce.enums.OrderStatus;

import java.time.LocalDateTime;

public interface OrderItemService {
    Response placeOrder(OrderRequest orderRequest);
    Response updateOrderItemStatus(Long orderItemId, String status);
    Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable);
}

package com.example.ecommerce.service;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.OrderItem;
import com.example.ecommerce.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private OrderService orderService;
    public OrderItem createOrderItem(OrderItem orderItem){
    Order order = orderService.findOrderById(orderItem.getId());
        orderItem.setOrder(order);
        return orderItemRepository.save(orderItem);
    }
}
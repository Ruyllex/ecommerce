package com.example.ecommerce.service;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.OrderItem;
import com.example.ecommerce.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;
    public List<Order> getOrder(){
        return orderRepository.findAll();
    }
    public Order save(Order order){
        return orderRepository.save(order);
    }
    public Order findOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
    @Transactional
    public Order createOrder(Order order) {
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }
        return orderRepository.save(order);
    }
    public int obtainOrderPrice(Long id){
        Optional<Order> order = orderRepository.findById(id);
        List<OrderItem> list =  order.get().getItems();
        int SUM = 0;
        for(OrderItem x : list){
            SUM += x.getDish().getPrice() * x.getQuantity();
        }
        return SUM;
    }

}

package com.example.ecommerce.controller;
import com.example.ecommerce.model.*;
import com.example.ecommerce.repository.DishRepository;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.service.DishService;
import com.example.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DishRepository dishRepository;
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> getOrders() {
        return orderService.getOrder();
    }

    @GetMapping("/total-price/{id}")
    public int obtainTotalPriceOrder(@PathVariable Long id) {
        return orderService.obtainOrderPrice(id);
    }
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest) {
        Order order = new Order();

        // Configurar el usuario
        User user = userRepository.findById(orderRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        order.setUser(user);

        // Configurar el total
        order.setTotal(orderRequest.getTotal());

        // Agregar los items a la orden
        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            OrderItem orderItem = new OrderItem();

            // Buscar el dish y configurarlo
            Dish dish = dishRepository.findById(itemRequest.getDish())
                    .orElseThrow(() -> new RuntimeException("Plato no encontrado"));
            orderItem.setDish(dish);

            orderItem.setQuantity(itemRequest.getQuantity());
            order.addOrderItem(orderItem);
        }

        Order savedOrder = orderRepository.save(order);

        return ResponseEntity.ok(savedOrder);
    }
}